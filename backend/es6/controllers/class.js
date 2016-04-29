'use strict';

const db        = require(__dirname + '/../lib/mysql');
const winston   = require('winston');

exports.get_lecture_class = (req, res, next) => {
  const data = {
      course_id:                   req.query.course_id,
  };

  function start () {
      db.query([
                  'SELECT * from section s, student_section ss, student st',
                  'WHERE s.course_id = ? and s.id = ss.section_id and ss.student_id = st.id;'
               ].join(' '),
               [data.course_id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in students a course', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};
