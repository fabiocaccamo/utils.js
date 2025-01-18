import FuncUtil from './func.js';
import JSONUtil from './json.js';
import MathUtil from './math.js';
import ObjectUtil from './object.js';
import TypeUtil from './type.js';

function assertArray(val, len) {
    if (!TypeUtil.isArray(val)) {
        throw new Error(`value is not array: ${String(val)}.`);
    }
    if (TypeUtil.isNumber(len)) {
        assertEqual(val.length, len);
    }
}

function assertBase64(val) {
    if (!TypeUtil.isBase64(val)) {
        throw new Error(`value is not base64: ${String(val)}.`);
    }
}

function assertBoolean(val) {
    if (!TypeUtil.isBoolean(val)) {
        throw new Error(`value is not boolean: ${String(val)}.`);
    }
}

function assertDate(val) {
    if (!TypeUtil.isDate(val)) {
        throw new Error(`value is not date: ${String(val)}.`);
    }
}

function assertEqual(val1, val2) {
    // prettier-ignore
    if (!ObjectUtil.equals(val1, val2)) {
        let out1 = ((TypeUtil.isArray(val1) || TypeUtil.isObject(val1)) ? `\n${JSONUtil.encode(val1)}\n` : String(val1));
        let out2 = ((TypeUtil.isArray(val2) || TypeUtil.isObject(val2)) ? `\n${JSONUtil.encode(val2)}` : String(val2));
        out1 = (TypeUtil.isString(val1) ? String(`"${out1}"`) : out1);
        out2 = (TypeUtil.isString(val2) ? String(`"${out2}"`) : out2);
        throw new Error(`values are not equal: ${out1} != ${out2}`);
    }
}

function assertError(val) {
    if (!TypeUtil.isError(val)) {
        throw new Error(`value is not error: ${String(val)}.`);
    }
}

function assertFalse(val) {
    assertBoolean(val);
    if (val !== false) {
        throw new Error(`value is not false: ${String(val)}.`);
    }
}

function assertFunction(val) {
    if (!TypeUtil.isFunction(val)) {
        throw new Error(`value is not function: ${String(val)}.`);
    }
}

function assertJSON(val) {
    if (!TypeUtil.isJSON(val)) {
        throw new Error(`value is not json: ${String(val)}.`);
    }
}

function assertModule(val) {
    if (!TypeUtil.isModule(val)) {
        throw new Error(`value is not module: ${String(val)}.`);
    }
}

function assertNaN(val) {
    if (!TypeUtil.isNaN(val)) {
        throw new Error(`value is not NaN: ${String(val)}.`);
    }
}

function assertNone(val) {
    if (!TypeUtil.isNone(val)) {
        throw new Error(`value is not none: ${String(val)}.`);
    }
}

function assertNotArray(val) {
    if (TypeUtil.isArray(val)) {
        throw new Error(`value is array: ${String(val)}.`);
    }
}

function assertNotBase64(val) {
    if (TypeUtil.isBase64(val)) {
        throw new Error(`value is base64: ${String(val)}.`);
    }
}

function assertNotBoolean(val) {
    if (TypeUtil.isBoolean(val)) {
        throw new Error(`value is boolean: ${String(val)}.`);
    }
}

function assertNotDate(val) {
    if (TypeUtil.isDate(val)) {
        throw new Error(`value is date: ${String(val)}.`);
    }
}

function assertNotEqual(val1, val2) {
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
}

function assertNotError(val) {
    if (TypeUtil.isError(val)) {
        throw new Error(`value is error: ${String(val)}.`);
    }
}

function assertNotFunction(val) {
    if (TypeUtil.isFunction(val)) {
        throw new Error(`value is function: ${String(val)}.`);
    }
}

function assertNotJSON(val) {
    if (TypeUtil.isJSON(val)) {
        throw new Error(`value is json: ${String(val)}.`);
    }
}

function assertNotModule(val) {
    if (TypeUtil.isModule(val)) {
        throw new Error(`value is module: ${String(val)}.`);
    }
}

