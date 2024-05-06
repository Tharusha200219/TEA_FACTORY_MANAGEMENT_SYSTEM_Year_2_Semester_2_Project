import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema(
  {
    Type: {
      type: String,
      required: true,
    },
    RegNum: {
      type: String,
      required: true,
    },
    AddedYear: {
      type: Date,
      required: true,
    },
    EngineNum: {
      type: String,
      required: true,
    },
    ChesiNum: {
      type: String,
      required: true,
    },
    Owner: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
