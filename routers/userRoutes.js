const express = require("express");
const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  changePassword,
  updateUser,
} = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");
const Router = express.Router();

Router.route("/").get(authentication, getAllUser);
Router.route("/showMe").get(authentication, showCurrentUser);
Router.route("/updateUserPassword").patch(authentication, changePassword);
Router.route("/updateUser").patch(authentication, updateUser);
Router.route("/:id").get(authentication, getSingleUser);

module.exports = Router;
