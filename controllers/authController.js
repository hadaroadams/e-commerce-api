const { BadRequest, NotFound } = require("../errors");
const { createTokenUser } = require("../utilities");
const { attachCookieToResponse } = require("../utilities/jwt");
const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ ...req.body, role });
  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });
  return res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res, next) => {
  const { password, email } = req.body;
  if (!(password || email))
    return next(new BadRequest("Please provide email and password"));
  const user = await User.findOne({ email });
  if (!user) return next(new NotFound("Email does not exist"));
  // console.log(user.password);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) return next(new BadRequest("Password is incorrect"));

  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expiresIn: "1d",
  });
  res.status(StatusCodes.OK).json({ msg: `user logged out successfully` });
};

module.exports = { register, login, logout };
