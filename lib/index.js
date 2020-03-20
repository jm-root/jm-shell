const command = require('./command')
const utils = require('./utils')
const yargv = require('yargs')
const { Modulable } = require('jm-module')

const $ = new Modulable()
  .use(require('./json'))
  .use(require('./md5'))
  .use(require('./rm'))

module.exports = function (...args) {
  args.length || (args = ['-h'])
  const { commands } = $

  let argv = yargv(args)
    .usage('Usage: jmsh <command> [options]')
    .alias('v', 'version')

  for (const cmd of Object.keys(commands)) {
    argv = utils.preDealArgv($.modules[cmd], argv)
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
