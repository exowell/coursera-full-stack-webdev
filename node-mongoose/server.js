var mongoose = require('mongoose'),
  assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leadership = require('./models/leadership');

mongoose.Promise = require('bluebird');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");

  // create a new dish
  Dishes.create({
    name: 'Uthapizza',
    image: "images/uthapizza.png",
    category: "mains",
    label: "Hot",
    price: "4.99",
    description: "A unique . . .",
    comments: [{
      rating: 3,
      comment: 'This is insane',
      author: 'Matt Daemon'
    }]
  }, function (err, dish) {
    if (err) throw err;
    console.log('Dish created!');
    console.log(dish);

    var id = dish._id;

    // get all the dishes
    setTimeout(function () {
      Dishes.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function (err, dish) {
          if (err) throw err;
          console.log('Updated Dish!');
          console.log(dish);

          dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
          });

          dish.save(function (err, dish) {
            console.log('Updated Comments!');
            console.log(dish);

            db.collection('dishes').drop(function () {
              Promotions.create({
                name: "Weekend Grand Buffet",
                image: "images/buffet.png",
                label: "New",
                price: "19.99",
                description: "Featuring . . ."
              }, function (err, promo) {
                if (err) throw err;
                console.log('Promotion created!');
                console.log(promo);

                var id = promo._id;
                setTimeout(function () {
                  Promotions.findByIdAndUpdate(id, {
                      $set: {
                        description: 'Updated Test'
                      }
                    }, {
                      new: true
                    })
                    .exec(function (err, promo) {
                      if (err) throw err;
                      console.log('Updated promo!');
                      console.log(promo);
                      db.collection('promotions').drop(function () {
                        Leadership.create({
                            "name": "Peter Pan",
                            "image": "images/alberto.png",
                            "designation": "Chief Epicurious Officer",
                            "abbr": "CEO",
                            "description": "Our CEO, Peter, . . ."
                          },
                          function (err, leader) {
                            if (err) throw err;
                            console.log('Leader created');
                            console.log(leader);
                            db.collection('leadership').drop(function () {
                              db.close();
                            });
                          });
                      });
                    });
                }, 3000);
              });
            });
          });
        });
    }, 3000);
  });






});
