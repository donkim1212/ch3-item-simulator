import express from "express";
import Character from "../schemas/characters.schema.js";
import Item from "../schemas/items.schema.js";
import cv from "../middlewares/characters.validator.js";
import iv from "../middlewares/items.validator.js";

const router = express.Router();

/**
 * Read One
 */
router.get("/equipments/:character_id", cv.characterIdValidation, async (req, res) => {
  const character_id = req.params.character_id;
  let msg = `Retrieving eqipment data for character_id: ${character_id}`;
  try {
    const character = await Character.findOne({ character_id: character_id }).exec();
    if (!character) {
      msg = "Failed: No such user found.";
      return res.status(404).json({ errorMessage: msg });
    }
    console.log("Character: ", character);
    const equipped = await Character.getEquippedArray(character_id); // await .find({ _id: { $in: ["$equipped"] } });
    console.log(equipped);
    return res.status(200).json({ message: msg, equipped });
  } catch (err) {
    msg = "An error occurred.";
    console.log(err.name, err.code);
    console.error(err);
    return res.status(500).json({ errorMessage: msg });
  }
});

/**
 * Update
 */
router.put("/equipments/:character_id", cv.characterIdValidation, iv.itemCodeValidation, async (req, res) => {
  const character_id = req.params.character_id;
  const { item_code } = req.body;
  let msg = "";
  try {
    const character = await Character.findOne({ character_id: character_id }).exec();
    if (!character) {
      msg = "No such character found.";
      return res.status(404).json({ errorMessage: msg });
    }
    const item = await Item.findOne({ item_code: item_code }).exec();
    if (!item) {
      msg = "No such item found.";
      return res.status(404).json({ errorMessage: msg });
    }
    if (character.equipped.includes(item._id)) {
      msg = "Failed: already equipped this item.";
      return res.status(400).json({ errorMessage: msg });
    }
    character.equipped.push(item._id);
    await character.save();
    msg = `Successfully equpped the item '${item.item_name}'.`;
    return res.status(200).json({ message: msg });
  } catch (err) {
    msg = "An error occurred.";
    console.log(err.name, err.code);
    return res.status(500).json({ errorMessage: msg });
  }
});

export default router;
