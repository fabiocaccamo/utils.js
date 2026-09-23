'use strict';

function decode$2(input) {
    return decodeURIComponent(escape(input));

    // var output = '';
    // var i = 0;
    // var j = input.length;
    // var c, c1, c2;

    // while (i < j)
    // {
    //     c = input.charCodeAt(i);

    //     if (c < 128) {
    //         output += String.fromCharCode(c);
    //         i++;
    //     }
    //     else if((c > 191) && (c < 224)) {
    //         c2 = input.charCodeAt(i + 1);
    //         output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    //         i += 2;
    //     }
    //     else {
    //         c2 = input.charCodeAt(i + 1);
    //         c3 = input.charCodeAt(i + 2);
    //         output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    //         i += 3;
    //     }
    // }

    // return output;
}

function encode$2(input) {
    return unescape(encodeURIComponent(input));

    // input = input.replace(/\r\n/g, '\n');

    // var output = '';
    // var i = 0;
    // var j = input.length;
    // var c;

    // for (i; i < j; i++)
    // {
    //     c = input.charCodeAt(i);
    //     if (c < 128) {
    //         output += String.fromCharCode(c);
    //     }
    //     else if ((c > 127) && (c < 2048)) {
    //         output += String.fromCharCode((c >> 6) | 192);
    //         output += String.fromCharCode((c & 63) | 128);
    //     }
    //     else {
    //         output += String.fromCharCode((c >> 12) | 224);
    //         output += String.fromCharCode(((c >> 6) & 63) | 128);
    //         output += String.fromCharCode((c & 63) | 128);
    //     }
    // }

    // return output;
}

var UTF8Util = {
    decode: decode$2,
    encode: encode$2,
};

// prettier-ignore
const CHARS_LIST = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '='
];
// prettier-ignore
const CHARS_TABLE = {
    'A':  0, 'B':  1, 'C':  2, 'D':  3, 'E':  4, 'F':  5, 'G':  6, 'H':  7, 'I':  8, 'J':  9, 'K': 10, 'L': 11, 'M': 12,
    'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
    'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31, 'g': 32, 'h': 33, 'i': 34, 'j': 35, 'k': 36, 'l': 37, 'm': 38,
    'n': 39, 'o': 40, 'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45, 'u': 46, 'v': 47, 'w': 48, 'x': 49, 'y': 50, 'z': 51,
    '0': 52, '1': 53, '2': 54, '3': 55, '4': 56, '5': 57, '6': 58, '7': 59, '8': 60, '9': 61, '+': 62, '/': 63, '=': 64
};

function decode$1(str) {
    const input = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    let output = '';

    try {
        // native implementation when available (browsers, Node.js >= 16)
        output = globalThis.atob(input);
    } catch (e) {
        const chars = CHARS_TABLE;
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;

        let i = 0;
        const j = input.length;

        while (i < j) {
            enc1 = chars[input.charAt(i++)];
            enc2 = chars[input.charAt(i++)];
            enc3 = chars[input.charAt(i++)];
            enc4 = chars[input.charAt(i++)];

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output += String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output += String.fromCharCode(chr3);
            }
        }
    }

    output = decode$2(output);
    return output;
}

function encode$1(str) {
    const input = encode$2(str);
    let output = '';

    try {
        output = globalThis.btoa(input);
    } catch (e) {
        const chars = CHARS_LIST;
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;

        let i = 0;
        const j = input.length;

        while (i < j) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            // output += (chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4));
            output += chars[enc1] + chars[enc2] + chars[enc3] + chars[enc4];
        }
    }

    return output;
}

var Base64Util = { decode: decode$1, encode: encode$1 };

function decode(str) {
    let output = '';
    try {
        output = JSON.parse(str);
    } catch (error) {
        // unquote str to avoid syntax error
        str = str.replace(/&quot;/g, '"');
        output = JSON.parse(str);
    }
    return output;
}

function decodeById(id, defaultValue = null) {
    if (typeof document === 'undefined') {
        return defaultValue;
    }
    const el = document.getElementById(id);
    return el ? decode(el.textContent) : defaultValue;
}

function encode(obj) {
    return JSON.stringify(obj);
}

var JSONUtil = {
    decode,
    decodeById,
    encode,
};

function bilinear(a, b, c, d, u, v) {
    const f = linear;
    return f(f(a, b, u), f(c, d, u), v);
}

function linear(a, b, t) {
    // return (a + ((b - a) * t));
    return a * (1.0 - t) + b * t;
}

function multilinear(list, t) {
    const s = scalar(list.length - 1, t);
    const i = s.index;
    return linear(list[i], list[i + 1], s.t);
}

function scalar(parts, t) {
    const tScaled = t * parts;
    const tScaledIndex = Math.floor(tScaled);

    const tMinIndex = 0;
    const tMaxIndex = parts - 1;

    const tIndex = constrain$1(tScaledIndex, tMinIndex, tMaxIndex);
    const tReduced = tScaled - tIndex;
    return { index: tIndex, t: tReduced };
}

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
            if (decode$1(val) !== '') {
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
            decode(val);
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

function isNaN$1(val) {
    return is(val, NaN);
}

function isNone(val) {
    return isUndefined(val) || isNull(val) || isNaN$1(val);
}

function isNumber(val) {
    return typeof val === 'number' && !isNaN$1(val) && isFinite(val);
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
    } else if (isNaN$1(val)) {
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

var TypeUtil = {
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
    isNaN: isNaN$1,
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

function average$2(values) {
    return summation(values) / values.length;
}

function constrain$1(n, a, b) {
    return Math.min(Math.max(n, Math.min(a, b)), Math.max(a, b));
}

function cycle(n, len, shift) {
    if (!isNumber(shift)) {
        shift = 0;
    }
    return ((((n - shift) % len) + len) % len) + shift;
}

function equals$3(a, b, tolerance) {
    if (!isNumber(tolerance)) {
        tolerance = 0.0000000001;
    } else if (tolerance > 0.0) {
        tolerance += 0.0000000001;
    }
    return Math.abs(a - b) <= tolerance;
}

function euclideanDistance(a, b) {
    // https://en.wikipedia.org/wiki/Euclidean_distance#Higher_dimensions
    return Math.sqrt(
        summation(
            a.map((value, index) => {
                return Math.abs(value - b[index]) ** 2;
            })
        )
    );
}

function factorial(n) {
    let f = 1;
    for (let i = f; i <= n; i++) {
        f *= i;
    }
    return f;
}

function gcd(a, b) {
    // iterative euclidean algorithm
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

const interpolation = { bilinear, linear, multilinear, scalar };

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function lerp(a, b, t) {
    return linear(a, b, t);
}

function map$2(n, a, b, c, d) {
    return linear(c, d, normalize$1(n, a, b));
}

function nearest$2(n, a, b) {
    return Math.abs(n - a) <= Math.abs(n - b) ? a : b;
}

function normalize$1(n, a, b) {
    return (n - a) / (b - a);
}

function proportion(a, b, x, y) {
    const args = [a, b, x, y];
    const argsOk = clean(args);
    if (argsOk.length !== 3) {
        return NaN;
    }

    // a : b = x : y
    const isNumber$1 = isNumber;
    if (!isNumber$1(a)) {
        return (b * x) / y;
    } else if (!isNumber$1(b)) {
        return (a * y) / x;
    } else if (!isNumber$1(x)) {
        return (y * a) / b;
    } else if (!isNumber$1(y)) {
        return (x * b) / a;
    }
    return NaN;
}

function roundDecimals(n, decimalsPlaces) {
    return Number(n.toFixed(decimalsPlaces || 2));
}

function roundToMultiple(n, multiplier) {
    return Math.round(n / multiplier) * multiplier;
}

function roundToNearest(n, values) {
    const a = sort(values.concat());
    let i = 0,
        j = 0,
        k = a.length;
    if (k === 0) {
        return NaN;
    } else if (k > 2) {
        while (j < k) {
            i = Math.floor((j + k) / 2.0);
            if (n < a[i]) {
                k = i;
            } else if (n > a[i + 1]) {
                j = i + 1;
            } else {
                break;
            }
        }
    }
    j = i + 1 in a ? i + 1 : i;
    return nearest$2(n, a[i], a[j]);
}

function roundToPower(n, base) {
    return base ** Math.round(Math.log(n) / Math.log(base));
}

function sign$1(n) {
    return n >= 0.0 ? 1 : -1;
}

function summation(values) {
    let s = 0.0;
    for (let i = 0, j = values.length; i < j; i++) {
        s += values[i];
    }
    return s;
}

var MathUtil = {
    average: average$2,
    constrain: constrain$1,
    cycle,
    equals: equals$3,
    euclideanDistance,
    factorial,
    gcd,
    interpolation,
    lcm,
    lerp,
    map: map$2,
    nearest: nearest$2,
    normalize: normalize$1,
    proportion,
    roundDecimals,
    roundToMultiple,
    roundToNearest,
    roundToPower,
    sign: sign$1,
    summation,
};

function getDomain(url = getURL(), level) {
    // remove protocol, www and port
    let domain = url.replace(/(^\w+:|^)\/\/(www\.)?/, '');
    domain = domain.split(':')[0];
    if (!level) {
        return domain;
    }
    let parts = domain.split('.');
    if (level > parts.length || level <= 0) {
        return '';
    }
    let domainName = parts[parts.length - level];
    return domainName;
}

function decodeParameter(value) {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        // malformed URI sequence, eg. "100%"
        return value;
    }
}

function getParameterByName(url, name, defaultValue) {
    const paramsDict = getParameters(url);
    return hasOwnProp(paramsDict, name)
        ? paramsDict[name] || defaultValue || ''
        : defaultValue;
}

function getParameters(url) {
    return getParametersDict(url);
}

function getParametersDict(url) {
    const paramsList = getParametersList(url);
    let param;
    const paramsDict = {};
    for (let i = 0, j = paramsList.length; i < j; i++) {
        param = paramsList[i];
        paramsDict[param['key']] = param['value'];
    }
    return paramsDict;
}

function getParametersList(url) {
    const paramsString = getParametersString(url);
    const paramsList = [];
    const paramsRE = /(([\w\-]+){1}(\=([^\&\n\r\t]*){1})?)/g;
    let paramMatch = paramsRE.exec(paramsString);
    while (paramMatch) {
        paramsList.push({
            key: paramMatch[2],
            value: decodeParameter(paramMatch[4] || ''),
        });
        paramMatch = paramsRE.exec(paramsString);
    }
    return paramsList;
}

function getParametersString(url = getURL()) {
    const queryStringPosition = url.indexOf('?');
    // prettier-ignore
    let queryString = (queryStringPosition > -1 ? url.substr(queryStringPosition + 1) : '');
    const hashDelimiterPosition = queryString.indexOf('#');
    if (hashDelimiterPosition > -1) {
        queryString = queryString.substring(0, hashDelimiterPosition);
    }
    return queryString;
}

function getURL() {
    // location is not defined when not running in browser
    return globalThis.location?.href ?? '';
}

function hasParameter(url, name) {
    return hasOwnProp(getParametersDict(url), name);
}

function isFile(url) {
    return (url || getURL()).indexOf('file://') === 0;
}

function isHttp(url) {
    return (url || getURL()).indexOf('http://') === 0;
}

function isHttps(url) {
    return (url || getURL()).indexOf('https://') === 0;
}

function isLocalhost(url) {
    const re = /^(https?:\/\/)(localhost(\.[a-z0-9-]+)*|127\.0\.0\.1)(:\d+)?(\/.*)?$/i;
    return re.test(url || getURL());
}

var URLUtil = {
    getDomain,
    getParameterByName,
    getParameters,
    getParametersDict,
    getParametersList,
    getParametersString,
    getURL,
    hasParameter,
    isFile,
    isHttp,
    isHttps,
    isLocalhost,
};

function assign(obj, other, ...others) {
    const objs = [other].concat(others);
    let i, j, k;
    for (i = 0, j = objs.length; i < j; i++) {
        for (k in objs[i]) {
            if (k === '__proto__' || k === 'constructor' || k === 'prototype') {
                continue;
            }
            if (hasOwnProp(objs[i], k)) {
                obj[k] = objs[i][k];
            }
        }
    }
    return obj;
}

function clean$1(obj, hard) {
    const objKeys = keys(obj);
    let key, val;
    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        val = obj[key];
        if (hard === true) {
            switch (of(val)) {
                case ARRAY:
                    val = obj[key] = clean(val, hard);
                    if (val.length === 0) {
                        val = null;
                    }
                    break;
                case OBJECT:
                    val = obj[key] = clean$1(val, hard);
                    if (length$1(val) === 0) {
                        val = null;
                    }
                    break;
                case STRING:
                    val = obj[key] = trim(val);
                    if (val === '') {
                        val = null;
                    }
                    break;
            }
        }
        if (isNone(val)) {
            delete obj[key];
        }
    }
    return obj;
}

function clone$2(obj) {
    const cln = {};
    const objKeys = keys(obj);
    let key, val;
    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        val = obj[key];
        switch (of(val)) {
            case ARRAY:
                cln[key] = clone(val);
                break;
            case DATE:
                cln[key] = clone$1(val);
                break;
            case OBJECT:
                cln[key] = clone$2(val);
                break;
            default:
                cln[key] = obj[key];
                break;
        }
    }
    return cln;
}

function decodeBase64(str) {
    return decode(decode$1(str));
}

function decodeJSON(str) {
    return decode(str);
}

function decodeJSONById(id, defaultValue = null) {
    return decodeById(id, defaultValue);
}

function decodeParameters(str) {
    return getParametersDict(`?${str}`);
}

function encodeBase64(obj) {
    return encode$1(encode(obj));
}

function encodeJSON(obj) {
    return encode(obj);
}

function encodeParameters(obj, objKeysFilter) {
    const objClean = clean$1(clone$2(obj), true);
    const objKeys = isArray(objKeysFilter) ? objKeysFilter : keys(obj, true);
    let key;
    let val;
    const keyval = [];

    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        if (hasOwnProp(objClean, key)) {
            val = objClean[key];
            keyval.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        }
    }

    return keyval.join('&');
}

