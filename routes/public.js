let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// tracker model --> database
let Tracker = require('../models/tracker');

// C: add assignment --> POST
router.post('/add', (req, res) => {
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
            res.status(500).send('Cannot add');
        });
});

// R: display
router.get('/', (req, res) => {
    // Retrieve all assignments from the database
    Tracker.find()
        .then((trackerList) => {
            console.log(trackerList);
            res.render('public', { title: 'Reminders & Notes', Trackerlist: trackerList });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Cannot display');
        });
});

router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const assignmenttoEdit= await Tracker.findById(id);
        res.render('edit',
            {
                title:'Edit An Entry',
                Tracker:assignmenttoEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedTracker = Tracker({
            "_id":id,
            "assignment": req.body.assignment,
            "due_date": req.body.due_date,
            "description": req.body.description
        });
        Tracker.findByIdAndUpdate(id,updatedTracker).then(()=>{
            res.redirect('/public')
        })
    }
    catch(err){
        console.error(err);
        res.render('/public',{
            error:'Error on the server'
        })
    }
});

// D: delete --> GET
router.post('/delete/:id', (req, res) => {
    let id = req.params.id
    // Find and remove the assignment by its ID
    // button confirm delete here
    Tracker.deleteOne({_id:id}).then(()=>{
        res.redirect('/public');
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Cannot delete');
    });
});

module.exports = router;


/* 
MVC --> Model View Controller
model --> to connect our logic
view --> pages 
controller --> the logic behihd our routes
*/