import mongoose from "mongoose";
import Equipments from "./equipments.schema.js";

const CharactersSchema = new mongoose.Schema(
  {
    character_id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    health: {
      type: Number,
      default: 500,
    },
    power: {
      type: Number,
      default: 100,
    },
    equipments: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "Equipments",
    },
  },
  { autoIndex: false },
);

CharactersSchema.statics.getNextNumber = async () => {
  const character = await Character.find().sort({ character_id: -1 }).limit(1).exec();
  // console.log("Character: ", character[0]);
  if (character[0]) return character[0].character_id + 1;
  return 1;
};

const Character = mongoose.model("Characters", CharactersSchema);

export default Character;
