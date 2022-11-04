const express = require('express');
const router = express.Router();
const dataController = require('../controller/data');

router.get('/:type', dataController.data_uploader)

module.exports = router;