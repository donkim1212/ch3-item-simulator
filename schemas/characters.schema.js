import mongoose from "mongoose";
import Equipments from "./equipments.schema.js";

const charactersSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  character_id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  health: {
    type: Number,
    required: true,
    default: 500,
  },
  power: {
    type: Number,
    required: true,
    default: 100,
  },
  equipments: {
    type: Equipments,
    required: true,
    unique: true,
  },
});

export default mongoose.Model("Characters", charactersSchema);
