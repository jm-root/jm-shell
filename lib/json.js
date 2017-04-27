'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moduleJson = exports.json = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _jmCore = require('jm-core');

var _jmCore2 = _interopRequireDefault(_jmCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jm = new _jmCore2.default();
var logger = jm.logger;

var commands = [{
    name: 'set',
    intro: '- set value by name',
    examples: [{
        example: 'jmsh json set ./temp/test.json name jeff',
        intro: '- set a string value'
    }, {
        example: 'jmsh json set ./temp/test.json port 8080',
        intro: '- set a number value'
    }, {
        example: 'jmsh json set ./temp/test.json fullname {"last":"jeff", "first":"yu"}',
        intro: '- set a json value'
    }]
}, {
    name: 'get',
    intro: '- get value by name',
    example: 'jmsh json get ./temp/test.json name'
}];

var readJsonSync = function readJsonSync(fileName, opts) {
    return _fsExtra2.default.readJsonSync(fileName, opts);
};

var writeJsonSync = function writeJsonSync(fileName, obj, opts, cb) {
    _fsExtra2.default.writeJsonSync(fileName, obj, opts, cb);
};

/**
 * Handler
 */

var Handle = function () {

    /**
     * constructor
     * @param {Object} [opts]
     */
    function Handle() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Handle);
    }

    /**
     * set value
     * @param {String} file
     * @param {String} name
     * @param {String} value
     */


    _createClass(Handle, [{
        key: 'set',
        value: function set(file, name, value) {
            logger.debug('set %s %s %s', file, name, value);
            try {
                var _value = JSON.parse(value);
                value = _value;
            } catch (e) {}
            var o = {};
            if (_fsExtra2.default.existsSync(file)) o = readJsonSync(file);
            o || (o = {});
            var _o = o;
            var v = name.split('.');
            for (var i = 0; i < v.length - 1; i++) {
                var k = v[i];
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

    }, {
        key: 'get',
        value: function get(file, name) {
            var o = {};
            if (_fsExtra2.default.existsSync(file)) o = readJsonSync(file);
            var value = eval('o.' + name);
            logger.debug('get %s %s %j', file, name, value);
            return value;
        }
    }]);

    return Handle;
}();

var handle = new Handle();
var json = function json() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args.length || (args = ['-h']);

    var argv = (0, _yargs2.default)(args).usage('Usage: $0 json  <command> <file> <name> <value> [options]');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = commands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _cmd = _step.value;

            argv = _utils2.default.preDealArgv(_cmd, argv);
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

    var cmd = _command2.default.apply(undefined, _toConsumableArray(args));
    if (!handle[cmd]) return null;
    return handle[cmd].apply(handle, _toConsumableArray(args.slice(1)));
};

var moduleJson = function moduleJson($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'json';

    $.commands || ($.commands = {});
    $.commands[name] = json;

    return {
        name: name,
        intro: '- edit a json file',
        unuse: function unuse($) {
            delete $.commands[name];
        }
    };
};

exports.default = json;
exports.json = json;
exports.moduleJson = moduleJson;