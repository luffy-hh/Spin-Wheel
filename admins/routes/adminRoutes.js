const express = require("express");
const {
  signupAdmin,
  login,
  getMe,
} = require("../controllers/adminControllers");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const { createAgent, getAllAgents } = require("../controllers/agentController");
const {
  createReport,
  getAllReport,
  getReportWithAgId, updateReport,
} = require("../controllers/reportControllers");
// when need middlewares import below this line

const router = express.Router();

router.post("/register", signupAdmin);
router.post("/login", login);
router.route("/createAgent").post(authMiddleware, isAdmin, createAgent);
router.route("/").get(authMiddleware, isAdmin, getAllAgents);
router
  .route("/report")

  .post(authMiddleware, createReport)
  .get(authMiddleware, isAdmin, getAllReport);
router
  .route("/reportForAgent")
  .get(authMiddleware, getReportWithAgId)
  .patch(authMiddleware,updateReport);
router.route("/:id").get(authMiddleware, getMe);

module.exports = router;
