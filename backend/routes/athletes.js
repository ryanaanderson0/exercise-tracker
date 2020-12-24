const router = require('express').Router();
let Athlete = require('../models/athlete.model');

router.route('/').get((req, res) => {
  Athlete.find()
    .then(athletes => res.json(athletes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newAthlete = new Athlete({username});

  newAthlete.save()
    .then(() => res.json('Athlete added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;