var utils = require('../dist/utils.js');
var test = utils.test;
var type = utils.type;
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
            test.assertEqual(a(), []);
        });
        it('test args.length = 1, skipCount = 0', function() {
            test.assertEqual(a(1), [1]);
        });
        it('test args.length = 2, skipCount = 0', function() {
            test.assertEqual(a(1, 2), [1, 2]);
        });
        it('test args.length = 3, skipCount = 0', function() {
            test.assertEqual(a(1, 2, 3), [1, 2, 3]);
        });
        it('test args.length = 4, skipCount = 0', function() {
            test.assertEqual(a(1, 2, 3, 4), [1, 2, 3, 4]);
        });
        it('test args.length = 5, skipCount = 0', function() {
            test.assertEqual(a(1, 2, 3, 4, 5), [1, 2, 3, 4, 5]);
        });
        it('test args.length = 0, skipCount = 2', function() {
            test.assertEqual(b(), []);
        });
        it('test args.length = 1, skipCount = 2', function() {
            test.assertEqual(b(1), []);
        });
        it('test args.length = 2, skipCount = 2', function() {
            test.assertEqual(b(1, 2), []);
        });
        it('test args.length = 3, skipCount = 2', function() {
            test.assertEqual(b(1, 2, 3), [3]);
        });
        it('test args.length = 4, skipCount = 2', function() {
            test.assertEqual(b(1, 2, 3, 4), [3, 4]);
        });
        it('test args.length = 5, skipCount = 2', function() {
            test.assertEqual(b(1, 2, 3, 4, 5), [3, 4, 5]);
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
            test.assertEqual(f(obj['dosomethingWithArguments'], null, 1, 2, 3), [1, 2, 3]);
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
            test.assertEqual(ref(), 'ok');
        });
        it('test bind call with func but scope', function() {
            var ref = f(obj.dosomething);
            test.assertEqual(ref(), undefined);
        });
        it('test bind call with func name', function() {
            var ref = f('dosomething', obj);
            test.assertEqual(ref(), 'ok');
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
            test.assertEqual(f(obj['dosomethingWithArguments'], null, 1, 2, 3), [1, 2, 3]);
        });
        it('test call invalid func', function() {
            test.assertThrows(function(){ f(null, obj); });
        })
        it('test call func by name with scope', function() {
            test.assertTrue(f('dosomething', obj));
        });
        it('test call func by name with scope and arguments', function() {
            test.assertEqual(f('dosomethingWithArguments', obj, 1, 2, 3), [1, 2, 3]);
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
            test.assertEqual(counter, 0);
            setTimeout(function(){
                test.assertEqual(counter, 0);
            }, 50);
            setTimeout(function(){
                test.assertEqual(counter, 1);
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
                test.assertEqual(args, [0, 1, true, false, 'a', 'b', 'c']);
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
        var sum = function(a, b) {
            return (a + b);
        };
        var obj = {
            sum: function(a, b) {
                return (a + b);
            }
        };
        it('test memoize func without scope', function() {
            var sumMemoized = f(sum, null);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func with scope', function() {
            var sumMemoized = f(obj.sum, obj);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func by name and scope', function() {
            var sumMemoized = f('sum', obj);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func by name and scope', function() {
            var sumMemoized = f('sum', obj);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func calls count', function() {
            var subCount = 0;
            var sub = function(a, b) {
                subCount++;
                return (a - b);
            };
            var subMemoized = f(sub);
            for (var i = 0; i < 5; i++) {
                subMemoized(10, 5);
            }
            test.assertEqual(subCount, 1);
            subMemoized(10, 0);
            test.assertEqual(subCount, 2);
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
        it('test repeat func called multiple times', function(done) {
            var counter = 0;
            var repeatObj = f(100, function(){
                counter++;
            }, null);
            test.assertEqual(counter, 0);
            setTimeout(function(){
                test.assertTrue(counter >= 9 && counter <= 10);
                repeatObj.cancel();
                done();
            }, 1050);
        });
        it('test repeat func arguments', function(done) {
            var repeatObj = f(100, function(){
                var args = func.args(arguments);
                test.assertEqual(args, [0, 1, true, false, 'a', 'b', 'c']);
                repeatObj.cancel();
                done();
            }, null, 0, 1, true, false, 'a', 'b', 'c');
        });
        it('test repeat func by name with scope', function(done) {
            var obj = {
                dosomething: function(done) {
                    repeatObj.cancel();
                    done();
                }
            };
            var repeatObj = f(100, 'dosomething', obj, done);
        });
        it('test repeat func cancelled', function(done) {
            var dosomething = function(){
                throw new Error('repeat func not cancelled');
            };
            var repeatObj = f(100, dosomething);
            test.assertFunction(repeatObj.func);
            test.assertFunction(repeatObj.cancel);
            repeatObj.cancel();
            func.delay(200, done);
        });
        it('test repeat func by name cancelled', function(done) {
            var obj = {
                dosomething: function(done) {
                    throw new Error('repeat func by name not cancelled');
                }
            };
            var repeatObj = f(100, 'dosomething', obj);
            test.assertFunction(repeatObj.func);
            test.assertFunction(repeatObj.cancel);
            repeatObj.cancel();
            func.delay(200, done);
        });
    });
    describe('validate', function() {
        var f = func.validate;
        it('test validate arguments all types', function() {
            var v = function() {
                func.validate(arguments, type.ARRAY, type.BOOLEAN, type.DATE, type.ERROR, type.FUNCTION, type.NAN, type.NUMBER, type.NULL, type.OBJECT, type.REGEXP, type.STRING, type.UNDEFINED);
            };
            v([], true, new Date(), new Error(), function(){}, NaN, 0, null, {}, /^$/, '', undefined);
        });
        it('test validate arguments multiple possible type for same argument', function() {
            var v = function() {
                func.validate(arguments, [type.STRING, type.BOOLEAN], [type.NUMBER, type.UNDEFINED]);
            };
            v('ok');
            v('ok', undefined);
            v('ok', 0);
            v(true);
            v(true, undefined);
            v(true, 0);
            test.assertThrows(v, true, '');
        });
        it('test validate arguments invalid count', function() {
            var v = function() {
                func.validate(arguments, type.STRING, type.STRING);
            };
            test.assertThrows(v, '');
            v('', '', '', '', '', '');
        });
        it('test validate arguments invalid expected type', function() {
            var v = function() {
                func.validate(arguments, 't y p e');
            };
            test.assertThrows(v, '');
        });
        it('test validate arguments invalid argument', function() {
            var v = function() {
                func.validate(arguments, type.STRING);
            };
            test.assertThrows(v, true);
        });
    });
});