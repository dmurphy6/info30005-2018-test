var express = require('express');
var User = require('../models/user');
var userController = require('../controllers/userController');
var router = express.Router();
var visits = 0;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use('local',new LocalStrategy({
    passReqToCallback : true
  },
  function(req,username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
      	console.log('bad username');
        return done(null, false, req.flash('message', 'User Not found.'));
      }
      if (!user.validPassword(password)) {
      	console.log('bad pas');
        return done(null, false, req.flash('message', 'Invalid Password'));
      }
      return done(null, user);
    });
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
});


router.get('/', function (req, res) {
	res.render('landing.ejs');
	visits += 1;
	console.log(visits);
})

router.get('/landing',function (req, res) {
	req.logout();
	res.render('landing');
})


router.get('/aboutus', function (req, res) {
	res.render('aboutus.ejs');
})

router.get('/blog', userController.blog);

router.get('/blogAccessFromLanding', userController.blog);

router.get('/imagegallery', userController.getImages);


router.get('/inviteContributer', function (req, res) {
	res.render('inviteContributer.ejs');
})

router.get('/login', function (req, res) {
	res.render('login.ejs', { message: req.flash('message') });
})

router.get('/profilePage', userController.getUser);

router.get('/user/:user',userController.getOtherUser);
router.get('/imagegallery/:user',userController.getOtherUserImages);

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
router.post('/profilePage', 
	passport.authenticate('local', { successRedirect: '/profilePage',
                                  	failureRedirect : '/login',
    							   failureFlash: true ,
                                   session: true }));

router.post("/nextInfo", userController.aboutUser);
router.post('/final', userController.finalInfo);
router.post('/alldone', userController.finaladditions);
router.post('/addImage', userController.addImage);
router.post('/user/:user', userController.getOtherUser);

module.exports = router;