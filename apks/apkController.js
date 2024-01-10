const Apk = require('./apkModel')
const BASE_URL= require('../config/baseUrl')
const expressAsyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

exports.modifyApk = expressAsyncHandler(async (req,res,next)=>{
    console.log(req.body)
    try {

        const apkUrl=BASE_URL+/apks/+req.file.filename
        console.log(apkUrl);
        const exist = await Apk.findOne({name : req.body.name})
        console.log(exist);
        if(exist){
            const file = path.join("public/apks", exist.filePath);
            if (file && fs.existsSync(file) && fs.statSync(file).isFile()) {
                fs.unlinkSync(file);
            }
            const updatedApk = await Apk.findOneAndUpdate({name:req.body.name},{$set:{url:apkUrl, filePath: req.file.filename} },{new:true})
            res.status(200).json({
                status:'succeed',
                data : updatedApk
            })
        }else{

            const obj = {
               name:req.body.name,
                filePath:req.file.filename,
                url : apkUrl
            }
            const newApk = await Apk.create({
                ...obj
            })
            console.log(newApk, obj)
            res.status(200).json({
                status:'succeed',
                data:newApk
            })
        }
    }catch (e) {
        throw new Error(e)
    }
})

exports.readAllApks = expressAsyncHandler(async (req,res,next)=>{
    try {
        const allApks = await Apk.find({});
        res.status(200).json({
            status:'succeed',
            data:allApks
        })
    }catch (e) {
        throw new Error(e)
    }
})