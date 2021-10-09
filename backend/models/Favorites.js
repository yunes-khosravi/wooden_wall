const mongoose = require('mongoose');


const favoritesSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  userlikeID: {
    type: [],
    required: true
  }
})

const Favorites = mongoose.model('favorites', favoritesSchema);

module.exports = Favorites;
