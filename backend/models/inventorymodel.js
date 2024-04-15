import mongoose from "mongoose";

const teainventoryschema = mongoose.Schema(
    {
        batchid : {
            type : String,
            required:true,
        },
        category : {
            type : String,
            required : true,
        },
        dateRecorded: { 
            type: Date, 
            default: Date.now 
        },
        inventorynumber : {
            type : String,
            required : true,
        },
        quantity : {
            type : Number,
            required : true,
        },


    },
    {
        timestamps: true,
    }
);


export const inventory  = mongoose.model('inventory',teainventoryschema);