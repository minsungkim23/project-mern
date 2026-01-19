const router = require('express').Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
let User = require('../models/users.model');

const saltRounds = 5;

// show all users (not used)
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// log in
router.route('/').post((req, res) => {
    const {username, password} = req.body;

    User.findOne({'username': username})
    .then(user => {
        console.log("found"); 
        bcrypt.compare(password, user.password, (err, isValid) => {
            if (err) {
                return res.send({status:'Error', error: err});
            }
            if (!isValid) {
                return res.send({status:'Error', error: 'Incorrect password'});
            }
            new_session = req.session;
            new_session.userid = username; // not sure how this works
            console.log(req.session);
            return res.send({status:'Ok', data: new_session});
        })
    })
    .catch(() => {
        console.log("couldn't find");
        res.send({status:'Error', error: 'Username does not exist'});
        // res.status(400).json('Error: ' + err);
    });
});

// sign up, adds a user to the db
router.route('/add').post((req, res) => { 
    const username = req.body.username;
    bcrypt.hash(req.body.password, saltRounds)
    .then(hash => {
        const newUser = new User({username: username, password: hash});

        try {
            newUser.save()
            .then(() => res.json('User added'));
        } catch (error) { 
            console.log(JSON.stringify(error));
            if (error.code === 11000) {
                return res.send({status:'Error', error: 'Username already exists'})
            }
        }
    });
});

module.exports = router;