/** global: ArrayUtil */
/** global: DateUtil */
/** global: FunctionUtil */
/** global: MathUtil */
/** global: ObjectUtil */
/** global: RandomUtil */
/** global: StringUtil */
/** global: TypeUtil */

ArrayUtil = {
    all(list) {
        return list.every((item) => {
            switch (TypeUtil.of(item)) {
                case TypeUtil.ARRAY:
                    return item.length > 0;
                case TypeUtil.OBJECT:
                    return ObjectUtil.length(item) > 0;
                default:
                    return Boolean(item);
            }
        });
    },

    any(list) {
        return list.some((item) => {
            switch (TypeUtil.of(item)) {
                case TypeUtil.ARRAY:
                    return item.length > 0;
                case TypeUtil.OBJECT:
                    return ObjectUtil.length(item) > 0;
                default:
                    return Boolean(item);
            }
        });
    },

    clean(list, hard) {
        let items = list.slice();
        items = items.filter((item) => {
            return !TypeUtil.isNone(item);
        });
        if (hard === true) {
            items = items
                .map((item) => {
                    let itemClean;
                    switch (TypeUtil.of(item)) {
                        case TypeUtil.ARRAY:
                            itemClean = ArrayUtil.clean(item, hard);
                            return itemClean.length > 0 ? itemClean : null;
                        case TypeUtil.OBJECT:
                            itemClean = ObjectUtil.clean(item, hard);
                            return ObjectUtil.length(itemClean) > 0 ? itemClean : null;
                        case TypeUtil.STRING:
                            itemClean = StringUtil.trim(item);
                            return itemClean !== '' ? item : null;
                        default:
                            return item;
                    }
                })
                .filter((item) => {
                    return !TypeUtil.isNone(item);
                });
        }
        return items;
    },

    clone(list) {
        const cln = list.slice();
        let val;
        for (let i = 0, j = cln.length; i < j; i++) {
            val = cln[i];
            switch (TypeUtil.of(val)) {
                case TypeUtil.ARRAY:
                    cln[i] = ArrayUtil.clone(val);
                    break;
                case TypeUtil.DATE:
                    cln[i] = DateUtil.clone(val);
                    break;
                case TypeUtil.OBJECT:
                    cln[i] = ObjectUtil.clone(val);
                    break;
                default:
                    break;
            }
        }
        return cln;
    },

    contains(list, value) {
        const values = [value].concat(FunctionUtil.args(arguments, 2));
        let val, valFound;

        for (let i = 0, j = values.length; i < j; i++) {
            val = values[i];
            valFound = false;
            for (let k = 0, m = list.length; k < m; k++) {
                if (ObjectUtil.equals(list[k], val)) {
                    valFound = true;
                }
            }
            if (!valFound) {
                return false;
            }
        }

        return true;
    },

    equals(listA, listB) {
        return ObjectUtil.equals(listA, listB);
    },

    flatten(list) {
        const items = [];
        for (let i = 0, j = list.length; i < j; i++) {
            if (TypeUtil.isArray(list[i])) {
                items.push(...ArrayUtil.flatten(list[i]));
            } else {
                items.push(list[i]);
            }
        }
        return items;
    },

    index(list, keys, flat) {
        const dict = {};
        let item;
        let key;
        let val;

        if (TypeUtil.isString(keys)) {
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
                    if (TypeUtil.isUndefined(dict[val])) {
                        dict[val] = [];
                    }
                    dict[val].push(item);
                }
            }
        }

        return dict;
    },

    insert(list, index, item) {
        list.splice(index, 0, item);
        return list;
    },

    max(list, callback) {
        return ArrayUtil.reduce(
            list,
            (a, b) => {
                if (TypeUtil.isFunction(callback)) {
                    return Math.max(a, callback(b));
                }
                return Math.max(a, b);
            },
            Number.MIN_VALUE
        );
    },

    min(list, callback) {
        return ArrayUtil.reduce(
            list,
            (a, b) => {
                if (TypeUtil.isFunction(callback)) {
                    return Math.min(a, callback(b));
                }
                return Math.min(a, b);
            },
            Number.MAX_VALUE
        );
    },

    paginate(list, itemsPerPage) {
        const itemsTotal = list.length;
        const pagesTotal = itemsPerPage > 0 ? Math.ceil(itemsTotal / itemsPerPage) : 0;
        const pages = [];
        let i, j;
        for (i = 0, j = 0; i < pagesTotal; i++) {
            j = i * itemsPerPage;
            pages[i] = list.slice(j, j + Math.min(itemsPerPage, itemsTotal));
        }
        return pages;
    },

    reduce(list, reducer, initialValue) {
        let value = TypeUtil.isUndefined(initialValue) ? 0 : initialValue;
        for (let i = 0, j = list.length; i < j; i++) {
            value = reducer(value, list[i], i, list);
        }
        return value;
    },

    replace(list, searchValue, replacementValue) {
        for (let i = 0, j = list.length; i < j; i++) {
            if (ObjectUtil.equals(list[i], searchValue)) {
                list[i] = replacementValue;
            }
        }
        return list;
    },

    remove(list, value) {
        const values = [value].concat(FunctionUtil.args(arguments, 2));
        for (let k = 0, m = values.length; k < m; k++) {
            for (let i = 0, j = list.length; i < j; i++) {
                if (ObjectUtil.equals(list[i], values[k])) {
                    list.splice(i, 1);
                    i--;
                    j--;
                }
            }
        }
        return list;
    },

    rotate(list, count) {
        const cursor = MathUtil.cycle(count, list.length);
        return list.slice(cursor).concat(list.slice(0, cursor));
    },

    shuffle(list) {
        const items = list.slice();
        let randomIndex;
        let randomItems;
        let sortedItems = list.length;
        while (sortedItems) {
            randomIndex = RandomUtil.integer(0, --sortedItems);
            randomItems = items.splice(randomIndex, 1);
            items.push(...randomItems);
        }
        return items;
    },

    sort(list, key) {
        const isArray = TypeUtil.isArray;
        const isObject = TypeUtil.isObject;
        const isNumber = TypeUtil.isNumber;
        const isString = TypeUtil.isString;

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
    },

    sum(list, callback) {
        return ArrayUtil.reduce(
            list,
            (a, b) => {
                if (TypeUtil.isFunction(callback)) {
                    return a + callback(b);
                }
                return a + b;
            },
            0
        );
    },

    unique(list) {
        let item;
        const items = [];
        const itemsNotEquals = (itemUnique) => {
            return !ObjectUtil.equals(item, itemUnique);
        };
        for (let i = 0, j = list.length; i < j; i++) {
            item = list[i];
            if (items.every(itemsNotEquals)) {
                items.push(item);
            }
        }
        return items;
    },

    unzip(list) {
        return ArrayUtil.zip.apply(null, list);
    },

    zip(list1, list2) {
        const lists = [list1, list2].concat(FunctionUtil.args(arguments, 2));
        let listLength = 0;
        lists.forEach((item) => {
            listLength =
                listLength === 0 ? item.length : Math.min(listLength, item.length);
        });
        const list = [];
        for (let i = 0; i < listLength; i++) {
            list[i] = [];
            for (let j = 0, k = lists.length; j < k; j++) {
                list[i][j] = lists[j][i];
            }
        }
        return list;
    },
};
