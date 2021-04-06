const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

const auth = require('../middleware/auth');

//processing of routes
router.get('/appointment/', stuffCtrl.getAppointments);
router.post('/appointment/add', stuffCtrl.createAppointment);


//processing of routes
router.get('/detail', stuffCtrl.getDetail);
router.post('/detail/add', stuffCtrl.createDetail);

//processing of routes
router.get('/doctor/', stuffCtrl.getDoctors);
router.post('/doctor/add', stuffCtrl.createDoctor);

//processing of routes
router.get('/prescription/', stuffCtrl.getPrescriptions);
router.post('/prescription/add', stuffCtrl.createPrescription);

//processing of routes
router.get('/user', stuffCtrl.getUsers);

module.exports = router;