const express = require("express");
const { createAds, readAllads, deleteAnAds} = require("./adsController");
const { uploadAdsImg } = require("../helpers/upload");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const {modifyApkAds, readAllApkAds, deleteAnApkAds} = require("./apkAdsController");
const router = express.Router();

router.route("/").post(uploadAdsImg, createAds).get(readAllads).delete(authMiddleware,isAdmin,deleteAnAds);
router.route('/apkAds').post(uploadAdsImg,modifyApkAds).get(readAllApkAds).delete(authMiddleware,isAdmin,deleteAnApkAds);
module.exports = router;
