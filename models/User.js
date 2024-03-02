const { Schema, model} = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserShema = new Schema({
  name: {
    type: String,
    required: [true, "please provide user name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide user email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserShema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserShema.methods.comparePassword = async function (candidatesPassword) {
  const isMatch = await bcrypt.compare(candidatesPassword, this.password);
  return isMatch;
};

module.exports = model("User", UserShema);
