'use strict';

const db        = require(__dirname + '/../lib/mysql');
const status    = require(__dirname + '/../lib/status');
const winston   = require('winston');


// Login as a faculty user
exports.login = (req, res, next) => {
    let response;

    const data = {
        username:   req.body.username,
        password:   req.body.password
    };


    function start () {

        if (req.session && req.session.user) {
            response = status.ALREADY_LOGGED_IN;

            return res.status(response.status).send(response.message);
        }

        db.query('CALL LOGIN(?, ?);', [data.username, data.password],
                    send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in logging in', last_query);
            return next(err);
        }

        // If the username is invalid
        if (!result[0].length) {
            response = status.INV_USERNAME;

            return res.status(response.status).send(response.message);
        }

        let is_password_valid = result[0][0].is_password_valid;

        // If the password is invalid
        if (!is_password_valid) {
            response = status.INV_PASSWORD;

            return res.status(response.status).send(response.message);
        }

        let is_approved = result[0][0].is_approved;

        // If the user is not yet approved
        if (!is_approved) {
            response = status.USER_NOT_APPROVED;

            return res.status(response.status).send(response.message);
        }

        let user = {
            role:               'Faculty User',
            id:                 result[0][0].id,
            username:           result[0][0].username,
            employee_id:        result[0][0].employee_id,
            classification:     result[0][0].classification,
            given_name:         result[0][0].given_name,
            middle_name:        result[0][0].middle_name,
            last_name:          result[0][0].last_name,
            design_setting:     result[0][0].design_setting,
            is_approved:        result[0][0].is_approved,
            date_approved:      result[0][0].date_approved
        };

        req.session.user = user;
        res.send(result[0][0]);

        let user_id = result[0][0].id;

        db.query('CALL INSERT_LOGIN_LOGS(?);', [user_id], (err, result, args, last_query) => {
            if (err) {
                winston.error('Error in creating login logs', last_query);
                return next(err);
            }
        });
    }


    start();
};


// Logout as a faculty user
exports.logout = (req, res, next) => {
    let response;

    function start() {

        if (!req.session.user) {
            response = status.MISSING_SESSION;

            return res.status(response.status).send(response.message);
        }

        if (req.session.user.role !== 'Faculty User') {
            response = status.UNAUTHORIZED;

            return res.status(response.status).send(response.message);
        }

        let user_id = req.session.user.id;

        req.session.destroy();

        res.send({message: 'Successfully logged out'});

        db.query('CALL INSERT_LOGOUT_LOGS(?);', [user_id], (err, result, args, last_query) => {
            if (err) {
                winston.error('Error in creating logout logs', last_query);
                return next(err);
            }
        });
    }

    start();
};
