'use strict';

const file_stream_rotator   = require('file-stream-rotator');


exports.configure_logger = (directory) => {
    const log_directory = directory;

    return file_stream_rotator.getStream({
        date_format: 'MM-DD-YYYY',
        filename: log_directory + '/access-%DATE%.log',
        frequency: 'daily',
        verbose: false
    });
};
