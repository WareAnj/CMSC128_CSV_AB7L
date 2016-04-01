'use strict';

module.exports = {

    UNAUTHORIZED: {
        status: 403,
        message: {
            code: 'UNAUTHORIZED',
            context: 'Unauthorized!'
        }
    },

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
    },

    MISSING_SESSION: {
        status: 403,
        message: {
            code: 'MISSING_SESSION',
            context: 'No session found'
        }
    }
};
