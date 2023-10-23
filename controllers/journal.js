import journalModel  from "../models/journal.js";
import jwt from "jsonwebtoken";


export const createjournal = async(req,res)=>{
    try {
        const {title, tradeType, summary} = req.body;
        const _id = req._id;
        console.log(title, tradeType, summary, _id);
        // Also check if stock exist in the redis data base or not
        if(!title || !tradeType || !summary || !_id ){
            return res.status(400).json({
                stat:"OK",
                error: "Missing trade data",
                Verified:true,
                message:"Access Denied, Please send all data"
            })
        }
        if(title.trim().length === 0 || tradeType.trim().length === 0|| summary.trim().length === 0){
            return res.status(400).json({
                stat:"OK",
                error: "Empty trade data",
                Verified:true,
                message:"Access Denied, Please send all data"
            })
        }



        const newjournal = new journalModel({title:title, tradeType:tradeType, summary:summary, user:_id});
        const savenewjournal = await newjournal.save();
        if (!savenewjournal) {
            return res.status(404).json({
                stat: "Ok",
                error: 'Internal Error',
                Verified: true,
                message: 'Not saved',
            });
        }


        return res.status(201).json({
            stat:"OK",
            error: "",
            Verified:true,
            message:"New journal created",
            journal:savenewjournal
        })
        // Also check if stock is not exist then also return error 
        // if exist and all done then return the final update



    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            stat:OK,
            Error:error.message,
            Verified:true,
            message:"Internal Server Problem"})
    }
}

export const alljournal = async(req,res)=>{
    try {
        const _id = req._id;
        const userjournal = await journalModel.find({user:_id});
        if(!userjournal){
            return res.status(400).json({
                stat:"OK",
                error: "",
                Verified:true,
                message:"Not found anything"
            })
        }
        return res.status(200).json({
            stat:"OK",
            error: "",
            Verified:true,
            message:"found Journal success",
            journal:userjournal
        })
    } catch (error) {
        return res.status(500).json({
            stat:OK,
            Error:error.message,
            Verified:true,
            message:"Internal Server Problem"})
    }
}
