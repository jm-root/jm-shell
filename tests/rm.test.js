const { rm } = require('../lib/rm')

describe('rm', function () {
  test('rm dir', function () {
    rm('temp')
  })
})
