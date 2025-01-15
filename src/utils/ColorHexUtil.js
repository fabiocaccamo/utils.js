/** global: ColorRgbUtil */
/** global: HexUtil */
/** global: InterpolationUtil */
/** global: MathUtil */
/** global: ObjectUtil */
/** global: TypeUtil */

export function average(colors) {
    return ColorRgbUtil.toHex(
        ColorRgbUtil.average(
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

export function distance(colorA, colorB) {
    return ColorRgbUtil.distance(toRgb(colorA), toRgb(colorB));
}

export function gradient(colors, steps) {
    return ColorRgbUtil.gradient(
        colors.map((color) => {
            return toRgb(color);
        }),
        steps
    ).map((color) => {
        return ColorRgbUtil.toHex(color);
    });
}

export function gradientMatrix(colors, stepsX, stepsY) {
    return ColorRgbUtil.gradientMatrix(
        ObjectUtil.map(colors, (color) => {
            return toRgb(color);
        }),
        stepsX,
        stepsY
    ).map((colors) => {
        return colors.map((color) => {
            return ColorRgbUtil.toHex(color);
        });
    });
}

export function interpolateBilinear(a, b, c, d, u, v) {
    return ColorRgbUtil.toHex(
        ColorRgbUtil.interpolateBilinear(toRgb(a), toRgb(b), toRgb(c), toRgb(d), u, v)
    );
}

export function interpolateLinear(colorFrom, colorTo, t) {
    return ColorRgbUtil.toHex(
        ColorRgbUtil.interpolateLinear(toRgb(colorFrom), toRgb(colorTo), t)
    );
}

export function interpolateMultilinear(colors, t) {
    return ColorRgbUtil.toHex(
        ColorRgbUtil.interpolateMultilinear(
            colors.map((color) => {
                return toRgb(color);
            }),
            t
        )
    );
}

export function nearest(colorSearch, colors) {
    return ColorRgbUtil.toHex(
        ColorRgbUtil.nearest(
            toRgb(colorSearch),
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

export function toCmyk(color) {
    return ColorRgbUtil.toCmyk(toRgb(color));
}

// export function toGrayscale(color) {
//     return ColorRgbUtil.toGrayscale(
//         toRgb(color));
// };

// export function toHsl(color) {
//     return ColorRgbUtil.toHsl(
//         toRgb(color));
// };

// export function toHsv(color) {
//     return ColorRgbUtil.toHsv(
//         toRgb(color));
// };

export function toRgb(color) {
    const fromHex = HexUtil.decodeInt;
    const toHex = HexUtil.encodeInt;

    let hex;
    if (TypeUtil.isNumber(color)) {
        hex = toHex(color);
    } else if (TypeUtil.isString(color)) {
        hex = color.replace(/\#|0x/, '');
    } else {
        return null;
    }
    hex = hex.toUpperCase();

    let rgb;
    let comps;

    switch (hex.length) {
        case 3:
            // eg. #000
            comps = /^([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
            rgb = {
                a: 1.0,
                r: fromHex(comps[1] + comps[1]),
                g: fromHex(comps[2] + comps[2]),
                b: fromHex(comps[3] + comps[3]),
            };
            break;

        case 6:
            // eg. #000000
            comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            rgb = {
                a: 1.0,
                r: fromHex(comps[1]),
                g: fromHex(comps[2]),
                b: fromHex(comps[3]),
            };
            break;

        case 8:
            // eg. #FF000000
            comps = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            rgb = {
                a: MathUtil.roundDecimals(fromHex(comps[1]) / 255, 2),
                r: fromHex(comps[2]),
                g: fromHex(comps[3]),
                b: fromHex(comps[4]),
            };
            break;

        default:
            return null;
    }

    // console.log(col, hex, rgb, comps);
    return rgb;
}

export function toString(color, prefix) {
    return ColorRgbUtil.toHex(toRgb(color), prefix);
}

export function toStringCSS(color) {
    return toString(color, '#');
}
