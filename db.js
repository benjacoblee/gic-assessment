require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () =>
  mongoose
    .connect(process.env.MONGODB_CONNECTION_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Connected to db."))
    .catch((err) => console.log(err));
