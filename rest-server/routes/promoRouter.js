var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Model = require('../models/promotions');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
  .get(function (req, res, next) {
    Model.find({}, function (err, promotion) {
      if (err) throw err;
      res.json(promotion);
    });
  })

  .post(function (req, res, next) {
    Model.create(req.body, function (err, promotion) {
      if (err) throw err;
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
      if (err) throw err;
      res.json(resp);
    });
  });

router.route('/:promotionId')
  .get(function (req, res, next) {
    Model.findById(req.params.promotionId, function (err, promotion) {
      if (err) throw err;
      res.json(promotion);
    });
  })

  .put(function (req, res, next) {
    Model.findByIdAndUpdate(req.params.promotionId, {
      $set: req.body
    }, {
      new: true
    }, function (err, promotion) {
      if (err) throw err;
      res.json(promotion);
    });
  })

  .delete(function (req, res, next) {
    Model.findByIdAndRemove(req.params.promotionId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = router;
