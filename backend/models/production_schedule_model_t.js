import mongoose from 'mongoose';

const productionSchema = mongoose.Schema(
    {
        Schedule_no: {
            type: Number,
            required: true,
        },
        Production_date: {
            type: Date,
            default: Date.now,
        },
        Quantity: {
            type: String,
            required: true,
        },
        Machine_assignment: {
            type: String,
            required: true,
        },
        shift_information: {
            type: Number,
            required: true,
        },
        Status: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Production = mongoose.model('Production', productionSchema);
export default Production;