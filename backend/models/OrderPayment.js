// Import the mongoose module
import mongoose from 'mongoose';

// Define the booking schema
const { Schema, model } = mongoose;

const OrderPaymentSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    totalPrice:{
        type : Number,
        required : true,
    },
    slip: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending','Completed'],
        default: 'Pending'
    }
});

// Create the model from the schema and export it
const OrderPayment = model('OrderPayment', OrderPaymentSchema);
export default OrderPayment;
