var express = require('express');
var router = express.Router();

/* GET list_item listing. */
router.get('/list_items', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
