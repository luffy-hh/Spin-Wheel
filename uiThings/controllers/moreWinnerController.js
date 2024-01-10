const expressAsyncHandler = require("express-async-handler");
const MoreWinner = require("../models/moreWinnerModel");

exports.modifyMoreWinner = expressAsyncHandler(async (req, res) => {
  try {
    const exist = await MoreWinner.findOne({name:req.body.name});
    if (exist) {
      const updatedWinners = await MoreWinner.findOneAndUpdate(
          {name: req.body.name},
        {
          ...req.body,
        },
        { new: true }
      );
      res.status(200).json({
        status: "succeed",
        data: updatedWinners,
      });
    } else {
      const newWinners = await MoreWinner.create({ ...req.body });
      res.status(200).json({
        status: "succeed",
        data: newWinners,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

exports.readMoreWinner = expressAsyncHandler(async (req, res) => {
  try {
    const moreWinners = await MoreWinner.find({});
    if (moreWinners) {
      res.status(200).json({
        status: "succeed",
        data: moreWinners,
      });
    } else {
      res.status(200).json({
        status: "succeed",
        message: "There is nothing to show.",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
