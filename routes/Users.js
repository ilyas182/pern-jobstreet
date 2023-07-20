const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Users')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization');

router.post('/register', validInfo, usersCtrl.create);
router.post('/login', validInfo, usersCtrl.login);
router.get("/verify", authorization, usersCtrl.verify);

module.exports = router;