var utils = require('../dist/utils.js');
var test = utils.test;

describe('date', function() {
    var d = utils.date;

    describe('timestamp', function() {
        it('test type', function() {
            var t = d.timestamp();
            test.assertNumber(t);
        });
    });
    describe('yyyymmdd', function() {
        it('test type', function() {
            var s = d.yyyymmdd();
            test.assertString(s);
        });
        it('test format (now)', function() {
            var s = d.yyyymmdd();
            test.assertTrue(/^[0-9]{8}$/.test(s));
        });
        it('test format (custom date)', function() {
            var s = d.yyyymmdd(new Date('85/4/3'));
            test.assertTrue(/^[0-9]{8}$/.test(s));
        });
    });
});