/** global: NumberUtil */

NumberUtil = {

    isBetween: function(n, min, max)
    {
        return (n >= min && n <= max);
    },

    isEven: function(n)
    {
        return ((n % 2.0) === 0.0 && !NumberUtil.isFloat(n));
    },

    isFloat: function(n)
    {
        return ((n % 1) !== 0);
    },

    isNegative: function(n)
    {
        return (n < 0.0);
    },

    isOdd: function(n)
    {
        return ((n % 2.0) !== 0.0 && !NumberUtil.isFloat(n));
    },

    isPositive: function(n)
    {
        return (n >= 0.0);
    },

    isPrime: function(n)
    {
        if (n <= 0 || NumberUtil.isFloat(n)) {
            return false;
        }
        if (n === 1) {
            return false;
        }
        else if (n === 2) {
            return true;
        }
        else if ((n % 2) === 0) {
            return false;
        }
        for (var i = 3; (i * i) <= n; i += 2) {
            if((n % i) === 0){
                return false;
            }
        }
        return true;
    }

};