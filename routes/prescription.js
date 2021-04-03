//require Express Router
const router = require('express').Router();

//use prescription model
let Prescription = require('../models/prescription.model');

//processing of routes
router.route('/').get((req, res) => {
    Prescription.find()
        .then(prescriptions => res.json(prescriptions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const date = req.body.date;
    const ailment = req.body.ailment;
    const medicine = req.body.medicine;
    const volume = req.body.volume
    const quantity = req.body.quantity;
    const refill = req.body.refill;

    const newPrescription = new Prescription({
        healthcard,
        date,
        ailment,
        medicine,
        volume,
        quantity,
        refill,
    });

    newPrescription.save()
    .then(() => res.json('Prescription added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//export router
module.exports = router;

