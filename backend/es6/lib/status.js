'use strict';

module.exports = {

    UNAUTHORIZED: {
        status: 403,
        message: {
            code: 'UNAUTHORIZED',
            context: 'Unauthorized!'
        }
    },

    PERMISSION_DENIED: {
        status: 403,
        message: {
            code: 'PERMISSION_DENIED',
            context: 'Permission denied!'
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
    },

    USER_NOT_APPROVED: {
        status: 403,
        message: {
            code: 'USER_NOT_APPROVED',
            context: 'User is not yet approved by the administrator'
        }
    }
};
