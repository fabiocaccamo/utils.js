var FunctionUtil = {

    args: function(argumentObj, sliceIndex)
    {
        return [].slice.call(argumentObj, (sliceIndex || 0));
    },

    attempt: function(scope, funcName)
    {
        try {
            var func = scope[funcName];
            var args = FunctionUtil.args(arguments, 2);
            var result = func.apply(scope, args);
            return result;
        }
        catch(e) {
        }
    },

    bind: function(scope, func)
    {
        var args = FunctionUtil.args(arguments, 2);
        return FunctionUtil.wrap(scope, func, args);
    },

    call: function(scope, func)
    {
        var args = FunctionUtil.args(arguments, 2);
        var result = func.apply(scope, args);
        return result;
    },

    delay: function(scope, func, milliseconds)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.wrap(scope, func, args);
        var timeoutID = setTimeout(wrapper, milliseconds);
        return {
            cancel: function() {
                clearTimeout(timeoutID);
            },
            f: wrapper,
            id: timeoutID
        };
    },

    memoize: function(scope, func)
    {
        var cache = {};

        return function()
        {
            var args = FunctionUtil.args(arguments, 0);
            var key = String(args);
            if(!(key in cache)){
                cache[key] = func.apply(scope, args);
            }
            return cache[key];
        };
    },

    noop: function()
    {
    },

    repeat: function(scope, func, milliseconds)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.wrap(scope, func, args);
        var intervalID = setInterval(wrapper, milliseconds);
        return {
            cancel: function() {
                clearInterval(intervalID);
            },
            f: wrapper,
            id: timeoutID
        };
    },

    validate: function(args, arg0Types, arg1Types, arg2Types)
    {
        console.log(typeof(arguments));

        // FunctionUtil.validate(arguments, 'number', 'string', ['string', 'undefined']);

        var args = FunctionUtil.args(args);
        var types = FunctionUtil.args(arguments, 1);

        if (args.length < types.length) {
            throw new TypeError('invalid arguments length: received ' + args.length + ', expected ' + types.length + ' arguments.');
        }

        var i, j, k, n;

        for (i = 0, j = types.length; i < j; i++) {
            if (!TypeUtil.isArray(types[i])) {
                types[i] = [types[i]];
            }
            for (k = 0, n = types[i].length; k < n; k++) {
                if (!TypeUtil.isType(types[i][k])) {
                    throw new TypeError('invalid argument: type validator "' + String(types[i][k]) + '" is not a valid type.');
                }
            }
        }

        var arg, argType, argTypes;

        for (i = 0, j = args.length; i < j; i++) {
            arg = args[i];
            argType = TypeUtil.of(args[i]);
            argTypes = types[Math.min(i, (types.length - 1))];
            if (argTypes.indexOf(argType) == -1) {
                throw new TypeError('invalid argument: type of argument[' + i + '] is "' + argType + '", expected "' + argTypes.join('" or "') + '".');
            }
        }
    },

    wrap: function(scope, func, args)
    {
        return function(){
            func.apply(scope, args);
        };
    }
};