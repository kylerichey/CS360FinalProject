var express = require('express');
var router = express.Router();


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
    if (req.session) {
        req.session.destroy();
    }
    res.redirect('/login.html');
});

module.exports = router;
 