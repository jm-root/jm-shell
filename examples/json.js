var JM = require('jm-core')
var shell = require('../lib')
var jm = new JM()

var logger = jm.logger
logger.debug('******** json *********')

shell('json', 'set', '../temp/test.json', 'name.last', 'jeff')
logger.debug('%j', shell('json', 'get', '../temp/test.json', 'name.last'))
