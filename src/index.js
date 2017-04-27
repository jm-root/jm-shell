import JM from 'jm-core';
import {moduleJson} from './json';
import command from './command';

//
// let argv = Argv
//     .usage('Usage: $0 <command> [options]')
//     .command('count', 'Count the lines in a file')
//     .example('$0 count -f foo.js', 'count the lines in the given file')
//     .alias('f', 'file')
//     .nargs('f', 1)
//     .describe('f', 'Load a file')
//     .demandOption(['f'])
//     .help('h')
//     .alias('h', 'help')
//     .epilog('copyright 2015')
//     .argv;

let jm = new JM()
        .use(moduleJson)
    ;
let logger = jm.logger;

let shell = function(...args) {
    args.length || (args = process.argv.slice(2));
    let commands = jm.commands;
    let cmd = command(...args);
    if(!commands[cmd]) return null;
    return commands[cmd](...args.slice(1));
};

export default shell;
