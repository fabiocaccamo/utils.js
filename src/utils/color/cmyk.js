import * as RGBColorUtil from './rgb.js';

export default { toHex, toRgb, toString, toStringCSS };

// function average(colors) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.average(
//             colors.map(function(color){
//                 return toRgb(color);
//             })
//         ));
// };

// function distance(colorA, colorB) {
//     return RGBColorUtil.distance(
//         toRgb(colorA),
//         toRgb(colorB));
// };

// function gradient(colors, steps) {
//     return RGBColorUtil.gradient(colors.map(function(color){
//             return toRgb(color);
//         }), steps).map(function(color){
//             return RGBColorUtil.toCmyk(color);
//         });
// };

// function gradientMatrix(colors, stepsX, stepsY) {
//     return RGBColorUtil.gradientMatrix(
//         ObjectUtil.map(colors, function(color){
//             return toRgb(color);
//         }), stepsX, stepsY).map(function(colors){
//             return colors.map(function(color){
//                 return RGBColorUtil.toCmyk(color);
//             });
//         });
// };

// function interpolateBilinear(a, b, c, d, u, v) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.interpolateBilinear(
//             toRgb(a),
//             toRgb(b),
//             toRgb(c),
//             toRgb(d), u, v));
// };

// function interpolateLinear(colorFrom, colorTo, t) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.interpolateLinear(
//             toRgb(colorFrom),
//             toRgb(colorTo), t));
// };

// function interpolateMultilinear(colors, t) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.interpolateMultilinear(
//             colors.map(function(color){
//                 return toRgb(color);
//             }), t));
// };

// function nearest(colorSearch, colors) {
//     return RGBColorUtil.toCmyk(
//         RGBColorUtil.nearest(
//             toRgb(colorSearch),
//             colors.map(function(color){
//                 return toRgb(color);
//             })
//         ));
// };

// function toGrayscale(color) {
//     return RGBColorUtil.toGrayscale(
//         toRgb(color));
// };

function toHex(color, prefix) {
    return RGBColorUtil.toHex(toRgb(color), prefix);
}

// function toHsl(color) {
//     return RGBColorUtil.toHsl(
//         toRgb(color));
// };

// function toHsv(color) {
//     return RGBColorUtil.toHsv(
//         toRgb(color));
// };

function toRgb(color) {
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

function toString(color) {
    // prettier-ignore
    return `{ c:${String(color.c)}, m:${String(color.m)}, y:${String(color.y)}, k:${String(color.k)} }`;
}

function toStringCSS(color) {
    // prettier-ignore
    return `cmyk(${String(color.c)}%, ${String(color.m)}%, ${String(color.y)}%, ${String(color.k)}%)`;
}
