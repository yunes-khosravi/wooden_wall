const Product = require('../models/Product');

const getAllProducts = function (req, res) {
  console.log('hi');
  try {
   
    const products = Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server Error'});
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server Error'});
  }
}

module.exports = {
  getAllProducts,
  getProductById
};
