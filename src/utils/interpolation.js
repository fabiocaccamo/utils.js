import * as MathUtil from './math.js';

export function bilinear(a, b, c, d, u, v) {
    const f = linear;
    return f(f(a, b, u), f(c, d, u), v);
}

export function linear(a, b, t) {
    // return (a + ((b - a) * t));
    return a * (1.0 - t) + b * t;
}

export function multilinear(list, t) {
    const s = scalar(list.length - 1, t);
    const i = s.index;
    return linear(list[i], list[i + 1], s.t);
}

export function scalar(parts, t) {
    const tScaled = t * parts;
    const tScaledIndex = Math.floor(tScaled);

    const tMinIndex = 0;
    const tMaxIndex = parts - 1;

    const tIndex = MathUtil.constrain(tScaledIndex, tMinIndex, tMaxIndex);
    const tReduced = tScaled - tIndex;
    return { index: tIndex, t: tReduced };
}
