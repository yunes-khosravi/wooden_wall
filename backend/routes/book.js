const express = require('express'); 
const router  = express.Router(); 
const bookController = require('../controller/book'); 

router.get('/', bookController.all_carts); 
router.get('/:type', bookController.some_carts);
router.post('/', bookController.new_book);
router.put('/', bookController.Update);
router.delete('/:id', bookController.Delete);

module.exports = router;