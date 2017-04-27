import fs from 'fs';
import crypto from 'crypto';
import yargv from 'yargs';

let md5sum = function (file) {
    var path = file;
    var start = new Date().getTime();
    var m = crypto.createHash('md5');
    var stream = fs.createReadStream(path);
    stream.on('data', function (chunk) {
        m.update(chunk);
    });
    stream.on('end', function () {
        let str = m.digest('hex').toUpperCase();
        console.log('文件:' + path + ',MD5签名为:' + str + '.耗时:' + (new Date().getTime() - start) / 1000.00 + "秒");
    });
};

let md5 = function (...args) {
    args.length || (args = ['-h']);

    let argv = yargv(args)
        .usage('Usage: $0 md5 <file> [options]')
        .help('h')
        .alias('h', 'help')
        .argv;

    return md5sum(...args);
};

let moduleMD5 = ($, name = 'md5') => {
    $.commands || ($.commands = {});
    $.commands[name] = md5;

    return {
        name: name,
        intro: '- md5 sum',
        examples: [
            {
                example: 'jmsh md5 ./temp/test.json',
                intro: '- md5 sum of file ./temp/test.json',
            },
        ],
        unuse: function ($) {
            delete $.commands[name];
        },
    };
};

export default md5;
export {md5, moduleMD5};
