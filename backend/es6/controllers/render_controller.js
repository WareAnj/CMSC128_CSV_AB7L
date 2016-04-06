'use strict';

exports.index = (req, res, next) => {
	res.render('index');
};

exports.randomize_notuser = (req, res, next) =>{
	res.render('randomize_notuser');
};
