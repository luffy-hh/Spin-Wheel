const express = require("express");
const {
  createMarquee,
  readMarquee,
} = require("../controllers/marqueeController");
const { createTerms, readTerm } = require("../controllers/termsController");
const {
  modifyTop10List,
  readTop10,
} = require("../controllers/top10ListController");
const {
  createUiAgent,
  readUiAgent,
} = require("../controllers/uiAgentController");
const {
  modifyMoreWinner,
  readMoreWinner,
} = require("../controllers/moreWinnerController");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/marquee")
  .post(authMiddleware, isAdmin, createMarquee)
  .get(readMarquee);
router.route("/terms").post(authMiddleware, isAdmin, createTerms).get(readTerm);
router
  .route("/top10")
  .post(authMiddleware, isAdmin, modifyTop10List)
  .get(readTop10);
router
  .route("/uiAgent")
  .post(authMiddleware, isAdmin, createUiAgent)
  .get(readUiAgent);
router
  .route("/moreWinner")
  .post(authMiddleware, isAdmin, modifyMoreWinner)
  .get(readMoreWinner);
module.exports = router;
