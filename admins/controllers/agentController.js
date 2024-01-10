const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.createAgent = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.userName || !req.body.password) {
      return next(new Error("Please Provide User and password", 400));
    }
    const isAlreadyExist = await Admin.findOne({ userName: req.body.userName });
    if (isAlreadyExist) return next(new Error("User Already Existed"), 400);
    const newAgent = await Admin.create({ ...req.body, created: Date.now() });
    const token = signToken(newAgent._id);
    res.status(200).json({
      status: "succeed",
      token,
      data: {
        newAgent,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

// exports.loginAgent = asyncHandler(async (req, res, next) => {
//   try {
//     const { userName, password } = req.body;

//     // check if there is userName and password in request body
//     if (!userName || !password) {
//       return next(new Error("Please Provide User and password", 400));
//     }
//     // check if user exist in database or not
//     const agent = await Admin.findOne({ userName }).select("+password");
//     if (!agent || !(await agent.isPasswordMatched(password, agent.password))) {
//       return next(new Error("Incorrect Email Or Password"));
//     }
//     // if user exist and the password was also true
//     const token = signToken(agent._id);
//     res.status(200).json({
//       status: "Success",
//       token,
//       agent,
//     });
//   } catch (err) {
//     throw new Error(err);
//   }
// });

exports.getAllAgents = asyncHandler(async (req, res, next) => {
  try {
    const allAgents = await Admin.find({ role: "Agent" });
    res.status(200).json({
      status: "succeed",
      allAgents,
    });
  } catch (error) {
    throw new Error(error);
  }
});
