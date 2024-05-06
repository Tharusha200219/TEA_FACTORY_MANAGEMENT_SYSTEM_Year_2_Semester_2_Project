import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        orderno:{
            type:Number,
            required:true,
        },
        duedate: {
            type : Date,
            required : true,
        },

        quantity: {
            type : Number,
            required : true,
        },
        
        category: {
            type : String,
            required : true,
        },
        Shipment: {
            type : String,
            required : true,
        },

        status:{
            type:String,
            default:'Pending',
        }

     
    },
    {
        timestamps: true,
    }
);


export const orders= mongoose.model('orders',orderSchema);