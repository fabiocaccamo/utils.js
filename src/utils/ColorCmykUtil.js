/** global: ColorRgbUtil */

// export function average(colors) {
//     return ColorRgbUtil.toCmyk(
//         ColorRgbUtil.average(
//             colors.map(function(color){
//                 return toRgb(color);
//             })
//         ));
// };

// export function distance(colorA, colorB) {
//     return ColorRgbUtil.distance(
//         toRgb(colorA),
//         toRgb(colorB));
// };

// export function gradient(colors, steps) {
//     return ColorRgbUtil.gradient(colors.map(function(color){
//             return toRgb(color);
//         }), steps).map(function(color){
//             return ColorRgbUtil.toCmyk(color);
//         });
// };

// export function gradientMatrix(colors, stepsX, stepsY) {
//     return ColorRgbUtil.gradientMatrix(
//         ObjectUtil.map(colors, function(color){
//             return toRgb(color);
//         }), stepsX, stepsY).map(function(colors){
//             return colors.map(function(color){
//                 return ColorRgbUtil.toCmyk(color);
//             });
//         });
// };

// export function interpolateBilinear(a, b, c, d, u, v) {
//     return ColorRgbUtil.toCmyk(
//         ColorRgbUtil.interpolateBilinear(
//             toRgb(a),
//             toRgb(b),
//             toRgb(c),
//             toRgb(d), u, v));
// };

// export function interpolateLinear(colorFrom, colorTo, t) {
//     return ColorRgbUtil.toCmyk(
//         ColorRgbUtil.interpolateLinear(
//             toRgb(colorFrom),
//             toRgb(colorTo), t));
// };

// export function interpolateMultilinear(colors, t) {
//     return ColorRgbUtil.toCmyk(
//         ColorRgbUtil.interpolateMultilinear(
//             colors.map(function(color){
//                 return toRgb(color);
//             }), t));
// };

// export function nearest(colorSearch, colors) {
//     return ColorRgbUtil.toCmyk(
//         ColorRgbUtil.nearest(
//             toRgb(colorSearch),
//             colors.map(function(color){
//                 return toRgb(color);
//             })
//         ));
// };

// export function toGrayscale(color) {
//     return ColorRgbUtil.toGrayscale(
//         toRgb(color));
// };

export function toHex(color, prefix) {
    return ColorRgbUtil.toHex(toRgb(color), prefix);
}

// export function toHsl(color) {
//     return ColorRgbUtil.toHsl(
//         toRgb(color));
// };

// export function toHsv(color) {
//     return ColorRgbUtil.toHsv(
//         toRgb(color));
// };

export function toRgb(color) {
    const c = color.c / 100;
    const m = color.m / 100;
    const y = color.y / 100;
    const k = color.k / 100;
    const ik = 1.0 - k;

    let r = 1.0 - Math.min(1.0, c * ik + k);
    let g = 1.0 - Math.min(1.0, m * ik + k);
    let b = 1.0 - Math.min(1.0, y * ik + k);

    const round = Math.round;
    r = round(r * 255);
    g = round(g * 255);
    b = round(b * 255);

    return { r: r, g: g, b: b, a: 1.0 };
}

export function toString(color) {
    // prettier-ignore
    return `{ c:${String(color.c)}, m:${String(color.m)}, y:${String(color.y)}, k:${String(color.k)} }`;
}

export function toStringCSS(color) {
    // prettier-ignore
    return `cmyk(${String(color.c)}%, ${String(color.m)}%, ${String(color.y)}%, ${String(color.k)}%)`;
}