function equals$2(obj1, obj2) {
    if (obj1 === obj2 || is(obj1, obj2)) {
        return true;
    }

    let key, val1, val2, type1, type2;

    type1 = of(obj1);
    type2 = of(obj2);

    if (type1 !== type2) {
        return false;
    }

    switch (type1) {
        case ARRAY:
        case OBJECT:
            break;
        case NUMBER:
            return equals$3(obj1, obj2);
        default:
            return String(obj1) === String(obj2);
    }

    for (key in obj2) {
        if (!(key in obj1)) {
            return false;
        }
    }

    for (key in obj1) {
        val1 = obj1[key];
        val2 = obj2[key];

        if (is(obj1, val1) || is(obj2, val2) || is(val1, val2) || val1 === val2) {
            continue;
        }

        if (!equals$2(val1, val2)) {
            return false;
        }
    }

    return true;
}

function hasOwnProp(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function is(obj1, obj2) {
    return Object.is(obj1, obj2);
}

const keypath = {
    get(obj, path, defaultValue) {
        const objKeys = path.split('.');
        let key;
        let cursor = obj;
        for (let i = 0, j = objKeys.length; i < j; i++) {
            key = objKeys[i];
            try {
                cursor = cursor[key];
            } catch (e) {
                return defaultValue;
            }
        }
        return isUndefined(cursor) ? defaultValue : cursor;
    },

    set(obj, path, value) {
        const objKeys = path.split('.');
        let key;
        let cursor = obj;
        for (let i = 0, j = objKeys.length; i < j; i++) {
            key = objKeys[i];
            if (key === '__proto__' || key === 'constructor') {
                break;
            }
            if (i < j - 1) {
                // create missing containers, but never overwrite existing arrays
                if (!isObject(cursor[key]) && !isArray(cursor[key])) {
                    cursor[key] = {};
                }
                cursor = cursor[key];
            } else {
                cursor[key] = value;
            }
        }
    },
};

function keys(obj, sorted) {
    const k = Object.keys(obj);
    if (sorted === true) {
        k.sort();
    }
    return k;
}

function length$1(obj) {
    return keys(obj).length;
}

function map$1(obj, func) {
    const m = {};
    keys(obj).forEach((k) => {
        m[k] = func.call(null, obj[k], k, obj);
    });
    return m;
}

function merge(obj1, obj2, ...objs) {
    const objsList = [{}, obj1, obj2].concat(objs);
    const obj = assign.apply(null, objsList);
    return obj;
}

function search(objs, filter) {
    // prettier-ignore
    const results = [];
    let i, j, k, m, obj, res, objKeys, key, val;
    for (i = 0, j = objs.length; i < j; i++) {
        obj = objs[i];
        res = obj;
        objKeys = keys(filter);
        for (k = 0, m = objKeys.length; k < m; k++) {
            key = objKeys[k];
            val = filter[key];
            if (!equals$2(obj[key], val)) {
                res = null;
                break;
            }
        }
        if (res) {
            results.push(res);
        }
    }
    return results;
}

function values(obj, sorted) {
    const objKeys = keys(obj, sorted);
    const vals = [];
    for (let i = 0, j = objKeys.length; i < j; i++) {
        vals.push(obj[objKeys[i]]);
    }
    return vals;
}

var ObjectUtil = {
    assign,
    clean: clean$1,
    clone: clone$2,
    decodeBase64,
    decodeJSON,
    decodeJSONById,
    decodeParameters,
    encodeBase64,
    encodeJSON,
    encodeParameters,
    equals: equals$2,
    hasOwnProp,
    is,
    keypath,
    keys,
    length: length$1,
    map: map$1,
    merge,
    search,
    values,
};

function argument(...args) {
    return element(args);
}

function bit(chance) {
    return boolean(chance) ? 1 : 0;
}

function boolean(chance) {
    return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
}

function color() {
    return integer(0, 0xffffff);
}

function element(array) {
    return array[index$1(array)];
}

function float(min, max) {
    return min + Math.random() * (max - min);
}

function index$1(array) {
    return integer(0, array.length - 1);
}

function integer(min, max) {
    return Math.floor(Math.round(float(min - 0.5, max + 0.5)));
}

function map(func, count) {
    const m = [];
    for (let i = 0; i < count; i++) {
        m.push(func(i));
    }
    return m;
}

function sign(chance) {
    return boolean(chance) ? 1 : -1;
}

function string(
    length,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*(-_=+).,;'
) {
    const c = charset.split('');
    const r = element;
    let i = 0;
    let s = '';
    while (i < length) {
        s += r(c);
        i++;
    }
    return s;
}

var RandomUtil = {
    argument,
    bit,
    boolean,
    color,
    element,
    float,
    index: index$1,
    integer,
    map,
    sign,
    string,
};

function contains$1(str, occurrence) {
    return Boolean(str.includes(occurrence));
}

function endsWith(str, search) {
    // if (String.prototype.endsWith) {
    //     return str.endsWith(search);
    // }
    return str.substring(str.length - search.length, str.length) === search;
}

function icontains(str, occurrence) {
    return contains$1(str.toLowerCase(), occurrence.toLowerCase());
}

function levenshteinDistance(a, b) {
    // taken from GitHub here:
    // https://gist.github.com/andrei-m/982927#gistcomment-586471
    // only the previous and the current rows of the matrix are needed
    let prev = Array.from({ length: a.length + 1 }, (_, j) => j);
    let curr = new Array(a.length + 1);
    for (let i = 1; i <= b.length; i++) {
        curr[0] = i;
        for (let j = 1; j <= a.length; j++) {
            curr[j] =
                b.charAt(i - 1) === a.charAt(j - 1)
                    ? prev[j - 1]
                    : Math.min(prev[j - 1] + 1, curr[j - 1] + 1, prev[j] + 1);
        }
        [prev, curr] = [curr, prev];
    }
    return prev[a.length];
}

function levenshteinSimilarity(a, b) {
    const d = levenshteinDistance(a, b);
    const l = Math.max(a.length, b.length);

    return l === 0 ? 1.0 : 1.0 - d / l;
}

function padLeft(str, len, char) {
    let i = str.length;
    while (i < len) {
        str = char + str;
        i++;
    }
    return str;
}

function padRight(str, len, char) {
    let i = str.length;
    while (i < len) {
        str = str + char;
        i++;
    }
    return str;
}

function padZeros(str, len) {
    return padLeft(String(str), len, '0');
}

function escapeRegex(str) {
    return String(str ?? '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function render(str, data, placeholderStart, placeholderEnd) {
    const escapedStart = escapeRegex(placeholderStart || '{{');
    const escapedEnd = escapeRegex(placeholderEnd || '}}');
    const pattern = `${escapedStart}[\\s]*([a-zA-Z0-9\\-\\_]+){1}[\\s]*${escapedEnd}`;
    const regex = new RegExp(pattern, 'g');
    data = data || {};
    // single pass: values are never parsed as placeholders or replacement patterns
    return str.replace(regex, (occurrence, key) => {
        const replacement = hasOwnProp(data, key) ? data[key] : undefined;
        return isNone(replacement) ? '' : String(replacement);
    });
}

function replace$1(str, occurrence, replacement, caseSensitive) {
    const pattern = escapeRegex(occurrence);
    const flags = caseSensitive === false ? 'gi' : 'g';
    const regex = new RegExp(pattern, flags);
    const replacementStr = String(replacement);
    // use a function to avoid the special replacement patterns ($&, $1, $$, ...)
    return str.replace(regex, () => replacementStr);
}

function reverse(str) {
    const chars = str.split('');
    chars.reverse();
    return chars.join('');
}

function rotate$2(str, count) {
    let chars = str.split('');
    chars = rotate$1(chars, count);
    return chars.join('');
}

// Transliteration table used by slugify, applied after the NFKD normalization
// (accented chars are decomposed and their combining marks removed, eg. 'é' -> 'e').
// It contains only the chars that NFKD does not reduce to ascii, with the values of Unidecode 1.4.0
// as used by python-slugify 8.0.4 (unidecode quotes removed), for these Unicode blocks:
// Latin-1 Supplement, Latin Extended-A/B, Spacing Modifier Letters, Greek, Cyrillic,
// Latin Extended Additional, General Punctuation, Currency Symbols.
// prettier-ignore
const SLUGIFY_CHARS = {
    // Latin-1 Supplement, Latin Extended-A/B
    '¢': 'C/', '£': 'PS', '¥': 'Y=', '§': 'SS', '©': '(c)', '\u00AD': '', '®': '(r)',
    '°': 'deg', '¶': 'P', 'Æ': 'AE', 'Ð': 'D', '×': 'x', 'Ø': 'O', 'Þ': 'Th', 'ß': 'ss',
    'æ': 'ae', 'ð': 'd', 'ø': 'o', 'þ': 'th', 'Đ': 'D', 'đ': 'd', 'Ħ': 'H', 'ħ': 'h',
    'ı': 'i', 'ĸ': 'k', 'Ł': 'L', 'ł': 'l', 'Ŋ': 'NG', 'ŋ': 'ng', 'Œ': 'OE', 'œ': 'oe',
    'Ŧ': 'T', 'ŧ': 't', 'ƀ': 'b', 'Ɓ': 'B', 'Ƃ': 'B', 'ƃ': 'b', 'Ƅ': '6', 'ƅ': '6',
    'Ɔ': 'O', 'Ƈ': 'C', 'ƈ': 'c', 'Ɖ': 'D', 'Ɗ': 'D', 'Ƌ': 'D', 'ƌ': 'd', 'ƍ': 'd',
    'Ǝ': '3', 'Ɛ': 'E', 'Ƒ': 'F', 'ƒ': 'f', 'Ɠ': 'G', 'Ɣ': 'G', 'ƕ': 'hv', 'Ɩ': 'I',
    'Ɨ': 'I', 'Ƙ': 'K', 'ƙ': 'k', 'ƚ': 'l', 'ƛ': 'l', 'Ɯ': 'W', 'Ɲ': 'N', 'ƞ': 'n',
    'Ɵ': 'O', 'Ƣ': 'OI', 'ƣ': 'oi', 'Ƥ': 'P', 'ƥ': 'p', 'Ʀ': 'YR', 'Ƨ': '2', 'ƨ': '2',
    'Ʃ': 'SH', 'ƪ': 'sh', 'ƫ': 't', 'Ƭ': 'T', 'ƭ': 't', 'Ʈ': 'T', 'Ʊ': 'Y', 'Ʋ': 'V',
    'Ƴ': 'Y', 'ƴ': 'y', 'Ƶ': 'Z', 'ƶ': 'z', 'Ʒ': 'ZH', 'Ƹ': 'ZH', 'ƹ': 'zh', 'ƺ': 'zh',
    'ƻ': '2', 'Ƽ': '5', 'ƽ': '5', 'ƾ': 'ts', 'ƿ': 'w', 'Ǥ': 'G', 'ǥ': 'g', 'Ƕ': 'HV',
    'Ƿ': 'W', 'Ȝ': 'Y', 'ȝ': 'y', 'Ƞ': 'N', 'ȡ': 'd', 'Ȣ': 'OU', 'ȣ': 'ou', 'Ȥ': 'Z',
    'ȥ': 'z', 'ȴ': 'l', 'ȵ': 'n', 'ȶ': 't', 'ȷ': 'j', 'ȸ': 'db', 'ȹ': 'qp', 'Ⱥ': 'A',
    'Ȼ': 'C', 'ȼ': 'c', 'Ƚ': 'L', 'Ⱦ': 'T', 'ȿ': 's', 'ɀ': 'z', 'Ɂ': '', 'ɂ': '',
    'Ƀ': 'B', 'Ʉ': 'U', 'Ɇ': 'E', 'ɇ': 'e', 'Ɉ': 'J', 'ɉ': 'j', 'Ɋ': 'q', 'ɋ': 'q',
    'Ɍ': 'R', 'ɍ': 'r', 'Ɏ': 'Y', 'ɏ': 'y',
    // Spacing Modifier Letters
    'ʹ': '', 'ʼ': '', 'ʿ': '', '˅': 'V', 'ˇ': 'V', 'ˈ': '', '˓': '', '˕': 'V', '˞': 'R',
    '˟': 'X', '˥': '', '˦': '', '˧': '', '˨': '', '˩': '', '˪': '', '˫': '', 'ˬ': 'V',
    '˯': '', '˰': '', '˱': '', '˲': '', '˳': '', '˴': '', '˵': '', '˶': '', '˷': '',
    '˸': '', '˹': '', '˺': '', '˻': '', '˼': '', '˽': '', '˾': '', '˿': '',
    // Greek
    'Ͱ': '', 'ͱ': '', 'Ͳ': '', 'ͳ': '', 'Ͷ': '', 'ͷ': '', 'ͻ': '', 'ͼ': '', 'ͽ': '',
    'Ϳ': '', 'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'E',
    'Θ': 'Th', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'Ks', 'Ο': 'O',
    'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'U', 'Φ': 'Ph', 'Χ': 'Kh', 'Ψ': 'Ps',
    'Ω': 'O', 'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'e',
    'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o',
    'π': 'p', 'ρ': 'r', 'ς': 's', 'σ': 's', 'τ': 't', 'υ': 'u', 'φ': 'ph', 'χ': 'kh',
    'ψ': 'ps', 'ω': 'o', 'Ϗ': '', 'Ϙ': '', 'ϙ': '', 'Ϛ': 'St', 'ϛ': 'st', 'Ϝ': 'W',
    'ϝ': 'w', 'Ϟ': 'Q', 'ϟ': 'q', 'Ϡ': 'Sp', 'ϡ': 'sp', 'Ϣ': 'Sh', 'ϣ': 'sh', 'Ϥ': 'F',
    'ϥ': 'f', 'Ϧ': 'Kh', 'ϧ': 'kh', 'Ϩ': 'H', 'ϩ': 'h', 'Ϫ': 'G', 'ϫ': 'g', 'Ϭ': 'CH',
    'ϭ': 'ch', 'Ϯ': 'Ti', 'ϯ': 'ti', 'ϳ': 'j', '϶': '', 'Ϸ': '', 'ϸ': '', 'Ϻ': '',
    'ϻ': '', 'ϼ': '', 'Ͻ': '', 'Ͼ': '', 'Ͽ': '',
    // Cyrillic
    'Ђ': 'Dj', 'Є': 'Ie', 'Ѕ': 'Dz', 'І': 'I', 'Ј': 'J', 'Љ': 'Lj', 'Њ': 'Nj', 'Ћ': 'Tsh',
    'Џ': 'Dzh', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
    'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch',
    'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Iu', 'Я': 'Ia',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'iu', 'я': 'ia', 'ђ': 'dj',
    'є': 'ie', 'ѕ': 'dz', 'і': 'i', 'ј': 'j', 'љ': 'lj', 'њ': 'nj', 'ћ': 'tsh',
    'џ': 'dzh', 'Ѡ': 'O', 'ѡ': 'o', 'Ѣ': 'E', 'ѣ': 'e', 'Ѥ': 'Ie', 'ѥ': 'ie', 'Ѧ': 'E',
    'ѧ': 'e', 'Ѩ': 'Ie', 'ѩ': 'ie', 'Ѫ': 'O', 'ѫ': 'o', 'Ѭ': 'Io', 'ѭ': 'io', 'Ѯ': 'Ks',
    'ѯ': 'ks', 'Ѱ': 'Ps', 'ѱ': 'ps', 'Ѳ': 'F', 'ѳ': 'f', 'Ѵ': 'Y', 'ѵ': 'y', 'Ѹ': 'u',
    'ѹ': 'u', 'Ѻ': 'O', 'ѻ': 'o', 'Ѽ': 'O', 'ѽ': 'o', 'Ѿ': 'Ot', 'ѿ': 'ot', 'Ҁ': 'Q',
    'ҁ': 'q', '҂': '*1000*', '҈': '*100.000*', '҉': '*1.000.000*', 'Ҋ': '', 'ҋ': '',
    'Ҏ': 'R', 'ҏ': 'r', 'Ґ': 'G', 'ґ': 'g', 'Ғ': 'G', 'ғ': 'g', 'Ҕ': 'G', 'ҕ': 'g',
    'Җ': 'Zh', 'җ': 'zh', 'Ҙ': 'Z', 'ҙ': 'z', 'Қ': 'K', 'қ': 'k', 'Ҝ': 'K', 'ҝ': 'k',
    'Ҟ': 'K', 'ҟ': 'k', 'Ҡ': 'K', 'ҡ': 'k', 'Ң': 'N', 'ң': 'n', 'Ҥ': 'Ng', 'ҥ': 'ng',
    'Ҧ': 'P', 'ҧ': 'p', 'Ҩ': 'Kh', 'ҩ': 'kh', 'Ҫ': 'S', 'ҫ': 's', 'Ҭ': 'T', 'ҭ': 't',
    'Ү': 'U', 'ү': 'u', 'Ұ': 'U', 'ұ': 'u', 'Ҳ': 'Kh', 'ҳ': 'kh', 'Ҵ': 'Tts', 'ҵ': 'tts',
    'Ҷ': 'Ch', 'ҷ': 'ch', 'Ҹ': 'Ch', 'ҹ': 'ch', 'Һ': 'H', 'һ': 'h', 'Ҽ': 'Ch', 'ҽ': 'ch',
    'Ҿ': 'Ch', 'ҿ': 'ch', 'Ӄ': 'K', 'ӄ': 'k', 'Ӆ': '', 'ӆ': '', 'Ӈ': 'N', 'ӈ': 'n',
    'Ӊ': '', 'ӊ': '', 'Ӌ': 'Ch', 'ӌ': 'ch', 'Ӎ': '', 'ӎ': '', 'ӏ': '', 'Ӕ': 'Ae',
    'ӕ': 'ae', 'Ӡ': 'Dz', 'ӡ': 'dz', 'Ө': 'O', 'ө': 'o', 'Ӷ': '', 'ӷ': '', 'Ӻ': '',
    'ӻ': '', 'Ӽ': '', 'ӽ': '', 'Ӿ': '', 'ӿ': '',
    // Latin Extended Additional
    'ẜ': '', 'ẝ': '', 'ẞ': 'SS', 'ẟ': '', 'Ỻ': '', 'ỻ': '', 'Ỽ': '', 'ỽ': '', 'Ỿ': '',
    'ỿ': '',
    // General Punctuation
    '\u200C': '', '\u200D': '', '\u200E': '', '\u200F': '', '‘': '', '’': '', '‛': '',
    '\u202A': '', '\u202B': '', '\u202C': '', '\u202D': '', '\u202E': '', '‰': '%0',
    '‱': '%00', '′': '', '⁋': 'PP', '⁏': '', '⁐': '', '⁑': '', '⁔': '', '⁕': '', '⁖': '',
    '⁘': '', '⁙': '', '⁚': '', '⁛': '', '⁜': '', '⁝': '', '⁞': '', '\u2060': '',
    '\u2061': '', '\u2062': '', '\u2063': '', '\u2064': '', '\u2066': '', '\u2067': '',
    '\u2068': '', '\u2069': '', '\u206A': '', '\u206B': '', '\u206C': '', '\u206D': '',
    '\u206E': '', '\u206F': '',
    // Currency Symbols
    '₠': 'ECU', '₡': 'CL', '₢': 'Cr', '₣': 'FF', '₤': 'L', '₥': 'mil', '₦': 'N',
    '₧': 'Pts', '₩': 'W', '₪': 'NS', '₫': 'D', '€': 'EUR', '₭': 'K', '₮': 'T', '₯': 'Dr',
    '₰': 'Pf', '₱': 'P', '₲': 'G', '₳': 'A', '₴': 'UAH', '₵': 'C|', '₶': 'L', '₷': 'Sm',
    '₸': 'T', '₹': 'Rs', '₺': 'L', '₻': 'M', '₼': 'm', '₽': 'R', '₾': 'l', '₿': 'BTC',
    '⃀': '',
    // Other chars produced by NFKD
    'ɣ': 'g', 'ɦ': 'h', 'ɹ': 'r', 'ɻ': 'r', 'ʁ': 'R', 'ʒ': 'Z'
};

function truncateSlug(str, maxLength, wordBoundary, separator) {
    // same algorithm of python-slugify smart_truncate (with save_order = false)
    if (str.length < maxLength) {
        return str;
    }
    if (!wordBoundary) {
        return str.substring(0, maxLength).replace(/^-+|-+$/g, '');
    }
    if (!str.includes(separator)) {
        return str.substring(0, maxLength);
    }
    let truncated = '';
    let nextLength;
    for (const word of str.split(separator)) {
        if (!word) {
            continue;
        }
        nextLength = truncated.length + word.length;
        if (nextLength < maxLength) {
            truncated += word + separator;
        } else if (nextLength === maxLength) {
            truncated += word;
            break;
        }
    }
    if (!truncated) {
        truncated = str.substring(0, maxLength);
    }
    return truncated.replace(/^-+|-+$/g, '');
}

/**
 * Converts a value to a URL friendly slug.
 *
 * The output is the same of python-slugify (8.0.4, with Unidecode) with the same options,
 * for the scripts covered by the transliteration table: Latin (including Vietnamese),
 * Greek and Cyrillic.
 *
 * Known divergences from python-slugify:
 * - chars of other scripts (eg. CJK, Arabic, Hebrew, Armenian) are not transliterated,
 *   they are dropped and act as separators: 'Noto Sans 日本' -> 'noto-sans'
 *   (python-slugify returns 'noto-sans-ri-ben');
 * - HTML entities are not decoded (eg. '&amp;', '&#233;').
 *
 * @param {*} value The value to slugify, converted with `String(value ?? '')`.
 * @param {Object} [options]
 * @param {string} [options.separator='-'] The separator that replaces every run of non alphanumeric chars.
 * @param {boolean} [options.lowercase=true] Convert the slug to lowercase.
 * @param {number} [options.maxLength=0] The max length of the slug, 0 means unlimited.
 * @param {boolean} [options.wordBoundary=false] When truncating, keep only full words.
 * @returns {string} The slug.
 */
function slugify(value, options) {
    const {
        separator = '-',
        lowercase = true,
        maxLength = 0,
        wordBoundary = false,
    } = options || {};
    const sep = '-';

    // decompose accented chars into base char + combining marks (eg. 'é' -> 'e' + '\u0301')
    let str = String(value ?? '').normalize('NFKD');

    // transliterate chars for their ascii equivalent, in a single pass
    let transliterated = '';
    let replacement;
    for (const char of str) {
        replacement = SLUGIFY_CHARS[char];
        transliterated += replacement === undefined ? char : replacement;
    }
    // remove the combining marks
    str = transliterated.replace(/\p{M}/gu, '');

    if (lowercase) {
        str = str.toLowerCase();
    }
    // remove thousands separators between digits, eg. '1,000' -> '1000'
    str = str.replace(/(\d),(?=\d)/g, '$1');
    // replace every run of non alphanumeric chars with a single separator
    str = str.replace(/[^A-Za-z0-9]+/g, sep);
    // strip separator from the beginning and from the end
    str = str.replace(/^-|-$/g, '');

    if (maxLength > 0) {
        str = truncateSlug(str, maxLength, wordBoundary, sep);
    }
    if (separator !== sep) {
        str = str.split(sep).join(separator);
    }
    return str;
}

function startsWith(str, search) {
    // if (String.prototype.startsWith) {
    //     return str.startsWith(search);
    // }
    return str.substr(0, search.length) === search;
}

function toConstantCase(str) {
    return str.replace(/[\s]/gm, '_').toUpperCase();
}

function toRandomCase(str) {
    return str.replace(/./gm, (match) => {
        return boolean() ? match.toUpperCase() : match.toLowerCase();
    });
}

function toTitleCase(str, toLowerCaseRest) {
    return str.replace(/[^\'\‘\’\`\-\s]+/gm, (match) => {
        return toUpperCaseFirst(match, toLowerCaseRest);
    });
}

function toUpperCaseFirst(str, toLowerCaseRest) {
    if (str.length === 0) {
        return str;
    }
    const f = str.substr(0, 1).toUpperCase();
    const r = str.length > 1 ? str.substr(1) : '';
    return f + (toLowerCaseRest === true ? r.toLowerCase() : r);
}

function trim(str) {
    // return str.replace(/^[\s]+|(?<!\s)[\s]+$/gm, '');
    return str.trim();
}

function trimLeft(str) {
    // return str.replace(/^\s+/gm, '');
    return str.trimStart();
}

function trimRight(str) {
    // return str.replace(/\s+$/gm, '');
    return str.trimEnd();
}

var StringUtil = {
    contains: contains$1,
    endsWith,
    icontains,
    levenshteinDistance,
    levenshteinSimilarity,
    padLeft,
    padRight,
    padZeros,
    render,
    replace: replace$1,
    reverse,
    rotate: rotate$2,
    slugify,
    startsWith,
    toConstantCase,
    toRandomCase,
    toTitleCase,
    toUpperCaseFirst,
    trim,
    trimLeft,
    trimRight,
};

function clone$1(date) {
    return new Date(date.getTime());
}

function constrain(date, a, b) {
    const dateMin = min$1(a, b);
    const dateMax = max$1(a, b);
    return min$1(max$1(date, dateMin), dateMax);
}

function format(date, str) {
    // https://docs.djangoproject.com/en/4.0/ref/templates/builtins/#date
    const replace = replace$1;
    const padZeros$1 = padZeros;
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const dt = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthNum = month + 1;
    const monthName = months[month];
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    const placeholders = [
        ['YYYY', year],
        ['YY', padZeros$1(year, 4).substring(2, 4)],
        ['MM', padZeros$1(monthNum, 2)],
        ['M', monthNum],
        ['DD', padZeros$1(dt, 2)],
        ['D', dt],
        ['hh', padZeros$1(hours, 2)],
        ['h', hours],
        ['mm', padZeros$1(minutes, 2)],
        ['m', minutes],
        ['ss', padZeros$1(seconds, 2)],
        ['s', seconds],
        ['ll', padZeros$1(milliseconds, 3)],
        ['XX', monthName],
        ['X', monthName.substring(0, 3)],
        ['ZZ', days[day]],
        ['Z', days[day].substring(0, 3)],
    ];
    let placeholder, occurrence;
    for (let i = 0, j = placeholders.length; i < j; i++) {
        placeholder = placeholders[i];
        occurrence = placeholder[0];
        if (!str.includes(occurrence)) {
            continue;
        }
        str = replace(str, occurrence, placeholder[1]);
    }
    return str;
}

function identifier(date) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // getMonth() is zero-based
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const milliseconds = d.getMilliseconds();
    return (
        String(year) +
        padZeros(month, 2) +
        padZeros(day, 2) +
        padZeros(hours, 2) +
        padZeros(minutes, 2) +
        padZeros(seconds, 2) +
        padZeros(milliseconds, 3)
    );
}

function isFuture(date, checkTime) {
    const day = new Date(date.getTime());
    const now = new Date();
    if (checkTime !== true) {
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);
    }
    const delta = now.getTime() - day.getTime();
    return delta < 0;
}

