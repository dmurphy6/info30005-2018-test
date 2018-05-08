var express = require('express');

var app = express();
var router = require('./route/router');
var bodyParser = require('body-parser');
var session = require('client-sessions');


require('./models/db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));


app.use('/', router);
app.use('/landing', router);
app.use('/aboutus',router);
app.use('/blog',router);
app.use('/blogAccessFromLanding',router);
app.use('/imagegallery',router);
app.use('/inviteContributer',router);
app.use('/login',router);
app.use('/profilePage',router);
app.use('/signup',router);
app.use('/tqCard',router);
app.use('/writeLegacy',router);
app.use('/createUser',router);
//haha fix it


var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("App is running on port " + port);
});



// var express = require('express');
// var path = require("path");
// var app = express();
// //var router = require('./route/router');

// //app.set('view engine', 'html');
// //app.use( express.static( "public" ) );
// // var MongoClient = require('mongodb').MongoClient;
// // var url = "mongodb://admin:admin@ds111420.mlab.com:11420/thebigdreamers";

// // MongoClient.connect(url, function(err, db) {
// //   if (err) throw err;
// //   console.log("Database connected");
// //   db.close();
// // });

// app.use(express.static(path.join(__dirname+'/site')));


// app.get('/*', function (req, res) {
//     res.sendFile('landing.html', {root: path.join(__dirname+'/site')});
// });

// //app.use('/', router);
// const PORT = process.env.PORT|| 3000;

// app.listen(PORT, function(){
// 	console.log(`Express listening on port ${PORT}`);
// 	}
// 	);

