import express from "express";
import dotenv from "dotenv/config";
import characterRouter from "./routes/characters.route.js";
import itemRouter from "./routes/items.route.js";
import connect from "./schemas/connect.db.js";
import logger from "./middlewares/logger.js";

const app = express();
const PORT = process.env.PORT || 8081;

connect();

// middleware
app.use(express.json()); // convert json from req and put it in to req.body
app.use(express.urlencoded({ extended: true })); // convert data from form content-type and put it in to req.body
app.use(logger);

// default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// router
app.use("/api", [characterRouter, itemRouter]);

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
