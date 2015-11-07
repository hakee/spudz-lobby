'use strict';

var router = require('express').Router();

router.route('/test')
  .get(function(req, res) {
    res.send('It is working')
  });


module.exports = router;
