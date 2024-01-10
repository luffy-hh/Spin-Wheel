const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  getAllLuckyNumber,
  getRandomLuckyNumber,
  updateLuckyNumber,
  setForAnAgent,
  makeLuckyOut, checkLuckyNumber,
} = require("../controllers/luckyNumbersController");
const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdmin, getAllLuckyNumber)
  .patch(authMiddleware, isAdmin, updateLuckyNumber)
  .post(authMiddleware, isAdmin, setForAnAgent)
  .put(makeLuckyOut);

router.route("/getRandom").get(authMiddleware, getRandomLuckyNumber);

router.route('/fromUi').post(checkLuckyNumber);
module.exports = router;
