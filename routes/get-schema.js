const express = require('express');
const GetSchema = require('../public/javascripts/get-schema');

const router = express.Router();

/* GET users listing. */
router.get('/get-schema', function(req, res, next) {
  let dat = {};
  GetSchema().then(function(data) {
    dat['data'] = data;
    console.log(dat);
    res.json(dat);
  })
});

module.exports = router;
