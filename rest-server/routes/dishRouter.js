var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Model = require('../models/dishes');
var Verify = require('./verify');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')

  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res, next) {
    Model.find({}, function (err, dish) {
      if (err) return next(err);
      res.json(dish);
    });
  })

  .all(Verify.verifyAdmin)

  .post(function (req, res, next) {
    Model.create(req.body, function (err, dish) {
      if (err) return next(err);
      console.log('Dish created!');
      var id = dish._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the dish with id: ' + id);
    });
  })

  .delete(function (req, res, next) {
    Model.remove({}, function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });

router.route('/:dishId')

  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res, next) {
    Model.findById(req.params.dishId, function (err, dish) {
      if (err) return next(err);
      res.json(dish);
    });
  })

  .all(Verify.verifyAdmin)

  .put(function (req, res, next) {
    Model.findByIdAndUpdate(req.params.dishId, {
      $set: req.body
    }, {
      new: true
    }, function (err, dish) {
      if (err) return next(err);
      res.json(dish);
    });
  })

  .delete(function (req, res, next) {
    Model.findByIdAndRemove(req.params.dishId, function (err, resp) {
      if (err) return next(err);
      res.json(resp);
    });
  });

router.route('/:dishId/comments')
  .get(function (req, res, next) {
    Model.findById(req.params.dishId, function (err, dish) {
      if (err) return next(err);
      res.json(dish.comments);
    });
  })

  .post(function (req, res, next) {
    Model.findById(req.params.dishId, function (err, dish) {
      if (err) return next(err);
      dish.comments.push(req.body);
      dish.save(function (err, dish) {
        if (err) return next(err);
        console.log('Updated Comments!');
        res.json(dish);
      });
    });
  })

  .delete(function (req, res, next) {
    Model.findById(req.params.dishId, function (err, dish) {
      if (err) return next(err);
      for (var i = (dish.comments.length - 1); i >= 0; i--) {
        dish.comments.id(dish.comments[i]._id).remove();
      }
      dish.save(function (err, result) {
        if (err) return next(err);
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('Deleted all comments!');
      });
    });
  });

router.route('/:dishId/comments/:commentId')

  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res, next) {
    Model.findById(req.params.dishId, function (err, dish) {
      if (err) return next(err);
      res.json(dish.comments.id(req.params.commentId));
    });
  })

  .all(Verify.verifyAdmin)

  .put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Model.findById(req.params.dishId, function (err, dish) {
      if (err) return next(err);
      dish.comments.id(req.params.commentId).remove();
      dish.comments.push(req.body);
      dish.save(function (err, dish) {
        if (err) return next(err);
        console.log('Updated Comments!');
        res.json(dish);
      });
    });
  })

  .delete(function (req, res, next) {
    Model.findById(req.params.dishId, function (err, dish) {
      dish.comments.id(req.params.commentId).remove();
      dish.save(function (err, resp) {
        if (err) return next(err);
        res.json(resp);
      });
    });
  });

module.exports = router;
