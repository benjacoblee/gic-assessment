const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const db = require("./db");

db();
app.use("/api", router);

router
  .get("/cafes", (req, res) => {})
  .post("/cafes", (req, res) => {})
  .put("/cafes", (req, res) => {})
  .delete("/cafes", (req, res) => {});

router
  .get("/employees", async (req, res) => {})
  .post("/employees", (req, res) => {})
  .put("/employees", (req, res) => {})
  .delete("/employees", (req, res) => {});

app.listen(port, () => {
  console.log(`App started on PORT ${port}`);
});
