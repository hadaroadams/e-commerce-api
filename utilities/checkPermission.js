const { Unauthorized } = require("./../errors");

const CheckPermissons = (reqUser, resoUserId) => {
  if (reqUser.role === "admin") return;
  if (reqUser.userId === resoUserId.toString()) return;
  throw new Unauthorized("Not authorized to access this route");
};

module.exports = CheckPermissons;
