var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('In the root route.');
    if (req.session.user) {
        res.redirect('/private/index.html');
    } else {
        res.redirect('/login');
    }
});

router.get('/login', function(req, res, next){
    var feedback = {};
    if (req.session) {
        feedback = req.session.feedback;
        req.session.destroy();
    }
    res.render('login', feedback);
});

router.get('/register', function(req, res, next) {
    var feedback = {};
    if (req.session) {
        feedback = req.session.feedback;
        req.session.destroy();
    }
    res.render('register', feedback);
});

router.post('/update', function(req, res, next, myGame) {
        if (req.session.user) {
                var query = {_id: req.session.user};
                var update = {$set: {game: myGame}};
                var options;
                User.update(query, update, options, function(err, numAffected) {
                        if (err) {
                                return next(err);
                        } else if (numAffected > 1) {
                                return next(new Error("Error: More than one DB entry updated"));
                        } else if (numAffected == 0) {
                                return next(new Error("Error: No user found with given ID"));
                        } else {
                                return next;
                        }
                });
        } else {
                res.json({error: "Not logged in"});
        }
});

module.exports = router;
 
