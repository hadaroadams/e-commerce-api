const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookieToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  console.log(token);

  res.cookie("token", token, {
    httpOnly: true,
    expiresIn: "1d",
    secure: process.env.NODE_ENVIRON === "production",
    signed: true,
  });
};

module.exports = { createJWT, isTokenValid, attachCookieToResponse };
