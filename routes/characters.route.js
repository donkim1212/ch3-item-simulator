import express from "express";
import Character from "../schemas/characters.schema.js";
import Equipment from "../schemas/equipments.schema.js";

const router = express.Router();

/**
 * CREATE: Creates a new character, if it is not a duplicate.
 */
router.post("/characters", async (req, res, next) => {
  //
  try {
    const { name } = req.body;
    if (!name) {
      console.log(name);
      return res.status(400).json({ errorMessage: "Invalid input data." });
    }

    const checkCharacter = await Character.findOne({ name: name });
    if (checkCharacter) {
      console.log(checkCharacter);
      return res.status(400).json({ errorMessage: "Character with the same name already exists." });
    }

    const equipment = new Equipment({});
    await equipment.save();

    const newId = await Character.getNextNumber();
    // character_id: await Character.getNextNumber(),
    // or simply use Trigger from MongoDB Atlas
    const character = new Character({
      character_id: newId,
      name: name,
      equipments: equipment._id,
    });
    await character.save();
    console.log("Character created: ", character.character_id);
    return res.status(200).json({ character_id: character.character_id });
  } catch (err) {
    console.error(err);
    console.log(err.name);
    return res.status(500).json({ errorMessage: "An error occurred." });
  }
});

/**
 * READ: Get the data for the given character_id, if present.
 */
router.get("/characters/:character_id", async (req, res, next) => {
  // res.send("Character get called!");
  const character_id = req.params.character_id;
  if (character_id == undefined || character_id == null || typeof character_id != "number") {
    res.status(400).json({
      errorMessage: `Invalid character_id: ${character_id}`,
    });
  }
  const character = await Character.findOne({
    character_id: character_id,
  }).exec();
  if (character) return res.status(200).json(character);
  return res.status(404).json({
    errorMessage: `Character with character_id: ${character_id} does not exist.`,
  });
});

/**
 * UPDATE: Updates the character data by the given character_id, if present.
 */
router.put("/characters/:character_id", async (req, res) => {
  //
  const character_id = req.params.character_id;
});

/**
 * DELETE: Deletes the character found by character_id, if present.
 */
router.delete("/characters/:character_id", async (req, res) => {
  //
});

export default router;
