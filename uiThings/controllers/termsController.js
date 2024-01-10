const Terms = require('../models/termsModel')
const expressAsyncHandler = require("express-async-handler");


exports.createTerms = expressAsyncHandler(async (req,res,next)=>{
    try {
        const exist = await Terms.find({name:req.body.name})
        if(exist.length > 0){
            const updatedTerm = await Terms.findOneAndUpdate({name:req.body.name},{terms:req.body.terms},{new:true})
                res.status(200).json({
                    status:'succeed',
                    data:updatedTerm
                })
        }else{
            const newTerms = await Terms.create({...req.body})
            res.status(200).json({
                status:'succeed',
                newTerms
            })
        }

    }catch (error){
        throw  new Error(error)
    }
});



exports.readTerm = expressAsyncHandler(async (req,res,next)=>{
    try{
        const terms = await Terms.find({})
        if(terms){
            res.status(200).json({
                status:'succeed',
                data:terms
            })
        }else{
            res.status(200).json({
                status:'succeed',
                message:'You haven\'t defined yet.'
            })
        }
    }catch (e) {
        throw new Error(e)
    }
})