function isPast(date, checkTime) {
    const day = new Date(date.getTime());
    const now = new Date();
    if (checkTime !== true) {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
    }
    const delta = now.getTime() - day.getTime();
    return delta > 0;
}

function max$1(date, other) {
    return date.getTime() > other.getTime() ? date : other;
}

function min$1(date, other) {
    return date.getTime() <= other.getTime() ? date : other;
}

function normalize(ms) {
    const time = {
        milliseconds: ms % 1000,
        seconds: Math.floor(ms / 1000) % 60,
        minutes: Math.floor(ms / 1000 / 60) % 60,
        hours: Math.floor(ms / 1000 / 60 / 60) % 24,
        days: Math.floor(ms / 1000 / 60 / 60 / 24),
    };
    return time;
}

function parse(date) {
    let timestamp;
    const timestampIsValid = (t) => {
        return isNumber(t) && t >= 0 && isNumber(new Date(t).getTime());
    };
    if (isDate(date)) {
        return date;
    } else if (isNumber(date)) {
        timestamp = date;
        if (timestampIsValid(timestamp)) {
            return new Date(timestamp);
        }
    } else if (isString(date)) {
        timestamp = Number(date);
        if (timestampIsValid(timestamp)) {
            return new Date(timestamp);
        }
        timestamp = Date.parse(date);
        if (timestampIsValid(timestamp)) {
            return new Date(timestamp);
        }
    }
    return null;
}

