require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const mongoose = require("mongoose");

const cafeController = require("./controllers/cafeController");
const employeeController = require("./controllers/employeeController");

mongoose.connect("mongodb://127.0.0.1:27017/app").then(
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
  .post("/cafe", cafeController.createCafe)
  .put("/cafe", cafeController.updateCafe)
  .delete("/cafe", cafeController.deleteCafe);

router
  .get("/employees", employeeController.getEmployees)
  .post("/employee", employeeController.createEmployee)
  .put("/employee", employeeController.updateEmployee)
  .delete("/employee", employeeController.deleteEmployee);

app.listen(port, () => {
  console.log(`App started on PORT ${port}`);
});
