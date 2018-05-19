var express = require('express');

var app = express();
var router = require('./route/router');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./models/db');
var cookieParser = require('cookie-parser');
app.use(cookieParser());





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static( "public" ));

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());




app.use('/', router);
app.use('/landing', router);
app.use('/aboutus',router);
app.use('/blog',router);
app.use('/blogAccessFromLanding',router);
app.use('/imagegallery',router);
app.use('/inviteContributer',router);
app.use('/login',router);
app.use('/profilePage',router);
app.use('/user/:user',router);
app.use('/signup',router);
app.use('/tqCard',router);
app.use('/writeLegacy',router);
app.use('/createUser',router);
app.use('/aboutUser',router);
app.use('/nextInfo',router);
app.use('/info',router);
app.use('/final',router);
app.use('/lastInfo',router);
app.use('/alldone',router);
app.use('/addImage',router);

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("App is running on port " + port);
});


