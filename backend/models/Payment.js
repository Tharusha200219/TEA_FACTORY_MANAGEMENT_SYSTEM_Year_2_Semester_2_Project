import mongoose from "mongoose";

const PaymentSchema  = mongoose.Schema(
{
    supplierId: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const Payment = mongoose.model('Employee', PaymentSchema);
module.exports = Payment;
