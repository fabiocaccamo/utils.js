var InterpolationUtil = {

    bilinear: function(a, b, c, d, u, v)
    {
        return linear(linear(a, b, u), linear(c, d, u), v);
    },

    linear: function(a, b, t)
    {
        // return (a + ((b - a) * t));
        return (a * (1.0 - t)) + (b * t);
    },

    multilinear: function(list, t)
    {
        var s = scalar((list.length - 1), t);
        var i = s.index;
        return linear(list[i], list[(i + 1)], s.t);
    },

    scalar: function(parts, t)
    {
        var tScaled = (t * parts);
        var tScaledIndex = Math.floor(tScaled);

        var tMinIndex = 0;
        var tMaxIndex = (parts - 1);

        var tIndex = MathUtil.constrain(tScaledIndex, tMinIndex, tMaxIndex);
        var tReduced = (tScaled - tIndex);

        return { index:tIndex, t:tReduced };
    }

};