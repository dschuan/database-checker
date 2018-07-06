const express = require('express');
const SaveSchema = require('../public/javascripts/save-schema');
const router = express.Router();

router.post('/edit-schema', (req, res, next) => {
  const data = req.body;
  SaveSchema(data).then((callback) => {
    console.log(callback);
    res.send(callback);
  }).catch((err) => {
    res.send('Error');
  })
})

module.exports = router;
