import JM from 'jm-core';
import {moduleJson} from './json';
import command from './command';
import utils from './utils';
import yargv from 'yargs';

let jm = new JM()
        .use(moduleJson)
    ;

let shell = function (...args) {
    args.length || (args = ['-h']);
    let commands = jm.commands;

    let argv = yargv(args)
            .usage('Usage: jmsh <command> [options]')
        ;
    for (let cmd of Object.keys(commands)) {
        argv = utils.preDealArgv(jm.modules[cmd], argv);
    }
    argv = argv
        .help('h')
        .alias('h', 'help')
        .argv;

    let cmd = command(...args);
    if (!commands[cmd]) return null;
    return commands[cmd](...args.slice(1));
};

export default shell;