function timestamp(date) {
    const d = date || new Date();
    return d.getTime();
}

function today() {
    const d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

function tomorrow() {
    const d = today();
    d.setDate(d.getDate() + 1);
    return d;
}

function yesterday() {
    const d = today();
    d.setDate(d.getDate() - 1);
    return d;
}

function yyyymmdd(date, separator) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // getMonth() is zero-based
    const day = d.getDate();
    const sep = separator || '';
    // prettier-ignore
    return (String(year) + sep +
            padZeros(month, 2) + sep +
            padZeros(day, 2));
}

var DateUtil = {
    clone: clone$1,
    constrain,
    format,
    identifier,
    isFuture,
    isPast,
    max: max$1,
    min: min$1,
    normalize,
    parse,
    timestamp,
    today,
    tomorrow,
    yesterday,
    yyyymmdd,
};

function all(list) {
    return list.every((item) => {
        switch (of(item)) {
            case ARRAY:
                return item.length > 0;
            case OBJECT:
                return length$1(item) > 0;
            default:
                return Boolean(item);
        }
    });
}

function any(list) {
    return list.some((item) => {
        switch (of(item)) {
            case ARRAY:
                return item.length > 0;
            case OBJECT:
                return length$1(item) > 0;
            default:
                return Boolean(item);
        }
    });
}

function clean(list, hard) {
    let items = list.slice();
    items = items.filter((item) => {
        return !isNone(item);
    });
    if (hard === true) {
        items = items
            .map((item) => {
                let itemClean;
                switch (of(item)) {
                    case ARRAY:
                        itemClean = clean(item, hard);
                        return itemClean.length > 0 ? itemClean : null;
                    case OBJECT:
                        itemClean = clean$1(item, hard);
                        return length$1(itemClean) > 0 ? itemClean : null;
                    case STRING:
                        itemClean = trim(item);
                        return itemClean !== '' ? item : null;
                    default:
                        return item;
                }
            })
            .filter((item) => {
                return !isNone(item);
            });
    }
    return items;
}

function clone(list) {
    const cln = list.slice();
    let val;
    for (let i = 0, j = cln.length; i < j; i++) {
        val = cln[i];
        switch (of(val)) {
            case ARRAY:
                cln[i] = clone(val);
                break;
            case DATE:
                cln[i] = clone$1(val);
                break;
            case OBJECT:
                cln[i] = clone$2(val);
                break;
        }
    }
    return cln;
}

function contains(list, value, ...otherValues) {
    const values = [value].concat(otherValues);
    let val, valFound;

    for (let i = 0, j = values.length; i < j; i++) {
        val = values[i];
        valFound = false;
        for (let k = 0, m = list.length; k < m; k++) {
            if (equals$2(list[k], val)) {
                valFound = true;
                break;
            }
        }
        if (!valFound) {
            return false;
        }
    }

    return true;
}

function equals$1(listA, listB) {
    return equals$2(listA, listB);
}

function flatten(list) {
    const items = [];
    for (let i = 0, j = list.length; i < j; i++) {
        if (isArray(list[i])) {
            items.push(...flatten(list[i]));
        } else {
            items.push(list[i]);
        }
    }
    return items;
}

function index(list, keys, flat) {
    const dict = {};
    let item;
    let key;
    let val;

    if (isString(keys)) {
        keys = [keys];
    }

    for (let i = 0, j = list.length; i < j; i++) {
        item = list[i];

        for (let m = 0, n = keys.length; m < n; m++) {
            key = String(keys[m]);
            val = String(item[key]);

            if (flat === true) {
                dict[val] = item;
            } else {
                if (isUndefined(dict[val])) {
                    dict[val] = [];
                }
                dict[val].push(item);
            }
        }
    }

    return dict;
}

function insert(list, index, item) {
    list.splice(index, 0, item);
    return list;
}

function max(list, callback) {
    return reduce(
        list,
        (a, b) => {
            if (isFunction(callback)) {
                return Math.max(a, callback(b));
            }
            return Math.max(a, b);
        },
        -Infinity
    );
}

function min(list, callback) {
    return reduce(
        list,
        (a, b) => {
            if (isFunction(callback)) {
                return Math.min(a, callback(b));
            }
            return Math.min(a, b);
        },
        Infinity
    );
}

function paginate(list, itemsPerPage) {
    const itemsTotal = list.length;
    const pagesTotal = itemsPerPage > 0 ? Math.ceil(itemsTotal / itemsPerPage) : 0;
    const pages = [];
    let i, j;
    for (i = 0, j = 0; i < pagesTotal; i++) {
        j = i * itemsPerPage;
        pages[i] = list.slice(j, j + Math.min(itemsPerPage, itemsTotal));
    }
    return pages;
}

