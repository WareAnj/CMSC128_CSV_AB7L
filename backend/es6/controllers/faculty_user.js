'use strict';

const db        = require(__dirname + '/../lib/mysql');
const winston   = require('winston');


exports.register = (req, res, next) => {

    const data = {
        username:          req.body.username,
        password:          req.body.password,
        employee_id:       req.body.employee_id,
        classification:    req.body.classification,
        given_name:        req.body.given_name,
        middle_name:       req.body.middle_name,
        last_name:         req.body.last_name
    };


    function start () {
        db.query('CALL REGISTER(?, ?, ?, ?, ?, ?, ?);',
                 [data.username, data.password,
                  data.employee_id, data.classification,
                  data.given_name, data.middle_name,
                  data.last_name],
                  send_response);
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in creating a faculty user', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }


    start();
};

exports.update_gname = (req, res, next) => {
	const given_name = req.body.given_name;
	const uname = req.body.username;
	db.query(
		[
			'UPDATE faculty_user SET given_name=?',
			'WHERE username=?;'
		].join(' '),[given_name, uname],responder);
	
	function responder(err, result){
		if(err){
			winston.error('Error in updating Faculty User Given Name', last_query);
			res.send(false);
            return next(err);
        }
        res.send(true);
	}
}

exports.check_faculty_user_username = (req, res, next) => {
  const username = req.body.username;

  db.query(
    [
      'SELECT username FROM faculty_user',
      'WHERE username = ?; '
    ].join(' '),
	   [username],
     responder
  );

	function responder(err, result){
		if (err) winston.error('Error! ', err);
		const rows = result.length;
		if (rows === 1) {
			res.status(200).send(true);
		} else {
			res.status(200).send(false);
		}
	}
};

exports.check_faculty_user_employee_id = (req, res, next) => {
  const employee_id = req.body.employee_id;

  db.query(
    [
      'SELECT employee_id FROM faculty_user',
      'WHERE employee_id = ?; '
    ].join(' '),
	   [employee_id],
     responder
  );

	function responder(err, result){
		if (err) winston.error('Error! ', err);
		const rows = result.length;
		if (rows === 1) {
			res.status(200).send(true);
		} else {
			res.status(200).send(false);
		}
	}
};

exports.get_logged_in_faculty_user_id = (req, res, next) => {
  console.log(req.session.user);
    res.send(req.session.user);
};

exports.post_volunteer = (req, res, next) => {

    const data = {
        user_id:                req.body.user_id,
        course_code:            req.body.course_code,
        section_name:           req.body.section_name,
        section_code:           req.body.section_code,
        student_number:         req.body.student_number,
        given_name:             req.body.given_name,
        middle_name:            req.body.middle_name,
        last_name:              req.body.last_name,
        degree:                 req.body.degree,
        classification:         req.body.classification,
        college:                req.body.college
    };

    function start () {
        db.query (
            'CALL POST_VOLUNTEER(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                data.user_id, data.course_code, data.section_name,
                data.section_code, data.student_number, data.last_name,
                data.given_name, data.middle_name, data.classification,
                data.college, data.degree
            ],
            send_response
        );
    }

    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in Creating Volunteer', last_query);
            return next(err);
        }
        res.send(result[0][0]);
    }

    start();
};

exports.get_volunteers = (req, res, next) => {

    const data = {
        user_id:               req.query.user_id,
        course_code:           req.query.course_code,
        section_name:          req.query.section_name
    };

    function start() {
        db.query (
            [
                'SELECT s.student_number, s.last_name, s.given_name, sect.code',
                'FROM faculty_user f, course c, faculty_user_course fc,',
                'student s, section sect, student_section ss',
                'WHERE f.id = fc.faculty_user_id and c.id = fc.course_id',
                'and sect.course_id = c.id and sect.id = ss.section_id and s.id = ss.student_id',
                'and f.id = ? and c.code = ? and sect.name = ?;'
            ].join(' '),
            [data.user_id, data.course_code, data.section_name],
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
    const data = {
        user_id:                req.body.user_id,                   //*
        course_code:            req.body.course_code,//CMSC 128     //*
        section_name:           req.body.section_name,              //*
        old_section_code:       req.body.old_section_code,//Used to get old section_id
        section_code:           req.body.section_code,//Used to replace old value of section_id on student_section
        old_student_number:     req.body.old_student_number,//Needed this because old_SN will be used to get student_id     //*
        student_number:         req.body.student_number,//This var will be used to replace old value of SN
        given_name:             req.body.given_name,
        middle_name:            req.body.middle_name,
        last_name:              req.body.last_name,
        degree:                 req.body.degree,
        classification:         req.body.classification,
        college:                req.body.college
    };

    function start () {
        db.query (
            'CALL UPDATE_VOLUNTEER(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                data.user_id, data.course_code, data.section_name,
                data.old_section_code, data.section_code, data.old_student_number,
                data.student_number, data.last_name, data.given_name,
                data.middle_name, data.classification,
                data.college, data.degree
            ],
            send_response
        );
    }

    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in Creating Volunteer', last_query);
            return next(err);
        }
        res.send(result[0][0]);
    }

    start();
};

