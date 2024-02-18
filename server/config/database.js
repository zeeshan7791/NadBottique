const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`connect to mongoDB ${con.connection.host}`.bgCyan);
    })
    .catch((error) => {
      console.log(`error in DB ${error}`.bgRed.white);
    });
};
module.exports = connectDB;