function reduce(list, reducer, initialValue) {
    let value = isUndefined(initialValue) ? 0 : initialValue;
    for (let i = 0, j = list.length; i < j; i++) {
        value = reducer(value, list[i], i, list);
    }
    return value;
}

function replace(list, searchValue, replacementValue) {
    for (let i = 0, j = list.length; i < j; i++) {
        if (equals$2(list[i], searchValue)) {
            list[i] = replacementValue;
        }
    }
    return list;
}

function remove(list, value, ...otherValues) {
    const values = [value].concat(otherValues);
    for (let k = 0, m = values.length; k < m; k++) {
        for (let i = 0, j = list.length; i < j; i++) {
            if (equals$2(list[i], values[k])) {
                list.splice(i, 1);
                i--;
                j--;
            }
        }
    }
    return list;
}

function rotate$1(list, count) {
    const cursor = cycle(count, list.length);
    return list.slice(cursor).concat(list.slice(0, cursor));
}

function shuffle(list) {
    // Fisher-Yates shuffle
    const items = list.slice();
    let randomIndex;
    for (let i = items.length - 1; i > 0; i--) {
        randomIndex = integer(0, i);
        [items[i], items[randomIndex]] = [items[randomIndex], items[i]];
    }
    return items;
}

function sort(list, key) {
    const isArray$1 = isArray;
    const isObject$1 = isObject;
    const isNumber$1 = isNumber;
    const isString$1 = isString;

    const compare = (a, b) => {
        let aVal;
        let bVal;

        if (isObject$1(a) && isObject$1(b) && isString$1(key)) {
            // comparing objects
            aVal = key in a ? a[key] : a;
            bVal = key in b ? b[key] : b;
        } else if (isArray$1(a) && isArray$1(b) && isNumber$1(key)) {
            // comparing arrays
            const index = key;
            aVal = index >= 0 && index < a.length ? a[index] : a;
            bVal = index >= 0 && index < b.length ? b[index] : b;
        } else {
            aVal = a;
            bVal = b;
        }

        const aValIsNum = isNumber$1(aVal);
        const bValIsNum = isNumber$1(bVal);

        if (aValIsNum && bValIsNum) {
            return aVal - bVal;
        } else if (aValIsNum) {
            return -1;
        } else if (bValIsNum) {
            return 1;
        } else if (aVal === undefined || bVal === undefined) {
            // same as the default sort: undefined values go last
            return (aVal === undefined) - (bVal === undefined);
        } else {
            // same as the default sort: compare string values
            const aStr = String(aVal);
            const bStr = String(bVal);
            return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
        }
    };

    return list.sort(compare);
}

function sum(list, callback) {
    return reduce(
        list,
        (a, b) => {
            if (isFunction(callback)) {
                return a + callback(b);
            }
            return a + b;
        },
        0
    );
}

function unique(list) {
    let item;
    const items = [];
    const itemsNotEquals = (itemUnique) => {
        return !equals$2(item, itemUnique);
    };
    for (let i = 0, j = list.length; i < j; i++) {
        item = list[i];
        if (items.every(itemsNotEquals)) {
            items.push(item);
        }
    }
    return items;
}

function unzip(list) {
    return zip.apply(null, list);
}

function zip(list1, list2, ...otherLists) {
    const lists = [list1, list2].concat(otherLists);
    let listLength = Infinity;
    lists.forEach((item) => {
        listLength = Math.min(listLength, item.length);
    });
    const list = [];
    for (let i = 0; i < listLength; i++) {
        list[i] = [];
        for (let j = 0, k = lists.length; j < k; j++) {
            list[i][j] = lists[j][i];
        }
    }
    return list;
}

var ArrayUtil = {
    all,
    any,
    clean,
    clone,
    contains,
    equals: equals$1,
    flatten,
    index,
    insert,
    max,
    min,
    paginate,
    reduce,
    replace,
    remove,
    rotate: rotate$1,
    shuffle,
    sort,
    sum,
    unique,
    unzip,
    zip,
};

function decodeInt(s) {
    return parseInt(s, 16);
}

function encodeInt(n) {
    const hex = Math.round(n).toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
}

var HexUtil = {
    decodeInt,
    encodeInt,
};

function average$1(colors) {
    let c;
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    let i = 0;
    const j = colors.length;
    for (j; i < j; i++) {
        c = colors[i];
        r += c.r;
        g += c.g;
        b += c.b;
        a += isNaN(c.a) ? 1.0 : c.a;
    }
    const round = Math.round;
    r = round(r / j);
    g = round(g / j);
    b = round(b / j);
    // alpha is in the 0.0 - 1.0 range, rounding it to integer would lose it
    a = roundDecimals(a / j, 2);
    return { r: r, g: g, b: b, a: a };
}

function distance$2(colorA, colorB) {
    const rDiff = colorA.r - colorB.r;
    const gDiff = colorA.g - colorB.g;
    const bDiff = colorA.b - colorB.b;
    const aDiff = Math.round(
        ((isNaN(colorA.a) ? 1.0 : colorA.a) - (isNaN(colorB.a) ? 1.0 : colorB.a)) * 255
    );
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff + aDiff * aDiff);
}

function gradient$1(colors, steps) {
    const colorsOutput = [];
    let color;
    const mlerp = interpolateMultilinear$1;
    let t = 0.0;
    const tInc = 1.0 / Math.max(1, steps - 1);
    const tConstrain = constrain$1;
    for (let i = 0; i < steps; i++) {
        t = i * tInc;
        t = tConstrain(t, 0.0, 1.0);
        color = mlerp(colors, t);
        colorsOutput.push(color);
    }
    return colorsOutput;
}

function gradientMatrix$1(colors, stepsX, stepsY) {
    // colors: { top, topRight, right, bottomLeft, bottom, bottomRight, left, center };
    // only 4 corners are required
    let colorTopLeft = colors.topLeft;
    let colorTop = colors.top;
    let colorTopRight = colors.topRight;
    let colorRight = colors.right;
    let colorBottomLeft = colors.bottomLeft;
    let colorBottom = colors.bottom;
    let colorBottomRight = colors.bottomRight;
    let colorLeft = colors.left;
    let colorCenter = colors.center;
    // var colorAvg = average;
    const colorLerp = interpolateLinear$1;
    const colorBerp = interpolateBilinear$1;

    if (!colorTopLeft || !colorTopRight || !colorBottomLeft || !colorBottomRight) {
        return null;
    }
    if (!colorTop) {
        // colorTop = colorAvg([colorTopLeft, colorTopRight]);
        colorTop = colorLerp(colorTopLeft, colorTopRight, 0.5);
    }
    if (!colorRight) {
        // colorRight = colorAvg([colorBottomRight, colorTopRight]);
        colorRight = colorLerp(colorBottomRight, colorTopRight, 0.5);
    }
    if (!colorBottom) {
        // colorBottom = colorAvg([colorBottomLeft, colorBottomRight]);
        colorBottom = colorLerp(colorBottomLeft, colorBottomRight, 0.5);
    }
    if (!colorLeft) {
        // colorLeft = colorAvg([colorTopLeft, colorBottomLeft]);
        colorLeft = colorLerp(colorTopLeft, colorBottomLeft, 0.5);
    }
    if (!colorCenter) {
        // colorCenter = colorAvg([colorTop, colorLeft, colorBottom, colorRight]);
        colorCenter = colorBerp(colorTop, colorBottom, colorLeft, colorRight, 0.5, 0.5);
    }

    const colorsTopLeft = [colorTopLeft, colorLeft, colorCenter, colorTop];
    const colorsBottomLeft = [colorLeft, colorBottomLeft, colorBottom, colorCenter];
    const colorsBottomRight = [colorCenter, colorBottom, colorBottomRight, colorRight];
    const colorsTopRight = [colorTop, colorCenter, colorRight, colorTopRight];
    const colorsRegions = [
        [colorsTopLeft, colorsTopRight],
        [colorsBottomLeft, colorsBottomRight],
    ];
    let colorsRegion;
    let color;
    const colorsMatrix = [];

    // test
    // var gradientTop     = gradient([colorTopLeft, colorTop, colorTopRight], stepsX);
    // var gradientLeft    = gradient([colorTopLeft, colorLeft, colorBottomLeft], stepsY);
    // var gradientBottom  = gradient([colorBottomLeft, colorBottom, colorBottomRight], stepsX);
    // var gradientRight   = gradient([colorTopRight, colorRight, colorBottomRight], stepsY);

    let tX, tXScaled;
    let tY, tYScaled;
    const tScalar = scalar;

    let x, y;

    for (y = 0; y < stepsY; y++) {
        colorsMatrix[y] = [];

        tY = y / (stepsY - 1) || 0.0;
        tYScaled = tScalar(2, tY); // 2 = colorsQuadrants.length

        for (x = 0; x < stepsX; x++) {
            tX = x / (stepsX - 1) || 0.0;
            tXScaled = tScalar(2, tX); // 2 = colorsQuadrants[tYScaled.index].length

            colorsRegion = colorsRegions[tYScaled.index][tXScaled.index];
            colorTopLeft = colorsRegion[0];
            colorBottomLeft = colorsRegion[1];
            colorBottomRight = colorsRegion[2];
            colorTopRight = colorsRegion[3];
            color = colorBerp(
                colorTopLeft,
                colorBottomLeft,
                colorTopRight,
                colorBottomRight,
                tYScaled.t,
                tXScaled.t
            );
            colorsMatrix[y][x] = color;

            // test
            // colorsMatrix[y][stepsX - 1] = gradientRight[y];
            // colorsMatrix[y][0] = gradientLeft[y];
        }

        // test
        // colorsMatrix[y][stepsX - 1] = gradientRight[y];
        // colorsMatrix[y][0] = gradientLeft[y];
    }

    return colorsMatrix;
}

function interpolateBilinear$1(
    colorTopLeft,
    colorBottomLeft,
    colorTopRight,
    colorBottomRight,
    ty,
    tx
) {
    const lerp = interpolateLinear$1;
    return lerp(
        lerp(colorTopLeft, colorBottomLeft, ty),
        lerp(colorTopRight, colorBottomRight, ty),
        tx
    );
}

function interpolateLinear$1(colorFrom, colorTo, t) {
    const lerp = linear;
    const round = Math.round;
    return {
        r: round(lerp(colorFrom.r, colorTo.r, t)),
        g: round(lerp(colorFrom.g, colorTo.g, t)),
        b: round(lerp(colorFrom.b, colorTo.b, t)),
        a: roundDecimals(
            lerp(
                isNaN(colorFrom.a) ? 1.0 : colorFrom.a,
                isNaN(colorTo.a) ? 1.0 : colorTo.a,
                t
            ),
            2
        ),
    };
}

function interpolateMultilinear$1(colors, t) {
    const s = scalar(colors.length - 1, t);
    const i = s.index;
    return interpolateLinear$1(colors[i], colors[i + 1], s.t);
}

function nearest$1(colorSearch, colors) {
    const calcDistance = distance$2;
    let tempDistance;
    let nearestDistance = Infinity;
    let nearestColor = null;
    for (let i = 0, j = colors.length; i < j; i++) {
        tempDistance = calcDistance(colorSearch, colors[i]);
        if (tempDistance < nearestDistance) {
            nearestDistance = tempDistance;
            nearestColor = colors[i];
        }
    }
    return nearestColor;
}

function toCmyk$1(color) {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const ir = 1.0 - r;
    const ig = 1.0 - g;
    const ib = 1.0 - b;
    let k = Math.min(ir, ig, ib);
    const ik = 1.0 - k;

    let c = k < 1.0 ? (ir - k) / ik : 0;
    let m = k < 1.0 ? (ig - k) / ik : 0;
    let y = k < 1.0 ? (ib - k) / ik : 0;

    c *= 100;
    m *= 100;
    y *= 100;
    k *= 100;

    const round = Math.round;
    c = round(c);
    m = round(m);
    y = round(y);
    k = round(k);

    return { c: c, m: m, y: y, k: k };
}

