var utils = require('../dist/utils.js');
var test = utils.test;
var hex = utils.color.hex;
var cmyk = utils.color.cmyk;
var rgb = utils.color.rgb;

describe('color.hex', function() {
    describe('average', function() {
        var f = hex.average;
        var r;
        it('test simple', function() {
            r = f(['#000000', '#C86432', '#C86432']);
            test.assertEqual(r, '#854321');
        });
    });
    describe('distance', function() {
        var f = hex.distance;
        var r;
        it('test simple', function() {
            r = f('#000000', '#FFFFFF');
            test.assertNumberAlmostEqual(r, 441.6729559300637);
        });
    });
    describe('gradient', function() {
        var f = hex.gradient;
        var r;
        it('test 2 colors and 1 step', function() {
            r = f(['#FF0000', '#00FF00'], 1);
            test.assertEqual(r, ['#FF0000']);
        });
        it('test 2 colors and 2 steps', function() {
            r = f(['#FF0000', '#00FF00'], 2);
            test.assertEqual(r, ['#FF0000', '#00FF00']);
        });
        it('test 2 colors and 3 steps', function() {
            r = f(['#FF0000', '#00FF00'], 3);
            test.assertEqual(r, ['#FF0000', '#808000', '#00FF00']);
        });
        it('test 2 colors and 4 steps', function() {
            r = f(['#FF0000', '#00FF00'], 4);
            test.assertEqual(r, ['#FF0000', '#AA5500', '#55AA00', '#00FF00']);
        });
    });
    describe('gradientMatrix', function() {
        var f = hex.gradientMatrix;
        var r;
        it('test 5x4 matrix with 4 required points', function() {
            r = f({
                topLeft: '#FF0000',
                topRight: '#00FF00',
                bottomRight: '#0000FF',
                bottomLeft: '#000000'
            }, 5, 4);
            test.assertEqual(r, [
                ['#FF0000', '#C04000', '#808000', '#40C000', '#00FF00'],
                ['#AA0000', '#802B16', '#55552B', '#2B8040', '#00AA55'],
                ['#550000', '#40162B', '#2B2B55', '#164080', '#0055AA'],
                ['#000000', '#000040', '#000080', '#0000C0', '#0000FF']
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
        var f = hex.interpolateBilinear;
        var r;
        var a = '#FFFFFF';
        var b = '#FF0000';
        var c = '#00FF00';
        var d = '#0000FF';
        it('test interpolate 0.0 - 0.0', function() {
            r = f(a, b, c, d, 0.0, 0.0);
            test.assertEqual(r, '#FFFFFF');
        });
        it('test interpolate 0.5 - 0.0', function() {
            r = f(a, b, c, d, 0.5, 0.0);
            test.assertEqual(r, '#FF8080');
        });
        it('test interpolate 0.0 - 0.5', function() {
            r = f(a, b, c, d, 0.0, 0.5);
            test.assertEqual(r, '#80FF80');
        });
        it('test interpolate 0.5 - 0.5', function() {
            r = f(a, b, c, d, 0.5, 0.5);
            test.assertEqual(r, '#808080');
        });
        it('test interpolate 1.0 - 1.0', function() {
            r = f(a, b, c, d, 1.0, 1.0);
            test.assertEqual(r, '#0000FF');
        });
    });
    describe('interpolateLinear', function() {
        var f = hex.interpolateLinear;
        var r;
        it('test interpolate 0.0', function() {
            r = f('#003264', '#3296C8', 0.0);
            test.assertEqual(r, '#003264');
        });
        it('test interpolate 0.5', function() {
            r = f('#003264', '#3296C8', 0.5);
            test.assertEqual(r, '#196496');
        });
        it('test interpolate 1.0', function() {
            r = f('#003264', '#3296C8', 1.0);
            test.assertEqual(r, '#3296C8');
        });
    });
    describe('interpolateMultilinear', function() {
        var f = hex.interpolateMultilinear;
        var r;
        var c = ['#FFFFFF', '#FF0000', '#000000'];
        it('test interpolate 0.0', function() {
            r = f(c, 0.0);
            test.assertEqual(r, '#FFFFFF');
        });
        it('test interpolate 0.25', function() {
            r = f(c, 0.25);
            test.assertEqual(r, '#FF8080');
        });
        it('test interpolate 0.5', function() {
            r = f(c, 0.5);
            test.assertEqual(r, '#FF0000');
        });
        it('test interpolate 0.75', function() {
            r = f(c, 0.75);
            test.assertEqual(r, '#800000');
        });
        it('test interpolate 1.0', function() {
            r = f(c, 1.0);
            test.assertEqual(r, '#000000');
        });
    });
    describe('nearest', function() {
        var f = hex.nearest;
        var r;
        it('test simple', function() {
            r = f('#320000', ['#000000', '#190000', '#370A0A', '#FFFFFF']);
            test.assertEqual(r, '#370A0A');
        });
    });
    describe('toCmyk', function() {
        var f = hex.toCmyk;
        var r;
        it('test black', function() {
            r = f('#000000');
            test.assertEqual(r, { c:0, m:0, y:0, k:100 });
        });
        it('test white', function() {
            r = f('#FFFFFF');
            test.assertEqual(r, { c:0, m:0, y:0, k:0 });
        });
        it('test red', function() {
            r = f('#FF0000');
            test.assertEqual(r, { c:0, m:100, y:100, k:0 });
        });
        it('test green', function() {
            r = f('#00FF00');
            test.assertEqual(r, { c:100, m:0, y:100, k:0 });
        });
        it('test blue', function() {
            r = f('#0000FF');
            test.assertEqual(r, { c:100, m:100, y:0, k:0 });
        });
        it('test gray', function() {
            r = f('#404040');
            test.assertEqual(r, { c:0, m:0, y:0, k:75 });
        });
        it('test light gray', function() {
            r = f('#BFBFBF');
            test.assertEqual(r, { c:0, m:0, y:0, k:25 });
        });
        it('test dark gray', function() {
            r = f('#7F7F7F');
            test.assertEqual(r, { c:0, m:0, y:0, k:50 });
        });
        it('test back toHex white', function() {
            r = cmyk.toHex(f('#FFFFFF'));
            test.assertEqual(r, '#FFFFFF');
        });
        it('test back toHex black', function() {
            r = cmyk.toHex(f('#000000'));
            test.assertEqual(r, '#000000');
        });
        it('test back toHex red', function() {
            r = cmyk.toHex(f('#FF0000'));
            test.assertEqual(r, '#FF0000');
        });
        it('test back toHex green', function() {
            r = cmyk.toHex(f('#00FF00'));
            test.assertEqual(r, '#00FF00');
        });
        it('test back toHex blue', function() {
            r = cmyk.toHex(f('#0000FF'));
            test.assertEqual(r, '#0000FF');
        });
        // it('test back toHex random color', function() {
        //     // console.log(hex.distance('#47CC9B', '#47CB9A'));
        //     r = cmyk.toHex(f('#47CB9A'));
        //     test.assertEqual(r, '#47CB9A');
        // });
    });
    // describe('toGrayscale', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
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
        var f = hex.toRgb;
        var r;
        it('test alpha 0%', function() {
            r = f('#00000000');
            test.assertEqual(r, { r:0, g:0, b:0, a:0 });
        });
        it('test alpha 50%', function() {
            r = f('#80000000');
            test.assertEqual(r, { r:0, g:0, b:0, a:0.5 });
        });
        it('test alpha 100%', function() {
            r = f('#000000');
            test.assertEqual(r, { r:0, g:0, b:0, a:1 });
        });
        it('test black', function() {
            r = f('#000000');
            test.assertEqual(r, { r:0, g:0, b:0, a:1.0 });
        });
        it('test white', function() {
            r = f('#FFFFFF');
            test.assertEqual(r, { r:255, g:255, b:255, a:1.0 });
        });
        it('test red', function() {
            r = f('#FF0000');
            test.assertEqual(r, { r:255, g:0, b:0, a:1.0 });
        });
        it('test green', function() {
            r = f('#00FF00');
            test.assertEqual(r, { r:0, g:255, b:0, a:1.0 });
        });
        it('test blue', function() {
            r = f('#0000FF');
            test.assertEqual(r, { r:0, g:0, b:255, a:1.0 });
        });
        it('test prefix', function() {
            r = f('0x000000');
            test.assertEqual(r, { r:0, g:0, b:0, a:1.0 });
        });
    });
    describe('toString', function() {
        var f = hex.toString;
        var s;
        it('test alpha and prefix with numeric color value', function() {
            s = f(0x80FF0000, '#');
            test.assertEqual(s, '#80FF0000');

            s = f(0x80FF0000, '0x');
            test.assertEqual(s, '0x80FF0000');
        });
        it('test alpha and prefix with string color value', function() {
            s = f('0x80FF0000', '#');
            test.assertEqual(s, '#80FF0000');

            s = f('0x80FF0000', '0x');
            test.assertEqual(s, '0x80FF0000');

            s = f('#80FF0000', '#');
            test.assertEqual(s, '#80FF0000');

            s = f('#80FF0000', '0x');
            test.assertEqual(s, '0x80FF0000');
        });
    });
    describe('toStringCSS', function() {
        var f = hex.toStringCSS;
        var s;
        it('test alpha and prefix with numeric color value', function() {
            s = f(0x80FF0000);
            test.assertEqual(s, '#80FF0000');
        });
        it('test alpha and prefix with string color value', function() {
            s = f('0x80FF0000');
            test.assertEqual(s, '#80FF0000');

            s = f('#80FF0000');
            test.assertEqual(s, '#80FF0000');
        });
    });
});