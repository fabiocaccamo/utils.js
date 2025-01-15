/** global: ColorCmykUtil */
/** global: ColorRgbUtil */

ColorCmykUtil = {
    // average: function(colors)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.average(
    //             colors.map(function(color){
    //                 return ColorCmykUtil.toRgb(color);
    //             })
    //         ));
    // },

    // distance: function(colorA, colorB)
    // {
    //     return ColorRgbUtil.distance(
    //         ColorCmykUtil.toRgb(colorA),
    //         ColorCmykUtil.toRgb(colorB));
    // },

    // gradient: function(colors, steps)
    // {
    //     return ColorRgbUtil.gradient(colors.map(function(color){
    //             return ColorCmykUtil.toRgb(color);
    //         }), steps).map(function(color){
    //             return ColorRgbUtil.toCmyk(color);
    //         });
    // },

    // gradientMatrix: function(colors, stepsX, stepsY)
    // {
    //     return ColorRgbUtil.gradientMatrix(
    //         ObjectUtil.map(colors, function(color){
    //             return ColorCmykUtil.toRgb(color);
    //         }), stepsX, stepsY).map(function(colors){
    //             return colors.map(function(color){
    //                 return ColorRgbUtil.toCmyk(color);
    //             });
    //         });
    // },

    // interpolateBilinear: function(a, b, c, d, u, v)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.interpolateBilinear(
    //             ColorCmykUtil.toRgb(a),
    //             ColorCmykUtil.toRgb(b),
    //             ColorCmykUtil.toRgb(c),
    //             ColorCmykUtil.toRgb(d), u, v));
    // },

    // interpolateLinear: function(colorFrom, colorTo, t)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.interpolateLinear(
    //             ColorCmykUtil.toRgb(colorFrom),
    //             ColorCmykUtil.toRgb(colorTo), t));
    // },

    // interpolateMultilinear: function(colors, t)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.interpolateMultilinear(
    //             colors.map(function(color){
    //                 return ColorCmykUtil.toRgb(color);
    //             }), t));
    // },

    // nearest: function(colorSearch, colors)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.nearest(
    //             ColorCmykUtil.toRgb(colorSearch),
    //             colors.map(function(color){
    //                 return ColorCmykUtil.toRgb(color);
    //             })
    //         ));
    // },

    // toGrayscale: function(color)
    // {
    //     return ColorRgbUtil.toGrayscale(
    //         ColorCmykUtil.toRgb(color));
    // },

    toHex(color, prefix) {
        return ColorRgbUtil.toHex(ColorCmykUtil.toRgb(color), prefix);
    },

    // toHsl: function(color)
    // {
    //     return ColorRgbUtil.toHsl(
    //         ColorCmykUtil.toRgb(color));
    // },

    // toHsv: function(color)
    // {
    //     return ColorRgbUtil.toHsv(
    //         ColorCmykUtil.toRgb(color));
    // },

    toRgb(color) {
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
    },

    toString(color) {
        // prettier-ignore
        return `{ c:${String(color.c)}, m:${String(color.m)}, y:${String(color.y)}, k:${String(color.k)} }`;
    },

    toStringCSS(color) {
        // prettier-ignore
        return `cmyk(${String(color.c)}%, ${String(color.m)}%, ${String(color.y)}%, ${String(color.k)}%)`;
    },
};
