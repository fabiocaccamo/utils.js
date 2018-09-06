var utils = require('../dist/utils.js');
var test = utils.test;
var hex = utils.hex;

describe('hex', function() {
    describe('decodeInt', function() {
        var d = hex.decodeInt;
        it('decode 0', function() {
            test.assertEqual(d('00'), 0);
        });
        it('decode 1', function() {
            test.assertEqual(d('01'), 1);
        });
        it('decode 2', function() {
            test.assertEqual(d('02'), 2);
        });
        it('decode 3', function() {
            test.assertEqual(d('03'), 3);
        });
        it('decode 4', function() {
            test.assertEqual(d('04'), 4);
        });
        it('decode 5', function() {
            test.assertEqual(d('05'), 5);
        });
        it('decode 6', function() {
            test.assertEqual(d('06'), 6);
        });
        it('decode 7', function() {
            test.assertEqual(d('07'), 7);
        });
        it('decode 8', function() {
            test.assertEqual(d('08'), 8);
        });
        it('decode 9', function() {
            test.assertEqual(d('09'), 9);
        });
        it('decode 10', function() {
            test.assertEqual(d('0A'), 10);
        });
        it('decode 11', function() {
            test.assertEqual(d('0B'), 11);
        });
        it('decode 12', function() {
            test.assertEqual(d('0C'), 12);
        });
        it('decode 13', function() {
            test.assertEqual(d('0D'), 13);
        });
        it('decode 14', function() {
            test.assertEqual(d('0E'), 14);
        });
        it('decode 15', function() {
            test.assertEqual(d('0F'), 15);
        });
        it('decode 16', function() {
            test.assertEqual(d('10'), 16);
        });
    });
    describe('encodeInt', function() {
        var e = hex.encodeInt;
        it('encode 0', function() {
            test.assertEqual(e(0), '00');
        });
        it('encode 1', function() {
            test.assertEqual(e(1), '01');
        });
        it('encode 2', function() {
            test.assertEqual(e(2), '02');
        });
        it('encode 3', function() {
            test.assertEqual(e(3), '03');
        });
        it('encode 4', function() {
            test.assertEqual(e(4), '04');
        });
        it('encode 5', function() {
            test.assertEqual(e(5), '05');
        });
        it('encode 6', function() {
            test.assertEqual(e(6), '06');
        });
        it('encode 7', function() {
            test.assertEqual(e(7), '07');
        });
        it('encode 8', function() {
            test.assertEqual(e(8), '08');
        });
        it('encode 9', function() {
            test.assertEqual(e(9), '09');
        });
        it('encode 10', function() {
            test.assertEqual(e(10), '0A');
        });
        it('encode 11', function() {
            test.assertEqual(e(11), '0B');
        });
        it('encode 12', function() {
            test.assertEqual(e(12), '0C');
        });
        it('encode 13', function() {
            test.assertEqual(e(13), '0D');
        });
        it('encode 14', function() {
            test.assertEqual(e(14), '0E');
        });
        it('encode 15', function() {
            test.assertEqual(e(15), '0F');
        });
        it('encode 16', function() {
            test.assertEqual(e(16), '10');
        });
    });
});