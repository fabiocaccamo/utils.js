/** global: FunctionUtil */
/** global: TypeUtil */

FunctionUtil = {

    args: function(argumentsObj, skipCount)
    {
        return [].slice.call(argumentsObj, (skipCount || 0));
    },

    attempt: function(func, scope)
    {
        try {
            var args = FunctionUtil.args(arguments, 2);
            var result = FunctionUtil.call.apply(null, [func, scope].concat(args));
            return result;
        }
        catch(e) {
            return e;
        }
    },

    bind: function(func, scope)
    {
        var args = FunctionUtil.args(arguments, 2);
        return function() {
            var result = FunctionUtil.call.apply(null, [func, scope].concat(args));
            return result;
        };
    },

    call: function(func, scope)
    {
        if (TypeUtil.isString(func)) {
            func = scope[func];
        }
        var args = FunctionUtil.args(arguments, 2);
        var result = func.apply(scope, args);
        return result;
    },

    debounce: function(milliseconds, func, scope)
    {
        var timeoutId;
        return function() {
            var args = arguments;
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            timeoutId = setTimeout(function() {
                func.apply(scope, args);
            }, milliseconds);
        };
    },

    delay: function(milliseconds, func, scope)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.bind.apply(null, [func, scope].concat(args));
        var timeoutId = setTimeout(wrapper, milliseconds);
        return {
            cancel: function() {
                clearTimeout(timeoutId);
            },
            func: wrapper,
            id: timeoutId
        };
    },

    memoize: function(func, scope)
    {
        var cache = {};

        return function()
        {
            var args = FunctionUtil.args(arguments);
            var key = String(args);
            if (!(key in cache)) {
                cache[key] = FunctionUtil.call.apply(null, [func, scope].concat(args));
            }
            return cache[key];
        };
    },

    noop: function()
    {
        return true;
    },

    repeat: function(milliseconds, func, scope)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.bind.apply(null, [func, scope].concat(args));
        var intervalId = setInterval(wrapper, milliseconds);
        return {
            cancel: function() {
                clearInterval(intervalId);
            },
            func: wrapper,
            id: intervalId
        };
    },

    throttle: function(milliseconds, func, scope)
    {
        var timeoutId;
        return function() {
            var args = arguments;
            if (timeoutId) {
                return;
            } else {
                func.apply(scope, args);
                timeoutId = setTimeout(function() {
                   clearTimeout(timeoutId);
                   timeoutId = null;
                }, milliseconds);
            }
        };
    },

    validate: function(argumentsObj)
    {
        // FunctionUtil.validate(arguments, 'number', 'string', ['string', 'undefined']);

        var args = FunctionUtil.args(argumentsObj);
        var types = FunctionUtil.args(arguments, 1);

        var i, j, k, n;

        for (i = 0, j = types.length; i < j; i++) {
            if (!TypeUtil.isArray(types[i])) {
                types[i] = [types[i]];
            }
        }

        var argsExpectedCount = types.length;
        while (argsExpectedCount > 0) {
            if (types[(argsExpectedCount - 1)].indexOf('undefined') === -1) {
                break;
            }
            argsExpectedCount--;
        }
        if (args.length < argsExpectedCount) {
            throw new TypeError('invalid arguments count: received ' + args.length + ', expected ' + argsExpectedCount + ' arguments.');
        }

        for (i = 0, j = types.length; i < j; i++) {
            for (k = 0, n = types[i].length; k < n; k++) {
                if (!TypeUtil.isType(types[i][k])) {
                    throw new TypeError('invalid argument: expected type "' + String(types[i][k]) + '" is not a valid type.');
                }
            }
        }

        var arg, argType, argTypes;
        for (i = 0, j = args.length; i < j; i++) {
            arg = args[i];
            argType = TypeUtil.of(arg);
            argTypes = types[Math.min(i, (types.length - 1))];
            if (argTypes.indexOf(argType) === -1) {
                throw new TypeError('invalid argument: type of argument[' + i + '] is "' + argType + '", expected "' + argTypes.join('" or "') + '".');
            }
        }
    }
};