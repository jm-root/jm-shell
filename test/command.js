import chai from 'chai';
let expect = chai.expect;
import command from '../src/command';

describe('command', function () {
    it('ok', function () {
        let cmd = command('json');
        expect(cmd).to.be.equal('json');
    });
});
