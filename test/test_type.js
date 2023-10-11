var utils = require('../dist/utils.js');
var test = utils.test;
var type = utils.type;

describe('type', function () {
    describe('isArray', function () {
        it('test isArray against all types', function () {
            var f = type.isArray;
            test.assertTrue(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isBase64', function () {
        var f = type.isBase64;
        it('test isBase64 against empty string', function () {
            test.assertFalse(f(''));
        });
        it('test isBase64 against invalid string', function () {
            test.assertFalse(f('kjhsdafjksadhf'));
            test.assertTrue(f('QGZhYmlvY2FjY2Ftby91dGlscy5qcw'));
        });
        it('test isBase64 against valid string', function () {
            test.assertTrue(f('QGZhYmlvY2FjY2Ftby91dGlscy5qcw=='));
        });
        it('test isBase64 against valid string with extra white-space', function () {
            test.assertTrue(f('  QGZhYmlvY2FjY2Ftby91dGlscy5qcw==  '));
        });
    });
    describe('isBoolean', function () {
        it('test isBoolean against all types', function () {
            var f = type.isBoolean;
            test.assertFalse(f([]));
            test.assertTrue(f(true));
            test.assertTrue(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isDate', function () {
        it('test isDate against all types', function () {
            var f = type.isDate;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertTrue(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isError', function () {
        it('test isError against all types', function () {
            var f = type.isError;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertTrue(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isFunction', function () {
        it('test isFunction against all types', function () {
            var f = type.isFunction;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertTrue(f(function () {}));
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
    describe('isJSON', function () {
        it('TODO', function () {
            test.assertTrue(true);
        });
    });
    describe('isNaN', function () {
        it('test isNaN against all types', function () {
            var f = type.isNaN;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isNone', function () {
        it('test isNone against all types', function () {
            var f = type.isNone;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isNumber', function () {
        it('test isNumber against all types', function () {
            var f = type.isNumber;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
            for (var i = -10; i <= 10; i++) {
                test.assertTrue(type.isNumber(i));
            }
        });
    });
    describe('isNull', function () {
        it('test isNull against all types', function () {
            var f = type.isNull;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isObject', function () {
        it('test isObject against all types', function () {
            var f = type.isObject;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isRegExp', function () {
        it('test isRegExp against all types', function () {
            var f = type.isRegExp;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('isType', function () {
        it('test isType against all types', function () {
            var f = type.isType;
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
    describe('isUndefined', function () {
        it('test isUndefined against all types', function () {
            var f = type.isUndefined;
            test.assertFalse(f([]));
            test.assertFalse(f(true));
            test.assertFalse(f(false));
            test.assertFalse(f(new Date()));
            test.assertFalse(f(new Error()));
            test.assertFalse(f(function () {}));
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
    describe('of', function () {
        it('test of against all types', function () {
            var f = type.of;
            test.assertEqual(f([]), type.ARRAY);
            test.assertEqual(f(true), type.BOOLEAN);
            test.assertEqual(f(false), type.BOOLEAN);
            test.assertEqual(f(new Date()), type.DATE);
            test.assertEqual(f(new Error()), type.ERROR);
            test.assertEqual(
                f(function () {}),
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
