import mongoose from "mongoose";

const vehicleschema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    regnum: {
      type: String,
      required: true,
    },
    maxkgs: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Vehicle = mongoose.model("Vehicle", vehicleschema);