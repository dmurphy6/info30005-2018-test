var User = require('../models/user');


//template for new logic
// module.exports.functionName = function (req, res) {
// 	// body...
// }


//need to add acutal logic
module.exports.createUser =function (req, res) {

	var query = { username: req.body.Username, password: req.body.Password };
	User.find(query,function(err,user){
		if(!err){
			if(user.length > 0){
				res.render("login.ejs"); //alert user that account exists
			}
			else{
				if(req.body.Password === req.body.confirmPassword){
					var newUser = User({
						username: req.body.Username,
						password: req.body.Password,
						email: req.body.email
			
					});

					// save the user
					newUser.save(function(err) {
						if (!err){
							console.log('User created!');
							// req.session.user = user;
							// console.log(req.session.user);
							req.session.user = user;
							req.session.username = req.body.Username;
							req.session.password = req.body.Password;
							console.log('req.session: '+req.session.username);
							res.redirect('/aboutUser');
						}
						else{
							//Need to figure out how to do alerts
							console.log("Failed");
							res.redirect('/signup');

						}

					});
				}
				else{
					//Need to figure out how to do alerts
					console.log("Failed");
					res.redirect('/signup');
				}
			}
		}
		else{
			res.status(500);
		}
	});
}

module.exports.login = function (req, res) {
	var query = { username: req.body.Username, password: req.body.Password };
	User.find(query,function(err,user){
		if(!err){
	
			if(user.length > 0){
				req.session.user = user;
				res.render("profile.ejs");
			}
			else{
				console.log("not found");
				res.redirect('/login'); //need to figure out how to do alerts
			}
		}
		else{
			res.status(500);
		}
	});
	
}

module.exports.aboutUser = function (req, res) {
	console.log(req.session.username);
	if (req.session && req.session.user) {
	User.findOne({ username: req.session.username }, function(err, user) {

      if (user) {
      	console.log("d");
      	req.session.user = user;
		req.session.username = req.session.username;
        console.log("worked")
      }
      // finishing processing the middleware and run the route
      user.name = req.body.Name;
      user.age = req.body.age;
      user.birthday = req.body.birth;
      user.gender = req.body.gender;

       user.save(function(err) {
    	if (err) throw err;

    	res.redirect("/info");
  		});
    });
  } else {
    //Need to figure out how to do alerts
		console.log("Failed");
		res.redirect('/signup');
  }
}

module.exports.finalInfo = function (req, res) {
	console.log(req.session.username);
	if (req.session && req.session.user) {
	User.findOne({ username: req.session.username }, function(err, user) {

      if (user) {
      	req.session.user = user;
		req.session.username = req.session.username;
      }
      // finishing processing the middleware and run the route
      user.about = req.body.aboutYourself;
  	  user.afamily = req.body.aboutYourFamily;
  	  user.highestEducation = req.body.highestEd;
  	  user.achivementInCareer = req.body.achievement;
  	  user.motto = req.body.motto;

       user.save(function(err) {
    	if (err) throw err;

    	res.redirect("/lastInfo");
  		});
    });
  } else {
    //Need to figure out how to do alerts
		console.log("Failed");
		res.redirect('/signup');
  }
}

module.exports.finaladditions = function (req, res) {
	console.log(req.session.username);
	if (req.session && req.session.user) {
	User.findOne({ username: req.session.username }, function(err, user) {

      if (user) {
      	req.session.user = user;
		req.session.username = req.session.username;
      }
      // finishing processing the middleware and run the route
      user.lovedOne = req.body.belovedOneName;
  	  user.story = req.body.paragraph_text;
  

       user.save(function(err) {
    	if (err) throw err;

    	res.redirect("/profilePage");
  		});
    });
  } else {
    //Need to figure out how to do alerts
		console.log("Failed");
		res.redirect('/signup');
  }
}

module.exports.getUser = function (req, res) {
	if (req.session && req.session.user) {
	User.findOne({ username: req.session.username }, function(err, user) {

      if (user) {
      	req.session.user = user;
		req.session.username = req.session.username;
      }
      // finishing processing the middleware and run the route
      console.log(user['motto']);
      res.render('profile.ejs', {aboutMe: user['about'], age: user['age'], motto: user['motto'], birth: user['birthday']});
  });
}
else {
    //Need to figure out how to do alerts
		console.log("Failed");
		res.redirect('/login');
  }
}



	