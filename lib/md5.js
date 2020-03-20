const fs = require('fs')
const crypto = require('crypto')
const yargv = require('yargs')

const md5sum = function (file) {
  const path = file.trim()
  const m = crypto.createHash('md5')
  const stream = fs.createReadStream(path)
  stream.on('data', function (chunk) {
    m.update(chunk)
  })
  stream.on('end', function () {
    const str = m.digest('hex').toUpperCase()
    console.log(str)
    // console.log('文件:' + path + ',MD5签名为:' + str + '.耗时:' + (new Date().getTime() - start) / 1000.00 + "秒");
  })
}

const md5str = function (s) {
  const m = crypto.createHash('md5')
  m.update(s)
  const str = m.digest('hex').toUpperCase()
  console.log(str)
}

const md5 = function (...args) {
  args.length || (args = ['-h'])

  const argv = yargv(args)
    .usage('Usage: $0 md5 <file> [options]')
    .help('h')
    .alias('h', 'help')
    .alias('f', 'file')
    .argv

  if (argv.file) return md5sum(argv.file)
  return md5str(...args)
}

const moduleMD5 = function (name = 'md5') {
  const $ = this
  $.commands || ($.commands = {})
  $.commands[name] = md5

  return {
    name: name,
    intro: '- md5 sum',
    examples: [
      {
        example: 'jmsh md5 123',
        intro: '- md5 sum of string "123", shoubld print: 202CB962AC59075B964B07152D234B70'
      },
      {
        example: 'jmsh md5 -f ./temp/test.json',
        intro: '- md5 sum of file ./temp/test.json'
      }
    ],
    unuse: function ($) {
      delete $.commands[name]
    }
  }
}

module.exports = { md5, moduleMD5 }
