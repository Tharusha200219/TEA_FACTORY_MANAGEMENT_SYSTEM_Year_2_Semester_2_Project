import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
    {
        employeeName:{
            type: String,
            required : true,
        },
        employeeMobile:{
            type: Number,
            required : true,
        },
        employeeAddress:{
            type: String,
            required : true,
        },
        employeeRoles:{
            type: String,
            required : true,
        },
        createdOn:{
            type: Number,
            required : true,
        },

    },
    {
        timestamps: true,
    }

);


export const Employee = mongoose.model('employee',employeeSchema);