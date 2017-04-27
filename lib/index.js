'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jmCore = require('jm-core');

var _jmCore2 = _interopRequireDefault(_jmCore);

var _json = require('./json');

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var jm = new _jmCore2.default().use(_json.moduleJson);
var logger = jm.logger;

var shell = function shell() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args.length || (args = process.argv.slice(2));
    var commands = jm.commands;
    var cmd = _command2.default.apply(undefined, _toConsumableArray(args));
    if (!commands[cmd]) return null;
    return commands[cmd].apply(commands, _toConsumableArray(args.slice(1)));
};

exports.default = shell;
module.exports = exports['default'];