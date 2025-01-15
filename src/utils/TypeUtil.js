/** global: Base64Util */
/** global: JSONUtil */
/** global: ObjectUtil */
/** global: TypeUtil */
/** global: URLUtil */

TypeUtil = {
    ARRAY: 'array',
    BOOLEAN: 'boolean',
    DATE: 'date',
    ERROR: 'error',
    FUNCTION: 'function',
    NAN: 'nan',
    NUMBER: 'number',
    NULL: 'null',
    OBJECT: 'object',
    REGEXP: 'regexp',
    STRING: 'string',
    UNDEFINED: 'undefined',
    UNKNOWN: 'unknown',
    // XML: 'xml',

    isArray(val) {
        // https://stackoverflow.com/questions/4775722/check-if-object-is-array
        if (Array.isArray) {
            return Array.isArray(val);
        }
        return Object.prototype.toString.call(val) === '[object Array]';
    },

    isBase64(val) {
        if (TypeUtil.isString(val)) {
            try {
                if (Base64Util.decode(val) !== '') {
                    return true;
                }
            } catch (e) {
                // value is not valid base64 data
            }
        }
        return false;
    },

    isBoolean(val) {
        return typeof val === 'boolean';
    },

    isDate(val) {
        return Object.prototype.toString.call(val) === '[object Date]';
    },

    isError(val) {
        return val instanceof Error;
    },

    isFunction(val) {
        return typeof val === 'function';
    },

    isJSON(val) {
        if (TypeUtil.isString(val)) {
            try {
                JSONUtil.decode(val);
                return true;
            } catch (e) {
                // value is not valid json data
            }
        }
        return false;
    },

    isNaN(val) {
        return ObjectUtil.is(val, NaN);
    },

    isNone(val) {
        return TypeUtil.isUndefined(val) || TypeUtil.isNull(val) || TypeUtil.isNaN(val);
    },

    isNumber(val) {
        return typeof val === 'number' && !isNaN(val) && isFinite(val);
    },

    isNull(val) {
        return val === null;
    },

    isObject(val) {
        return (
            typeof val === 'object' &&
            Object.prototype.toString.call(val) === '[object Object]'
        );
    },

    isRegExp(val) {
        return val instanceof RegExp;
    },

    isString(val) {
        return typeof val === 'string';
    },

    isType(val) {
        switch (val) {
            case TypeUtil.ARRAY:
            case TypeUtil.BOOLEAN:
            case TypeUtil.DATE:
            case TypeUtil.ERROR:
            case TypeUtil.FUNCTION:
            case TypeUtil.NAN:
            case TypeUtil.NUMBER:
            case TypeUtil.NULL:
            case TypeUtil.OBJECT:
            case TypeUtil.REGEXP:
            case TypeUtil.STRING:
            case TypeUtil.UNDEFINED:
            case TypeUtil.UNKNOWN:
                // case TypeUtil.XML:
                return true;
            default:
                return false;
        }
    },

    isUndefined(val) {
        return typeof val === 'undefined';
    },

    // isXML: function(val) {
    //     // TODO
    //     return false;
    // },

    of(val) {
        if (TypeUtil.isArray(val)) {
            return TypeUtil.ARRAY;
        } else if (TypeUtil.isBoolean(val)) {
            return TypeUtil.BOOLEAN;
        } else if (TypeUtil.isDate(val)) {
            return TypeUtil.DATE;
        } else if (TypeUtil.isError(val)) {
            return TypeUtil.ERROR;
        } else if (TypeUtil.isFunction(val)) {
            return TypeUtil.FUNCTION;
        } else if (TypeUtil.isNaN(val)) {
            return TypeUtil.NAN;
        } else if (TypeUtil.isNumber(val)) {
            return TypeUtil.NUMBER;
        } else if (TypeUtil.isNull(val)) {
            return TypeUtil.NULL;
        } else if (TypeUtil.isRegExp(val)) {
            return TypeUtil.REGEXP;
        } else if (TypeUtil.isString(val)) {
            return TypeUtil.STRING;
        } else if (TypeUtil.isUndefined(val)) {
            return TypeUtil.UNDEFINED;
        }
        // else if (TypeUtil.isXML(val)) {
        //     return TypeUtil.XML;
        // }
        else if (TypeUtil.isObject(val)) {
            return TypeUtil.OBJECT;
        } else {
            return TypeUtil.UNKNOWN;
        }
    },
};
