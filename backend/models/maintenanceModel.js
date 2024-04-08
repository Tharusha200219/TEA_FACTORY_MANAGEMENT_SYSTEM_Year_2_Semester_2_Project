import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema(
    {
        machineNumber : {
            type : Number,
            required:true,
        },
        machineName : {
            type : String,
            required : true,
        },

        description : {
            type : String,
            required : true,
        },
        
        maintenanceDate : {
            type : Date,
            default: Date.now
        },

        frequencyInDays: { 
            type : Number,
            required : true,
        },



    },
    {
        timestamps: true,
    }
);


 const Maintenance  = mongoose.model('Maintenance',maintenanceSchema);
 export default Maintenance;