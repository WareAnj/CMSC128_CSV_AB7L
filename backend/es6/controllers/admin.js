'use strict';

const db        = require(__dirname + '/../lib/mysql');
const status    = require(__dirname + '/../lib/status');
const winston   = require('winston');


exports.authenticate_login = (req, res, next) => {
    let response;

    const data = {
        username:       req.body.username,
        password:       req.body.password
    };


    function start () {

        if (req.session && req.session.user) {
            response = status.ALREADY_LOGGED_IN;

            return res.status(response.status).send(response.message);
        }

        db.query('CALL ADMIN_LOGIN(?, ?);', [data.username, data.password],
                send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in logging in as administrator', last_query);
            return next(err);
        }

        if (!result[0].length) {
            response = status.INV_USERNAME;

            return res.status(response.status).send(response.message);
        }

        let is_password_valid = result[0][0].is_password_valid;

        if (!is_password_valid) {
            response = status.INV_PASSWORD;

            return res.status(response.status).send(response.message);
        }

        let user = {
            role:               'Administrator',
            username:           result[0][0].username
        };

        req.session.user = user;

        res.send(result[0][0]);
    }

    start();
};


exports.authenticate_logout = (req, res, next) => {
    let response;

    function start() {

        if (!req.session.user) {
            response = status.MISSING_SESSION;

            return res.status(response.status).send(response.message);
        }

        req.session.destroy();

        res.send({message: 'Successfully logged out'});
    }

    start();
};


exports.approve_user = (req, res, next) => {
    let response;

    const data = {
        faculty_user_id:        req.params.faculty_user_id
    };


    function start() {
        db.query('CALL APPROVE_USER(?);', [data.faculty_user_id], send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in approving a user', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }


    start();
};


exports.get_login_logs = (req, res, next) => {

    function start () {
        db.query('CALL GET_LOGIN_LOGS();', send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in retrieving all the login_logs', last_query);
            return next(err);
        }

        res.send(result[0]);
    }

    start();
};


exports.get_logout_logs = (req, res, next) => {

    function start () {
        db.query('CALL GET_LOGOUT_LOGS();', send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in retrieving all the logout_logs', last_query);
            return next(err);
        }

        res.send(result[0]);
    }

    start();
};
