const User = require("../admins/models/adminModel");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
// const Roles = require("../roles/roleModel");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  //   console.log(req.headers);
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id).select("-password");
        // console.log(decoded, "line 15");
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized Or Token expired. Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = expressAsyncHandler(async (req, res, next) => {
  //   console.log(req.user);
  const { userName } = req.user;
  const adminUser = await User.findOne({ userName });


  // console.log(adminUser);
  if (adminUser.role !== "Admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
