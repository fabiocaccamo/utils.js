var utils = require('../dist/utils.js');
var test = utils.test;

describe('date', function () {
    var d = utils.date;

    describe('clone', function () {
        it('test type', function () {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var r = d.clone(a);
            test.assertFalse(a === r);
            test.assertTrue(
                a.getYear() === r.getYear() &&
                    a.getMonth() === r.getMonth() &&
                    a.getDay() === r.getDay() &&
                    a.getHours() === r.getHours() &&
                    a.getMinutes() === r.getMinutes()
            );
        });
    });
    describe('constrain', function () {
        it('test constrain with date < min', function () {
            var a = new Date();
            a.setFullYear(2022);
            var b = new Date();
            b.setFullYear(2023);
            var c = new Date();
            c.setFullYear(2019);
            var r = d.constrain(c, a, b);
            test.assertEqual(r, a);
        });
        it('test constrain with date < min and inverted min/max', function () {
            var a = new Date();
            a.setFullYear(2022);
            var b = new Date();
            b.setFullYear(2023);
            var c = new Date();
            c.setFullYear(2019);
            var r = d.constrain(c, b, a);
            test.assertEqual(r, a);
        });
        it('test constrain with date > max', function () {
            var a = new Date();
            a.setFullYear(2022);
            var b = new Date();
            b.setFullYear(2023);
            var c = new Date();
            c.setFullYear(2024);
            var r = d.constrain(c, a, b);
            test.assertEqual(r, b);
        });
        it('test constrain with date > max and inverted min/max', function () {
            var a = new Date();
            a.setFullYear(2022);
            var b = new Date();
            b.setFullYear(2023);
            var c = new Date();
            c.setFullYear(2024);
            var r = d.constrain(c, b, a);
            test.assertEqual(r, b);
        });
    });
    describe('format', function () {
        it('test format 1', function () {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var s = d.format(a, 'YYYY/MM/DD');
            test.assertTrue(s === '1985/04/03');
        });
        it('test format 2', function () {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var s = d.format(a, 'YYYYMMDD');
            test.assertTrue(s === '19850403');
        });
        it('test format 3', function () {
            var a = new Date(1985, 3, 3, 23, 57, 5);
            var s = d.format(a, "XX D, 'YY");
            test.assertTrue(s === "April 3, '85");
        });
    });
    describe('identifier', function () {
        it('test type', function () {
            var s = d.identifier();
            test.assertString(s);
        });
        it('test format (now)', function () {
            var s = d.identifier();
            test.assertTrue(/^[0-9]{17}$/.test(s));
        });
        it('test format (custom date)', function () {
            var s = d.identifier(new Date('85/4/3'));
            test.assertTrue(/^[0-9]{17}$/.test(s));
        });
    });
    describe('isFuture', function () {
        it('test with past date', function () {
            var date = new Date('1985/4/3');
            test.assertFalse(d.isFuture(date));
        });
        it('test with future date', function () {
            var date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            test.assertTrue(d.isFuture(date));
        });
        it('test with same day date', function () {
            var date = new Date();
            test.assertFalse(d.isFuture(date));
        });
        it('test with same day date ignoring time', function () {
            var date = new Date();
            date.setMinutes(date.getMinutes() + 1);
            test.assertFalse(d.isFuture(date));
            test.assertTrue(d.isFuture(date, true));
        });
    });
    describe('isPast', function () {
        it('test with past date', function () {
            var date = new Date('1985/4/3');
            test.assertTrue(d.isPast(date));
        });
        it('test with future date', function () {
            var date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            test.assertFalse(d.isPast(date));
        });
        it('test with same day date', function () {
            var date = new Date();
            test.assertFalse(d.isPast(date));
        });
        it('test with same day date ignoring time', function () {
            var date = new Date();
            date.setMinutes(date.getMinutes() - 1);
            test.assertFalse(d.isPast(date));
            test.assertTrue(d.isPast(date, true));
        });
    });
    describe('max', function () {
        it('test max with past comparison', function () {
            var a = new Date();
            var b = new Date();
            b.setFullYear(a.getFullYear() - 1);
            var r = d.max(a, b);
            test.assertEqual(r, a);
        });
        it('test max with future comparison', function () {
            var a = new Date();
            var b = new Date();
            b.setFullYear(a.getFullYear() + 1);
            var r = d.max(a, b);
            test.assertEqual(r, b);
        });
    });
    describe('min', function () {
        it('test min with past comparison', function () {
            var a = new Date();
            var b = new Date();
            b.setFullYear(a.getFullYear() - 1);
            var r = d.min(a, b);
            test.assertEqual(r, b);
        });
        it('test min with future comparison', function () {
            var a = new Date();
            var b = new Date();
            b.setFullYear(a.getFullYear() + 1);
            var r = d.min(a, b);
            test.assertEqual(r, a);
        });
    });
    describe('normalize', function () {
        it('test type', function () {
            var r = d.normalize(0);
            test.assertObject(r);
        });
        it('test milliseconds', function () {
            var ms = 500;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 500,
                seconds: 0,
                minutes: 0,
                hours: 0,
                days: 0,
            });
        });
        it('test seconds', function () {
            var ms = 1100 * 7;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 700,
                seconds: 7,
                minutes: 0,
                hours: 0,
                days: 0,
            });
        });
        it('test minutes', function () {
            var ms = 1000 * 125;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 0,
                seconds: 5,
                minutes: 2,
                hours: 0,
                days: 0,
            });
        });
        it('test hours', function () {
            var ms = 1000 * 980;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 0,
                seconds: 20,
                minutes: 16,
                hours: 0,
                days: 0,
            });
        });
        it('test days', function () {
            var ms = 1000 * 15270;
            var r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 0,
                seconds: 30,
                minutes: 14,
                hours: 4,
                days: 0,
            });
        });
    });
    describe('parse', function () {
        it('test parse with invalid value', function () {
            var dt = d.parse(null);
            test.assertNull(dt);
        });
        it('test parse with date value', function () {
            var now = new Date();
            var dt = d.parse(now);
            test.assertDate(dt);
            test.assertEqual(dt, now);
        });
        it('test parse with timestamp value (as number)', function () {
            var dt = d.parse(818035920000);
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 1995);
            test.assertEqual(dt.getMonth(), 11);
            test.assertEqual(dt.getDate(), 4);
        });
        it('test parse with timestamp value (as string)', function () {
            var dt = d.parse('818035920000');
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 1995);
            test.assertEqual(dt.getMonth(), 11);
            test.assertEqual(dt.getDate(), 4);
        });
        it('test parse with date string', function () {
            var dt = d.parse('04 Dec 1995 00:12:00 GMT');
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 1995);
            test.assertEqual(dt.getMonth(), 11);
            test.assertEqual(dt.getDate(), 4);
        });
        it('test parse with date string (other format)', function () {
            var dt = d.parse('2024-04-30T00:00:00Z');
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 2024);
            test.assertEqual(dt.getMonth(), 3);
            test.assertEqual(dt.getDate(), 30);
        });
    });
    describe('timestamp', function () {
        it('test type', function () {
            var t = d.timestamp();
            test.assertNumber(t);
        });
    });
    describe('today', function () {
        it('test today', function () {
            var t = d.today();
            var now = new Date();
            test.assertEqual(t.getDate(), now.getDate());
        });
    });
    describe('tomorrow', function () {
        it('test tomorrow', function () {
            var t = d.tomorrow();
            var now = new Date();
            now.setDate(now.getDate() + 1);
            test.assertEqual(t.getDate(), now.getDate());
        });
    });
    describe('yesterday', function () {
        it('test yesterday', function () {
            var y = d.yesterday();
            var now = new Date();
            now.setDate(now.getDate() - 1);
            test.assertEqual(y.getDate(), now.getDate());
        });
    });
    describe('yyyymmdd', function () {
        it('test type', function () {
            var s = d.yyyymmdd();
            test.assertString(s);
        });
        it('test format (now)', function () {
            var s = d.yyyymmdd();
            test.assertTrue(/^[0-9]{8}$/.test(s));
        });
        it('test format (custom date)', function () {
            var s = d.yyyymmdd(new Date('85/4/3'));
            test.assertTrue(/^[0-9]{8}$/.test(s));
        });
        it('test format (custom separator)', function () {
            var s = d.yyyymmdd(new Date('85/4/3'), '-');
            test.assertEqual(s, '1985-04-03');
        });
    });
});
