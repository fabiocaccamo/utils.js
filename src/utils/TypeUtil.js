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

    isOk: function(val)
    {
        switch (TypeUtil.of(val)) {
            case 'array':
                return (val.length > 0);
            case 'boolean':
                return val;
            case 'number':
                return (val !== 0.0);
            case 'null':
                return false;
            case 'object':
                return (Objectutil.length(val) > 0);
            case 'string':
                return (StringUtil.strip(val) !== '');
            case 'undefined':
                return false;
            default:
                return Boolean(val);
        }
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

    isType: function(val)
    {
        switch (val) {
            case 'array':
            case 'boolean':
            case 'date':
            case 'error':
            case 'function':
            case 'number':
            case 'null':
            case 'object':
            case 'regexp':
            case 'string':
            case 'undefined':
            case 'xml':
                return true;
            default:
                return false;
        }
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