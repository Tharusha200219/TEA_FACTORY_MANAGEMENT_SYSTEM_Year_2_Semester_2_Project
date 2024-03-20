const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
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
    }
});

const Payment = mongoose.model('Employee', PaymentSchema);
module.exports = Payment;
