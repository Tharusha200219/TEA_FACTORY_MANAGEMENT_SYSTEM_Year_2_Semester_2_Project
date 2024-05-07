import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        orderno:{
            type:String,
            required:true,
        },
        duedate: {
            type : Date,
            required : true,
        },

        quantity: {
            type : String,
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

        name:{
            type:String,
            required:true,
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