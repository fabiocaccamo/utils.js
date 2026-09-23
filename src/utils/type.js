import { decode as base64Decode } from './base64.js';
import { decode as jsonDecode } from './json.js';
import { is as objectIs } from './object.js';

export const ARRAY = 'array';
export const BOOLEAN = 'boolean';
export const DATE = 'date';
export const ERROR = 'error';
export const FUNCTION = 'function';
export const MODULE = 'module';
export const NAN = 'nan';
export const NUMBER = 'number';
export const NULL = 'null';
export const OBJECT = 'object';
export const REGEXP = 'regexp';
export const STRING = 'string';
export const UNDEFINED = 'undefined';
export const UNKNOWN = 'unknown';
// const XML = 'xml';

export function isArray(val) {
    // https://stackoverflow.com/questions/4775722/check-if-object-is-array
    if (Array.isArray) {
        return Array.isArray(val);
    }
    return Object.prototype.toString.call(val) === '[object Array]';
}

export function isBase64(val) {
    if (isString(val)) {
        try {
            if (base64Decode(val) !== '') {
                return true;
            }
        } catch (e) {
            // value is not valid base64 data
        }
    }
    return false;
}

export function isBoolean(val) {
    return typeof val === 'boolean';
}

export function isDate(val) {
    return Object.prototype.toString.call(val) === '[object Date]';
}

export function isError(val) {
    return val instanceof Error;
}

export function isFunction(val) {
    return typeof val === 'function';
}

export function isJSON(val) {
    if (isString(val)) {
        try {
            jsonDecode(val);
            return true;
        } catch (e) {
            // value is not valid json data
        }
    }
    return false;
}

export function isModule(val) {
    return Object.prototype.toString.call(val) === '[object Module]';
}

export function isNaN(val) {
    return objectIs(val, NaN);
}

export function isNone(val) {
    return isUndefined(val) || isNull(val) || isNaN(val);
}

export function isNumber(val) {
    return typeof val === 'number' && !isNaN(val) && isFinite(val);
}

export function isNull(val) {
    return val === null;
}

export function isObject(val) {
    return (
        typeof val === 'object' &&
        Object.prototype.toString.call(val) === '[object Object]'
    );
}

export function isRegExp(val) {
    return val instanceof RegExp;
}

export function isString(val) {
    return typeof val === 'string';
}

export function isType(val) {
    switch (val) {
        case ARRAY:
        case BOOLEAN:
        case DATE:
        case ERROR:
        case FUNCTION:
        case MODULE:
        case NAN:
        case NUMBER:
        case NULL:
        case OBJECT:
        case REGEXP:
        case STRING:
        case UNDEFINED:
        case UNKNOWN:
            // case XML:
            return true;
        default:
            return false;
    }
}

export function isUndefined(val) {
    return typeof val === 'undefined';
}

// function isXML(val) {
//     // TODO
//     return false;
// };

export function of(val) {
    if (isArray(val)) {
        return ARRAY;
    } else if (isBoolean(val)) {
        return BOOLEAN;
    } else if (isDate(val)) {
        return DATE;
    } else if (isError(val)) {
        return ERROR;
    } else if (isFunction(val)) {
        return FUNCTION;
    } else if (isModule(val)) {
        return MODULE;
    } else if (isNaN(val)) {
        return NAN;
    } else if (isNumber(val)) {
        return NUMBER;
    } else if (isNull(val)) {
        return NULL;
    } else if (isRegExp(val)) {
        return REGEXP;
    } else if (isString(val)) {
        return STRING;
    } else if (isUndefined(val)) {
        return UNDEFINED;
    }
    // else if (isXML(val)) {
    //     return XML;
    // }
    else if (isObject(val)) {
        return OBJECT;
    } else {
        return UNKNOWN;
    }
}

export default {
    ARRAY,
    BOOLEAN,
    DATE,
    ERROR,
    FUNCTION,
    MODULE,
    NAN,
    NUMBER,
    NULL,
    OBJECT,
    REGEXP,
    STRING,
    UNDEFINED,
    UNKNOWN,
    // XML,
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
    isNumber,
    isNull,
    isObject,
    isRegExp,
    isString,
    isType,
    isUndefined,
    of,
};
