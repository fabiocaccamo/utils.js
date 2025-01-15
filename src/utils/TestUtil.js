import * as FunctionUtil from './function.js';
import * as JSONUtil from './json.js';
import * as MathUtil from './math.js';
import * as ObjectUtil from './object.js';
import * as TypeUtil from './type.js';

export function assertArray(val, len) {
    if (!TypeUtil.isArray(val)) {
        throw new Error(`value is not array: ${String(val)}.`);
    }
    if (TypeUtil.isNumber(len)) {
        assertEqual(val.length, len);
    }
}

export function assertBase64(val) {
    if (!TypeUtil.isBase64(val)) {
        throw new Error(`value is not base64: ${String(val)}.`);
    }
}

export function assertBoolean(val) {
    if (!TypeUtil.isBoolean(val)) {
        throw new Error(`value is not boolean: ${String(val)}.`);
    }
}

export function assertDate(val) {
    if (!TypeUtil.isDate(val)) {
        throw new Error(`value is not date: ${String(val)}.`);
    }
}

export function assertEqual(val1, val2) {
    // prettier-ignore
    if (!ObjectUtil.equals(val1, val2)) {
        let out1 = ((TypeUtil.isArray(val1) || TypeUtil.isObject(val1)) ? `\n${JSONUtil.encode(val1)}\n` : String(val1));
        let out2 = ((TypeUtil.isArray(val2) || TypeUtil.isObject(val2)) ? `\n${JSONUtil.encode(val2)}` : String(val2));
        out1 = (TypeUtil.isString(val1) ? String(`"${out1}"`) : out1);
        out2 = (TypeUtil.isString(val2) ? String(`"${out2}"`) : out2);
        throw new Error(`values are not equal: ${out1} != ${out2}`);
    }
}

export function assertError(val) {
    if (!TypeUtil.isError(val)) {
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
    if (!TypeUtil.isFunction(val)) {
        throw new Error(`value is not function: ${String(val)}.`);
    }
}

export function assertJSON(val) {
    if (!TypeUtil.isJSON(val)) {
        throw new Error(`value is not json: ${String(val)}.`);
    }
}

export function assertNaN(val) {
    if (!TypeUtil.isNaN(val)) {
        throw new Error(`value is not NaN: ${String(val)}.`);
    }
}

export function assertNone(val) {
    if (!TypeUtil.isNone(val)) {
        throw new Error(`value is not none: ${String(val)}.`);
    }
}

export function assertNotArray(val) {
    if (TypeUtil.isArray(val)) {
        throw new Error(`value is array: ${String(val)}.`);
    }
}

export function assertNotBase64(val) {
    if (TypeUtil.isBase64(val)) {
        throw new Error(`value is base64: ${String(val)}.`);
    }
}

export function assertNotBoolean(val) {
    if (TypeUtil.isBoolean(val)) {
        throw new Error(`value is boolean: ${String(val)}.`);
    }
}

export function assertNotDate(val) {
    if (TypeUtil.isDate(val)) {
        throw new Error(`value is date: ${String(val)}.`);
    }
}

export function assertNotEqual(val1, val2) {
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

export function assertNotError(val) {
    if (TypeUtil.isError(val)) {
        throw new Error(`value is error: ${String(val)}.`);
    }
}

export function assertNotFunction(val) {
    if (TypeUtil.isFunction(val)) {
        throw new Error(`value is function: ${String(val)}.`);
    }
}

export function assertNotJSON(val) {
    if (TypeUtil.isJSON(val)) {
        throw new Error(`value is json: ${String(val)}.`);
    }
}

export function assertNotNone(val) {
    if (TypeUtil.isNone(val)) {
        throw new Error(`value is none: ${String(val)}.`);
    }
}

export function assertNotNumber(val) {
    if (TypeUtil.isNumber(val)) {
        throw new Error(`value is number: ${String(val)}.`);
    }
}

export function assertNotNull(val) {
    if (TypeUtil.isNull(val)) {
        throw new Error(`value is null: ${String(val)}.`);
    }
}

export function assertNotObject(val) {
    if (TypeUtil.isObject(val)) {
        throw new Error(`value is object: ${String(val)}.`);
    }
}

export function assertNotRegExp(val) {
    if (TypeUtil.isRegExp(val)) {
        throw new Error(`value is regexp: ${String(val)}.`);
    }
}

export function assertNotString(val) {
    if (TypeUtil.isString(val)) {
        throw new Error(`value is string: ${String(val)}.`);
    }
}

export function assertNotUndefined(val) {
    if (TypeUtil.isUndefined(val)) {
        throw new Error(`value is undefined: ${String(val)}.`);
    }
}

// export function assertNotXML(val)
// {
//     if (TypeUtil.isXML(val)) {
//         throw new Error('value is xml: ' + String(val) + '.');
//     }
// };

export function assertNumber(val) {
    if (!TypeUtil.isNumber(val)) {
        throw new Error(`value is not number: ${String(val)}.`);
    }
}

export function assertNumberAlmostEqual(val1, val2, tolerance) {
    assertNumber(val1);
    assertNumber(val2);
    if (!MathUtil.equals(val1, val2, tolerance)) {
        throw new Error(
            `values are not almost equals (tolerance = ${String(tolerance)}): ${String(val1)} != ${String(val2)}.`
        );
    }
}

export function assertNull(val) {
    if (!TypeUtil.isNull(val)) {
        throw new Error(`value is not null: ${String(val)}.`);
    }
}

export function assertObject(val) {
    if (!TypeUtil.isObject(val)) {
        throw new Error(`value is not object: ${String(val)}.`);
    }
}

export function assertRegExp(val) {
    if (!TypeUtil.isRegExp(val)) {
        throw new Error(`value is not regexp: ${String(val)}.`);
    }
}

export function assertString(val) {
    if (!TypeUtil.isString(val)) {
        throw new Error(`value is not string: ${String(val)}.`);
    }
}

export function assertThrows(val) {
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

export function assertTrue(val) {
    assertBoolean(val);
    if (val !== true) {
        throw new Error(`value is not true: ${String(val)}.`);
    }
}

export function assertUndefined(val) {
    if (!TypeUtil.isUndefined(val)) {
        throw new Error(`value is not undefined: ${String(val)}.`);
    }
}

// export function assertXML(val)
// {
//     if (!TypeUtil.isXML(val)) {
//         throw new Error('value is not xml: ' + String(val) + '.');
//     }
// };
