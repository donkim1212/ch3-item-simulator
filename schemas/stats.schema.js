import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  HP: {
    type: Number,
    requred: true,
    default: 100,
  },
  MP: {
    type: Number,
    requred: true,
    default: 50,
  },
  SP: {
    type: Number,
    requred: true,
    default: 50,
  },
  STR: {
    type: Number,
    required: true,
    default: 5,
  },
  DEX: {
    type: Number,
    requred: true,
    default: 5,
  },
  INT: {
    type: Number,
    requred: true,
    default: 5,
  },
  LUK: {
    type: Number,
    requred: true,
    default: 5,
  },
});

export default mongoose.model("Stats", statsSchema);
