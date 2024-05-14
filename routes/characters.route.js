import express from "express";
import Character from "../schemas/characters.schema.js";
import Equipment from "../schemas/equipments.schema.js";
import Item from "../schemas/items.schema.js";
import cv from "../middlewares/characters.validator.js";

const router = express.Router();

/**
 * CREATE: Creates a new character, if it is not a duplicate.
 */
router.post("/characters", cv.characterNameValidation, async (req, res, next) => {
  try {
    const { name } = req.body;

    const checkCharacter = await Character.findOne({ name: name });
    if (checkCharacter) {
      console.log(checkCharacter);
      return res.status(400).json({ errorMessage: "Character with the same name already exists." });
    }

    const newId = await Character.getNextNumber();

    // character_id: await Character.getNextNumber(),
    // or simply use Trigger from MongoDB Atlas
    const character = new Character({
      character_id: newId,
      name: name,
    });
    await character.save();

    console.log("Character created: ", character.character_id, character.name);
    return res.status(200).json({ character_id: character.character_id });
  } catch (err) {
    console.log(err.name);
    console.error(err);
    return res.status(500).json({ errorMessage: "An error occurred." });
  }
});

/**
 * READ: Get the data for the given character_id, if present.
 */
router.get("/characters/:character_id", cv.characterIdValidation, async (req, res) => {
  try {
    const character_id = req.params.character_id;
    const character = await Character.findOne({
      character_id: character_id,
    }).exec();
    if (!character)
      return res.status(404).json({
        errorMessage: `Character with character_id: ${character_id} does not exist.`,
      });

    const totalHealth = character.health;
    const totalPower = character.power;
    const equipment = await Equipment.findOne({
      _id: character.equipments,
    });

    if (equipment.equipped) {
      const item = await Item.findOne({ _id: equipment.equipped });
      totalHealth += item.health;
      totalPower += item.power;
    }

    return res.status(200).json({
      name: character.name,
      health: totalHealth,
      power: totalPower,
    });
  } catch (err) {
    console.log(err.name);
    console.error(err);
    return res.status(500).json({ errorMessage: "An error occurred." });
  }
});

/**
 * UPDATE: Updates the character data by the given character_id, if present.
 */
router.put("/characters/:character_id", cv.characterIdValidation, async (req, res) => {
  // const character_id = req.params.character_id;
  res.send(501).json({ errorMessage: "Update user not yet implemented." });
});

/**
 * DELETE: Deletes the character found by character_id, if present.
 */
router.delete("/characters/:character_id", cv.characterIdValidation, async (req, res) => {
  //
  const cid = req.params.character_id;
  try {
    const character = await Character.deleteOne({ character_id: cid }).exec();
    const equipment = await Equipment.deleteOne({ character_id: cid }).exec();
    if (character.deletedCount === 0) return res.status(400).json({ errorMessage: `User ${cid} does not exist.` });

    console.log("deleted:", character, equipment);
    return res.status(200).json({ message: `Successfully deleted user ${cid}` });
  } catch (err) {
    console.log(err.name);
    console.error(err);
    return res.status(500).json({ errorMessage: "An error occurred." });
  }
});

export default router;
