var express = require('express');
var users = require('../models/db');
var router = express.Router();
var visits = 0;


router.get('/', function (req, res) {
	res.render('landing.ejs');
})


module.exports = router;