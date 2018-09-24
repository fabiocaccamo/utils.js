var utils = require('../dist/utils.js');
var test = utils.test;
var rgb = utils.color.rgb;

describe('color.rgb', function() {
    describe('average', function() {
        var f = rgb.average;
        it('test simple', function() {
            var c = f([{ r:0, g:0, b:0 }, { r:200, g:100, b:50 }, { r:200, g:100, b:50 }]);
            test.assertNumberAlmostEqual(c.r, 133);
            test.assertNumberAlmostEqual(c.g, 67);
            test.assertNumberAlmostEqual(c.b, 33);
        });
    });
    describe('distance', function() {
        var f = rgb.distance;
        it('test simple', function() {
            var d = f({ r:0, g:0, b:0 }, { r:255, g:255, b:255 });
            test.assertNumberAlmostEqual(d, 441.6729559300637);
        });
    });
    describe('gradient', function() {
        var f = rgb.gradient;
        it('test 2 colors and 1 step', function() {
            r = f([{ r:255, g:0, b:0 }, { r:0, g:255, b:0 }], 1);
            test.assertEqual(r, [{ r:255, g:0, b:0, a:1 }]);
        });
        it('test 2 colors and 2 steps', function() {
            r = f([{ r:255, g:0, b:0 }, { r:0, g:255, b:0 }], 2);
            test.assertEqual(r, [{ r:255, g:0, b:0, a:1 }, { r:0, g:255, b:0, a:1 }]);
        });
        it('test 2 colors and 3 steps', function() {
            r = f([{ r:255, g:0, b:0 }, { r:0, g:255, b:0 }], 3);
            test.assertEqual(r, [{ r:255, g:0, b:0, a:1 }, { r:128, g:128, b:0, a:1 }, { r:0, g:255, b:0, a:1 }]);
        });
        it('test 2 colors and 4 steps', function() {
            r = f([{ r:255, g:0, b:0 }, { r:0, g:255, b:0 }], 4);
            test.assertEqual(r, [{ r:255, g:0, b:0, a:1 }, { r:170, g:85, b:0, a:1 }, { r:85, g:170, b:0, a:1 }, { r:0, g:255, b:0, a:1 }]);
        });
    });
    describe('gradientMatrix', function() {
        var f = rgb.gradientMatrix;
        it('test 5x4 matrix with 4 required points', function() {
            r = f({
                topLeft: { r:255, g:0, b:0 },
                topRight: { r:0, g:255, b:0 },
                bottomRight: { r:0, g:0, b:255 },
                bottomLeft: { r:255, g:255, b:0 }
            }, 5, 4);
            test.assertEqual(r, [
                [{ r:255, g:0, b:0, a:1 }, { r:192, g:64, b:0, a:1 }, { r:128, g:128, b:0, a:1 }, { r:64, g:192, b:0, a:1 }, { r:0, g:255, b:0, a:1}],
                [{ r:255, g:85, b:0, a:1 }, { r:192, g:107, b:22, a:1 }, { r:128, g:128, b:43, a:1 }, { r:64, g:149, b:64, a:1 }, { r:0, g:170, b:85, a:1}],
                [{ r:255, g:170, b:0, a:1 }, { r:192, g:149, b:43, a:1 }, { r:128, g:128, b:85, a:1 }, { r:64, g:107, b:128, a:1 }, { r:0, g:85, b:170, a:1}],
                [{ r:255, g:255, b:0, a:1 }, { r:192, g:192, b:64, a:1 }, { r:128, g:128, b:128, a:1 }, { r:64, g:64, b:192, a:1 }, { r:0, g:0, b:255, a:1 }]
            ]);
        });
        it('test 5x4 matrix with 4 required points and optional points', function() {
            // TODO
        });
        it('test invalid points', function() {
            // TODO
        });
    });
    describe('interpolateBilinear', function() {
        var f = rgb.interpolateBilinear;
        var a = { r:255, g:255, b:255 }
        var b = { r:255, g:0, b:0 };
        var c = { r:0, g:255, b:0 };
        var d = { r:0, g:0, b:255 };
        it('test interpolate 0.0 - 0.0', function() {
            r = f(a, b, c, d, 0.0, 0.0);
            test.assertNumberAlmostEqual(r.r, 255);
            test.assertNumberAlmostEqual(r.g, 255);
            test.assertNumberAlmostEqual(r.b, 255);
        });
        it('test interpolate 0.5 - 0.0', function() {
            r = f(a, b, c, d, 0.5, 0.0);
            test.assertNumberAlmostEqual(r.r, 255);
            test.assertNumberAlmostEqual(r.g, 128);
            test.assertNumberAlmostEqual(r.b, 128);
        });
        it('test interpolate 0.0 - 0.5', function() {
            r = f(a, b, c, d, 0.0, 0.5);
            test.assertNumberAlmostEqual(r.r, 128);
            test.assertNumberAlmostEqual(r.g, 255);
            test.assertNumberAlmostEqual(r.b, 128);
        });
        it('test interpolate 0.5 - 0.5', function() {
            r = f(a, b, c, d, 0.5, 0.5);
            test.assertNumberAlmostEqual(r.r, 128);
            test.assertNumberAlmostEqual(r.g, 128);
            test.assertNumberAlmostEqual(r.b, 128);
        });
        it('test interpolate 1.0 - 1.0', function() {
            r = f(a, b, c, d, 1.0, 1.0);
            test.assertNumberAlmostEqual(r.r, 0);
            test.assertNumberAlmostEqual(r.g, 0);
            test.assertNumberAlmostEqual(r.b, 255);
        });
    });
    describe('interpolateLinear', function() {
        var f = rgb.interpolateLinear;
        it('test interpolate 0.0', function() {
            r = f({ r:0, g:50, b:100 }, { r:50, g:150, b:200 }, 0.0);
            test.assertNumberAlmostEqual(r.r, 0);
            test.assertNumberAlmostEqual(r.g, 50);
            test.assertNumberAlmostEqual(r.b, 100);
        });
        it('test interpolate 0.5', function() {
            r = f({ r:0, g:50, b:100 }, { r:50, g:150, b:200 }, 0.5);
            test.assertNumberAlmostEqual(r.r, 25);
            test.assertNumberAlmostEqual(r.g, 100);
            test.assertNumberAlmostEqual(r.b, 150);
        });
        it('test interpolate 1.0', function() {
            r = f({ r:0, g:50, b:100 }, { r:50, g:150, b:200 }, 1.0);
            test.assertNumberAlmostEqual(r.r, 50);
            test.assertNumberAlmostEqual(r.g, 150);
            test.assertNumberAlmostEqual(r.b, 200);
        });
    });
    describe('interpolateMultilinear', function() {
        var f = rgb.interpolateMultilinear;
        var c = [{ r:255, g:255, b:255 }, { r:255, g:0, b:0 }, { r:0, g:0, b:0 }];
        it('test interpolate 0.0', function() {
            r = f(c, 0.0);
            test.assertNumberAlmostEqual(r.r, 255);
            test.assertNumberAlmostEqual(r.g, 255);
            test.assertNumberAlmostEqual(r.b, 255);
        });
        it('test interpolate 0.25', function() {
            r = f(c, 0.25);
            test.assertNumberAlmostEqual(r.r, 255);
            test.assertNumberAlmostEqual(r.g, 128);
            test.assertNumberAlmostEqual(r.b, 128);
        });
        it('test interpolate 0.5', function() {
            r = f(c, 0.5);
            test.assertNumberAlmostEqual(r.r, 255);
            test.assertNumberAlmostEqual(r.g, 0);
            test.assertNumberAlmostEqual(r.b, 0);
        });
        it('test interpolate 0.75', function() {
            r = f(c, 0.75);
            test.assertNumberAlmostEqual(r.r, 128);
            test.assertNumberAlmostEqual(r.g, 0);
            test.assertNumberAlmostEqual(r.b, 0);
        });
        it('test interpolate 1.0', function() {
            r = f(c, 1.0);
            test.assertNumberAlmostEqual(r.r, 0);
            test.assertNumberAlmostEqual(r.g, 0);
            test.assertNumberAlmostEqual(r.b, 0);
        });
    });
    describe('nearest', function() {
        var f = rgb.nearest;
        it('test simple', function() {
            var c = f({ r:50, g:0, b:0 }, [{ r:0, g:0, b:0 }, { r:25, g:0, b:0 }, { r:55, g:10, b:10 }, { r:255, g:255, b:255 }]);
            test.assertNumberAlmostEqual(c.r, 55);
            test.assertNumberAlmostEqual(c.g, 10);
            test.assertNumberAlmostEqual(c.b, 10);
        });
    });
    describe('toCmyk', function() {
        var f = rgb.toCmyk;
        var c;
        it('test black', function() {
            c = f({ r:0, g:0, b:0 });
            test.assertNumberAlmostEqual(c.c, 0);
            test.assertNumberAlmostEqual(c.m, 0);
            test.assertNumberAlmostEqual(c.y, 0);
            test.assertNumberAlmostEqual(c.k, 100);
        });
        it('test white', function() {
            c = f({ r:255, g:255, b:255 });
            test.assertNumberAlmostEqual(c.c, 0);
            test.assertNumberAlmostEqual(c.m, 0);
            test.assertNumberAlmostEqual(c.y, 0);
            test.assertNumberAlmostEqual(c.k, 0);
        });
        it('test red', function() {
            c = f({ r:255, g:0, b:0 });
            test.assertNumberAlmostEqual(c.c, 0);
            test.assertNumberAlmostEqual(c.m, 100);
            test.assertNumberAlmostEqual(c.y, 100);
            test.assertNumberAlmostEqual(c.k, 0);
        });
        it('test green', function() {
            c = f({ r:0, g:255, b:0 });
            test.assertNumberAlmostEqual(c.c, 100);
            test.assertNumberAlmostEqual(c.m, 0);
            test.assertNumberAlmostEqual(c.y, 100);
            test.assertNumberAlmostEqual(c.k, 0);
        });
        it('test blue', function() {
            c = f({ r:0, g:0, b:255 });
            test.assertNumberAlmostEqual(c.c, 100);
            test.assertNumberAlmostEqual(c.m, 100);
            test.assertNumberAlmostEqual(c.y, 0);
            test.assertNumberAlmostEqual(c.k, 0);
        });
    });
    // describe('toGrayscale', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('toHex', function() {
        var f = rgb.toHex;
        var s;
        it('test alpha 0%', function() {
            s = f({ r:0, g:0, b:0, a:0 });
            test.assertEqual(s, '#00000000');
        });
        it('test alpha 50%', function() {
            s = f({ r:0, g:0, b:0, a:0.5 });
            test.assertEqual(s, '#80000000');
        });
        it('test alpha 100%', function() {
            s = f({ r:0, g:0, b:0, a:1 });
            test.assertEqual(s, '#000000');
        });
        it('test black', function() {
            s = f({ r:0, g:0, b:0 });
            test.assertEqual(s, '#000000');
        });
        it('test white', function() {
            s = f({ r:255, g:255, b:255 });
            test.assertEqual(s, '#FFFFFF');
        });
        it('test red', function() {
            s = f({ r:255, g:0, b:0 });
            test.assertEqual(s, '#FF0000');
        });
        it('test green', function() {
            s = f({ r:0, g:255, b:0 });
            test.assertEqual(s, '#00FF00');
        });
        it('test blue', function() {
            s = f({ r:0, g:0, b:255 });
            test.assertEqual(s, '#0000FF');
        });
        it('test prefix', function() {
            s = f({ r:0, g:0, b:0 }, '0x');
            test.assertEqual(s, '0x000000');
        });
    });
    // describe('toHsl', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    // describe('toHsv', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('toRgb', function() {
        var f = rgb.toRgb;
        it('test simple', function() {
            var i = { r:250, g:30, b:55 };
            var o = f(i);
            test.assertFalse(i === o);
            test.assertNumberAlmostEqual(i.r, 250);
            test.assertNumberAlmostEqual(i.g, 30);
            test.assertNumberAlmostEqual(i.b, 55);
        });
    });
    describe('toString', function() {
        var f = rgb.toString;
        var s;
        it('test alpha', function() {
            s = f({ r:0, g:0, b:0, a:0.5 });
            test.assertEqual(s, '{ r:0, g:0, b:0, a:0.5 }');
        });
        it('test black', function() {
            s = f({ r:0, g:0, b:0 });
            test.assertEqual(s, '{ r:0, g:0, b:0, a:1 }');
        });
        it('test white', function() {
            s = f({ r:255, g:255, b:255 });
            test.assertEqual(s, '{ r:255, g:255, b:255, a:1 }');
        });
        it('test red', function() {
            s = f({ r:255, g:0, b:0 });
            test.assertEqual(s, '{ r:255, g:0, b:0, a:1 }');
        });
        it('test green', function() {
            s = f({ r:0, g:255, b:0 });
            test.assertEqual(s, '{ r:0, g:255, b:0, a:1 }');
        });
        it('test blue', function() {
            s = f({ r:0, g:0, b:255 });
            test.assertEqual(s, '{ r:0, g:0, b:255, a:1 }');
        });
    });
    describe('toStringCSS', function() {
        var f = rgb.toStringCSS;
        var s;
        it('test alpha', function() {
            s = f({ r:0, g:0, b:0, a:0.5 });
            test.assertEqual(s, 'rgba(0, 0, 0, 0.5)');
        });
        it('test black', function() {
            s = f({ r:0, g:0, b:0 });
            test.assertEqual(s, 'rgba(0, 0, 0, 1)');
        });
        it('test white', function() {
            s = f({ r:255, g:255, b:255 });
            test.assertEqual(s, 'rgba(255, 255, 255, 1)');
        });
        it('test red', function() {
            s = f({ r:255, g:0, b:0 });
            test.assertEqual(s, 'rgba(255, 0, 0, 1)');
        });
        it('test green', function() {
            s = f({ r:0, g:255, b:0 });
            test.assertEqual(s, 'rgba(0, 255, 0, 1)');
        });
        it('test blue', function() {
            s = f({ r:0, g:0, b:255 });
            test.assertEqual(s, 'rgba(0, 0, 255, 1)');
        });
    });
});