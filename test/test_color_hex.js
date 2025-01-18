import utils from '../src/utils.js';
const test = utils.test;
const hex = utils.color.hex;
const cmyk = utils.color.cmyk;
const rgb = utils.color.rgb;

describe('color.hex', () => {
    describe('average', () => {
        const f = hex.average;
        let r;
        it('test simple', () => {
            r = f(['#000000', '#C86432', '#C86432']);
            test.assertEqual(r, '#854321');
        });
    });
    describe('distance', () => {
        const f = hex.distance;
        let r;
        it('test simple', () => {
            r = f('#000000', '#FFFFFF');
            test.assertNumberAlmostEqual(r, 441.6729559300637);
        });
    });
    describe('gradient', () => {
        const f = hex.gradient;
        let r;
        it('test 2 colors and 1 step', () => {
            r = f(['#FF0000', '#00FF00'], 1);
            test.assertEqual(r, ['#FF0000']);
        });
        it('test 2 colors and 2 steps', () => {
            r = f(['#FF0000', '#00FF00'], 2);
            test.assertEqual(r, ['#FF0000', '#00FF00']);
        });
        it('test 2 colors and 3 steps', () => {
            r = f(['#FF0000', '#00FF00'], 3);
            test.assertEqual(r, ['#FF0000', '#808000', '#00FF00']);
        });
        it('test 2 colors and 4 steps', () => {
            r = f(['#FF0000', '#00FF00'], 4);
            test.assertEqual(r, ['#FF0000', '#AA5500', '#55AA00', '#00FF00']);
        });
    });
    describe('gradientMatrix', () => {
        const f = hex.gradientMatrix;
        let r;
        it('test 5x4 matrix with 4 required points', () => {
            r = f(
                {
                    topLeft: '#FF0000',
                    topRight: '#00FF00',
                    bottomRight: '#0000FF',
                    bottomLeft: '#000000',
                },
                5,
                4
            );
            test.assertEqual(r, [
                ['#FF0000', '#C04000', '#808000', '#40C000', '#00FF00'],
                ['#AA0000', '#802B16', '#55552B', '#2B8040', '#00AA55'],
                ['#550000', '#40162B', '#2B2B55', '#164080', '#0055AA'],
                ['#000000', '#000040', '#000080', '#0000C0', '#0000FF'],
            ]);
        });
        it('test 5x4 matrix with 4 required points and 4 optional points', () => {
            r = f(
                {
                    topLeft: '#FF0000',
                    top: '#FFFF00',
                    topRight: '#00FF00',
                    right: '#00FFFF',
                    bottomRight: '#0000FF',
                    bottom: '#FFFFFF',
                    bottomLeft: '#000000',
                    left: '#FF00FF',
                },
                5,
                4
            );
            test.assertEqual(r, [
                ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00'],
                ['#FF00AA', '#EA6B95', '#D5D580', '#6BEA95', '#00FFAA'],
                ['#AA00AA', '#C06BC0', '#D5D5D5', '#6BC0EA', '#00AAFF'],
                ['#000000', '#808080', '#FFFFFF', '#8080FF', '#0000FF'],
            ]);
        });
    });
    describe('interpolateBilinear', () => {
        const f = hex.interpolateBilinear;
        let r;
        const a = '#FFFFFF';
        const b = '#FF0000';
        const c = '#00FF00';
        const d = '#0000FF';
        it('test interpolate 0.0 - 0.0', () => {
            r = f(a, b, c, d, 0.0, 0.0);
            test.assertEqual(r, '#FFFFFF');
        });
        it('test interpolate 0.5 - 0.0', () => {
            r = f(a, b, c, d, 0.5, 0.0);
            test.assertEqual(r, '#FF8080');
        });
        it('test interpolate 0.0 - 0.5', () => {
            r = f(a, b, c, d, 0.0, 0.5);
            test.assertEqual(r, '#80FF80');
        });
        it('test interpolate 0.5 - 0.5', () => {
            r = f(a, b, c, d, 0.5, 0.5);
            test.assertEqual(r, '#808080');
        });
        it('test interpolate 1.0 - 1.0', () => {
            r = f(a, b, c, d, 1.0, 1.0);
            test.assertEqual(r, '#0000FF');
        });
    });
    describe('interpolateLinear', () => {
        const f = hex.interpolateLinear;
        let r;
        it('test interpolate 0.0', () => {
            r = f('#003264', '#3296C8', 0.0);
            test.assertEqual(r, '#003264');
        });
        it('test interpolate 0.5', () => {
            r = f('#003264', '#3296C8', 0.5);
            test.assertEqual(r, '#196496');
        });
        it('test interpolate 1.0', () => {
            r = f('#003264', '#3296C8', 1.0);
            test.assertEqual(r, '#3296C8');
        });
    });
    describe('interpolateMultilinear', () => {
        const f = hex.interpolateMultilinear;
        let r;
        const c = ['#FFFFFF', '#FF0000', '#000000'];
        it('test interpolate 0.0', () => {
            r = f(c, 0.0);
            test.assertEqual(r, '#FFFFFF');
        });
        it('test interpolate 0.25', () => {
            r = f(c, 0.25);
            test.assertEqual(r, '#FF8080');
        });
        it('test interpolate 0.5', () => {
            r = f(c, 0.5);
            test.assertEqual(r, '#FF0000');
        });
        it('test interpolate 0.75', () => {
            r = f(c, 0.75);
            test.assertEqual(r, '#800000');
        });
        it('test interpolate 1.0', () => {
            r = f(c, 1.0);
            test.assertEqual(r, '#000000');
        });
    });
    describe('nearest', () => {
        const f = hex.nearest;
        let r;
        it('test simple', () => {
            r = f('#320000', ['#000000', '#190000', '#370A0A', '#FFFFFF']);
            test.assertEqual(r, '#370A0A');
        });
    });
    describe('toCmyk', () => {
        const f = hex.toCmyk;
        let r;
        it('test black', () => {
            r = f('#000000');
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 100 });
        });
        it('test white', () => {
            r = f('#FFFFFF');
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 0 });
        });
        it('test red', () => {
            r = f('#FF0000');
            test.assertEqual(r, { c: 0, m: 100, y: 100, k: 0 });
        });
        it('test green', () => {
            r = f('#00FF00');
            test.assertEqual(r, { c: 100, m: 0, y: 100, k: 0 });
        });
        it('test blue', () => {
            r = f('#0000FF');
            test.assertEqual(r, { c: 100, m: 100, y: 0, k: 0 });
        });
        it('test gray', () => {
            r = f('#404040');
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 75 });
        });
        it('test light gray', () => {
            r = f('#BFBFBF');
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 25 });
        });
        it('test dark gray', () => {
            r = f('#7F7F7F');
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 50 });
        });
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
    describe('toRgb', () => {
        const f = hex.toRgb;
        let r;
        it('test alpha 0%', () => {
            r = f('#00000000');
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 0 });
        });
        it('test alpha 50%', () => {
            r = f('#80000000');
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 0.5 });
        });
        it('test alpha 100%', () => {
            r = f('#000000');
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 1 });
        });
        it('test black', () => {
            r = f('#000000');
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 1.0 });
        });
        it('test black (html short format)', () => {
            r = f('#000');
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 1.0 });
        });
        it('test white', () => {
            r = f('#FFFFFF');
            test.assertEqual(r, { r: 255, g: 255, b: 255, a: 1.0 });
        });
        it('test white (html short format)', () => {
            r = f('#FFF');
            test.assertEqual(r, { r: 255, g: 255, b: 255, a: 1.0 });
        });
        it('test red', () => {
            r = f('#FF0000');
            test.assertEqual(r, { r: 255, g: 0, b: 0, a: 1.0 });
        });
        it('test red (html short format)', () => {
            r = f('#F00');
            test.assertEqual(r, { r: 255, g: 0, b: 0, a: 1.0 });
        });
        it('test green', () => {
            r = f('#00FF00');
            test.assertEqual(r, { r: 0, g: 255, b: 0, a: 1.0 });
        });
        it('test green (html short format)', () => {
            r = f('#0F0');
            test.assertEqual(r, { r: 0, g: 255, b: 0, a: 1.0 });
        });
        it('test blue', () => {
            r = f('#0000FF');
            test.assertEqual(r, { r: 0, g: 0, b: 255, a: 1.0 });
        });
        it('test blue (html short format)', () => {
            r = f('#00F');
            test.assertEqual(r, { r: 0, g: 0, b: 255, a: 1.0 });
        });
        it('test prefix', () => {
            r = f('0x000000');
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 1.0 });
        });
        it('test invalid value', () => {
            test.assertNull(f('0x000000000000'));
        });
    });
    describe('toString', () => {
        const f = hex.toString;
        let s;
        it('test alpha and prefix with numeric color value', () => {
            s = f(0x80ff0000, '#');
            test.assertEqual(s, '#80FF0000');

            s = f(0x80ff0000, '0x');
            test.assertEqual(s, '0x80FF0000');
        });
        it('test alpha and prefix with string color value', () => {
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
    describe('toStringCSS', () => {
        const f = hex.toStringCSS;
        let s;
        it('test alpha and prefix with numeric color value', () => {
            s = f(0x80ff0000);
            test.assertEqual(s, '#80FF0000');
        });
        it('test alpha and prefix with string color value', () => {
            s = f('0x80FF0000');
            test.assertEqual(s, '#80FF0000');

            s = f('#80FF0000');
            test.assertEqual(s, '#80FF0000');
        });
    });
});
