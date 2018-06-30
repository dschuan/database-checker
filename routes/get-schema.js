const express = require('express');
const GetSchemaList = require('../public/javascripts/get-schema').getSchemaList;
const GetSchema = require('../public/javascripts/get-schema').getSchema;
const router = express.Router();

/* GET users listing. */
router.get('/get-schema-list', function(req, res, next) {
  let dat = {};
  GetSchemaList().then(function(data) {
    dat['data'] = data;
    console.log(dat);
    res.json(dat);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/get-schema/:schema', (req, res, next) => {
  const schema = `./schemas/${req.params.schema}`;
  GetSchema(schema).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})
module.exports = router;
