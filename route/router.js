// var users = require('../models/db');
var visits = 0;
var userController = require('../controllers/userControllers');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var ObjectId = require('mongodb').ObjectID;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = function (router, passport) {
    router.get('/', function (req, res) {
        res.render('landing', {message: req.flash('landingInfoMessage')});
        visits += 1;
        console.log(visits);
    });

    router.get('/landing', function (req, res) {
        res.render('landing', {message: req.flash('landingInfoMessage')});
    });

    router.get('/writeLegacy', userController.getWriteLegacy);

    router.get('/readLegacy', userController.getReadLegacy);

    router.get('/aboutus', function (req, res) {
        res.render('aboutus.ejs');
    });

    router.get('/aboutusAccessFromLanding', function (req, res) {
        res.render('aboutusAccessFromLanding.ejs');
    });

    router.get('/blog', userController.getBlog);

    router.get('/blogAccessFromLanding', userController.getBlogFromLanding);

    router.get('/changePassword', userController.getChangePassword);

    router.get('/imagegallery', function (req, res) {
        res.render('imagegallery.ejs');
    });

    router.get('/inviteContributer', function (req, res) {
        res.render('inviteContributer.ejs');
    });

    router.get('/login', function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
    router.get('/viewProfile', userController.getViewProfile);

    router.get('/profile', isLoggedIn, userController.getProfilePage);

    /*router.get('../ownProfile/:id',isLoggedIn, userController.getProfilePage);
*/
    router.get('/signup', userController.getSignUp);

    router.get('/firstInformation', userController.getFirstInformation);

    router.get('/nextInformation', userController.getNextInformation);

    router.get('/finalInformation', userController.getFinalInformation);

    router.get('/firstInformationLogin', userController.getFirstInformationLogin);

    router.get('/nextInformationLogin', userController.getNextInformationLogin);

    router.get('/finalInformationLogin', userController.getFinalInformationLogin);

    router.get('/settings', userController.getSettings);

    router.get('/createMemorial', userController.getCreateMemorial);

    router.post('/login', passport.authenticate('local-login', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        userController.getCreateMemorial);


    router.post('/signup', passport.authenticate('local-signup', {
            failureRedirect: '/signup',
            failureFlash: true
        }),
        userController.getCreateMemorial);

    router.post('/firstInfoLogin', userController.firstInformationLogin);

    router.post('/secondInfoLogin', userController.secondInformationLogin);

    router.post('/finalInfoLogin', userController.finalInformationLogin);

    router.post('/firstInfo', userController.firstInformation);

    router.post('/secondInfo', userController.secondInformation);

    router.post('/finalInfo', userController.finalInformation);

    router.post('/changePassword', userController.changePassword);

    router.post('/saveLegacy', userController.saveLegacy);

    router.post('/addcontributer', userController.addcontributer);

    router.post('/upload', upload.single('upl'), function (req, res, next) {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
        console.log(req.file.data);
        if (req.session && req.user) {
            User.findOne({ username: req.user.username }, function(err, user) {
                if (user) {
                    req.user = user;
                }
                // finishing processing the middleware and run the route
                user.profileImg.data = fs.readFileSync(req.file.path);
                user.profileImg.contentType = req.file.mimetype;

                user.save(function(err) {
                    if (err) throw err;
                    res.contentType(user.profileImg.contentType);
                    res.send(user.profileImg.data);
                });
            })
        } else {
            req.flash('profileInfoMessage', 'Error has occurred.');
            res.redirect('profile');
        }
    });
};


// router.get('/tqCard', function (req, res) {
// 	res.render('tqCard.ejs');
// })
//




// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var passport = require('passport');

// load up the user model
var models = require('../models/user');

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        models.User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'Username',
            passwordField : 'Password',
            emailField: 'email',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            //
            // console.log(username);
            // console.log(req.body.email);
            // console.log(password);

            // asynchronous
            // models.User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                models.User.findOne({ 'username' :  username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }

                    // check to see if theres already a user with that username
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        //check if password matches
                        if(req.body.Password != req.body.confirmPassword){
                            return done(null, false, req.flash('signupMessage', 'Password does not match.')); // create the loginMe
                        }

                        // if there is no user with that username
                        // create the user
                        var newUser      = new models.User();

                        // set the user's local credentials
                        newUser._id = ObjectId();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.email = req.body.email;

                        // save the user
                        newUser.save(function(err) {
                            if (!err) {
                                req.session.user = newUser;
                            }
                            else {
                                throw err;
                            }
                            console.log('req.session: '+ req.session.user.username);
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            models.User.findOne({ 'username' :  username }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user

                return done(null, user);
            });
        }));