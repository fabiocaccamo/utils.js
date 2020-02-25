var utils = require('../dist/utils.js');
var test = utils.test;
var trigo = utils.trigo;

describe('trigo', function() {
    describe('constants', function() {
        it('DEG_0', function() {
            test.assertNumberAlmostEqual(trigo.DEG_0, 0.0, 0.001);
        });
        it('DEG_90', function() {
            test.assertNumberAlmostEqual(trigo.DEG_90, 90.0, 0.001);
        });
        it('DEG_180', function() {
            test.assertNumberAlmostEqual(trigo.DEG_180, 180.0, 0.001);
        });
        it('DEG_270', function() {
            test.assertNumberAlmostEqual(trigo.DEG_270, 270.0, 0.001);
        });
        it('DEG_360', function() {
            test.assertNumberAlmostEqual(trigo.DEG_360, 360.0, 0.001);
        });
        it('DEG_TO_RAD', function() {
            test.assertNumberAlmostEqual(trigo.DEG_TO_RAD, 0.017453292519943295);
        });
        it('RAD_TO_DEG', function() {
            test.assertNumberAlmostEqual(trigo.RAD_TO_DEG, 57.29577951308232);
        });
    });
    describe('acosDeg', function() {
        var f = trigo.acosDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(1.0), 0.0);
            test.assertNumberAlmostEqual(f(0.5), 60.0);
            test.assertNumberAlmostEqual(f(0.0), 90.0);
            test.assertNumberAlmostEqual(f(-0.5), 120.0);
            test.assertNumberAlmostEqual(f(-1.0), 180.0);
        });
    });
    describe('angleDeg', function() {
        var f = trigo.angleDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0.0, 0.0), 0.0);
            test.assertNumberAlmostEqual(f(1.0, 1.0), 45.0);
            test.assertNumberAlmostEqual(f(1.0, 0.0), 90.0);
            test.assertNumberAlmostEqual(f(1.0, -1.0), 135.0);
            test.assertNumberAlmostEqual(f(0.0, -1.0), 180.0);
            test.assertNumberAlmostEqual(f(-1.0, -1.0), -135.0);
            test.assertNumberAlmostEqual(f(-1.0, 0.0), -90.0);
            test.assertNumberAlmostEqual(f(-1.0, 1.0), -45.0);
        });
    });
    describe('angleRad', function() {
        var f = trigo.angleRad;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0.0, 0.0), 0.0);
            test.assertNumberAlmostEqual(f(1.0, 1.0), 0.7853981633974483);
            test.assertNumberAlmostEqual(f(1.0, 0.0), 1.5707963267948966);
            test.assertNumberAlmostEqual(f(1.0, -1.0), 2.356194490192345);
            test.assertNumberAlmostEqual(f(0.0, -1.0), 3.141592653589793);
            test.assertNumberAlmostEqual(f(-1.0, -1.0), -2.356194490192345);
            test.assertNumberAlmostEqual(f(-1.0, 0.0), -1.5707963267948966);
            test.assertNumberAlmostEqual(f(-1.0, 1.0), -0.7853981633974483);
        });
    });
    describe('asinDeg', function() {
        var f = trigo.asinDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(1.0), 90.0);
            test.assertNumberAlmostEqual(f(0.5), 30.0);
            test.assertNumberAlmostEqual(f(0.0), 0.0);
            test.assertNumberAlmostEqual(f(-0.5), -30.0);
            test.assertNumberAlmostEqual(f(-1.0), -90.0);
        });
    });
    describe('atanDeg', function() {
        var f = trigo.atanDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(1.0), 45.0);
            test.assertNumberAlmostEqual(f(0.5), 26.56505117707799);
            test.assertNumberAlmostEqual(f(0.0), 0.0);
            test.assertNumberAlmostEqual(f(-0.5), -26.56505117707799);
            test.assertNumberAlmostEqual(f(-1.0), -45.0);
        });
    });
    describe('atan2Deg', function() {
        var f = trigo.atan2Deg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0.0, 0.0), 0.0);
            test.assertNumberAlmostEqual(f(1.0, 1.0), 45.0);
            test.assertNumberAlmostEqual(f(1.0, 0.0), 90.0);
            test.assertNumberAlmostEqual(f(1.0, -1.0), 135.0);
            test.assertNumberAlmostEqual(f(0.0, -1.0), 180.0);
            test.assertNumberAlmostEqual(f(-1.0, -1.0), -135.0);
            test.assertNumberAlmostEqual(f(-1.0, 0.0), -90.0);
            test.assertNumberAlmostEqual(f(-1.0, 1.0), -45.0);
        });
    });
    describe('cosDeg', function() {
        var f = trigo.cosDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(1.0), 0.9998476951563913);
            test.assertNumberAlmostEqual(f(0.5), 0.9999619230641713);
            test.assertNumberAlmostEqual(f(0.0), 1.0);
            test.assertNumberAlmostEqual(f(-0.5), 0.9999619230641713);
            test.assertNumberAlmostEqual(f(-1.0), 0.9998476951563913);
        });
    });
    describe('degToRad', function() {
        var f = trigo.degToRad;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(trigo.DEG_0), 0.0);
            test.assertNumberAlmostEqual(f(trigo.DEG_90), 1.5707963267948966);
            test.assertNumberAlmostEqual(f(trigo.DEG_180), 3.141592653589793);
            test.assertNumberAlmostEqual(f(trigo.DEG_270), 4.71238898038469);
            test.assertNumberAlmostEqual(f(trigo.DEG_360), 6.283185307179586);
        });
    });
    describe('fastDeg', function() {
        var f = trigo.fastDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0, 359), -1.0);
        });
    });
    describe('haversine', function() {
        var f = trigo.haversine;
        var latA = 45.0735886;
        var lngA = 7.6055665;
        var latB = 45.4628329;
        var lngB = 9.1076923;
        it('test distance default', function() {
            test.assertNumberAlmostEqual(f(latA, lngA, latB, lngB), 125.265);
        });
        it('test distance km', function() {
            test.assertNumberAlmostEqual(f(latA, lngA, latB, lngB, true), 125.265);
        });
        it('test distance miles', function() {
            test.assertNumberAlmostEqual(f(latA, lngA, latB, lngB, false), 77.782);
        });
    });
    describe('hypo', function() {
        var f = trigo.hypo;
        it('test no distance', function() {
            test.assertNumberAlmostEqual(f(0.0, 0.0), 0);
        });
        it('test x axis', function() {
            test.assertNumberAlmostEqual(f(100.0, 0.0), 100);
        });
        it('test y axis', function() {
            test.assertNumberAlmostEqual(f(0.0, 100.0), 100);
        });
        it('test x/y axis', function() {
            test.assertNumberAlmostEqual(f(100.0, 100.0), 141.4213562373095);
        });
    });
    describe('radToDeg', function() {
        var f = trigo.radToDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(0.0), trigo.DEG_0);
            test.assertNumberAlmostEqual(f(1.5707963267948966), trigo.DEG_90);
            test.assertNumberAlmostEqual(f(3.141592653589793), trigo.DEG_180);
            test.assertNumberAlmostEqual(f(4.71238898038469), trigo.DEG_270);
            test.assertNumberAlmostEqual(f(6.283185307179586), trigo.DEG_360);
        });
    });
    describe('sinDeg', function() {
        var f = trigo.sinDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(1.0), 0.01745240643728351);
            test.assertNumberAlmostEqual(f(0.5), 0.008726535498373935);
            test.assertNumberAlmostEqual(f(0.0), 0.0);
            test.assertNumberAlmostEqual(f(-0.5), -0.008726535498373935);
            test.assertNumberAlmostEqual(f(-1.0), -0.01745240643728351);
        });
    });
    describe('tanDeg', function() {
        var f = trigo.tanDeg;
        it('test simple', function() {
            test.assertNumberAlmostEqual(f(1.0), 0.017455064928217585);
            test.assertNumberAlmostEqual(f(0.5), 0.00872686779075879);
            test.assertNumberAlmostEqual(f(0.0), 0.0);
            test.assertNumberAlmostEqual(f(-0.5), -0.00872686779075879);
            test.assertNumberAlmostEqual(f(-1.0), -0.017455064928217585);
        });
    });
});