const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const foundUser = await User.findById(userId).select("-password");

    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = foundUser;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized, token failed",
      error: err.message,
    });
  }
};
