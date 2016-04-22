'use strict';

const db        = require(__dirname + '/../lib/mysql');
const winston   = require('winston');

exports.post_course = (req, res, next) => {

  const data = {
      user_id:               req.query.user_id,
      course_code:           req.body.course_code,
      course_title:          req.body.course_title,
      course_description:    req.body.course_description
  };

  function start () {
      db.query([
                  'INSERT INTO course',
                  '(code, title, description, user_id)',
                  'VALUES (?, ?, ?, ?);'
               ].join(' '),
               [data.course_code, data.course_title,
                data.course_description, data.user_id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in creating a course', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.put_course = (req, res, next) => {

  const data = {
      user_id:                   req.query.user_id,
      id:                        req.query.id,
      new_course_code:           req.body.course_code,
      new_course_title:          req.body.course_title,
      new_course_description:    req.body.course_description
  };

  function start () {
      db.query([
                  'UPDATE course',
                  'SET code = ?, title = ?, description = ?',
                  'WHERE id = ? and user_id = ?;'
               ].join(' '),
               [data.new_course_code, data.new_course_title,
                data.new_course_description, data.id,
                data.user_id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in updating a course', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.get_course = (req, res, next) => {
  const data = {
      user_id:                   req.query.user_id,
  };

  function start () {
      db.query([
                  'SELECT * from course',
                  'WHERE user_id = ?;'
               ].join(' '),
               [data.user_id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in retriving a course', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};

exports.delete_course = (req, res, next) => {
  const data = {
      user_id:                   req.query.user_id,
      id:                        req.query.id
  };

  function start () {
      db.query([
                  'DELETE from course',
                  'WHERE user_id = ? and id = ?;'
               ].join(' '),
               [data.user_id, data.id],
                send_response);
  }

  function send_response (err, result, args, last_query) {
      if (err) {
          winston.error('Error in retriving a course', last_query);
          return next(err);
      }

      res.send(result);
  }

  start();

};
