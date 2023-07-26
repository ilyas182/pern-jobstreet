const express = require('express');
const router = express.Router();
const employersCtrl = require('../controllers/Employer')
const validInfo = require('../middleware/Employer/validInfo');
const authorization = require('../middleware/Employer/authorization');

//routes
router.post('/register', validInfo, employersCtrl.create);
router.post('/login', validInfo, employersCtrl.login);
router.get("/verify", authorization, employersCtrl.verify);
router.post('/postJob', employersCtrl.postJob);
router.post('/postJobQn', employersCtrl.postJobQn);
router.get("/:employer_id/jobs", employersCtrl.jobsByEmployer)
router.get('/getEmployer', employersCtrl.getEmployer);
router.delete('/deleteJob/:id', employersCtrl.deleteJob)
router.put('/editJob/:id', employersCtrl.editJob)
router.get("/authorize", authorization, employersCtrl.authorize);

module.exports = router;