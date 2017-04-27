import JM from 'jm-core';
import {moduleJson} from './json';
import command from './command';
import yargv from 'yargs';

let jm = new JM()
        .use(moduleJson)
    ;
let logger = jm.logger;

let shell = function(...args) {
    args.length || (args = ['-h']);
    let commands = jm.commands;

    let argv = yargv(args)
        .usage('Usage: $0 <command> [options]')
        ;
    for(let cmd of Object.keys(commands)){
        argv = argv.command(cmd, jm.modules[cmd].intro || '');
    }
    argv = argv
        .help('h')
        .alias('h', 'help')
        .argv;

    let cmd = command(...args);
    if(!commands[cmd]) return null;
    return commands[cmd](...args.slice(1));
};

export default shell;
