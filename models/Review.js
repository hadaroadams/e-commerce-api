const { Schema, Types, model, default: mongoose } = require("mongoose");

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    title: {
      type: String,
      required: [true, "please provide title"],
      minlength: 3,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = model("Review", ReviewSchema);
