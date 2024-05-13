import mongoose from "mongoose";
import Items from "./items.schema.js";

const equipmentsSchema = new mongoose.Schema({
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
  equipped: {
    type: Items,
  },
});

export default mongoose.model("Equipments", equipmentsSchema);
