const jwt = require("jsonwebtoken");

//Generate JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { ecpiresIn: "1h" });
};

//Register Uer
exports.regsiterUser = async (require, res) => {};

//Login User
exports.loginUser = async (require, res) => {};

//Register User
exports.getUserInfo = async (require, res) => {};
