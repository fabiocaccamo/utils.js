var utils = require('../dist/utils.js');
var test = utils.test;
var rgb = utils.color.rgb;
var cmyk = utils.color.cmyk;
var hex = utils.color.hex;

describe('color.rgb', function() {
    describe('average', function() {
        var f = rgb.average;
        it('test simple', function() {
            r = f([{ r:0, g:0, b:0 }, { r:200, g:100, b:50 }, { r:200, g:100, b:50 }]);
            test.assertEqual(r, { r:133, g:67, b:33, a:1.0 });
        });
    });
    describe('distance', function() {
        var f = rgb.distance;
        var r;
        it('test simple', function() {
            r = f({ r:0, g:0, b:0 }, { r:255, g:255, b:255 });
            test.assertNumberAlmostEqual(r, 441.6729559300637);
        });
    });
    describe('gradient', function() {
        var f = rgb.gradient;
        var r;
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
        var r;
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
        var r;
        var a = { r:255, g:255, b:255 }
        var b = { r:255, g:0, b:0 };
        var c = { r:0, g:255, b:0 };
        var d = { r:0, g:0, b:255 };
        it('test interpolate 0.0 - 0.0', function() {
            r = f(a, b, c, d, 0.0, 0.0);
            test.assertEqual(r, { r:255, g:255, b:255, a:1.0 });
        });
        it('test interpolate 0.5 - 0.0', function() {
            r = f(a, b, c, d, 0.5, 0.0);
            test.assertEqual(r, { r:255, g:128, b:128, a:1.0 });
        });
        it('test interpolate 0.0 - 0.5', function() {
            r = f(a, b, c, d, 0.0, 0.5);
            test.assertEqual(r, { r:128, g:255, b:128, a:1.0 });
        });
        it('test interpolate 0.5 - 0.5', function() {
            r = f(a, b, c, d, 0.5, 0.5);
            test.assertEqual(r, { r:128, g:128, b:128, a:1.0 });
        });
        it('test interpolate 1.0 - 1.0', function() {
            r = f(a, b, c, d, 1.0, 1.0);
            test.assertEqual(r, { r:0, g:0, b:255, a:1.0 });
        });
    });
    describe('interpolateLinear', function() {
        var f = rgb.interpolateLinear;
        var r;
        it('test interpolate 0.0', function() {
            r = f({ r:0, g:50, b:100 }, { r:50, g:150, b:200 }, 0.0);
            test.assertEqual(r, { r:0, g:50, b:100, a:1.0 });
        });
        it('test interpolate 0.5', function() {
            r = f({ r:0, g:50, b:100 }, { r:50, g:150, b:200 }, 0.5);
            test.assertEqual(r, { r:25, g:100, b:150, a:1.0 });
        });
        it('test interpolate 1.0', function() {
            r = f({ r:0, g:50, b:100 }, { r:50, g:150, b:200 }, 1.0);
            test.assertEqual(r, { r:50, g:150, b:200, a:1.0 });
        });
    });
    describe('interpolateMultilinear', function() {
        var f = rgb.interpolateMultilinear;
        var r;
        var c = [{ r:255, g:255, b:255 }, { r:255, g:0, b:0 }, { r:0, g:0, b:0 }];
        it('test interpolate 0.0', function() {
            r = f(c, 0.0);
            test.assertEqual(r, { r:255, g:255, b:255, a:1.0 });
        });
        it('test interpolate 0.25', function() {
            r = f(c, 0.25);
            test.assertEqual(r, { r:255, g:128, b:128, a:1.0 });
        });
        it('test interpolate 0.5', function() {
            r = f(c, 0.5);
            test.assertEqual(r, { r:255, g:0, b:0, a:1.0 });
        });
        it('test interpolate 0.75', function() {
            r = f(c, 0.75);
            test.assertEqual(r, { r:128, g:0, b:0, a:1.0 });
        });
        it('test interpolate 1.0', function() {
            r = f(c, 1.0);
            test.assertEqual(r, { r:0, g:0, b:0, a:1.0 });
        });
    });
    describe('nearest', function() {
        var f = rgb.nearest;
        var r;
        it('test simple', function() {
            r = f({ r:50, g:0, b:0 }, [{ r:0, g:0, b:0 }, { r:25, g:0, b:0 }, { r:55, g:10, b:10 }, { r:255, g:255, b:255 }]);
            test.assertEqual(r, { r:55, g:10, b:10 });
        });
    });
    describe('toCmyk', function() {
        var f = rgb.toCmyk;
        var r;
        it('test black', function() {
            r = f({ r:0, g:0, b:0 });
            test.assertEqual(r, { c:0, m:0, y:0, k:100 });
        });
        it('test white', function() {
            r = f({ r:255, g:255, b:255 });
            test.assertEqual(r, { c:0, m:0, y:0, k:0 });
        });
        it('test red', function() {
            r = f({ r:255, g:0, b:0 });
            test.assertEqual(r, { c:0, m:100, y:100, k:0 });
        });
        it('test green', function() {
            r = f({ r:0, g:255, b:0 });
            test.assertEqual(r, { c:100, m:0, y:100, k:0 });
        });
        it('test blue', function() {
            r = f({ r:0, g:0, b:255 });
            test.assertEqual(r, { c:100, m:100, y:0, k:0 });
        });
        it('test gray', function() {
            r = f({ r:63, g:63, b:63 });
            test.assertEqual(r, { c:0, m:0, y:0, k:75 });
        });
        it('test light gray', function() {
            r = f({ r:190, g:190, b:190 });
            test.assertEqual(r, { c:0, m:0, y:0, k:25 });
        });
        it('test dark gray', function() {
            r = f({ r:127, g:127, b:127 });
            test.assertEqual(r, { c:0, m:0, y:0, k:50 });
        });
        it('test back toRgb white', function() {
            r = cmyk.toRgb({ c:0, m:0, y:0, k:0 });
            test.assertEqual(r, { r:255, g:255, b:255, a:1.0 });
        });
        it('test back toRgb black', function() {
            r = cmyk.toRgb({ c:0, m:0, y:0, k:100 });
            test.assertEqual(r, { r:0, g:0, b:0, a:1.0 });
        });
        it('test back toRgb random color', function() {
            r = cmyk.toRgb(f({ r:34, g:127, b:76, a:1.0 }));
            test.assertEqual(r, { r:34, g:127, b:76, a:1.0 });
        });
    });
    // describe('toGrayscale', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('toHex', function() {
        var f = rgb.toHex;
        var r;
        it('test alpha 0%', function() {
            r = f({ r:0, g:0, b:0, a:0 });
            test.assertEqual(r, '#00000000');
        });
        it('test alpha 50%', function() {
            r = f({ r:0, g:0, b:0, a:0.5 });
            test.assertEqual(r, '#80000000');
        });
        it('test alpha 100%', function() {
            r = f({ r:0, g:0, b:0, a:1 });
            test.assertEqual(r, '#000000');
        });
        it('test black', function() {
            r = f({ r:0, g:0, b:0 });
            test.assertEqual(r, '#000000');
        });
        it('test white', function() {
            r = f({ r:255, g:255, b:255 });
            test.assertEqual(r, '#FFFFFF');
        });
        it('test red', function() {
            r = f({ r:255, g:0, b:0 });
            test.assertEqual(r, '#FF0000');
        });
        it('test green', function() {
            r = f({ r:0, g:255, b:0 });
            test.assertEqual(r, '#00FF00');
        });
        it('test blue', function() {
            r = f({ r:0, g:0, b:255 });
            test.assertEqual(r, '#0000FF');
        });
        it('test prefix', function() {
            r = f({ r:0, g:0, b:0 }, '0x');
            test.assertEqual(r, '0x000000');
        });
        it('test back toRgb white', function() {
            r = hex.toRgb(f({ r:255, g:255, b:255 }));
            test.assertEqual(r, { r:255, g:255, b:255, a:1.0 });
        });
        it('test back toRgb black', function() {
            r = hex.toRgb(f({ r:0, g:0, b:0 }));
            test.assertEqual(r, { r:0, g:0, b:0, a:1.0 });
        });
        it('test back toRgb random color', function() {
            r = hex.toRgb(f({ r:34, g:127, b:76 }));
            test.assertEqual(r, { r:34, g:127, b:76, a:1.0 });
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
    describe('toString', function() {
        var f = rgb.toString;
        var r;
        it('test alpha', function() {
            r = f({ r:0, g:0, b:0, a:0.5 });
            test.assertEqual(r, '{ r:0, g:0, b:0, a:0.5 }');
        });
        it('test black', function() {
            r = f({ r:0, g:0, b:0 });
            test.assertEqual(r, '{ r:0, g:0, b:0, a:1 }');
        });
        it('test white', function() {
            r = f({ r:255, g:255, b:255 });
            test.assertEqual(r, '{ r:255, g:255, b:255, a:1 }');
        });
        it('test red', function() {
            r = f({ r:255, g:0, b:0 });
            test.assertEqual(r, '{ r:255, g:0, b:0, a:1 }');
        });
        it('test green', function() {
            r = f({ r:0, g:255, b:0 });
            test.assertEqual(r, '{ r:0, g:255, b:0, a:1 }');
        });
        it('test blue', function() {
            r = f({ r:0, g:0, b:255 });
            test.assertEqual(r, '{ r:0, g:0, b:255, a:1 }');
        });
    });
    describe('toStringCSS', function() {
        var f = rgb.toStringCSS;
        var r;
        it('test alpha', function() {
            r = f({ r:0, g:0, b:0, a:0.5 });
            test.assertEqual(r, 'rgba(0, 0, 0, 0.5)');
        });
        it('test black', function() {
            r = f({ r:0, g:0, b:0 });
            test.assertEqual(r, 'rgba(0, 0, 0, 1)');
        });
        it('test white', function() {
            r = f({ r:255, g:255, b:255 });
            test.assertEqual(r, 'rgba(255, 255, 255, 1)');
        });
        it('test red', function() {
            r = f({ r:255, g:0, b:0 });
            test.assertEqual(r, 'rgba(255, 0, 0, 1)');
        });
        it('test green', function() {
            r = f({ r:0, g:255, b:0 });
            test.assertEqual(r, 'rgba(0, 255, 0, 1)');
        });
        it('test blue', function() {
            r = f({ r:0, g:0, b:255 });
            test.assertEqual(r, 'rgba(0, 0, 255, 1)');
        });
    });
});