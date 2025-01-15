/** global: FunctionUtil */
/** global: TypeUtil */

FunctionUtil = {
    args(argumentsObj, skipCount) {
        return [].slice.call(argumentsObj, skipCount || 0);
    },

    attempt(func, scope) {
        try {
            const args = FunctionUtil.args(arguments);
            const result = FunctionUtil.call.apply(null, args);
            return result;
        } catch (e) {
            return e;
        }
    },

    bind(func, scope) {
        const argsBinded = FunctionUtil.args(arguments);
        return function () {
            const args = FunctionUtil.args(arguments);
            const result = FunctionUtil.call.apply(null, argsBinded.concat(args));
            return result;
        };
    },

    call(func, scope) {
        if (TypeUtil.isString(func)) {
            func = scope[func];
        }
        const args = FunctionUtil.args(arguments, 2);
        const result = func.apply(scope, args);
        return result;
    },

    debounce(milliseconds, func, scope) {
        let timeoutId;
        return function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            const args = arguments;
            timeoutId = setTimeout(() => {
                func.apply(scope, args);
            }, milliseconds);
        };
        /*
        var timeoutId;
        return function() {
            if (timeoutId) {
                timeoutId.cancel();
                timeoutId = null;
            }
            timeoutId = FunctionUtil.delay.apply(null, [milliseconds, func, scope].concat(arguments));
        };
        */
    },

    delay(milliseconds, func, scope) {
        const args = FunctionUtil.args(arguments, 1);
        const wrapper = FunctionUtil.bind.apply(null, args);
        const timeoutId = setTimeout(wrapper, milliseconds);
        return {
            cancel() {
                clearTimeout(timeoutId);
            },
            func: wrapper,
            id: timeoutId,
        };
    },

    memoize(func, scope) {
        const cache = {};

        return function () {
            const args = FunctionUtil.args(arguments);
            const key = String(args);
            if (!(key in cache)) {
                cache[key] = FunctionUtil.call.apply(null, [func, scope].concat(args));
            }
            return cache[key];
        };
    },

    noop() {
        return true;
    },

    repeat(milliseconds, func, scope) {
        const args = FunctionUtil.args(arguments, 1);
        const wrapper = FunctionUtil.bind.apply(null, args);
        const intervalId = setInterval(wrapper, milliseconds);
        return {
            cancel() {
                clearInterval(intervalId);
            },
            func: wrapper,
            id: intervalId,
        };
    },

    throttle(milliseconds, func, scope) {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                return;
            }
            func.apply(scope, args);
            timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                timeoutId = null;
            }, milliseconds);
        };
    },

    until(milliseconds, func, scope) {
        const args = FunctionUtil.args(arguments, 1);
        const wrapper = FunctionUtil.bind.apply(null, args);
        const interval = FunctionUtil.repeat(milliseconds, () => {
            if (wrapper() === false) {
                interval.cancel();
            }
        });
        return interval;
    },

    validate(argumentsObj) {
        // FunctionUtil.validate(arguments, 'number', 'string', ['string', 'undefined']);

        const args = FunctionUtil.args(argumentsObj);
        const types = FunctionUtil.args(arguments, 1);

        let i, j, k, n;

        for (i = 0, j = types.length; i < j; i++) {
            if (!TypeUtil.isArray(types[i])) {
                types[i] = [types[i]];
            }
        }

        let argsExpectedCount = types.length;
        while (argsExpectedCount > 0) {
            if (!types[argsExpectedCount - 1].includes('undefined')) {
                break;
            }
            argsExpectedCount--;
        }
        if (args.length < argsExpectedCount) {
            // prettier-ignore
            throw new TypeError(`invalid arguments count: received ${args.length}, expected ${argsExpectedCount} arguments.`);
        }

        for (i = 0, j = types.length; i < j; i++) {
            for (k = 0, n = types[i].length; k < n; k++) {
                if (!TypeUtil.isType(types[i][k])) {
                    // prettier-ignore
                    throw new TypeError(`invalid argument: expected type "${String(types[i][k])}" is not a valid type.`);
                }
            }
        }

        let arg, argType, argTypes;
        for (i = 0, j = args.length; i < j; i++) {
            arg = args[i];
            argType = TypeUtil.of(arg);
            argTypes = types[Math.min(i, types.length - 1)];
            if (!argTypes.includes(argType)) {
                // prettier-ignore
                throw new TypeError(`invalid argument: type of argument[${i}] is "${argType}", expected "${argTypes.join('" or "')}".`);
            }
        }
    },
};
