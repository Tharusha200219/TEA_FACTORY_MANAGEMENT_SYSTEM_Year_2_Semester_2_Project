// teaLeavesModel.js

import mongoose from "mongoose";

const teaLeavesSchema2 = mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            default: 'Pending'
        },
    },
    {
        timestamps: true,
    }
);

const TeaLeaves2 = mongoose.model('TeaLeaves2', teaLeavesSchema2);

export default TeaLeaves2;
