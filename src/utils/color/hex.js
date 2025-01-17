import * as RGBColorUtil from './rgb.js';
import * as HexUtil from '../hex.js';
import * as InterpolationUtil from '../interpolation.js';
import * as MathUtil from '../math.js';
import * as ObjectUtil from '../object.js';
import * as TypeUtil from '../type.js';

export default {
    average,
    distance,
    gradient,
    gradientMatrix,
    interpolateBilinear,
    interpolateLinear,
    interpolateMultilinear,
    nearest,
    toCmyk,
    toRgb,
    toString,
    toStringCSS,
};

function average(colors) {
    return RGBColorUtil.toHex(
        RGBColorUtil.average(
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

function distance(colorA, colorB) {
    return RGBColorUtil.distance(toRgb(colorA), toRgb(colorB));
}

function gradient(colors, steps) {
    return RGBColorUtil.gradient(
        colors.map((color) => {
            return toRgb(color);
        }),
        steps
    ).map((color) => {
        return RGBColorUtil.toHex(color);
    });
}

function gradientMatrix(colors, stepsX, stepsY) {
    return RGBColorUtil.gradientMatrix(
        ObjectUtil.map(colors, (color) => {
            return toRgb(color);
        }),
        stepsX,
        stepsY
    ).map((colors) => {
        return colors.map((color) => {
            return RGBColorUtil.toHex(color);
        });
    });
}

function interpolateBilinear(a, b, c, d, u, v) {
    return RGBColorUtil.toHex(
        RGBColorUtil.interpolateBilinear(toRgb(a), toRgb(b), toRgb(c), toRgb(d), u, v)
    );
}

function interpolateLinear(colorFrom, colorTo, t) {
    return RGBColorUtil.toHex(
        RGBColorUtil.interpolateLinear(toRgb(colorFrom), toRgb(colorTo), t)
    );
}

function interpolateMultilinear(colors, t) {
    return RGBColorUtil.toHex(
        RGBColorUtil.interpolateMultilinear(
            colors.map((color) => {
                return toRgb(color);
            }),
            t
        )
    );
}

function nearest(colorSearch, colors) {
    return RGBColorUtil.toHex(
        RGBColorUtil.nearest(
            toRgb(colorSearch),
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

function toCmyk(color) {
    return RGBColorUtil.toCmyk(toRgb(color));
}

// function toGrayscale(color) {
//     return RGBColorUtil.toGrayscale(
//         toRgb(color));
// };

// function toHsl(color) {
//     return RGBColorUtil.toHsl(
//         toRgb(color));
// };

// function toHsv(color) {
//     return RGBColorUtil.toHsv(
//         toRgb(color));
// };

function toRgb(color) {
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

function toString(color, prefix) {
    return RGBColorUtil.toHex(toRgb(color), prefix);
}

function toStringCSS(color) {
    return toString(color, '#');
}
