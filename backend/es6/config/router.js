'use strict';

const $         = require(__dirname + '/../lib/session');
const importer  = require('anytv-node-importer');


module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    // render_controller
    router.get ('/',                                                                        __.render_controller.index);
    router.get ('/randomize_notuser',                                                       __.render_controller.randomize_notuser);
    router.get ('/randomize',                                                               __.render_controller.randomize);

    // faculty_user routes
    router.post('/faculty_user/register/',                                                  __.faculty_user.register);

    // CRUD of volunteers/students
    router.post('/faculty_user/post_volunteer/',                        $('Faculty User'),  __.faculty_user.post_volunteer);
    router.get ('/faculty_user/volunteers',                             $('Faculty User'),  __.faculty_user.get_volunteers);
    router.put ('/faculty_user/volunteer/:user_id/:student_number',     $('Faculty User'),  __.faculty_user.update_volunteer);
    router.del ('/faculty_user/volunteer/',                             $('Faculty User'),  __.faculty_user.delete_volunteer);

    // routes to check the username or employee_id if it is already existing in the database
    router.post('/faculty_user/check_faculty_user_username/',                               __.faculty_user.check_faculty_user_username);
    router.post('/faculty_user/check_faculty_user_employee_id/',                            __.faculty_user.check_faculty_user_employee_id);

    // randomize n students from a course with the specified section
    router.get ('/faculty_user/randomize',                              $('Faculty User'),  __.faculty_user.randomize);

    // authentication routes
    router.post('/authenticate/login/',                                                     __.authenticate.login);
    router.get ('/authenticate/logout',                                 $,                  __.authenticate.logout);


    // authentication for administrator
    router.post('/admin/authenticate_login',                                                __.admin.authenticate_login);
    router.get ('/admin/authenticate_logout',                           $('Administrator'), __.admin.authenticate_logout);

    // route for approving a user
    router.put ('/admin/approve_user/:faculty_user_id',                 $('Administrator'), __.admin.approve_user);

    // login_logs
    router.get ('/admin/login_logs',                                    $('Administrator'), __.admin.get_login_logs);
    router.get ('/admin/login_logs/:faculty_user_id',                   $('Administrator'), __.admin.get_login_logs_by_user);

    // logout_logs
    router.get ('/admin/logout_logs',                                   $('Administrator'), __.admin.get_logout_logs);
    router.get ('/admin/logout_logs/:faculty_user_id',                  $('Administrator'), __.admin.get_logout_logs_by_user);

    // route for CRUD students (integration)
    router.get('/edit',				                                             __.render_controller.edit);

    // Unmatched route
    router.all('*', (req, res, next) => {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};
