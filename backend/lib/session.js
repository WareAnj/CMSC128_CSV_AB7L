'use strict';

const status        = require(__dirname + '/../lib/status');


module.exports = (req, res, next) => {

    if (typeof res === 'undefined') {
        let role = req;

        return (req, res, next) => {
            let response;

            // If there is no active session, and this middleware function is called,
            // therefore, the current user is unauthorized
            if (!req.session.user) {
                response = status.UNAUTHORIZED;

                return res.status(response.status).send(response.message);
            }

            if (role === req.session.user.role ||
                    (req.session.user.role === 'Administrator' && role === 'Administrator'))
            {
                return next();
            }

            // If the role specified does not match, notify that the user is unauthorized
            response = status.UNAUTHORIZED;

            return res.status(response.status).send(response.message);
        };
    }

    if (req.session && req.session.user) {
        return next();
    }

    let response = status.MISSING_SESSION;

    return res.status(response.status).send(response.message);
};
