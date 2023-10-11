var utils = require('../dist/utils.js');
var test = utils.test;
var scope = utils.math.interpolation;

describe('interpolation', function () {
    describe('bilinear', function () {
        var f = scope.bilinear;
        var a = 0.0;
        var b = 100.0;
        var c = 500.0;
        var d = 1000.0;

        it('x 0.0 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 0.0), 0.0);
        });
        it('x 0.2 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.2, 0.0), 20.0);
        });
        it('x 0.4 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.4, 0.0), 40.0);
        });
        it('x 0.6 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.6, 0.0), 60.0);
        });
        it('x 0.8 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.8, 0.0), 80.0);
        });
        it('x 1.0 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 0.0), 100.0);
        });

        it('x 0.0 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 1.0), 500.0);
        });
        it('x 0.2 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.2, 1.0), 600.0);
        });
        it('x 0.4 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.4, 1.0), 700.0);
        });
        it('x 0.6 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.6, 1.0), 800.0);
        });
        it('x 0.8 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.8, 1.0), 900.0);
        });
        it('x 1.0 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 1.0), 1000.0);
        });

        it('x 0.0 - y 0.2', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 0.2), 100.0);
        });
        it('x 0.0 - y 0.4', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 0.4), 200.0);
        });
        it('x 0.0 - y 0.6', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 0.6), 300.0);
        });
        it('x 0.0 - y 0.8', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 0.8), 400.0);
        });
        it('x 0.0 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 1.0), 500.0);
        });
        it('x 1.0 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 1.0), 1000.0);
        });

        it('x 1.0 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 0.0), 100.0);
        });
        it('x 1.0 - y 0.2', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 0.2), 280.0);
        });
        it('x 1.0 - y 0.4', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 0.4), 460.0);
        });
        it('x 1.0 - y 0.6', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 0.6), 640.0);
        });
        it('x 1.0 - y 0.8', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 0.8), 820.0);
        });
        it('x 1.0 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 1.0), 1000.0);
        });

        it('x 0.0 - y 0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.0, 0.0), 0.0);
        });
        it('x 0.2 - y 0.2', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.2, 0.2), 136.0);
        });
        it('x 0.4 - y 0.4', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.4, 0.4), 304.0);
        });
        it('x 0.6 - y 0.6', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.6, 0.6), 504.0);
        });
        it('x 0.8 - y 0.8', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 0.8, 0.8), 736.0);
        });
        it('x 1.0 - y 1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, c, d, 1.0, 1.0), 1000.0);
        });
    });
    describe('linear', function () {
        var f = scope.linear;
        var a = 0.0;
        var b = 100.0;
        it('0.0', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.0), 0.0);
        });
        it('0.1', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.1), 10.0);
        });
        it('0.2', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.2), 20.0);
        });
        it('0.3', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.3), 30.0);
        });
        it('0.4', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.4), 40.0);
        });
        it('0.5', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.5), 50.0);
        });
        it('0.6', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.6), 60.0);
        });
        it('0.7', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.7), 70.0);
        });
        it('0.8', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.8), 80.0);
        });
        it('0.9', function () {
            test.assertNumberAlmostEqual(f(a, b, 0.9), 90.0);
        });
        it('1.0', function () {
            test.assertNumberAlmostEqual(f(a, b, 1.0), 100.0);
        });
    });
    describe('multilinear', function () {
        var f = scope.multilinear;
        var a = 0.0;
        var b = 10.0;
        var c = 60.0;
        it('0.0', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.0), 0.0);
        });
        it('0.1', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.1), 2.0);
        });
        it('0.2', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.2), 4.0);
        });
        it('0.3', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.3), 6.0);
        });
        it('0.4', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.4), 8.0);
        });
        it('0.5', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.5), 10.0);
        });
        it('0.6', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.6), 20.0);
        });
        it('0.7', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.7), 30.0);
        });
        it('0.8', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.8), 40.0);
        });
        it('0.9', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 0.9), 50.0);
        });
        it('1.0', function () {
            test.assertNumberAlmostEqual(f([a, b, c], 1.0), 60.0);
        });
    });
    describe('scalar', function () {
        var f = scope.scalar;
        var p = 10;
        var s;
        it('0.0', function () {
            s = f(p, 0.0);
            test.assertEqual(s.index, 0);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.05', function () {
            s = f(p, 0.05);
            test.assertEqual(s.index, 0);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.1', function () {
            s = f(p, 0.1);
            test.assertEqual(s.index, 1);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.15', function () {
            s = f(p, 0.15);
            test.assertEqual(s.index, 1);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.2', function () {
            s = f(p, 0.2);
            test.assertEqual(s.index, 2);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.25', function () {
            s = f(p, 0.25);
            test.assertEqual(s.index, 2);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.3', function () {
            s = f(p, 0.3);
            test.assertEqual(s.index, 3);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.35', function () {
            s = f(p, 0.35);
            test.assertEqual(s.index, 3);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.4', function () {
            s = f(p, 0.4);
            test.assertEqual(s.index, 4);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.45', function () {
            s = f(p, 0.45);
            test.assertEqual(s.index, 4);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.5', function () {
            s = f(p, 0.5);
            test.assertEqual(s.index, 5);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.55', function () {
            s = f(p, 0.55);
            test.assertEqual(s.index, 5);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.6', function () {
            s = f(p, 0.6);
            test.assertEqual(s.index, 6);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.65', function () {
            s = f(p, 0.65);
            test.assertEqual(s.index, 6);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.7', function () {
            s = f(p, 0.7);
            test.assertEqual(s.index, 7);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.75', function () {
            s = f(p, 0.75);
            test.assertEqual(s.index, 7);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.8', function () {
            s = f(p, 0.8);
            test.assertEqual(s.index, 8);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.85', function () {
            s = f(p, 0.85);
            test.assertEqual(s.index, 8);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('0.9', function () {
            s = f(p, 0.9);
            test.assertEqual(s.index, 9);
            test.assertNumberAlmostEqual(s.t, 0.0);
        });
        it('0.95', function () {
            s = f(p, 0.95);
            test.assertEqual(s.index, 9);
            test.assertNumberAlmostEqual(s.t, 0.5);
        });
        it('1.0', function () {
            s = f(p, 1.0);
            test.assertEqual(s.index, 9);
            test.assertNumberAlmostEqual(s.t, 1.0);
        });
    });
});
