var ArrayUtil = {

    clean: function(list)
    {
        return list.filter(function(val){
            return !(Object.is(val, undefined) || Object.is(val, null) || Object.is(val, NaN));
        });
    },

    flatten: function(list)
    {
        var listNew = [];
        for (var i = 0, j = list.length; i < j; i++) {
            listNew.push.apply(null, (TypeUtil.isArray(list[i]) ? list[i] : [list[i]]));
        }
        return listNew;
    },

    index: function(list, keys, flat)
    {
        var dict = {}, item, key, val;

        if (typeof(keys) === 'string') {
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
        var pagesTotal = Math.ceil(itemsTotal / itemsPerPage);
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
        var listNew = list.concat();
        var randomIndex;
        var randomItems;
        var length = list.length;
        while (length) {
            // randomIndex = Math.floor(Math.random() * (length--));
            randomIndex = RandomUtil.integer(0, --length);
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