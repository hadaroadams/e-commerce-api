const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");
const Product = require("../models/EcomProducts");
const Order = require("../models/Order");

const createOrder = async (req, res, next) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1)
    next(new BadRequest("No cart Items provided"));
  if (!(tax || shippingFee))
    next(new BadRequest("please provide tax and shipping fee"));
  const order = {
    orderItems: [],
    subtotal: 0,
    user: req.user.userId,
    tax,
    shippingFee,
  };
  for (const item of cartItems) {
    const { product: productId, amount } = item;
    const dbProduct = await Product.findOne({ _id: productId });
    if (!dbProduct) next(new NotFound(`No product with id: ${productId}`));
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount,
      name,
      price,
      image,
      product: _id,
    };
    console.log(singleOrderItem);
    order.orderItems = [...order.orderItems, singleOrderItem];

    order.subtotal += price * amount;
  }
  order.total = tax + shippingFee + order.subtotal;
  console.log(order);
  const result = await Order.create(order);
  res.status(StatusCodes.CREATED).json(result);
};

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
};

const getSingleOrder = async (req, res, next) => {
  const {
    user: { userId },
    param: { id: orderId },
  } = req;
  const order = await Order.findOne({ _id: orderId });
  if (!order) next(new NotFound(`Order with Id:${orderId} not found`));
  res.status(StatusCodes.OK).json(order);
};

const currentOrder = async (req, res) => {
  const order = await Order.find({ user: user.userId });
  res.status(StatusCodes.OK).json({ order });
};

const updateOrder = async (req, res) => {
  const {
    params: { id },
    user: userId,
    body,
  } = req;
  const order = await Order.find({ _id: id });
  if (order) next(new NotFound(`Order with id: ${id} not found`));

  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

module.exports = { createOrder, getAllOrders, getSingleOrder ,updateOrder,currentOrder};
