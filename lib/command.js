const yargv = require('yargs')

module.exports = function (...args) {
  const argv = yargv(args)
    .demandCommand(1)
    .argv

  return argv._[0]
}
