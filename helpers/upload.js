const multer = require("multer");
const path = require("path");

// console.log(createReward);
// create storage for rewardImgs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/rewardImgs");
  },
  filename: function (req, file, cb) {
    // console.log(req, file);
    console.log(req.body, file);
    const uniqueSuffix = Date.now();
    cb(
      null,
      file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// create storage for ads
const storageAds = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/adsImgs");
  },
  filename: function (req, file, cb) {
    // console.log(req, file);
    console.log(req.body, file);
    const uniqueSuffix = Date.now();
    cb(
      null,
      file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// create storage for apks
const storageApk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/apks");
  },
  filename: function (req, file, cb) {
    // console.log(req, file);
    console.log(req.body, file);
    const uniqueSuffix = Date.now();
    cb(
        null,
        file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

const uploadAds = multer({
  storage: storageAds,
});

const uploadApks = multer({
  storage: storageApk
})

exports.uploadApksFile = uploadApks.single('apk')
exports.uploadRewardImg = upload.single("image");
exports.uploadAdsImg = uploadAds.single("image");
