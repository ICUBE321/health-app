
const Appointment = require('../models/appointment.model');

exports.getAppointments = (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => {
            console.log(err);
            res.status(400).send('Error in getting appointments!');
        });
};

exports.getUserAppointment = (req, res) => {
    Appointment.find({"healthcardno": req.query.healthcardno})
        .then(appointments => {
            res.json(appointments);
        })
            .catch(error => {
                console.log(error);
                res.status(400).send('Error finding user appointments!');
            });
};

exports.getSingleAppointment = (req, res) => {
    Appointment.find({"_id": req.query.id})
        .then(appointments => {
            res.json(appointments);
        })
            .catch(error => {
                console.log(error);
                res.status(400).send('Error finding single appointment!');
            });
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

exports.editAppointment = (req, res) => {
    let appointmentId = req.query.id;
    let healthcardno = req.body.healthcardno;
    let date = Date.parse(req.body.date);
    let time = req.body.time;
    var query = { "_id": appointmentId };
    var newAppointment = {
        healthcardno,
        date,
        time,
    };
    Appointment.updateOne(query, { $set: newAppointment }, function(error, result) {    
        if(error) {
            console.log(error);
        } else {
            console.log(result);
        }
    }).then(() => res.json('Appointment updated!'))
        .catch(error => {
                    console.log(error);
                    res.status(400).send('Error updating appointment!');
                });
};

exports.deleteAppointment = (req, res) => {
    let appointmentId = req.query.id;
    Appointment.findByIdAndDelete(appointmentId)
        .then(() => {
            res.json('Appointment deleted!');
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Error deleting appointment!');
        })
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
    let cardno = req.query.healthcardno;
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

exports.getUserPrescription = (req, res) => {
    Prescription.find({"healthcardno": req.query.healthcardno})
        .then(prescriptions => {
            res.json(prescriptions);
        })
            .catch(error => {
                console.log(error);
                res.status(400).send('Error finding user prescriptions!');
            });
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

exports.editPrescription = (req, res) => {
    let prescriptionId = req.query.id;
    let healthcardno = req.body.healthcardno;
    let date = Date.parse(req.body.date);
    let ailment = req.body.time;
    let medicine = req.body.medicine;
    let volume = req.body.volume
    let prescribed_quantity = req.body.prescribed_quantity; 
    let refill = req.body.refill; 
    var query = { "_id": prescriptionId };
    var newPrescription = {
        healthcardno,
        date,
        ailment,
        medicine,
        volume,
        prescribed_quantity,
        refill,
    };
    Prescription.updateOne(query, { $set: newPrescription }, function(error, result) {    
        if(error) {
            console.log(error);
        } else {
            console.log(result);
        }
    }).then(() => res.json('Prescription updated!'))
        .catch(error => {
                    console.log(error);
                    res.status(400).send('Error updating prescription!');
                });
};

exports.getSinglePrescription = (req, res) => {
    Prescription.find({"_id": req.query.id})
        .then(prescriptions => {
            res.json(prescriptions);
        })
            .catch(error => {
                console.log(error);
                res.status(400).send('Error finding single prescription!');
            });
};

exports.deletePrescription = (req, res) => {
    let prescriptionId = req.query.id;
    Prescription.findByIdAndDelete(prescriptionId)
        .then(() => {
            res.json('Prescription deleted!');
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Error deleting prescription!');
        })
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


