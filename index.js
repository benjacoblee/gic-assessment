const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const db = require("./db");

db();
app.use("/api", router);

router
  .get("/cafe", (req, res) => {})
  .post("/cafe", (req, res) => {
    console.log(req.body);
  })
  .put("/cafe", (req, res) => {})
  .delete("/cafe", (req, res) => {});

router
  .get("/employee", async (req, res) => {})
  .post("/employee", (req, res) => {})
  .put("/employee", (req, res) => {})
  .delete("/employee", (req, res) => {});

app.listen(port, () => {
  console.log(`App started on PORT ${port}`);
});
