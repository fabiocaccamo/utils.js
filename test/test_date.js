import utils from '../src/utils.js';
const test = utils.test;

describe('date', () => {
    const d = utils.date;

    describe('clone', () => {
        it('test type', () => {
            const a = new Date(1985, 3, 3, 23, 57, 5);
            const r = d.clone(a);
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
    describe('constrain', () => {
        it('test constrain with date < min', () => {
            const a = new Date();
            a.setFullYear(2022);
            const b = new Date();
            b.setFullYear(2023);
            const c = new Date();
            c.setFullYear(2019);
            const r = d.constrain(c, a, b);
            test.assertEqual(r, a);
        });
        it('test constrain with date < min and inverted min/max', () => {
            const a = new Date();
            a.setFullYear(2022);
            const b = new Date();
            b.setFullYear(2023);
            const c = new Date();
            c.setFullYear(2019);
            const r = d.constrain(c, b, a);
            test.assertEqual(r, a);
        });
        it('test constrain with date > max', () => {
            const a = new Date();
            a.setFullYear(2022);
            const b = new Date();
            b.setFullYear(2023);
            const c = new Date();
            c.setFullYear(2024);
            const r = d.constrain(c, a, b);
            test.assertEqual(r, b);
        });
        it('test constrain with date > max and inverted min/max', () => {
            const a = new Date();
            a.setFullYear(2022);
            const b = new Date();
            b.setFullYear(2023);
            const c = new Date();
            c.setFullYear(2024);
            const r = d.constrain(c, b, a);
            test.assertEqual(r, b);
        });
    });
    describe('format', () => {
        it('test format 1', () => {
            const a = new Date(1985, 3, 3, 23, 57, 5);
            const s = d.format(a, 'YYYY/MM/DD');
            test.assertTrue(s === '1985/04/03');
        });
        it('test format 2', () => {
            const a = new Date(1985, 3, 3, 23, 57, 5);
            const s = d.format(a, 'YYYYMMDD');
            test.assertTrue(s === '19850403');
        });
        it('test format 3', () => {
            const a = new Date(1985, 3, 3, 23, 57, 5);
            const s = d.format(a, "XX D, 'YY");
            test.assertTrue(s === "April 3, '85");
        });
    });
    describe('identifier', () => {
        it('test type', () => {
            const s = d.identifier();
            test.assertString(s);
        });
        it('test format (now)', () => {
            const s = d.identifier();
            test.assertTrue(/^[0-9]{17}$/.test(s));
        });
        it('test format (custom date)', () => {
            const s = d.identifier(new Date('85/4/3'));
            test.assertTrue(/^[0-9]{17}$/.test(s));
        });
    });
    describe('isFuture', () => {
        it('test with past date', () => {
            const date = new Date('1985/4/3');
            test.assertFalse(d.isFuture(date));
        });
        it('test with future date', () => {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            test.assertTrue(d.isFuture(date));
        });
        it('test with same day date', () => {
            const date = new Date();
            test.assertFalse(d.isFuture(date));
        });
        it('test with same day date ignoring time', () => {
            const date = new Date();
            date.setMinutes(date.getMinutes() + 1);
            test.assertFalse(d.isFuture(date));
            test.assertTrue(d.isFuture(date, true));
        });
    });
    describe('isPast', () => {
        it('test with past date', () => {
            const date = new Date('1985/4/3');
            test.assertTrue(d.isPast(date));
        });
        it('test with future date', () => {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            test.assertFalse(d.isPast(date));
        });
        it('test with same day date', () => {
            const date = new Date();
            test.assertFalse(d.isPast(date));
        });
        it('test with same day date ignoring time', () => {
            const date = new Date();
            date.setMinutes(date.getMinutes() - 1);
            test.assertFalse(d.isPast(date));
            test.assertTrue(d.isPast(date, true));
        });
    });
    describe('max', () => {
        it('test max with past comparison', () => {
            const a = new Date();
            const b = new Date();
            b.setFullYear(a.getFullYear() - 1);
            const r = d.max(a, b);
            test.assertEqual(r, a);
        });
        it('test max with future comparison', () => {
            const a = new Date();
            const b = new Date();
            b.setFullYear(a.getFullYear() + 1);
            const r = d.max(a, b);
            test.assertEqual(r, b);
        });
    });
    describe('min', () => {
        it('test min with past comparison', () => {
            const a = new Date();
            const b = new Date();
            b.setFullYear(a.getFullYear() - 1);
            const r = d.min(a, b);
            test.assertEqual(r, b);
        });
        it('test min with future comparison', () => {
            const a = new Date();
            const b = new Date();
            b.setFullYear(a.getFullYear() + 1);
            const r = d.min(a, b);
            test.assertEqual(r, a);
        });
    });
    describe('normalize', () => {
        it('test type', () => {
            const r = d.normalize(0);
            test.assertObject(r);
        });
        it('test milliseconds', () => {
            const ms = 500;
            const r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 500,
                seconds: 0,
                minutes: 0,
                hours: 0,
                days: 0,
            });
        });
        it('test seconds', () => {
            const ms = 1100 * 7;
            const r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 700,
                seconds: 7,
                minutes: 0,
                hours: 0,
                days: 0,
            });
        });
        it('test minutes', () => {
            const ms = 1000 * 125;
            const r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 0,
                seconds: 5,
                minutes: 2,
                hours: 0,
                days: 0,
            });
        });
        it('test hours', () => {
            const ms = 1000 * 980;
            const r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 0,
                seconds: 20,
                minutes: 16,
                hours: 0,
                days: 0,
            });
        });
        it('test days', () => {
            const ms = 1000 * 15270;
            const r = d.normalize(ms);
            test.assertEqual(r, {
                milliseconds: 0,
                seconds: 30,
                minutes: 14,
                hours: 4,
                days: 0,
            });
        });
    });
    describe('parse', () => {
        it('test parse with invalid value', () => {
            const dt = d.parse(null);
            test.assertNull(dt);
        });
        it('test parse with date value', () => {
            const now = new Date();
            const dt = d.parse(now);
            test.assertDate(dt);
            test.assertEqual(dt, now);
        });
        it('test parse with timestamp value (as number)', () => {
            const dt = d.parse(818035920000);
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 1995);
            test.assertEqual(dt.getMonth(), 11);
            test.assertEqual(dt.getDate(), 4);
        });
        it('test parse with timestamp value (as string)', () => {
            const dt = d.parse('818035920000');
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 1995);
            test.assertEqual(dt.getMonth(), 11);
            test.assertEqual(dt.getDate(), 4);
        });
        it('test parse with date string', () => {
            const dt = d.parse('04 Dec 1995 00:12:00 GMT');
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 1995);
            test.assertEqual(dt.getMonth(), 11);
            test.assertEqual(dt.getDate(), 4);
        });
        it('test parse with date string (other format)', () => {
            const dt = d.parse('2024-04-30T00:00:00Z');
            test.assertDate(dt);
            test.assertEqual(dt.getFullYear(), 2024);
            test.assertEqual(dt.getMonth(), 3);
            test.assertEqual(dt.getDate(), 30);
        });
    });
    describe('timestamp', () => {
        it('test type', () => {
            const t = d.timestamp();
            test.assertNumber(t);
        });
    });
    describe('today', () => {
        it('test today', () => {
            const t = d.today();
            const now = new Date();
            test.assertEqual(t.getDate(), now.getDate());
        });
    });
    describe('tomorrow', () => {
        it('test tomorrow', () => {
            const t = d.tomorrow();
            const now = new Date();
            now.setDate(now.getDate() + 1);
            test.assertEqual(t.getDate(), now.getDate());
        });
    });
    describe('yesterday', () => {
        it('test yesterday', () => {
            const y = d.yesterday();
            const now = new Date();
            now.setDate(now.getDate() - 1);
            test.assertEqual(y.getDate(), now.getDate());
        });
    });
    describe('yyyymmdd', () => {
        it('test type', () => {
            const s = d.yyyymmdd();
            test.assertString(s);
        });
        it('test format (now)', () => {
            const s = d.yyyymmdd();
            test.assertTrue(/^[0-9]{8}$/.test(s));
        });
        it('test format (custom date)', () => {
            const s = d.yyyymmdd(new Date('85/4/3'));
            test.assertTrue(/^[0-9]{8}$/.test(s));
        });
        it('test format (custom separator)', () => {
            const s = d.yyyymmdd(new Date('85/4/3'), '-');
            test.assertEqual(s, '1985-04-03');
        });
    });
});
