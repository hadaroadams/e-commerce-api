const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_SECRET_URL);
  } catch (erro) {
    console.log(erro);
  }
};

module.exports = connectDB;
