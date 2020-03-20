const fse = require('fs-extra')
const yargv = require('yargs')
const command = require('./command')
const utils = require('./utils')
const { logger } = require('jm-logger')

const commands = [
  {
    name: 'set',
    intro: '- set value by name',
    examples: [
      {
        example: 'jmsh json set ./temp/test.json name jeff',
        intro: '- set a string value'
      },
      {
        example: 'jmsh json set ./temp/test.json port 8080',
        intro: '- set a number value'
      },
      {
        example: 'jmsh json set ./temp/test.json fullname {"last":"jeff", "first":"yu"}',
        intro: '- set a json value'
      }
    ]
  },
  {
    name: 'get',
    intro: '- get value by name',
    example: 'jmsh json get ./temp/test.json name'
  }
]

const readJsonSync = function (fileName, opts) {
  return fse.readJsonSync(fileName, opts)
}

const writeJsonSync = function (fileName, obj, opts, cb) {
  fse.ensureFileSync(fileName)
  fse.writeJsonSync(fileName, obj, opts, cb)
}

/**
 * Handler
 */
class Handle {
  /**
     * set value
     * @param {String} file
     * @param {String} name
     * @param {String} value
     */
  set (file, name, value) {
    logger.debug('set %s %s %s', file, name, value)
    try {
      const _value = JSON.parse(value)
      value = _value
    } catch (e) {
    }
    let o
    if (fse.existsSync(file)) o = readJsonSync(file)
    o || (o = {})
    let _o = o
    const v = name.split('.')
    for (let i = 0; i < v.length - 1; i++) {
      const k = v[i]
      _o[k] || (_o[k] = {})
      _o = _o[k]
    }
    _o[v[v.length - 1]] = value
    writeJsonSync(file, o)
  }

  /**
     * get value
     * @param {String} file
     * @param {String} name
     * @return {Object}
     */
  get (file, name) {
    const o = {} // eslint-disable-line
    if (fse.existsSync(file)) o = readJsonSync(file) // eslint-disable-line
    const value = eval('o.' + name) // eslint-disable-line
    logger.debug('get %s %s %j', file, name, value)
    return value
  }
}

const handle = new Handle()
const json = function (...args) {
  args.length || (args = ['-h'])

  let argv = yargv(args)
    .usage('Usage: $0 json  <command> <file> <name> <value> [options]')

  for (const cmd of commands) {
    argv = utils.preDealArgv(cmd, argv)
  }
  argv = argv
    .help('h')
    .alias('h', 'help')
    .argv

  const cmd = command(...args)
  if (!handle[cmd]) return null
  return handle[cmd](...args.slice(1))
}

module.exports = function (name = 'json') {
  const $ = this
  $.commands || ($.commands = {})
  $.commands[name] = json

  return {
    name: name,
    intro: '- edit a json file',
    unuse: function ($) {
      delete $.commands[name]
    }
  }
}

module.exports.json = json
