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
        tea_wastage: {
            type: Number, 
            required: true,
        },
        status: {
            type: String, // Assuming status is a string, adjust the type if necessary
            required: true,
            default: "not send" // Default value "not send"
        }
    },
    {
        timestamps: true,
    }
);

const Teatypes = mongoose.model('Teatype', TeatypeSchema);
export default Teatypes;
