const shell = require('../lib')

describe('shell', function () {
  test('json set', function () {
    shell(
      'json',
      'set',
      './temp/test.json',
      'fullname.last.abc',
      '{"name":"jeff", "age":12}'
    )
    shell(
      'json',
      'set',
      './temp/test.json',
      'packageUrl',
      'http://10.0.0.61/update/58536782744b0f000f946ee7'
    )
  })
  test('json get', function () {
    shell('json', 'get', './temp/test.json', 'fullname')
    shell('json', 'get', './temp/test.json', 'packageUrl')
  })
  test('md5', function () {
    shell('md5', '123')
  })
  test('md5file', function () {
    shell('md5', '-f ./temp/test.json')
  })
})
