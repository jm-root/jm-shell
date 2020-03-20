const command = require('../lib/command')

describe('command', function () {
  test('ok', function () {
    let cmd = command('json')
    expect(cmd === 'json').toBeTruthy()
  })
})
