import utils from '../src/utils.js';
const test = utils.test;

describe('test', () => {
    describe('assertArray', () => {
        it('test assertArray', () => {
            test.assertArray([1, 2, 3, 4, 5]);
        });
        it('test assertArray and length', () => {
            test.assertArray([1, 2, 3, 4, 5], 5);
        });
        it('test assertArray throws', () => {
            test.assertThrows(() => {
                test.assertArray(false);
            });
        });
        it('test assertArray and length throws', () => {
            test.assertThrows(() => {
                test.assertArray([1, 2, 3, 4, 5], 4);
            });
        });
    });
    describe('assertBase64', () => {
        it('test assertBase64', () => {
            test.assertBase64('QGZhYmlvY2FjY2Ftby91dGlscy5qcw==');
        });
        it('test assertBase64 throws', () => {
            test.assertThrows(() => {
                test.assertBase64('');
            });
        });
    });
    describe('assertBoolean', () => {
        it('test assertBoolean true', () => {
            test.assertBoolean(true);
        });
        it('test assertBoolean false', () => {
            test.assertBoolean(false);
        });
        it('test assertBoolean throws', () => {
            test.assertThrows(() => {
                test.assertBoolean(null);
            });
        });
    });
    describe('assertDate', () => {
        it('test assertDate', () => {
            test.assertDate(new Date());
        });
        it('test assertDate throws', () => {
            test.assertThrows(() => {
                test.assertDate(true);
            });
        });
    });
    describe('assertEqual', () => {
        it('test assertEqual', () => {
            test.assertEqual(
                { a: 1, b: 'ok', c: true, d: [] },
                { a: 1, b: 'ok', c: true, d: [] }
            );
        });
        it('test assertEqual throws', () => {
            test.assertThrows(() => {
                test.assertEqual(
                    { a: 1, b: 'ok', c: true, d: [] },
                    { a: 1, b: 'ok', c: true, d: [null] }
                );
            });
        });
    });
    describe('assertError', () => {
        it('test assertError', () => {
            test.assertError(new Error());
        });
        it('test assertError throws', () => {
            test.assertThrows(() => {
                test.assertError(true);
            });
        });
    });
    describe('assertFalse', () => {
        it('test assertFalse', () => {
            test.assertFalse(false);
        });
        it('test assertFalse throws', () => {
            test.assertThrows(() => {
                test.assertFalse(null);
            });
            test.assertThrows(() => {
                test.assertFalse(true);
            });
        });
    });
    describe('assertFunction', () => {
        it('test assertFunction', () => {
            test.assertFunction(() => {});
        });
        it('test assertFunction throws', () => {
            test.assertThrows(() => {
                test.assertFunction({});
            });
        });
    });
    describe('assertJSON', () => {
        it('test assertJSON', () => {
            test.assertJSON('{"k":[0,1,2,3,"","a","b","c",null,null,null]}');
        });
        it('test assertJSON throws', () => {
            test.assertThrows(() => {
                test.assertJSON('');
            });
        });
    });
    describe('assertNaN', () => {
        it('test assertNaN', () => {
            test.assertNaN(NaN);
        });
        it('test assertNaN throws', () => {
            test.assertThrows(() => {
                test.assertNaN(null);
            });
        });
    });
    describe('assertNone', () => {
        it('test assertNone NaN', () => {
            test.assertNone(NaN);
        });
        it('test assertNone null', () => {
            test.assertNone(null);
        });
        it('test assertNone undefined', () => {
            test.assertNone(undefined);
        });
        it('test assertNone throws', () => {
            test.assertThrows(() => {
                test.assertNone('ok');
            });
        });
    });
    describe('assertNotArray', () => {
        it('test assertNotArray', () => {
            test.assertNotArray(true);
        });
        it('test assertNotArray throws', () => {
            test.assertThrows(() => {
                test.assertNotArray([]);
            });
        });
    });
    describe('assertNotBase64', () => {
        it('test assertNotBase64', () => {
            test.assertNotBase64(true);
        });
        it('test assertNotBase64 throws', () => {
            test.assertThrows(() => {
                test.assertNotBase64('QGZhYmlvY2FjY2Ftby91dGlscy5qcw==');
            });
        });
    });
    describe('assertNotBoolean', () => {
        it('test assertNotBoolean', () => {
            test.assertNotBoolean(1);
        });
        it('test assertNotBoolean throws', () => {
            test.assertThrows(() => {
                test.assertNotBoolean(true);
            });
        });
    });
    describe('assertNotDate', () => {
        it('test assertNotDate', () => {
            test.assertNotDate(1);
        });
        it('test assertNotDate throws', () => {
            test.assertThrows(() => {
                test.assertNotDate(new Date());
            });
        });
    });
    describe('assertNotEqual', () => {
        it('test assertNotEqual', () => {
            test.assertNotEqual(
                { a: 1, b: 'ok', c: true, d: [] },
                { a: 1, b: 'ok', c: true }
            );
        });
        it('test assertNotEqual throws', () => {
            test.assertThrows(() => {
                test.assertNotEqual(
                    { a: 1, b: 'ok', c: true, d: [] },
                    { a: 1, b: 'ok', c: true, d: [] }
                );
            });
        });
    });
    describe('assertNotError', () => {
        it('test assertNotError', () => {
            test.assertNotError('[Error]');
        });
        it('test assertNotError throws', () => {
            test.assertThrows(() => {
                test.assertNotError(new Error());
            });
        });
    });
    describe('assertNotFunction', () => {
        it('test assertNotFunction', () => {
            test.assertNotFunction({});
        });
        it('test assertNotFunction throws', () => {
            test.assertThrows(() => {
                test.assertNotFunction(() => {});
            });
        });
    });
    describe('assertNotJSON', () => {
        it('test assertNotJSON', () => {
            test.assertNotJSON('');
        });
        it('test assertNotJSON throws', () => {
            test.assertThrows(() => {
                test.assertNotJSON('{"k":[0,1,2,3,"","a","b","c",null,null,null]}');
            });
        });
    });
    describe('assertNotNone', () => {
        it('test assertNotNone', () => {
            test.assertNotNone(0);
        });
        it('test assertNotNone throws', () => {
            test.assertThrows(() => {
                test.assertNotNone(undefined);
            });
        });
    });
    describe('assertNotNumber', () => {
        it('test assertNotNumber', () => {
            test.assertNotNumber('100');
        });
        it('test assertNotNumber throws', () => {
            test.assertThrows(() => {
                test.assertNotNumber(100);
            });
        });
    });
    describe('assertNotNull', () => {
        it('test assertNotNull', () => {
            test.assertNotNull(undefined);
        });
        it('test assertNotNull throws', () => {
            test.assertThrows(() => {
                test.assertNotNull(null);
            });
        });
    });
    describe('assertNotObject', () => {
        it('test assertNotObject', () => {
            test.assertNotObject('{}');
        });
        it('test assertNotObject throws', () => {
            test.assertThrows(() => {
                test.assertNotObject({});
            });
        });
    });
    describe('assertNotRegExp', () => {
        it('test assertNotRegExp', () => {
            test.assertNotRegExp('//');
        });
        it('test assertNotRegExp throws', () => {
            test.assertThrows(() => {
                test.assertNotRegExp(/^$/);
            });
        });
    });
    describe('assertNotString', () => {
        it('test assertNotString', () => {
            test.assertNotString(undefined);
        });
        it('test assertNotString throws', () => {
            test.assertThrows(() => {
                test.assertNotString('');
            });
        });
    });
    describe('assertNotUndefined', () => {
        it('test assertNotUndefined', () => {
            test.assertNotUndefined(null);
        });
        it('test assertNotUndefined throws', () => {
            test.assertThrows(() => {
                test.assertNotUndefined(undefined);
            });
        });
    });
    // describe('assertNotXML', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('assertNumber', () => {
        it('test assertNumber', () => {
            test.assertNumber(1);
        });
        it('test assertNumber throws', () => {
            test.assertThrows(() => {
                test.assertNumber('1');
            });
        });
    });
    describe('assertNumberAlmostEqual', () => {
        it('test assertNumberAlmostEqual (default tolerance)', () => {
            test.assertNumberAlmostEqual(1.00000000001, 1.0);
        });
        it('test assertNumberAlmostEqual (custom tolerance)', () => {
            test.assertNumberAlmostEqual(1.0, 1.02, 0.02);
        });
        it('test assertNumberAlmostEqual (default tolerance) throws', () => {
            test.assertThrows(() => {
                test.assertNumberAlmostEqual(1.00001, 1.0);
            });
        });
        it('test assertNumberAlmostEqual (custom tolerance) throws', () => {
            test.assertThrows(() => {
                test.assertNumberAlmostEqual(1.0, 1.021, 0.02);
            });
        });
    });
    describe('assertNull', () => {
        it('test assertNull', () => {
            test.assertNull(null);
        });
        it('test assertNull throws', () => {
            test.assertThrows(() => {
                test.assertNull(undefined);
            });
        });
    });
    describe('assertObject', () => {
        it('test assertObject', () => {
            test.assertObject({});
        });
        it('test assertObject throws', () => {
            test.assertThrows(() => {
                test.assertObject([]);
            });
        });
    });
    describe('assertRegExp', () => {
        it('test assertRegExp', () => {
            test.assertRegExp(/^$/);
        });
        it('test assertRegExp object', () => {
            test.assertRegExp(new RegExp());
        });
        it('test assertRegExp throws', () => {
            test.assertThrows(() => {
                test.assertRegExp('//');
            });
        });
    });
    describe('assertString', () => {
        it('test assertString', () => {
            test.assertString('');
        });
        it('test assertString throws', () => {
            test.assertThrows(() => {
                test.assertString(true);
            });
        });
    });
    describe('assertThrows', () => {
        it('test assertThrows', () => {
            test.assertThrows(() => {
                throw new Error();
            });
        });
        it('test assertThrows throws', () => {
            test.assertThrows(() => {
                test.assertThrows(() => {});
            });
        });
    });
    describe('assertTrue', () => {
        it('test assertTrue', () => {
            test.assertTrue(true);
        });
        it('test assertTrue throws', () => {
            test.assertThrows(() => {
                test.assertTrue(false);
            });
        });
    });
    describe('assertUndefined', () => {
        it('test assertUndefined', () => {
            test.assertUndefined(undefined);
        });
        it('test assertUndefined throws', () => {
            test.assertThrows(() => {
                test.assertUndefined('undefined');
            });
        });
    });
    // describe('assertXML', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
});
