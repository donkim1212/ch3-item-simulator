import express from "express";
import Item from "../schemas/items.schema.js";
import iv from "../middlewares/items.validator.js";

const router = express.Router();

/**
 * Create: creates item based on the information given by form
 */
router.post("/items", iv.itemCodeValidation, iv.itemNameValiation, iv.itemStatValidation, async (req, res) => {
  //
  const { item_code, item_name, item_stat } = req.body;
  let msg = `Successfully added the item: ${item_name}`;
  try {
    const item = new Item({
      item_code: item_code,
      item_name: item_name,
      health: item_stat.health,
      power: item_stat.power,
    });
    await item.save();
    return res.status(200).json({ message: msg });
  } catch (err) {
    if (err.code == 11000) {
      msg = "Failed: Tried to post with a duplicate key.";
      console.log(msg);
      return res.status(500).json({ errorMessage: msg });
    }
    msg = "An error occurred.";
    console.log(err.name, err.code);
    console.error(err);
    return res.status(500).json({ errorMessage: msg });
  }
});

/**
 * Read One
 */
router.get("/items/:item_code", iv.itemCodeValidation, async (req, res) => {
  const item_code = req.params.item_code;
  let msg = `Successfully found item with item_code ${item_code}`;
  try {
    const item = await Item.findOne({ item_code: item_code }).exec();
    if (!item) {
      msg = `Failed: item not found with item_code: ${item_code}`;
      return res.status(404).json({ errorMessage: msg });
    }
    return res.status(200).json({
      message: msg,
      item_code: item.item_code,
      item_name: item.item_name,
      item_stat: item.item_stat,
    });
  } catch (err) {
    console.log(err.name);
    console.error(err);
    return res.status(500).json({ errorMessage: "An error occurred." });
  }
});

/**
 * Read All
 */
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ item_code: 1 }).exec();
    if (!items) return res.status(200).json({});
    return res.status(200).json(items);
  } catch (err) {
    console.log(err.name);
    console.error(err);
    return res.status(500).json({ errorMessage: "An error occurred." });
  }
});

/**
 * Update
 */
router.put(
  "/items/:item_code",
  iv.itemCodeValidation,
  iv.itemNameValiation,
  iv.itemStatValidation,
  async (req, res) => {
    // res.send("item get called!");
    const item_code = req.params.item_code;
    const { item_name, item_stat } = req.body;
    let msg = `Successfully updated the item with code: ${item_code}`;
    try {
      const queryResult = await Item.updateOne(
        { item_code: item_code },
        {
          item_name: item_name,
          item_stat: item_stat,
        },
      ).exec();
      if (queryResult.matchedCount == 0) {
        msg = "Failed: No such item.";
        return res.status(404).json({ errorMessage: msg });
      }
      return res.status(200).json({ message: msg });
    } catch (err) {
      msg = "An error occurred.";
      console.log(err.name);
      console.error(err);
      return res.status(500).json({ errorMessage: msg });
    }
  },
);

export default router;
