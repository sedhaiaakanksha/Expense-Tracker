const mongoose = require("mongoose");

const bcrypt = require("bcrypt.js");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, requires: true },
    password: { type: String, requires: true },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true },
);

//Hash password before saving

UserSchema.pre("save", async function (next) {
  if (!this.isDirectModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
