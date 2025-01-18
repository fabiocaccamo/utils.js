import utils from '../src/utils.js';
const test = utils.test;
const ease = utils.ease;
describe('ease', () => {
    const assertReturnAlwaysNumber = (f) => {
        let t = 0.0;
        while (t <= 1.0) {
            test.assertNumber(f(t));
            t += 0.05;
        }
    };
    describe('backIn', () => {
        const f = ease.backIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, overshoot = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 0.0), 0.0);
        });
        it('t = 0.0, overshoot = 1.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0), 0.0);
        });
        it('t = 0.0, overshoot = 2.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 2.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = 1.0, overshoot = 0.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 0.0), 1.0);
        });
        it('t = 1.0, overshoot = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0), 1.0);
        });
        it('t = 1.0, overshoot = 2.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('backInOut', () => {
        const f = ease.backInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, overshoot = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 0.0), 0.0);
        });
        it('t = 0.0, overshoot = 1.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0), 0.0);
        });
        it('t = 0.0, overshoot = 2.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 2.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = 1.0, overshoot = 0.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 0.0), 1.0);
        });
        it('t = 1.0, overshoot = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0), 1.0);
        });
        it('t = 1.0, overshoot = 2.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('backOut', () => {
        const f = ease.backOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, overshoot = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 0.0), 0.0);
        });
        it('t = 0.0, overshoot = 1.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0), 0.0);
        });
        it('t = 0.0, overshoot = 2.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 2.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = 1.0, overshoot = 0.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 0.0), 1.0);
        });
        it('t = 1.0, overshoot = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0), 1.0);
        });
        it('t = 1.0, overshoot = 2.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('bounceIn', () => {
        const f = ease.bounceIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('bounceInOut', () => {
        const f = ease.bounceInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('bounceOut', () => {
        const f = ease.bounceOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('circularIn', () => {
        const f = ease.circularIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('circularInOut', () => {
        const f = ease.circularInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('circularOut', () => {
        const f = ease.circularOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('cubicIn', () => {
        const f = ease.cubicIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('cubicInOut', () => {
        const f = ease.cubicInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('cubicOut', () => {
        const f = ease.cubicOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('elasticIn', () => {
        const f = ease.elasticIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, amplitude = 0.5, period = 0.5', () => {
            test.assertNumberAlmostEqual(f(0.0, 0.5, 0.5), 0.0);
        });
        it('t = 0.0, amplitude = 1.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, 1.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = 1.0, amplitude = 0.5, period = 0.5', () => {
            test.assertNumberAlmostEqual(f(1.0, 0.5, 0.5), 1.0);
        });
        it('t = 1.0, amplitude = 1.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, 1.0), 1.0);
        });
        it('t = 1.0, amplitude = 2.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0, 1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('elasticInOut', () => {
        const f = ease.elasticInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, amplitude = 0.5, period = 0.5', () => {
            test.assertNumberAlmostEqual(f(0.0, 0.5, 0.5), 0.0);
        });
        it('t = 0.0, amplitude = 1.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, 1.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = 1.0, amplitude = 0.5, period = 0.5', () => {
            test.assertNumberAlmostEqual(f(1.0, 0.5, 0.5), 1.0);
        });
        it('t = 1.0, amplitude = 1.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, 1.0), 1.0);
        });
        it('t = 1.0, amplitude = 2.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0, 1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('elasticOut', () => {
        const f = ease.elasticOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, amplitude = 0.5, period = 0.5', () => {
            test.assertNumberAlmostEqual(f(0.0, 0.5, 0.5), 0.0);
        });
        it('t = 0.0, amplitude = 1.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, 1.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = 1.0, amplitude = 0.5, period = 0.5', () => {
            test.assertNumberAlmostEqual(f(1.0, 0.5, 0.5), 1.0);
        });
        it('t = 1.0, amplitude = 1.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, 1.0), 1.0);
        });
        it('t = 1.0, amplitude = 2.0, period = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0, 1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('exponentialIn', () => {
        const f = ease.exponentialIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('exponentialInOut', () => {
        const f = ease.exponentialInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('exponentialOut', () => {
        const f = ease.exponentialOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('none', () => {
        const f = ease.none;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quadraticIn', () => {
        const f = ease.quadraticIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quadraticInOut', () => {
        const f = ease.quadraticInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quadraticOut', () => {
        const f = ease.quadraticOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quarticIn', () => {
        const f = ease.quarticIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quarticInOut', () => {
        const f = ease.quarticInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quarticOut', () => {
        const f = ease.quarticOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quinticIn', () => {
        const f = ease.quinticIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quinticInOut', () => {
        const f = ease.quinticInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('quinticOut', () => {
        const f = ease.quinticOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('sexticIn', () => {
        const f = ease.sexticIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('sexticInOut', () => {
        const f = ease.sexticInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('sexticOut', () => {
        const f = ease.sexticOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('sineIn', () => {
        const f = ease.sineIn;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('sineInOut', () => {
        const f = ease.sineInOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('sineOut', () => {
        const f = ease.sineOut;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
    });
    describe('waveCosine', () => {
        const f = ease.waveCosine;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, false, false), 1.0);
        });
        it('t = 0.0, frequency = 2.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 2.0, false, false), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, true, false), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = true', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, true, true), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = true', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, false, true), 0.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), -1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, false, false), -1.0);
        });
        it('t = 1.0, frequency = 2.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0, false, false), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, true, false), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = true', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, true, true), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = true', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, false, true), 2.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
        // console.log(0.0, f(0.0));
        // console.log(0.0, f(0.0, 1.0, false, false));
        // console.log(0.0, f(0.0, 2.0, false, false));
        // console.log(0.0, f(0.0, 1.0, true, false));
        // console.log(0.0, f(0.0, 1.0, true, true));
        // console.log(0.0, f(0.0, 1.0, false, true));
        // console.log(1.0, f(1.0));
        // console.log(1.0, f(1.0, 1.0, false, false));
        // console.log(1.0, f(1.0, 2.0, false, false));
        // console.log(1.0, f(1.0, 1.0, true, false));
        // console.log(1.0, f(1.0, 1.0, true, true));
        // console.log(1.0, f(1.0, 1.0, false, true));
    });
    describe('waveSawtooth', () => {
        const f = ease.waveSawtooth;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 2.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 2.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, true, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = true', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, true, true), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = true', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, false, true), 1.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 2.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, true, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = true', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, true, true), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = true', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, false, true), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
        // console.log(0.0, f(0.0));
        // console.log(0.0, f(0.0, 1.0, false, false));
        // console.log(0.0, f(0.0, 2.0, false, false));
        // console.log(0.0, f(0.0, 1.0, true, false));
        // console.log(0.0, f(0.0, 1.0, true, true));
        // console.log(0.0, f(0.0, 1.0, false, true));
        // console.log(1.0, f(1.0));
        // console.log(1.0, f(1.0, 1.0, false, false));
        // console.log(1.0, f(1.0, 2.0, false, false));
        // console.log(1.0, f(1.0, 1.0, true, false));
        // console.log(1.0, f(1.0, 1.0, true, true));
        // console.log(1.0, f(1.0, 1.0, false, true));
    });
    describe('waveSine', () => {
        const f = ease.waveSine;
        it('t = 0.0', () => {
            test.assertNumberAlmostEqual(f(0.0), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 2.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 2.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = false', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, true, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = true', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, true, true), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = true', () => {
            test.assertNumberAlmostEqual(f(0.0, 1.0, false, true), 1.0);
        });
        it('t = 1.0', () => {
            test.assertNumberAlmostEqual(f(1.0), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 2.0, absolute = false, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 2.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = false', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, true, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = true', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, true, true), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = true', () => {
            test.assertNumberAlmostEqual(f(1.0, 1.0, false, true), 1.0);
        });
        it('t = { loop from 0.0 to 1.0 }', () => {
            assertReturnAlwaysNumber(f);
        });
        // console.log(0.0, f(0.0));
        // console.log(0.0, f(0.0, 1.0, false, false));
        // console.log(0.0, f(0.0, 2.0, false, false));
        // console.log(0.0, f(0.0, 1.0, true, false));
        // console.log(0.0, f(0.0, 1.0, true, true));
        // console.log(0.0, f(0.0, 1.0, false, true));
        // console.log(1.0, f(1.0));
        // console.log(1.0, f(1.0, 1.0, false, false));
        // console.log(1.0, f(1.0, 2.0, false, false));
        // console.log(1.0, f(1.0, 1.0, true, false));
        // console.log(1.0, f(1.0, 1.0, true, true));
        // console.log(1.0, f(1.0, 1.0, false, true));
    });
});
