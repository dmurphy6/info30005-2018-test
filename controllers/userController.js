var User = require('../models/user');


//template for new logic
// module.exports.functionName = function (req, res) {
// 	// body...
// }


//need to add acutal logic
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
			//Need to figure out how to do alerts
			console.log("Failed");
			res.redirect('/signup');
		}

	});
	
}

module.exports.login = function (req, res) {
	var query = { username: req.body.Username, password: req.body.Password };
	User.find(query,function(err,user){
		if(!err){
			console.log(user);
			if(user.length > 0){
				res.render("profilePage.ejs");
			}
			else{
				res.redirect('/login'); //need to figure out how to do alerts
			}
		}
		else{
			res.status(500);
		}
	});
	
}

module.exports.inviteSession = function (req, res){
	if(!req.session.user){
		return res.status(401).send();
	}

	return res.status(200).send();
}

module.exports.writeLegacySession = function (req, res){
	if(!req.session.user){
		return res.status(401).send();
	}

	return res.status(200).send();
}

	



	