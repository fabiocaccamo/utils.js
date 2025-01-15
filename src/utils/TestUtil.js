/** global: FunctionUtil */
/** global: JSONUtil */
/** global: MathUtil */
/** global: ObjectUtil */
/** global: TestUtil */
/** global: TypeUtil */

TestUtil = {
    assertArray(val, len) {
        if (!TypeUtil.isArray(val)) {
            throw new Error(`value is not array: ${String(val)}.`);
        }
        if (TypeUtil.isNumber(len)) {
            TestUtil.assertEqual(val.length, len);
        }
    },

    assertBase64(val) {
        if (!TypeUtil.isBase64(val)) {
            throw new Error(`value is not base64: ${String(val)}.`);
        }
    },

    assertBoolean(val) {
        if (!TypeUtil.isBoolean(val)) {
            throw new Error(`value is not boolean: ${String(val)}.`);
        }
    },

    assertDate(val) {
        if (!TypeUtil.isDate(val)) {
            throw new Error(`value is not date: ${String(val)}.`);
        }
    },

    assertEqual(val1, val2) {
        // prettier-ignore
        if (!ObjectUtil.equals(val1, val2)) {
            let out1 = ((TypeUtil.isArray(val1) || TypeUtil.isObject(val1)) ? `\n${JSONUtil.encode(val1)}\n` : String(val1));
            let out2 = ((TypeUtil.isArray(val2) || TypeUtil.isObject(val2)) ? `\n${JSONUtil.encode(val2)}` : String(val2));
            out1 = (TypeUtil.isString(val1) ? String(`"${out1}"`) : out1);
            out2 = (TypeUtil.isString(val2) ? String(`"${out2}"`) : out2);
            throw new Error(`values are not equal: ${out1} != ${out2}`);
        }
    },

    assertError(val) {
        if (!TypeUtil.isError(val)) {
            throw new Error(`value is not error: ${String(val)}.`);
        }
    },

    assertFalse(val) {
        TestUtil.assertBoolean(val);
        if (val !== false) {
            throw new Error(`value is not false: ${String(val)}.`);
        }
    },

    assertFunction(val) {
        if (!TypeUtil.isFunction(val)) {
            throw new Error(`value is not function: ${String(val)}.`);
        }
    },

    assertJSON(val) {
        if (!TypeUtil.isJSON(val)) {
            throw new Error(`value is not json: ${String(val)}.`);
        }
    },

    assertNaN(val) {
        if (!TypeUtil.isNaN(val)) {
            throw new Error(`value is not NaN: ${String(val)}.`);
        }
    },

    assertNone(val) {
        if (!TypeUtil.isNone(val)) {
            throw new Error(`value is not none: ${String(val)}.`);
        }
    },

    assertNotArray(val) {
        if (TypeUtil.isArray(val)) {
            throw new Error(`value is array: ${String(val)}.`);
        }
    },

    assertNotBase64(val) {
        if (TypeUtil.isBase64(val)) {
            throw new Error(`value is base64: ${String(val)}.`);
        }
    },

    assertNotBoolean(val) {
        if (TypeUtil.isBoolean(val)) {
            throw new Error(`value is boolean: ${String(val)}.`);
        }
    },

    assertNotDate(val) {
        if (TypeUtil.isDate(val)) {
            throw new Error(`value is date: ${String(val)}.`);
        }
    },

    assertNotEqual(val1, val2) {
        if (ObjectUtil.equals(val1, val2)) {
            const out1 =
                TypeUtil.isArray(val1) || TypeUtil.isObject(val1)
                    ? `\n${JSONUtil.encode(val1)}\n`
                    : String(val1);
            const out2 =
                TypeUtil.isArray(val2) || TypeUtil.isObject(val2)
                    ? `\n${JSONUtil.encode(val2)}`
                    : String(val2);
            throw new Error(`values are equal: ${out1} == ${out2}`);
        }
    },

    assertNotError(val) {
        if (TypeUtil.isError(val)) {
            throw new Error(`value is error: ${String(val)}.`);
        }
    },

    assertNotFunction(val) {
        if (TypeUtil.isFunction(val)) {
            throw new Error(`value is function: ${String(val)}.`);
        }
    },

    assertNotJSON(val) {
        if (TypeUtil.isJSON(val)) {
            throw new Error(`value is json: ${String(val)}.`);
        }
    },

    assertNotNone(val) {
        if (TypeUtil.isNone(val)) {
            throw new Error(`value is none: ${String(val)}.`);
        }
    },

    assertNotNumber(val) {
        if (TypeUtil.isNumber(val)) {
            throw new Error(`value is number: ${String(val)}.`);
        }
    },

    assertNotNull(val) {
        if (TypeUtil.isNull(val)) {
            throw new Error(`value is null: ${String(val)}.`);
        }
    },

    assertNotObject(val) {
        if (TypeUtil.isObject(val)) {
            throw new Error(`value is object: ${String(val)}.`);
        }
    },

    assertNotRegExp(val) {
        if (TypeUtil.isRegExp(val)) {
            throw new Error(`value is regexp: ${String(val)}.`);
        }
    },

    assertNotString(val) {
        if (TypeUtil.isString(val)) {
            throw new Error(`value is string: ${String(val)}.`);
        }
    },

    assertNotUndefined(val) {
        if (TypeUtil.isUndefined(val)) {
            throw new Error(`value is undefined: ${String(val)}.`);
        }
    },

    // assertNotXML: function(val)
    // {
    //     if (TypeUtil.isXML(val)) {
    //         throw new Error('value is xml: ' + String(val) + '.');
    //     }
    // },

    assertNumber(val) {
        if (!TypeUtil.isNumber(val)) {
            throw new Error(`value is not number: ${String(val)}.`);
        }
    },

    assertNumberAlmostEqual(val1, val2, tolerance) {
        TestUtil.assertNumber(val1);
        TestUtil.assertNumber(val2);
        if (!MathUtil.equals(val1, val2, tolerance)) {
            throw new Error(
                `values are not almost equals (tolerance = ${String(tolerance)}): ${String(val1)} != ${String(val2)}.`
            );
        }
    },

    assertNull(val) {
        if (!TypeUtil.isNull(val)) {
            throw new Error(`value is not null: ${String(val)}.`);
        }
    },

    assertObject(val) {
        if (!TypeUtil.isObject(val)) {
            throw new Error(`value is not object: ${String(val)}.`);
        }
    },

    assertRegExp(val) {
        if (!TypeUtil.isRegExp(val)) {
            throw new Error(`value is not regexp: ${String(val)}.`);
        }
    },

    assertString(val) {
        if (!TypeUtil.isString(val)) {
            throw new Error(`value is not string: ${String(val)}.`);
        }
    },

    assertThrows(val) {
        TestUtil.assertFunction(val);
        try {
            const scope = null;
            let args = FunctionUtil.args(arguments, 1);
            args = [val, scope].concat(args);
            FunctionUtil.call.apply(null, args);
        } catch (e) {
            return;
        }
        throw new Error(`value didn't throw error: ${String(val)}.`);
    },

    assertTrue(val) {
        TestUtil.assertBoolean(val);
        if (val !== true) {
            throw new Error(`value is not true: ${String(val)}.`);
        }
    },

    assertUndefined(val) {
        if (!TypeUtil.isUndefined(val)) {
            throw new Error(`value is not undefined: ${String(val)}.`);
        }
    },

    // assertXML: function(val)
    // {
    //     if (!TypeUtil.isXML(val)) {
    //         throw new Error('value is not xml: ' + String(val) + '.');
    //     }
    // }
};
