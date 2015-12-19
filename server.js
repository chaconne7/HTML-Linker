//server.js

//Base setup
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/node-name');

var Name = require('./app/models/name');

//Configure for body parser
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

//Set port
var port = process.env.PORT || 8080;

//API routes
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });

router.route('/names')

  .post(function(req, res) {
    var name = new Name();
    name.name = req.body.name;
    name.url = req.body.url;

    name.save(function(err) {
      if (err) res.send(err);
      res.json({ message : 'Name/link created!'});
    });
  })

  .get(function(req, res) {
        Name.find(function(err, names) {
            if (err) res.send(err);
            res.json(names);
        });
    })

  .delete(function(req, res) {
    // Name.remove({}, function(err, res) {
    //   if (err) res.send(err);
    // });
    Name.remove({name : "anna"}, function (err) {
      if (err) throw err;
    });
  });

router.route('/names/:name_id')

  .get(function(req, res) {
    Name.findOne({_id: req.params.name_id}, function(err, name) {
      if (err) res.send(err);
      res.json(name);
    });
  })

  .put(function(req, res) {
   Name.findOne({_id: req.params.name_id}, function(err, name) {
      if (err) res.send(err);
      name.name = req.body.name;
      name.url = req.body.url;
      name.save(function(err) {
        if (err) res.send(err);
        res.json({message : 'Name updated!'});
      });
    });
  });

//Register routes
app.use('/api', router);

//Start server
app.listen(port);
console.log('Magic happens on port ' + port);
