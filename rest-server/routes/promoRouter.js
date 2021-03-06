var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Model = require('../models/promotions');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')

  //first route all requests to verify user
  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res, next) {
    Model.find({}, function (err, promotion) {
      if (err) return next(err);
      res.json(promotion);
    });
  })

  //all non-get requests require admin, route to verifyAdmin before the remaining calls
  .all(Verify.verifyAdmin)

  .post(function (req, res, next) {
    Model.create(req.body, function (err, promotion) {
      if (err) return next(err);
      console.log('Promotion created!');
      var id = promotion._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the promotion with id: ' + id);
    });
  })

  .delete(function (req, res, next) {
    Model.remove({}, function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });

router.route('/:promotionId')

  //first route all requests to verify user
  //note, that midleware functions are chained in the order of definition
  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res, next) {
    Model.findById(req.params.promotionId, function (err, promotion) {
      if (err) return next(err);
      res.json(promotion);
    });
  })

  //all non-get requests require admin, route to verifyAdmin before the remaining calls
  .all(Verify.verifyAdmin)

  .put(function (req, res, next) {
    Model.findByIdAndUpdate(req.params.promotionId, {
      $set: req.body
    }, {
      new: true
    }, function (err, promotion) {
      if (err) return next(err);
      res.json(promotion);
    });
  })

  .delete(function (req, res, next) {
    Model.findByIdAndRemove(req.params.promotionId, function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });

module.exports = router;
