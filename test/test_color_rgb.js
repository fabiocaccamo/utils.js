import utils from '../src/utils.js';
const test = utils.test;
const rgb = utils.color.rgb;
const cmyk = utils.color.cmyk;
const hex = utils.color.hex;

describe('color.rgb', () => {
    describe('average', () => {
        const f = rgb.average;
        it('test simple', () => {
            const r = f([
                { r: 0, g: 0, b: 0 },
                { r: 200, g: 100, b: 50 },
                { r: 200, g: 100, b: 50 },
            ]);
            test.assertEqual(r, { r: 133, g: 67, b: 33, a: 1.0 });
        });
    });
    describe('distance', () => {
        const f = rgb.distance;
        let r;
        it('test simple', () => {
            r = f({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
            test.assertNumberAlmostEqual(r, 441.6729559300637);
        });
    });
    describe('gradient', () => {
        const f = rgb.gradient;
        let r;
        it('test 2 colors and 1 step', () => {
            r = f(
                [
                    { r: 255, g: 0, b: 0 },
                    { r: 0, g: 255, b: 0 },
                ],
                1
            );
            test.assertEqual(r, [{ r: 255, g: 0, b: 0, a: 1 }]);
        });
        it('test 2 colors and 2 steps', () => {
            r = f(
                [
                    { r: 255, g: 0, b: 0 },
                    { r: 0, g: 255, b: 0 },
                ],
                2
            );
            test.assertEqual(r, [
                { r: 255, g: 0, b: 0, a: 1 },
                { r: 0, g: 255, b: 0, a: 1 },
            ]);
        });
        it('test 2 colors and 3 steps', () => {
            r = f(
                [
                    { r: 255, g: 0, b: 0 },
                    { r: 0, g: 255, b: 0 },
                ],
                3
            );
            test.assertEqual(r, [
                { r: 255, g: 0, b: 0, a: 1 },
                { r: 128, g: 128, b: 0, a: 1 },
                { r: 0, g: 255, b: 0, a: 1 },
            ]);
        });
        it('test 2 colors and 4 steps', () => {
            r = f(
                [
                    { r: 255, g: 0, b: 0 },
                    { r: 0, g: 255, b: 0 },
                ],
                4
            );
            test.assertEqual(r, [
                { r: 255, g: 0, b: 0, a: 1 },
                { r: 170, g: 85, b: 0, a: 1 },
                { r: 85, g: 170, b: 0, a: 1 },
                { r: 0, g: 255, b: 0, a: 1 },
            ]);
        });
    });
    describe('gradientMatrix', () => {
        const f = rgb.gradientMatrix;
        let r;
        it('test 5x4 matrix with 4 required points', () => {
            r = f(
                {
                    topLeft: { r: 255, g: 0, b: 0 },
                    topRight: { r: 0, g: 255, b: 0 },
                    bottomRight: { r: 0, g: 0, b: 255 },
                    bottomLeft: { r: 255, g: 255, b: 0 },
                },
                5,
                4
            );
            test.assertEqual(r, [
                [
                    { r: 255, g: 0, b: 0, a: 1 },
                    { r: 192, g: 64, b: 0, a: 1 },
                    { r: 128, g: 128, b: 0, a: 1 },
                    { r: 64, g: 192, b: 0, a: 1 },
                    { r: 0, g: 255, b: 0, a: 1 },
                ],
                [
                    { r: 255, g: 85, b: 0, a: 1 },
                    { r: 192, g: 107, b: 22, a: 1 },
                    { r: 128, g: 128, b: 43, a: 1 },
                    { r: 64, g: 149, b: 64, a: 1 },
                    { r: 0, g: 170, b: 85, a: 1 },
                ],
                [
                    { r: 255, g: 170, b: 0, a: 1 },
                    { r: 192, g: 149, b: 43, a: 1 },
                    { r: 128, g: 128, b: 85, a: 1 },
                    { r: 64, g: 107, b: 128, a: 1 },
                    { r: 0, g: 85, b: 170, a: 1 },
                ],
                [
                    { r: 255, g: 255, b: 0, a: 1 },
                    { r: 192, g: 192, b: 64, a: 1 },
                    { r: 128, g: 128, b: 128, a: 1 },
                    { r: 64, g: 64, b: 192, a: 1 },
                    { r: 0, g: 0, b: 255, a: 1 },
                ],
            ]);
        });
        it('test 5x4 matrix with 4 required points but invalid topLeft', () => {
            r = f(
                {
                    topRight: { r: 0, g: 255, b: 0 },
                    bottomRight: { r: 0, g: 0, b: 255 },
                    bottomLeft: { r: 255, g: 255, b: 0 },
                },
                5,
                4
            );
            test.assertEqual(r, null);
        });
        it('test 5x4 matrix with 4 required points but invalid topRight', () => {
            r = f(
                {
                    topLeft: { r: 255, g: 0, b: 0 },
                    bottomRight: { r: 0, g: 0, b: 255 },
                    bottomLeft: { r: 255, g: 255, b: 0 },
                },
                5,
                4
            );
            test.assertEqual(r, null);
        });
        it('test 5x4 matrix with 4 required points but invalid bottomRight', () => {
            r = f(
                {
                    topLeft: { r: 255, g: 0, b: 0 },
                    topRight: { r: 0, g: 255, b: 0 },
                    bottomLeft: { r: 255, g: 255, b: 0 },
                },
                5,
                4
            );
            test.assertEqual(r, null);
        });
        it('test 5x4 matrix with 4 required points but invalid bottomLeft', () => {
            r = f(
                {
                    topLeft: { r: 255, g: 0, b: 0 },
                    topRight: { r: 0, g: 255, b: 0 },
                    bottomRight: { r: 0, g: 0, b: 255 },
                },
                5,
                4
            );
            test.assertEqual(r, null);
        });
    });
    describe('interpolateBilinear', () => {
        const f = rgb.interpolateBilinear;
        let r;
        const a = { r: 255, g: 255, b: 255 };
        const b = { r: 255, g: 0, b: 0 };
        const c = { r: 0, g: 255, b: 0 };
        const d = { r: 0, g: 0, b: 255 };
        it('test interpolate 0.0 - 0.0', () => {
            r = f(a, b, c, d, 0.0, 0.0);
            test.assertEqual(r, { r: 255, g: 255, b: 255, a: 1.0 });
        });
        it('test interpolate 0.5 - 0.0', () => {
            r = f(a, b, c, d, 0.5, 0.0);
            test.assertEqual(r, { r: 255, g: 128, b: 128, a: 1.0 });
        });
        it('test interpolate 0.0 - 0.5', () => {
            r = f(a, b, c, d, 0.0, 0.5);
            test.assertEqual(r, { r: 128, g: 255, b: 128, a: 1.0 });
        });
        it('test interpolate 0.5 - 0.5', () => {
            r = f(a, b, c, d, 0.5, 0.5);
            test.assertEqual(r, { r: 128, g: 128, b: 128, a: 1.0 });
        });
        it('test interpolate 1.0 - 1.0', () => {
            r = f(a, b, c, d, 1.0, 1.0);
            test.assertEqual(r, { r: 0, g: 0, b: 255, a: 1.0 });
        });
    });
    describe('interpolateLinear', () => {
        const f = rgb.interpolateLinear;
        let r;
        it('test interpolate 0.0', () => {
            r = f({ r: 0, g: 50, b: 100 }, { r: 50, g: 150, b: 200 }, 0.0);
            test.assertEqual(r, { r: 0, g: 50, b: 100, a: 1.0 });
        });
        it('test interpolate 0.5', () => {
            r = f({ r: 0, g: 50, b: 100 }, { r: 50, g: 150, b: 200 }, 0.5);
            test.assertEqual(r, { r: 25, g: 100, b: 150, a: 1.0 });
        });
        it('test interpolate 1.0', () => {
            r = f({ r: 0, g: 50, b: 100 }, { r: 50, g: 150, b: 200 }, 1.0);
            test.assertEqual(r, { r: 50, g: 150, b: 200, a: 1.0 });
        });
    });
    describe('interpolateMultilinear', () => {
        const f = rgb.interpolateMultilinear;
        let r;
        const c = [
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 0, b: 0 },
        ];
        it('test interpolate 0.0', () => {
            r = f(c, 0.0);
            test.assertEqual(r, { r: 255, g: 255, b: 255, a: 1.0 });
        });
        it('test interpolate 0.25', () => {
            r = f(c, 0.25);
            test.assertEqual(r, { r: 255, g: 128, b: 128, a: 1.0 });
        });
        it('test interpolate 0.5', () => {
            r = f(c, 0.5);
            test.assertEqual(r, { r: 255, g: 0, b: 0, a: 1.0 });
        });
        it('test interpolate 0.75', () => {
            r = f(c, 0.75);
            test.assertEqual(r, { r: 128, g: 0, b: 0, a: 1.0 });
        });
        it('test interpolate 1.0', () => {
            r = f(c, 1.0);
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 1.0 });
        });
    });
    describe('nearest', () => {
        const f = rgb.nearest;
        let r;
        it('test simple', () => {
            r = f({ r: 50, g: 0, b: 0 }, [
                { r: 0, g: 0, b: 0 },
                { r: 25, g: 0, b: 0 },
                { r: 55, g: 10, b: 10 },
                { r: 255, g: 255, b: 255 },
            ]);
            test.assertEqual(r, { r: 55, g: 10, b: 10 });
        });
    });
    describe('toCmyk', () => {
        const f = rgb.toCmyk;
        let r;
        it('test black', () => {
            r = f({ r: 0, g: 0, b: 0 });
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 100 });
        });
        it('test white', () => {
            r = f({ r: 255, g: 255, b: 255 });
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 0 });
        });
        it('test red', () => {
            r = f({ r: 255, g: 0, b: 0 });
            test.assertEqual(r, { c: 0, m: 100, y: 100, k: 0 });
        });
        it('test green', () => {
            r = f({ r: 0, g: 255, b: 0 });
            test.assertEqual(r, { c: 100, m: 0, y: 100, k: 0 });
        });
        it('test blue', () => {
            r = f({ r: 0, g: 0, b: 255 });
            test.assertEqual(r, { c: 100, m: 100, y: 0, k: 0 });
        });
        it('test gray', () => {
            r = f({ r: 63, g: 63, b: 63 });
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 75 });
        });
        it('test light gray', () => {
            r = f({ r: 190, g: 190, b: 190 });
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 25 });
        });
        it('test dark gray', () => {
            r = f({ r: 127, g: 127, b: 127 });
            test.assertEqual(r, { c: 0, m: 0, y: 0, k: 50 });
        });
    });
    // describe('toGrayscale', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('toHex', () => {
        const f = rgb.toHex;
        let r;
        it('test alpha 0%', () => {
            r = f({ r: 0, g: 0, b: 0, a: 0 });
            test.assertEqual(r, '#00000000');
        });
        it('test alpha 50%', () => {
            r = f({ r: 0, g: 0, b: 0, a: 0.5 });
            test.assertEqual(r, '#80000000');
        });
        it('test alpha 100%', () => {
            r = f({ r: 0, g: 0, b: 0, a: 1 });
            test.assertEqual(r, '#000000');
        });
        it('test black', () => {
            r = f({ r: 0, g: 0, b: 0 });
            test.assertEqual(r, '#000000');
        });
        it('test white', () => {
            r = f({ r: 255, g: 255, b: 255 });
            test.assertEqual(r, '#FFFFFF');
        });
        it('test red', () => {
            r = f({ r: 255, g: 0, b: 0 });
            test.assertEqual(r, '#FF0000');
        });
        it('test green', () => {
            r = f({ r: 0, g: 255, b: 0 });
            test.assertEqual(r, '#00FF00');
        });
        it('test blue', () => {
            r = f({ r: 0, g: 0, b: 255 });
            test.assertEqual(r, '#0000FF');
        });
        it('test prefix', () => {
            r = f({ r: 0, g: 0, b: 0 }, '0x');
            test.assertEqual(r, '0x000000');
        });
        it('test back toRgb white', () => {
            r = hex.toRgb(f({ r: 255, g: 255, b: 255 }));
            test.assertEqual(r, { r: 255, g: 255, b: 255, a: 1.0 });
        });
        it('test back toRgb black', () => {
            r = hex.toRgb(f({ r: 0, g: 0, b: 0 }));
            test.assertEqual(r, { r: 0, g: 0, b: 0, a: 1.0 });
        });
        it('test back toRgb random color', () => {
            r = hex.toRgb(f({ r: 34, g: 127, b: 76 }));
            test.assertEqual(r, { r: 34, g: 127, b: 76, a: 1.0 });
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
    describe('toString', () => {
        const f = rgb.toString;
        let r;
        it('test alpha', () => {
            r = f({ r: 0, g: 0, b: 0, a: 0.5 });
            test.assertEqual(r, '{ r:0, g:0, b:0, a:0.5 }');
        });
        it('test black', () => {
            r = f({ r: 0, g: 0, b: 0 });
            test.assertEqual(r, '{ r:0, g:0, b:0, a:1 }');
        });
        it('test white', () => {
            r = f({ r: 255, g: 255, b: 255 });
            test.assertEqual(r, '{ r:255, g:255, b:255, a:1 }');
        });
        it('test red', () => {
            r = f({ r: 255, g: 0, b: 0 });
            test.assertEqual(r, '{ r:255, g:0, b:0, a:1 }');
        });
        it('test green', () => {
            r = f({ r: 0, g: 255, b: 0 });
            test.assertEqual(r, '{ r:0, g:255, b:0, a:1 }');
        });
        it('test blue', () => {
            r = f({ r: 0, g: 0, b: 255 });
            test.assertEqual(r, '{ r:0, g:0, b:255, a:1 }');
        });
    });
    describe('toStringCSS', () => {
        const f = rgb.toStringCSS;
        let r;
        it('test alpha', () => {
            r = f({ r: 0, g: 0, b: 0, a: 0.5 });
            test.assertEqual(r, 'rgba(0, 0, 0, 0.5)');
        });
        it('test black', () => {
            r = f({ r: 0, g: 0, b: 0 });
            test.assertEqual(r, 'rgba(0, 0, 0, 1)');
        });
        it('test white', () => {
            r = f({ r: 255, g: 255, b: 255 });
            test.assertEqual(r, 'rgba(255, 255, 255, 1)');
        });
        it('test red', () => {
            r = f({ r: 255, g: 0, b: 0 });
            test.assertEqual(r, 'rgba(255, 0, 0, 1)');
        });
        it('test green', () => {
            r = f({ r: 0, g: 255, b: 0 });
            test.assertEqual(r, 'rgba(0, 255, 0, 1)');
        });
        it('test blue', () => {
            r = f({ r: 0, g: 0, b: 255 });
            test.assertEqual(r, 'rgba(0, 0, 255, 1)');
        });
    });
});
