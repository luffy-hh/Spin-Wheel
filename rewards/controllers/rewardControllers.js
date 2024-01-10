const expressAsyncHandler = require("express-async-handler");
const Reward = require("../model/rewardsModel");
const fs = require("fs");
const path = require("path");
const BASE_URL = require("../../config/baseUrl");
// console.log(BASE_URL);
const {
  generateLucky,
  deleteLucky,
} = require("../../luckyNumbers/controllers/luckyNumbersController");

const { deleteReport } = require("../../admins/controllers/reportControllers");

exports.createReward = expressAsyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body, req.file, 28);
    const { name, qty } = req.body;
    const imgPath = BASE_URL + "/rewardImgs/" + req.file.filename;
    const dataObj = {
      rewardName: name,
      rewardImage: req.file.filename,
      url: imgPath,
      rewardQuantity: qty,
    };
    const allReward = await Reward.find({});
    if (allReward.length === 16) {
      res.status(200).json({
        status: "failed",
        message: "Reward Limit already full.",
      });
    } else {
      const newReward = await Reward.create(dataObj);
      const generatedLucky = await generateLucky(Number(qty), newReward._id);
      console.log(generatedLucky);
      if (generatedLucky === "success") {
        res.status(200).json({
          status: "succeed",
          data: {
            generatedLucky,
            message: "Reward created Successfully",
          },
        });
      } else {
        res.status(500).json({
          status: "failed",
          message: "Something went wrong while generating lucky number",
        });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});

exports.getAllRewards = expressAsyncHandler(async (req, res, next) => {
  try {
    const allRewards = await Reward.find({});
    res.status(200).json({
      status: "succeed",
      data: {
        allRewards,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.getRewardsForUi = expressAsyncHandler(async (req, res, next) => {
  try {
    const allRewards = await Reward.find({}).select(
      "-presetStatus -createdAt -rewardQuantity -updatedAt -__v"
    );
    res.status(200).json({
      status: "succeed",
      allRewards,
    });
    // console.log(allRewards);
  } catch (error) {
    throw new Error(error);
  }
});

// deleting a single reward and related luckyNumber data
exports.deleteAReward = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const deletedReward = await Reward.findByIdAndDelete(req.body.id);
  if (deletedReward) {
    // check if image exists in storage
    const imgPath = path.join("public/rewardImgs", deletedReward.rewardImage);
    // console.log(imgPath && fs.existsSync(imgPath));
    if (imgPath && fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
      fs.unlinkSync(imgPath);
    }
    const message = await deleteLucky(req.body.id);
    const deletedReports = await deleteReport(req.body.id);
    console.log(deletedReports);
    res.status(200).json({
      status: "succeed",
      message: `${deletedReward.rewardName} Deleted Successfully. and ${message}`,
    });
  } else {
    throw new Error("Reward didn't exist or already deleted.");
  }
});
