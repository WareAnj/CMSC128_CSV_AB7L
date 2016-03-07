'use strict';

const importer = require('anytv-node-importer');



module.exports = (router) => {
    const __ = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.get('/user/:id', __.user.get_user)
          .post('/register/', __.faculty_user.post_faculty_user);

    router.all('*', (req, res) => {
        res.status(404)
            .send({message: 'Nothing to do here.'});
    });

    return router;
};
