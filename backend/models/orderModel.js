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
      
        status:{
            type:String,
            default:'Pending',
            required: false,
        },

        address:{
            type:String,
            required:true,
        },

        telephone:{
            type:String,
            required:true,
        },



     
    },
    {
        timestamps: true,
    }
);


export const orders= mongoose.model('orders',orderSchema);