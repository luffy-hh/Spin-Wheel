const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const signToken = ({ ...obj }, secret) => {
  return jwt.sign({ ...obj }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signupAdmin = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body);
    if (!req.body.userName || !req.body.password) {
      return next(new Error("Please Provide User and password", 400));
    }
    const isAlreadyExist = await Admin.findOne({ userName: req.body.userName });

    if (isAlreadyExist)
      return next(new Error("User Name already existed"), 400);

    const newAdmin = await Admin.create({ ...req.body, created: Date.now() });
    const token = signToken({ id: newAdmin._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: "succeed",
      token,
      data: {
        newAdmin,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});
exports.login = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body);
    const { userName, password } = req.body;

    // check if there is userName and password in request body
    if (!userName || !password) {
      return next(new Error("Please Provide User and password", 400));
    }
    // check if user exist in database or not
    const admin = await Admin.findOne({ userName }).select("+password");
    if (!admin || !(await admin.isPasswordMatched(password, admin.password))) {
      return next(new Error("Incorrect Email Or Password"));
    }

    if (!admin.status) {
      return next(new Error("You have been banned or deleted your account."));
    }
    // if user exist and the password was also true
    const token = signToken({ id: admin._id }, process.env.JWT_SECRET);
    const refreshToken = signToken(
      { id: admin._id, role: admin.role },
      process.env.REFRESH_SECRET
    );
    const addedRefresh = await Admin.findByIdAndUpdate(
      admin._id,
      { refreshToken },
      { new: true }
    );

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "Success",
      token,
      admin: {
        userName: admin.userName,
        role: admin.role,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
});

exports.getMe = asyncHandler(async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user.id).select("-password");
    // console.log(user);
    res.status(200).json({
      status: "succeed",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});
