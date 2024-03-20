import mongoose from 'mongoose';

const TeatypeSchema = mongoose.Schema(
    {
        Schedule_no: {
            type: Number,
            required: true,
        },
        black_tea: {
            type: Number,
            required: true,
        },
        green_tea: {
            type: Number,
            required: true,
        },
        oolong_tea: {
            type: Number,
            required: true,
        },
        white_tea: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Teatypee = mongoose.model('Teatype', TeatypeSchema);
export default Teatypee;