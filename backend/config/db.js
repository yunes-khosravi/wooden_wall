require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('mongodb connection SUCCESS .');
  } catch (err) {
    console.log(err);
    console.log('mongodb connection FAIL !');
    process.exit(1);
  }
};

module.exports = connectDB;
