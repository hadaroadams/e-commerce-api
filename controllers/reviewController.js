const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");
const Review = require("./../models/Review");
const Product = require("./../models/EcomProducts");

const createReview = async (req, res, next) => {
  const { product: productId } = req.body;
  if (!productId) next(new BadRequest("Please provide product Id"));
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct)
    next(new NotFound(`Review with id:${productId} does not exist`));
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReview = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews });
};
const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review)
    next(new NotFound(`Review with id:${req.params.id} does not exist`));
  res.status(StatusCodes.OK).json({ review });
};
const updateReview = async (req, res) => {
  const {
    params: { id: _id },
    body,
  } = req;
  const review = await Review.findOneAndUpdate({ _id }, body, {
    new: true,
    runValidators: true,
  });
  if (!review) next(new NotFound(`Review with id:${_id} does not exist`));
  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id });
  if (!review) next(new NotFound(`Review with id:${productId} does not exist`));
  res
    .status(StatusCodes.OK)
    .json({ msg: "review has been deleted sucsessfully" });
};

module.exports = {
  createReview,
  getAllReview,
  deleteReview,
  updateReview,
  getSingleReview,
};
