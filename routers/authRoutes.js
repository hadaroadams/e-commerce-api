const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.get("/logout", logout);

module.exports = Router;
