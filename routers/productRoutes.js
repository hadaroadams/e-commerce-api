const express = require("express");
const { authentication } = require("../middlewares/authentication");
const {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProducts,
  upLoadImage,
} = require("../controllers/productsController");
const Router = express.Router();

Router.route("/")
  .get(authentication, getAllproducts)
  .post(authentication, createProduct);

Router.route("/upload").post(authentication, upLoadImage);

Router.route("/:id")
  .get(getSingleProducts)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = Router;
