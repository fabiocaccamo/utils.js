var utils = require('../dist/utils.js');
var test = utils.test;
var cmyk = utils.color.cmyk;
var hex = utils.color.hex;
var rgb = utils.color.rgb;

describe('color.cmyk', function() {
    // describe('average', function() {
    //     var f = cmyk.average;
    //     it('test simple', function() {
    //         r = f([{ c:0, m:0, y:0, k:100 }, { c:0, m:50, y:75, k:22 }, { c:0, m:50, y:75, k:22 }]);
    //         test.assertEqual(r, { c:0, m:50.4, y:75.2, k:47.8 });
    //     });
    // });
    // describe('distance', function() {
    //     var f = cmyk.distance;
    //     var r;
    //     it('test simple', function() {
    //         r = f({ c:0, m:0, y:0, k:100 }, { c:0, m:0, y:0, k:0 });
    //         test.assertNumberAlmostEqual(r, 441.6729559300637);
    //     });
    // });
    // describe('gradient', function() {
    //     var f = cmyk.gradient;
    //     var r;
    //     it('test 2 colors and 1 step', function() {
    //         r = f([{ c:0, m:100, y:100, k:0 }, { c:100, m:0, y:100, k:0 }], 1);
    //         test.assertEqual(r, [{ c:0, m:100, y:100, k:0 }]);
    //     });
    //     it('test 2 colors and 2 steps', function() {
    //         r = f([{ c:0, m:100, y:100, k:0 }, { c:100, m:0, y:100, k:0 }], 2);
    //         test.assertEqual(r, [{ c:0, m:100, y:100, k:0 }, { c:100, m:0, y:100, k:0 }]);
    //     });
    //     it('test 2 colors and 3 steps', function() {
    //         r = f([{ c:0, m:100, y:100, k:0 }, { c:100, m:0, y:100, k:0 }], 3);
    //         test.assertEqual(r, [{ c:0, m:100, y:100, k:0 }, { c:0, m:0, y:100, k:49.8 }, { c:100, m:0, y:100, k:0 }]);
    //     });
    //     it('test 2 colors and 4 steps', function() {
    //         r = f([{ c:0, m:100, y:100, k:0 }, { c:100, m:0, y:100, k:0 }], 4);
    //         test.assertEqual(r, [{ c:0, m:100, y:100, k:0 }, { c:0, m:50, y:100, k:33.3 }, { c:50, m:0, y:100, k:33.3 }, { c:100, m:0, y:100, k:0 }]);
    //     });
    // });
    // describe('gradientMatrix', function() {
    //     var f = cmyk.gradientMatrix;
    //     var r;
    //     it('test 5x4 matrix with 4 required points', function() {
    //         r = f({
    //             topLeft: { c:0, m:100, y:100, k:0 },
    //             topRight: { c:100, m:0, y:100, k:0 },
    //             bottomRight: { c:100, m:100, y:0, k:0 },
    //             bottomLeft: { c:0, m:0, y:0, k:100 }
    //         }, 5, 4);
    //         test.assertEqual(r, [
    //             [{ c:0, m:100, y:100, k:0 }, { c:0, m:66.7, y:100, k:24.7 }, { c:0, m:0, y:100, k:49.8 }, { c:66.7, m:0, y:100, k:24.7 }, { c:100, m:0, y:100, k:0 }],
    //             [{ c:0, m:100, y:100, k:33.3 }, { c:0, m:66.4, y:82.8, k:49.8 }, { c:0, m:0, y:49.4, k:66.7 }, { c:66.4, m:0, y:50, k:49.8 }, { c:100, m:0, y:50, k:33.3 }],
    //             [{ c:0, m:100, y:100, k:66.7 }, { c:0, m:65.6, y:32.8, k:74.9 }, { c:49.4, m:49.4, y:0, k:66.7 }, { c:82.8, m:50, y:0, k:49.8 }, { c:100, m:50, y:0, k:33.3 }],
    //             [{ c:0, m:0, y:0, k:100 }, { c:100, m:100, y:0, k:74.9 }, { c:100, m:100, y:0, k:49.8 }, { c:100, m:100, y:0, k:24.7 }, { c:100, m:100, y:0, k:0 }]
    //         ]);
    //     });
    // });
    // describe('interpolateBilinear', function() {
    //     var f = cmyk.interpolateBilinear;
    //     var r;
    //     var a = { c:0, m:0, y:0, k:0 };
    //     var b = { c:0, m:100, y:100, k:0 };
    //     var c = { c:100, m:0, y:100, k:0 };
    //     var d = { c:100, m:100, y:0, k:0 };
    //     it('test interpolate 0.0 - 0.0', function() {
    //         r = f(a, b, c, d, 0.0, 0.0);
    //         test.assertEqual(r, { c:0, m:0, y:0, k:0 });
    //     });
    //     it('test interpolate 0.5 - 0.0', function() {
    //         r = f(a, b, c, d, 0.5, 0.0);
    //         test.assertEqual(r, { c:0, m:49.8, y:49.8, k:0 });
    //     });
    //     it('test interpolate 0.0 - 0.5', function() {
    //         r = f(a, b, c, d, 0.0, 0.5);
    //         test.assertEqual(r, { c:49.8, m:0, y:49.8, k:0 });
    //     });
    //     it('test interpolate 0.5 - 0.5', function() {
    //         r = f(a, b, c, d, 0.5, 0.5);
    //         test.assertEqual(r, { c:0, m:0, y:0, k:49.8 });
    //     });
    //     it('test interpolate 1.0 - 1.0', function() {
    //         r = f(a, b, c, d, 1.0, 1.0);
    //         test.assertEqual(r, { c:100, m:100, y:0, k:0 });
    //     });
    // });
    // describe('interpolateLinear', function() {
    //     var f = cmyk.interpolateLinear;
    //     var r;
    //     it('test interpolate 0.0', function() {
    //         r = f({ c:100, m:50, y:0, k:61 }, { c:75, m:25, y:0, k:22 }, 0.0);
    //         test.assertEqual(r, { c:100, m:49.5, y:0, k:61.2 });
    //     });
    //     it('test interpolate 0.5', function() {
    //         r = f({ c:100, m:50, y:0, k:61 }, { c:75, m:25, y:0, k:22 }, 0.5);
    //         test.assertEqual(r, { c:83.2, m:32.9, y:0, k:41.6 });
    //     });
    //     it('test interpolate 1.0', function() {
    //         r = f({ c:100, m:50, y:0, k:61 }, { c:75, m:25, y:0, k:22 }, 1.0);
    //         test.assertEqual(r, { c:74.9, m:25.1, y:0, k:22 });
    //     });
    // });
    // describe('interpolateMultilinear', function() {
    //     var f = cmyk.interpolateMultilinear;
    //     var r;
    //     var c = [{ c:0, m:0, y:0, k:0 }, { c:0, m:100, y:100, k:0 }, { c:0, m:0, y:0, k:100 }];
    //     it('test interpolate 0.0', function() {
    //         r = f(c, 0.0);
    //         test.assertEqual(r, { c:0, m:0, y:0, k:0 });
    //     });
    //     it('test interpolate 0.25', function() {
    //         r = f(c, 0.25);
    //         test.assertEqual(r, { c:0, m:50, y:50, k:0 });
    //     });
    //     it('test interpolate 0.5', function() {
    //         r = f(c, 0.5);
    //         test.assertEqual(r, { c:0, m:100, y:100, k:0 });
    //     });
    //     it('test interpolate 0.75', function() {
    //         r = f(c, 0.75);
    //         test.assertEqual(r, { c:0, m:50, y:50, k:50 });
    //     });
    //     it('test interpolate 1.0', function() {
    //         r = f(c, 1.0);
    //         test.assertEqual(r, { c:0, m:0, y:0, k:100 });
    //     });
    // });
    // describe('nearest', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    // describe('toGrayscale', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('toHex', function() {
        var f = cmyk.toHex;
        var r;
        it('test black', function() {
            r = f({ c:0, m:0, y:0, k:100 });
            test.assertEqual(r, '#000000');
        });
        it('test white', function() {
            r = f({ c:0, m:0, y:0, k:0 });
            test.assertEqual(r, '#FFFFFF');
        });
        it('test red', function() {
            r = f({ c:0, m:100, y:100, k:0 });
            test.assertEqual(r, '#FF0000');
        });
        it('test green', function() {
            r = f({ c:100, m:0, y:100, k:0 });
            test.assertEqual(r, '#00FF00');
        });
        it('test blue', function() {
            r = f({ c:100, m:100, y:0, k:0 });
            test.assertEqual(r, '#0000FF');
        });
        it('test gray', function() {
            r = f({ c:0, m:0, y:0, k:50 });
            test.assertEqual(r, '#808080');
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
        var f = cmyk.toRgb;
        var r;
        it('test black', function() {
            r = f({ c:0, m:0, y:0, k:100 });
            test.assertEqual(r, { r:0, g:0, b:0, a:1.0 });
        });
        it('test white', function() {
            r = f({ c:0, m:0, y:0, k:0 });
            test.assertEqual(r, { r:255, g:255, b:255, a:1.0 });
        });
        it('test red', function() {
            r = f({ c:0, m:100, y:100, k:0 });
            test.assertEqual(r, { r:255, g:0, b:0, a:1.0 });
        });
        it('test green', function() {
            r = f({ c:100, m:0, y:100, k:0 });
            test.assertEqual(r, { r:0, g:255, b:0, a:1.0 });
        });
        it('test blue', function() {
            r = f({ c:100, m:100, y:0, k:0 });
            test.assertEqual(r, { r:0, g:0, b:255, a:1.0 });
        });
        it('test gray', function() {
            r = f({ c:0, m:0, y:0, k:50 });
            test.assertEqual(r, { r:128, g:128, b:128, a:1.0 });
        });
    });
    describe('toString', function() {
        var f = cmyk.toString;
        var r;
        it('test black', function() {
            r = f({ c:0, m:0, y:0, k:100 });
            test.assertEqual(r, '{ c:0, m:0, y:0, k:100 }');
        });
        it('test white', function() {
            r = f({ c:0, m:0, y:0, k:0 });
            test.assertEqual(r, '{ c:0, m:0, y:0, k:0 }');
        });
        it('test red', function() {
            r = f({ c:0, m:100, y:100, k:0 });
            test.assertEqual(r, '{ c:0, m:100, y:100, k:0 }');
        });
        it('test green', function() {
            r = f({ c:100, m:0, y:100, k:0 });
            test.assertEqual(r, '{ c:100, m:0, y:100, k:0 }');
        });
        it('test blue', function() {
            r = f({ c:100, m:100, y:0, k:0 });
            test.assertEqual(r, '{ c:100, m:100, y:0, k:0 }');
        });
        it('test gray', function() {
            r = f({ c:0, m:0, y:0, k:50 });
            test.assertEqual(r, '{ c:0, m:0, y:0, k:50 }');
        });
    });
    describe('toStringCSS', function() {
        var f = cmyk.toStringCSS;
        var r;
        it('test black', function() {
            r = f({ c:0, m:0, y:0, k:100 });
            test.assertEqual(r, 'cmyk(0%, 0%, 0%, 100%)');
        });
        it('test white', function() {
            r = f({ c:0, m:0, y:0, k:0 });
            test.assertEqual(r, 'cmyk(0%, 0%, 0%, 0%)');
        });
        it('test red', function() {
            r = f({ c:0, m:100, y:100, k:0 });
            test.assertEqual(r, 'cmyk(0%, 100%, 100%, 0%)');
        });
        it('test green', function() {
            r = f({ c:100, m:0, y:100, k:0 });
            test.assertEqual(r, 'cmyk(100%, 0%, 100%, 0%)');
        });
        it('test blue', function() {
            r = f({ c:100, m:100, y:0, k:0 });
            test.assertEqual(r, 'cmyk(100%, 100%, 0%, 0%)');
        });
        it('test gray', function() {
            r = f({ c:0, m:0, y:0, k:50 });
            test.assertEqual(r, 'cmyk(0%, 0%, 0%, 50%)');
        });
    });
});