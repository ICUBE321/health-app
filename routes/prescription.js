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
    const healthcardno = req.body.healthcardno;
    const date = Date.parse(req.body.date);
    const ailment = req.body.ailment;
    const medicine = req.body.medicine;
    const volume = req.body.volume
    const prescribed_quantity = req.body.prescribed_quantity; 
    const refill = req.body.refill; 
 
    const newPrescription = new Prescription({
        healthcardno,
        date,
        ailment,
        medicine,
        volume,
        prescribed_quantity,
        refill,
    });

    newPrescription.save()
    .then(() => res.json('Prescription added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//export router
module.exports = router;

