const express = require('express');
const mainController = require('./mainController');
const apiController = require('./apiController');

const router = express.Router();

router.use('/', mainController);
router.use('/api/', apiController);

module.exports = router;