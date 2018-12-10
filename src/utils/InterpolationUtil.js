var InterpolationUtil = {

    /**
     * Calculate bilinear interpolation for the given values.
     *
     * @memberof math.interpolation
     * @inner
     * @param {Number} a xxx
     * @param {Number} b xxx
     * @param {Number} c xxx
     * @param {Number} d xxx
     * @param {Number} u xxx
     * @param {Number} v xxx
     * @return {Number} result
     */
    bilinear: function(a, b, c, d, u, v)
    {
        var f = InterpolationUtil.linear;
        return f(f(a, b, u), f(c, d, u), v);
    },

    linear: function(a, b, t)
    {
        // return (a + ((b - a) * t));
        return (a * (1.0 - t)) + (b * t);
    },

    multilinear: function(list, t)
    {
        var s = InterpolationUtil.scalar((list.length - 1), t);
        var i = s.index;
        return InterpolationUtil.linear(list[i], list[(i + 1)], s.t);
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