'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jmCore = require('jm-core');

var _jmCore2 = _interopRequireDefault(_jmCore);

var _json = require('./json');

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var jm = new _jmCore2.default().use(_json.moduleJson);

var shell = function shell() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args.length || (args = ['-h']);
    var commands = jm.commands;

    var argv = (0, _yargs2.default)(args).usage('Usage: jmsh <command> [options]').alias('v', 'version');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(commands)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _cmd = _step.value;

            argv = _utils2.default.preDealArgv(jm.modules[_cmd], argv);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    argv = argv.help('h').alias('h', 'help').argv;

    if (argv.v) {
        var pkg = require('../package.json');
        console.log('%s %s', pkg.name, pkg.version);
        return;
    }

    var cmd = _command2.default.apply(undefined, _toConsumableArray(args));
    if (!commands[cmd]) return null;
    return commands[cmd].apply(commands, _toConsumableArray(args.slice(1)));
};

exports.default = shell;
module.exports = exports['default'];