let utils = {
    preDealArgv: function (command, argv) {
        argv = argv.command(command.name, command.intro || '');
        if (command.example) argv = argv.example(command.example);
        if (command.examples) {
            for (let example of command.examples) {
                argv = argv.example(example.example, example.intro);
            }
        }
        return argv;
    },
};

export default utils;