// function toGrayscale(color, algorithm) {
//     // TODO
//     // http://cadik.posvete.cz/color_to_gray_evaluation/
// };

function toHex$1(color, prefix) {
    const a = isNaN(color.a) ? null : color.a;
    const r = isNaN(color.r) ? 0 : color.r;
    const g = isNaN(color.g) ? 0 : color.g;
    const b = isNaN(color.b) ? 0 : color.b;
    const hex = encodeInt;
    return String(
        (prefix || '#') +
            (a === null || a >= 1.0 ? '' : hex(a * 255)) +
            hex(r) +
            hex(g) +
            hex(b)
    );
}

// function toHsl(color) {
//     // TODO
// };

// function toHsv(color) {
//     // TODO
//     // https://gist.github.com/felipesabino/5066336/revisions
// };

function toString$2(color) {
    // prettier-ignore
    return `{ r:${String(color.r)}, g:${String(color.g)}, b:${String(color.b)}, a:${String(isNaN(color.a) ? 1.0 : color.a)} }`;
}

function toStringCSS$2(color) {
    // prettier-ignore
    return `rgba(${String(color.r)}, ${String(color.g)}, ${String(color.b)}, ${String(isNaN(color.a) ? 1.0 : color.a)})`;
}

var RGBColorUtil = {
    average: average$1,
    distance: distance$2,
    gradient: gradient$1,
    gradientMatrix: gradientMatrix$1,
    interpolateBilinear: interpolateBilinear$1,
    interpolateLinear: interpolateLinear$1,
    interpolateMultilinear: interpolateMultilinear$1,
    nearest: nearest$1,
    toCmyk: toCmyk$1,
    toHex: toHex$1,
    toString: toString$2,
    toStringCSS: toStringCSS$2,
};

// function average(colors) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.average(
//             colors.map(function(color){
//                 return toRgb(color);
//             })
//         ));
// };

// function distance(colorA, colorB) {
//     return RGBColorUtil.distance(
//         toRgb(colorA),
//         toRgb(colorB));
// };

// function gradient(colors, steps) {
//     return RGBColorUtil.gradient(colors.map(function(color){
//             return toRgb(color);
//         }), steps).map(function(color){
//             return RGBColorUtil.toCmyk(color);
//         });
// };

// function gradientMatrix(colors, stepsX, stepsY) {
//     return RGBColorUtil.gradientMatrix(
//         ObjectUtil.map(colors, function(color){
//             return toRgb(color);
//         }), stepsX, stepsY).map(function(colors){
//             return colors.map(function(color){
//                 return RGBColorUtil.toCmyk(color);
//             });
//         });
// };

// function interpolateBilinear(a, b, c, d, u, v) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.interpolateBilinear(
//             toRgb(a),
//             toRgb(b),
//             toRgb(c),
//             toRgb(d), u, v));
// };

// function interpolateLinear(colorFrom, colorTo, t) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.interpolateLinear(
//             toRgb(colorFrom),
//             toRgb(colorTo), t));
// };

// function interpolateMultilinear(colors, t) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.interpolateMultilinear(
//             colors.map(function(color){
//                 return toRgb(color);
//             }), t));
// };

// function nearest(colorSearch, colors) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.nearest(
//             toRgb(colorSearch),
//             colors.map(function(color){
//                 return toRgb(color);
//             })
//         ));
// };

// function toGrayscale(color) {
//     return RGBColorUtil.toGrayscale(
//         toRgb(color));
// };

function toHex(color, prefix) {
    return toHex$1(toRgb$1(color), prefix);
}

// function toHsl(color) {
//     return RGBColorUtil.toHsl(
//         toRgb(color));
// };

// function toHsv(color) {
//     return RGBColorUtil.toHsv(
//         toRgb(color));
// };

function toRgb$1(color) {
    const c = color.c / 100;
    const m = color.m / 100;
    const y = color.y / 100;
    const k = color.k / 100;
    const ik = 1.0 - k;

    let r = 1.0 - Math.min(1.0, c * ik + k);
    let g = 1.0 - Math.min(1.0, m * ik + k);
    let b = 1.0 - Math.min(1.0, y * ik + k);

    const round = Math.round;
    r = round(r * 255);
    g = round(g * 255);
    b = round(b * 255);

    return { r: r, g: g, b: b, a: 1.0 };
}

function toString$1(color) {
    // prettier-ignore
    return `{ c:${String(color.c)}, m:${String(color.m)}, y:${String(color.y)}, k:${String(color.k)} }`;
}

function toStringCSS$1(color) {
    // prettier-ignore
    return `cmyk(${String(color.c)}%, ${String(color.m)}%, ${String(color.y)}%, ${String(color.k)}%)`;
}

var CMYKColorUtil = { toHex, toRgb: toRgb$1, toString: toString$1, toStringCSS: toStringCSS$1 };

function average(colors) {
    return toHex$1(
        average$1(
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

function distance$1(colorA, colorB) {
    return distance$2(toRgb(colorA), toRgb(colorB));
}

function gradient(colors, steps) {
    return gradient$1(
        colors.map((color) => {
            return toRgb(color);
        }),
        steps
    ).map((color) => {
        return toHex$1(color);
    });
}

function gradientMatrix(colors, stepsX, stepsY) {
    return gradientMatrix$1(
        map$1(colors, (color) => {
            return toRgb(color);
        }),
        stepsX,
        stepsY
    ).map((colors) => {
        return colors.map((color) => {
            return toHex$1(color);
        });
    });
}

function interpolateBilinear(a, b, c, d, u, v) {
    return toHex$1(
        interpolateBilinear$1(toRgb(a), toRgb(b), toRgb(c), toRgb(d), u, v)
    );
}

function interpolateLinear(colorFrom, colorTo, t) {
    return toHex$1(interpolateLinear$1(toRgb(colorFrom), toRgb(colorTo), t));
}

function interpolateMultilinear(colors, t) {
    return toHex$1(
        interpolateMultilinear$1(
            colors.map((color) => {
                return toRgb(color);
            }),
            t
        )
    );
}

function nearest(colorSearch, colors) {
    return toHex$1(
        nearest$1(
            toRgb(colorSearch),
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

function toCmyk(color) {
    return toCmyk$1(toRgb(color));
}

// function toGrayscale(color) {
//     return RGBColorUtil.toGrayscale(
//         toRgb(color));
// };

// function toHsl(color) {
//     return RGBColorUtil.toHsl(
//         toRgb(color));
// };

// function toHsv(color) {
//     return RGBColorUtil.toHsv(
//         toRgb(color));
// };

function toRgb(color) {
    const fromHex = decodeInt;
    const toHex = encodeInt;

    let hex;
    if (isNumber(color)) {
        // restore leading zeros, eg. 0x00FF00 -> '00FF00'
        hex = toHex(color).padStart(6, '0');
    } else if (isString(color)) {
        hex = color.replace(/\#|0x/, '');
    } else {
        return null;
    }
    hex = hex.toUpperCase();

    let rgb;
    let comps;

    switch (hex.length) {
        case 3:
            // eg. #000
            comps = /^([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
            rgb = {
                a: 1.0,
                r: fromHex(comps[1] + comps[1]),
                g: fromHex(comps[2] + comps[2]),
                b: fromHex(comps[3] + comps[3]),
            };
            break;

        case 6:
            // eg. #000000
            comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            rgb = {
                a: 1.0,
                r: fromHex(comps[1]),
                g: fromHex(comps[2]),
                b: fromHex(comps[3]),
            };
            break;

        case 8:
            // eg. #FF000000
            comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            rgb = {
                a: roundDecimals(fromHex(comps[1]) / 255, 2),
                r: fromHex(comps[2]),
                g: fromHex(comps[3]),
                b: fromHex(comps[4]),
            };
            break;

        default:
            return null;
    }

    // console.log(col, hex, rgb, comps);
    return rgb;
}

function toString(color, prefix) {
    return toHex$1(toRgb(color), prefix);
}

function toStringCSS(color) {
    return toString(color, '#');
}

var HexColorUtil = {
    average,
    distance: distance$1,
    gradient,
    gradientMatrix,
    interpolateBilinear,
    interpolateLinear,
    interpolateMultilinear,
    nearest,
    toCmyk,
    toRgb,
    toString,
    toStringCSS,
};

var ColorUtil = {
    cmyk: CMYKColorUtil,
    // cmykToGrayscale: CMYKColorUtil.toGrayscale,
    cmykToHex: CMYKColorUtil.toHex,
    // cmykToHsl: CMYKColorUtil.toHsl,
    // cmykToHsv: CMYKColorUtil.toHsv,
    cmykToRgb: CMYKColorUtil.toRgb,

    // grayscale: GrayscaleColorUtil,
    // grayscaleToGrayscale: GrayscaleColorUtil.toGrayscale,
    // grayscaleToHex: GrayscaleColorUtil.toHex,
    // grayscaleToHsl: GrayscaleColorUtil.toHsl,
    // grayscaleToHsv: GrayscaleColorUtil.toHsv,
    // grayscaleToRgb: GrayscaleColorUtil.toRgb,

    hex: HexColorUtil,
    hexToCmyk: HexColorUtil.toCmyk,
    // hexToGrayscale: HexColorUtil.toGrayscale,
    // hexToHsl: HexColorUtil.toHsl,
    // hexToHsv: HexColorUtil.toHsv,
    hexToRgb: HexColorUtil.toRgb,

    // hsl: HSLColorUtil,
    // hslToGrayscale: HSLColorUtil.toGrayscale,
    // hslToHex: HSLColorUtil.toHex,
    // hslToHsl: HSLColorUtil.toHsl,
    // hslToHsv: HSLColorUtil.toHsv,
    // hslToRgb: HSLColorUtil.toRgb,

    // hsv: HSVColorUtil,
    // hsvToGrayscale: HSVColorUtil.toGrayscale,
    // hsvToHex: HSVColorUtil.toHex,
    // hsvToHsl: HSVColorUtil.toHsl,
    // hsvToHsv: HSVColorUtil.toHsv,
    // hsvToRgb: HSVColorUtil.toRgb,

    rgb: RGBColorUtil,
    rgbToCmyk: RGBColorUtil.toCmyk,
    // rgbToGrayscale: RGBColorUtil.toGrayscale,
    rgbToHex: RGBColorUtil.toHex,
    // rgbToHsl: RGBColorUtil.toHsl,
    // rgbToHsv: RGBColorUtil.toHsv
};

function backIn(t, s) {
    // s = overshoot = 1.70158
    s = isNaN(s) ? 1.70158 : s;
    return t * t * ((s + 1.0) * t - s);
}

function backInOut(t, s) {
    // s = overshoot = 1.70158
    s = isNaN(s) ? 1.70158 : s;
    t /= 0.5;
    if (t < 1.0) {
        s *= 1.525;
        return 0.5 * (t * t * ((s + 1.0) * t - s));
    }
    t -= 2.0;
    s *= 1.525;
    return 0.5 * (t * t * ((s + 1.0) * t + s) + 2.0);
}

function backOut(t, s) {
    // s = overshoot = 1.70158
    s = isNaN(s) ? 1.70158 : s;
    t -= 1.0;
    return t * t * ((s + 1.0) * t + s) + 1.0;
}

function bounceIn(t) {
    t = 1.0 - t;
    if (t < 1.0 / 2.75) {
        return 1.0 - 7.5625 * t * t;
    } else if (t < 2.0 / 2.75) {
        t -= 1.5 / 2.75;
        return 1.0 - (7.5625 * t * t + 0.75);
    } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 1.0 - (7.5625 * t * t + 0.9375);
    }
    t -= 2.625 / 2.75;
    return 1.0 - (7.5625 * t * t + 0.984375);
}

function bounceInOut(t) {
    if (t < 0.5) {
        t = 1.0 - t;
        if (t < 1.0 / 2.75) {
            return 1.0 - 7.5625 * t * t;
        } else if (t < 2.0 / 2.75) {
            t -= 1.5 / 2.75;
            return 1.0 - (7.5625 * t * t + 0.75);
        } else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 1.0 - (7.5625 * t * t + 0.9375);
        }
        t -= 2.625 / 2.75;
        return 1.0 - (7.5625 * t * t + 0.984375);
    }
    if (t < 1.0 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2.0 / 2.75) {
        t -= 1.5 / 2.75;
        return 7.5625 * t * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 7.5625 * t * t + 0.9375;
    }
    t -= 2.625 / 2.75;
    return 7.5625 * t * t + 0.984375;
}

function bounceOut(t) {
    if (t < 1.0 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2.0 / 2.75) {
        t -= 1.5 / 2.75;
        return 7.5625 * t * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return 7.5625 * t * t + 0.9375;
    }
    t -= 2.625 / 2.75;
    return 7.5625 * t * t + 0.984375;
}

function circularIn(t) {
    return -(Math.sqrt(1.0 - t * t) - 1.0);
}

function circularInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return -0.5 * (Math.sqrt(1.0 - t * t) - 1.0);
    }
    t -= 2.0;
    return 0.5 * (Math.sqrt(1.0 - t * t) + 1.0);
}

function circularOut(t) {
    t -= 1.0;
    return Math.sqrt(1.0 - t * t);
}

function cubicIn(t) {
    return t * t * t;
}

function cubicInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t;
    }
    t -= 2.0;
    return 0.5 * (t * t * t + 2.0);
}

function cubicOut(t) {
    t -= 1.0;
    return t * t * t + 1.0;
}

function elasticIn(t, a, p) {
    // a = amplitude = 0.0, p = period = 0.3
    if (t === 0.0) {
        return 0.0;
    }
    if (t === 1.0) {
        return 1.0;
    }
    a = isNaN(a) ? 0.0 : a;
    p = isNaN(p) ? 0.3 : p;
    let s;
    if (a < 1.0) {
        a = 1.0;
        s = p / 4.0;
    } else {
        s = (p / (2.0 * Math.PI)) * Math.asin(1.0 / a);
    }
    t -= 1.0;
    return -(a * 2.0 ** (10.0 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p));
}

function elasticInOut(t, a, p) {
    // a = amplitude = 0.0, p = period = 0.3
    if (t === 0.0) {
        return 0.0;
    }
    t /= 0.5;
    if (t === 2.0) {
        return 1.0;
    }
    a = isNaN(a) ? 0.0 : a;
    p = isNaN(p) ? 0.3 : p;
    let s;
    if (p === 0.3) {
        p *= 1.5;
    }
    if (a < 1.0) {
        a = 1.0;
        s = p / 4.0;
    } else {
        s = (p / (2.0 * Math.PI)) * Math.asin(1.0 / a);
    }
    if (t < 1.0) {
        t -= 1.0;
        return (
            -0.5 * (a * 2.0 ** (10.0 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p))
        );
    }
    t -= 1.0;
    return (
        a * 2.0 ** (-10 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p) * 0.5 + 1.0
    );
}

function elasticOut(t, a, p) {
    // a = amplitude = 0.0, p = period = 0.3
    if (t === 0.0) {
        return 0.0;
    }
    if (t === 1.0) {
        return 1.0;
    }
    a = isNaN(a) ? 0.0 : a;
    p = isNaN(p) ? 0.3 : p;
    let s;
    if (a < 1.0) {
        a = 1.0;
        s = p / 4.0;
    } else {
        s = (p / (2.0 * Math.PI)) * Math.asin(1.0 / a);
    }
    return a * 2.0 ** (-10 * t) * Math.sin(((t - s) * (2.0 * Math.PI)) / p) + 1.0;
}

function exponentialIn(t) {
    if (t === 0.0) {
        return 0.0;
    }
    return 2.0 ** (10.0 * (t - 1.0));
}

function exponentialInOut(t) {
    if (t === 0.0) {
        return 0.0;
    }
    if (t === 1.0) {
        return 1.0;
    }
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * 2.0 ** (10.0 * (t - 1.0));
    }
    t -= 1.0;
    return 0.5 * (-(2.0 ** (-10 * t)) + 2.0);
}

function exponentialOut(t) {
    if (t === 1.0) {
        return t;
    }
    return -(2.0 ** (-10 * t)) + 1.0;
}

function none(t) {
    return t;
}

function quadraticIn(t) {
    return t * t;
}

function quadraticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t;
    }
    t -= 1.0;
    return -0.5 * (t * (t - 2.0) - 1.0);
}

