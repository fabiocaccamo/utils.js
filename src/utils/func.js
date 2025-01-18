import TypeUtil from './type.js';

function args(argumentsObj, skipCount = 0) {
    return Array.prototype.slice.call(argumentsObj, skipCount);
}

function attempt(func, scope, ...args) {
    try {
        const result = call(func, scope, ...args);
        return result;
    } catch (e) {
        return e;
    }
}

function bind(func, scope, ...argsBinded) {
    return (...args) => {
        const result = call(func, scope, ...argsBinded.concat(args));
        return result;
    };
}

function call(func, scope, ...args) {
    if (TypeUtil.isString(func)) {
        func = scope[func];
    }
    return func.apply(scope, args);
}

function debounce(milliseconds, func, scope) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            func.apply(scope, args);
        }, milliseconds);
    };
}

function delay(milliseconds, func, scope, ...args) {
    const wrapper = bind(func, scope, ...args);
    const timeoutId = setTimeout(wrapper, milliseconds);
    return {
        cancel() {
            clearTimeout(timeoutId);
        },
        func: wrapper,
        id: timeoutId,
    };
}

function memoize(func, scope) {
    const cache = {};

    return function (...args) {
        const key = String(args);
        if (!(key in cache)) {
            cache[key] = call(func, scope, ...args);
        }
        return cache[key];
    };
}

function noop() {
    return true;
}

function repeat(milliseconds, func, scope, ...args) {
    const wrapper = bind(func, scope, ...args);
    const intervalId = setInterval(wrapper, milliseconds);
    return {
        cancel() {
            clearInterval(intervalId);
        },
        func: wrapper,
        id: intervalId,
    };
}

function throttle(milliseconds, func, scope) {
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
}

function until(milliseconds, func, scope, ...args) {
    const wrapper = bind(func, scope, ...args);
    const interval = repeat(milliseconds, () => {
        if (wrapper() === false) {
            interval.cancel();
        }
    });
    return interval;
}

function validate(argumentsObj, ...types) {
    // validate(arguments, 'number', 'string', ['string', 'undefined']);

    const argsList = args(argumentsObj);
    types = types.map((type) => (Array.isArray(type) ? type : [type]));

    let argsExpectedCount = types.length;
    while (argsExpectedCount > 0) {
        if (!types[argsExpectedCount - 1].includes('undefined')) {
            break;
        }
        argsExpectedCount--;
    }

    if (argsList.length < argsExpectedCount) {
        throw new TypeError(
            `invalid arguments count: received ${argsList.length}, expected ${argsExpectedCount} arguments.`
        );
    }

    for (let i = 0; i < types.length; i++) {
        for (const type of types[i]) {
            if (!TypeUtil.isType(type)) {
                throw new TypeError(
                    `invalid argument: expected type "${type}" is not a valid type.`
                );
            }
        }
    }

    argsList.forEach((arg, i) => {
        const argType = TypeUtil.of(arg);
        const argTypes = types[Math.min(i, types.length - 1)];
        if (!argTypes.includes(argType)) {
            throw new TypeError(
                `invalid argument: type of argument[${i}] is "${argType}", expected "${argTypes.join('" or "')}".`
            );
        }
    });
}

export default {
    args,
    attempt,
    bind,
    call,
    debounce,
    delay,
    memoize,
    noop,
    repeat,
    throttle,
    until,
    validate,
};
