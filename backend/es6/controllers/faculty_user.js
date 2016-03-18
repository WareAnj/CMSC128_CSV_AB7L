'use strict';

const db        = require(__dirname + '/../lib/mysql');
const winston   = require('winston');


exports.register = (req, res, next) => {

    const data = {
        faculty_user_username:          req.body.faculty_user_username,
        faculty_user_password:          req.body.faculty_user_password,
        faculty_user_employee_id:       req.body.faculty_user_employee_id,
        faculty_user_classification:    req.body.faculty_user_classification,
        faculty_user_given_name:        req.body.faculty_user_given_name,
        faculty_user_middle_name:       req.body.faculty_user_middle_name,
        faculty_user_last_name:         req.body.faculty_user_last_name
    };


    function start () {
        db.query('INSERT INTO faculty_user(faculty_user_username, faculty_user_password,faculty_user_employee_id, faculty_user_classification, faculty_user_given_name, faculty_user_middle_name, faculty_user_last_name, faculty_user_is_approved) VALUES (?, SHA1(?), ?, ?, ?, ?, ?, false);',
                [data.faculty_user_username, data.faculty_user_password, data.faculty_user_employee_id, data.faculty_user_classification, data.faculty_user_given_name, data.faculty_user_middle_name, data.faculty_user_last_name],
                send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in creating faculty users', last_query);
            return next(err);
        }

        res.send(result);
    }


    start();
};
