var TypeUtil = {

    isArray: function(val)
    {
        // https://stackoverflow.com/questions/4775722/check-if-object-is-array
        if (Array.isArray) {
            return Array.isArray(val);
        }
        return (Object.prototype.toString.call(val) === '[object Array]');
    },

    isBase64: function(val)
    {
        if (TypeUtil.isString(val)) {
            try {
                Base64Util.decode(val);
                return true;
            }
            catch(e){
            }
        }
        return false;
    },

    isBoolean: function(val)
    {
        return (typeof(val) === 'boolean');
    },

    isDate: function(val)
    {
        return (Object.prototype.toString.call(val) === '[object Date]');
    },

    isError: function(val)
    {
        return (val instanceof Error);
    },

    isFunction: function(val)
    {
        return (typeof(val) === 'function');
    },

    isJSON: function(val)
    {
        if (TypeUtil.isString(val)) {
            try {
                JSONUtil.decode(val);
                return true;
            }
            catch(e){
            }
        }
        return false;
    },

    isObject: function(val)
    {
        return (typeof(val) === 'object');
    },

    isNumber: function(val)
    {
        return (typeof(val) === 'number' && !isNaN(val) && isFinite(val));
    },

    isNull: function(val)
    {
        return (val === null);
    },

    isRegExp: function(val)
    {
        return (val instanceof RegExp);
    },

    isString: function(val)
    {
        return (typeof(val) === 'string');
    },

    isUndefined: function(val)
    {
        return (typeof(val) === 'undefined');
    },

    isXML: function(val)
    {
        // TODO
        return false;
    },

    of: function(val)
    {
        if (TypeUtil.isArray(val)) {
            return 'array';
        }
        else if (TypeUtil.isBoolean(val)) {
            return 'boolean';
        }
        else if (TypeUtil.isDate(val)) {
            return 'date';
        }
        else if (TypeUtil.isError(val)) {
            return 'error';
        }
        else if (TypeUtil.isFunction(val)) {
            return 'function';
        }
        else if (TypeUtil.isNumber(val)) {
            return 'number';
        }
        else if (TypeUtil.isNull(val)) {
            return 'null';
        }
        else if (TypeUtil.isObject(val)) {
            return 'object';
        }
        else if (TypeUtil.isRegExp(val)) {
            return 'regexp';
        }
        else if (TypeUtil.isString(val)) {
            return 'string';
        }
        else if (TypeUtil.isUndefined(val)) {
            return 'undefined';
        }
        else if (TypeUtil.isXML(val)) {
            return 'xml';
        }
        else {
            return 'unknown';
        }
    }

};