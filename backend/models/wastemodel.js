import mongoose from "mongoose";

const teawasteschema = mongoose.Schema(
    {
        wasteid : {
            type : String,
            required:true,
        },
        batchid : {
            type : String,
            required:true,
        },
        teatype : {
            type : String,
            required : true,
        },

        inventorynumber : {
            type : String,
            required : true,
        },
        
        quantity : {
            type : Number,
            required : true,
        },

        dateRecorded: { 
            type: Date, 
            default: Date.now 
        },



    },
    {
        timestamps: true,
    }
);


export const waste  = mongoose.model('waste',teawasteschema);