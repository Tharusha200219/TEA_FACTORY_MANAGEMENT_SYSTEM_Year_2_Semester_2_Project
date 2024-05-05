import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    employeeId: {
        type: String,
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
    }
});

const PaymentEmployee = model('PaymentEmployee', PaymentSchema);
export default PaymentEmployee;
