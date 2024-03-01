const express = require("express");
const Router = express.Router();

Router.post("/register", async (req, res) => {
  res.status(200).send("working");
});
Router.post("/login", async (req, res) => {
  res.status(200).send("working");
});
Router.get("/logout", async (req, res) => {
  res.status(200).send("working");
});

module.exports = Router;
