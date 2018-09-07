var ObjectUtil = {

    assign: function(obj)
    {
        // https://stackoverflow.com/questions/41746946/assign-to-object-passed-as-argument-in-es5
        // if (obj == null) {
        //     throw new TypeError('Cannot convert undefined or null to object');
        // }

        obj = Object(obj);

        var args = FunctionUtil.args(arguments);
        for (var i = 1, j = args.length; i < j; i++) {
            var source = args[i];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        obj[key] = source[key];
                    }
                }
            }
        }

        return obj;
    },

    clean: function(obj, hard)
    {
        var key, val;
        for (key in obj) {
            val = obj[key];
            if (hard === true) {
                switch (TypeUtil.of(val)) {
                    case TypeUtil.ARRAY:
                        val = obj[key] = ArrayUtil.clean(val, hard);
                        break;
                    case TypeUtil.OBJECT:
                        val = obj[key] = ObjectUtil.clean(val, hard);
                        break;
                }
                if (!TypeUtil.isSetAndNotEmpty(val)) {
                    val = null;
                }
            }
            if (TypeUtil.isNone(val)) {
                delete obj[key];
                continue;
            }
        }
        return obj;
    },

    clone: function(obj)
    {
        // TODO
        return null;
    },

    decodeBase64: function(str)
    {
        return JSONUtil.decode(Base64Util.decode(str));
    },

    decodeJSON: function(str)
    {
        return JSONUtil.decode(str);
    },

    encodeBase64: function(obj)
    {
        return Base64Util.encode(JSONUtil.encode(obj));
    },

    encodeJSON: function(obj)
    {
        return JSONUtil.encode(obj);
    },

    equals: function(obj1, obj2)
    {
        if (obj1 === obj2 || Object.is(obj1, obj2)) {
            return true;
        }

        var key, val1, val2, type1, type2;

        type1 = TypeUtil.of(obj1);
        type2 = TypeUtil.of(obj2);

        if (type1 !== type2) {
            return false;
        }

        if (type1 !== 'array' && type1 !== 'object') {
            return String(obj1) == String(obj2);
        }

        for (key in obj2)
        {
            if (!(key in obj1)) {
                return false;
            }
        }

        for (key in obj1)
        {
            val1 = obj1[key];
            val2 = obj2[key];

            if (Object.is(obj1, val1) || Object.is(obj2, val2) || Object.is(val1, val2) || val1 === val2) {
                continue;
            }

            if (String(val1) != String(val2)) {
                return false;
            }

            type1 = TypeUtil.of(val1);
            type2 = TypeUtil.of(val2);

            if (type1 !== type2) {
                return false;
            }

            if (type1 === 'array' || type1 === 'object') {
                if (!ObjectUtil.equals(val1, val2)) {
                    return false;
                }
            }
        }

        return true;
    },

    keys: function(obj, sorted)
    {
        var k = Object.keys(obj);
        if (sorted === true) {
            k.sort();
        }
        return k;
    },

    keypath: {

        get: function(obj, path, defaultValue)
        {
            var keys = path.split('.');
            var key;
            var cursor = obj;
            for (var i = 0, j = keys.length; i < j; i++) {
                key = keys[i];
                cursor = cursor[key];
            }
            return ((cursor !== undefined) ? cursor : defaultValue);
        },

        set: function(obj, path, value)
        {
            var keys = path.split('.');
            var key;
            var cursor = obj;
            for (var i = 0, j = keys.length; i < j; i++) {
                key = keys[i];
                if (i < (j - 1)) {
                    cursor[key] = (cursor[key] || {});
                } else {
                    cursor[key] = value;
                }
                cursor = cursor[key];
            }
        }
    },

    length: function(obj)
    {
        return ObjectUtil.keys(obj).length;
    },

    map: function(obj, func)
    {
        var m = {};
        ObjectUtil.keys(obj).forEach(function(k) {
            m[k] = func.call(null, obj[k], k, obj);
        });
        return m;
    },

    merge: function(obj1, obj2, obj3)
    {
        var obj = {};
        var objs = FunctionUtil.args(arguments);
        var i, j, k;
        for (i = 0, j = objs.length; i < j; i++) {
            for (k in objs[i]) {
                obj[k] = objs[i][k];
            }
        }
        return obj;
    },

    values: function(obj, sorted)
    {
        var keys = ObjectUtil.keys(obj, sorted);
        var vals = [];
        for (var i = 0, j = keys.length; i < j; i++) {
            vals.push(obj[keys[i]]);
        }
        return vals;
    }

};