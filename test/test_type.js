import utils from '../src/utils.js';
const test = utils.test;
const type = utils.type;

describe('type', () => {
    describe('isArray', () => {
        it('test isArray against all types', () => {
            const f = type.isArray;
            test.assertTrue(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isBase64', () => {
        const f = type.isBase64;
        it('test isBase64 against empty string', () => {
            test.assertFalse(f(''));
        });
        it('test isBase64 against invalid string', () => {
            test.assertFalse(f('kjhsdafjksadhf'));
            test.assertTrue(f('QGZhYmlvY2FjY2Ftby91dGlscy5qcw'));
        });
        it('test isBase64 against valid string', () => {
            test.assertTrue(f('QGZhYmlvY2FjY2Ftby91dGlscy5qcw=='));
        });
        it('test isBase64 against valid string with extra white-space', () => {
            test.assertTrue(f('  QGZhYmlvY2FjY2Ftby91dGlscy5qcw==  '));
        });
    });
    describe('isBoolean', () => {
        it('test isBoolean against all types', () => {
            const f = type.isBoolean;
            test.assertFalse(f([]));
            test.assertTrue(f(true));
            test.assertTrue(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isDate', () => {
        it('test isDate against all types', () => {
            const f = type.isDate;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertTrue(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isError', () => {
        it('test isError against all types', () => {
            const f = type.isError;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertTrue(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isFunction', () => {
        it('test isFunction against all types', () => {
            const f = type.isFunction;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertTrue(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isJSON', () => {
        it('TODO', () => {
            test.assertTrue(true);
        });
    });
    describe('isNaN', () => {
        it('test isNaN against all types', () => {
            const f = type.isNaN;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertTrue(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isNone', () => {
        it('test isNone against all types', () => {
            const f = type.isNone;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertTrue(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertTrue(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertTrue(f(undefined));
        });
    });
    describe('isNumber', () => {
        it('test isNumber against all types', () => {
            const f = type.isNumber;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertTrue(f(0));
            test.assertTrue(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
            for (let i = -10; i <= 10; i++) {
                test.assertTrue(type.isNumber(i));
            }
        });
    });
    describe('isNull', () => {
        it('test isNull against all types', () => {
            const f = type.isNull;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertTrue(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isObject', () => {
        it('test isObject against all types', () => {
            const f = type.isObject;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertTrue(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isRegExp', () => {
        it('test isRegExp against all types', () => {
            const f = type.isRegExp;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertTrue(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertFalse(f(undefined));
        });
    });
    describe('isType', () => {
        it('test isType against all types', () => {
            const f = type.isType;
            test.assertTrue(f(type.ARRAY));
            test.assertTrue(f(type.BOOLEAN));
            test.assertTrue(f(type.DATE));
            test.assertTrue(f(type.ERROR));
            test.assertTrue(f(type.FUNCTION));
            test.assertTrue(f(type.NAN));
            test.assertTrue(f(type.NUMBER));
            test.assertTrue(f(type.NULL));
            test.assertTrue(f(type.OBJECT));
            test.assertTrue(f(type.REGEXP));
            test.assertTrue(f(type.STRING));
            test.assertTrue(f(type.UNDEFINED));
            test.assertTrue(f(type.UNKNOWN));
            // test.assertTrue(f(type.XML));
            test.assertFalse(f(''));
        });
    });
    describe('isUndefined', () => {
        it('test isUndefined against all types', () => {
            const f = type.isUndefined;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(() => {}));
            test.assertFalse(f(NaN));
            test.assertFalse(f(0));
            test.assertFalse(f(1));
            test.assertFalse(f(null));
            test.assertFalse(f({}));
            test.assertFalse(f(/^[a-z]+$/));
            test.assertFalse(f(''));
            test.assertFalse(f('0'));
            test.assertFalse(f('1'));
            test.assertFalse(f('true'));
            test.assertFalse(f('false'));
            test.assertFalse(f('NaN'));
            test.assertFalse(f('null'));
            test.assertFalse(f('undefined'));
            test.assertTrue(f(undefined));
        });
    });
    // describe('isXML', function() {
    //     it('TODO', function() {
    //         test.assertTrue(true);
    //     });
    // });
    describe('of', () => {
        it('test of against all types', () => {
            const f = type.of;
            test.assertEqual(f([]), type.ARRAY);
            test.assertEqual(f(true), type.BOOLEAN);
            test.assertEqual(f(false), type.BOOLEAN);
            test.assertEqual(f(new Date()), type.DATE);
            test.assertEqual(f(new Error()), type.ERROR);
            test.assertEqual(
                f(() => {}),
                type.FUNCTION
            );
            test.assertEqual(f(NaN), type.NAN);
            test.assertEqual(f(0), type.NUMBER);
            test.assertEqual(f(1), type.NUMBER);
            test.assertEqual(f(null), type.NULL);
            test.assertEqual(f({}), type.OBJECT);
            test.assertEqual(f(/^[a-z]+$/), type.REGEXP);
            test.assertEqual(f(''), type.STRING);
            test.assertEqual(f('0'), type.STRING);
            test.assertEqual(f('1'), type.STRING);
            test.assertEqual(f('true'), type.STRING);
            test.assertEqual(f('false'), type.STRING);
            test.assertEqual(f('NaN'), type.STRING);
            test.assertEqual(f('null'), type.STRING);
            test.assertEqual(f('undefined'), type.STRING);
            test.assertEqual(f(undefined), type.UNDEFINED);
        });
    });
});
