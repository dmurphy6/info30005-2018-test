    var models = require('../models/user');
var ObjectId = require('mongodb').ObjectID;

//post req

module.exports.firstInformationLogin = function (req, res){
        if (req.session && req.user) {
            models.User.findOne({ username: req.user.username }, function(err, user) {
                if (user) {
                    req.user = user;
                }
                console.log(user._id);
                var newMemorial      = new models.Memorial();
                newMemorial._id = ObjectId();
                newMemorial.author = user._id;
                console.log('BOOM'+ newMemorial.author);
                newMemorial.personName = req.body.Name;
                newMemorial.age = req.body.Age;
                newMemorial.birthday = req.body.Birthdate;
                newMemorial.gender = req.body.gender;

               user.save(function (err) {
                   if (err) throw err;
                   console.log('creating memorial');
                   newMemorial.save(function(err, memorial) {
                       if (err) return res.send(err);
                       user.yourMemorial = memorial;
                       user.save(function(err) {
                           if (err) throw err;
                               res.redirect("nextInformationLogin");
                           });
                       });
                   });
                });
        } else {
            req.flash('firstInfoLoginMessage', 'Error has occurred.');
            res.redirect('firstInformationLogin');
        }
    };

module.exports.secondInformationLogin = function (req, res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            models.Memorial.findOne({ author: user._id }).populate('author').exec(function (err, memorial) {
                if (err) throw(err);
                memorial.about = req.body.aboutYourself;
                memorial.aboutFamily = req.body.aboutYourFamily;
                memorial.highestEducation = req.body.highestEducation;
                memorial.achievementInCareer = req.body.achievement;
                memorial.motto = req.body.motto;

                memorial.save(function(err) {
                    if (err) throw err;
                });

                res.redirect('finalInformationLogin');
            });
        })
    } else {
        req.flash('secondInfoLoginMessage', 'Error has occurred.');
        res.redirect('nextInformationLogin');
    }
};

module.exports.finalInformationLogin = function (req, res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            models.Memorial.findOne({ author: user._id }).populate('author').exec(function (err, memorial) {
                if (err) throw(err);
                memorial.lovedOne = req.body.belovedOne;
                memorial.story = req.body.story;
                memorial.save(function(err) {
                    if (err) throw err;
                });

               res.redirect('profile?id=' + memorial._id);
            });
        })
    } else {
        req.flash('secondInfoLoginMessage', 'Error has occurred.');
        res.redirect('nextInformationLogin');
    }
};

module.exports.firstInformation = function (req, res){
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            // finishing processing the middleware and run the route
            user.personName = req.body.Name;
            user.age = req.body.Age;
            user.birthday = req.body.Birthdate;
            user.gender = req.body.gender;

            user.save(function(err) {
                if (err) throw err;
                res.redirect("nextInformation");
            });
        });
    } else {
        req.flash('firstInfoMessage', 'Error has occurred.');
        res.redirect('firstInformation');
    }
};

module.exports.secondInformation = function (req, res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            // finishing processing the middleware and run the route
            user.about = req.body.aboutYourself;
            user.aboutFamily = req.body.aboutYourFamily;
            user.highestEducation = req.body.highestEducation;
            user.achievementInCareer = req.body.achievement;
            user.motto = req.body.motto;

            user.save(function(err) {
                if (err) throw err;
                res.redirect("finalInformation");
            });
        });
    } else {
        req.flash('secondInfoMessage', 'Error has occurred.');
        res.redirect('nextInformation');
    }
};

module.exports.finalInformation = function (req, res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            // finishing processing the middleware and run the route
            user.lovedOne = req.body.belovedOne;
            user.story = req.body.story;

            user.save(function(err) {
                if (err) throw err;
                res.redirect("profile");
            });
        });
    } else {
        req.flash('finalInfoMessage', 'Error has occurred.');
        res.redirect('finalInformation');
    }
};

module.exports.changePassword = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({username: req.user.username}, function (err, user) {
            if (user) {
                req.user = user;
            }
            // finishing processing the middleware and run the route
            if (!user.validPassword(req.body.oldPassword)) {
                req.flash('changePasswordInfoMessage', 'Wrong old password.');
                return res.redirect('changePassword?id=' + req.query.id);
            }

            if (req.body.newPassword != req.body.confirmNewPassword) {
                req.flash('changePasswordInfoMessage', 'New password does not match.');
                return res.redirect('changePassword?id=' + req.query.id);
            }

            user.password = user.generateHash(req.body.newPassword);

            user.save(function (err) {
                if (err) throw err;
                req.flash('createMemorialInfoMessage', 'Password has been changed.');
                return res.redirect("createMemorial?id=" + req.query.id);
            })
        });
    } else {
        req.flash('changePasswordInfoMessage', 'Error has occurred.');
        return res.redirect('changePassword?id=' + req.query.id);
    }
};

