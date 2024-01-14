const expressAsyncHandler = require("express-async-handler");
const Report = require("../models/reportsModel");
const LuckyNumbers = require("../../luckyNumbers/model/luckyNumbersModel");
const Reward = require("../../rewards/model/rewardsModel");

exports.createReport = async (luckyNumber, reward, agent, requested) => {
  const dataObj = {
    luckyNumber,
    agent,
    requested,
    reward,
  };
  console.log(dataObj);
  const createdReport = await Report.create({ ...dataObj });
  console.log(createdReport);
  return createdReport;
};

// get all report
// @ access Admin
// GET v1.1/admin/allReports
exports.getAllReport = expressAsyncHandler(async (req, res, next) => {
  try {
    const allReports = await Report.find({}).sort({ requested: -1 });
    if (allReports && allReports.length > 0) {
      console.log(allReports);
      res.status(200).json({
        status: "succeed",
        allReports,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "There is no report yet.",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
const findLucky = async (id) => {
  return await LuckyNumbers.findById(id);
};
// const findReward = async (id) => {
//   return await Reward.findById(id);``
// };
// get related report by id
exports.getReportWithAgId = expressAsyncHandler(async (req, res, next) => {
  try {
    const reports = await Report.find({
      agent: req.user.id,
    });

    if (reports && reports.length > 0) {
      const returnReports = await Promise.all(
        reports.map(async (rp) => {
          const luckyNumber = await LuckyNumbers.findById(rp.luckyNumber);
          const reward =
            luckyNumber.redeemCodeStatus === "Out"
              ? await Reward.findById(rp.reward)
              : null;

          // console.log(luckyNumber, reward);
          const obj = {
            _id: rp._id,
            luckyNumber: luckyNumber.redeemCode,
            reward: reward?.rewardName,
            draw: rp.draw,
            requested: rp.requested,
          };
          return obj;
        })
      );
      // console.log("rp:", returnReports);
      // const luckyArray =

      res.status(200).json({
        status: "succeed",
        returnReports,
      });
    } else {
      res.status(200).json({
        status: "succeed",
        message: "There is no report yet",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
exports.deleteReport = async (deletedRewardId) => {
  const deletedReport = await Report.deleteMany({ reward: deletedRewardId });
  return deletedReport;
};
exports.updateReport = expressAsyncHandler(async (req, res, next) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.body.id,
      {
        draw: true,
      },
      { new: true }
    );
    // console.log(updatedReport)
    res.status(200).json({
      status: "succeed",
      data: updatedReport,
    });
  } catch (e) {
    throw new Error(e);
  }
});
