'use strict';

exports.index = (req, res, next) => {
	res.render('index');
};

exports.randomize = (req, res, next) => {
	res.render('randomizer');
};

exports.randomize_notuser = (req, res, next) =>{
	res.render('randomize_notuser');
};
