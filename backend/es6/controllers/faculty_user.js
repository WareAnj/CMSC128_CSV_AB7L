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
  db.query(
    [
      'SELECT faculty_user_id FROM login_logs',
      'ORDER BY date_login',
      'DESC LIMIT 1; '
    ].join(' '),
    send_response
  );

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in creating a faculty user', last_query);
          return next(err);
      }

      res.send(result);
  }
};

exports.post_volunteer = (req, res, next) => {

    const data = {
        student_number:         req.body.student_number,
        given_name:             req.body.given_name,
        middle_name:            req.body.middle_name,
        last_name:              req.body.last_name,
        degree:                 req.body.degree,
        classification:         req.body.classification,
        college:                req.body.college,
        section_id:             req.body.section_id
    };

    function start () {
        db.query (
            'SELECT COUNT(*) as n FROM student WHERE student_number = ?;',
            [data.student_number],
            student_existence
        );
    }

    function student_existence (err, result, args, last_query) {
        var string = JSON.stringify(result);
        var count = JSON.parse(string);
        if(err) {
            winston.error('Error in Creating Volunteer', last_query);
            return next(err);
        }

        if(count[0].n == '0') {
            db.query(
                [
                    'INSERT INTO student',
                    '(student_number, given_name, middle_name,',
                    'last_name, degree, classification, college)',
                    'VALUES (?, ?, ?, ?, ?, ?, ?);'
                ].join(' '),
                [
                    data.student_number,
                    data.given_name,
                    data.middle_name,
                    data.last_name,
                    data.degree,
                    data.classification,
                    data.college
                ],
                update_section
            );
        } else {
            db.query (
                update_section
            );
        }

    }

    function update_section () {
        db.query(
            [
                'INSERT INTO student_section',
                '(ss_student_number, ss_section_id)',
                'VALUES (?, ?);'
            ].join(' '),
            [data.student_number, data.section_id],
            send_response
        );
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
                'SELECT s.student_number, s.last_name, s.given_name, ss_section_id',
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

    const data = {
        section_id:             req.body.section_id,
        student_number:         req.body.student_number
    }

    function start () {
        db.query (
            'DELETE from student_section where ss_section_id = ? AND ss_student_number = ?;',
            [data.section_id, data.student_number], send_response
        );
    }


    function send_response (err, result, args, last_query) {
        if (err) {
            winston.error('Error in deleting student', last_query);
            return next(err);
        }

        res.send(result);
    }

    start();
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
                'SELECT * FROM student WHERE student_number = (SELECT student_number FROM temporary_view ORDER BY rand() LIMIT ' + data.limit + ') LIMIT 1;',
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
