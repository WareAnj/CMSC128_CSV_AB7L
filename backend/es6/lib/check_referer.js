'use strict';

const status = require(__dirname + '/status');

module.exports = (req, res, next) => {
    // If req.headers.referer is equal to 'undefined', then the API route is accessed directly
    if (typeof req.headers.referer === 'undefined') {
        let response = status.PERMISSION_DENIED;

        return res.status(response.status).send(response.message);
    }

    next();
};
