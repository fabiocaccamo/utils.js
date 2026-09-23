import { clean as arrayClean, clone as arrayClone } from './array.js';
import { decode as base64Decode, encode as base64Encode } from './base64.js';
import { clone as dateClone } from './date.js';
import { decode as jsonDecode, decodeById, encode as jsonEncode } from './json.js';
import { equals as mathEquals } from './math.js';
import { trim } from './string.js';
import {
    ARRAY,
    DATE,
    NUMBER,
    OBJECT,
    STRING,
    isArray,
    isNone,
    isObject,
    isUndefined,
    of,
} from './type.js';
import { getParametersDict } from './url.js';

export function assign(obj, other, ...others) {
    const objs = [other].concat(others);
    let i, j, k;
    for (i = 0, j = objs.length; i < j; i++) {
        for (k in objs[i]) {
            if (k === '__proto__' || k === 'constructor' || k === 'prototype') {
                continue;
            }
            if (Object.prototype.hasOwnProperty.call(objs[i], k)) {
                obj[k] = objs[i][k];
            }
        }
    }
    return obj;
}

export function clean(obj, hard) {
    const objKeys = keys(obj);
    let key, val;
    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        val = obj[key];
        if (hard === true) {
            switch (of(val)) {
                case ARRAY:
                    val = obj[key] = arrayClean(val, hard);
                    if (val.length === 0) {
                        val = null;
                    }
                    break;
                case OBJECT:
                    val = obj[key] = clean(val, hard);
                    if (length(val) === 0) {
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

export function clone(obj) {
    const cln = {};
    const objKeys = keys(obj);
    let key, val;
    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        val = obj[key];
        switch (of(val)) {
            case ARRAY:
                cln[key] = arrayClone(val);
                break;
            case DATE:
                cln[key] = dateClone(val);
                break;
            case OBJECT:
                cln[key] = clone(val);
                break;
            default:
                cln[key] = obj[key];
                break;
        }
    }
    return cln;
}

export function decodeBase64(str) {
    return jsonDecode(base64Decode(str));
}

export function decodeJSON(str) {
    return jsonDecode(str);
}

export function decodeJSONById(id) {
    return decodeById(id);
}

export function decodeParameters(str) {
    return getParametersDict(`?${str}`);
}

export function encodeBase64(obj) {
    return base64Encode(jsonEncode(obj));
}

export function encodeJSON(obj) {
    return jsonEncode(obj);
}

export function encodeParameters(obj, objKeysFilter) {
    const objClean = clean(clone(obj), true);
    const objKeys = isArray(objKeysFilter) ? objKeysFilter : keys(obj, true);
    let key;
    let val;
    const keyval = [];

    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        if (key in objClean) {
            val = objClean[key];
            keyval.push(`${key}=${encodeURIComponent(val)}`);
        }
    }

    return keyval.join('&');
}

export function equals(obj1, obj2) {
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
            return mathEquals(obj1, obj2);
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

        if (!equals(val1, val2)) {
            return false;
        }
    }

    return true;
}

export function is(obj1, obj2) {
    return Object.is(obj1, obj2);
}

export const keypath = {
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
            if (!isObject(cursor[key])) {
                cursor[key] = {};
            }
            if (i < j - 1) {
                cursor = cursor[key];
            } else {
                cursor[key] = value;
            }
        }
    },
};

export function keys(obj, sorted) {
    const k = Object.keys(obj);
    if (sorted === true) {
        k.sort();
    }
    return k;
}

export function length(obj) {
    return keys(obj).length;
}

export function map(obj, func) {
    const m = {};
    keys(obj).forEach((k) => {
        m[k] = func.call(null, obj[k], k, obj);
    });
    return m;
}

export function merge(obj1, obj2, ...objs) {
    const objsList = [{}, obj1, obj2].concat(objs);
    const obj = assign.apply(null, objsList);
    return obj;
}

export function search(objs, filter) {
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
            if (!equals(obj[key], val)) {
                res = null;
            }
        }
        if (res) {
            results.push(res);
        }
    }
    return results;
}

export function values(obj, sorted) {
    const objKeys = keys(obj, sorted);
    const vals = [];
    for (let i = 0, j = objKeys.length; i < j; i++) {
        vals.push(obj[objKeys[i]]);
    }
    return vals;
}

export default {
    assign,
    clean,
    clone,
    decodeBase64,
    decodeJSON,
    decodeJSONById,
    decodeParameters,
    encodeBase64,
    encodeJSON,
    encodeParameters,
    equals,
    is,
    keypath,
    keys,
    length,
    map,
    merge,
    search,
    values,
};
