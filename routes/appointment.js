//require Express Router
const router = require('express').Router();

//use appointment model
let Appointment = require('../models/appointment.model');

//processing of routes
router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    const doctor = req.body.doctor;
    

    const newAppointment = new Appointment({
        date,
        time,
        doctor
    });

    newAppointment.save()
    .then(() => res.json('Appointment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//export router
module.exports = router;

