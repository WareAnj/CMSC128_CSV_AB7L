'use strict';

module.exports = {
    ENV: 'production',
    LOG_LEVEL: 'info',

    DB: {
        host: '127.9.231.2',
        user: 'adminWvZt41M',
        password: '87LQIr_PbY7u',
        database: 'reginyzr'
    },

    REDIS_DB: {
        host: process.env.OPENSHIFT_REDIS_HOST,
        port: process.env.OPENSHIFT_REDIS_PORT,
        pass: process.env.REDIS_PASSWORD
    }
};
