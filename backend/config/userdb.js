require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');


const connectuserDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_USER, {
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

module.exports = connectuserDB;
