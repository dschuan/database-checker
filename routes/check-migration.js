const express = require('express');
const CheckVersion = require('../public/javascripts/migration-wizard').checkVersion;

const router = express.Router();

/* GET users listing. */
router.post('/check-migration', function(req, res, next) {
  const credentials = JSON.parse(req.body.credentials);
  const rocketInfo = JSON.parse(req.body.rocketInfo);
  CheckVersion(rocketInfo, credentials);
  res.send('true');
  })

module.exports = router;
