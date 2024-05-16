import mongoose from "mongoose";
import Item from "./items.schema.js";

const CharactersSchema = new mongoose.Schema({
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
  equipped: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
    },
  ],
});

// ------ Statics
/**
 * Counts next character_id number based on biggest existing value in the DB.
 * @returns Max character_id value + 1, or 1 if there are no documents.
 */
CharactersSchema.statics.getNextNumber = async () => {
  const character = await Character.find()
    .sort({ character_id: -1 })
    .limit(1)
    .exec();
  // console.log("Character: ", character[0]);
  if (character[0]) return character[0].character_id + 1;
  return 1;
};

/**
 * @deprecated
 * @param {Number} character_id numbered id of a character
 * @returns array of Items
 */
CharactersSchema.statics.getEquippedArray = async (character_id) => {
  const character = await Character.findOne({
    character_id: character_id,
  }).exec();
  if (!character) return null;
  const items = await Item.find({ _id: { $in: [character.equipped] } });
  // console.log(items);
  return items;
};

// ------ Methods
/**
 * @deprecated
 * @param {Object} character Character document as js object.
 * @returns Array with index 0=totalHealth, 1=totalPower.
 */
CharactersSchema.methods.totalEquippedStats = async function (character) {
  return character.equipped.reduce(
    async (acc, cur) => {
      const item_stat = await Item.findById(cur).exec();
      return [acc[0] + item_stat.health, acc[1] + item_stat.power];
    },
    [0, 0],
  );
};

// ------ pre
/**
 * When a new character gets saved to DB, set its character_id to
 * the max character_id value in the DB + 1.
 */
CharactersSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.character_id = await Character.getNextNumber();
    next();
  } else {
    next();
  }
});

const Character = mongoose.model("Characters", CharactersSchema);

export default Character;
