var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Model = require('../models/leadership');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')

  //first route all requests to verify user
  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res, next) {
    Model.find({}, function (err, leader) {
      if (err) return next(err);
      res.json(leader);
    });
  })

  //all non-get requests require admin
  .all(Verify.verifyAdmin)

  .post(function (req, res, next) {
    Model.create(req.body, function (err, leader) {
      if (err) return next(err);
      console.log('Leader created!');
      var id = leader._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the leader with id: ' + id);
    });
  })

  .delete(function (req, res, next) {
    Model.remove({}, function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });

router.route('/:leaderId')
  .get(function (req, res, next) {
    Model.findById(req.params.leaderId, function (err, leader) {
      if (err) return next(err);
      res.json(leader);
    });
  })

  .put(function (req, res, next) {
    Model.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, {
      new: true
    }, function (err, leader) {
      if (err) return next(err);
      res.json(leader);
    });
  })

  .delete(function (req, res, next) {
    Model.findByIdAndRemove(req.params.leaderId, function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });

module.exports = router;
