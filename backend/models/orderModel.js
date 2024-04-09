import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        orderno:{
            type:String,
            required:true,
        },
        duedate : {
            type : String,
            required : true,
        },

        quantity : {
            type : Number,
            required : true,
        },
        
        category : {
            type : String,
            required : true,
        },

     
    },
    {
        timestamps: true,
    }
);


export const orders= mongoose.model('orders',orderSchema);