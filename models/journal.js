import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    title:{
        type:String,
        default:"New Trade journal",
        max:30,
        min:6
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User', // The name of the referenced model
        required: true,
      },
    tradeType:{
        type:String,
        default:"Add trade type",
        max:60,
    },
    summary:{
        type:String,
        default:"Profit and loss is the part of the trading",
        max:6000,
    }
},{
        timestamps: true,
        versionKey: '__v', // Enable versioning
})
    
mongoose.pluralize(null);
const journal = mongoose.model("journal", journalSchema);
export default journal;