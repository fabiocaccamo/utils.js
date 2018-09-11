var utils = require('../dist/utils.js');
var test = utils.test;
var point = utils.geom.point;

describe('point', function() {
    var a, b, r;
    describe('add', function() {
        var f = point.add;
        it('test positive coords', function() {
            a = { x:0, y:10 };
            b = { x:50, y:100 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r.x, 50);
            test.assertNumberAlmostEqual(r.y, 110);
        });
        it('test negative coords', function() {
            a = { x:-10, y:-20 };
            b = { x:-30, y:-40 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r.x, -40);
            test.assertNumberAlmostEqual(r.y, -60);
        });
    });
    describe('angle', function() {
        var f = point.angle;
        it('test angle 0°', function() {
            a = { x:10, y:30 };
            b = { x:100, y:30 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 0);
        });
        it('test angle 45°', function() {
            a = { x:10, y:10 };
            b = { x:100, y:100 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 45);
        });
        it('test angle 90°', function() {
            a = { x:0, y:10 };
            b = { x:0, y:20 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 90);
        });
        it('test angle 180°', function() {
            a = { x:0, y:100 };
            b = { x:-10, y:100 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 180);
        });
        it('test angle 225°', function() {
            a = { x:0, y:0 };
            b = { x:-10, y:-10 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 225);
        });
    });
    describe('cross', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('distance', function() {
        var f = point.distance;
        it('test no distance', function() {
            a = { x:10, y:100 };
            b = { x:10, y:100 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 0);
        });
        it('test x axis', function() {
            a = { x:10, y:30 };
            b = { x:100, y:30 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 90);
        });
        it('test y axis', function() {
            a = { x:10, y:30 };
            b = { x:10, y:-30 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 60);
        });
        it('test x/y axis', function() {
            a = { x:0, y:0 };
            b = { x:100, y:100 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r, 141.4213562373095);
        });
    });
    describe('dot', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('equals', function() {
        var f = point.equals;
        it('test simple', function() {
            test.assertTrue(f({ x:0, y:0 }, { x:0, y:0 }));
            test.assertTrue(f({ x:0.5, y:0.5 }, { x:0.5, y:0.5 }));
            test.assertTrue(f({ x:0.5000000000000001, y:0.5000000000000001 }, { x:0.5000000000000000, y:0.5000000000000001 }));
            test.assertFalse(f({ x:0.5000000000000001, y:0.5000000000000001 }, { x:0.5000000000000000, y:0.5000000000000000 }, 0.0 ));
            test.assertTrue(f({ x:0.505, y:0.505 }, { x:0.500, y:0.500 }, 0.01));
        });
    });
    describe('interpolate', function() {
        var f = point.interpolate;
        it('test simple', function() {
            r = f({ x:0, y:100 }, { x:50, y:1000 }, 0.5);
            test.assertNumberAlmostEqual(r.x, 25);
            test.assertNumberAlmostEqual(r.y, 550);
        });
    });
    describe('project', function() {
        var f = point.project;
        it('test project 0°', function() {
            a = { x:0, y:0 };
            r = f(a, 100, 0);
            test.assertNumberAlmostEqual(r.x, 100);
            test.assertNumberAlmostEqual(r.y, 0);
        });
        it('test project 45°', function() {
            a = { x:0, y:0 };
            r = f(a, 100, 45);
            test.assertNumberAlmostEqual(r.x, 70.71067811865476);
            test.assertNumberAlmostEqual(r.y, 70.71067811865476);
        });
        it('test project 90°', function() {
            a = { x:0, y:0 };
            r = f(a, 100, 90);
            test.assertNumberAlmostEqual(r.x, 0);
            test.assertNumberAlmostEqual(r.y, 100);
        });
        it('test project 180°', function() {
            a = { x:0, y:0 };
            r = f(a, 100, 180);
            test.assertNumberAlmostEqual(r.x, -100);
            test.assertNumberAlmostEqual(r.y, 0);
        });
        it('test project 225°', function() {
            a = { x:0, y:0 };
            r = f(a, 100, 225);
            test.assertNumberAlmostEqual(r.x, -70.71067811865476);
            test.assertNumberAlmostEqual(r.y, -70.71067811865476);
        });
        it('test project 360°', function() {
            a = { x:0, y:0 };
            r = f(a, 100, 360);
            test.assertNumberAlmostEqual(r.x, 100);
            test.assertNumberAlmostEqual(r.y, 0);
        });
        it('test project 0°', function() {
            a = { x:0, y:0 };
            r = f(a, 100, 720);
            test.assertNumberAlmostEqual(r.x, 100);
            test.assertNumberAlmostEqual(r.y, 0);
        });
    });
    describe('rotate', function() {
        var f = point.rotate;
        it('test rotate 0°', function() {
            a = { x:100, y:100 };
            r = f(a, 0);
            test.assertNumberAlmostEqual(r.x, 100);
            test.assertNumberAlmostEqual(r.y, 100);
        });
        it('test rotate 45°', function() {
            a = { x:100, y:100 };
            r = f(a, 45);
            test.assertNumberAlmostEqual(r.x, 0);
            test.assertNumberAlmostEqual(r.y, 141.4213562373095);
        });
        it('test rotate 90°', function() {
            a = { x:100, y:0 };
            r = f(a, 90);
            test.assertNumberAlmostEqual(r.x, 0);
            test.assertNumberAlmostEqual(r.y, 100);
        });
        it('test rotate 180°', function() {
            a = { x:100, y:100 };
            r = f(a, 180);
            test.assertNumberAlmostEqual(r.x, -100);
            test.assertNumberAlmostEqual(r.y, -100);
        });
        it('test rotate 225°', function() {
            a = { x:100, y:0 };
            r = f(a, 225);
            test.assertNumberAlmostEqual(r.x, -70.71067811865477);
            test.assertNumberAlmostEqual(r.y, -70.71067811865477);
        });
        it('test rotate 360°', function() {
            a = { x:50, y:50 };
            r = f(a, 360);
            test.assertNumberAlmostEqual(r.x, 50);
            test.assertNumberAlmostEqual(r.y, 50);
        });
        it('test rotate 720°', function() {
            a = { x:50, y:50 };
            r = f(a, 720);
            test.assertNumberAlmostEqual(r.x, 50);
            test.assertNumberAlmostEqual(r.y, 50);
        });
    });
    describe('scale', function() {
        var f = point.scale;
        it('test double size', function() {
            a = { x:10, y:20 };
            r = f(a, 2.0);
            test.assertNumberAlmostEqual(r.x, 20);
            test.assertNumberAlmostEqual(r.y, 40);
        });
        it('test half size', function() {
            a = { x:10, y:20 };
            r = f(a, 0.5);
            test.assertNumberAlmostEqual(r.x, 5);
            test.assertNumberAlmostEqual(r.y, 10);
        });
    });
    describe('subtract', function() {
        var f = point.subtract;
        it('test positive coords', function() {
            a = { x:0, y:10 };
            b = { x:50, y:100 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r.x, -50);
            test.assertNumberAlmostEqual(r.y, -90);
        });
        it('test negative coords', function() {
            a = { x:-10, y:-20 };
            b = { x:-30, y:-40 };
            r = f(a, b);
            test.assertNumberAlmostEqual(r.x, 20);
            test.assertNumberAlmostEqual(r.y, 20);
        });
    });
    describe('translate', function() {
        var f = point.translate;
        it('test positive coords', function() {
            a = { x:0, y:10 };
            r = f(a, 100, 200);
            test.assertNumberAlmostEqual(r.x, 100);
            test.assertNumberAlmostEqual(r.y, 210);
        });
        it('test negative coords', function() {
            a = { x:-10, y:-20 };
            r = f(a, -30, 40);
            test.assertNumberAlmostEqual(r.x, -40);
            test.assertNumberAlmostEqual(r.y, 20);
        });
    });
});