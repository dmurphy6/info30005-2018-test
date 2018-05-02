var User = require('../models/user');

module.exports.createUser =function (req, res) {
	//using scheme
	var newUser = User({
		username: req.body.Username,
		password: req.body.Password
	});

	// save the user
	newUser.save(function(err) {
		if (!err){
			console.log('User created!');
			res.render('login.ejs');
		}
		else{
			console.log("Failed");
			res.redirect('/signup');
		}

	});
	
}

module.exports.loadAllUsers = function(argument) {
	// body...
}