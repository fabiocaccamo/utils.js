import { encode } from './json.js';
import { equals as mathEquals } from './math.js';
import { equals as objectEquals } from './object.js';
import {
    isArray,
    isBase64,
    isBoolean,
    isDate,
    isError,
    isFunction,
    isJSON,
    isModule,
    isNaN,
    isNone,
    isNull,
    isNumber,
    isObject,
    isRegExp,
    isString,
    isUndefined,
} from './type.js';

export function assertArray(val, len) {
    if (!isArray(val)) {
        throw new Error(`value is not array: ${String(val)}.`);
    }
    if (isNumber(len)) {
        assertEqual(val.length, len);
    }
}

export function assertBase64(val) {
    if (!isBase64(val)) {
        throw new Error(`value is not base64: ${String(val)}.`);
    }
}

export function assertBoolean(val) {
    if (!isBoolean(val)) {
        throw new Error(`value is not boolean: ${String(val)}.`);
    }
}

export function assertDate(val) {
    if (!isDate(val)) {
        throw new Error(`value is not date: ${String(val)}.`);
    }
}

export function assertEqual(val1, val2) {
    // prettier-ignore
    if (!objectEquals(val1, val2)) {
        let out1 = ((isArray(val1) || isObject(val1)) ? `\n${encode(val1)}\n` : String(val1));
        let out2 = ((isArray(val2) || isObject(val2)) ? `\n${encode(val2)}` : String(val2));
        out1 = (isString(val1) ? String(`"${out1}"`) : out1);
        out2 = (isString(val2) ? String(`"${out2}"`) : out2);
        throw new Error(`values are not equal: ${out1} != ${out2}`);
    }
}

export function assertError(val) {
    if (!isError(val)) {
        throw new Error(`value is not error: ${String(val)}.`);
    }
}

export function assertFalse(val) {
    assertBoolean(val);
    if (val !== false) {
        throw new Error(`value is not false: ${String(val)}.`);
    }
}

export function assertFunction(val) {
    if (!isFunction(val)) {
        throw new Error(`value is not function: ${String(val)}.`);
    }
}

export function assertJSON(val) {
    if (!isJSON(val)) {
        throw new Error(`value is not json: ${String(val)}.`);
    }
}

export function assertModule(val) {
    if (!isModule(val)) {
        throw new Error(`value is not module: ${String(val)}.`);
    }
}

export function assertNaN(val) {
    if (!isNaN(val)) {
        throw new Error(`value is not NaN: ${String(val)}.`);
    }
}

export function assertNone(val) {
    if (!isNone(val)) {
        throw new Error(`value is not none: ${String(val)}.`);
    }
}

export function assertNotArray(val) {
    if (isArray(val)) {
        throw new Error(`value is array: ${String(val)}.`);
    }
}

export function assertNotBase64(val) {
    if (isBase64(val)) {
        throw new Error(`value is base64: ${String(val)}.`);
    }
}

export function assertNotBoolean(val) {
    if (isBoolean(val)) {
        throw new Error(`value is boolean: ${String(val)}.`);
    }
}

export function assertNotDate(val) {
    if (isDate(val)) {
        throw new Error(`value is date: ${String(val)}.`);
    }
}

export function assertNotEqual(val1, val2) {
    if (objectEquals(val1, val2)) {
        const out1 =
            isArray(val1) || isObject(val1) ? `\n${encode(val1)}\n` : String(val1);
        const out2 =
            isArray(val2) || isObject(val2) ? `\n${encode(val2)}` : String(val2);
        throw new Error(`values are equal: ${out1} == ${out2}`);
    }
}

export function assertNotError(val) {
    if (isError(val)) {
        throw new Error(`value is error: ${String(val)}.`);
    }
}

export function assertNotFunction(val) {
    if (isFunction(val)) {
        throw new Error(`value is function: ${String(val)}.`);
    }
}

export function assertNotJSON(val) {
    if (isJSON(val)) {
        throw new Error(`value is json: ${String(val)}.`);
    }
}

export function assertNotModule(val) {
    if (isModule(val)) {
        throw new Error(`value is module: ${String(val)}.`);
    }
}

export function assertNotNone(val) {
    if (isNone(val)) {
        throw new Error(`value is none: ${String(val)}.`);
    }
}

export function assertNotNumber(val) {
    if (isNumber(val)) {
        throw new Error(`value is number: ${String(val)}.`);
    }
}

export function assertNotNull(val) {
    if (isNull(val)) {
        throw new Error(`value is null: ${String(val)}.`);
    }
}

export function assertNotObject(val) {
    if (isObject(val)) {
        throw new Error(`value is object: ${String(val)}.`);
    }
}

export function assertNotRegExp(val) {
    if (isRegExp(val)) {
        throw new Error(`value is regexp: ${String(val)}.`);
    }
}

export function assertNotString(val) {
    if (isString(val)) {
        throw new Error(`value is string: ${String(val)}.`);
    }
}

export function assertNotUndefined(val) {
    if (isUndefined(val)) {
        throw new Error(`value is undefined: ${String(val)}.`);
    }
}

// function assertNotXML(val)
// {
//     if (TypeUtil.isXML(val)) {
//         throw new Error('value is xml: ' + String(val) + '.');
//     }
// };

export function assertNumber(val) {
    if (!isNumber(val)) {
        throw new Error(`value is not number: ${String(val)}.`);
    }
}

export function assertNumberAlmostEqual(val1, val2, tolerance) {
    assertNumber(val1);
    assertNumber(val2);
    if (!mathEquals(val1, val2, tolerance)) {
        throw new Error(
            `values are not almost equals (tolerance = ${String(tolerance)}): ${String(val1)} != ${String(val2)}.`
        );
    }
}

export function assertNull(val) {
    if (!isNull(val)) {
        throw new Error(`value is not null: ${String(val)}.`);
    }
}

export function assertObject(val) {
    if (!isObject(val)) {
        throw new Error(`value is not object: ${String(val)}.`);
    }
}

export function assertRegExp(val) {
    if (!isRegExp(val)) {
        throw new Error(`value is not regexp: ${String(val)}.`);
    }
}

export function assertString(val) {
    if (!isString(val)) {
        throw new Error(`value is not string: ${String(val)}.`);
    }
}

export function assertThrows(val, ...args) {
    assertFunction(val);
    try {
        const scope = null;
        FunctionUtil.call.apply(null, [val, scope].concat(args));
    } catch (e) {
        return;
    }
    throw new Error(`value didn't throw error: ${String(val)}.`);
}

export function assertTrue(val) {
    assertBoolean(val);
    if (val !== true) {
        throw new Error(`value is not true: ${String(val)}.`);
    }
}

export function assertUndefined(val) {
    if (!isUndefined(val)) {
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
