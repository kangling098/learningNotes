import TraceKit from '../vendor/TraceKit/tracekit'
import utils from './utils'
import Raven from 'raven-js';
const joinRegExp = utils.joinRegExp;

// Raven
//     .config('https://aaaaaaaa@fastfasr.io0/<project>')
//     .install();
class FastTrack {
  constructor(){
    this._globalOptions = {
      // SENTRY_RELEASE can be injected by https://github.com/getsentry/sentry-webpack-plugin
      release: _window.SENTRY_RELEASE && _window.SENTRY_RELEASE.id,
      logger: 'javascript',
      ignoreErrors: [],
      ignoreUrls: [],
      whitelistUrls: [],
      includePaths: [],
      headers: null,
      collectWindowErrors: true,
      captureUnhandledRejections: true,
      maxMessageLength: 0,
      // By default, truncates URL values to 250 chars
      maxUrlLength: 250,
      stackTraceLimit: 50,
      autoBreadcrumbs: true,
      instrument: true,
      sampleRate: 1,
      sanitizeKeys: []
    }
    this.globalOptions.ignoreErrors.push(/^Script error\.?$/);
    this.globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);

    // join regexp rules into one big rule
    this.globalOptions.ignoreErrors = joinRegExp(this.globalOptions.ignoreErrors);
    this.globalOptions.ignoreUrls = this.globalOptions.ignoreUrls.length
      ? joinRegExp(this.globalOptions.ignoreUrls)
      : false;
      this.globalOptions.whitelistUrls = this.globalOptions.whitelistUrls.length
      ? joinRegExp(this.globalOptions.whitelistUrls)
      : false;
      this.globalOptions.includePaths = joinRegExp(this.globalOptions.includePaths);
      this.globalOptions.maxBreadcrumbs = Math.max(
      0,
      Math.min(this.globalOptions.maxBreadcrumbs || 100, 100)
    ); // default and hard limit is 100

  }
}






const handleOnErrorStackInfo = function(stackInfo, options) {
  options = options || {};
  options.mechanism = options.mechanism || {
    type: 'onerror',
    handled: false
  };

  // if we are intentionally ignoring errors via onerror, bail out
  // if (!this._ignoreOnError) {
  //   this._handleStackInfo(stackInfo, options);
  // }
  handleStackInfo(stackInfo, options)
}
 function handleStackInfo(stackInfo, options) {
  const frames = this._prepareFrames(stackInfo, options);

  // this._triggerEvent('handle', {
  //   stackInfo: stackInfo,
  //   options: options
  // });
  processException(
    stackInfo.name,
    stackInfo.message,
    stackInfo.url,
    stackInfo.lineno,
    frames,
    options
  );
}
function prepareFrames(stackInfo, options) {
  var self = this;
  var frames = [];
  if (stackInfo.stack && stackInfo.stack.length) {
    each(stackInfo.stack, function(i, stack) {
      var frame = self._normalizeFrame(stack, stackInfo.url);
      if (frame) {
        frames.push(frame);
      }
    });

    // e.g. frames captured via captureMessage throw
    if (options && options.trimHeadFrames) {
      for (var j = 0; j < options.trimHeadFrames && j < frames.length; j++) {
        frames[j].in_app = false;
      }
    }
  }
  frames = frames.slice(0, this._globalOptions.stackTraceLimit);
  return frames;
}
function normalizeFrame(frame, stackInfoUrl) {
  // normalize the frames data
  var normalized = {
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

  normalized.in_app = !// determine if an exception came from outside of our app
  // first we check the global includePaths list.
  (
    (!!this._globalOptions.includePaths.test &&
      !this._globalOptions.includePaths.test(normalized.filename)) ||
    // Now we check for fun, if the function name is Raven or TraceKit
    /(Raven|TraceKit)\./.test(normalized['function']) ||
    // finally, we do a last ditch effort and check for raven.min.js
    /raven\.(min\.)?js$/.test(normalized.filename)
  );

  return normalized;
}
function processException(type, message, fileurl, lineno, frames, options) {
  var prefixedMessage = (type ? type + ': ' : '') + (message || '');
  if (
    !!this._globalOptions.ignoreErrors.test &&
    (this._globalOptions.ignoreErrors.test(message) ||
      this._globalOptions.ignoreErrors.test(prefixedMessage))
  ) {
    return;
  }

  var stacktrace;

  if (frames && frames.length) {
    fileurl = frames[0].filename || fileurl;
    // Sentry expects frames oldest to newest
    // and JS sends them as newest to oldest
    frames.reverse();
    stacktrace = {frames: frames};
  } else if (fileurl) {
    stacktrace = {
      frames: [
        {
          filename: fileurl,
          lineno: lineno,
          in_app: true
        }
      ]
    };
  }

  if (
    !!this._globalOptions.ignoreUrls.test &&
    this._globalOptions.ignoreUrls.test(fileurl)
  ) {
    return;
  }

  if (
    !!this._globalOptions.whitelistUrls.test &&
    !this._globalOptions.whitelistUrls.test(fileurl)
  ) {
    return;
  }

  var data = objectMerge(
    {
      // sentry.interfaces.Exception
      exception: {
        values: [
          {
            type: type,
            value: message,
            stacktrace: stacktrace
          }
        ]
      },
      transaction: fileurl
    },
    options
  );

  var ex = data.exception.values[0];
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

  data.exception.mechanism = objectMerge(
    {
      type: 'generic',
      handled: true
    },
    data.exception.mechanism || {}
  );

  // Fire away!
  this._send(data);
}
TraceKit.report.subscribe(function(...args){
  // console.log(stackInfo)
  console.log('阿达', JSON.stringify(...args))
  handleOnErrorStackInfo(...args);
})

try {
  /*
   * your application code here
   *
   */
  throw new Error('oops');
} catch (e) {
  TraceKit.report(e); //error with stack trace gets normalized and sent to subscriber
}
setTimeout(function(){
  a
},1000)

