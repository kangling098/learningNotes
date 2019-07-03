import TraceKit from './tracekit';
import { isErrorEvent, isDOMError, isDOMException, isError, joinRegExp, } from '../utils/object';

export default class StackTracer {
  constructor() {
    this._lastCaptruedException = null; // 最新捕获到的异常对象
    this._lastData = null; // 最新发送给后端的数据
    this._lastEventId = null; // 最后捕获事件的唯一id(暂无需使用)
    this._errCallback = null; // 缓存回调
    this._globalOptions = {
      ignoreErrors: [], // 需要过滤的错误
      stackTraceLimit: 50, // 限制frames的最大值
      collectWindowErrors: true,
      ignoreErrorFileName: /myWebLogTracker/i, // 需要过滤的堆栈错误来源
    }
    this._ignoreOnError = 0; // 当前错误是否需要过滤(为0时,当前错误需要捕获,为1时不需要捕获,由于当前错误捕获全部使用addEventListener方式,而不是重写回调的方式,暂时无需使用,留配置参数,后续如果要扩展可以使用)
    this._lastCaptruedEvent = null; // 最新捕获的事件
  }

  // 单例模式,获取实例对象
  static getInstance = (function() {
    let instance = null;
    return function(props) {
      if (!instance) {
        instance = new StackTracer(props)
      }
      return instance
    }
  })()

