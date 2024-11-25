let express = require('express');
let router = express.Router();

// Import the tracker model to interact with the database
let Tracker = require('../models/tracker');

// C: Add assignment --> POST
router.post('/add', (req, res) => {
    let newAssignment = new Tracker({
        assignment: req.body.assignment,
        due_date: req.body.due_date,
        description: req.body.description
    });

    newAssignment.save()
        .then(() => {
            res.redirect('/public');  // After saving, redirect to the public page
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot add assignment');
        });
});

// R: Display all assignments
router.get('/public', (req, res) => {
    Tracker.find()
        .then((trackerList) => {
            res.render('public', { title: 'Assignments Tracker', Trackerlist: trackerList });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot display assignments');
        });
});

// U: Edit assignment --> POST
router.post('/edit/:id', (req, res) => {
    Tracker.findByIdAndUpdate(req.params.id, {
        assignment: req.body.assignment,
        due_date: req.body.due_date,
        description: req.body.description
    })
    .then(() => {
        res.redirect('/public');  // After updating, redirect to the public page
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Cannot update assignment');
    });
});

// D: Delete assignment --> GET
router.get('/delete/:id', (req, res) => {
    Tracker.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect('/public');  // After deleting, redirect to the public page
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot delete assignment');
        });
});

module.exports = router;


/* 
MVC --> Model View Controller
model --> to connect our logic
view --> pages 
controller --> the logic behihd our routes
*/