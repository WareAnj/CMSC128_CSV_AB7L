'use strict';

const db        = require(__dirname + '/../lib/mysql');
const status    = require(__dirname + '/../lib/status');
const winston   = require('winston');


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

        db.query('CALL LOGIN(?, ?)', [data.username, data.password],
                    send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in logging in', last_query);
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
            role:               'Faculty User',
            id:                 result[0][0].id,
            username:           result[0][0].username,
            classification:     result[0][0].classification,
            given_name:         result[0][0].given_name,
            middle_name:        result[0][0].middle_name,
            last_name:          result[0][0].last_name
        };

        req.session.user = user;

        res.send(result[0][0]);

        let user_id = result[0][0].id;

        db.query('CALL INSERT_LOGIN_LOGS(?)', [user_id], (err, result, args, last_query) => {
            if (err) {
                winston.error('Error in creating login logs', last_query);
                return next(err);
            }
        });
    }


    start();
};


exports.logout = (req, res, next) => {
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
