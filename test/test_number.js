var utils = require('../dist/utils.js');
var test = utils.test;
var num = utils.number;

describe('number', function () {
    describe('isBetween', function () {
        var f = num.isBetween;
        it('test', function () {
            test.assertTrue(f(0, 0, 0));
            test.assertTrue(f(0, 0, 100));
            test.assertTrue(f(50, 0, 100));
            test.assertTrue(f(100, 0, 100));
            test.assertFalse(f(-1, 0, 100));
            test.assertFalse(f(101, 0, 100));
        });
    });
    describe('isEven', function () {
        var f = num.isEven;
        it('test', function () {
            test.assertTrue(f(0));
            test.assertTrue(f(2));
            test.assertTrue(f(4));
            test.assertTrue(f(-2));
            test.assertFalse(f(1));
            test.assertFalse(f(3));
            test.assertFalse(f(5));
            test.assertFalse(f(-1));
            test.assertFalse(f(1.1));
            test.assertFalse(f(1.2));
            test.assertFalse(f(2.1));
            test.assertFalse(f(2.2));
        });
    });
    describe('isFloat', function () {
        var f = num.isFloat;
        it('test', function () {
            test.assertTrue(f(-0.2));
            test.assertTrue(f(-0.1));
            test.assertFalse(f(0.0));
            test.assertTrue(f(0.1));
            test.assertTrue(f(0.2));
            test.assertFalse(f(0.0));
            test.assertFalse(f(1.0));
            test.assertFalse(f(2.0));
            test.assertFalse(f(3.0));
        });
    });
    describe('isNegative', function () {
        var f = num.isNegative;
        it('test', function () {
            test.assertTrue(f(-0.1));
            test.assertTrue(f(-1));
            test.assertFalse(f(0.0));
            test.assertFalse(f(0.1));
            test.assertFalse(f(1));
        });
    });
    describe('isOdd', function () {
        var f = num.isOdd;
        it('test', function () {
            test.assertFalse(f(0));
            test.assertFalse(f(2));
            test.assertFalse(f(4));
            test.assertFalse(f(-2));
            test.assertTrue(f(1));
            test.assertTrue(f(3));
            test.assertTrue(f(5));
            test.assertTrue(f(-1));
            test.assertFalse(f(1.1));
            test.assertFalse(f(1.2));
            test.assertFalse(f(2.1));
            test.assertFalse(f(2.2));
        });
    });
    describe('isPositive', function () {
        var f = num.isPositive;
        it('test', function () {
            test.assertTrue(f(0.0));
            test.assertTrue(f(0.1));
            test.assertTrue(f(1));
            test.assertFalse(f(-0.1));
            test.assertFalse(f(-1));
        });
    });
    describe('isPrime', function () {
        var f = num.isPrime;
        it('test numbers from 0 to 15', function () {
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertTrue(f(2));
            test.assertTrue(f(3));
            test.assertFalse(f(4));
            test.assertTrue(f(5));
            test.assertFalse(f(6));
            test.assertTrue(f(7));
            test.assertFalse(f(8));
            test.assertFalse(f(9));
            test.assertFalse(f(10));
            test.assertTrue(f(11));
            test.assertFalse(f(12));
            test.assertTrue(f(13));
            test.assertFalse(f(14));
            test.assertFalse(f(15));
        });
        it('test numbers from 0 to 100', function () {
            const expectedPrimes = [
                2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
                71, 73, 79, 83, 89, 97,
            ];
            const resultPrimes = [];
            for (let i = 0; i <= 100; i++) {
                if (f(i)) {
                    resultPrimes.push(i);
                }
            }
            test.assertEqual(resultPrimes, expectedPrimes);
        });
        it('test negative numbers', function () {
            test.assertFalse(f(-5));
            test.assertFalse(f(-4));
            test.assertFalse(f(-3));
            test.assertFalse(f(-2));
            test.assertFalse(f(-1));
        });
        it('test decimal numbers', function () {
            test.assertFalse(f(-0.5));
            test.assertFalse(f(0.5));
        });
    });
});
