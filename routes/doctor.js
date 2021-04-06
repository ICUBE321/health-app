const express = require('express');
const router = express.Router();

const doctorCtrl = require('../controllers/doctor');

router.post('/login', doctorCtrl.login);

module.exports = router;