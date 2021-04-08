const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

const auth = require('../middleware/auth');

//processing of routes
router.get('/appointment/', stuffCtrl.getAppointments);
router.get('/appointment/user', stuffCtrl.getUserAppointment);
router.post('/appointment/add', stuffCtrl.createAppointment);
router.post('/appointment/edit', stuffCtrl.editAppointment);
router.get('/appointment/single', stuffCtrl.getSingleAppointment);
router.delete('/appointment/delete', stuffCtrl.deleteAppointment);

//processing of routes
router.get('/detail', stuffCtrl.getDetail);
router.post('/detail/add', stuffCtrl.createDetail);
router.post('/detail/edit', stuffCtrl.editDetail);

//processing of routes
router.get('/doctor/', stuffCtrl.getDoctors);
router.post('/doctor/add', stuffCtrl.createDoctor);

//processing of routes
router.get('/prescription/', stuffCtrl.getPrescriptions);
router.get('/prescription/user', stuffCtrl.getUserPrescription);
router.post('/prescription/add', stuffCtrl.createPrescription);
router.post('/prescription/edit', stuffCtrl.editPrescription);
router.get('/prescription/single', stuffCtrl.getSinglePrescription);
router.delete('/prescription/delete', stuffCtrl.deletePrescription);

//processing of routes
router.get('/user', stuffCtrl.getUsers);

module.exports = router;