var TestUtil = {

    assertArray: function(val, len)
    {
        if (!TypeUtil.isArray(val)) {
            throw new Error('value is not array.');
        }
        if (TypeUtil.isNumber(len)) {
            TestUtil.assertEqual(val.length, len);
        }
    },

    assertBase64: function(val)
    {
        if (!TypeUtil.isBase64(val)) {
            throw new Error('value is not base64.');
        }
    },

    assertBoolean: function(val)
    {
        if (!TypeUtil.isBoolean(val)) {
            throw new Error('value is not boolean.');
        }
    },

    assertDate: function(val)
    {
        if (!TypeUtil.isDate(val)) {
            throw new Error('value is not date.');
        }
    },

    assertEqual: function(val1, val2)
    {
        if (!ObjectUtil.equals(val1, val2)) {
            throw new Error('values are not equals: "' + String(val1) + '" != "' + val2 + '"');
            // throw new Error('values are not equals: ' + JSONUtil.encode(val1) + ' != ' + JSONUtil.encode(val2) + '.');
        }
    },

    assertError: function(val)
    {
        if (!TypeUtil.isError(val)) {
            throw new Error('value is not error.');
        }
    },

    assertFalse: function(val)
    {
        TestUtil.assertBoolean(val);
        if (val !== false) {
            throw new Error('value is not false.');
        }
    },

    assertFunction: function(val)
    {
        if (!TypeUtil.isFunction(val)) {
            throw new Error('value is not function.');
        }
    },

    assertJSON: function(val)
    {
        if (!TypeUtil.isJSON(val)) {
            throw new Error('value is not json.');
        }
    },

    assertNaN: function(val)
    {
        if (!TypeUtil.isNaN(val)) {
            throw new Error('value is not NaN. ' + val);
        }
    },

    assertNone: function(val)
    {
        if (!TypeUtil.isNone(val)) {
            throw new Error('value is not none.');
        }
    },

    assertNotArray: function(val)
    {
        if (TypeUtil.isArray(val)) {
            throw new Error('value is array.');
        }
    },

    assertNotBase64: function(val)
    {
        if (TypeUtil.isBase64(val)) {
            throw new Error('value is base64.');
        }
    },

    assertNotBoolean: function(val)
    {
        if (TypeUtil.isBoolean(val)) {
            throw new Error('value is boolean.');
        }
    },

    assertNotDate: function(val)
    {
        if (TypeUtil.isDate(val)) {
            throw new Error('value is date.');
        }
    },

    assertNotEquals: function(val1, val2)
    {
        if (ObjectUtil.equals(val1, val2)) {
            throw new Error('values are equals: ' + JSONUtil.encode(val1) + ' != ' + JSONUtil.encode(val2) + '.');
        }
    },

    assertNotError: function(val)
    {
        if (TypeUtil.isError(val)) {
            throw new Error('value is error.');
        }
    },

    assertNotFunction: function(val)
    {
        if (TypeUtil.isFunction(val)) {
            throw new Error('value is function.');
        }
    },

    assertNotJSON: function(val)
    {
        if (TypeUtil.isJSON(val)) {
            throw new Error('value is json.');
        }
    },

    assertNotNone: function(val)
    {
        if (TypeUtil.isNone(val)) {
            throw new Error('value is none.');
        }
    },

    assertNotNumber: function(val)
    {
        if (TypeUtil.isNumber(val)) {
            throw new Error('value is number.');
        }
    },

    assertNotNull: function(val)
    {
        if (TypeUtil.isNull(val)) {
            throw new Error('value is null.');
        }
    },

    assertNotObject: function(val)
    {
        if (TypeUtil.isObject(val)) {
            throw new Error('value is object.');
        }
    },

    assertNotRegExp: function(val)
    {
        if (TypeUtil.isRegExp(val)) {
            throw new Error('value is regexp.');
        }
    },

    assertNotString: function(val)
    {
        if (TypeUtil.isString(val)) {
            throw new Error('value is string.');
        }
    },

    assertNotUndefined: function(val)
    {
        if (TypeUtil.isUndefined(val)) {
            throw new Error('value is undefined.');
        }
    },

    assertNotXML: function(val)
    {
        if (TypeUtil.isXML(val)) {
            throw new Error('value is xml.');
        }
    },

    assertNumber: function(val)
    {
        if (!TypeUtil.isNumber(val)) {
            throw new Error('value is not number.');
        }
    },

    assertNumberAlmostEqual: function(val1, val2, tolerance)
    {
        TestUtil.assertNumber(val1);
        TestUtil.assertNumber(val2);
        if (!MathUtil.equals(val1, val2, tolerance)) {
            throw new Error('values are not almost equals (tolerance = ' + String(tolerance) + '): ' + String(val1) + ' != ' + String(val2) + '.');
        }
    },

    assertNull: function(val)
    {
        if (!TypeUtil.isNull(val)) {
            throw new Error('value is not null.');
        }
    },

    assertObject: function(val)
    {
        if (!TypeUtil.isObject(val)) {
            throw new Error('value is not object.');
        }
    },

    assertRegExp: function(val)
    {
        if (!TypeUtil.isRegExp(val)) {
            throw new Error('value is not regexp.');
        }
    },

    assertString: function(val)
    {
        if (!TypeUtil.isString(val)) {
            throw new Error('value is not string.');
        }
    },

    assertThrows: function(val)
    {
        TestUtil.assertFunction(val);
        try {
            var scope = null;
            var args = FunctionUtil.args(arguments, 1);
            args = [val, scope].concat(args);
            FunctionUtil.call.apply(null, args);
        } catch(e) {
            return;
        }
        throw new Error('value didn\'t throw error.');
    },

    assertTrue: function(val)
    {
        TestUtil.assertBoolean(val);
        if (val !== true) {
            throw new Error('value is not true.');
        }
    },

    assertUndefined: function(val)
    {
        if (!TypeUtil.isUndefined(val)) {
            throw new Error('value is not undefined.');
        }
    },

    assertXML: function(val)
    {
        if (!TypeUtil.isXML(val)) {
            throw new Error('value is not xml.');
        }
    }

};