/** global: ColorHexUtil */
/** global: ColorRgbUtil */
/** global: HexUtil */
/** global: InterpolationUtil */
/** global: MathUtil */
/** global: ObjectUtil */
/** global: TypeUtil */

ColorHexUtil = {

    average: function(colors)
    {
        return ColorRgbUtil.toHex(
            ColorRgbUtil.average(
                colors.map(function(color){
                    return ColorHexUtil.toRgb(color);
                })
            ));
    },

    distance: function(colorA, colorB)
    {
        return ColorRgbUtil.distance(
            ColorHexUtil.toRgb(colorA),
            ColorHexUtil.toRgb(colorB));
    },

    gradient: function(colors, steps)
    {
        return ColorRgbUtil.gradient(colors.map(function(color){
                return ColorHexUtil.toRgb(color);
            }), steps).map(function(color){
                return ColorRgbUtil.toHex(color);
            });
    },

    gradientMatrix: function(colors, stepsX, stepsY)
    {
        return ColorRgbUtil.gradientMatrix(
            ObjectUtil.map(colors, function(color){
                return ColorHexUtil.toRgb(color);
            }), stepsX, stepsY).map(function(colors){
                return colors.map(function(color){
                    return ColorRgbUtil.toHex(color);
                });
            });
    },

    interpolateBilinear: function(a, b, c, d, u, v)
    {
        return ColorRgbUtil.toHex(
            ColorRgbUtil.interpolateBilinear(
                ColorHexUtil.toRgb(a),
                ColorHexUtil.toRgb(b),
                ColorHexUtil.toRgb(c),
                ColorHexUtil.toRgb(d), u, v));
    },

    interpolateLinear: function(colorFrom, colorTo, t)
    {
        return ColorRgbUtil.toHex(
            ColorRgbUtil.interpolateLinear(
                ColorHexUtil.toRgb(colorFrom),
                ColorHexUtil.toRgb(colorTo), t));
    },

    interpolateMultilinear: function(colors, t)
    {
        return ColorRgbUtil.toHex(
            ColorRgbUtil.interpolateMultilinear(
                colors.map(function(color){
                    return ColorHexUtil.toRgb(color);
                }), t));
    },

    nearest: function(colorSearch, colors)
    {
        return ColorRgbUtil.toHex(
            ColorRgbUtil.nearest(
                ColorHexUtil.toRgb(colorSearch),
                colors.map(function(color){
                    return ColorHexUtil.toRgb(color);
                })
            ));
    },

    toCmyk: function(color)
    {
        return ColorRgbUtil.toCmyk(
            ColorHexUtil.toRgb(color));
    },

    // toGrayscale: function(color)
    // {
    //     return ColorRgbUtil.toGrayscale(
    //         ColorHexUtil.toRgb(color));
    // },

    // toHsl: function(color)
    // {
    //     return ColorRgbUtil.toHsl(
    //         ColorHexUtil.toRgb(color));
    // },

    // toHsv: function(color)
    // {
    //     return ColorRgbUtil.toHsv(
    //         ColorHexUtil.toRgb(color));
    // },

    toRgb: function(color)
    {
        var fromHex = HexUtil.decodeInt;
        var toHex = HexUtil.encodeInt;

        var hex;
        if (TypeUtil.isNumber(color)) {
            hex = toHex(color);
        } else if (TypeUtil.isString(color)) {
            hex = color.replace(/\#|0x/, '');
        } else {
            return null;
        }
        hex = hex.toUpperCase();

        var rgb;
        var comps;

        switch (hex.length) {
            case 3:
                // eg. #000
                comps = /^([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
                rgb = {
                    a: 1.0,
                    r: fromHex(comps[1] + comps[1]),
                    g: fromHex(comps[2] + comps[2]),
                    b: fromHex(comps[3] + comps[3])
                };
                break;

            case 6:
                // eg. #000000
                comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                rgb = {
                    a: 1.0,
                    r: fromHex(comps[1]),
                    g: fromHex(comps[2]),
                    b: fromHex(comps[3])
                };
                break;

            case 8:
                // eg. #FF000000
                comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                rgb = {
                    a: MathUtil.roundDecimals(fromHex(comps[1]) / 255, 2),
                    r: fromHex(comps[2]),
                    g: fromHex(comps[3]),
                    b: fromHex(comps[4])
                };
                break;

            default:
                return null;
        }

        // console.log(col, hex, rgb, comps);
        return rgb;
    },

    toString: function(color, prefix)
    {
        return ColorRgbUtil.toHex(
            ColorHexUtil.toRgb(color), prefix);
    },

    toStringCSS: function(color)
    {
        return ColorHexUtil.toString(color, '#');
    }

};