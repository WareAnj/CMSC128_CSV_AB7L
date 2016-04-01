'use strict';

const importer = require('anytv-node-importer');


module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.get('/', __.render_controller.index);

    router.post('/faculty_user/register/', 				            __.faculty_user.register);


    router.post('/faculty_user/post_volunteer/'                     __.faculty_user.post_volunteer);
    router.get ('/faculty_user/volunteers/:user_id'                 __.faculty_user.get_volunteers);
    router.put ('/faculty_user/volunteer/:user_id/:student_number') __.faculty_user.update_volunteers);
    router.del ('/faculty_user/volunteer/'                          __.faculty_user.delete_volunteer);


    router.get ('/faculty_user/randomize',                          __.faculty_user.randomize);

    router.post('/authenticate/login/',                             __.authenticate.login);
    router.get ('/authenticate/logout',                             __.authenticate.logout);

    router.all('*', (req, res, next) => {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};
