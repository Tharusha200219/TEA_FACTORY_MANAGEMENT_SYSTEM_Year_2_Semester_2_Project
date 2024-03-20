import mongoose from "mongoose";

const supplierschema = mongoose.Schema(
  {

    supplierid : {
        type : String,
        required:true,
    },
    name : {
        type : String,
        required:true,
    },
    address : {
        type : String,
        required : true,
    },
    contact: { 
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
  },
  {
    timestamps: true,
  }
);


export const supplier = mongoose.model('supplier',supplierschema);
