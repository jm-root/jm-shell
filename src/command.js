import yargv from 'yargs';
import JM from 'jm-core';
let jm = new JM();

let command = function (...args) {
    let argv = yargv(args)
        .demandCommand(1)
        .argv;

    return argv._[0];
};

export default command;
