var ArrayUtil = {

    clean: function(list, hard)
    {
        list = list.filter(function(el, index, arr){
            return (!TypeUtil.isNone(el));
        });
        if (hard === true) {
            list = list.map(function(el, index, arr) {
                switch (TypeUtil.of(el)) {
                    case TypeUtil.ARRAY:
                        return ArrayUtil.clean(el, hard);
                    case TypeUtil.OBJECT:
                        return ObjectUtil.clean(el, hard);
                    default:
                        return el;
                }
            }).filter(function(el, index, arr){
                return TypeUtil.isSetAndNotEmpty(el);
            });
        }
        return list;
    },

    equals: function(listA, listB)
    {
        return ObjectUtil.equals(listA, listB);
    },

    flatten: function(list)
    {
        var listNew = [];
        for (var i = 0, j = list.length; i < j; i++) {
            if (TypeUtil.isArray(list[i])) {
                listNew.push.apply(listNew, ArrayUtil.flatten(list[i]));
            } else {
                listNew.push(list[i]);
            }
        }
        return listNew;
    },

    index: function(list, keys, flat)
    {
        var dict = {}, item, key, val;

        if (TypeUtil.isString(keys)) {
            keys = [keys];
        }

        for(var i = 0, j = list.length; i < j; i++)
        {
            item = list[i];

            for(var m = 0, n = keys.length; m < n; m++ )
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

    mask: function(list, index, itemsLeft, itemsRight)
    {
        // TODO
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

    shuffle: function(list)
    {
        var listNew = list.slice();
        var randomIndex;
        var randomItems;
        var sortedItems = list.length;
        while (sortedItems) {
            randomIndex = RandomUtil.integer(0, --sortedItems);
            randomItems = listNew.splice(randomIndex, 1);
            listNew.push.apply(listNew, randomItems);
        }
        return listNew;
    },

    sortNumerically: function(list)
    {
        var compare = function(a, b)
        {
            return (a - b);
        }

        return list.sort(compare);
    },

    sortOn: function(list, key)
    {
        var compare = function(a, b)
        {
            if (a[key] < b[key]){
                return -1;
            }
            else if (a[key] > b[key]){
                return 1;
            }
            else {
                return 0;
            }
        }

        return list.sort(compare);
    },

    unique: function(list)
    {
        var listNew = [];
        var item;
        for (var i = 0, j = list.length; i < j; i++) {
            item = list[i];
            if (listNew.indexOf(item) == -1) {
                listNew.push(item);
            }
        }
        return listNew;
    },

    unzip: function(list)
    {
        // TODO
    },

    zip: function(list)
    {
        // TODO
    }
};