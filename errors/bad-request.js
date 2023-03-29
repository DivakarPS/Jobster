const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    console.log("new error with msg:",message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;