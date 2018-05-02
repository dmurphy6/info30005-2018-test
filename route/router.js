var express = require('express');
// var users = require('../models/db');
var userController = require('../controllers/userController');
var router = express.Router();
var visits = 0;



router.get('/', function (req, res) {
	res.render('landing.ejs');
	visits += 1;
	console.log(visits);
})

router.get('/landing',function (req, res) {
	res.render('landing');
})


router.get('/aboutus', function (req, res) {
	res.render('aboutus.ejs');
})

router.get('/blog', function (req, res) {
	res.render('blog.ejs');
})

router.get('/blogAccessFromLanding', function (req, res) {
	res.render('blogAccessFromLanding.ejs');
})

router.get('/imagegallery', function (req, res) {
	res.render('imagegallery.ejs');
})

router.get('/inviteContributer', function (req, res) {
	res.render('inviteContributer.ejs');
})

router.get('/login', function (req, res) {
	res.render('login.ejs');
})

router.get('/profilePage', function (req, res) {
	res.render('profilePage.ejs');
})

router.get('/signup', function (req, res) {
	res.render('signup.ejs');
})

router.get('/tqCard', function (req, res) {
	res.render('tqCard.ejs');
})

router.get('/writeLegacy', function (req, res) {
	res.render('writeLegacy.ejs');
})

router.post('/login', userController.createUser);
router.post('/profilePage', userController.login);

module.exports = router;

// var express = require('express');
// var users = require('../models/db');
// var userController = require('../controllers/userController');
// var router = express.Router();
// var visits = 0;


// router.get('/', userController.loadIndex)


// module.exports = router;