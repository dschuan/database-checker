const express = require('express');
const CheckDatabase = require('../public/javascripts/check-database');

const router = express.Router();

/* GET users listing. */
router.post('/check-database', function(req, res, next) {
  const credentials = req.body;
  CheckDatabase(credentials).then(function(callback) {
    let dat = {}
    const keys = Object.keys(callback);
    dat['keys'] = keys;
    res.send(dat);
  }).catch(error => {
    res.send(error);
  })
});

module.exports = router;