function quadraticOut(t) {
    return -t * (t - 2.0);
}

function quarticIn(t) {
    return t * t * t * t;
}

function quarticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t * t;
    }
    t -= 2.0;
    return -0.5 * (t * t * t * t - 2.0);
}

function quarticOut(t) {
    t -= 1.0;
    return -(t * t * t * t - 1.0);
}

function quinticIn(t) {
    return t * t * t * t * t;
}

function quinticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t * t * t;
    }
    t -= 2.0;
    return 0.5 * (t * t * t * t * t + 2.0);
}

function quinticOut(t) {
    t -= 1.0;
    return t * t * t * t * t + 1.0;
}

function sexticIn(t) {
    return t * t * t * t * t * t;
}

function sexticInOut(t) {
    t /= 0.5;
    if (t < 1.0) {
        return 0.5 * t * t * t * t * t * t;
    }
    t -= 2.0;
    return -0.5 * (t * t * t * t * t * t - 2.0);
}

function sexticOut(t) {
    t -= 1.0;
    return -(t * t * t * t * t * t - 1.0);
}

function sineIn(t) {
    return -Math.cos(t * (Math.PI / 2.0)) + 1.0;
}

function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1.0);
}

function sineOut(t) {
    return Math.sin(t * (Math.PI / 2.0));
}

function waveCosine(t, f, a, i) {
    // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
    f = isNaN(f) ? 1.0 : f;
    a = a === true ? true : false;
    i = i === true ? true : false;

    let w = Math.cos(Math.PI * t * f);
    w = a ? Math.abs(w) : w;
    w = i ? 1.0 - w : w;
    return w;
}

function waveSawtooth(t, f, a, i) {
    // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
    f = isNaN(f) ? 1.0 : f;
    a = a === true ? true : false;
    i = i === true ? true : false;

    let w = (t * f) % 1.0;
    w = a ? Math.abs(w) : w;
    w = i ? 1.0 - w : w;
    return w;
}

function waveSine(t, f, a, i) {
    // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
    f = isNaN(f) ? 1.0 : f;
    a = a === true ? true : false;
    i = i === true ? true : false;

    let w = Math.sin(Math.PI * t * f);
    w = a ? Math.abs(w) : w;
    w = i ? 1.0 - w : w;
    return w;
}

var EaseUtil = {
    backIn,
    backInOut,
    backOut,
    bounceIn,
    bounceInOut,
    bounceOut,
    circularIn,
    circularInOut,
    circularOut,
    cubicIn,
    cubicInOut,
    cubicOut,
    elasticIn,
    elasticInOut,
    elasticOut,
    exponentialIn,
    exponentialInOut,
    exponentialOut,
    none,
    quadraticIn,
    quadraticInOut,
    quadraticOut,
    quarticIn,
    quarticInOut,
    quarticOut,
    quinticIn,
    quinticInOut,
    quinticOut,
    sexticIn,
    sexticInOut,
    sexticOut,
    sineIn,
    sineInOut,
    sineOut,
    waveCosine,
    waveSawtooth,
    waveSine,
};

function args(argumentsObj, skipCount = 0) {
    return Array.prototype.slice.call(argumentsObj, skipCount);
}

function attempt(func, scope, ...args) {
    try {
        const result = call(func, scope, ...args);
        return result;
    } catch (e) {
        return e;
    }
}

function bind(func, scope, ...argsBinded) {
    return (...args) => {
        const result = call(func, scope, ...argsBinded.concat(args));
        return result;
    };
}

function call(func, scope, ...args) {
    if (isString(func)) {
        func = scope[func];
    }
    return func.apply(scope, args);
}

function debounce(milliseconds, func, scope) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            func.apply(scope, args);
        }, milliseconds);
    };
}

function delay(milliseconds, func, scope, ...args) {
    const wrapper = bind(func, scope, ...args);
    const timeoutId = setTimeout(wrapper, milliseconds);
    return {
        cancel() {
            clearTimeout(timeoutId);
        },
        func: wrapper,
        id: timeoutId,
    };
}

function memoize(func, scope) {
    // Map avoids collisions with Object.prototype keys (eg. "constructor", "__proto__")
    const cache = new Map();

    return function (...args) {
        const key = String(args);
        if (!cache.has(key)) {
            cache.set(key, call(func, scope, ...args));
        }
        return cache.get(key);
    };
}

function noop() {
    return true;
}

function repeat(milliseconds, func, scope, ...args) {
    const wrapper = bind(func, scope, ...args);
    const intervalId = setInterval(wrapper, milliseconds);
    return {
        cancel() {
            clearInterval(intervalId);
        },
        func: wrapper,
        id: intervalId,
    };
}

function throttle(milliseconds, func, scope) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            return;
        }
        func.apply(scope, args);
        timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            timeoutId = null;
        }, milliseconds);
    };
}

function until(milliseconds, func, scope, ...args) {
    const wrapper = bind(func, scope, ...args);
    const interval = repeat(milliseconds, () => {
        if (wrapper() === false) {
            interval.cancel();
        }
    });
    return interval;
}

function validate(argumentsObj, ...types) {
    // validate(arguments, 'number', 'string', ['string', 'undefined']);

    const argsList = args(argumentsObj);
    types = types.map((type) => (Array.isArray(type) ? type : [type]));

    let argsExpectedCount = types.length;
    while (argsExpectedCount > 0) {
        if (!types[argsExpectedCount - 1].includes('undefined')) {
            break;
        }
        argsExpectedCount--;
    }

    if (argsList.length < argsExpectedCount) {
        throw new TypeError(
            `invalid arguments count: received ${argsList.length}, expected ${argsExpectedCount} arguments.`
        );
    }

    for (let i = 0; i < types.length; i++) {
        for (const type of types[i]) {
            if (!isType(type)) {
                throw new TypeError(
                    `invalid argument: expected type "${type}" is not a valid type.`
                );
            }
        }
    }

    argsList.forEach((arg, i) => {
        const argType = of(arg);
        const argTypes = types[Math.min(i, types.length - 1)];
        if (!argTypes.includes(argType)) {
            throw new TypeError(
                `invalid argument: type of argument[${i}] is "${argType}", expected "${argTypes.join('" or "')}".`
            );
        }
    });
}

var FuncUtil = {
    args,
    attempt,
    bind,
    call,
    debounce,
    delay,
    memoize,
    noop,
    repeat,
    throttle,
    until,
    validate,
};

const DEG_0 = 0.0;
const DEG_90 = 90.0;
const DEG_180 = 180.0;
const DEG_270 = 270.0;
const DEG_360 = 360.0;
const DEG_TO_RAD = Math.PI / 180.0; // 0.017453292519943295
const RAD_TO_DEG = 180.0 / Math.PI; // 57.29577951308232

function acosDeg(rad) {
    return Math.acos(rad) * RAD_TO_DEG;
}

function angleDeg(y, x) {
    return atan2Deg(y, x);
}

function angleRad(y, x) {
    return Math.atan2(y, x);
}

function asinDeg(rad) {
    return Math.asin(rad) * RAD_TO_DEG;
}

function atanDeg(rad) {
    return Math.atan(rad) * RAD_TO_DEG;
}

function atan2Deg(y, x) {
    return Math.atan2(y, x) * RAD_TO_DEG;
}

function cosDeg(deg) {
    return Math.cos(deg * DEG_TO_RAD);
}

