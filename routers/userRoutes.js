const express = require("express");
const { getAllUser, getSingleUser } = require("../controllers/userController");
const Router = express.Router();

Router.route("/").get(getAllUser);
Router.route("/:id").get(getSingleUser);

module.exports = Router;
