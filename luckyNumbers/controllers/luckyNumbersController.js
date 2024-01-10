const expressAsyncHandler = require("express-async-handler");
const LuckyNumbers = require("../model/luckyNumbersModel");
const Reward = require("../../rewards/model/rewardsModel");
const randomstring = require("randomstring");
const {
  deleteReport,
  createReport,
} = require("../../admins/controllers/reportControllers");
const Admin = require("../../admins/models/adminModel");

// Generate Random String
async function generateRandomString() {
  const randomLetters = await randomstring.generate({
    length: 2,
    charset: "alphabetic",
    capitalization: "uppercase",
  });
  //   console.log(randomLetters);
  const randomNumbers = await randomstring.generate({
    length: 8,
    charset: "numeric",
  });
  //   console.log(randomNumbers);
  const randomString = randomLetters + randomNumbers;
  //   console.log(randomString);
  return randomString;
}

// check code is available or existed
async function checkCodeAvailability(string) {
  try {
    const code = await LuckyNumbers.findOne({ redeemCode: string });
    return !code; // Return true if code is not found, false otherwise
  } catch (error) {
    // console.log(error);
    return false; // Return false in case of any error
  }
}

// generate luckyNumber depending on the quantity of Reward is created
exports.generateLucky = expressAsyncHandler(async (qty, id) => {
  //   console.log(qty, id);
  try {
    let randomString = "";
    let curQty = 0;
    const generatedStrings = [];

    while (curQty < qty) {
      randomString = await generateRandomString();
      // console.log(randomString);
      if (generatedStrings.includes(randomString)) {
        continue;
      }
      const codeAvailable = await checkCodeAvailability(randomString);

      if (codeAvailable) {
        // Add the random string to the database
        generatedStrings.push(randomString);
        curQty++;
      }
    }

    Promise.all(
      generatedStrings.map(async (string) => {
        const obj = {
          redeemCode: string,
          rewardId: id,
        };
        const newLucky = await LuckyNumbers.create(obj);
      })
    );
    console.log(generatedStrings);
    return "success";
  } catch (error) {
    throw new Error("An error occurred in generating lucky Number");
  }
});

