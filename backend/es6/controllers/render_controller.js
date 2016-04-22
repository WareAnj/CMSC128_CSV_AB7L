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

exports.randomizer_notuser = (req, res, next) =>{
	res.render('randomizer_notuser');
};

exports.home = (req, res, next) =>{
	res.render('home');
};

exports.admin = (req, res, next) => {
	res.render('admin');
};

exports.admin_approve = (req, res, next) => {
	res.render('admin_approve');
};

exports.class = (req, res, next) =>{
	res.render('class');
};

exports.error_404 = (req, res, next) =>{
	res.render('error_404');
};