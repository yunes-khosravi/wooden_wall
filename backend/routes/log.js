const express = require('express'); 
const router  = express.Router(); 
const logController = require('../controller/log'); 

router.get('/', logController.logout);
router.post('/', logController.login);
router.put('/', (req, res, next) => res.status(501).send({message: 'sorry we can not support this request'}));
router.delete('/', (req, res, next) => res.status(501).send({message: 'sorry we can not support this request'}));

module.exports = router;