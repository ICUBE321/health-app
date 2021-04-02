//require Express Router
const router = require('express').Router();

//use detail model
let Detail = require('../models/user.model/detail');

//processing of routes
router.route('/').get((req, res) => {
    Detail.find()
        .then(details => res.json(details))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const age = req.body.age;
    const height = req.body.height;
    const weight = req.body.weight;
    const bloodtype = req.body.bloodtype;
    const allergies = req.body.allergies;
    const donor = req.body.donor;
    const healthprobs = req.body.healthprobs;

    const newDetail = new Detail({
        healthcard,
        age,
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
});

//export router
module.exports = router;

