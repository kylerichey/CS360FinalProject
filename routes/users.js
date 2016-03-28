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

router

module.exports = router;
