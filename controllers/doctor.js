const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/doctor.model');

exports.login = (req, res, next) => {
    Doctor.findOne({ "docid": req.body.doctorId })
        .then(
            (doctor) => {
                if(!doctor) {
                    console.error('No doctor found!');
                    return res.status(401).send('No doctor found!');
                }
                bcrypt.compare(req.body.password, doctor.password)
                    .then((valid) => {
                        if(!valid) {
                            console.error('Incorrect password!');
                            return res.status(401).send('Incorrect password!');
                        }

                        const token = jwt.sign(
                            { doctorRecordId: doctor._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        );

                        res.status(200).json({
                            doctorRecordId: doctor._id,
                            token: token,
                            doctorId: doctor.id,
                        });
                    }).catch((error) => {
                            console.log(error);
                            res.status(500).send("Error checking doctor password!");
                        })
            }
        ).catch((error) => {
            console.log(error);
            res.status(500).send("Error finding doctor in database!");
        })
}