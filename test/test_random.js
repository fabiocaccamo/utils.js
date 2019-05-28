var utils = require('../dist/utils.js');
var test = utils.test;
var random = utils.random;

describe('random', function() {
    var i, j = 10, r;
    describe('argument', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.argument(1, 2, 3, 4);
                test.assertTrue([1, 2, 3, 4].indexOf(r) !== -1);
            }
        });
    });
    describe('bit', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.bit();
                test.assertTrue(r === 0 || r === 1);
            }
        });
    });
    describe('boolean', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.boolean();
                test.assertTrue(r === true || r === false);
            }
        });
    });
    describe('color', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.color();
                test.assertTrue(r >= 0x000000 && r <= 0xFFFFFF);
            }
        });
    });
    describe('element', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.element([1, 2, 3, 4]);
                test.assertTrue([1, 2, 3, 4].indexOf(r) !== -1);
            }
        });
    });
    describe('float', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.float(10, 20);
                test.assertTrue(r >= 10 && r <= 20);
            }
        });
    });
    describe('index', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.index([1, 2, 3, 4]);
                test.assertTrue(r >= 0 && r <= 3);
            }
        });
    });
    describe('integer', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.integer(10, 20);
                test.assertTrue(r >= 10 && r <= 20 && !utils.number.isFloat(r));
            }
        });
    });
    describe('sign', function() {
        it('test multiple expected results', function() {
            for (i = 0; i < j; i++) {
                r = random.sign();
                test.assertTrue(r === 1 || r === -1);
            }
        });
    });
    describe('string', function() {
        it('test multiple expected results', function() {
            var s = '';
            for (i = 0; i < j; i++) {
                r = random.string(32);
                test.assertTrue(r.length === 32 && (r !== s));
                s = r;
            }
        });
    });
});