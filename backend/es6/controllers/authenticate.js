'use strict';

const db        = require(__dirname + '/../lib/mysql');
const status    = require(__dirname + '/../lib/status');
const winston   = require('winston');


exports.login = (req, res, next) => {
    let response;

    const data = {
        faculty_user_username:   req.body.faculty_user_username,
        faculty_user_password:   req.body.faculty_user_password
    };


    function start () {

        if (req.session && req.session.user) {
            response = status.ALREADY_LOGGED_IN;

            return res.status(response.status).send(response.message);
        }

        db.query('CALL LOGIN(?, ?)', [data.faculty_user_username, data.faculty_user_password],
                    send_response);
    };


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
            role:                           'Faculty User',
            faculty_user_id:                result[0][0].faculty_user_id,
            faculty_user_username:          result[0][0].faculty_user_username,
            faculty_user_classification:    result[0][0].faculty_user_classification,
            faculty_user_given_name:        result[0][0].faculty_user_given_name,
            faculty_user_middle_name:       result[0][0].faculty_user_middle_name,
            faculty_user_last_name:         result[0][0].faculty_user_last_name,
        }

        req.session.user = user;

        res.send(result);

        let user_id = result[0][0].faculty_user_id;

        db.query('CALL INSERT_LOGIN_LOGS(?)', [user_id], (err, result, args, last_query) => {
            if (err) {
                winston.error('Error in creating login logs', last_query);
                return next(err);
            }

            console.log(result);
        });
    }


    start();
};
