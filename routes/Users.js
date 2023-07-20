const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Users')
const validInfo = require('../middleware/validInfo')

router.post('/register', validInfo, usersCtrl.create);
router.post('/login', validInfo, usersCtrl.login);

module.exports = router;