const { StatusCodes } = require("http-status-codes");
const { object } = require("webidl-conversions");

const errorHandle = (err, req, res, next) => {
  const customError = {
    msg: err.message || "something went wrong",
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.status = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplication value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.status = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "castError") {
    customError.msg = `No Item found with id:${err.value}`;
    customError.status = StatusCodes.NOT_FOUND;
  }

  res.status(customError.status).json({ msg: customError.msg });
};

module.exports = errorHandle;
