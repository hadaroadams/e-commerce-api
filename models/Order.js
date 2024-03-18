const { Schema, Types, model } = require("mongoose");

const SingleOrderSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  amount: { type: Number, required: true },
  product: { type: Types.ObjectId, ref: "Product", required: true },
});

const OrderSchema = new Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      rquired: true,
    },
    orderItems: [SingleOrderSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    // clientSecret: {
    //   trpe: String,
    //   rquired: true,
    // },
    // paymentIntentId: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrderSchema);
