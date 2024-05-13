import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema(
  {
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
      default: 0,
    },
    power: {
      type: Number,
      default: 0,
    },
  },
  { autoIndex: false },
);

export default mongoose.model("Items", ItemsSchema);
