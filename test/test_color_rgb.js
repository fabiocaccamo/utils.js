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
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('gradientMatrix', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('interpolateBilinear', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('interpolateLinear', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('interpolateMultilinear', function() {
        it('TODO', function() {
            test.assertTrue(true);
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
            test.assertEqual(s, '#FF000000');
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