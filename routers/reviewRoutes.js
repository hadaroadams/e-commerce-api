const express = require("express");
const {
  getAllReview,
  createReview,
  getSingleReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");
const { authentication } = require("../middlewares/authentication");
const Router = express.Router();

Router.route("/").get(getAllReview).post(authentication, createReview);
Router.route("/:id")
  .get(getSingleReview)
  .patch(authentication, updateReview)
  .delete(authentication, deleteReview);

module.exports = Router;
