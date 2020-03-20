const { moduleJson } = require('./json')
const { moduleMD5 } = require('./md5')
const command = require('./command')
const utils = require('./utils')
const yargv = require('yargs')
const { Modulable } = require('jm-module')

const jm = new Modulable()
  .use(moduleJson)
  .use(moduleMD5)

module.exports = function (...args) {
  args.length || (args = ['-h'])
  const { commands } = jm

  let argv = yargv(args)
    .usage('Usage: jmsh <command> [options]')
    .alias('v', 'version')

  for (const cmd of Object.keys(commands)) {
    argv = utils.preDealArgv(jm.modules[cmd], argv)
  }
  argv = argv
    .help('h')
    .alias('h', 'help')
    .argv

  if (argv.v) {
    const pkg = require('../package.json')
    console.log('%s %s', pkg.name, pkg.version)
    return
  }

  const cmd = command(...args)
  if (!commands[cmd]) return null
  return commands[cmd](...args.slice(1))
}
