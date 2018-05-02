var MongoClient = require('mongoose');
var url = "mongodb://admin:admin@ds111420.mlab.com:11420/thebigdreamers";

MongoClient.connect(url, function(err, db) {
  if (!err) {
  	console.log("Database connected");
  }
  else{
  	console.log("Database NOT connected");
  }
});

