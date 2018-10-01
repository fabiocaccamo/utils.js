var utils = require('../dist/utils.js');
var test = utils.test;

describe('date', function() {
    var d = utils.date;

    describe('clone', function() {
        it('test type', function() {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var r = d.clone(a);
            test.assertFalse(a === r);
            test.assertTrue(
                a.getYear() === r.getYear() &&
                a.getMonth() === r.getMonth() &&
                a.getDay() === r.getDay() &&
                a.getHours() === r.getHours() &&
                a.getMinutes() === r.getMinutes());
        });
    });
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