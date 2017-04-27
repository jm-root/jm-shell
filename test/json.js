import chai from 'chai';
let expect = chai.expect;
import json from '../src/json';

describe('json', function () {
    it('set', function () {
        json('set', './temp/test.json', 'version', '0.3.1');
        expect(json).to.be.a('function');
    });
});
