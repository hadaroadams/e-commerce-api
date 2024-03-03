const { StatusCodes } = require("http-status-codes");
const User = require("./../models/User");
const { NotFound, Unauthorized, BadRequest } = require("../errors");
const { createTokenUser } = require("../utilities");
const { attachCookieToResponse } = require("../utilities/jwt");

const getAllUser = async (req, res) => {
  //   console.log(req.user);
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  //   console.log(req.user);
  const {
    params: { id: _id },
    user: { userId, role },
  } = req;
  const user = await User.findOne({ _id }).select("-password");
  console.log(typeof _id);
  if (!user) return next(new NotFound(`No user found with id:${_id}`));
  if (!(userId === _id || role === "admin"))
    return next(new Unauthorized("Not authorized to access this route"));
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const changePassword = async (req, res, next) => {
  const {
    body: { oldPassword, newPassword },
    user: { userId: _id },
  } = req;
  if (!(oldPassword || newPassword))
    return next(new BadRequest("Invalid Credentials"));
  const user = await User.findById(_id);
  if (!user) return next(new NotFound("user not found"));
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) return next(new Unauthorized("Provide correct Password"));
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password is successfully changed" });
};

const updateUser = async (req, res, next) => {
  const {
    body: { email, name },
    user: { userId },
  } = req;
  if (!(name || email))
    return next(new BadRequest("Please provide name and email"));
  const user = await User.findOne({ _id: userId });

  user.name = name;
  user.email = email;
  const result = await user.save();
  const tokenUser = createTokenUser(result);
  attachCookieToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  changePassword,
  updateUser,
};
