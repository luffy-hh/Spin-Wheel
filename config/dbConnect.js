const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const dbConnect = () => {
  try {
    mongoose.connect(process.env.LOCAL_MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { dbConnect };
