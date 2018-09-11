var utils = require('../dist/utils.js');
var test = utils.test;

describe('test', function() {
    describe('assertArray', function() {
        it('test assertArray', function() {
            test.assertArray([1, 2, 3, 4, 5]);
        });
        it('test assertArray and length', function() {
            test.assertArray([1, 2, 3, 4, 5], 5);
        });
        it('test assertArray throws', function() {
            test.assertThrows(function(){
                test.assertArray(false);
            });
        });
        it('test assertArray and length throws', function() {
            test.assertThrows(function(){
                test.assertArray([1, 2, 3, 4, 5], 4);
            });
        });
    });
    describe('assertBase64', function() {
        it('test assertBase64', function() {
            test.assertBase64('QGZhYmlvY2FjY2Ftby91dGlscy5qcw==');
        });
        it('test assertBase64 throws', function() {
            test.assertThrows(function(){
                test.assertBase64('');
            });
        });
    });
    describe('assertBoolean', function() {
        it('test assertBoolean true', function() {
            test.assertBoolean(true);
        });
        it('test assertBoolean false', function() {
            test.assertBoolean(false);
        });
        it('test assertBoolean throws', function() {
            test.assertThrows(function(){
                test.assertBoolean(null);
            });
        });
    });
    describe('assertDate', function() {
        it('test assertDate', function() {
            test.assertDate(new Date());
        });
        it('test assertDate throws', function() {
            test.assertThrows(function(){
                test.assertDate(true);
            });
        });
    });
    describe('assertEqual', function() {
        it('test assertEqual', function() {
            test.assertEqual({ a:1, b:'ok', c:true, d:[] }, { a:1, b:'ok', c:true, d:[] });
        });
        it('test assertEqual throws', function() {
            test.assertThrows(function(){
                test.assertEqual({ a:1, b:'ok', c:true, d:[] }, { a:1, b:'ok', c:true, d:[null] });
            });
        });
    });
    describe('assertError', function() {
        it('test assertError', function() {
            test.assertError(new Error());
        });
        it('test assertError throws', function() {
            test.assertThrows(function(){
                test.assertError(true);
            });
        });
    });
    describe('assertFalse', function() {
        it('test assertFalse', function() {
            test.assertFalse(false);
        });
        it('test assertFalse throws', function() {
            test.assertThrows(function(){
                test.assertFalse(null);
            });
        });
    });
    describe('assertFunction', function() {
        it('test assertFunction', function() {
            test.assertFunction(function(){});
        });
        it('test assertFunction throws', function() {
            test.assertThrows(function(){
                test.assertFunction({});
            });
        });
    });
    describe('assertJSON', function() {
        it('test assertJSON', function() {
            test.assertJSON("{\"k\":[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]}");
        });
        it('test assertJSON throws', function() {
            test.assertThrows(function(){
                test.assertJSON('');
            });
        });
    });
    describe('assertNaN', function() {
        it('test assertNaN', function() {
            test.assertNaN(NaN);
        });
        it('test assertNaN throws', function() {
            test.assertThrows(function(){
                test.assertNaN(null);
            });
        });
    });
    describe('assertNone', function() {
        it('test assertNone NaN', function() {
            test.assertNone(NaN);
        });
        it('test assertNone null', function() {
            test.assertNone(null);
        });
        it('test assertNone undefined', function() {
            test.assertNone(undefined);
        });
        it('test assertNone throws', function() {
            test.assertThrows(function(){
                test.assertNone('ok');
            });
        });
    });
    describe('assertNotArray', function() {
        it('test assertNotArray', function() {
            test.assertNotArray(true);
        });
        it('test assertNotArray throws', function() {
            test.assertThrows(function(){
                test.assertNotArray([]);
            });
        });
    });
    describe('assertNotBase64', function() {
        it('test assertNotBase64', function() {
            test.assertNotBase64(true);
        });
        it('test assertNotBase64 throws', function() {
            test.assertThrows(function(){
                test.assertNotBase64('QGZhYmlvY2FjY2Ftby91dGlscy5qcw==');
            });
        });
    });
    describe('assertNotBoolean', function() {
        it('test assertNotBoolean', function() {
            test.assertNotBoolean(1);
        });
        it('test assertNotBoolean throws', function() {
            test.assertThrows(function(){
                test.assertNotBoolean(true);
            });
        });
    });
    describe('assertNotDate', function() {
        it('test assertNotDate', function() {
            test.assertNotDate(1);
        });
        it('test assertNotDate throws', function() {
            test.assertThrows(function(){
                test.assertNotDate(new Date());
            });
        });
    });
    describe('assertNotEqual', function() {
        it('test assertNotEqual', function() {
            test.assertNotEqual({ a:1, b:'ok', c:true, d:[] }, { a:1, b:'ok', c:true });
        });
        it('test assertNotEqual throws', function() {
            test.assertThrows(function(){
                test.assertNotEqual({ a:1, b:'ok', c:true, d:[] }, { a:1, b:'ok', c:true, d:[] });
            });
        });
    });
    describe('assertNotError', function() {
        it('test assertNotError', function() {
            test.assertNotError('[Error]');
        });
        it('test assertNotError throws', function() {
            test.assertThrows(function(){
                test.assertNotError(new Error());
            });
        });
    });
    describe('assertNotFunction', function() {
        it('test assertNotFunction', function() {
            test.assertNotFunction({});
        });
        it('test assertNotFunction throws', function() {
            test.assertThrows(function(){
                test.assertNotFunction(function(){});
            });
        });
    });
    describe('assertNotJSON', function() {
        it('test assertNotJSON', function() {
            test.assertNotJSON('');
        });
        it('test assertNotJSON throws', function() {
            test.assertThrows(function(){
                test.assertNotJSON("{\"k\":[0,1,2,3,\"\",\"a\",\"b\",\"c\",null,null,null]}");
            });
        });
    });
    describe('assertNotNone', function() {
        it('test assertNotNone', function() {
            test.assertNotNone(0);
        });
        it('test assertNotNone throws', function() {
            test.assertThrows(function(){
                test.assertNotNone(undefined);
            });
        });
    });
    describe('assertNotNumber', function() {
        it('test assertNotNumber', function() {
            test.assertNotNumber('100');
        });
        it('test assertNotNumber throws', function() {
            test.assertThrows(function(){
                test.assertNotNumber(100);
            });
        });
    });
    describe('assertNotNull', function() {
        it('test assertNotNull', function() {
            test.assertNotNull(undefined);
        });
        it('test assertNotNull throws', function() {
            test.assertThrows(function(){
                test.assertNotNull(null);
            });
        });
    });
    describe('assertNotObject', function() {
        it('test assertNotObject', function() {
            test.assertNotObject('{}');
        });
        it('test assertNotObject throws', function() {
            test.assertThrows(function(){
                test.assertNotObject({});
            });
        });
    });
    describe('assertNotRegExp', function() {
        it('test assertNotRegExp', function() {
            test.assertNotRegExp('//');
        });
        it('test assertNotRegExp throws', function() {
            test.assertThrows(function(){
                test.assertNotRegExp(/^$/);
            });
        });
    });
    describe('assertNotString', function() {
        it('test assertNotString', function() {
            test.assertNotString(undefined);
        });
        it('test assertNotString throws', function() {
            test.assertThrows(function(){
                test.assertNotString('');
            });
        });
    });
    describe('assertNotUndefined', function() {
        it('test assertNotUndefined', function() {
            test.assertNotUndefined(null);
        });
        it('test assertNotUndefined throws', function() {
            test.assertThrows(function(){
                test.assertNotUndefined(undefined);
            });
        });
    });
    describe('assertNotXML', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
    describe('assertNumber', function() {
        it('test assertNumber', function() {
            test.assertNumber(1);
        });
        it('test assertNumber throws', function() {
            test.assertThrows(function(){
                test.assertNumber('1');
            });
        });
    });
    describe('assertNumberAlmostEqual', function() {
        it('test assertNumberAlmostEqual (default tolerance)', function() {
            test.assertNumberAlmostEqual(1.00000000001, 1.0);
        });
        it('test assertNumberAlmostEqual (custom tolerance)', function() {
            test.assertNumberAlmostEqual(1.0, 1.02, 0.02);
        });
        it('test assertNumberAlmostEqual (default tolerance) throws', function() {
            test.assertThrows(function(){
                test.assertNumberAlmostEqual(1.00001, 1.0);
            });
        });
        it('test assertNumberAlmostEqual (custom tolerance) throws', function() {
            test.assertThrows(function(){
                test.assertNumberAlmostEqual(1.0, 1.021, 0.02);
            });
        });
    });
    describe('assertNull', function() {
        it('test assertNull', function() {
            test.assertNull(null);
        });
        it('test assertNull throws', function() {
            test.assertThrows(function(){
                test.assertNull(undefined);
            });
        });
    });
    describe('assertObject', function() {
        it('test assertObject', function() {
            test.assertObject({});
        });
        it('test assertObject throws', function() {
            test.assertThrows(function(){
                test.assertObject([]);
            });
        });
    });
    describe('assertRegExp', function() {
        it('test assertRegExp', function() {
            test.assertRegExp(/^$/);
        });
        it('test assertRegExp object', function() {
            test.assertRegExp(new RegExp());
        });
        it('test assertRegExp throws', function() {
            test.assertThrows(function(){
                test.assertRegExp('//');
            });
        });
    });
    describe('assertString', function() {
        it('test assertString', function() {
            test.assertString('');
        });
        it('test assertString throws', function() {
            test.assertThrows(function(){
                test.assertString(true);
            });
        });
    });
    describe('assertThrows', function() {
        it('test assertThrows', function() {
            test.assertThrows(function(){
                throw new Error();
            });
        });
        it('test assertThrows throws', function() {
            test.assertThrows(function(){
                test.assertThrows(function(){
                });
            });
        });
    });
    describe('assertTrue', function() {
        it('test assertTrue', function() {
            test.assertTrue(true);
        });
        it('test assertTrue throws', function() {
            test.assertThrows(function(){
                test.assertTrue(false);
            });
        });
    });
    describe('assertUndefined', function() {
        it('test assertUndefined', function() {
            test.assertUndefined(undefined);
        });
        it('test assertUndefined throws', function() {
            test.assertThrows(function(){
                test.assertUndefined('undefined');
            });
        });
    });
    describe('assertXML', function() {
        it('TODO', function() {
            test.assertTrue(true);
        });
    });
});