module.exports.saveLegacy = function(req,res){
    if (req.session && req.user) {
        models.Memorial.findOne({ _id: req.body.profileID }, function(err, memorial) {
            if (memorial) {
                req.memorial = memorial;
            }
            // finishing processing the middleware and run the route
            memorial.legacy = req.body.legacyText;
            memorial.privacy = req.body.allowcheckbox;

            memorial.save(function(err) {
                if (err) throw err;
                res.redirect("readLegacy?id="+ req.body.profileID);
            });
        });
    } else {
        req.flash('writeLegacyInfoMessage', 'Error has occurred.');
        res.redirect('writeLegacy?id=' + req.body.profileID);
    }
};

module.exports.addImage = function(req,res){
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            // finishing processing the middleware and run the route
            user.profileImg = fs.readFileSync(req.file.pic.path)
            user.story = req.body.story;

            user.save(function(err) {
                if (err) throw err;
                res.redirect("profile");
            });
        });
    }};



//get req
module.exports.getFirstInformationLogin = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            res.render('firstInformationLogin', { message: req.flash('firstInfoLoginMessage') });
        })
    } else {
        req.flash('landingInfoMessage', 'Error has occurred.');
        res.redirect('landing');
    }
};

module.exports.getNextInformationLogin = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            models.Memorial.findOne({ author: user._id }).populate('author').exec(function (err, memorial) {
                if (err) throw(err);
                res.render('nextInformationLogin', { message: req.flash('secondInfoLoginMessage') });
            });
        })
    } else {
        req.flash('landingInfoMessage', 'Error has occurred.');
        res.redirect('landing');
    }
};

module.exports.getFinalInformationLogin = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {

            if (user) {
                req.user = user;
            }
            res.render('finalInformationLogin', {message: req.flash('finalInfoLoginMessage')});
        })
    } else {
        req.flash('landingInfoMessage', 'Error has occurred.');
        res.redirect('landing');
    }
};

module.exports.getFirstInformation = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            res.render('firstInformation', {
                message: req.flash('firstInfoMessage'),
                personName:req.user.personName,
                age:req.user.age,
                birthday: req.user.birthday
            });
        })
    } else {
        req.flash('settingsInfoMessage', 'Error has occurred.');
        res.redirect('settings');
    }
};

module.exports.getNextInformation = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            res.render('nextInformation', {
                message: req.flash('nextInfoMessage'),
                about: req.user.about,
                aboutFamily: req.user.aboutFamily,
                highestEducation: req.user.highestEducation,
                achievementInCareer: req.user.achievementInCareer,
                motto: req.user.motto
            });
        })
    } else {
        req.flash('settingsInfoMessage', 'Error has occurred.');
        res.redirect('settings');
    }
};

module.exports.getFinalInformation = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            res.render('finalInformation',
                {message: req.flash('finalInfoMessage'),
                    lovedOne: req.user.lovedOne,
                    story: req.user.story
                });
        })
    } else {
        req.flash('settingsInfoMessage', 'Error has occurred.');
        res.redirect('settings');
    }
};

module.exports.getSignUp = function(req,res) {
    res.render('signup', { message: req.flash('signupMessage') });
};

module.exports.getSettings = function(req,res) {
    if (req.session && req.user) {
        models.User.findOne({_id: req.query.id}, function (err, user) {
            if (user) {
                res.render('settings',
                    {message: req.flash('settingsInfoMessage'),
                UserID: req.query.id});
            }
        })
    }

    else {
        req.flash('profileInfoMessage', 'Error has occurred.');
        res.redirect('profile?id='+ req.query.id);
    }
};

module.exports.getProfilePage = function(req, res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            models.Memorial.findOne({_id: req.query.id}, function(err, memorial){
                console.log(req.query.id);
                if(memorial.author.equals(user._id))
                {
                    res.render('profile',
                    {message: req.flash('profileInfoMessage'),
                        id: memorial._id,
                        personName: memorial.personName,
                        about : memorial.about,
                        aboutFamily: memorial.aboutFamily,
                        highestEducation: memorial.highestEducation,
                        achievementInCareer: memorial.achievementInCareer,
                        lovedOne: memorial.lovedOne,
                        story: memorial.story,
                        age: memorial.age,
                        gender:memorial.gender,
                        birthday: memorial.birthday.toDateString(),
                        motto: memorial.motto
                    });
                }

                else {
                    res.redirect('/viewProfile?id=' + req.query.id);
                }
            })
        })

    } else {
        req.flash('createMemorialInfoMessage', 'Error has occurred.');
        res.redirect('createMemorial');
    }
};

module.exports.getViewProfile = function(req, res) {
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            models.Memorial.findOne({_id: req.query.viewProfileID}, function(err, memorial){
                    res.render('viewProfile', {message: req.flash('changePasswordInfoMessage'),
                    memorial : memorial,
                    profileID : req.query.id});
                })
            })
    } else {
        req.flash('createMemorialInfoMessage', 'Error has occurred.');
        res.redirect('createMemorial');
    }
};


