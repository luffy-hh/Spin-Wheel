const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const adminRouter = require("./admins/routes/adminRoutes");
// const roleRouter = require("./roles/roleRoute");
const rewardRouter = require("./rewards/routes/rewardRoutes");
const luckyNumRouter = require("./luckyNumbers/routes/luckyNumbersRoute");
const uiThingsRouter = require("./uiThings/routes/uiThingsRoute");
const apkRouter = require("./apks/apkRoute");
const adsRouter = require("./ads/adsRoute");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static("static"));

app.use(cors());

// all users
app.use("/v1.1/admin", adminRouter);

//rewards
app.use("/v1.1/reward", rewardRouter);

// LuckyNumbers
app.use("/v1.1/luckyNumbers", luckyNumRouter);

// ui things
app.use("/v1.1/uiControl", uiThingsRouter);

// Ads
app.use("/v1.1/ads", adsRouter);

//apks
app.use("/v1.1/apksControl", apkRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});
app.use(errorHandler);
app.use(notFound);

module.exports = app;
