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
        db.query('CALL REGISTER(?, ?, ?, ?, ?, ?, ?)',
                 [data.faculty_user_username, data.faculty_user_password,
                  data.faculty_user_employee_id, data.faculty_user_classification,
                  data.faculty_user_given_name, data.faculty_user_middle_name,
                  data.faculty_user_last_name, data.faculty_user_username],
                  send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in creating faculty users', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }


    start();
};

exports.post_volunteer = (req, res, next) => {
    
    const data = {
        student_number:         req.body.student_number,
        student_given_name:     req.body.student_given_name,
        student_middle_name:    req.body.student_middle_name,
        student_last_name:      req.body.student_last_name,
        student_degree:         req.body.student_degree,
        student_classification: req.body.student_classification,
        student_college:        req.body.student_college,

        section_name:           req.body.section_name,
        section_course_code:    req.body.section_course_code
    };

    function start () {
        db.query(
            [
                'INSERT INTO student',
                '(student_number, student_given_name, student_middle_name,',
                'student_last_name, student_degree, student_classification, student_college,)',
                'VALUES (?, ?, ?, ?, ?, ?);'
            ].join(' '),
            [
                data.student_number,
                data.student_given_name,
                data.student_middle_name,
                data.student_last_name,
                data.student_degree,
                data.student_classification,
                data.student_college
            ],
            update_section
        );
    }

    function update_section () {
        db.query(
            [
                'INSERT INTO student_section',
                '(ss_student_number, ss_section_id)',
                'VALUES (?, ?);'
            ].join(' '),
            [data.student_number, get_section_id],
            send_response
        );
    }

    function  get_section_id () { //di ko po sure ito pero more or less dapat ganto sya
        var sect_id;
        sect_id = db.query(
            [
                'SELECT section_id FROM section WHERE section_name = ? AND section_course_code = ? LIMIT 1;'
            ],
            [data.section_name, data.section_course_code]
        );
        return sect_id;
    }
        
    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in Creating Volunteer', last_query);
            return next(err);
        }
        res.send(result);
    }

    start();
};

exports.get_volunteers = (req, res, next) => {

    const data = {
        user_id:               req.query.user_id,
        course_code:           req.query.course_code,
        section_id:            req.query.section_id
    };

    function start() {
        db.query (
            [
                'SELECT s.student_number, s.student_last_name, s.student_given_name, ss_section_id',
                'FROM faculty_user_course_section uc, student s, student_section ss WHERE',
                'uc.uc_user_id = ? and uc.uc_course_code = ? and uc.uc_section_id = ?',
                'and ss.ss_section_id = uc.uc_section_id and',
                'ss.ss_student_number = s.student_number;'
            ].join(' '),
            [data.user_id, data.course_code, data.section_id],
            send_response
        );
    }

    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in getting students', last_query);
            return next(err);
        }
        res.send(result);
    }

    start();
};

exports.update_volunteer = (req, res, next) => {

};

exports.delete_volunteer = (req, res, next) => {

};

exports.randomize = (req, res, next) => {

    const data = {
        user_id:                req.query.user_id,
        course_code:            req.query.course_code,
        section_name:           req.query.section_name,
        limit:                  req.query.limit
    };

    function start () {
        db.query (
            'DROP VIEW IF EXISTS temporary_view;',
            create_view
        );
    }

    function create_view (err, result, args, last_query) {
        if (err) {
            winston.error('Error in dropping view', last_query);
            return next(err);
        }

        db.query (
            [
                'CREATE VIEW temporary_view AS SELECT',
                's.student_number, uc.uc_user_id, uc.uc_course_code,',
                'uc.uc_section_id, sect.section_name FROM student s,',
                'faculty_user_course_section uc, student_section ss,',
                'section sect WHERE uc.uc_user_id = ? and uc.uc_course_code = ?',
                'and sect.section_name like ? and ',
                'ss.ss_section_id = uc.uc_section_id',
                'and ss.ss_section_id = sect.section_id and',
                's.student_number = ss.ss_student_number;'
            ].join(' '),
            [data.user_id, data.course_code, data.section_name + '%'],
            randomize
        );
    }

    function randomize (err, result, args, last_query) {
        if (err) {
            winston.error('Error in creating view', last_query);
            return next(err);
        }
        db.query(
                'SELECT * FROM temporary_view ORDER BY rand() LIMIT '+ data.limit + ';',
                send_response
            );
    }

    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in randomizing students', last_query);
            return next(err);
        }
        res.send(result);
    }

    start();
};
