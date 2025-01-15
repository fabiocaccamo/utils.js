/** global: MathUtil */
/** global: InterpolationUtil */

InterpolationUtil = {
    bilinear(a, b, c, d, u, v) {
        const f = InterpolationUtil.linear;
        return f(f(a, b, u), f(c, d, u), v);
    },

    linear(a, b, t) {
        // return (a + ((b - a) * t));
        return a * (1.0 - t) + b * t;
    },

    multilinear(list, t) {
        const s = InterpolationUtil.scalar(list.length - 1, t);
        const i = s.index;
        return InterpolationUtil.linear(list[i], list[i + 1], s.t);
    },

    scalar(parts, t) {
        const tScaled = t * parts;
        const tScaledIndex = Math.floor(tScaled);

        const tMinIndex = 0;
        const tMaxIndex = parts - 1;

        const tIndex = MathUtil.constrain(tScaledIndex, tMinIndex, tMaxIndex);
        const tReduced = tScaled - tIndex;
        return { index: tIndex, t: tReduced };
    },
};
