'use strict';

exports.index = (req, res, next) => {
	res.render('index');
};

exports.randomize_notuser = (req, res, next) =>{
	res.send('randomize_notuser');
};
