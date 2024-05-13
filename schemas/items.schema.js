import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    requred: true,
    unique: true,
  },
  item_code: {
    type: Number,
    required: true,
    unique: true,
  },
  item_name: {
    type: String,
    required: true,
    unique: true,
  },
  health: {
    type: Number,
    required: true,
    default: 0,
  },
  power: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Items", itemsSchema);
