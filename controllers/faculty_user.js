'use strict';

const mysql   = require('anytv-node-mysql');
const winston = require('winston');

/**
 * @api {post} /register/ Post user information to database
 * @apiName PostFacultyUser
 * @apiGroup Faculty User
 *
 *
 * @apiSuccess {String} faculty_user_id Faculty User's unique ID
 * @apiSucces {String} faculty_user_password Faculty User's password encrypted
 * @apiSuccess {String} date_created Time when the user was created
 */

 exports.post_faculty_user = (req, res, next) => {

     function start () {
         mysql.use('my_db')
         mysql.use('my_db')
              .query(
                   'INSERT INTO faculty_user(faculty_user_username, faculty_user_password,faculty_user_employee_id, faculty_user_classification, faculty_user_given_name, faculty_user_middle_name, faculty_user_last_name, faculty_user_is_approved) VALUES (?, ?, ?, ?, ?, ?, ?, false);',
                   [req.body.faculty_user_username, req.body.faculty_user_password, req.body.faculty_user_employee_id, req.body.faculty_user_classification, req.body.faculty_user_given_name, req.body.faculty_user_middle_name, req.body.faculty_user_last_name],
                   send_response
               )
               .end();
     }

     function send_response (err, result, args, last_query) {
         if (err) {
             winston.error('Error in creating faculty users', last_query);
             return next(err);
         } else{
             res.item(result)
                .send();
         }
     }

     start();
 };
