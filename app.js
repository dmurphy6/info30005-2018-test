var express = require('express');
var path = require("path");
var app = express();
//var router = require('./route/router');

//app.set('view engine', 'html');
//app.use( express.static( "public" ) );
app.use(express.static(path.join(__dirname+'/mypages')));


app.get('/*', function (req, res) {
    res.sendFile('landing.html', {root: path.join(__dirname+'/mypages')});
});

//app.use('/', router);
const PORT = process.env.PORT|| 3000;

app.listen(PORT, function(){
	console.log(`Express listening on port ${PORT}`);
	}
	);

