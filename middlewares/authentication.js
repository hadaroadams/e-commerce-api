const { Unauthenticated } = require("../errors");
const { isTokenValid } = require("../utilities");

const authentication = async (req, res, next) => {
  console.log(req.signedCookies);
  const token = req.signedCookies.token;

  if (!token) return next(new Unauthenticated("Authentication Invalid"));
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next()
  } catch (error) {
    next(new Unauthenticated("Authentication"));
  }
};

module.exports = { authentication };
