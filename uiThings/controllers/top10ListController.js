const Top10List = require('../models/top10ListModel')
const expressAsyncHandler = require("express-async-handler");


exports.modifyTop10List = expressAsyncHandler(async (req,res,next)=>{
    try {
        const exist = await Top10List.find({top:req.body.top});
        console.log(req.body)
        if(exist.length > 0){
            const updatedTop10 = await Top10List.findOneAndUpdate({top:req.body.top},{winnerName:req.body.winnerName},{new:true})
                res.status(200).json({
                    status:'succeed',
                    data:updatedTop10
                })
        }else{

            const newTop10 = await Top10List.create({...req.body})
            console.log(newTop10,'new top10')
            res.status(200).json({
                status:'succeed',
                data:newTop10
            })
        }
    }catch (error){
        throw  new Error(error)
    }
});

exports.readTop10 = expressAsyncHandler(async (req,res,next)=>{
    try{
        const top10 = await Top10List.find({})
        res.status(200).json({
            status:'succeed',
            data:top10
        })
    }catch (e) {
        throw new Error(e)
    }
})