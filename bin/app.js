#!/usr/bin/env node

'use strict';
var colors = require('colors'),
    os = require('os'),
    fs = require('fs'),
    path = require('path'),
    argv = require('yargs')
        .alias('f', 'file')
        .alias('d', 'debug')
        .argv;

module.exports = start_app();

function start_app() {
    return require('../lib')();
};

function stop_app() {
    console.log('jm-shell stopped.'.red);
    process.exit();
};

process.on('SIGINT', function () {
    stop_app();
});

process.on('SIGTERM', function () {
    stop_app();
});

process.on('uncaughtException', function (err) {
    console.error('Caught exception: ' + err.stack);
});
