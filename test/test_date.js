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
    describe('format', function() {
        it('test format 1', function() {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var s = d.format(a, "YYYY/MM/DD");
            test.assertTrue(s === "1985/04/03");
        });
        it('test format 2', function() {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var s = d.format(a, "YYYYMMDD");
            test.assertTrue(s === "19850403");
        });
        it('test format 3', function() {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var s = d.format(a, "XX D, 'YY");
            test.assertTrue(s === "April 3, '85");
        });
    });
    describe('identifier', function() {
        it('test type', function() {
            var s = d.identifier();
            test.assertString(s);
        });
        it('test format (now)', function() {
            var s = d.identifier();
            test.assertTrue(/^[0-9]{17}$/.test(s));
        });
        it('test format (custom date)', function() {
            var s = d.identifier(new Date('85/4/3'));
            test.assertTrue(/^[0-9]{17}$/.test(s));
        });
    });
    describe('normalize', function() {
        it('test type', function() {
            var r = d.normalize(0);
            test.assertObject(r);
        });
        it('test milliseconds', function() {
            var ms = 500;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds:   500,
                seconds:        0,
                minutes:        0,
                hours:          0,
                days:           0
            });
        });
        it('test seconds', function() {
            var ms = 1100 * 7;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds:   700,
                seconds:        7,
                minutes:        0,
                hours:          0,
                days:           0
            });
        });
        it('test minutes', function() {
            var ms = 1000 * 125;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds:   0,
                seconds:        5,
                minutes:        2,
                hours:          0,
                days:           0
            });
        });
        it('test hours', function() {
            var ms = 1000 * 980;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds:   0,
                seconds:        20,
                minutes:        16,
                hours:          0,
                days:           0
            });
        });
        it('test days', function() {
            var ms = 1000 * 15270;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds:   0,
                seconds:        30,
                minutes:        14,
                hours:          4,
                days:           0
            });
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
        it('test format (custom separator)', function() {
            var s = d.yyyymmdd(new Date('85/4/3'), '-');
            test.assertEqual(s, '1985-04-03');
        });
    });
});