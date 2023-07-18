const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Users')

router.post('/register', usersCtrl.create);

module.exports = router;