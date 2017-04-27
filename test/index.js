import chai from 'chai';
let expect = chai.expect;
import shell from '../src';

describe('shell', function () {
    it('help', function () {
        shell();
        expect(shell).to.be.a('function');
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
        expect(shell).to.be.a('function');
    });
    it('json get', function () {
        shell('json', 'get', './temp/test.json', 'fullname');
        shell('json', 'get', './temp/test.json', 'packageUrl');
        expect(shell).to.be.a('function');
    });
    it('md5', function () {
        shell('md5', './temp/test.json');
        expect(shell).to.be.a('function');
    });
});
