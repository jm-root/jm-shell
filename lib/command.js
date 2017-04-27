'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _jmCore = require('jm-core');

var _jmCore2 = _interopRequireDefault(_jmCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jm = new _jmCore2.default();

var command = function command() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var argv = (0, _yargs2.default)(args).demandCommand(1).argv;

    return argv._[0];
};

exports.default = command;
module.exports = exports['default'];