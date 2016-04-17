'use strict';

exports.index = (req, res, next) => {
	res.render('index');
};

exports.randomize = (req, res, next) => {
	res.render('randomizer');
};

exports.edit = (req, res, next) => {
	res.render('edit');
};

exports.randomize_notuser = (req, res, next) =>{
	res.render('randomize_notuser');
};

exports.randomizer_notuser = (req, res, next) =>{
	res.render('randomizer_notuser');
};
