import utils from '../src/utils.js';
const test = utils.test;
const num = utils.number;

describe('number', () => {
    describe('isBetween', () => {
        const f = num.isBetween;
        it('test', () => {
            test.assertTrue(f(0, 0, 0));
            test.assertTrue(f(0, 0, 100));
            test.assertTrue(f(50, 0, 100));
            test.assertTrue(f(100, 0, 100));
            test.assertFalse(f(-1, 0, 100));
            test.assertFalse(f(101, 0, 100));
        });
    });
    describe('isEven', () => {
        const f = num.isEven;
        it('test', () => {
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
    describe('isFloat', () => {
        const f = num.isFloat;
        it('test', () => {
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
    describe('isNegative', () => {
        const f = num.isNegative;
        it('test', () => {
            test.assertTrue(f(-0.1));
            test.assertTrue(f(-1));
            test.assertFalse(f(0.0));
            test.assertFalse(f(0.1));
            test.assertFalse(f(1));
        });
    });
    describe('isOdd', () => {
        const f = num.isOdd;
        it('test', () => {
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
    describe('isPositive', () => {
        const f = num.isPositive;
        it('test', () => {
            test.assertTrue(f(0.0));
            test.assertTrue(f(0.1));
            test.assertTrue(f(1));
            test.assertFalse(f(-0.1));
            test.assertFalse(f(-1));
        });
    });
    describe('isPrime', () => {
        const f = num.isPrime;
        it('test numbers from 0 to 15', () => {
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
        it('test numbers from 0 to 100', () => {
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
        it('test negative numbers', () => {
            test.assertFalse(f(-5));
            test.assertFalse(f(-4));
            test.assertFalse(f(-3));
            test.assertFalse(f(-2));
            test.assertFalse(f(-1));
        });
        it('test decimal numbers', () => {
            test.assertFalse(f(-0.5));
            test.assertFalse(f(0.5));
        });
    });
});
