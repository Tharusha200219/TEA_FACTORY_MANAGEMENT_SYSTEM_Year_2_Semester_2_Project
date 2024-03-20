import mongoose from "mongoose";

const machineSchema = mongoose.Schema(
    {
        machineNumber : {
            type : Number,
            required:true,
        },
        machineName : {
            type : String,
            required : true,
        },

        machineType : {
            type : String,
            required : true,
        },
        
        installationDate : {
            type : Date,
            default: Date.now
        },

        warrentyInformation: { 
            type : String,
            required : true,
        },



    },
    {
        timestamps: true,
    }
);


 const Machine  = mongoose.model('Machine',machineSchema);
 export default Machine;