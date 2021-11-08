const express = require('express');
const router = express.Router();
const weatherCtrl = require('../controllers/weatherAPI');

router.get('/week/:lat&:lon', weatherCtrl.getSevenDay);
router.get('/:id', weatherCtrl.getCurrent);

module.exports = router;