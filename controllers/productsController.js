const { StatusCodes } = require("http-status-codes");
const Product = require("../models/EcomProducts");
const { NotFound, BadRequest } = require("../errors");
const path = require("path");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllproducts = async (req, res) => {
  const { userId } = req.user;
  const products = await Product.find({ user: userId });
  res.status(StatusCodes.OK).json({ products: { products } });
};

const getSingleProducts = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id }).populate("reviews");
  console.log(product.reviews);
  // console.log(product);
  if (!product) return next(new NotFound(`Product with id:${id} not found`));
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) return next(new NotFound(`Product with id:${id} not found`));
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });
  if (!product) return next(new NotFound(`Product with id:${id} not found`));
  await product.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Product has successfully been deleted" });
};

const upLoadImage = async (req, res, next) => {
  console.log(req.files);
  if (!req.files) next(new BadRequest("No file Uploaded"));
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image"))
    next(new BadRequest("Please upload image"));

  const maxSize = 1024 * 1024;
  if (!productImage > maxSize)
    next(new BadRequest("please upload imgae smaller 1MB"));
  const imagePath = path.join(__dirname, "..", "upload", productImage.name);
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ img: { src: `/upload/${productImage.name} ` } });
};

module.exports = {
  createProduct,
  getAllproducts,
  getSingleProducts,
  deleteProduct,
  updateProduct,
  upLoadImage,
};
