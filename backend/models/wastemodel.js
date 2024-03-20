import mongoose from "mongoose";

const teawasteschema = mongoose.Schema(
    {
        wasteid : {
            type : Number,
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