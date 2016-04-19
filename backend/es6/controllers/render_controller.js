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

exports.logs = (req, res, next) =>{
	res.render('logs');
};

exports.settings_randomize = (req, res, next) =>{
	res.render('settings_randomize');
};

exports.home = (req, res, next) =>{
	res.render('home');
};