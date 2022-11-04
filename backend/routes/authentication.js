const express = require('express'); 
const router  = express.Router(); 
const authController = require('../controller/authentication'); 

router.get('/', authController.status_cheker)
router.post('/', authController.register)
router.put('/', authController.update_user)
router.delete('/', authController.delete_user)

module.exports = router;