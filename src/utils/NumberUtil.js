/** global: NumberUtil */

NumberUtil = {
    isBetween: function (n, min, max) {
        return n >= min && n <= max;
    },

    isEven: function (n) {
        return n % 2.0 === 0.0 && !NumberUtil.isFloat(n);
    },

    isFloat: function (n) {
        return n % 1 !== 0;
    },

    isNegative: function (n) {
        return n < 0.0;
    },

    isOdd: function (n) {
        return n % 2.0 !== 0.0 && !NumberUtil.isFloat(n);
    },

    isPositive: function (n) {
        return n >= 0.0;
    },

    isPrime: function (n) {
        if (typeof n !== 'number' || Number.isNaN(n) || NumberUtil.isFloat(n)) {
            return false;
        }
        if (n <= 1) {
            return false;
        }
        if (n <= 3) {
            return true;
        }
        if (n % 2 === 0 || n % 3 === 0) {
            return false;
        }
        for (var i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    },
};
