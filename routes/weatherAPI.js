const express = require('express');
const router = express.Router();
const weatherCtrl = require('../controllers/weatherAPI');

router.get('/:id', weatherCtrl.getCurrent);

module.exports = router;