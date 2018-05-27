var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var morgan = require('morgan');
var router = express.Router();


require('./route/router');
require('./models/db');

// required for passport
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true})); // session secret


//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
// app.use(session({ secret: 'shhsecret' }));


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine', 'ejs');
app.use( express.static( "public" ) );
app.use('/',router);


// routes ======================================================================
require('./route/router')(router, passport); // load our routes and pass in our app and fully configured passport

const PORT = process.env.PORT|| 3000;

app.listen(PORT, function(){
	console.log(`Express listening on port ${PORT}`);
	}
);