const express = require('express'); 
const router  = express.Router(); 
const imageController = require('../controller/image'); 


router.get('/', imageController.all_images);
router.post('/', (req, res, next) => res.status(501).send({message: 'sorry we can not support this request'}))
router.put('/', (req, res, next) => res.status(501).send({message: 'sorry we can not support this request'}))
router.delete('/', imageController.delete_image);

module.exports = router;