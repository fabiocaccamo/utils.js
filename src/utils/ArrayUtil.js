/** global: ArrayUtil */
/** global: DateUtil */
/** global: FunctionUtil */
/** global: MathUtil */
/** global: ObjectUtil */
/** global: RandomUtil */
/** global: StringUtil */
/** global: TypeUtil */

ArrayUtil = {

    clean: function(list, hard)
    {
        var items = list.slice();
        items = items.filter(function(item) {
            return (!TypeUtil.isNone(item));
        });
        if (hard === true) {
            items = items.map(function(item) {
                var itemClean;
                switch (TypeUtil.of(item)) {
                    case TypeUtil.ARRAY:
                        itemClean = ArrayUtil.clean(item, hard);
                        return (itemClean.length > 0 ? itemClean : null);
                    case TypeUtil.OBJECT:
                        itemClean = ObjectUtil.clean(item, hard);
                        return (ObjectUtil.length(itemClean) > 0 ? itemClean : null);
                    case TypeUtil.STRING:
                        itemClean = StringUtil.trim(item);
                        return (itemClean !== '' ? item : null);
                    default:
                        return item;
                }
            }).filter(function(item) {
                return (!TypeUtil.isNone(item));
            });
        }
        return items;
    },

    clone: function(list)
    {
        var cln = list.slice();
        var val;
        for (var i = 0, j = cln.length; i < j; i++) {
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

    contains: function(list, value)
    {
        var values = [value].concat(FunctionUtil.args(arguments, 2));
        var val, valFound;

        for (var i = 0, j = values.length; i < j; i++) {
            val = values[i];
            valFound = false;
            for (var k = 0, m = list.length; k < m; k++) {
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

    equals: function(listA, listB)
    {
        return ObjectUtil.equals(listA, listB);
    },

    flatten: function(list)
    {
        var items = [];
        for (var i = 0, j = list.length; i < j; i++) {
            if (TypeUtil.isArray(list[i])) {
                items.push.apply(items, ArrayUtil.flatten(list[i]));
            } else {
                items.push(list[i]);
            }
        }
        return items;
    },

    index: function(list, keys, flat)
    {
        var dict = {}, item, key, val;

        if (TypeUtil.isString(keys)) {
            keys = [keys];
        }

        for (var i = 0, j = list.length; i < j; i++)
        {
            item = list[i];

            for (var m = 0, n = keys.length; m < n; m++ )
            {
                key = String(keys[m]);
                val = String(item[key]);

                if (flat === true) {
                    dict[val] = item;
                }
                else {
                    if (TypeUtil.isUndefined(dict[val])) {
                        dict[val] = [];
                    }
                    dict[val].push(item);
                }
            }
        }

        return dict;
    },

    insert: function(list, index, item)
    {
        list.splice(index, 0, item);
        return list;
    },

    paginate: function(list, itemsPerPage)
    {
        var itemsTotal = list.length;
        var pagesTotal = (itemsPerPage > 0 ? Math.ceil(itemsTotal / itemsPerPage) : 0);
        var pages = [];
        var i, j;
        for (i = 0, j = 0; i < pagesTotal; i++) {
            j = (i * itemsPerPage);
            pages[i] = list.slice(j, j + Math.min(itemsPerPage, itemsTotal));
        }
        return pages;
    },

    reduce: function(list, reducer, initialValue)
    {
        var value = (TypeUtil.isUndefined(initialValue) ? 0 : initialValue);
        for (var i = 0, j = list.length; i < j; i++) {
            value = reducer(value, list[i], i, list);
        }
        return value;
    },

    replace: function(list, searchValue, replacementValue)
    {
        for (var i = 0, j = list.length; i < j; i++) {
            if (ObjectUtil.equals(list[i], searchValue)) {
                list[i] = replacementValue;
            }
        }
        return list;
    },

    remove: function(list, value)
    {
        var values = [value].concat(FunctionUtil.args(arguments, 2));
        for (var k = 0, m = values.length; k < m; k++) {
            for (var i = 0, j = list.length; i < j; i++) {
                if (ObjectUtil.equals(list[i], values[k])) {
                    list.splice(i, 1);
                    i--;
                    j--;
                }
            }
        }
        return list;
    },

    rotate: function(list, count)
    {
        var cursor = MathUtil.cycle(count, list.length);
        return list.slice(cursor).concat(list.slice(0, cursor));
    },

    shuffle: function(list)
    {
        var items = list.slice();
        var randomIndex;
        var randomItems;
        var sortedItems = list.length;
        while (sortedItems) {
            randomIndex = RandomUtil.integer(0, --sortedItems);
            randomItems = items.splice(randomIndex, 1);
            items.push.apply(items, randomItems);
        }
        return items;
    },

    sort: function(list, key)
    {
        var compare = function(a, b)
        {
            var aVal;
            var bVal;

            if (TypeUtil.isString(key)) {
                aVal = (key in a ? a[key] : a);
                bVal = (key in b ? b[key] : b);
            } else {
                aVal = a;
                bVal = b;
            }

            var aValIsNum = TypeUtil.isNumber(aVal);
            var bValIsNum = TypeUtil.isNumber(bVal);

            if (aValIsNum && bValIsNum) {
                return (aVal <= bVal ? -1 : 1);
            }
            else if (aValIsNum) {
                return -1;
            }
            else if (bValIsNum) {
                return 1;
            }
            else {
                var ab = [aVal, bVal];
                ab.sort();
                return (ab.indexOf(aVal) <= ab.indexOf(bVal) ? -1 : 1);
            }
        };

        return list.sort(compare);
    },

    sum: function(list) {
        return ArrayUtil.reduce(list, function(a, b) {
            return (a + b);
        }, 0);
    },

    unique: function(list)
    {
        var item;
        var items = [];
        var itemsNotEquals = function(itemUnique){
            return !ObjectUtil.equals(item, itemUnique);
        };
        for (var i = 0, j = list.length; i < j; i++) {
            item = list[i];
            if (items.every(itemsNotEquals)) {
                items.push(item);
            }
        }
        return items;
    },

    unzip: function(list)
    {
        return ArrayUtil.zip.apply(null, list);
    },

    zip: function(list1, list2)
    {
        var lists = [list1, list2].concat(FunctionUtil.args(arguments, 2));
        var listLength = 0;
        lists.forEach(function(item) {
            listLength = (listLength === 0 ? item.length : Math.min(listLength, item.length));
        });
        var list = [];
        for (var i = 0; i < listLength; i++) {
            list[i] = [];
            for (var j = 0, k = lists.length; j < k; j++) {
                list[i][j] = lists[j][i];
            }
        }
        return list;
    }

};