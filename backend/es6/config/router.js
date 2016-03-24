'use strict';

const importer = require('anytv-node-importer');


module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.post('/faculty_user/register/', 				__.faculty_user.register);
    router.post('/authenticate/login/',                 __.authenticate.login);
    router.get ('/authenticate/logout',                 __.authenticate.logout);


    router.all('*', (req, res, next) => {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};
