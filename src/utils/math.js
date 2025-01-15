import * as ArrayUtil from './array.js';
import * as FunctionUtil from './function.js';
import * as InterpolationUtil from './interpolation.js';
import * as TypeUtil from './type.js';

export default {
    average,
    constrain,
    cycle,
    equals,
    euclideanDistance,
    factorial,
    gcd,
    lcm,
    lerp,
    map,
    nearest,
    normalize,
    proportion,
    roundDecimals,
    roundToMultiple,
    roundToNearest,
    roundToPower,
    sign,
    summation,
};

export function average(values) {
    return summation(values) / values.length;
}

export function constrain(n, a, b) {
    return Math.min(Math.max(n, Math.min(a, b)), Math.max(a, b));
}

export function cycle(n, len, shift) {
    if (!TypeUtil.isNumber(shift)) {
        shift = 0;
    }
    return ((((n - shift) % len) + len) % len) + shift;
}

export function equals(a, b, tolerance) {
    if (!TypeUtil.isNumber(tolerance)) {
        tolerance = 0.0000000001;
    } else if (tolerance > 0.0) {
        tolerance += 0.0000000001;
    }
    return Math.abs(a - b) <= tolerance;
}

export function euclideanDistance(a, b) {
    // https://en.wikipedia.org/wiki/Euclidean_distance#Higher_dimensions
    return Math.sqrt(
        summation(
            a.map((value, index) => {
                return Math.abs(value - b[index]) ** 2;
            })
        )
    );
}

export function factorial(n) {
    let f = 1;
    for (let i = f; i <= n; i++) {
        f *= i;
    }
    return f;
}

export function gcd(a, b) {
    if (a === b) {
        return a;
    }
    if (a < b) {
        a ^= b;
        b ^= a;
        a ^= b;
    }
    return gcd(a - b, b);
}

const interpolation = InterpolationUtil;

export function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

export function lerp(a, b, t) {
    return InterpolationUtil.linear(a, b, t);
}

export function map(n, a, b, c, d) {
    return InterpolationUtil.linear(c, d, normalize(n, a, b));
}

export function nearest(n, a, b) {
    return Math.abs(n - a) <= Math.abs(n - b) ? a : b;
}

export function normalize(n, a, b) {
    return (n - a) / (b - a);
}

export function proportion(a, b, x, y) {
    const args = FunctionUtil.args(arguments);
    const argsOk = ArrayUtil.clean(args);
    if (argsOk.length !== 3) {
        return NaN;
    }

    // a : b = x : y
    if (!TypeUtil.isNumber(a)) {
        return (b * x) / y;
    } else if (!TypeUtil.isNumber(b)) {
        return (a * y) / x;
    } else if (!TypeUtil.isNumber(x)) {
        return (y * a) / b;
    } else if (!TypeUtil.isNumber(y)) {
        return (x * b) / a;
    }
    return NaN;
}

export function roundDecimals(n, decimalsPlaces) {
    return Number(n.toFixed(decimalsPlaces || 2));
}

export function roundToMultiple(n, multiplier) {
    return Math.round(n / multiplier) * multiplier;
}

export function roundToNearest(n, values) {
    const a = ArrayUtil.sort(values.concat());
    let i = 0,
        j = 0,
        k = a.length;
    if (k === 0) {
        return NaN;
    } else if (k > 2) {
        while (j < k) {
            i = Math.floor((j + k) / 2.0);
            if (n < a[i]) {
                k = i;
            } else if (n > a[i + 1]) {
                j = i + 1;
            } else {
                break;
            }
        }
    }
    j = i + 1 in a ? i + 1 : i;
    return nearest(n, a[i], a[j]);
}

export function roundToPower(n, base) {
    return base ** Math.round(Math.log(n) / Math.log(base));
}

export function sign(n) {
    return n >= 0.0 ? 1 : -1;
}

export function summation(values) {
    let s = 0.0;
    for (let i = 0, j = values.length; i < j; i++) {
        s += values[i];
    }
    return s;
}
