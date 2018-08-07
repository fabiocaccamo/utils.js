var utils = require('../dist/utils.js');
var test = utils.test;
var func = utils.func;

describe('func', function() {
    describe('args', function() {
        var f = func.args;
        var a = function(a, b, c) {
            return f(arguments);
        };
        var b = function(a, b, c) {
            return f(arguments, 2);
        };
        it('test args', function() {
            test.assertEquals(a(), []);
        });
        it('test args.length = 1, skipCount = 0', function() {
            test.assertEquals(a(1), [1]);
        });
        it('test args.length = 2, skipCount = 0', function() {
            test.assertEquals(a(1, 2), [1, 2]);
        });
        it('test args.length = 3, skipCount = 0', function() {
            test.assertEquals(a(1, 2, 3), [1, 2, 3]);
        });
        it('test args.length = 4, skipCount = 0', function() {
            test.assertEquals(a(1, 2, 3, 4), [1, 2, 3, 4]);
        });
        it('test args.length = 5, skipCount = 0', function() {
            test.assertEquals(a(1, 2, 3, 4, 5), [1, 2, 3, 4, 5]);
        });
        it('test args.length = 0, skipCount = 2', function() {
            test.assertEquals(b(), []);
        });
        it('test args.length = 1, skipCount = 2', function() {
            test.assertEquals(b(1), []);
        });
        it('test args.length = 2, skipCount = 2', function() {
            test.assertEquals(b(1, 2), []);
        });
        it('test args.length = 3, skipCount = 2', function() {
            test.assertEquals(b(1, 2, 3), [3]);
        });
        it('test args.length = 4, skipCount = 2', function() {
            test.assertEquals(b(1, 2, 3, 4), [3, 4]);
        });
        it('test args.length = 5, skipCount = 2', function() {
            test.assertEquals(b(1, 2, 3, 4, 5), [3, 4, 5]);
        });
    });
    describe('attempt', function() {
        var f = func.attempt;
        var obj = {
            dosomething: function() {
                return true;
            },
            dosomethingWithArguments: function() {
                return func.args(arguments);
            }
        };
        it('test attempt func name with scope', function() {
            test.assertTrue(f('dosomething', obj));
        });
        it('test attempt invalid func name with scope', function() {
            test.assertError(f('dosomethingInvalid', obj));
        });
        it('test attempt no func with scope', function() {
            test.assertError(f(null, obj));
        });
        it('test attempt func name without scope', function() {
            test.assertError(f('dosomething', null));
        });
        it('test attempt func without scope', function() {
            test.assertTrue(f(obj['dosomething']));
        });
        it('test attempt func without scope but arguments', function() {
            test.assertEquals(f(obj['dosomethingWithArguments'], null, 1, 2, 3), [1, 2, 3]);
        });
    });
    describe('bind', function() {
        var f = func.bind;
        var obj = {
            value: 'ok',
            dosomething: function() {
                return this.value;
            }
        };
        it('test bind is function', function() {
            var ref = f('dosomething', obj);
            test.assertFunction(ref);
        });
        it('test bind call with func', function() {
            var ref = f(obj.dosomething, obj);
            test.assertEquals(ref(), 'ok');
        });
        it('test bind call with func but scope', function() {
            var ref = f(obj.dosomething);
            test.assertEquals(ref(), undefined);
        });
        it('test bind call with func name', function() {
            var ref = f('dosomething', obj);
            test.assertEquals(ref(), 'ok');
        });
        it('test bind call with func name but scope', function() {
            var ref = f('dosomething', null);
            test.assertThrows(ref);
        });
    });
    describe('call', function() {
        var f = func.call;
        var obj = {
            dosomething: function() {
                return true;
            },
            dosomethingWithArguments: function() {
                return func.args(arguments);
            }
        };
        it('test call func', function() {
            test.assertTrue(f(obj['dosomething']));
        });
        it('test call func with arguments', function() {
            test.assertEquals(f(obj['dosomethingWithArguments'], null, 1, 2, 3), [1, 2, 3]);
        });
        it('test call invalid func', function() {
            test.assertThrows(function(){ f(null, obj); });
        })
        it('test call func by name with scope', function() {
            test.assertTrue(f('dosomething', obj));
        });
        it('test call func by name with scope and arguments', function() {
            test.assertEquals(f('dosomethingWithArguments', obj, 1, 2, 3), [1, 2, 3]);
        });
        it('test call func by name without scope', function() {
            test.assertThrows(function(){ f('dosomething', null); });
        });
        it('test call func by invalid name', function() {
            test.assertThrows(function(){ f('dosomethingInvalid', obj); });
        });
    });
    describe('delay', function() {
        var f = func.delay;
        it('test delay func called once', function(done) {
            var counter = 0;
            f(100, function(){
                counter++;
            }, null);
            test.assertEquals(counter, 0);
            setTimeout(function(){
                test.assertEquals(counter, 0);
            }, 50);
            setTimeout(function(){
                test.assertEquals(counter, 1);
                done();
            }, 300);
        });
        it('test delay func delay accuracy', function(done) {
            var timestamp = utils.date.timestamp();
            var delayElapsed;
            var delayExpected = 100;
            var delayDiff;
            var delayTolerance = 20;
            f(delayExpected, function(){
                delayElapsed = (utils.date.timestamp() - timestamp);
                delayDiff = Math.abs(delayElapsed - delayExpected);
                test.assertTrue(delayDiff <= delayTolerance);
                done();
            }, null);
        });
        it('test delay func arguments', function(done) {
            f(100, function(){
                var args = func.args(arguments);
                test.assertEquals(args, [0, 1, true, false, 'a', 'b', 'c']);
                done();
            }, null, 0, 1, true, false, 'a', 'b', 'c');
        });
        it('test delay func by name with scope', function(done) {
            var obj = {
                dosomething: function(done) {
                    done();
                }
            };
            f(100, 'dosomething', obj, done);
        });
        it('test delay func cancelled', function(done) {
            var dosomething = function(){
                throw new Error('delay func not cancelled');
            };
            var delayObj = f(100, dosomething);
            test.assertFunction(delayObj.func);
            test.assertFunction(delayObj.cancel);
            delayObj.cancel();
            f(200, done);
        });
        it('test delay func by name cancelled', function(done) {
            var obj = {
                dosomething: function(done) {
                    throw new Error('delay func by name not cancelled');
                }
            };
            var delayObj = f(100, 'dosomething', obj);
            test.assertFunction(delayObj.func);
            test.assertFunction(delayObj.cancel);
            delayObj.cancel();
            f(200, done);
        });
    });
    describe('memoize', function() {
        var f = func.memoize;
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('noop', function() {
        var f = func.noop;
        it('test noop', function() {
            test.assertTrue(f());
        });
    });
    describe('repeat', function() {
        var f = func.repeat;
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('validate', function() {
        var f = func.validate;
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
});