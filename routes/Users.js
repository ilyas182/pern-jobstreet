const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Users')

router.post('/register', usersCtrl.create);
router.post('/login', usersCtrl.login);

module.exports = router;