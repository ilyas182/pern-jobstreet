const express = require('express');
const router = express.Router();
const jobCntrl = require('../controllers/Jobs');

router.get('/all', jobCntrl.getAll);
router.get('/industry/:industry', jobCntrl.findByIndustry);
router.get('/:id', jobCntrl.findById);


module.exports = router;