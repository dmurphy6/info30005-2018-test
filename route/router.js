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

router.get('/imagegallery', userController.getImages);


router.get('/inviteContributer', function (req, res) {
	res.render('inviteContributer.ejs');
})

router.get('/login', function (req, res) {
	res.render('login.ejs');
})

router.get('/profilePage', userController.getUser);

router.get('/signup', function (req, res) {
	res.render('signup.ejs');
})

router.get('/tqCard', function (req, res) {
	res.render('tqCard.ejs');
})

router.get('/writeLegacy', function (req, res) {
	res.render('writeLegacy.ejs');
})

router.get('/aboutUser', function (req, res) {
	res.render('getInfo.ejs');
})

router.get('/info', function (req, res) {
	res.render('information.ejs');
})

router.get('/lastInfo', function (req, res) {
	res.render('finalInfo.ejs');
})

router.post('/createUser', userController.createUser);
router.post('/profilePage', userController.login);
router.post("/nextInfo", userController.aboutUser);
router.post('/final', userController.finalInfo);
router.post('/alldone', userController.finaladditions);
router.post('/addImage', userController.addImage);




module.exports = router;

// router.get('/profilePage', function (req, res) {
// 	if (!req.user) {
//     res.redirect('/login');
//   } else {
  	
//     res.render('profile.ejs');
//   }
// })

// module.exports = router;