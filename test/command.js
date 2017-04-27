import chai from 'chai';
let expect = chai.expect;
import JM from 'jm-core';
import command from '../src/command';

let jm = new JM();

describe('command', function () {
    it('ok', function () {
        let cmd = command('json');
        expect(cmd).to.be.equal('json');
    });
});
