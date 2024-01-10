const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  createReward,
  getAllRewards,
  deleteAReward,
  getRewardsForUi,
} = require("../controllers/rewardControllers");
const { uploadRewardImg } = require("../../helpers/upload");
const router = express.Router();
// console.log(createReward);

router
  .route("/")
  .get(authMiddleware, isAdmin, getAllRewards)
  .post(authMiddleware, isAdmin, uploadRewardImg, createReward)
  .delete(authMiddleware, isAdmin, deleteAReward);

router.route("/uiReward").get(getRewardsForUi);
module.exports = router;
