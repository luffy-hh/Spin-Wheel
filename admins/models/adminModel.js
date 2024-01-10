const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    password: { type: String, require: true },
    role: {
      type: String,
      enu: ["Admin", "Agent"],
      default: "Agent",
    },
    status: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
adminSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
