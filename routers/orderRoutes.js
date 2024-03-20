const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  currentOrder,
} = require("../controllers/orderController");
const { authentication, authorizePermission } = require("../middlewares/authentication");
const Router = express.Router();

Router.route("/")
  .post(authentication, createOrder)
  .get(authentication,authorizePermission("admin"), getAllOrders)
  .get(authentication, currentOrder);
Router.route("/:id")
  .get(authentication, getSingleOrder)
  .patch(authentication, updateOrder);
module.exports = Router;
