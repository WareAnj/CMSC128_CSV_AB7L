'use strict';

const config        = require(__dirname + '/config/config');
const util          = require(__dirname + '/helpers/util');
const body_parser   = require('body-parser');
const winston       = require('winston');
const helmet        = require('helmet');
const morgan        = require('morgan');
const compression   = require('compression');
const express       = require('express');
const session       = require('express-session');
const redis_store   = require('connect-redis')(session);
const store         = new redis_store(config.REDIS_DB);
const path          = require('path');


let app;
let handler;


function start () {
    if (handler) {
        handler.close();
    }

    // create express app
    app = express();

    // set config
    config.use(process.env.NODE_ENV);
    app.set('env', config.ENV);

    // configure logger
    winston.cli();
    winston.level = config.LOG_LEVEL || 'silly';


    winston.log('info', 'Starting', config.APP_NAME, 'on', config.ENV, 'environment');

    app.use(session({
        store: store,
        secret: config.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 2     // 2 hours expiration
        }
    }));

    // configure express app
    app.use(helmet());
    app.set('case sensitive routing', true);
    app.set('trust proxy', 1)

    winston.log('verbose', 'Binding 3rd-party middlewares');
    app.use(morgan('combined', {stream: util.configure_logger(config.LOGS_DIR)}));
    app.use(express.static(__dirname + '/../frontend'));
    app.use(require('method-override')());
    app.use(body_parser.urlencoded({extended: false}));
    app.use(body_parser.json());
    app.use(compression());


    winston.log('verbose', 'Binding custom middlewares');
    app.use(require(__dirname + '/config/router')(express.Router()));

    winston.log('info', 'Server listening on port', config.PORT);

    return app.listen(config.PORT, config.IP_ADDRESS);
}

handler = start();

module.exports = {
    app,
    start,
    handler
};
