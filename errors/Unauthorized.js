const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");

class Unauthorized extends CustomError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
