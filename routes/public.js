let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// tracker model --> database
let Tracker = require('../models/tracker');

// C: add assignment --> POST
router.post('/public/add', (req, res) => {
    // new assignment
    let newAssignment = new Tracker({
        assignment: req.body.assignment,
        due_date: req.body.due_date,
        description: req.body.description
    });

    // save new assignment to the database
    newAssignment.save()
        .then(() => {
            // After saving, redirect to /public to show the updated list
            res.redirect('/public');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot add assignment');
        });
});

// R: display
router.get('/public', (req, res) => {
    // Retrieve all assignments from the database
    Tracker.find()
        .then((trackerList) => {
            console.log(trackerList);
            res.render('public', { title: 'Assignments Tracker', Trackerlist: trackerList });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot display assignments');
        });
});

// U: edit --> POST
router.post('/public/edit/:id', (req, res) => {
    // Find and update the assignment by its ID
    Tracker.findByIdAndUpdate(req.params.id, {
        assignment: req.body.assignment,
        due_date: req.body.due_date,
        description: req.body.description
    })
        .then(() => {
            // After updating, redirect to /public to show the updated list
            res.redirect('/public');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot update assignment');
        });
});

// D: delete --> GET
router.get('/public/delete/:id', (req, res) => {
    // Find and remove the assignment by its ID
    Tracker.findByIdAndRemove(req.params.id)
        .then(() => {
            // After deleting, redirect to /public to show the updated list
            res.redirect('/public');
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