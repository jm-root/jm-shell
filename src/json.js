import fse from 'fs-extra';
import yargv from 'yargs';
import command from './command';
import utils from './utils';
import JM from 'jm-core';
let jm = new JM();
let logger = jm.logger;

let commands = [
    {
        name: 'set',
        intro: '- set value by name',
        examples: [
            {
                example: 'jmsh json set ./temp/test.json name jeff',
                intro: '- set a string value',
            },
            {
                example: 'jmsh json set ./temp/test.json port 8080',
                intro: '- set a number value',
            },
            {
                example: 'jmsh json set ./temp/test.json fullname {"last":"jeff", "first":"yu"}',
                intro: '- set a json value',
            },
        ],
    },
    {
        name: 'get',
        intro: '- get value by name',
        example: 'jmsh json get ./temp/test.json name',
    },
];

let readJsonSync = function (fileName, opts) {
    return fse.readJsonSync(fileName, opts);
};

let writeJsonSync = function (fileName, obj, opts, cb) {
    fse.writeJsonSync(fileName, obj, opts, cb);
};

/**
 * Handler
 */
class Handle {

    /**
     * constructor
     * @param {Object} [opts]
     */
    constructor (opts = {}) {
    }

    /**
     * set value
     * @param {String} file
     * @param {String} name
     * @param {String} value
     */
    set (file, name, value) {
        logger.debug('set %s %s %s', file, name, value);
        try {
            let _value = JSON.parse(value);
            value = _value;
        } catch (e) {
        }
        let o = {};
        if (fse.existsSync(file)) o = readJsonSync(file);
        o || (o = {});
        let _o = o;
        let v = name.split('.');
        for (let i = 0; i < v.length - 1; i++) {
            let k = v[i];
            _o[k] || (_o[k] = {});
            _o = _o[k];
        }
        _o[v[v.length - 1]] = value;
        writeJsonSync(file, o);
    }

    /**
     * get value
     * @param {String} file
     * @param {String} name
     * @return {Object}
     */
    get (file, name) {
        let o = {};
        if (fse.existsSync(file)) o = readJsonSync(file);
        let value = eval('o.' + name);
        logger.debug('get %s %s %j', file, name, value);
        return value;
    }

}

let handle = new Handle();
let json = function (...args) {
    args.length || (args = ['-h']);

    let argv = yargv(args)
            .usage('Usage: $0 json  <command> <file> <name> <value> [options]')
        ;
    for (let cmd of commands) {
        argv = utils.preDealArgv(cmd, argv);
    }
    argv = argv
        .help('h')
        .alias('h', 'help')
        .argv;

    let cmd = command(...args);
    if (!handle[cmd]) return null;
    return handle[cmd](...args.slice(1));
};

let moduleJson = ($, name = 'json') => {
    $.commands || ($.commands = {});
    $.commands[name] = json;

    return {
        name: name,
        intro: '- edit a json file',
        unuse: function ($) {
            delete $.commands[name];
        },
    };
};

export default json;
export {json, moduleJson};
