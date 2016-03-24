'use strict';

const importer = require('anytv-node-importer');


module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.post('/faculty_user/register/', 				__.faculty_user.register);

    router.get('/faculty_user/randomize/:user_id/:course_code/:section_name/:limit', __.faculty_user.randomize);


    router.all('*', (req, res) => {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};
