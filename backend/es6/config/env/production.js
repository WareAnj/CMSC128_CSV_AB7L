'use strict';

module.exports = {
    ENV: 'production',
    LOG_LEVEL: 'info',
    APP_URL: 'http://reginyzr.herokuapps.com',

    DB: {
        host: 'reginyzr',
        user: 'root',
        password: 'user',
        database: 'cmsc128ab7l'
    },

    REDIS_DB: {
        host: 'localhost',
        port: 6379
    }
};
