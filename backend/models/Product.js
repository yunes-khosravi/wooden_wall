const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phonenum : {
    type: Number,
    required: true
  },
  city : {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: false
  },
  year: {
    type: Number,
    required: true
  },
  imgUrl: {
    type: [],
    required: true
  },
  model: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;
