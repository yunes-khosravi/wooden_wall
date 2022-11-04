const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  lat:{
    type: Number,
    required: true,
  },
  lng:{
    type: Number,
    required: true,
  },
  country:{
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true
  },
  phonenum : {
    type: Number,
    required: true
  },
  Type : {
    type: String,
    required: true
  },
  city : {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
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
  company: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true,
  },
  color: {
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