module.exports.getChangePassword = function(req, res) {
    if (req.session && req.user) {
        models.User.findOne({username: req.user.username}, function (err, user) {
            if (user) {
                req.user = user;
            }
            res.render('changePassword', {message: req.flash('changePasswordInfoMessage'),
            UserID: req.query.id})
        })
    }
    else {
        req.flash('settingsInfoMessage', 'Error has occurred.');
        res.redirect('settings');
    }
}

module.exports.getReadLegacy = function(req, res){
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }

            models.Memorial.findOne({_id: req.query.id}, function(err, memorial) {
                if(memorial){
                    res.render('readLegacy',
                        {message: req.flash('readLegacyInfoMessage'),
                            legacy: memorial.legacy,
                            userID: user._id,
                            profileID: req.query.id
                        });
                }
            })

        })

    } else {
        req.flash('profileInfoMessage', 'Error has occurred.');
        res.redirect('profile?id='+ req.query.id);
    }
};

module.exports.getWriteLegacy = function(req,res){
    if (req.session && req.user) {
        models.User.findOne({ username: req.user.username }, function(err, user) {
            if (user) {
                req.user = user;
            }
            models.Memorial.findOne({_id: req.query.id}, function(err, memorial) {
                if(memorial){
                    res.render('writeLegacy',
                        {message: req.flash('writeLegacyInfoMessage'),
                            legacy: memorial.legacy,
                            userID: user._id,
                            profileID: req.query.id
                        });
                }
            })
        })

    } else {
        req.flash('readLegacyInfoMessage', 'Error has occurred.');
        res.redirect('readLegacy?id='+ req.query.id);
    }
}

module.exports.getBlog = function(req, res){
    if (req.session && req.user) {
        models.Memorial.find({}, function (err, memorials) {
            if (err) throw err;
            res.render('blog',
                {
                    message: req.flash('blogInfoMessage'),
                    memorials: memorials,
                    userID: req.query.id
                })
        })
    }
    else{
        req.flash('profileInfoMessage', 'Error has occurred.');
        res.redirect('profile?id='+ req.query.id);
    }
};

module.exports.getBlogFromLanding =function (req,res){
    models.Memorial.find({}, function (err, memorials) {
        if (err) throw err;
        res.render('blogAccessFromLanding',
            {
                message: req.flash('blogAccessFromLoggingInfoMessage'),
                memorials: memorials
            })
    })
};

module.exports.addImage = function (req, res) {
    console.log(req.session.username);
    if (req.session && req.session.user) {
        models.User.findOne({ username: req.session.username }, function(err, user) {

            if (user) {
                req.session.user = user;
                req.session.username = req.session.username;
            }
            // finishing processing the middleware and run the route
            console.log(req.body.urlentered);
            user.images.push(req.body.urlentered);



            user.save(function(err) {
                if (err) throw err;

                res.redirect("/imageGallery");
            });
        });
    } else {
        //Need to figure out how to do alerts
        console.log("Failed");
        res.redirect('/profilePage');
    }
}

module.exports.getImages = function (req, res) {
    console.log(req.session.username);
    if (req.session && req.session.user) {
        models.User.findOne({ username: req.session.username }, function(err, user) {

            if (user) {
                req.session.user = user;
                req.session.username = req.session.username;
            }
            // finishing processing the middleware and run the route
            console.log(user['images']);
            res.render('imageGallery.ejs', {images: user['images']});



        });
    } else {
        //Need to figure out how to do alerts
        console.log("Failed");
        res.redirect('/profilePage');
    }
}

module.exports.getCreateMemorial = function (req, res) {

    if (req.session && req.user) {
        models.User.findOne({username: req.user.username}).populate('yourMemorial').populate('contributedMemorial').exec(function (err, user) {
            var yourMemorialName;
            var arrayContributedMemorialName = [];
            if (user) {
                req.user = user;
                if(user.yourMemorial)
                {
                    yourMemorialName = user.yourMemorial
                }

                if(user.contributedMemorial)
                {
                    for(var i = 0; i < user.contributedMemorial.length; i++)
                    {
                        arrayContributedMemorialName.push(user.contributedMemorial[i]);
                    }
                }

                console.log(yourMemorialName);
                console.log(arrayContributedMemorialName);
            }
            //
            // for (var i = 0; len = user.contributedMemorial.length; i++)
            // {
            //     models.Memorial.findOne({_id: user.yourMemorial})
            // }
             res.render('createMemorial',
                 {message: req.flash('createMemorialInfoMessage'),
                     userID : user._id,
                     yourMemorial: yourMemorialName,
                     contributedMemorials: arrayContributedMemorialName});
        })

    } else {
        req.flash('landingInfoMessage', 'Error has occurred.');
        res.redirect('landing');
    }
};