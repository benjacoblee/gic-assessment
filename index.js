require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();

const cafeController = require("./controllers/cafeController");
const employeeController = require("./controllers/employeeController");

mongoose.connect(process.env.MONGODB_STR).then(
  () => {
    console.log("DB is ready to use!");
  },
  (err) => console.log(err)
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router); // prepend all routes with "/api"

router
  .get("/cafes", cafeController.getCafes)
  .post("/cafe", upload.any(), cafeController.createCafe)
  .put("/cafe", upload.any(), cafeController.updateCafe)
  .delete("/cafe", cafeController.deleteCafe);

router
  .get("/employees", employeeController.getEmployees)
  .post("/employee", employeeController.createEmployee)
  .put("/employee", employeeController.updateEmployee)
  .delete("/employee", employeeController.deleteEmployee);

const server = app.listen(port, () => {
  console.log(`App started on PORT ${port}`);
});

module.exports = { server };
