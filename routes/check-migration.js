const express = require('express');
const CheckDatabase = require('../public/javascripts/check-database');

const router = express.Router();

/* GET users listing. */
router.post('/check-migration', function(req, res, next) {
  const credentials = req.body;
  res.send('true');
  }).catch(error => {
    res.send(error);
  })
});

module.exports = router;
