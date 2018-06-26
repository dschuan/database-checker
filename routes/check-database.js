const express = require('express');
const CheckDatabase = require('../public/javascripts/check-database');

const router = express.Router();

/* GET users listing. */
router.post('/check-database', function(req, res, next) {
  const credentials = req.body;
  CheckDatabase(credentials).then(function(callback) {
    console.log(callback);
    res.send(callback);
  }).catch(error => {
    res.send(error);
  })
});

module.exports = router;
