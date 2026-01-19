const router = require('express').Router();
const session = require('express-session');
let Task = require('../models/tasks.model');

// Not used, find all
router.route('/:user').get((req, res) => {
    Task.find({user: req.params.user})
    .then(tasks => {
        res.json(tasks);
        console.log(tasks);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:user').post((req, res) => { 
    const title = req.body.title;
    const notes = req.body.notes;
    const dates = Date.parse(req.body.dates);
    const tag = req.body.tag;
    const user = req.params.user;

    const newTask = new Task({title, notes, dates, tag, user});

    newTask.save()
    .then(() => res.json('Task added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Not used, find by id
router.route('/:user').get((req, res) => {
    Task.findbyId(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:user').delete((req, res) => {
    Task.findOneAndDelete({title: req.body.title, notes:req.body.notes, dates:Date.parse(req.body.dates),
    tag: req.body.tag, user:req.params.user})
    .then(() => res.json('Task deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:user').post((req, res) => {
    Task.findOneAndUpdate({title: req.body.old.title, notes:req.body.old.notes, dates:Date.parse(req.body.old.dates),
        tag: req.body.old.tag, completed: req.body.old.completed, user:req.params.user},
        {title: req.body.new.title, notes:req.body.new.notes, dates:Date.parse(req.body.new.dates),
            tag: req.body.new.tag, completed: req.body.new.completed, user:req.params.user}
        )
        .then(() => res.json('Task updated'))
    // .then(task => {
    //     task.title = req.body.title;
    //     task.notes = req.body.notes;
    //     task.dates = Date.parse(req.body.dates);
    //     task.tag = req.body.tag;
    //     task.user = req.session.userid;

    //     task.save()
    //     .then(() => res.json('Task updated'))
    //     .catch(err => res.status(400).json('Error: ' + err));
    // })
    // .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;