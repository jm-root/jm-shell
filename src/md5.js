import fs from 'fs';
import crypto from 'crypto';
import yargv from 'yargs';

let md5sum = function (file) {
    let path = file;
    // let start = new Date().getTime();
    let m = crypto.createHash('md5');
    let stream = fs.createReadStream(path);
    stream.on('data', function (chunk) {
        m.update(chunk);
    });
    stream.on('end', function () {
        let str = m.digest('hex').toUpperCase();
        console.log(str);
        // console.log('文件:' + path + ',MD5签名为:' + str + '.耗时:' + (new Date().getTime() - start) / 1000.00 + "秒");
    });
};

let md5str = function (s) {
    let m = crypto.createHash('md5');
    m.update(s);
    let str = m.digest('hex').toUpperCase();
    console.log(str);
};

let md5 = function (...args) {
    args.length || (args = ['-h']);

    let argv = yargv(args)
        .usage('Usage: $0 md5 <file> [options]')
        .help('h')
        .alias('h', 'help')
        .alias('f', 'file')
        .argv;

    if (argv.file) return md5sum(argv.file);
    return md5str(...args);
};

let moduleMD5 = ($, name = 'md5') => {
    $.commands || ($.commands = {});
    $.commands[name] = md5;

    return {
        name: name,
        intro: '- md5 sum',
        examples: [
            {
                example: 'jmsh md5 123',
                intro: '- md5 sum of string "123", shoubld print: 202CB962AC59075B964B07152D234B70',
            },
            {
                example: 'jmsh md5 -f ./temp/test.json',
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
