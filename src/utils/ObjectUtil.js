var ObjectUtil = {

    assign: function(obj, obj1, obj2, obj3)
    {
        var objs = FunctionUtil.args(arguments, 1);
        var i, j, k;
        for (i = 0, j = objs.length; i < j; i++) {
            for (k in objs[i]) {
                obj[k] = objs[i][k];
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
                        if (val.length === 0) {
                            val = null;
                        }
                        break;
                    case TypeUtil.OBJECT:
                        val = obj[key] = ObjectUtil.clean(val, hard);
                        if (ObjectUtil.length(val) === 0) {
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
                continue;
            }
        }
        return obj;
    },

    clone: function(obj)
    {
        var cln = {};
        var key, val;
        for (key in obj) {
            val = obj[key];
            switch (TypeUtil.of(val)) {
                case TypeUtil.ARRAY:
                    cln[key] = ArrayUtil.clone(val);
                    break;
                case TypeUtil.DATE:
                    cln[key] = DateUtil.clone(val);
                    break;
                case TypeUtil.OBJECT:
                    cln[key] = ObjectUtil.clone(val);
                    break;
                default:
                    cln[key] = obj[key];
                    break;
            }
        }
        return cln;
    },

    // decodeBase64: function(str)
    // {
    //     return JSONUtil.decode(Base64Util.decode(str));
    // },

    // decodeJSON: function(str)
    // {
    //     return JSONUtil.decode(str);
    // },

    // encodeBase64: function(obj)
    // {
    //     return Base64Util.encode(JSONUtil.encode(obj));
    // },

    // encodeJSON: function(obj)
    // {
    //     return JSONUtil.encode(obj);
    // },

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

        switch (type1) {
            case TypeUtil.ARRAY:
            case TypeUtil.OBJECT:
                break;
            case TypeUtil.NUMBER:
                return MathUtil.equals(obj1, obj2);
            default:
                return String(obj1) == String(obj2);
        }

        for (key in obj2) {
            if (!(key in obj1)) {
                return false;
            }
        }

        for (key in obj1) {
            val1 = obj1[key];
            val2 = obj2[key];

            if (Object.is(obj1, val1) || Object.is(obj2, val2) || Object.is(val1, val2) || val1 === val2) {
                continue;
            }

            if (!ObjectUtil.equals(val1, val2)) {
                return false;
            }
        }

        return true;
    },

    keypath: {

        get: function(obj, path, defaultValue)
        {
            var keys = path.split('.');
            var key;
            var cursor = obj;
            for (var i = 0, j = keys.length; i < j; i++) {
                key = keys[i];
                try {
                    cursor = cursor[key];
                } catch(e) {
                    return defaultValue;
                }
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
                if (!TypeUtil.isObject(cursor[key])) {
                    cursor[key] = {};
                }
                if (i < (j - 1)) {
                    cursor = cursor[key];
                } else {
                    cursor[key] = value;
                }
            }
        }
    },

    keys: function(obj, sorted)
    {
        var k = Object.keys(obj);
        if (sorted === true) {
            k.sort();
        }
        return k;
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
        var args = [{}].concat(FunctionUtil.args(arguments));
        var obj = ObjectUtil.assign.apply(null, args);
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