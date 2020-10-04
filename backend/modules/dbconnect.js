const tag = "dbconnect.js";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  function connect() {
    mongoose.set("useCreateIndex", true);
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(tag, "db connected");
      })
      .catch(() => {
        console.log(tag, "db connect fail");
      });
  }
  connect();
};
