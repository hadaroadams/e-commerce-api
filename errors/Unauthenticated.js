const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
