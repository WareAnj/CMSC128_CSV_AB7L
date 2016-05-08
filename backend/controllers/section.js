'use strict';

const db        = require(__dirname + '/../lib/mysql');
const status    = require(__dirname + '/../lib/status');
const winston   = require('winston');


// Inserts a new lecture section
exports.post_lecture_section = (req, res, next) => {
    let response;

    const data = {
        faculty_user_id:    req.session.user.id,
        course_code:        req.body.course_code,
        name:               req.body.name
    };


    function start () {
        db.query('CALL INSERT_LECTURE_SECTION(?, ?, ?);',
                [data.faculty_user_id, data.course_code, data.name],
                send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in inserting a lecture section', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }

    start();
};


// Updates a lecture section
exports.update_lecture_section = (req, res, next) => {
    let response;

    const data = {
        course_code:            req.body.course_code,
        section_name:           req.body.section_name,
        new_section_name:       req.body.new_section_name
    };


    function start () {
        db.query('CALL UPDATE_LECTURE_SECTION(?, ?, ?);',
                [data.course_code, data.section_name, data.new_section_name],
                send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in updating a lecture section', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }

    start();
};


// Deletes a lecture section and students under that lecture section
exports.delete_lecture_section = (req, res, next) => {
    let response;

    const data = {
        course_code:            req.query.course_code,
        name:                   req.query.name
    };


    function start () {
        db.query('CALL DELETE_LECTURE_SECTION(?, ?);',
                [data.course_code, data.name],
                send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in deleting a lecture section', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }

    start();
};


/**************** CRUD for sub section ****************/

// Inserts a new sub section
exports.post_sub_section = (req, res, next) => {
    let response;

    const data = {
        course_code:        req.query.course_code,
        name:               req.query.name,
        code:               req.body.code
    };


    function start () {
        db.query('CALL INSERT_SUB_SECTION(?, ?, ?);',
                [data.course_code, data.name, data.code],
                send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in inserting a sub section', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }

    start();
};


// Deletes a sub section and students under that sub section
exports.delete_sub_section = (req, res, next) => {
    let response;

    const data = {
        course_code:            req.query.course_code,
        name:                   req.query.name,
        code:                   req.query.code
    };


    function start () {
        db.query('CALL DELETE_SUB_SECTION(?, ?, ?);',
                [data.course_code, data.name, data.code],
                send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in deleting a sub section', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }

    start();
};
