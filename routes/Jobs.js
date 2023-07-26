const express = require('express');
const router = express.Router();
const jobCntrl = require('../controllers/Jobs');

router.get('/all', jobCntrl.getAll);
router.get('/industry/:industry', jobCntrl.findByIndustry);
router.get('/:id', jobCntrl.findById);
router.get('/:id/applied', jobCntrl.applied);
router.post('/bookmarked', jobCntrl.bookmarked);
router.delete('/unbookmark', jobCntrl.unbookmark);
router.get('/search/:results', jobCntrl.search);


module.exports = router;