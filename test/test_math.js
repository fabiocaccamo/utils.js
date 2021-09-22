var utils = require('../dist/utils.js');
var test = utils.test;
var math = utils.math;

describe('math', function() {
    describe('average', function() {
        var f = math.average;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f([5, 10, 45]), 20);
        });
    });
    describe('constrain', function() {
        var f = math.constrain;
        it('test value', function() {
            test.assertNumberAlmostEqual(f(0.5, 0.0, 1.0), 0.5);
            test.assertNumberAlmostEqual(f(0.5, 1.0, 0.0), 0.5);
        });
        it('test lower value', function() {
            test.assertNumberAlmostEqual(f(-0.5, 0.0, 1.0), 0.0);
            test.assertNumberAlmostEqual(f(-0.5, 1.0, 0.0), 0.0);
        });
        it('test greater value', function() {
            test.assertNumberAlmostEqual(f(1.5, 0.0, 1.0), 1.0);
            test.assertNumberAlmostEqual(f(1.5, 1.0, 0.0), 1.0);
        });
    });
    describe('cycle', function() {
        var f = math.cycle;
        it('test n > cycle length && shift = 0', function() {
            test.assertNumberAlmostEqual(f(13, 10), 3);
            test.assertNumberAlmostEqual(f(27, 10), 7);
        });
        it('test n < cycle length && shift = 0', function() {
            test.assertNumberAlmostEqual(f(2, 10), 2);
        });
        it('test n == cycle length && shift = 0', function() {
            test.assertNumberAlmostEqual(f(10, 10), 0);
        });
        it('test n > 0 && n < cycle length && shift = 0', function() {
            test.assertNumberAlmostEqual(f(0, 10), 0);
            test.assertNumberAlmostEqual(f(1, 10), 1);
            test.assertNumberAlmostEqual(f(2, 10), 2);
            test.assertNumberAlmostEqual(f(3, 10), 3);
            test.assertNumberAlmostEqual(f(4, 10), 4);
            test.assertNumberAlmostEqual(f(5, 10), 5);
            test.assertNumberAlmostEqual(f(6, 10), 6);
            test.assertNumberAlmostEqual(f(7, 10), 7);
            test.assertNumberAlmostEqual(f(8, 10), 8);
            test.assertNumberAlmostEqual(f(9, 10), 9);
        });
        it('test n < 0 && n < cycle length && shift = 0', function() {
            test.assertNumberAlmostEqual(f(-2, 10), 8);
        });
        it('test n < 0 && n > cycle length && shift = 0', function() {
            test.assertNumberAlmostEqual(f(-13, 10), 7);
        });
        it('test n {-5,9} && shift = 1', function() {
            test.assertNumberAlmostEqual(f(-5, 3, 1), 1);
            test.assertNumberAlmostEqual(f(-4, 3, 1), 2);
            test.assertNumberAlmostEqual(f(-3, 3, 1), 3);
            test.assertNumberAlmostEqual(f(-2, 3, 1), 1);
            test.assertNumberAlmostEqual(f(-1, 3, 1), 2);
            test.assertNumberAlmostEqual(f(0, 3, 1), 3);
            test.assertNumberAlmostEqual(f(1, 3, 1), 1);
            test.assertNumberAlmostEqual(f(2, 3, 1), 2);
            test.assertNumberAlmostEqual(f(3, 3, 1), 3);
            test.assertNumberAlmostEqual(f(4, 3, 1), 1);
            test.assertNumberAlmostEqual(f(5, 3, 1), 2);
            test.assertNumberAlmostEqual(f(6, 3, 1), 3);
            test.assertNumberAlmostEqual(f(7, 3, 1), 1);
            test.assertNumberAlmostEqual(f(8, 3, 1), 2);
            test.assertNumberAlmostEqual(f(9, 3, 1), 3);
        });
    });
    describe('equals', function() {
        var f = math.equals;
        it('test simple', function() {
            test.assertTrue(f(0, 0));
            test.assertTrue(f(0.5, 0.5));
            test.assertTrue(f(0.5000000000000001, 0.5000000000000000));
            test.assertFalse(f(0.5000000000000001, 0.5000000000000000, 0.0));
            test.assertTrue(f(0.505, 0.500, 0.01));
        });
    });
    describe('euclideanDistance', function() {
        var f = math.euclideanDistance;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f([1, 1, 1, 1, 1], [1, 1, 1, 1, 1]), 0.0);
            test.assertNumberAlmostEqual(f([0, 0, 0, 0, 0], [1, 1, 1, 1, 1]), 2.23606797749979);
            test.assertNumberAlmostEqual(f([8, 5, -3], [6, 0, 9]), 13.152946437965905);
        });
    });
    describe('factorial', function() {
        var f = math.factorial;
        it('test 0', function() {
            test.assertNumberAlmostEqual(f(0), 1);
        });
        it('test 1', function() {
            test.assertNumberAlmostEqual(f(1), 1);
        });
        it('test 2', function() {
            test.assertNumberAlmostEqual(f(2), 2);
        });
        it('test 3', function() {
            test.assertNumberAlmostEqual(f(3), 6);
        });
        it('test 4', function() {
            test.assertNumberAlmostEqual(f(4), 24);
        });
        it('test 5', function() {
            test.assertNumberAlmostEqual(f(5), 120);
        });
    });
    describe('gcd', function() {
        var f = math.gcd;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(12, 16), 4);
            test.assertNumberAlmostEqual(f(80, 100), 20);
            test.assertNumberAlmostEqual(f(100, 1000), 100);
        });
    });
    describe('lcm', function() {
        var f = math.lcm;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(2, 9), 18);
            test.assertNumberAlmostEqual(f(5, 10), 10);
            test.assertNumberAlmostEqual(f(10, 15), 30);
        });
    });
    describe('lerp', function() {
        var f = math.lerp;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0, 10, 0.1), 1);
            test.assertNumberAlmostEqual(f(0, 100, 0.75), 75);
            test.assertNumberAlmostEqual(f(50, 60, 0.5), 55);
        });
    });
    describe('map', function() {
        var f = math.map;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0.5, 0.0, 1.0, 0.0, 100.0), 50.0);
            test.assertNumberAlmostEqual(f(0.5, 0.0, 1.0, 50.0, 60.0), 55.0);
            test.assertNumberAlmostEqual(f(2.0, 0.0, 1.0, 0.0, 100.0), 200.0);
        });
    });
    describe('nearest', function() {
        var f = math.nearest;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(5.0, 10.0, 100.0), 10.0);
            test.assertNumberAlmostEqual(f(5.0, 10.0, 100.0), 10.0);
            test.assertNumberAlmostEqual(f(10.0, 10.0, 100.0), 10.0);
            test.assertNumberAlmostEqual(f(50.0, 10.0, 100.0), 10.0);
            test.assertNumberAlmostEqual(f(90.0, 10.0, 100.0), 100.0);
            test.assertNumberAlmostEqual(f(100.0, 10.0, 100.0), 100.0);
            test.assertNumberAlmostEqual(f(200.0, 10.0, 100.0), 100.0);
        });
    });
    describe('normalize', function() {
        var f = math.normalize;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(10.0, 0.0, 30.0), 0.3333333333);
            test.assertNumberAlmostEqual(f(10.0, 0.0, 100.0), 0.1);
            test.assertNumberAlmostEqual(f(60.0, 50.0, 100.0), 0.2);
            test.assertNumberAlmostEqual(f(100.0, 50.0, 100.0), 1.0);
            test.assertNumberAlmostEqual(f(0.0, 50.0, 100.0), -1.0);
        });
    });
    describe('proportion', function() {
        var f = math.proportion;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(null, 100, 100, 1000), 10);
            test.assertNumberAlmostEqual(f(10, null, 100, 1000), 100);
            test.assertNumberAlmostEqual(f(10, 100, null, 1000), 100);
            test.assertNumberAlmostEqual(f(10, 100, 100, null), 1000);
            test.assertNaN(f(null, null, 100, 1000));
            test.assertNaN(f(10, null, null, 1000));
            test.assertNaN(f(10, 100, null, null));
            test.assertNaN(f(null, 100, 100, null));
            test.assertNaN(f(1, 10, 10, 100));
        });
    });
    describe('roundDecimals', function() {
        var f = math.roundDecimals;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0.123456789, 1), 0.1);
            test.assertNumberAlmostEqual(f(0.123456789, 2), 0.12);
            test.assertNumberAlmostEqual(f(0.123456789, 3), 0.123);
            test.assertNumberAlmostEqual(f(0.123456789, 4), 0.1235);
            test.assertNumberAlmostEqual(f(0.123456789, 5), 0.12346);
            test.assertNumberAlmostEqual(f(0.123456789, 6), 0.123457);
            test.assertNumberAlmostEqual(f(0.123456789, 7), 0.1234568);
            test.assertNumberAlmostEqual(f(0.123456789, 8), 0.12345679);
            test.assertNumberAlmostEqual(f(0.123456789, 9), 0.123456789);
        });
    });
    describe('roundToMultiple', function() {
        var f = math.roundToMultiple;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(20, 1), 20);
            test.assertNumberAlmostEqual(f(20, 2), 20);
            test.assertNumberAlmostEqual(f(20, 3), 21);
            test.assertNumberAlmostEqual(f(20, 4), 20);
            test.assertNumberAlmostEqual(f(20, 5), 20);
            test.assertNumberAlmostEqual(f(20, 6), 18);
            test.assertNumberAlmostEqual(f(20, 7), 21);
            test.assertNumberAlmostEqual(f(20, 8), 24);
            test.assertNumberAlmostEqual(f(20, 9), 18);
            test.assertNumberAlmostEqual(f(20, 10), 20);
        });
    });
    describe('roundToNearest', function() {
        var f = math.roundToNearest;
        var values = [-1000, 20, 100, 5, -75, 0, 9, 2000, -300];
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0, values), 0);
            test.assertNumberAlmostEqual(f(-1, values), 0);
            test.assertNumberAlmostEqual(f(1, values), 0);
            test.assertNumberAlmostEqual(f(10, values), 9);
            test.assertNumberAlmostEqual(f(-50, values), -75);
            test.assertNumberAlmostEqual(f(1500, values), 2000);
            test.assertNumberAlmostEqual(f(10000, values), 2000);
            test.assertNumberAlmostEqual(f(-10000, values), -1000);
            test.assertEqual(f(10, []), NaN);
            test.assertNumberAlmostEqual(f(10, [9]), 9);
            test.assertNumberAlmostEqual(f(10, [8, 11]), 11);
        });
    });
    describe('roundToPower', function() {
        var f = math.roundToPower;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0, 2), 0);
            test.assertNumberAlmostEqual(f(10, 2), 8);
            test.assertNumberAlmostEqual(f(20, 2), 16);
            test.assertNumberAlmostEqual(f(30, 2), 32);
            test.assertNumberAlmostEqual(f(40, 2), 32);
            test.assertNumberAlmostEqual(f(50, 2), 64);
            test.assertNumberAlmostEqual(f(60, 2), 64);
            test.assertNumberAlmostEqual(f(70, 2), 64);
            test.assertNumberAlmostEqual(f(80, 2), 64);
            test.assertNumberAlmostEqual(f(90, 2), 64);
            test.assertNumberAlmostEqual(f(100, 2), 128);
        });
    });
    describe('sign', function() {
        var f = math.sign;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(-1.0), -1.0);
            test.assertNumberAlmostEqual(f(-0.5), -1.0);
            test.assertNumberAlmostEqual(f(-0.25), -1.0);
            test.assertNumberAlmostEqual(f(-0.0), 1.0);
            test.assertNumberAlmostEqual(f(0.0), 1.0);
            test.assertNumberAlmostEqual(f(0.25), 1.0);
            test.assertNumberAlmostEqual(f(0.5), 1.0);
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
    });
    describe('summation', function() {
        var f = math.summation;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f([1, 2, 3, 4, 5]), 15);
            test.assertNumberAlmostEqual(f([-1, -2, -3, -4, -5]), -15);
            test.assertNumberAlmostEqual(f([1, 2, 3, 4, -5]), 5);
        });
    });
});