  init({ callback, confSource }) {
    callback = typeof callback === 'function' ? callback : () => {};
    // 缓存回调函数
    this._errCallback = callback;

    const globalOptions = this._globalOptions;
    // 对于script error,我们将它过滤
    globalOptions.ignoreErrors.push(/^Script error\.?$/);
    globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);
    // join regexp rules into one big rule
    globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
    // 对window.onerror进行错误捕获
    TraceKit.report.subscribe((...args) => {
      // 配置文件修改后,停止错误捕获
      if (confSource.conf.collect_event_types.indexOf('error') === -1) {
        return;
      }
      this._handleOnErrorStackInfo.apply(this, args);
    })
  }
  
  // 对window.onerror收集的错误信息进行处理
  _handleOnErrorStackInfo(stackInfo, options = {}) {
    options.mechanism = options.mechanism || {
      type: 'onerror',
      handled: false,
      time: new Date().getTime()
    };

    // if we are intentionally ignoring errors via onerror, bail out
    if (!this._ignoreOnError) {
      this._handleStackInfo(stackInfo, options);
    }
  }

  _handleStackInfo(stackInfo, options = {}) {
    var frames = this._prepareFrames(stackInfo, options);

    this._processException(
      stackInfo.name,
      stackInfo.message,
      stackInfo.url,
      stackInfo.lineno,
      frames,
      options
    );
  }

  _prepareFrames(stackInfo, options = {}) {
    const self = this;
    const frames = [];

    if (stackInfo.stack && stackInfo.stack.length) {
      stackInfo.stack.forEach((stack) => {
        const frame = self._normalizeFrame(stack, stackInfo.url);
        if (frame) {
          frames.push(frame);
        }
      });
    }

    const index = options.trimHeadFrames || 0;

    return frames.slice(index, this._globalOptions.stackTraceLimit);
  }

  _normalizeFrame(frame, stackInfoUrl) {
    // 格式化 frames data
    const normalized = {
      filename: frame.url,
      lineno: frame.line,
      colno: frame.column,
      function: frame.func || '?'
    };

    // Case when we don't have any information about the error
    // E.g. throwing a string or raw object, instead of an `Error` in Firefox
    // Generating synthetic error doesn't add any value here
    //
    // We should probably somehow let a user know that they should fix their code
    if (!frame.url) {
      normalized.filename = stackInfoUrl; // fallback to whole stacks url from onerror handler
    }

    normalized.in_app = !(
      // Now we check for fun, if the function name is StackTracer or TraceKit
      /(StackTracer|TraceKit)\./.test(normalized.function) ||
      // finally, we do a last ditch effort and check for myWebLogTracker.min.js
      /myWebLogTracker\.(min\.)?js$/.test(normalized.filename)
    );

    return normalized;
  }
  _processException(type, message, fileurl, lineno, frames, options) {
    const prefixedMessage = (type ? `${type}: ` : '') + (message || '');
    if (
      !!this._globalOptions.ignoreErrors.test &&
      (this._globalOptions.ignoreErrors.test(message) ||
        this._globalOptions.ignoreErrors.test(prefixedMessage))
    ) {
      return;
    }

    let stacktrace;

    if (frames && frames.length) {
      fileurl = frames[0].filename || fileurl;
      if(this._globalOptions.ignoreErrorFileName.test(fileurl)) return 
      // Sentry expects frames oldest to newest
      // and JS sends them as newest to oldest
      frames.reverse();
      if(this._globalOptions.ignoreErrorFileName.test(frames[0].filename)) return 

      stacktrace = { frames };
    } else if (fileurl) {
      if(this._globalOptions.ignoreErrorFileName.test(fileurl)) return 
      stacktrace = {
        frames: [
          {
            lineno,
            filename: fileurl,
            in_app: true
          }
        ]
      };
    }
    const data = {
      // StackTracer.interfaces.Exception
      exception: {
        values: [{
          value: message,
          type,
          stacktrace
        }]
      },
      transaction: fileurl,
      ...options
    }

    const ex = data.exception.values[0];
    if (ex.type == null && ex.value === '') {
      ex.value = 'Unrecoverable error caught';
    }

    // Move mechanism from options to exception interface
    // We do this, as requiring user to pass `{exception:{mechanism:{ ... }}}` would be
    // too much
    if (!data.exception.mechanism && data.mechanism) {
      data.exception.mechanism = data.mechanism;
      delete data.mechanism;
    }

    data.exception.mechanism = data.exception.mechanism || {}
    data.exception.mechanism = {
      type: 'generic',
      handled: true,
      ...data.exception.mechanism
    }
    // Fire away!

    this._errCallback(data);
  }

  /**
   *
   * @param {error} ex An exception to be logged
   * @param {object} options A specific set of options for this error [optional]
   * @return {Raven}
   */
  captureException(ex, options = {}) {
    options = { trimHeadFrames: 0, ...options };
    if (isErrorEvent(ex) && ex.error) {
      ex = ex.error;
    } else if (isDOMError(ex) || isDOMException(ex)) {
      const name = ex.name || (isDOMError(ex) ? 'DOMError' : 'DOMException');
      const message = ex.message ? `${name}: ${ex.message}$` : name;
      // error on 2019.3.26 @wanglei weixin fast-group
      return this.captureMessage(message, {
        ...options,
        stacktrace: true,
        trimHeadFrames: options.trimHeadFrames + 1
      });
    } else if (isError(ex)) {
      // we have a real Error object
    } else {
      return;
    }
    this._lastCapturedException = ex;
    try {
      const stack = TraceKit.computeStackTrace(ex);
      this._handleStackInfo(stack, options);
    } catch (ex1) {
      // 不对该异常进行处理
    }

    return this;
  }

  captureMessage(msg, options) {
    // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
    // early call; we'll error on the side of logging anything called before configuration since it's
    // probably something you should see:
    if (
      !!this._globalOptions.ignoreErrors.test &&
      this._globalOptions.ignoreErrors.test(msg)
    ) {
      return;
    }

    options = options || {};
    msg += ''; // Make sure it's actually a string

    const data = {
      message: msg,
      ...options
    }

    let ex;
    // Generate a "synthetic" stack trace from this point.
    // NOTE: If you are a Sentry user, and you are seeing this stack frame, it is NOT indicative
    //       of a bug with Raven.js. Sentry generates synthetic traces either by configuration,
    //       or if it catches a thrown object without a "stack" property.
    try {
      throw new Error(msg);
    } catch (ex1) {
      ex = ex1;
    }

    // null exception name so `Error` isn't prefixed to msg
    ex.name = null;
    const stack = TraceKit.computeStackTrace(ex);

    // stack[0] is `throw new Error(msg)` call itself, we are interested in the frame that was just before that, stack[1]
    let initialCall = Array.isArray(stack.stack) && stack.stack[1];

    // if stack[1] is `StackTracer.captureException`, it means that someone passed a string to it and we redirected that call
    // to be handled by `captureMessage`, thus `initialCall` is the 3rd one, not 2nd
    // initialCall => captureException(string) => captureMessage(string)
    if (initialCall && initialCall.func === 'StackTracer.captureException') {
      initialCall = stack.stack[2];
    }

    // Always attempt to get stacktrace if message is empty.
    // It's the only way to provide any helpful information to the user.
    if (this._globalOptions.stacktrace || options.stacktrace || data.message === '') {
      // fingerprint on msg, not stack trace (legacy behavior, could be revisited)
      data.fingerprint = data.fingerprint == null ? msg : data.fingerprint;

      options = {
        trimHeadFrames: 0,
        ...options
      }
      // Since we know this is a synthetic trace, the top frame (this function call)
      // MUST be from Raven.js, so mark it for trimming
      // We add to the trim counter so that callers can choose to trim extra frames, such
      // as utility functions.
      options.trimHeadFrames += 1;

      const frames = this._prepareFrames(stack, options);
      data.stacktrace = {
        // Sentry expects frames oldest to newest
        frames: frames.reverse()
      };
    }

    // Make sure that fingerprint is always wrapped in an array
    if (data.fingerprint) {
      data.fingerprint = Array.isArray(data.fingerprint)
        ? data.fingerprint
        : [data.fingerprint];
    }

    // Fire away!
    this._errCallback(data);
    return this;
  }
}
