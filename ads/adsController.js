const expressAsyncHandler = require("express-async-handler");
const BASE_URL = require("../config/baseUrl");
const Ads = require("./adsModels");
const fs = require("fs");
const path = require("path");



exports.createAds = expressAsyncHandler(async (req, res, next) => {
  try {
    const url = BASE_URL + "/adsImgs/" + req.file.filename;
    const exist = await Ads.findOne({name:req.body.name})
    if(exist){
      const imgPath = path.join("public/adsImgs", exist.imgPath);
      if (imgPath && fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
        fs.unlinkSync(imgPath);
      }
      const updatedAds = await Ads.findOneAndUpdate({name:req.body.name},{$set:{name:req.body.name,imgPath:req.file.filename,url}},{new:true})
      res.status(200).json({
        status: "succeed",
        data: updatedAds,
      });
    }else{
      const newAdObj = { name: req.body.name, url,imgPath:req.file.filename };
      const newAds = await Ads.create({ ...newAdObj });
      res.status(200).json({
        status: "succeed",
        data: newAds,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

exports.readAllads = expressAsyncHandler(async  (req,res,next)=>{
  try {
    const allAds = await Ads.find({});
    res.status(200).json({
      status:'succeed',
      data:allAds
    })
  }catch (e) {
    throw new Error(e)
  }
})

exports.deleteAnAds= expressAsyncHandler(async (req,res,next)=>{
  try{
    console.log(req.body , 'del ad body')
    const exist = await Ads.findById(req.body.id);
    console.log(exist);
    if(exist){
      const imgPath = path.join("public/adsImgs", exist.imgPath);
      if (imgPath && fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
        fs.unlinkSync(imgPath);
      }
      const deletedAds = await Ads.findByIdAndDelete(req.body.id);
      console.log(deletedAds)
      res.status(200).json({
        status:'succeed',
        message:'Ads Delete successfully'

      })
    }else{
      res.status(200).json({
        status:'succeed',
        message:'The Ads belong to this Id has not found.'
      })
    }

  }catch (e) {
    throw new Error(e)
  }
})