// Delete luckyNumbers when the related reward is deleted
exports.deleteLucky = expressAsyncHandler(async (id) => {
  const orgLucky = await LuckyNumbers.find({ rewardId: id });
  const deleteLucky = await LuckyNumbers.deleteMany({
    rewardId: id,
  });
  console.log(deleteLucky);
  if (deleteLucky.deletedCount > 0) {
    const message = `Deleted ${deleteLucky.deletedCount} LuckyNumbers with rewardId: ${id} `;
    return message;
  } else {
    const message = `No LuckyNumber is found that is related to rewardId: ${id}`;
    return message;
  }
});
// get all lucky number from admin
// @access admin only
// GET /v1.1/luckyNumbers
exports.getAllLuckyNumber = expressAsyncHandler(async (req, res, next) => {
  try {
    const allLuckyNumber = await LuckyNumbers.find({});
    res.status(200).json({
      status: "succeed",
      data: {
        allLuckyNumber,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get a random LuckyNumber from agent
// @access Agent
// GET /v1.1/luckyNumbers/getRandom
exports.getRandomLuckyNumber = expressAsyncHandler(async (req, res, next) => {
  try {
    const currentTime = new Date();
    const checkIfUserIsPreset = await LuckyNumbers.findOne({
      presetStatus: req.user.id,
    });
    let presetUpdatedTime;
    if (checkIfUserIsPreset) {
      presetUpdatedTime = new Date(checkIfUserIsPreset.outTime);
    }
    let updatedLucky = {};
    if (
      checkIfUserIsPreset &&
      currentTime.getTime() >= presetUpdatedTime.getTime() + 2 * 60 * 60 * 1000
    ) {
      updatedLucky = await LuckyNumbers.findByIdAndUpdate(
        checkIfUserIsPreset._id,
        { redeemCodeStatus: "Requested" },
        { new: true }
      );
      res.status(200).json({
        status: "Succeed",
        updatedLucky,
      });
    } else {
      const allAvailableNumbers = await LuckyNumbers.find({
        redeemCodeStatus: { $in: ["Available"] },
      });
      const randomIndex = Math.floor(
        Math.random() * allAvailableNumbers.length
      );
      const randomLucky = allAvailableNumbers[randomIndex];
      updatedLucky = await LuckyNumbers.findByIdAndUpdate(
        randomLucky._id,
        {
          redeemCodeStatus: "Requested",
        },
        { new: true }
      );

      res.status(200).json({
        status: "Succeed",
        updatedLucky,
      });
    }
    const luckyNumber = updatedLucky._id;
    const reward = updatedLucky.rewardId;
    const agent = await Admin.findById(req.user.id);

    // console.log(luckyNumber, reward, agent._id);
    const updateReport = await createReport(
      luckyNumber,
      reward,
      agent._id,
      currentTime
    );
    // console.log(updateReport);
  } catch (e) {
    throw new Error(e);
  }
});

// change redeemCodeStatus preset or available
// @access Admin
// PATCH /v1.1/luckyNumbers
exports.updateLuckyNumber = expressAsyncHandler(async (req, res, next) => {
  const existingNum = await LuckyNumbers.findById(req.body.id);
  // console.log(req.body.id);
  if (existingNum) {
    const newRedeemCodeStatus =
      existingNum.redeemCodeStatus === "Preset" ? "Available" : "Preset";

    const updatedNum = await LuckyNumbers.findByIdAndUpdate(
      req.body.id,
      { redeemCodeStatus: newRedeemCodeStatus },
      { new: true }
    );
    let updatedReward;
    if (updatedNum?.redeemCodeStatus === "Preset") {
      updatedReward = await Reward.findByIdAndUpdate(
        updatedNum?.rewardId,
        {
          $inc: { rewardQuantity: -1, presetStatus: 1 },
        },
        { new: true }
      );
    } else {
      updatedReward = await Reward.findByIdAndUpdate(
        updatedNum?.rewardId,
        {
          $inc: { rewardQuantity: 1, presetStatus: -1 },
        },
        { new: true }
      );
    }
    if (updatedNum) {
      res.status(200).json({
        status: "Lucky Number updated successfully",
        updatedNum,
      });
    } else {
      throw new Error("Something went wrong.");
    }
    // updatedNum will now contain the document with the updated redeemCodeStatus
  } else {
    // Handle the case where the document with the specified id is not found
    throw new Error("This LuckyNumber is INVALID.");
  }
});

// setting the reward and lucky number for specific agent
//@access Admin
//POST /v1.1/luckyNumbers
exports.setForAnAgent = expressAsyncHandler(async (req, res, next) => {
  try {
    const presetStatus = req.body.agentId;
    const outTime = req.body.outTime;
    const isExist = await LuckyNumbers.findById(req.body.luckyId);
    if (isExist) {
      const updatedReward = await Reward.findByIdAndUpdate(
        isExist.rewardId,
        {
          $inc: { rewardQuantity: -1, presetStatus: 1 },
        },
        { new: true }
      );

      const updateWithAgent = await LuckyNumbers.findByIdAndUpdate(
        req.body.luckyId,
        {
          outTime,
          presetStatus,
          redeemCodeStatus: "Preset",
        },
        { new: true }
      );
      res.status(200).json({
        status: "LuckyNumber successfully set with an agent.",
        updateWithAgent,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// change luckyNumber to out
//@access public
//PUT /v1.1/luckyNumbers
exports.makeLuckyOut = expressAsyncHandler(async (req, res, next) => {
  const orgLucky = await LuckyNumbers.findById(req.body.id);
  const updatedLucky = await LuckyNumbers.findByIdAndUpdate(
    req.body.id,
    {
      redeemCodeStatus: "Out",
    },
    { new: true }
  );
  let updatedReward;
  if (orgLucky.redeemCodeStatus === "Preset") {
    updatedReward = await Reward.findByIdAndUpdate(
      orgLucky.rewardId,
      {
        $inc: { presetStatus: -1 },
      },
      { new: true }
    );
  } else {
    updatedReward = await Reward.findByIdAndUpdate(
      orgLucky.rewardId,
      {
        $inc: { rewardQuantity: -1 },
      },
      { new: true }
    );
  }
  if (updatedLucky) {
    res.status(200).json({
      status: "succeed",
      message: `${updatedLucky.redeemCode} is Out now.`,
      updatedLucky,
    });
  } else {
    throw new Error(`LuckyNumber didn't exist.`);
  }
});

// check luckyNumber available or out
//@access public
//post /v1.1/luckyNumbers/fromUi
exports.checkLuckyNumber = expressAsyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const exist = await LuckyNumbers.findOne({ redeemCode: req.body.number });
    console.log(exist);
    if (exist && exist.redeemCodeStatus !== "Out") {
      const userLucky = await LuckyNumbers.findOne({
        redeemCode: req.body.number,
      }).populate("rewardId");
      console.log(userLucky);
      res.status(200).json({
        status: "succeed",
        data: userLucky,
      });
    } else {
      res.status(200).json({
        status: "succeed",
        message: "The Number you entered is 'not valid' or 'already out' ",
      });
    }
  } catch (e) {
    throw new Error(e);
  }
});
