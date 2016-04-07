'use strict';

exports.index = (req, res, next) => {
	res.render('index');
};

exports.randomizer = (req, res, next) => {
	res.render('results');
};
