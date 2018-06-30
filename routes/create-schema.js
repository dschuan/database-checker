const express = require('express');
const SchemaScan = require('../public/javascripts/schema-scan');

const router = express.Router();

/* GET users listing. */
router.post('/create-schema', function(req, res, next) {
  const credentials = req.body;
  SchemaScan(credentials).then(function(callback) {
    console.log(callback);
    res.send(callback);
  }).catch((err) => {
    res.send('Error');
  })
});

module.exports = router;
