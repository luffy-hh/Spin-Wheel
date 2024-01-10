const express = require('express')
const {modifyApk, readAllApks} = require("./apkController");
const {uploadApksFile} = require("../helpers/upload");
const router = express.Router()
router.route('/').post(uploadApksFile,modifyApk).get(readAllApks)
module.exports= router