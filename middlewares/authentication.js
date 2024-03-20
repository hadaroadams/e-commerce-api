const { Unauthenticated, Unauthorized } = require("../errors");
const { isTokenValid } = require("../utilities");

const authentication = async (req, res, next) => {
  console.log(req.signedCookies);
  const token = req.signedCookies.token;

  if (!token) return next(new Unauthenticated("Authentication Invalid"));
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    next(new Unauthenticated("Authentication"));
  }
};
const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      next(new Unauthorized("Unauthorized to access this route"));
    next();
  };
};

module.exports = { authentication, authorizePermission };
