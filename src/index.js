import JM from 'jm-core';
import {moduleJson} from './json';
import {moduleMD5} from './md5';
import command from './command';
import utils from './utils';
import yargv from 'yargs';

let jm = new JM()
        .use(moduleJson)
        .use(moduleMD5)
    ;

let shell = function (...args) {
    args.length || (args = ['-h']);
    let commands = jm.commands;

    let argv = yargv(args)
            .usage('Usage: jmsh <command> [options]')
            .alias('v', 'version')
        ;

    for (let cmd of Object.keys(commands)) {
        argv = utils.preDealArgv(jm.modules[cmd], argv);
    }
    argv = argv
        .help('h')
        .alias('h', 'help')
        .argv;

    if(argv.v) {
        var pkg = require('../package.json');
        console.log('%s %s', pkg.name, pkg.version);
        return;
    }

    let cmd = command(...args);
    if (!commands[cmd]) return null;
    return commands[cmd](...args.slice(1));
};

export default shell;
