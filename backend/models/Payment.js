import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    supplierId: {
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
    },
    orderId: {
        type: String, // Adjust the type according to your requirements
        required: true,
    },
});

const Payment = model('Payment', PaymentSchema);
export default Payment;
