var utils = require('../dist/utils.js');
var test = utils.test;
var ease = utils.ease;
describe('ease', function() {
    var assertAlmostEquals = function(a, b) {
        test.assertTrue(Math.abs(a - b) < 0.0000000001);
    };
    describe('backIn', function() {
        var f = ease.backIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, overshoot = 0.0', function() {
            assertAlmostEquals(f(0.0, 0.0), 0.0);
        });
        it('t = 0.0, overshoot = 1.0', function() {
            assertAlmostEquals(f(0.0, 1.0), 0.0);
        });
        it('t = 0.0, overshoot = 2.0', function() {
            assertAlmostEquals(f(0.0, 2.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
        it('t = 1.0, overshoot = 0.0', function() {
            assertAlmostEquals(f(1.0, 0.0), 1.0);
        });
        it('t = 1.0, overshoot = 1.0', function() {
            assertAlmostEquals(f(1.0, 1.0), 1.0);
        });
        it('t = 1.0, overshoot = 2.0', function() {
            assertAlmostEquals(f(1.0, 2.0), 1.0);
        });
    });
    describe('backInOut', function() {
        var f = ease.backInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, overshoot = 0.0', function() {
            assertAlmostEquals(f(0.0, 0.0), 0.0);
        });
        it('t = 0.0, overshoot = 1.0', function() {
            assertAlmostEquals(f(0.0, 1.0), 0.0);
        });
        it('t = 0.0, overshoot = 2.0', function() {
            assertAlmostEquals(f(0.0, 2.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
        it('t = 1.0, overshoot = 0.0', function() {
            assertAlmostEquals(f(1.0, 0.0), 1.0);
        });
        it('t = 1.0, overshoot = 1.0', function() {
            assertAlmostEquals(f(1.0, 1.0), 1.0);
        });
        it('t = 1.0, overshoot = 2.0', function() {
            assertAlmostEquals(f(1.0, 2.0), 1.0);
        });
    });
    describe('backOut', function() {
        var f = ease.backOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, overshoot = 0.0', function() {
            assertAlmostEquals(f(0.0, 0.0), 0.0);
        });
        it('t = 0.0, overshoot = 1.0', function() {
            assertAlmostEquals(f(0.0, 1.0), 0.0);
        });
        it('t = 0.0, overshoot = 2.0', function() {
            assertAlmostEquals(f(0.0, 2.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
        it('t = 1.0, overshoot = 0.0', function() {
            assertAlmostEquals(f(1.0, 0.0), 1.0);
        });
        it('t = 1.0, overshoot = 1.0', function() {
            assertAlmostEquals(f(1.0, 1.0), 1.0);
        });
        it('t = 1.0, overshoot = 2.0', function() {
            assertAlmostEquals(f(1.0, 2.0), 1.0);
        });
    });
    describe('bounceIn', function() {
        var f = ease.bounceIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('bounceInOut', function() {
        var f = ease.bounceInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('bounceOut', function() {
        var f = ease.bounceOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('circularIn', function() {
        var f = ease.circularIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('circularInOut', function() {
        var f = ease.circularInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('circularOut', function() {
        var f = ease.circularOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('cubicIn', function() {
        var f = ease.cubicIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('cubicInOut', function() {
        var f = ease.cubicInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('cubicOut', function() {
        var f = ease.cubicOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('elasticIn', function() {
        var f = ease.elasticIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, amplitude = 0.5, period = 0.5', function() {
            assertAlmostEquals(f(0.0, 0.5, 0.5), 0.0);
        });
        it('t = 0.0, amplitude = 1.0, period = 1.0', function() {
            assertAlmostEquals(f(0.0, 1.0, 1.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
        it('t = 1.0, amplitude = 0.5, period = 0.5', function() {
            assertAlmostEquals(f(1.0, 0.5, 0.5), 1.0);
        });
        it('t = 1.0, amplitude = 1.0, period = 1.0', function() {
            assertAlmostEquals(f(1.0, 1.0, 1.0), 1.0);
        });
    });
    describe('elasticInOut', function() {
        var f = ease.elasticInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, amplitude = 0.5, period = 0.5', function() {
            assertAlmostEquals(f(0.0, 0.5, 0.5), 0.0);
        });
        it('t = 0.0, amplitude = 1.0, period = 1.0', function() {
            assertAlmostEquals(f(0.0, 1.0, 1.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
        it('t = 1.0, amplitude = 0.5, period = 0.5', function() {
            assertAlmostEquals(f(1.0, 0.5, 0.5), 1.0);
        });
        it('t = 1.0, amplitude = 1.0, period = 1.0', function() {
            assertAlmostEquals(f(1.0, 1.0, 1.0), 1.0);
        });
    });
    describe('elasticOut', function() {
        var f = ease.elasticOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, amplitude = 0.5, period = 0.5', function() {
            assertAlmostEquals(f(0.0, 0.5, 0.5), 0.0);
        });
        it('t = 0.0, amplitude = 1.0, period = 1.0', function() {
            assertAlmostEquals(f(0.0, 1.0, 1.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
        it('t = 1.0, amplitude = 0.5, period = 0.5', function() {
            assertAlmostEquals(f(1.0, 0.5, 0.5), 1.0);
        });
        it('t = 1.0, amplitude = 1.0, period = 1.0', function() {
            assertAlmostEquals(f(1.0, 1.0, 1.0), 1.0);
        });
    });
    describe('exponentialIn', function() {
        var f = ease.exponentialIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('exponentialInOut', function() {
        var f = ease.exponentialInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('exponentialOut', function() {
        var f = ease.exponentialOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('none', function() {
        var f = ease.none;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quadraticIn', function() {
        var f = ease.quadraticIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quadraticInOut', function() {
        var f = ease.quadraticInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quadraticOut', function() {
        var f = ease.quadraticOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quarticIn', function() {
        var f = ease.quarticIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quarticInOut', function() {
        var f = ease.quarticInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quarticOut', function() {
        var f = ease.quarticOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quinticIn', function() {
        var f = ease.quinticIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quinticInOut', function() {
        var f = ease.quinticInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('quinticOut', function() {
        var f = ease.quinticOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('sexticIn', function() {
        var f = ease.sexticIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('sexticInOut', function() {
        var f = ease.sexticInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('sexticOut', function() {
        var f = ease.sexticOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('sineIn', function() {
        var f = ease.sineIn;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('sineInOut', function() {
        var f = ease.sineInOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('sineOut', function() {
        var f = ease.sineOut;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 1.0);
        });
    });
    describe('waveCosine', function() {
        var f = ease.waveCosine;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(0.0, 1.0, false, false), 1.0);
        });
        it('t = 0.0, frequency = 2.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(0.0, 2.0, false, false), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = false', function() {
            assertAlmostEquals(f(0.0, 1.0, true, false), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = true', function() {
            assertAlmostEquals(f(0.0, 1.0, true, true), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = true', function() {
            assertAlmostEquals(f(0.0, 1.0, false, true), 0.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), -1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(1.0, 1.0, false, false), -1.0);
        });
        it('t = 1.0, frequency = 2.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(1.0, 2.0, false, false), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = false', function() {
            assertAlmostEquals(f(1.0, 1.0, true, false), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = true', function() {
            assertAlmostEquals(f(1.0, 1.0, true, true), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = true', function() {
            assertAlmostEquals(f(1.0, 1.0, false, true), 2.0);
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
    describe('waveSawtooth', function() {
        var f = ease.waveSawtooth;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(0.0, 1.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 2.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(0.0, 2.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = false', function() {
            assertAlmostEquals(f(0.0, 1.0, true, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = true', function() {
            assertAlmostEquals(f(0.0, 1.0, true, true), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = true', function() {
            assertAlmostEquals(f(0.0, 1.0, false, true), 1.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(1.0, 1.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 2.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(1.0, 2.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = false', function() {
            assertAlmostEquals(f(1.0, 1.0, true, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = true', function() {
            assertAlmostEquals(f(1.0, 1.0, true, true), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = true', function() {
            assertAlmostEquals(f(1.0, 1.0, false, true), 1.0);
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
    describe('waveSine', function() {
        var f = ease.waveSine;
        it('t = 0.0', function() {
            assertAlmostEquals(f(0.0), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(0.0, 1.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 2.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(0.0, 2.0, false, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = false', function() {
            assertAlmostEquals(f(0.0, 1.0, true, false), 0.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = true, inverse = true', function() {
            assertAlmostEquals(f(0.0, 1.0, true, true), 1.0);
        });
        it('t = 0.0, frequency = 1.0, absolute = false, inverse = true', function() {
            assertAlmostEquals(f(0.0, 1.0, false, true), 1.0);
        });
        it('t = 1.0', function() {
            assertAlmostEquals(f(1.0), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(1.0, 1.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 2.0, absolute = false, inverse = false', function() {
            assertAlmostEquals(f(1.0, 2.0, false, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = false', function() {
            assertAlmostEquals(f(1.0, 1.0, true, false), 0.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = true, inverse = true', function() {
            assertAlmostEquals(f(1.0, 1.0, true, true), 1.0);
        });
        it('t = 1.0, frequency = 1.0, absolute = false, inverse = true', function() {
            assertAlmostEquals(f(1.0, 1.0, false, true), 1.0);
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