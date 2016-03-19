'use strict';

module.exports = {
    INV_USERNAME: {
        status: 404,
        message: {
            code: 'INV_USERNAME',
            context: 'Invalid username'
        }
    },

    INV_PASSWORD: {
        status: 403,
        message: {
            code: 'INV_PASSWORD',
            context: 'Invalid password'
        }
    },

    ALREADY_LOGGED_IN: {
        status: 403,
        message: {
            code: 'ALREADY_LOGGED_IN',
            context: 'Already logged in'
        }
    }
};
