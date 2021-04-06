
const Appointment = require('../models/appointment.model');

exports.getAppointments = (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.createAppointment = (req, res) => {
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
};

const Detail = require('../models/detail.model');

exports.getDetail = (req, res) => {
    let healthcardno = req.query.healthcardno;
    Detail.find({"healthcardno": healthcardno})
        .then(detail => res.json(detail))
        .catch(error => {
            console.log(error);
            res.status(400).send('Error getting details');
    });
};

exports.createDetail = (req, res) => {
    
    const healthcardno = req.body.healthcardno;
    const DOB = Date.parse(req.body.DOB);
    const height = req.body.height;
    const weight = req.body.weight;
    const bloodtype = req.body.bloodtype;
    const allergies = req.body.allergies;
    const donor = req.body.organ_donor;
    const healthprobs = req.body.healthprobs;

    const newDetail = new Detail({
        healthcardno,
        DOB,
        height,
        weight,
        bloodtype,
        allergies,
        donor,
        healthprobs,
    });

    //console.log("New detail" + newDetail);
    newDetail.save()
    .then(() => res.json('Detail added!'))
    .catch(err => res.status(400).send('Error while adding user details: ' + err));
};

exports.editDetail = (req, res) => {
    console.log("Request body: "+req.body.weight);
    let cardno = req.query.healthcardno;
    console.log("Card number: "+ cardno);
    var query = { "healthcardno": cardno };
    var newDetail = {
        DOB : Date.parse(req.body.DOB),
        height : req.body.height,
        weight : req.body.weight,
        bloodtype : req.body.bloodtype,
        allergies : req.body.allergies,
        donor : req.body.organ_donor,
        healthprobs : req.body.healthprobs
    };
    Detail.updateOne(query, { $set: newDetail }, function(error, result) {    
        if(error) {
            console.log(error);
        } else {
            console.log(result);
        }
    }).then(() => res.json('Detail updated!'))
        .catch(error => {
                    console.log(error);
                    res.status(400).send('Error updating detail!');
                });
};

const Doctor = require('../models/doctor.model');

exports.getDoctors = (req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.createDoctor = (req, res) => {
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
};

const Prescription = require('../models/prescription.model');

exports.getPrescriptions = (req, res) => {
    Prescription.find()
        .then(prescriptions => res.json(prescriptions))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.createPrescription = (req, res) => {
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
};

const User = require('../models/user.model');

exports.getUsers = (req, res) => {
    let id = req.query.id;
    User.find({"_id": id})
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(400).send('Error finding user with id');
        });
};


