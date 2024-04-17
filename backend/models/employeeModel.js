import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
    {
        employeeName:{
            type: String,
            required : true,
        },
        employeeEmail:{
            type: String,
            required : true,
            unique: true // Assuming employee email should be unique
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