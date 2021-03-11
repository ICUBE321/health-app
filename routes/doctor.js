//require Express Router
const router = require('express').Router();

//use doctor model
let Doctor = require('../models/doctor.model');

//processing of routes
router.route('/').get((req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const hospital = req.body.hospital;
    const specialization = req.body.specialization;

    const newDoctor = new Doctor({
        id,
        firstname,
        lastname,
        email,
        password,
        phone,
        hospital,
        specialization
    });

    newDoctor.save()
    .then(() => res.json('Doctor added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//export router
module.exports = router;

