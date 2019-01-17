var ArrayUtil = {

    /**
     * Clean a list by removing values evaluated as 'none'.
     *
     * @memberof array
     * @param {Array} list - The list to clean.
     * @param {Boolean} [hard=false] - If true, also objects, arrays and strings evaluated as 'empty' will be removed.
     * @return {Array} - A new cleaned list.
     */
    clean: function(list, hard)
    {
        var items = list.slice();
        items = items.filter(function(item, index, arr) {
            return (!TypeUtil.isNone(item));
        });
        if (hard === true) {
            items = items.map(function(item, index, arr) {
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
            }).filter(function(item, index, arr) {
                return (!TypeUtil.isNone(item));
            });
        }
        return items;
    },

    /**
     * Creates a new list with same properties than original (deep clone).
     *
     * @memberof array
     * @param {Array} list - The list
     * @return {Array} - A new cloned list.
     */
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

    /**
     * Compares two lists and check if they are (deeply) equal.
     *
     * @memberof array
     * @param {Array} listA - The list a
     * @param {Array} listB - The list b
     * @return {Boolean} - true if the two lists are equal, false otherwise.
     */
    equals: function(listA, listB)
    {
        return ObjectUtil.equals(listA, listB);
    },

    /**
     * Flat a N-d list to be a 1-d list.
     *
     * @memberof array
     * @param {Array} list - The list
     * @return {Array} - A new flatten list.
     */
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

    /**
     * Creates a dictionary by indexing list value for the given keys.
     * List values must be key-value objects.
     * If flat is true, each dictionary key will be associated with one object and not a list of objects.
     *
     * @memberof array
     * @param {Object[]} list - The list
     * @param {String|String[]} keys - A key or an array of keys
     * @param {Boolean} [flat=false] - If true, each dictionary key will be associated with one object and not a list of objects.
     * @return {Object} - An indexed dictionary.
     */
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
                    if (dict[val] == undefined) {
                        dict[val] = [];
                    }
                    dict[val].push(item);
                }
            }
        }

        return dict;
    },

    /**
     * Creates a 2d list grouping list items every n-items.
     *
     * @memberof array
     * @param {Array} list - The list
     * @param {Number} itemsPerPage - The items per page
     * @return {Array} - A 2d list
     */
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
        var value = (initialValue === undefined ? 0 : initialValue);
        for (var i = 0, j = list.length; i < j; i++) {
            value = reducer(value, list[i], i, list);
        }
        return value;
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

    unique: function(list)
    {
        var items = [];
        var itemsNotEquals = function(itemUnique){
            return !ObjectUtil.equals(item, itemUnique);
        };
        var item;
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
        var lists = FunctionUtil.args(arguments);
        var listLength = 0;
        lists.forEach(function(item) {
            listLength = (listLength == 0 ? item.length : Math.min(listLength, item.length));
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