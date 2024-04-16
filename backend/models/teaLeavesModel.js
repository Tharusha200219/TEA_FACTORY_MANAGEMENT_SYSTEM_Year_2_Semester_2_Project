// teaLeavesModel.js

import mongoose from "mongoose";

const teaLeavesSchema = mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const TeaLeaves = mongoose.model('TeaLeaves', teaLeavesSchema);

export default TeaLeaves;
