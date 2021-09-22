/** global: ArrayUtil */
/** global: FunctionUtil */
/** global: InterpolationUtil */
/** global: MathUtil */
/** global: TypeUtil */

MathUtil = {

    average: function(values)
    {
        return (MathUtil.summation(values) / values.length);
    },

    constrain: function(n, a, b)
    {
        return Math.min(Math.max(n, Math.min(a, b)), Math.max(a, b));
    },

    cycle: function(n, len, shift)
    {
        if (!TypeUtil.isNumber(shift)) {
            shift = 0;
        }
        return (((((n - shift) % len) + len) % len) + shift);
    },

    equals: function(a, b, tolerance)
    {
        if (!TypeUtil.isNumber(tolerance)) {
            tolerance = 0.0000000001;
        } else if (tolerance > 0.0) {
            tolerance += 0.0000000001;
        }
        return (Math.abs(a - b) <= tolerance);
    },

    euclideanDistance: function(a, b) {
        // https://en.wikipedia.org/wiki/Euclidean_distance#Higher_dimensions
        return Math.sqrt(MathUtil.summation(a.map(function(value, index) {
            return Math.pow(Math.abs(value - b[index]), 2);
        })));
    },

    factorial: function(n)
    {
        var f = 1;
        for (var i = f; i <= n; i++) {
            f *= i;
        }
        return f;
    },

    gcd: function(a, b)
    {
        if (a === b) {
            return a;
        }
        if (a < b) {
            a ^= b;
            b ^= a;
            a ^= b;
        }
        return MathUtil.gcd((a - b), b);
    },

    interpolation: InterpolationUtil,

    lcm: function(a, b)
    {
        return (a * b / (MathUtil.gcd(a, b)));
    },

    lerp: function(a, b, t)
    {
        return InterpolationUtil.linear(a, b, t);
    },

    map: function(n, a, b, c, d)
    {
        return InterpolationUtil.linear(c, d, MathUtil.normalize(n, a, b));
    },

    nearest: function(n, a, b)
    {
        return (Math.abs(n - a) <= Math.abs(n - b) ? a : b);
    },

    normalize: function(n, a, b)
    {
        return ((n - a) / (b - a));
    },

    proportion: function(a, b, x, y)
    {
        var args = FunctionUtil.args(arguments);
        var argsOk = ArrayUtil.clean(args);
        if (argsOk.length !== 3) {
            return NaN;
        }

        // a : b = x : y
        if (!TypeUtil.isNumber(a)) {
            return ((b * x) / y);
        }
        else if (!TypeUtil.isNumber(b)) {
            return ((a * y) / x);
        }
        else if (!TypeUtil.isNumber(x)) {
            return ((y * a) / b);
        }
        else if (!TypeUtil.isNumber(y)) {
            return ((x * b) / a);
        }
        return NaN;
    },

    roundDecimals: function(n, decimalsPlaces)
    {
        return Number(n.toFixed((decimalsPlaces || 2)));
    },

    roundToMultiple: function(n, multiplier)
    {
        return (Math.round(n / multiplier) * multiplier);
    },

    roundToNearest: function(n, values)
    {
        var a = ArrayUtil.sort(values.concat());
        var i = 0, j = 0, k = a.length;
        if (k === 0) {
            return NaN;
        }
        else if (k > 2) {
            while(j < k) {
                i = Math.floor((j + k) / 2.0);
                if (n < a[i]) {
                    k = i;
                } else if (n > a[(i + 1)]) {
                    j = (i + 1);
                } else {
                    break;
                }
            }
        }
        j = ((i + 1) in a ? (i + 1) : i);
        return MathUtil.nearest(n, a[i], a[j]);
    },

    roundToPower: function(n, base)
    {
        return Math.pow(base, Math.round(Math.log(n) / Math.log(base)));
    },

    sign: function(n)
    {
        return (n >= 0.0 ? 1 : -1);
    },

    summation: function(values)
    {
        var s = 0.0;
        for (var i = 0, j = values.length; i < j; i++) {
            s += values[i];
        }
        return s;
    }

};