var express = require('express');

var app = express();
var router = require('./route/router');

app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

app.use('/', router);
const PORT = process.env.PORT|| 3000;

app.listen(PORT, function(){
	console.log(`Express listening on port ${PORT}`);
	}
	);