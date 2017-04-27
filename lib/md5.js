'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moduleMD5 = exports.md5 = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var md5sum = function md5sum(file) {
    var path = file;
    var start = new Date().getTime();
    var m = _crypto2.default.createHash('md5');
    var stream = _fs2.default.createReadStream(path);
    stream.on('data', function (chunk) {
        m.update(chunk);
    });
    stream.on('end', function () {
        var str = m.digest('hex').toUpperCase();
        console.log('文件:' + path + ',MD5签名为:' + str + '.耗时:' + (new Date().getTime() - start) / 1000.00 + "秒");
    });
};

var md5 = function md5() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args.length || (args = ['-h']);

    var argv = (0, _yargs2.default)(args).usage('Usage: $0 md5 <file> [options]').help('h').alias('h', 'help').argv;

    return md5sum.apply(undefined, _toConsumableArray(args));
};

var moduleMD5 = function moduleMD5($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'md5';

    $.commands || ($.commands = {});
    $.commands[name] = md5;

    return {
        name: name,
        intro: '- md5 sum',
        examples: [{
            example: 'jmsh md5 ./temp/test.json',
            intro: '- md5 sum of file ./temp/test.json'
        }],
        unuse: function unuse($) {
            delete $.commands[name];
        }
    };
};

exports.default = md5;
exports.md5 = md5;
exports.moduleMD5 = moduleMD5;