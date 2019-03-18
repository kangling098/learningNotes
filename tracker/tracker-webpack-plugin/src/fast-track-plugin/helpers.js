const VError = require('verror');
const isString = require('lodash.isstring');
const { ROLLBAR_REQ_FIELDS } = require('./constants');

// Take a single Error or array of Errors and return an array of errors that
// have message prefixed.
exports.handleError = function handleError(err, prefix = 'FastTrackPlugin') {
  if (!err) {
    return [];
  }

  const errors = [].concat(err);
  return errors.map(e => new VError(e, prefix));
}

// Validate required options and return an array of errors or null if there
// are no errors.
exports.validateOptions = function validateOptions(ref) {
  const errors = ROLLBAR_REQ_FIELDS.reduce((result, field) => {
    // if (field === 'prefix_path'
    //     && ref && ref[field]
    //     && !isString(ref[field])) {
    //   return [
    //     ...result,
    //     new TypeError(`invalid type. '${field}' expected to be string.`)
    //   ];
    // }

    if (ref && ref[field]) {
      return result;
    }

    return [
      ...result,
      new Error(`required field, '${field}', is missing.`)
    ];
  }, []);

  return errors.length ? errors : null;
}
