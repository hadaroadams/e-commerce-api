const { StatusCodes } = require("http-status-codes");
const User = require("./../models/User");
const { NotFound } = require("../errors");

const getAllUser = async (req, res) => {
  //   console.log(req.user);
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  const {
    params: { id: _id },
  } = req;
  const user = await User.findOne({ _id }).select("-password");
  if (!user) return next(new NotFound(`No user found with id:${_id}`));
  res.status(StatusCodes.OK).json({ user });
};

module.exports = { getAllUser, getSingleUser };
