//require Express Router
const router = require('express').Router();

//use user model
let User = require('../models/user.model');

//processing of routes
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const healthcard = req.body.healthcard;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        healthcard,
        firstname,
        lastname,
        email,
        password,
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//export router
module.exports = router;

