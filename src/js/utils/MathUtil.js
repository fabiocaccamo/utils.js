var MathUtil = {

    average: function(values)
    {
        return (MathUtil.summation(values) / values.length);
    },

    avg: function(values)
    {
        return MathUtil.average(values);
    },

    constrain: function(n, a, b)
    {
        return Math.min(Math.max(n, Math.min(a, b)), Math.max(a, b));
    },

    cycle: function(n, cycleLength)
    {
        return (((n % cycleLength) + cycleLength) % cycleLength);
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
        if (a == b) {
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
        return MathUtil.lerp(c, d, MathUtil.normalize(n, a, b));
    },

    nearest: function(n, a, b)
    {
        return (Math.abs(n - a) <= Math.abs(n - b) ? a : b);
    },

    normalize: function(n, a, b)
    {
        return MathUtil.constrain((n - a) / (b - a), 0.0, 1.0);
    },

    proportion: function(a, b, x, y)
    {
        //a : b = x : y
        if (isNaN(a)) {
            return ((b * x) / y);
        }
        else if (isNaN(b)) {
            return ((a * y) / x);
        }
        else if (isNaN(x)) {
            return ((y * a) / b);
        }
        else if (isNaN(y)) {
            return ((x * b) / a);
        }
        return Number.NaN;
    },

    roundDecimals: function(n, decimalsPlaces)
    {
        return Number(n.toFixed((decimalsPlaces || 2)));
    },

    roundToMultiple: function(n, multiplier)
    {
        return (Math.round(n / multiplier) * multiplier);
    },

    roundToNearest: function(n, values, returnIndex)
    {
        var a = ArrayUtil.sortNumerically(values.concat());
        var f = MathUtil.nearest;
        var i, j, k = a.length;

        if (k == 0) {
            return Number.NaN;
        }
        else if (k == 1) {
            return a[0];
        }
        else if (k == 2) {
            return f(n, a[0], a[1]);
        }
        else if (k > 2) {
            i = 0;
            j = (k - 1);
            while (j < k) {
                i = int((j + k) / 2.0);

                if (n < a[i]) {
                    k = i;
                }
                else if (n > a[(i + 1)]) {
                    j = (i + 1);
                }
                else {
                    break;
                }
            }
            j = Math.min((i + 1), (a.length - 1));
            return f(n, a[i], a[j]);
        }
    },

    roundToPower: function(n, base)
    {
        return MathUtil.power(base, Math.ceil(Math.log(n) / Math.log(base)));
    },

    sign: function(n)
    {
        return (n >= 0.0 ? 1 : -1);
    },

    summation: function(values)
    {
        var s = 0.0;
        for (i = 0, j = values.length; i < j; i++) {
            s += values[i];
        }
        return s;
    }

};