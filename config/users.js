var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Needing user action');
});

/* GET users listing. */
router.get('/public', function(req, res, next) {
  res.send('Needing user action');
});

module.exports = router;
