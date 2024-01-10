const UiAgents = require('../models/uiAgentModel')
const expressAsyncHandler = require("express-async-handler");


exports.createUiAgent = expressAsyncHandler(async (req,res,next)=>{

    try {
        const exist = await UiAgents.findOne({
            $or: [{ name: req.body.name }, { phNum: req.body.phNum }],
        });
        console.log(req.body,'exist:',exist)
        if (exist) {
            const updatedUiAgent = await UiAgents.findOneAndUpdate(
                { $or: [{ name: req.body.name }, { phNum: req.body.phNum }] },
                { $set: { name: req.body.name, phNum: req.body.phNum } },
                { new: true }
            ).exec();
            res.status(200).json({
                status:'succeed',
                data:updatedUiAgent,
            })
        } else {
            const newUiAgent = await UiAgents.create({...req.body})
            res.status(200).json({
                status:'succeed',
                data:newUiAgent,
            })
        }
    }catch (error){
        throw  new Error(error)
    }
});

// exports.updateUiAgent = expressAsyncHandler(async (req,res,next)=>{
//     try {
//         const updatedUiAgent = await UiAgents.findOneAndUpdate({name:req.body.name},{text:req.body.text},{new:true})
//         if(updatedUiAgent){
//             res.status(200).json({
//                 status:'succeed',
//                 data:updatedUiAgent
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

exports.readUiAgent = expressAsyncHandler(async (req,res,next)=>{
    try{
        const allUiAgents = await UiAgents.find({})
        res.status(200).json({
            status:'succeed',
            data:allUiAgents
        })
    }catch (e) {
        throw new Error(e)
    }
})