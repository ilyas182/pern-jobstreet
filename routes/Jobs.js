const express = require('express');
const router = express.Router();
const jobCntrl = require('../controllers/Jobs');

router.get('/all', jobCntrl.getAll);
router.get('/:id', jobCntrl.findbyId);


module.exports = router;