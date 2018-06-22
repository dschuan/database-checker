const express = require('express');
const SchemaScan = require('../public/javascripts/schema-scan');

const router = express.Router();

/* GET users listing. */
router.post('/create-schema', function(req, res, next) {
  const credentials = req.body;
  SchemaScan(credentials, (err, res) => {
    if (err) {
      console.log(err);
      next(err)
    } else {
      res.send('Generated');
    }
  });
});

module.exports = router;
