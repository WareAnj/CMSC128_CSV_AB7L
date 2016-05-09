'use strict';

const db        = require(__dirname + '/../lib/mysql');
const winston   = require('winston');

exports.post_lecture = (req, res, next) => {
  const data = {
      course_id:             req.query.course_id,
      section_name:          req.body.section_name,
  };

  function start () {
      db.query([
                  'INSERT INTO section',
                  '(course_id, name)',
                  'VALUES (?, ?);'
               ].join(' '),
               [data.course_id, data.section_name],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in creating a lecture section', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();
};

exports.get_lecture = (req, res, next) => {
  const data = {
      course_id:                   req.query.course_id
  };

  function start () {
      db.query([
                  'SELECT DISTINCT name from course c, section s',
                  'WHERE s.course_id = ? and c.id = s.course_id'
               ].join(' '),
               [data.course_id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in retriving a lecture sections', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.delete_course = (req, res, next) => {
  // const data = {
  //     id:                        req.query.id
  // };
  //
  // function start () {
  //     db.query([
  //                 'DELETE from faculty_user_course',
  //                 'WHERE course_id = ?;'
  //              ].join(' '),
  //              [data.id],
  //               send_response);
  // }
  //
  // function send_response (err, result, args, last_query) {
  //     if (err) {
  //         winston.error('Error in retriving a course', last_query);
  //         return next(err);
  //     }
  //
  //     db.query([
  //                 'DELETE from course',
  //                 'WHERE id = ?;'
  //              ].join(' '),
  //              [data.id]);
  //
  //     res.send(result);
  // }
  //
  // start();

};

exports.get_lecture_class_list = (req, res, next) => {
  const data = {
      course_id:                   req.query.course_id,
      name:                        req.query.name
  };

  function start () {
      db.query([
                  'SELECT * from section s, student_section ss, student st',
                  'WHERE s.course_id = ? and s.id = ss.section_id',
                  'and ss.student_id = st.id and name = ?;'
               ].join(' '),
               [data.course_id, data.name],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in getting students of a lecture', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.get_lecture_student = (req, res, next) => {
  const data = {
      id:                   req.query.id
  };

  function start () {
      db.query([
                  'SELECT * FROM student',
                  'WHERE id = ? LIMIT 1;'
               ].join(' '),
               [data.id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in getting specific student', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.get_lab_sections = (req, res, next) => {
  const data = {
      course_id:           req.query.course_id,
      name:                req.query.name
  };

  function start () {
      db.query([
                  'SELECT s.code, s.id FROM course c, section s',
                  'WHERE s.course_id = ? and c.id = s.course_id and name = ?;'
               ].join(' '),
               [data.course_id, data.name],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in getting lab sections', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.get_lab_limits = (req, res, next) => {
  const data = {
      lab_section:           req.query.lab_section,
      name:                req.query.name
  };

  function start () {
      db.query([
                  'SELECT COUNT(student_id) as count from student_section',
                  'WHERE section_id=(select id from section where name = ? and code = ?);'
               ].join(' '),
               [data.name, data.lab_section],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in getting lab sections', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.get_student_per_lab_section = (req, res, next) => {
  const data = {
      course_code:           req.query.course_code,
      name:                  req.query.name,
      section_code:          req.query.section_code
  };

  function start () {
      db.query([
                  'SELECT * FROM student st, student_section ss',
                  'WHERE ss.section_id = (SELECT id FROM section WHERE course_id = ',
                  '(SELECT id FROM course WHERE code = ?) and',
                  'name = ? and code = ?) and st.id = ss.student_id;'
               ].join(' '),
               [data.course_code, data.name, data.section_code],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in getting students per lab section', last_query);
          return next(err);
      }
      res.send(result);
  }

  start();

};

exports.delete_student_in_lab_section = (req, res, next) => {
  const data = {
      id:                  req.query.id
  };

  function start () {
      db.query('DELETE FROM student_section WHERE student_id = ?;'
               ,
               [data.id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in deleting students in section', last_query);
          return next(err);
      }

      db.query('DELETE FROM student WHERE id = ?;'
               ,
               [data.id],
                send);
  }

  function send (err, result, args, last_query){
    if (err) {
        winston.error('Error in deleting students in students', last_query);
        return next(err);
    }
    res.send(result);
  }

  start();
};

exports.update_student_in_lab_section = (req, res, next) => {
  const data = {
      id:                  req.query.id,
      given_name:          req.body.given_name,
      middle_name:         req.body.middle_name,
      last_name:           req.body.last_name,
      degree:              req.body.degree,
      classification:      req.body.classification,
      college:             req.body.college
  };
  function start () {

      db.query(['UPDATE student SET given_name = ?, middle_name = ?, last_name = ?,',
                'degree = ?, classification = ?, college = ? WHERE id = ?;'
                ].join(' '),
               [data.given_name, data.middle_name, data.last_name,
                data.degree, data.classification, data.college, data.id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in updating student in section', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();
};

exports.check_section_name = (req, res, next) => {
  const data = {
      course_id:                  req.query.course_id,
      section_name:               req.body.section_name
  }

  db.query(
    [
      'SELECT distinct name FROM course c, section s',
      'WHERE s.course_id = ? and c.id = s.course_id and name = ?;'
    ].join(' '),
	   [data.course_id, data.section_name],
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
