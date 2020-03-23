const yargv = require('yargs')
const rimraf = require('rimraf')
const { logger } = require('jm-logger')
const fs = require('fs')
const path = require('path')

/**
 * 规则转为函数
 *
 * @param {RegExp|Function} pattern
 * @return {Function}
 */
function patternToFunction (pattern) {
  if (typeof pattern === 'function') {
    return pattern
  } else if (pattern instanceof RegExp) {
    return function (s) {
      return pattern.test(s)
    }
  }
  return function () {
    return false
  }
}

/**
 * 将数组中的文件名转换为完整路径
 *
 * @param {String} dir
 * @param {Array} files
 * @return {Array}
 */
function fullPath (dir, files) {
  return files.map(function (f) {
    return path.join(dir, f)
  })
}

function eachFileSync (dir, findOne) {
  try {
    const stats = fs.statSync(dir)
    if (findOne(dir, stats)) return

    // 遍历子目录
    if (stats.isDirectory()) {
      const files = fullPath(dir, fs.readdirSync(dir))

      files.forEach(function (f) {
        eachFileSync(f, findOne)
      })
    }
  } catch (e) {
    logger.error(e)
  }
}

function eachFilterSync (dir, pattern, findOne) {
  const test = patternToFunction(pattern)
  eachFileSync(dir, function (f, s) {
    if (test(f)) {
      return findOne(f, s)
    }
  })
};

// 搜索子目录
async function rms (file) {
  const reg = new RegExp(`${file}$`) // /temp$/
  eachFilterSync(process.cwd(), reg, f => {
    logger.debug(`rm ${f}`)
    rimraf.sync(f)
    return true
  })
}

const rm = function (...args) {
  args.length || (args = ['-h'])

  const argv = yargv(args)
    .usage('Usage: $0 rm <file> [options]')
    .help('h')
    .alias('h', 'help')
    .argv

  const files = argv._
  if (argv.s) {
    files.forEach(file => {
      rms(file)
    })
    return
  }
  rimraf.sync(...files)
}

module.exports = function (name = 'rm') {
  const $ = this
  $.commands || ($.commands = {})
  $.commands[name] = rm

  return {
    name: name,
    intro: '- rm file or dir',
    examples: [
      {
        example: 'jmsh rm node_modules -s',
        intro: '- remove all files and dirs by name node_modules'
      }
    ],
    unuse: function ($) {
      delete $.commands[name]
    }
  }
}
module.exports.rm = rm
