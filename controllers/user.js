const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            User.findOne({ healthcardno: req.body.healthcardno })
                .then((user) => {
                    if (user) {
                        return res.status(401).send('Healthcard number already in use!');
                    }
                    const healthcardno = req.body.healthcardno;
                    const firstname = req.body.firstname;
                    const lastname = req.body.lastname;
                    const email = req.body.email; 

                    const newUser = new User({
                        healthcardno,
                        firstname,
                        lastname,
                        email,
                        password: hash,
                    });

                    newUser.save().then(() => {
                            res.status(201).json({ message: 'User added successfully!' });
                        }).catch(err => res.status(500).json('Error: ' + err));
                    }
                )}
    );
};

exports.login = (req, res, next) => {
    User.findOne({ healthcardno: req.body.username })
        .then(
            (user) => {
                if (!user) {
                    console.error('No user found!');
                    return res.status(401).send('No user found!');
                }
                bcrypt.compare(req.body.password, user.password).then(
                    (valid) => {
                        if (!valid) {
                            console.error('Incorrect password!');
                            return res.status(401).send('Incorrect password!');
                        }

                        const token = jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        );

                        res.status(200).json({
                            userId: user._id,
                            token: token,
                            firstname: user.firstname,
                        });
                    }).catch((error) => {
                    console.log(error)
                    res.status(500).send("Error checking user password!");
                });
        }).catch((error) => {
            console.log(error)
            res.status(500).send("Error finding user in database!");
        });
};