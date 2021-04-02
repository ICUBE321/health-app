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
    const healthcardno = req.body.healthcardno;
    const date = Date.parse(req.body.date);
    const time = req.body.time;

    const newAppointment = new Appointment({
        healthcardno,
        date,
        time,
    });

    newAppointment.save()
    .then(() => res.json('Appointment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//export router
module.exports = router;