function assertNotNone(val) {
    if (TypeUtil.isNone(val)) {
        throw new Error(`value is none: ${String(val)}.`);
    }
}

function assertNotNumber(val) {
    if (TypeUtil.isNumber(val)) {
        throw new Error(`value is number: ${String(val)}.`);
    }
}

function assertNotNull(val) {
    if (TypeUtil.isNull(val)) {
        throw new Error(`value is null: ${String(val)}.`);
    }
}

function assertNotObject(val) {
    if (TypeUtil.isObject(val)) {
        throw new Error(`value is object: ${String(val)}.`);
    }
}

function assertNotRegExp(val) {
    if (TypeUtil.isRegExp(val)) {
        throw new Error(`value is regexp: ${String(val)}.`);
    }
}

function assertNotString(val) {
    if (TypeUtil.isString(val)) {
        throw new Error(`value is string: ${String(val)}.`);
    }
}

function assertNotUndefined(val) {
    if (TypeUtil.isUndefined(val)) {
        throw new Error(`value is undefined: ${String(val)}.`);
    }
}

// function assertNotXML(val)
// {
//     if (TypeUtil.isXML(val)) {
//         throw new Error('value is xml: ' + String(val) + '.');
//     }
// };

function assertNumber(val) {
    if (!TypeUtil.isNumber(val)) {
        throw new Error(`value is not number: ${String(val)}.`);
    }
}

function assertNumberAlmostEqual(val1, val2, tolerance) {
    assertNumber(val1);
    assertNumber(val2);
    if (!MathUtil.equals(val1, val2, tolerance)) {
        throw new Error(
            `values are not almost equals (tolerance = ${String(tolerance)}): ${String(val1)} != ${String(val2)}.`
        );
    }
}

function assertNull(val) {
    if (!TypeUtil.isNull(val)) {
        throw new Error(`value is not null: ${String(val)}.`);
    }
}

function assertObject(val) {
    if (!TypeUtil.isObject(val)) {
        throw new Error(`value is not object: ${String(val)}.`);
    }
}

function assertRegExp(val) {
    if (!TypeUtil.isRegExp(val)) {
        throw new Error(`value is not regexp: ${String(val)}.`);
    }
}

function assertString(val) {
    if (!TypeUtil.isString(val)) {
        throw new Error(`value is not string: ${String(val)}.`);
    }
}

function assertThrows(val) {
    assertFunction(val);
    try {
        const scope = null;
        let args = FunctionUtil.args(arguments, 1);
        args = [val, scope].concat(args);
        FunctionUtil.call.apply(null, args);
    } catch (e) {
        return;
    }
    throw new Error(`value didn't throw error: ${String(val)}.`);
}

function assertTrue(val) {
    assertBoolean(val);
    if (val !== true) {
        throw new Error(`value is not true: ${String(val)}.`);
    }
}

function assertUndefined(val) {
    if (!TypeUtil.isUndefined(val)) {
        throw new Error(`value is not undefined: ${String(val)}.`);
    }
}

// function assertXML(val)
// {
//     if (!TypeUtil.isXML(val)) {
//         throw new Error('value is not xml: ' + String(val) + '.');
//     }
// };

export default {
    assertArray,
    assertBase64,
    assertBoolean,
    assertDate,
    assertEqual,
    assertError,
    assertFalse,
    assertFunction,
    assertJSON,
    assertModule,
    assertNaN,
    assertNone,
    assertNotArray,
    assertNotBase64,
    assertNotBoolean,
    assertNotDate,
    assertNotEqual,
    assertNotError,
    assertNotFunction,
    assertNotJSON,
    assertNotModule,
    assertNotNone,
    assertNotNumber,
    assertNotNull,
    assertNotObject,
    assertNotRegExp,
    assertNotString,
    assertNotUndefined,
    assertNumber,
    assertNumberAlmostEqual,
    assertNull,
    assertObject,
    assertRegExp,
    assertString,
    assertThrows,
    assertTrue,
    assertUndefined,
};
