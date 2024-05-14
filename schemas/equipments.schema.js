import mongoose from "mongoose";
// import Items from "./items.schema.js";
// import Characters from "./characters.schema.js";

const EquipmentsSchema = new mongoose.Schema(
  {
    character_id: {
      type: Number,
      ref: "Characters",
    },
    equipped: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
    },
  },
  { autoIndex: false },
);

export default mongoose.model("Equipments", EquipmentsSchema);
