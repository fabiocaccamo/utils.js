var FunctionUtil = {

    args: function(argumentObj, sliceIndex)
    {
        return [].slice.call(argumentObj, (sliceIndex || 0));
    },

    bind: function(scope, func)
    {
        var args = FunctionUtil.args(arguments, 2);
        return FunctionUtil.wrap(scope, func, args);
    },

    call: function(scope, func)
    {
        if (typeof(func) === 'function') {
            return null;
        }

        var args = FunctionUtil.args(arguments, 2);
        var value = func.apply(scope, args);
        return value;
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

    wrap: function(scope, func, args)
    {
        return function(){
            func.apply(scope, args);
        };
    }
};