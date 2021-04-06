
const Appointment = require('../models/appointment.model');

exports.getAppointments = (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.createAppointment = (req, res) => {
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
}

const Detail = require('../models/detail.model');

exports.getDetail = (req, res) => {
    Detail.findById(req.params.id)
        .then(detail => res.json(detail))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.createDetail = (req, res) => {
    const DOB = req.body.DOB;
    const height = req.body.height;
    const weight = req.body.weight;
    const bloodtype = req.body.bloodtype;
    const allergies = req.body.allergies;
    const donor = req.body.organ_donor;
    const healthprobs = req.body.healthprobs;

    const healthcardno = User.findById(req.params.id);
    console.log(healthcardno);

    const newDetail = new Detail({
        healthcard,
        DOB,
        height,
        weight,
        bloodtype,
        allergies,
        donor,
        healthprobs,
    });

    newDetail.save()
    .then(() => res.json('Detail added!'))
    .catch(err => res.status(400).json('Error: ' + err));
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
};

const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

exports.getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
};


