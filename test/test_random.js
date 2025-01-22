import utils from '../src/utils.js';
const test = utils.test;
const random = utils.random;

describe('random', () => {
    let i;
    const j = 10;
    let r;
    describe('argument', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.argument(1, 2, 3, 4);
                test.assertTrue([1, 2, 3, 4].includes(r));
            }
        });
    });
    describe('bit', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.bit();
                test.assertTrue(r === 0 || r === 1);
            }
        });
    });
    describe('boolean', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.boolean();
                test.assertTrue(r === true || r === false);
            }
        });
    });
    describe('color', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.color();
                test.assertTrue(r >= 0x000000 && r <= 0xffffff);
            }
        });
    });
    describe('element', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.element([1, 2, 3, 4]);
                test.assertTrue([1, 2, 3, 4].includes(r));
            }
        });
    });
    describe('float', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.float(10, 20);
                test.assertTrue(r >= 10 && r <= 20);
            }
        });
    });
    describe('index', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.index([1, 2, 3, 4]);
                test.assertTrue(r >= 0 && r <= 3);
            }
        });
    });
    describe('integer', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.integer(10, 20);
                test.assertTrue(r >= 10 && r <= 20 && !utils.number.isFloat(r));
            }
        });
    });
    describe('map', () => {
        it('test multiple expected results', () => {
            r = random.map((n) => {
                return random.boolean();
            }, j);
            test.assertTrue(utils.type.isArray(r));
            test.assertTrue(r.length === j);
            r.forEach((el) => {
                test.assertTrue(el === true || el === false);
            });
        });
    });
    describe('sign', () => {
        it('test multiple expected results', () => {
            for (i = 0; i < j; i++) {
                r = random.sign();
                test.assertTrue(r === 1 || r === -1);
            }
        });
    });
    describe('string', () => {
        it('test multiple expected results', () => {
            let s = '';
            for (i = 0; i < j; i++) {
                r = random.string(32);
                test.assertTrue(r.length === 32 && r !== s);
                s = r;
            }
        });
    });
});
