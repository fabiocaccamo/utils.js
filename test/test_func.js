import utils from '../src/utils.js';
const test = utils.test;
const type = utils.type;
const func = utils.func;

describe('func', () => {
    describe('args', () => {
        const f = func.args;
        const a = (...args) => {
            return f(args);
        };
        const b = (...args) => {
            return f(args, 2);
        };
        it('test args', () => {
            test.assertEqual(a(), []);
        });
        it('test args.length = 1, skipCount = 0', () => {
            test.assertEqual(a(1), [1]);
        });
        it('test args.length = 2, skipCount = 0', () => {
            test.assertEqual(a(1, 2), [1, 2]);
        });
        it('test args.length = 3, skipCount = 0', () => {
            test.assertEqual(a(1, 2, 3), [1, 2, 3]);
        });
        it('test args.length = 4, skipCount = 0', () => {
            test.assertEqual(a(1, 2, 3, 4), [1, 2, 3, 4]);
        });
        it('test args.length = 5, skipCount = 0', () => {
            test.assertEqual(a(1, 2, 3, 4, 5), [1, 2, 3, 4, 5]);
        });
        it('test args.length = 0, skipCount = 2', () => {
            test.assertEqual(b(), []);
        });
        it('test args.length = 1, skipCount = 2', () => {
            test.assertEqual(b(1), []);
        });
        it('test args.length = 2, skipCount = 2', () => {
            test.assertEqual(b(1, 2), []);
        });
        it('test args.length = 3, skipCount = 2', () => {
            test.assertEqual(b(1, 2, 3), [3]);
        });
        it('test args.length = 4, skipCount = 2', () => {
            test.assertEqual(b(1, 2, 3, 4), [3, 4]);
        });
        it('test args.length = 5, skipCount = 2', () => {
            test.assertEqual(b(1, 2, 3, 4, 5), [3, 4, 5]);
        });
    });
    describe('attempt', () => {
        const f = func.attempt;
        const obj = {
            dosomething() {
                return true;
            },
            dosomethingWithArguments(...args) {
                return func.args(args);
            },
        };
        it('test attempt func name with scope', () => {
            test.assertTrue(f('dosomething', obj));
        });
        it('test attempt invalid func name with scope', () => {
            test.assertError(f('dosomethingInvalid', obj));
        });
        it('test attempt no func with scope', () => {
            test.assertError(f(null, obj));
        });
        it('test attempt func name without scope', () => {
            test.assertError(f('dosomething', null));
        });
        it('test attempt func without scope', () => {
            test.assertTrue(f(obj['dosomething']));
        });
        it('test attempt func without scope but arguments', () => {
            test.assertEqual(
                f(obj['dosomethingWithArguments'], null, 1, 2, 3),
                [1, 2, 3]
            );
        });
    });
    describe('bind', () => {
        const f = func.bind;
        const obj = {
            value: 'ok',
            getValue() {
                return this.value;
            },
            getArgs(a, b, c, d) {
                return [a || null, b || null, c || null, d || null];
            },
        };
        it('test bind is function', () => {
            const ref = f('getValue', obj);
            test.assertFunction(ref);
        });
        it('test bind call with func', () => {
            const ref = f(obj.getValue, obj);
            test.assertEqual(ref(), 'ok');
        });
        it('test bind call with func but scope', () => {
            const ref = f(obj.getValue);
            // test.assertEqual(ref(), undefined);
            test.assertThrows(ref);
        });
        it('test bind call with func name', () => {
            const ref = f('getValue', obj);
            test.assertEqual(ref(), 'ok');
        });
        it('test bind call with func name but scope', () => {
            const ref = f('getValue', null);
            test.assertThrows(ref);
        });
        it('test bind with args', () => {
            let ref;
            ref = f(obj.getArgs, obj);
            test.assertEqual(ref(), [null, null, null, null]);

            ref = f(obj.getArgs, obj, 1);
            test.assertEqual(ref(), [1, null, null, null]);

            ref = f(obj.getArgs, obj, 1, 2);
            test.assertEqual(ref(), [1, 2, null, null]);

            ref = f(obj.getArgs, obj, 1, 2, 3, null);
            test.assertEqual(ref(), [1, 2, 3, null]);

            ref = f(obj.getArgs, obj, 1, 2, 3, 4);
            test.assertEqual(ref(), [1, 2, 3, 4]);
        });
        it('test bind with args and call with args', () => {
            let ref;
            ref = f(obj.getArgs, obj);
            test.assertEqual(ref('a'), ['a', null, null, null]);

            ref = f(obj.getArgs, obj, 1);
            test.assertEqual(ref('a'), [1, 'a', null, null]);

            ref = f(obj.getArgs, obj, 1, 2);
            test.assertEqual(ref('a', 'b'), [1, 2, 'a', 'b']);
        });
    });
    describe('call', () => {
        const f = func.call;
        const obj = {
            dosomething() {
                return true;
            },
            dosomethingWithArguments(...args) {
                return func.args(args);
            },
        };
        it('test call func', () => {
            test.assertTrue(f(obj['dosomething']));
        });
        it('test call func with arguments', () => {
            test.assertEqual(
                f(obj['dosomethingWithArguments'], null, 1, 2, 3),
                [1, 2, 3]
            );
        });
        it('test call invalid func', () => {
            test.assertThrows(() => {
                f(null, obj);
            });
        });
        it('test call func by name with scope', () => {
            test.assertTrue(f('dosomething', obj));
        });
        it('test call func by name with scope and arguments', () => {
            test.assertEqual(f('dosomethingWithArguments', obj, 1, 2, 3), [1, 2, 3]);
        });
        it('test call func by name without scope', () => {
            test.assertThrows(() => {
                f('dosomething', null);
            });
        });
        it('test call func by invalid name', () => {
            test.assertThrows(() => {
                f('dosomethingInvalid', obj);
            });
        });
    });
    describe('debounce', () => {
        const f = func.debounce;
        it('test debounce', (done) => {
            let counter = 0;
            const counterInc = f(100, () => {
                counter++;
            });
            const interval = setInterval(counterInc, 50);
            setTimeout(() => {
                clearInterval(interval);
                test.assertEqual(counter, 0);
                counterInc();
            }, 300);
            setTimeout(() => {
                test.assertEqual(counter, 1);
                done();
            }, 500);
        });
    });
    describe('delay', () => {
        const f = func.delay;
        it('test delay func called once', (done) => {
            let counter = 0;
            f(
                100,
                () => {
                    counter++;
                },
                null
            );
            test.assertEqual(counter, 0);
            setTimeout(() => {
                test.assertEqual(counter, 0);
            }, 50);
            setTimeout(() => {
                test.assertEqual(counter, 1);
                done();
            }, 300);
        });
        it('test delay func delay accuracy', (done) => {
            const timestamp = utils.date.timestamp();
            let delayElapsed;
            const delayExpected = 100;
            let delayDiff;
            const delayTolerance = 20;
            f(
                delayExpected,
                () => {
                    delayElapsed = utils.date.timestamp() - timestamp;
                    delayDiff = Math.abs(delayElapsed - delayExpected);
                    test.assertTrue(delayDiff <= delayTolerance);
                    done();
                },
                null
            );
        });
        it('test delay func arguments', (done) => {
            f(
                100,
                (...args) => {
                    // const args = func.args(arguments);
                    test.assertEqual(args, [0, 1, true, false, 'a', 'b', 'c']);
                    done();
                },
                null,
                0,
                1,
                true,
                false,
                'a',
                'b',
                'c'
            );
        });
        it('test delay func by name with scope', (done) => {
            const obj = {
                dosomething(done) {
                    done();
                },
            };
            f(100, 'dosomething', obj, done);
        });
        it('test delay func cancelled', (done) => {
            const dosomething = () => {
                throw new Error('delay func not cancelled');
            };
            const delayObj = f(100, dosomething);
            test.assertFunction(delayObj.func);
            test.assertFunction(delayObj.cancel);
            delayObj.cancel();
            f(200, done);
        });
        it('test delay func by name cancelled', (done) => {
            const obj = {
                dosomething(done) {
                    throw new Error('delay func by name not cancelled');
                },
            };
            const delayObj = f(100, 'dosomething', obj);
            test.assertFunction(delayObj.func);
            test.assertFunction(delayObj.cancel);
            delayObj.cancel();
            f(200, done);
        });
    });
    describe('memoize', () => {
        const f = func.memoize;
        const sum = (a, b) => {
            return a + b;
        };
        const obj = {
            sum(a, b) {
                return a + b;
            },
        };
        it('test memoize func without scope', () => {
            const sumMemoized = f(sum, null);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func with scope', () => {
            const sumMemoized = f(obj.sum, obj);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func by name and scope', () => {
            const sumMemoized = f('sum', obj);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func by name and scope', () => {
            const sumMemoized = f('sum', obj);
            test.assertEqual(sumMemoized(1, 2), 3);
        });
        it('test memoize func calls count', () => {
            let subCount = 0;
            const sub = (a, b) => {
                subCount++;
                return a - b;
            };
            const subMemoized = f(sub);
            for (let i = 0; i < 5; i++) {
                subMemoized(10, 5);
            }
            test.assertEqual(subCount, 1);
            subMemoized(10, 0);
            test.assertEqual(subCount, 2);
        });
    });
    describe('noop', () => {
        const f = func.noop;
        it('test noop', () => {
            test.assertTrue(f());
        });
    });
    describe('repeat', () => {
        const f = func.repeat;
        it('test repeat func called multiple times', (done) => {
            let counter = 0;
            const repeatObj = f(
                100,
                () => {
                    counter++;
                },
                null
            );
            test.assertEqual(counter, 0);
            setTimeout(() => {
                test.assertTrue(counter >= 9 && counter <= 10);
                repeatObj.cancel();
                done();
            }, 1050);
        });
        it('test repeat func arguments', (done) => {
            const repeatObj = f(
                100,
                (...args) => {
                    test.assertEqual(args, [0, 1, true, false, 'a', 'b', 'c']);
                    repeatObj.cancel();
                    done();
                },
                null,
                0,
                1,
                true,
                false,
                'a',
                'b',
                'c'
            );
        });
        it('test repeat func by name with scope', (done) => {
            let repeatObj;
            const obj = {
                dosomething(done) {
                    repeatObj.cancel();
                    done();
                },
            };
            repeatObj = f(100, 'dosomething', obj, done);
        });
        it('test repeat func cancelled', (done) => {
            const dosomething = () => {
                throw new Error('repeat func not cancelled');
            };
            const repeatObj = f(100, dosomething);
            test.assertFunction(repeatObj.func);
            test.assertFunction(repeatObj.cancel);
            repeatObj.cancel();
            func.delay(200, done);
        });
        it('test repeat func by name cancelled', (done) => {
            const obj = {
                dosomething(done) {
                    throw new Error('repeat func by name not cancelled');
                },
            };
            const repeatObj = f(100, 'dosomething', obj);
            test.assertFunction(repeatObj.func);
            test.assertFunction(repeatObj.cancel);
            repeatObj.cancel();
            func.delay(200, done);
        });
    });
    describe('throttle', () => {
        const f = func.throttle;
        it('test throttle', (done) => {
            let counter = 0;
            const counterInc = f(200, () => {
                counter++;
            });
            const interval = setInterval(counterInc, 50);
            setTimeout(() => {
                clearInterval(interval);
                test.assertEqual(counter, 5);
                done();
            }, 1000);
        });
    });
    describe('until', () => {
        const f = func.until;
        it('test until', (done) => {
            let counter = 0;
            const checker = f(50, () => {
                counter++;
                if (counter === 10) {
                    return false;
                }
            });
            setTimeout(() => {
                // clearInterval(interval);
                test.assertEqual(counter, 10);
                done();
            }, 1000);
        });
    });
    describe('validate', () => {
        const f = func.validate;
        it('test validate arguments all types', () => {
            const v = (...args) => {
                func.validate(
                    args,
                    type.ARRAY,
                    type.BOOLEAN,
                    type.DATE,
                    type.ERROR,
                    type.FUNCTION,
                    type.NAN,
                    type.NUMBER,
                    type.NULL,
                    type.OBJECT,
                    type.REGEXP,
                    type.STRING,
                    type.UNDEFINED
                );
            };
            v(
                [],
                true,
                new Date(),
                new Error(),
                () => {},
                NaN,
                0,
                null,
                {},
                /^$/,
                '',
                undefined
            );
        });
        it('test validate arguments multiple possible type for same argument', () => {
            const v = (...args) => {
                func.validate(
                    args,
                    [type.STRING, type.BOOLEAN],
                    [type.NUMBER, type.UNDEFINED]
                );
            };
            v('ok');
            v('ok', undefined);
            v('ok', 0);
            v(true);
            v(true, undefined);
            v(true, 0);
            test.assertThrows(v, true, '');
        });
        it('test validate arguments invalid count', () => {
            const v = (...args) => {
                func.validate(args, type.STRING, type.STRING);
            };
            test.assertThrows(v, '');
            v('', '', '', '', '', '');
        });
        it('test validate arguments invalid expected type', () => {
            const v = (...args) => {
                func.validate(args, 't y p e');
            };
            test.assertThrows(v, '');
        });
        it('test validate arguments invalid argument', () => {
            const v = (...args) => {
                func.validate(args, type.STRING);
            };
            test.assertThrows(v, true);
        });
    });
});
