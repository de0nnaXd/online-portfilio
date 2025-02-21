let mongoose = require('mongoose');

// inputs
let assignmentModel = mongoose.Schema ({
    assignment: String,
    due_date: String,
    description: String
    },
    {
        collections: "tracker"
    }
);

module.exports = mongoose.model('Tracker', assignmentModel);
