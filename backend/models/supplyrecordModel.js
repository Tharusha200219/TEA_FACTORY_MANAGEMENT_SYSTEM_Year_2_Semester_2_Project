import mongoose from "mongoose";

const supplyrecordSchema = mongoose.Schema(
  {
    supplier: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
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

export const SupplyRecord = mongoose.model('SupplyRecord', supplyrecordSchema);