exports.delete_volunteer = (req, res, next) => {

    const data = {
        user_id:                req.body.user_id,
        course_code:            req.body.course_code,
        section_name:           req.body.section_name,
        section_code:           req.body.section_code,
        student_number:         req.body.student_number
    }

    function start () {
        db.query (
            'CALL DELETE_VOLUNTEER(?, ?, ?, ?, ?)',
            [data.user_id, data.course_code, data.section_name, data.section_code, data.student_number],
            send_response
        );
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in deleting student', last_query);
            return next(err);
        }

        res.send(result[0][0]);
    }

    start();
};

exports.randomize = (req, res, next) => {

    const data = {
        user_id:                req.body.user_id,
        course_code:            req.body.course_code,
        section_name:           req.body.section_name,
        section_code:           req.body.section_code,
        limit:                  req.body.limit
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
        if (typeof data.section_code === 'undefined') {
            db.query (
                [
                    'CREATE VIEW temporary_view AS',
                    'SELECT stud.id, stud.student_number, stud.last_name, stud.given_name, stud.middle_name, stud.frequency',
                    'FROM faculty_user u, course c, faculty_user_course uc, student stud, section sect, student_section ss',
                    'where u.id = uc.faculty_user_id and c.id = uc.course_id and sect.course_id = c.id',
                    'and sect.id = ss.section_id and stud.id = ss.student_id',
                    'and u.id = ? and c.code = ? and sect.name = ?;'
                ].join(' '),
                [data.user_id, data.course_code, data.section_name],
                randomize
            );
        }
        else {
            db.query (
                [
                    'CREATE VIEW temporary_view AS',
                    'SELECT stud.id, stud.student_number, stud.last_name, stud.given_name, stud.middle_name, stud.frequency',
                    'FROM faculty_user u, course c, faculty_user_course uc, student stud, section sect, student_section ss',
                    'where u.id = uc.faculty_user_id and c.id = uc.course_id and sect.course_id = c.id',
                    'and sect.id = ss.section_id and stud.id = ss.student_id',
                    'and u.id = ? and c.code = ? and sect.name = ? and sect.code = ?;'
                ].join(' '),
                [data.user_id, data.course_code, data.section_name, data.section_code],
                randomize
            );
        }
    }

    function randomize (err, result, args, last_query) {
        if (err) {
            winston.error('Error in creating view', last_query);
            return next(err);
        }
        if(typeof data.limit === 'undefined') {
            db.query(
                    'SELECT * FROM temporary_view WHERE frequency = (SELECT MIN(frequency) from temporary_view) ORDER BY rand() LIMIT 1;',
                    [parseInt(data.limit)],
                    send_response
                );
        } else {
            db.query(
                    'SELECT * FROM temporary_view WHERE frequency = (SELECT MIN(frequency) from temporary_view) ORDER BY rand() LIMIT ?;',
                    [parseInt(data.limit)],
                    send_response
                );
        }
    }

    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in randomizing students', last_query);
            return next(err);
        }

        for (var i = 0; i < result.length; i++) {
            var id = result[i].id;
            var frequency = result[i].frequency;
            db.query (
                'UPDATE student SET frequency = ? WHERE id = ?',
                [parseInt(frequency) + 1, id]
            )
        }

        res.send(result);
    }

    start();
};

exports.cheat_mode = (req, res, next) => {

	const data = {
		student_number:			req.body.student_number,
		user_id:				req.body.user_id,
		course_code:			req.body.course_code,
		section_name:			req.body.section_name
	};

	function start () {

		db.query(
			'CALL CHEAT_MODE(?, ?, ?, ?)',
			[data.student_number, data.user_id, data.course_code, data.section_name],
			send_response
		);
	}

	function send_response (err, result, args, last_query) {
		if (err) {
			winston.error('Error in updating frequency', last_query);
			return next(err);
		}

		res.send(result[0][0]);
	}

	start();
};
