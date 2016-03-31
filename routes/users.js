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
    User.findOne({username: req.body.username}).exec(function(err, user) {
        if (!user){
            err = 'User Not Found.';
        } else if (user.hashed_password === hashPW(req.body.password.toString())) {
            req.session.regenerate(function(){
                console.log("login");
                console.log(user);
                req.session.user = user._id;
                req.session.username = user.username;
                req.session.msg = 'Authenticated as ' + user.username;
                req.session.game = user.game;
                res.redirect('/');
            });
        }else{
            err = 'Authentication failed.';
        }
        if(err){
            req.session.regenerate(function() {
                res.session.msg = err;
                res.redirect('/login.html');
            });
        }
    });
});

router.post('/register', function (req, res, next) {

    var user = new User({
        username: req.body.username,
        hashed_password: hashPW(req.body.password1),
        body_type: req.body.body_type === '' ? "Lack luster" : req.body.body_type
    });

    user.save(function(err) {
        if (err) {
            res.session.err = err;
            res.session.msg = "Failed to register";
            res.redirect('/users/register');
        } else {
            req.session.user = user._id;
            req.session.username = user.username;
            req.session.game = user.game;
            res.redirect('/');
        }
    });
})

router.post('/logout', function(req, res, next) {
    
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
