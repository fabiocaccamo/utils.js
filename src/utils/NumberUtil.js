var NumberUtil = {

    isBetween: function(n, min, max)
    {
        return (n >= min && n <= max);
    },

    isEven: function(n)
    {
        return ((n % 2.0) == 0.0);
    },

    isFloat: function(n)
    {
        return ((n % 1) !== 0);
    },

    isInt: function(n)
    {
        return ((n % 1) === 0);
    },

    isNegative: function(n)
    {
        return (n < 0.0);
    },

    isOdd: function(n)
    {
        return ((n % 2.0) != 0.0);
    },

    isPositive: function(n)
    {
        return (n >= 0.0);
    },

    isPrime: function(n)
    {
        if (!NumberUtil.isUint(n)) {
            return false;
        }

        if (n == 1 || (n % 2) == 0) {
            return false;
        }

        if (n == 2) {
            return true;
        }

        for (var i = 3; (i * i) <= n; i += 2) {
            if((n % i) == 0){
                return false;
            }
        }

        return true;
    },

    isUint: function(n)
    {
        return (((n % 1) === 0) && (n >= 0));
    }

};