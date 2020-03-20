const { json } = require('../lib/json')

describe('json', function () {
  test('set', function () {
    json('set', './temp/test.json', 'version', '0.3.1')
  })
})
