import { clone as dateClone } from './date.js';
import { cycle } from './math.js';
import {
    clean as objectClean,
    clone as objectClone,
    equals as objectEquals,
    length,
} from './object.js';
import { integer } from './random.js';
import { trim } from './string.js';
import {
    ARRAY,
    DATE,
    OBJECT,
    STRING,
    isArray as typeIsArray,
    isFunction,
    isNone,
    isNumber as typeIsNumber,
    isObject as typeIsObject,
    isString as typeIsString,
    isUndefined,
    of,
} from './type.js';

export function all(list) {
    return list.every((item) => {
        switch (of(item)) {
            case ARRAY:
                return item.length > 0;
            case OBJECT:
                return length(item) > 0;
            default:
                return Boolean(item);
        }
    });
}

export function any(list) {
    return list.some((item) => {
        switch (of(item)) {
            case ARRAY:
                return item.length > 0;
            case OBJECT:
                return length(item) > 0;
            default:
                return Boolean(item);
        }
    });
}

export function clean(list, hard) {
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
                        itemClean = objectClean(item, hard);
                        return length(itemClean) > 0 ? itemClean : null;
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

export function clone(list) {
    const cln = list.slice();
    let val;
    for (let i = 0, j = cln.length; i < j; i++) {
        val = cln[i];
        switch (of(val)) {
            case ARRAY:
                cln[i] = clone(val);
                break;
            case DATE:
                cln[i] = dateClone(val);
                break;
            case OBJECT:
                cln[i] = objectClone(val);
                break;
            default:
                break;
        }
    }
    return cln;
}

export function contains(list, value, ...otherValues) {
    const values = [value].concat(otherValues);
    let val, valFound;

    for (let i = 0, j = values.length; i < j; i++) {
        val = values[i];
        valFound = false;
        for (let k = 0, m = list.length; k < m; k++) {
            if (objectEquals(list[k], val)) {
                valFound = true;
            }
        }
        if (!valFound) {
            return false;
        }
    }

    return true;
}

export function equals(listA, listB) {
    return objectEquals(listA, listB);
}

export function flatten(list) {
    const items = [];
    for (let i = 0, j = list.length; i < j; i++) {
        if (typeIsArray(list[i])) {
            items.push(...flatten(list[i]));
        } else {
            items.push(list[i]);
        }
    }
    return items;
}

export function index(list, keys, flat) {
    const dict = {};
    let item;
    let key;
    let val;

    if (typeIsString(keys)) {
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

export function insert(list, index, item) {
    list.splice(index, 0, item);
    return list;
}

export function max(list, callback) {
    return reduce(
        list,
        (a, b) => {
            if (isFunction(callback)) {
                return Math.max(a, callback(b));
            }
            return Math.max(a, b);
        },
        Number.MIN_VALUE
    );
}

export function min(list, callback) {
    return reduce(
        list,
        (a, b) => {
            if (isFunction(callback)) {
                return Math.min(a, callback(b));
            }
            return Math.min(a, b);
        },
        Number.MAX_VALUE
    );
}

export function paginate(list, itemsPerPage) {
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

export function reduce(list, reducer, initialValue) {
    let value = isUndefined(initialValue) ? 0 : initialValue;
    for (let i = 0, j = list.length; i < j; i++) {
        value = reducer(value, list[i], i, list);
    }
    return value;
}

export function replace(list, searchValue, replacementValue) {
    for (let i = 0, j = list.length; i < j; i++) {
        if (objectEquals(list[i], searchValue)) {
            list[i] = replacementValue;
        }
    }
    return list;
}

export function remove(list, value, ...otherValues) {
    const values = [value].concat(otherValues);
    for (let k = 0, m = values.length; k < m; k++) {
        for (let i = 0, j = list.length; i < j; i++) {
            if (objectEquals(list[i], values[k])) {
                list.splice(i, 1);
                i--;
                j--;
            }
        }
    }
    return list;
}

export function rotate(list, count) {
    const cursor = cycle(count, list.length);
    return list.slice(cursor).concat(list.slice(0, cursor));
}

export function shuffle(list) {
    const items = list.slice();
    let randomIndex;
    let randomItems;
    let sortedItems = list.length;
    while (sortedItems) {
        randomIndex = integer(0, --sortedItems);
        randomItems = items.splice(randomIndex, 1);
        items.push(...randomItems);
    }
    return items;
}

export function sort(list, key) {
    const isArray = typeIsArray;
    const isObject = typeIsObject;
    const isNumber = typeIsNumber;
    const isString = typeIsString;

    const compare = (a, b) => {
        let aVal;
        let bVal;

        if (isObject(a) && isObject(b) && isString(key)) {
            // comparing objects
            aVal = key in a ? a[key] : a;
            bVal = key in b ? b[key] : b;
        } else if (isArray(a) && isArray(b) && isNumber(key)) {
            // comparing arrays
            const index = key;
            aVal = index >= 0 && index < a.length ? a[index] : a;
            bVal = index >= 0 && index < b.length ? b[index] : b;
        } else {
            aVal = a;
            bVal = b;
        }

        const aValIsNum = isNumber(aVal);
        const bValIsNum = isNumber(bVal);

        if (aValIsNum && bValIsNum) {
            return aVal <= bVal ? -1 : 1;
        } else if (aValIsNum) {
            return -1;
        } else if (bValIsNum) {
            return 1;
        } else {
            const ab = [aVal, bVal];
            ab.sort();
            return ab.indexOf(aVal) <= ab.indexOf(bVal) ? -1 : 1;
        }
    };

    return list.sort(compare);
}

export function sum(list, callback) {
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

export function unique(list) {
    let item;
    const items = [];
    const itemsNotEquals = (itemUnique) => {
        return !objectEquals(item, itemUnique);
    };
    for (let i = 0, j = list.length; i < j; i++) {
        item = list[i];
        if (items.every(itemsNotEquals)) {
            items.push(item);
        }
    }
    return items;
}

export function unzip(list) {
    return zip.apply(null, list);
}

export function zip(list1, list2, ...otherLists) {
    const lists = [list1, list2].concat(otherLists);
    let listLength = 0;
    lists.forEach((item) => {
        listLength = listLength === 0 ? item.length : Math.min(listLength, item.length);
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

export default {
    all,
    any,
    clean,
    clone,
    contains,
    equals,
    flatten,
    index,
    insert,
    max,
    min,
    paginate,
    reduce,
    replace,
    remove,
    rotate,
    shuffle,
    sort,
    sum,
    unique,
    unzip,
    zip,
};
