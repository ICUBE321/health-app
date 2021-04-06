const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

const auth = require('../middleware/auth');

//processing of routes
router.get('/appointment/', auth, stuffCtrl.getAppointments);
router.post('/appointment/add', auth, stuffCtrl.createAppointment);


//processing of routes
router.get('/detail/:id', auth, stuffCtrl.getDetail);
router.post('/detail/add/:id', auth, stuffCtrl.createDetail);

//processing of routes
router.get('/doctor/', auth, stuffCtrl.getDoctors);
router.post('/doctor/add', auth, stuffCtrl.createDoctor);

//processing of routes
router.get('/prescription/', auth, stuffCtrl.getPrescriptions);
router.post('/prescription/add', auth, stuffCtrl.createPrescription);

//processing of routes
router.get('/user/', auth, stuffCtrl.getUsers);

module.exports = router;