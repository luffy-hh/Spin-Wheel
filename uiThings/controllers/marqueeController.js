const Marquee = require('../models/marqueeModel')
const expressAsyncHandler = require("express-async-handler");


exports.createMarquee = expressAsyncHandler(async (req,res,next)=>{
    try {
        const exist = await Marquee.find({name:req.body.name})
        if(exist.length > 0){
            const updatedMarquee = await Marquee.findOneAndUpdate({name:req.body.name},{
                text: req.body.text
            },{new:true})
            res.status(200).json({
                status:'succeed',
                data: updatedMarquee
            })
        }else{
            const newMarquee = await Marquee.create({...req.body})
            res.status(200).json({
                status:'succeed',
                data:newMarquee
            })
        }

    }catch (error){
        throw  new Error(error)
    }
});

// exports.updateMarquee = expressAsyncHandler(async (req,res,next)=>{
//     try {
//         const updatedMarquee = await Marquee.findOneAndUpdate({name:req.body.name},{text:req.body.text},{new:true})
//         if(updatedMarquee){
//             res.status(200).json({
//                 status:'succeed',
//                 data:updatedMarquee
//             })
//         }else{
//             res.status(403).json({
//                 status:'failed',
//                 message:'Something Went wrong'
//             })
//         }
//     } catch (error){
//         throw new Error(error)
//     }
// })

exports.readMarquee = expressAsyncHandler(async (req,res,next)=>{
    try{
        const marquee = await Marquee.find({})
        res.status(200).json({
            status:'succeed',
            data:marquee
        })
    }catch (e) {
        throw new Error(e)
    }
})