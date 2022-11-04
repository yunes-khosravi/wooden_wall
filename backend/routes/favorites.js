const express = require('express'); 
const router  = express.Router(); 
const favoritesController = require('../controller/favorites'); 


router.get('/', favoritesController.all_favorites)
router.get('/:productId', favoritesController.one_favorite)
router.post('/', favoritesController.new_favorites)
router.delete('/', favoritesController.delete_favorites)
module.exports = router;