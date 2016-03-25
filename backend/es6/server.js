'use strict';

const config        = require(__dirname + '/config/config');
const body_parser   = require('body-parser');
const winston       = require('winston');
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

    // crude implementation of joining paths for discovery
    app.use(express.static(path.join(__dirname, '../../frontend')));
    app.use(express.static(path.join(__dirname, '../../frontend/assets')));
    app.use(express.static(path.join(__dirname, '../../frontend/public')));

    // view engines
    app.set('views', path.join(__dirname, '../../frontend/views'));
    app.engine('html', require('ejs')
        .renderFile);
    app.set('view engine', 'html');

    // set config
    config.use(process.env.NODE_ENV);
    app.set('env', config.ENV);

    // configure logger
    winston.cli();
    winston.level = config.LOG_LEVEL || 'silly';

    // configure mysql
    /*mysql.set_logger(winston)
        .add('cmsc128ab7l', config.DB);*/


    winston.log('info', 'Starting', config.APP_NAME, 'on', config.ENV, 'environment');

    app.use(session({
        store: store,
        secret: config.COOKIE_SECRET,
        resave: false,
        //rolling: true,
        saveUninitialized: false,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 2     // 2 hours expiration
            //domain: config.COOKIE_DOMAIN
        }
    }));

    // configure express app
    app.set('case sensitive routing', true);
    app.set('x-powered-by', false);

    winston.log('verbose', 'Binding 3rd-party middlewares');
    //app.use(require('morgan')('combined', {stream: util.get_log_stream(config.LOGS_DIR)}));
    //app.use(express.static(config.ASSETS_DIR));
    app.use(require('method-override')());
    app.use(body_parser.urlencoded({extended: false}));
    app.use(body_parser.json());
    //app.use(require('compression')());


    winston.log('verbose', 'Binding custom middlewares');
    //app.use(require('anytv-node-cors')(config.CORS));
    //app.use(require(__dirname + '/lib/res_extended')());
    app.use(require(__dirname + '/config/router')(express.Router()));
    //app.use(require('anytv-node-error-handler')(winston));

    winston.log('info', 'Server listening on port', config.PORT);

    return app.listen(config.PORT);
}

handler = start();

module.exports = {
    app,
    start,
    handler
};
