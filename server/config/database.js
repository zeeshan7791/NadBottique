const mongoose = require("mongoose");
const colors = require("colors");

// const connectDB = () => {
//   mongoose
//     .connect(process.env.MONGOURL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((con) => {
//       console.log(`connect to mongoDB ${con.connection.host}`.bgCyan);
//     })
//     .catch((error) => {
//       console.log(`error in DB ${error}`.bgRed.white);
//     });
// };
// module.exports = connectDB;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to mongoDB database ${conn.connection.host}`);
  } catch (error) {
    console.log(`error in DB ${error}`);
  }
};

module.exports = connectDB;
