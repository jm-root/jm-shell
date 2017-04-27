import chai from 'chai';
let expect = chai.expect;
import shell from '../src';

describe('shell', function () {
    it('help', function () {
        shell();
        expect(jm).to.be.a('object');
    });
    it('json set', function () {
        shell(
            'json',
            'set',
            './temp/test.json',
            'fullname.last.abc',
            '{"name":"jeff", "age":12}'
        );
        shell(
            'json',
            'set',
            './temp/test.json',
            'packageUrl',
            'http://10.0.0.61/update/58536782744b0f000f946ee7'
        );
        expect(jm).to.be.a('object');
    });
    it('json get', function () {
        shell('json', 'get', './temp/test.json', 'fullname');
        shell('json', 'get', './temp/test.json', 'packageUrl');
        expect(jm).to.be.a('object');
    });
});
