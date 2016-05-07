'use strict';

const $         = require(__dirname + '/../lib/session');
const importer  = require('anytv-node-importer');


module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    // faculty_user routes
    router.post('/faculty_user/register',                                                   __.faculty_user.register);
    router.get ('/faculty_user/get_user',                                                   __.faculty_user.get_logged_in_faculty_user_id);
    router.post('/faculty_user/update_name/',                           $('Faculty User'),  __.faculty_user.update_name);
    router.post('/faculty_user/update_password/',                       $('Faculty User'),  __.faculty_user.update_password);
    router.post('/faculty_user/update_profile/',                        $('Faculty User'),  __.faculty_user.update_profile);
    router.post('/faculty_user/update_classification/',                 $('Faculty User'),  __.faculty_user.update_classification);
    router.post('/faculty_user/update_design',                          $('Faculty User'),  __.faculty_user.update_design);

    // check course if existing
    router.post('/course/check_course_code',                            $('Faculty User'),  __.course.check_course_code);

    // course routes
    router.post('/course/post_course',                                  $('Faculty User'),  __.course.post_course);
    router.get ('/course/get_course',                                   $('Faculty User'),  __.course.get_course);
    router.put ('/course/put_course',                                   $('Faculty User'),  __.course.put_course);
    router.del ('/course/delete_course',                                $('Faculty User'),  __.course.delete_course);

    // lecture routes
    router.get ('/course/lecture/get_lecture',                          $('Faculty User'),  __.lecture.get_lecture);
    router.get ('/course/lecture/get_class_list',                       $('Faculty User'),  __.lecture.get_lecture_class_list);
    router.get ('/course/lecture/get_student',                          $('Faculty User'),  __.lecture.get_lecture_student);

    // lab routes
    router.get ('/course/lecture/get_lab_sections',                     $('Faculty User'),  __.lecture.get_lab_sections);

    // student routes
    router.get ('/course/lecture/get_student_per_lab_section',          $('Faculty User'),  __.lecture.get_student_per_lab_section);

    // CRUD of volunteers/students
    router.post('/faculty_user/post_volunteer',                         $('Faculty User'),  __.faculty_user.post_volunteer);
    router.get ('/faculty_user/volunteers',                             $('Faculty User'),  __.faculty_user.get_volunteers);
    router.put ('/faculty_user/update_volunteer',                       $('Faculty User'),  __.faculty_user.update_volunteer);
    router.del ('/faculty_user/delete_volunteer',                       $('Faculty User'),  __.faculty_user.delete_volunteer);

    // CRUD for lecture section
    router.post('/section/post_lecture_section',                        $('Faculty User'),  __.section.post_lecture_section);
    router.put ('/section/update_lecture_section',                      $('Faculty User'),  __.section.update_lecture_section);
    router.del ('/section/delete_lecture_section',                      $('Faculty User'),  __.section.delete_lecture_section);

    // CRUD for sub section
    router.post('/section/post_sub_section',                            $('Faculty User'),  __.section.post_sub_section);
    router.del ('/section/delete_sub_section',                          $('Faculty User'),  __.section.delete_sub_section);


    // routes to check the username or employee_id if it is already existing in the database
    router.post('/faculty_user/check_faculty_user_username',                                __.faculty_user.check_faculty_user_username);
    router.post('/faculty_user/check_faculty_user_employee_id',                             __.faculty_user.check_faculty_user_employee_id);

    // randomize n students from a course with the specified section
    router.post('/faculty_user/randomize',	                            $('Faculty User'),  __.faculty_user.randomize);

	//cheat mode update the frequency of a student
    router.post('/faculty_user/cheat_mode',								$('Faculty User'),  __.faculty_user.cheat_mode);

    // authentication routes
    router.post('/authenticate/login',                                                      __.authenticate.login);
    router.get ('/authenticate/logout',                                 $,                  __.authenticate.logout);


    // authentication for administrator
    router.post('/admin/authenticate_login',                                                __.admin.authenticate_login);
    router.get ('/admin/authenticate_logout',                           $('Administrator'), __.admin.authenticate_logout);

    // route for getting all pending users
    router.get ('/admin/get_pending_users',                             $('Administrator'), __.admin.get_pending_users);

    //route for getting all approved users
    router.get ('/admin/get_approved_users',                            $('Administrator'), __.admin.get_approved_users);

    // route for approving a user
    router.put ('/admin/approve_user/:faculty_user_id',                 $('Administrator'), __.admin.approve_user);

    // login_logs
    router.get ('/admin/login_logs',                                    $('Administrator'), __.admin.get_login_logs);
    router.get ('/admin/login_logs/:faculty_user_id',                   $('Administrator'), __.admin.get_login_logs_by_user);

    // logout_logs
    router.get ('/admin/logout_logs',                                   $('Administrator'), __.admin.get_logout_logs);
    router.get ('/admin/logout_logs/:faculty_user_id',                  $('Administrator'), __.admin.get_logout_logs_by_user);


    // Unmatched route
    router.all ('*', (req, res, next) => {
        res.status(404).send({message: 'Lost route. Nothing to do here'});
    });

    return router;
};
