'use strict';

var router  = require('express').Router();
var Account = require('../models/account');

router.route('/player')
  .post(function(req, res) {
    var account = new Account(req.body);
    account.save(function(err) {
      if(err) return res.send(err);
      res.send({message: 'Account created'});
    });
  })
  .get(function(req, res) {
    Account.find(function(err, accounts) {
      if(err) return res.send(err);
      res.send(accounts);
    })
  })
  .delete(function(req, res) {
    Account.remove({}, function(err) {
      if(err) {
        return res.send(err);
      }
      return res.send({ message: 'Bulk delete succesful!' });
    });
  });

router.route('/player/:id')
  .get(function(req, res) {
    Account.findOne({uid: req.params.id}, function(err, account) {
      if(err) return res.send(err);
      return res.send(account);
    })
  })


module.exports = router;
