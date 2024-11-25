var express = require('express');
var router = express.Router();

/* GET home/splash page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Assignment Tracker',
    section: 'Never miss an assignment again with '});
});

module.exports = router;

/* 
MVC --> Model View Controller
model --> to connect our logic
view --> pages 
controller --> the logic behihd our routes
*/