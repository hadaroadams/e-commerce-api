const { Schema, Types } = require("mongoose");

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
      type: Types.ObjectId,
      required: true,
    },
  },
  { timestamps: {} }
);
