import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
    {
        departmentName:{
            type: String,
            required : true,
        },
        departmentDetails:{
            type: String,
            required : true,
        },
        createdOn:{
            type: Date,
            required : true,
        },
        departmentStatus:{
            type: String,
            required : true,
        },
    },
    {
        timestamps: true,
    }

);


export const Department = mongoose.model('Cat',departmentSchema);