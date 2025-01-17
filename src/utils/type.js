import Base64Util from './base64.js';
import JSONUtil from './json.js';
import ObjectUtil from './object.js';
import URLUtil from './url.js';

const ARRAY = 'array';
const BOOLEAN = 'boolean';
const DATE = 'date';
const ERROR = 'error';
const FUNCTION = 'function';
const MODULE = 'module';
const NAN = 'nan';
const NUMBER = 'number';
const NULL = 'null';
const OBJECT = 'object';
const REGEXP = 'regexp';
const STRING = 'string';
const UNDEFINED = 'undefined';
const UNKNOWN = 'unknown';
// const XML = 'xml';

function isArray(val) {
    // https://stackoverflow.com/questions/4775722/check-if-object-is-array
    if (Array.isArray) {
        return Array.isArray(val);
    }
    return Object.prototype.toString.call(val) === '[object Array]';
}

function isBase64(val) {
    if (isString(val)) {
        try {
            if (Base64Util.decode(val) !== '') {
                return true;
            }
        } catch (e) {
            // value is not valid base64 data
        }
    }
    return false;
}

function isBoolean(val) {
    return typeof val === 'boolean';
}

function isDate(val) {
    return Object.prototype.toString.call(val) === '[object Date]';
}

function isError(val) {
    return val instanceof Error;
}

function isFunction(val) {
    return typeof val === 'function';
}

function isJSON(val) {
    if (isString(val)) {
        try {
            JSONUtil.decode(val);
            return true;
        } catch (e) {
            // value is not valid json data
        }
    }
    return false;
}

function isModule(val) {
    return Object.prototype.toString.call(val) === '[object Module]';
}

function isNaN(val) {
    return ObjectUtil.is(val, NaN);
}

function isNone(val) {
    return isUndefined(val) || isNull(val) || isNaN(val);
}

function isNumber(val) {
    return typeof val === 'number' && !isNaN(val) && isFinite(val);
}

function isNull(val) {
    return val === null;
}

function isObject(val) {
    return (
        typeof val === 'object' &&
        Object.prototype.toString.call(val) === '[object Object]'
    );
}

function isRegExp(val) {
    return val instanceof RegExp;
}

function isString(val) {
    return typeof val === 'string';
}

function isType(val) {
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

function isUndefined(val) {
    return typeof val === 'undefined';
}

// function isXML(val) {
//     // TODO
//     return false;
// };

function of(val) {
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
