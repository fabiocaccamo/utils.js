var ColorHexUtil = {

    average: function(colors)
    {
        return ColorRgbUtil.average(
            colors.map(function(color){
                return ColorHexUtil.toRgb(color);
            }));
    },

    distance: function(colorA, colorB)
    {
        return ColorRgbUtil.distance(
            ColorHexUtil.toRgb(colorA),
            ColorHexUtil.toRgb(colorB));
    },

    gradient: function(colors, steps)
    {
        return ColorRgbUtil.gradient(
            colors.map(function(color){
                return ColorHexUtil.toRgb(color);
            }), steps);
    },

    gradientMatrix: function(colors, stepsX, stepsY)
    {
        return ColorRgbUtil.gradientMatrix(
            colors.map(function(color){
                return ColorHexUtil.toRgb(color);
            }), stepsX, stepsY);
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
        return ColorRgbUtil.interpolateMultilinear(
            colors.map(function(color){
                return ColorHexUtil.toRgb(color);
            }), t);
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
        return color;
    },

    // toGrayscale: function(color)
    // {
    //     return ColorRgbUtil.toGrayscale(
    //         ColorHexUtil.toRgb(color));
    // },

    toHex: function(color, prefix)
    {
        return ColorRgbUtil.toHex(
            ColorHexUtil.toRgb(color), prefix);
    },

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
        } else {
            hex = String(color).replace(/\#|0x/, '');
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
                }
                break;

            case 6:
                // eg. #000000
                comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                rgb = {
                    a: 1.0,
                    r: fromHex(comps[1]),
                    g: fromHex(comps[2]),
                    b: fromHex(comps[3])
                }
                break;

            case 8:
                // eg. #FF000000
                comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                rgb = {
                    a: (fromHex(comps[1]) / 255),
                    r: fromHex(comps[2]),
                    g: fromHex(comps[3]),
                    b: fromHex(comps[4])
                }
                break;
        }

        // console.log(col, hex, rgb, comps);
        return rgb;
    },

    toString: function(color)
    {
        return ColorHexUtil.toHex(color, '0x');
    },

    toStringCSS: function(color)
    {
        return ColorHexUtil.toHex(color, '#');
    }

};