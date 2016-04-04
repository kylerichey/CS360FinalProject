var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = express.Router();
var crypto = require('crypto');

function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    User.find(function(err, data) {
        if (err) { return next(err); }
        var ret = [];
        data.forEach(function(user) {
            ret.push({
                _id: user._id,
                username: user.username,
                body_type: user.body_type
            });
        });
        res.json(ret);
    });
});

router.get('/me', function(req, res, next) {
    if (req.session.user) {
        User.findOne({_id: req.session.user}).exec(function(err, user) {
            if (!user) {
                res.json(err);
            } else {
                delete user.hashed_password;
                res.json(user);
            }
        });
    } else {
        res.json({error: "Not logged in"});
    }
});

router.post('/login', function (req, res, next) {
    var feedback =  {
        message: undefined,
        user_error: false,
        password_error: false
    };
    User.findOne({username: req.body.username}).exec(function(err, user) {
        if (!user) {
            feedback.message = "Username not found";
            feedback.user_error = true;
            req.session.regenerate(function() {
                req.session.feedback = feedback;
                res.redirect('/login');
            });
        } else if (user.hashed_password === hashPW(req.body.password.toString())) {
            req.session.regenerate(function(){
                console.log("login");
                console.log(user);
                req.session.user = user._id;
                req.session.username = user.username;
                req.session.game = user.game;
                res.redirect('/');
            });
        } else {
            feedback.message = "Incorrect password";
            feedback.password_error = true;
            req.session.regenerate(function() {
                req.session.feedback = feedback;
                res.redirect('/login');
            });
        }
    });
});

router.post('/register', function (req, res, next) {
    if (req.body.username === '') {
        req.session.regenerate(function() {
            req.session.feedback = {
                message: "Must provide a non-empty username",
                user_error: true
            };
            res.redirect('/register');
        });
        return;
    }
    User.findOne({username: req.body.username}).exec(function(err, user) {
        if (!user) {
            if (req.body.password1 !== req.body.password2) {
                req.session.regenerate(function() {
                    req.session.feedback = {
                        message: "Passwords do not match",
                        password_error: true
                    };
                    res.redirect('/register');
                });
            } else if (req.body.password1 === '') {
                req.session.regenerate(function() {
                    req.session.feedback = {
                        message: "Must provide a non-empty password",
                        password_error: true
                    };
                    res.redirect('/register');
                });
            } else {
                var user = new User({
                    username: req.body.username,
                    hashed_password: hashPW(req.body.password1),
                    gender: req.body.gender
                });

                user.save(function(err) {
                    if (err) {
                        res.session.feedback = { 
                            message: "Failed to register",
                            error: err
                        };
                        res.redirect('/register');
                    } else {
                        req.session.user = user._id;
                        req.session.username = user.username;
                        req.session.game = user.game;
                        res.redirect('/');
                    }
                });
            }

        } else {
            req.session.regenerate(function () {
                req.session.feedback = {
                    message: "Username unavailable",
                    user_error: true
                };
                res.redirect('/register');
            });
        }
    });
});

router.post('/update', function(req, res, next) {
        console.log(req.body.game);
	if (req.session.user && (req.body.game != null)) {
                var query = {_id: req.session.user};
                var update = {$set: {game: req.body.game}};
                var options;
                User.update(query, update, options, function(err, numAffected) {
                        if (err) {
				console.log("Mongo save error");
                                res.send(err);
                        } else if (numAffected > 1) {
				console.log("Save error. Too many affected");
                                res.send(new Error("Error: More than one DB entry updated"));
                        } else if (numAffected == 0) {
				console.log("Save error. No user found.");
                                res.send(new Error("Error: No user found with given ID"));
                        } else {
                                res.send("SUCCESS");
                        }
                });
        } else if (req.body.game == null) {
 		console.log("Game state is null");
		res.send("game is null");
	}
	else {
                res.send({error: "Not logged in"});
        }
});


module.exports = router;
