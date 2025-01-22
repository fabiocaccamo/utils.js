import utils from '../src/utils.js';
const test = utils.test;
const hex = utils.hex;

describe('hex', () => {
    describe('decodeInt', () => {
        const d = hex.decodeInt;
        it('decode 0', () => {
            test.assertEqual(d('00'), 0);
        });
        it('decode 1', () => {
            test.assertEqual(d('01'), 1);
        });
        it('decode 2', () => {
            test.assertEqual(d('02'), 2);
        });
        it('decode 3', () => {
            test.assertEqual(d('03'), 3);
        });
        it('decode 4', () => {
            test.assertEqual(d('04'), 4);
        });
        it('decode 5', () => {
            test.assertEqual(d('05'), 5);
        });
        it('decode 6', () => {
            test.assertEqual(d('06'), 6);
        });
        it('decode 7', () => {
            test.assertEqual(d('07'), 7);
        });
        it('decode 8', () => {
            test.assertEqual(d('08'), 8);
        });
        it('decode 9', () => {
            test.assertEqual(d('09'), 9);
        });
        it('decode 10', () => {
            test.assertEqual(d('0A'), 10);
        });
        it('decode 11', () => {
            test.assertEqual(d('0B'), 11);
        });
        it('decode 12', () => {
            test.assertEqual(d('0C'), 12);
        });
        it('decode 13', () => {
            test.assertEqual(d('0D'), 13);
        });
        it('decode 14', () => {
            test.assertEqual(d('0E'), 14);
        });
        it('decode 15', () => {
            test.assertEqual(d('0F'), 15);
        });
        it('decode 16', () => {
            test.assertEqual(d('10'), 16);
        });
    });
    describe('encodeInt', () => {
        const e = hex.encodeInt;
        it('encode 0', () => {
            test.assertEqual(e(0), '00');
        });
        it('encode 1', () => {
            test.assertEqual(e(1), '01');
        });
        it('encode 2', () => {
            test.assertEqual(e(2), '02');
        });
        it('encode 3', () => {
            test.assertEqual(e(3), '03');
        });
        it('encode 4', () => {
            test.assertEqual(e(4), '04');
        });
        it('encode 5', () => {
            test.assertEqual(e(5), '05');
        });
        it('encode 6', () => {
            test.assertEqual(e(6), '06');
        });
        it('encode 7', () => {
            test.assertEqual(e(7), '07');
        });
        it('encode 8', () => {
            test.assertEqual(e(8), '08');
        });
        it('encode 9', () => {
            test.assertEqual(e(9), '09');
        });
        it('encode 10', () => {
            test.assertEqual(e(10), '0A');
        });
        it('encode 11', () => {
            test.assertEqual(e(11), '0B');
        });
        it('encode 12', () => {
            test.assertEqual(e(12), '0C');
        });
        it('encode 13', () => {
            test.assertEqual(e(13), '0D');
        });
        it('encode 14', () => {
            test.assertEqual(e(14), '0E');
        });
        it('encode 15', () => {
            test.assertEqual(e(15), '0F');
        });
        it('encode 16', () => {
            test.assertEqual(e(16), '10');
        });
    });
});