function cycleDeg(deg) {
    return cycle(deg, DEG_360);
}

function degToRad(deg) {
    return deg * DEG_TO_RAD;
}

function fastDeg(degFrom, degTo) {
    const degDiff = degTo - degFrom;
    if (degDiff > DEG_180) {
        return -DEG_360 + degTo;
    } else if (degDiff < -DEG_180) {
        return DEG_360 + degTo;
    } else {
        return degTo;
    }
}

function haversine(lat1, lon1, lat2, lon2, km) {
    const lat1Rad = degToRad(lat1);
    const lon1Rad = degToRad(lon1);
    const lat2Rad = degToRad(lat2);
    const lon2Rad = degToRad(lon2);
    const latDist = lat2Rad - lat1Rad;
    const lonDist = lon2Rad - lon1Rad;
    // prettier-ignore
    const a = Math.sin(latDist / 2.0) * Math.sin(latDist / 2.0) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(lonDist / 2.0) * Math.sin(lonDist / 2.0);
    const c = Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a)) * 2.0;
    let r; // earth radius
    if (km === false) {
        r = 3956; // miles
    } else {
        r = 6371; // km
    }
    const distance = roundDecimals(r * c, 3);
    return distance;
}

function hypo(distanceX, distanceY) {
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

function radToDeg(rad) {
    return rad * RAD_TO_DEG;
}

function sinDeg(deg) {
    return Math.sin(deg * DEG_TO_RAD);
}

function tanDeg(deg) {
    return Math.tan(deg * DEG_TO_RAD);
}

var TrigoUtil = {
    DEG_0,
    DEG_90,
    DEG_180,
    DEG_270,
    DEG_360,
    DEG_TO_RAD,
    RAD_TO_DEG,
    acosDeg,
    angleDeg,
    angleRad,
    asinDeg,
    atanDeg,
    atan2Deg,
    cosDeg,
    cycleDeg,
    degToRad,
    fastDeg,
    haversine,
    hypo,
    radToDeg,
    sinDeg,
    tanDeg,
};

function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

function angle(a, b) {
    const angle = angleDeg(b.y - a.y, b.x - a.x);
    return cycleDeg(angle);
}

function cross(a, b) {
    // z coordinate of the cross product; x and y coordinates are zero
    return a.x * b.y - a.y * b.x;
}

function distance(a, b) {
    const dX = b.x - a.x;
    const dY = b.y - a.y;
    return Math.sqrt(dX * dX + dY * dY);
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}

function equals(a, b, tolerance) {
    const f = equals$3;
    return f(a.x, b.x, tolerance) && f(a.y, b.y, tolerance);
}

function interpolate(a, b, t) {
    const f = linear;
    return {
        x: f(a.x, b.x, t),
        y: f(a.y, b.y, t),
    };
}

function length(p) {
    return distance(p, { x: 0, y: 0 });
}

function magnitude(p) {
    return length(p);
}

function project(p, distance, angle) {
    return {
        x: p.x + distance * cosDeg(angle),
        y: p.y + distance * sinDeg(angle),
    };
}

function rect(points) {
    // single loop instead of Math.min(...values), that throws a RangeError with large arrays
    let point;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0, j = points.length; i < j; i++) {
        point = points[i];
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
    }

    return {
        topLeft: { x: minX, y: minY },
        topRight: { x: maxX, y: minY },
        bottomRight: { x: maxX, y: maxY },
        bottomLeft: { x: minX, y: maxY },
    };
}

function rotate(p, angle, pivot) {
    const pointPivot = pivot || { x: 0.0, y: 0.0 };
    const pointRel = subtract(p, pointPivot);
    const angleCos = cosDeg(angle);
    const angleSin = sinDeg(angle);
    const pointRot = {
        x: pointRel.x * angleCos - pointRel.y * angleSin,
        y: pointRel.x * angleSin + pointRel.y * angleCos,
    };
    const pointAbs = add(pointRot, pointPivot);
    return pointAbs;
}

function scale(p, amount) {
    return {
        x: p.x * amount,
        y: p.y * amount,
    };
}

function subtract(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

function translate(p, x, y) {
    return {
        x: p.x + x,
        y: p.y + y,
    };
}

var PointUtil = {
    add,
    angle,
    cross,
    distance,
    dot,
    equals,
    interpolate,
    length,
    magnitude,
    project,
    rect,
    rotate,
    scale,
    subtract,
    translate,
};

var GeomUtil = {
    point: PointUtil,
};

function isBetween(n, min, max) {
    return n >= min && n <= max;
}

function isEven(n) {
    return n % 2.0 === 0.0 && !isFloat(n);
}

function isFloat(n) {
    return n % 1 !== 0;
}

function isNegative(n) {
    return n < 0.0;
}

function isOdd(n) {
    return n % 2.0 !== 0.0 && !isFloat(n);
}

function isPositive(n) {
    return n >= 0.0;
}

function isPrime(n) {
    if (typeof n !== 'number' || Number.isNaN(n) || isFloat(n)) {
        return false;
    }
    if (n <= 1) {
        return false;
    }
    if (n <= 3) {
        return true;
    }
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

var NumberUtil = {
    isBetween,
    isEven,
    isFloat,
    isNegative,
    isOdd,
    isPositive,
    isPrime,
};

function assertArray(val, len) {
    if (!isArray(val)) {
        throw new Error(`value is not array: ${String(val)}.`);
    }
    if (isNumber(len)) {
        assertEqual(val.length, len);
    }
}

function assertBase64(val) {
    if (!isBase64(val)) {
        throw new Error(`value is not base64: ${String(val)}.`);
    }
}

function assertBoolean(val) {
    if (!isBoolean(val)) {
        throw new Error(`value is not boolean: ${String(val)}.`);
    }
}

function assertDate(val) {
    if (!isDate(val)) {
        throw new Error(`value is not date: ${String(val)}.`);
    }
}

function assertEqual(val1, val2) {
    // prettier-ignore
    if (!equals$2(val1, val2)) {
        let out1 = ((isArray(val1) || isObject(val1)) ? `\n${encode(val1)}\n` : String(val1));
        let out2 = ((isArray(val2) || isObject(val2)) ? `\n${encode(val2)}` : String(val2));
        out1 = (isString(val1) ? String(`"${out1}"`) : out1);
        out2 = (isString(val2) ? String(`"${out2}"`) : out2);
        throw new Error(`values are not equal: ${out1} != ${out2}`);
    }
}

function assertError(val) {
    if (!isError(val)) {
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
    if (!isFunction(val)) {
        throw new Error(`value is not function: ${String(val)}.`);
    }
}

function assertJSON(val) {
    if (!isJSON(val)) {
        throw new Error(`value is not json: ${String(val)}.`);
    }
}

function assertModule(val) {
    if (!isModule(val)) {
        throw new Error(`value is not module: ${String(val)}.`);
    }
}

function assertNaN(val) {
    if (!isNaN$1(val)) {
        throw new Error(`value is not NaN: ${String(val)}.`);
    }
}

function assertNone(val) {
    if (!isNone(val)) {
        throw new Error(`value is not none: ${String(val)}.`);
    }
}

function assertNotArray(val) {
    if (isArray(val)) {
        throw new Error(`value is array: ${String(val)}.`);
    }
}

function assertNotBase64(val) {
    if (isBase64(val)) {
        throw new Error(`value is base64: ${String(val)}.`);
    }
}

function assertNotBoolean(val) {
    if (isBoolean(val)) {
        throw new Error(`value is boolean: ${String(val)}.`);
    }
}

function assertNotDate(val) {
    if (isDate(val)) {
        throw new Error(`value is date: ${String(val)}.`);
    }
}

function assertNotEqual(val1, val2) {
    if (equals$2(val1, val2)) {
        const out1 =
            isArray(val1) || isObject(val1) ? `\n${encode(val1)}\n` : String(val1);
        const out2 =
            isArray(val2) || isObject(val2) ? `\n${encode(val2)}` : String(val2);
        throw new Error(`values are equal: ${out1} == ${out2}`);
    }
}

function assertNotError(val) {
    if (isError(val)) {
        throw new Error(`value is error: ${String(val)}.`);
    }
}

function assertNotFunction(val) {
    if (isFunction(val)) {
        throw new Error(`value is function: ${String(val)}.`);
    }
}

function assertNotJSON(val) {
    if (isJSON(val)) {
        throw new Error(`value is json: ${String(val)}.`);
    }
}

function assertNotModule(val) {
    if (isModule(val)) {
        throw new Error(`value is module: ${String(val)}.`);
    }
}

function assertNotNone(val) {
    if (isNone(val)) {
        throw new Error(`value is none: ${String(val)}.`);
    }
}

function assertNotNumber(val) {
    if (isNumber(val)) {
        throw new Error(`value is number: ${String(val)}.`);
    }
}

function assertNotNull(val) {
    if (isNull(val)) {
        throw new Error(`value is null: ${String(val)}.`);
    }
}

function assertNotObject(val) {
    if (isObject(val)) {
        throw new Error(`value is object: ${String(val)}.`);
    }
}

function assertNotRegExp(val) {
    if (isRegExp(val)) {
        throw new Error(`value is regexp: ${String(val)}.`);
    }
}

function assertNotString(val) {
    if (isString(val)) {
        throw new Error(`value is string: ${String(val)}.`);
    }
}

function assertNotUndefined(val) {
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

function assertNumber(val) {
    if (!isNumber(val)) {
        throw new Error(`value is not number: ${String(val)}.`);
    }
}

function assertNumberAlmostEqual(val1, val2, tolerance) {
    assertNumber(val1);
    assertNumber(val2);
    if (!equals$3(val1, val2, tolerance)) {
        throw new Error(
            `values are not almost equals (tolerance = ${String(tolerance)}): ${String(val1)} != ${String(val2)}.`
        );
    }
}

function assertNull(val) {
    if (!isNull(val)) {
        throw new Error(`value is not null: ${String(val)}.`);
    }
}

function assertObject(val) {
    if (!isObject(val)) {
        throw new Error(`value is not object: ${String(val)}.`);
    }
}

function assertRegExp(val) {
    if (!isRegExp(val)) {
        throw new Error(`value is not regexp: ${String(val)}.`);
    }
}

function assertString(val) {
    if (!isString(val)) {
        throw new Error(`value is not string: ${String(val)}.`);
    }
}

function assertThrows(val, ...args) {
    assertFunction(val);
    try {
        call(val, null, ...args);
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

var TestUtil = {
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

// function decode(str) {
//     // https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
//     var doc = null;
//         try {
//             if (window.DOMParser) {
//             parser = new DOMParser();
//             doc = parser.parseFromString(str, 'text/xml');
//         } else {
//             // Internet Explorer
//             doc = new ActiveXObject('Microsoft.XMLDOM');
//             doc.async = false;
//             doc.loadXML(str);
//         }
//     } catch(e) {
//     }
//     return doc;
// };

// function encode(doc) {
//     var ser = new XMLSerializer();
//     var str = ser.serializeToString(doc);
//     return str;
// };

function removeNamespaces(str) {
    return str.replace(/<[^<>]*?>/g, (tag) => {
        return tag.replace(/(\s|<\/?)[a-zA-Z0-9]+\:/g, '$1');
    });
}

var XMLUtil = { removeNamespaces };

const version = '1.2.0';

const utils = {
    array: ArrayUtil,
    base64: Base64Util,
    color: ColorUtil,
    date: DateUtil,
    ease: EaseUtil,
    func: FuncUtil,
    geom: GeomUtil,
    hex: HexUtil,
    json: JSONUtil,
    math: MathUtil,
    number: NumberUtil,
    object: ObjectUtil,
    random: RandomUtil,
    string: StringUtil,
    test: TestUtil,
    trigo: TrigoUtil,
    type: TypeUtil,
    xml: XMLUtil,
    url: URLUtil,
    utf8: UTF8Util,
    version,
};

module.exports = utils;
