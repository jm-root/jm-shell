'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var utils = {
    preDealArgv: function preDealArgv(command, argv) {
        argv = argv.command(command.name, command.intro || '');
        if (command.example) argv = argv.example(command.example);
        if (command.examples) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = command.examples[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var example = _step.value;

                    argv = argv.example(example.example, example.intro);
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
        }
        return argv;
    }
};

exports.default = utils;
module.exports = exports['default'];