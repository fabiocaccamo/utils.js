/** global: FunctionUtil */
/** global: JSONUtil */
/** global: MathUtil */
/** global: ObjectUtil */
/** global: TestUtil */
/** global: TypeUtil */

TestUtil = {
    assertArray: function (val, len) {
        if (!TypeUtil.isArray(val)) {
            throw new Error('value is not array: ' + String(val) + '.');
        }
        if (TypeUtil.isNumber(len)) {
            TestUtil.assertEqual(val.length, len);
        }
    },

    assertBase64: function (val) {
        if (!TypeUtil.isBase64(val)) {
            throw new Error('value is not base64: ' + String(val) + '.');
        }
    },

    assertBoolean: function (val) {
        if (!TypeUtil.isBoolean(val)) {
            throw new Error('value is not boolean: ' + String(val) + '.');
        }
    },

    assertDate: function (val) {
        if (!TypeUtil.isDate(val)) {
            throw new Error('value is not date: ' + String(val) + '.');
        }
    },

    assertEqual: function (val1, val2) {
        // prettier-ignore
        if (!ObjectUtil.equals(val1, val2)) {
            var out1 = ((TypeUtil.isArray(val1) || TypeUtil.isObject(val1)) ? '\n' + JSONUtil.encode(val1) + '\n' : String(val1));
            var out2 = ((TypeUtil.isArray(val2) || TypeUtil.isObject(val2)) ? '\n' + JSONUtil.encode(val2) : String(val2));
            out1 = (TypeUtil.isString(val1) ? String('"' + out1 + '"') : out1);
            out2 = (TypeUtil.isString(val2) ? String('"' + out2 + '"') : out2);
            throw new Error('values are not equal: ' + out1 + ' != ' + out2);
        }
    },

    assertError: function (val) {
        if (!TypeUtil.isError(val)) {
            throw new Error('value is not error: ' + String(val) + '.');
        }
    },

    assertFalse: function (val) {
        TestUtil.assertBoolean(val);
        if (val !== false) {
            throw new Error('value is not false: ' + String(val) + '.');
        }
    },

    assertFunction: function (val) {
        if (!TypeUtil.isFunction(val)) {
            throw new Error('value is not function: ' + String(val) + '.');
        }
    },

    assertJSON: function (val) {
        if (!TypeUtil.isJSON(val)) {
            throw new Error('value is not json: ' + String(val) + '.');
        }
    },

    assertNaN: function (val) {
        if (!TypeUtil.isNaN(val)) {
            throw new Error('value is not NaN: ' + String(val) + '.');
        }
    },

    assertNone: function (val) {
        if (!TypeUtil.isNone(val)) {
            throw new Error('value is not none: ' + String(val) + '.');
        }
    },

    assertNotArray: function (val) {
        if (TypeUtil.isArray(val)) {
            throw new Error('value is array: ' + String(val) + '.');
        }
    },

    assertNotBase64: function (val) {
        if (TypeUtil.isBase64(val)) {
            throw new Error('value is base64: ' + String(val) + '.');
        }
    },

    assertNotBoolean: function (val) {
        if (TypeUtil.isBoolean(val)) {
            throw new Error('value is boolean: ' + String(val) + '.');
        }
    },

    assertNotDate: function (val) {
        if (TypeUtil.isDate(val)) {
            throw new Error('value is date: ' + String(val) + '.');
        }
    },

    assertNotEqual: function (val1, val2) {
        if (ObjectUtil.equals(val1, val2)) {
            var out1 =
                TypeUtil.isArray(val1) || TypeUtil.isObject(val1)
                    ? '\n' + JSONUtil.encode(val1) + '\n'
                    : String(val1);
            var out2 =
                TypeUtil.isArray(val2) || TypeUtil.isObject(val2)
                    ? '\n' + JSONUtil.encode(val2)
                    : String(val2);
            throw new Error('values are equal: ' + out1 + ' == ' + out2);
        }
    },

    assertNotError: function (val) {
        if (TypeUtil.isError(val)) {
            throw new Error('value is error: ' + String(val) + '.');
        }
    },

    assertNotFunction: function (val) {
        if (TypeUtil.isFunction(val)) {
            throw new Error('value is function: ' + String(val) + '.');
        }
    },

    assertNotJSON: function (val) {
        if (TypeUtil.isJSON(val)) {
            throw new Error('value is json: ' + String(val) + '.');
        }
    },

    assertNotNone: function (val) {
        if (TypeUtil.isNone(val)) {
            throw new Error('value is none: ' + String(val) + '.');
        }
    },

    assertNotNumber: function (val) {
        if (TypeUtil.isNumber(val)) {
            throw new Error('value is number: ' + String(val) + '.');
        }
    },

    assertNotNull: function (val) {
        if (TypeUtil.isNull(val)) {
            throw new Error('value is null: ' + String(val) + '.');
        }
    },

    assertNotObject: function (val) {
        if (TypeUtil.isObject(val)) {
            throw new Error('value is object: ' + String(val) + '.');
        }
    },

    assertNotRegExp: function (val) {
        if (TypeUtil.isRegExp(val)) {
            throw new Error('value is regexp: ' + String(val) + '.');
        }
    },

    assertNotString: function (val) {
        if (TypeUtil.isString(val)) {
            throw new Error('value is string: ' + String(val) + '.');
        }
    },

    assertNotUndefined: function (val) {
        if (TypeUtil.isUndefined(val)) {
            throw new Error('value is undefined: ' + String(val) + '.');
        }
    },

    // assertNotXML: function(val)
    // {
    //     if (TypeUtil.isXML(val)) {
    //         throw new Error('value is xml: ' + String(val) + '.');
    //     }
    // },

    assertNumber: function (val) {
        if (!TypeUtil.isNumber(val)) {
            throw new Error('value is not number: ' + String(val) + '.');
        }
    },

    assertNumberAlmostEqual: function (val1, val2, tolerance) {
        TestUtil.assertNumber(val1);
        TestUtil.assertNumber(val2);
        if (!MathUtil.equals(val1, val2, tolerance)) {
            throw new Error(
                'values are not almost equals (tolerance = ' +
                    String(tolerance) +
                    '): ' +
                    String(val1) +
                    ' != ' +
                    String(val2) +
                    '.'
            );
        }
    },

    assertNull: function (val) {
        if (!TypeUtil.isNull(val)) {
            throw new Error('value is not null: ' + String(val) + '.');
        }
    },

    assertObject: function (val) {
        if (!TypeUtil.isObject(val)) {
            throw new Error('value is not object: ' + String(val) + '.');
        }
    },

    assertRegExp: function (val) {
        if (!TypeUtil.isRegExp(val)) {
            throw new Error('value is not regexp: ' + String(val) + '.');
        }
    },

    assertString: function (val) {
        if (!TypeUtil.isString(val)) {
            throw new Error('value is not string: ' + String(val) + '.');
        }
    },

    assertThrows: function (val) {
        TestUtil.assertFunction(val);
        try {
            var scope = null;
            var args = FunctionUtil.args(arguments, 1);
            args = [val, scope].concat(args);
            FunctionUtil.call.apply(null, args);
        } catch (e) {
            return;
        }
        throw new Error("value didn't throw error: " + String(val) + '.');
    },

    assertTrue: function (val) {
        TestUtil.assertBoolean(val);
        if (val !== true) {
            throw new Error('value is not true: ' + String(val) + '.');
        }
    },

    assertUndefined: function (val) {
        if (!TypeUtil.isUndefined(val)) {
            throw new Error('value is not undefined: ' + String(val) + '.');
        }
    },

    // assertXML: function(val)
    // {
    //     if (!TypeUtil.isXML(val)) {
    //         throw new Error('value is not xml: ' + String(val) + '.');
    //     }
    // }
};
