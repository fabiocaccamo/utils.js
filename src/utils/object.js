import ArrayUtil from './array.js';
import Base64Util from './base64.js';
import DateUtil from './date.js';
import FunctionUtil from './function.js';
import JSONUtil from './json.js';
import MathUtil from './math.js';
import StringUtil from './string.js';
import TypeUtil from './type.js';
import URLUtil from './url.js';

function assign(obj, other) {
    const objs = [other].concat(FunctionUtil.args(arguments, 2));
    let i, j, k;
    for (i = 0, j = objs.length; i < j; i++) {
        for (k in objs[i]) {
            obj[k] = objs[i][k];
        }
    }
    return obj;
}

function clean(obj, hard) {
    const objKeys = keys(obj);
    let key, val;
    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        val = obj[key];
        if (hard === true) {
            switch (TypeUtil.of(val)) {
                case TypeUtil.ARRAY:
                    val = obj[key] = ArrayUtil.clean(val, hard);
                    if (val.length === 0) {
                        val = null;
                    }
                    break;
                case TypeUtil.OBJECT:
                    val = obj[key] = clean(val, hard);
                    if (length(val) === 0) {
                        val = null;
                    }
                    break;
                case TypeUtil.STRING:
                    val = obj[key] = StringUtil.trim(val);
                    if (val === '') {
                        val = null;
                    }
                    break;
            }
        }
        if (TypeUtil.isNone(val)) {
            delete obj[key];
        }
    }
    return obj;
}

function clone(obj) {
    const cln = {};
    const objKeys = keys(obj);
    let key, val;
    for (let i = 0, j = objKeys.length; i < j; i++) {
        key = objKeys[i];
        val = obj[key];
        switch (TypeUtil.of(val)) {
            case TypeUtil.ARRAY:
                cln[key] = ArrayUtil.clone(val);
                break;
            case TypeUtil.DATE:
                cln[key] = DateUtil.clone(val);
                break;
            case TypeUtil.OBJECT:
                cln[key] = clone(val);
                break;
            default:
                cln[key] = obj[key];
                break;
        }
    }
    return cln;
}

function decodeBase64(str) {
    return JSONUtil.decode(Base64Util.decode(str));
}

function decodeJSON(str) {
    return JSONUtil.decode(str);
}

function decodeParameters(str) {
    return URLUtil.getParametersDict(`?${str}`);
}

function encodeBase64(obj) {
    return Base64Util.encode(JSONUtil.encode(obj));
}

function encodeJSON(obj) {
    return JSONUtil.encode(obj);
}

function encodeParameters(obj, objKeysFilter) {
    const objClean = clean(clone(obj), true);
    const objKeys = TypeUtil.isArray(objKeysFilter) ? objKeysFilter : keys(obj, true);
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

function equals(obj1, obj2) {
    if (obj1 === obj2 || is(obj1, obj2)) {
        return true;
    }

    let key, val1, val2, type1, type2;

    type1 = TypeUtil.of(obj1);
    type2 = TypeUtil.of(obj2);

    if (type1 !== type2) {
        return false;
    }

    switch (type1) {
        case TypeUtil.ARRAY:
        case TypeUtil.OBJECT:
            break;
        case TypeUtil.NUMBER:
            return MathUtil.equals(obj1, obj2);
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

function is(obj1, obj2) {
    // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    if (!Object.is) {
        Object.is = (x, y) => {
            // Algoritmo SameValue
            if (x === y) {
                // Steps 1-5, 7-10
                // Steps 6.b-6.e: +0 != -0
                return x !== 0 || 1 / x === 1 / y;
            } else {
                // Step 6.a: NaN === NaN
                return x !== x && y !== y;
            }
        };
    }
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
        return TypeUtil.isUndefined(cursor) ? defaultValue : cursor;
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
            if (!TypeUtil.isObject(cursor[key])) {
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

function keys(obj, sorted) {
    const k = Object.keys(obj);
    if (sorted === true) {
        k.sort();
    }
    return k;
}

function length(obj) {
    return keys(obj).length;
}

function map(obj, func) {
    const m = {};
    keys(obj).forEach((k) => {
        m[k] = func.call(null, obj[k], k, obj);
    });
    return m;
}

function merge(obj1, obj2) {
    const objs = [{}, obj1, obj2].concat(FunctionUtil.args(arguments, 2));
    const obj = assign.apply(null, objs);
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

function values(obj, sorted) {
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
