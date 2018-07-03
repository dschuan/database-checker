const express = require('express');
const SchemaScan = require('../public/javascripts/schema-scan');
const router = express.Router();

router.post('/create-schema', (req, res, next) => {
  const credentials = req.body;
  SchemaScan(credentials).then((callback) => {
    console.log(callback);
    res.send(callback);
  }).catch((err) => {
    res.send('Error');
  })
});



module.exports = router;
