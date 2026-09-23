import {
    average as rgbAverage,
    distance as rgbDistance,
    gradient as rgbGradient,
    gradientMatrix as rgbGradientMatrix,
    interpolateBilinear as rgbInterpolateBilinear,
    interpolateLinear as rgbInterpolateLinear,
    interpolateMultilinear as rgbInterpolateMultilinear,
    nearest as rgbNearest,
    toCmyk as rgbToCmyk,
    toHex as rgbToHex,
} from './rgb.js';
import { decodeInt, encodeInt } from '../hex.js';
import { roundDecimals } from '../math.js';
import { map } from '../object.js';
import { isNumber, isString } from '../type.js';

export function average(colors) {
    return rgbToHex(
        rgbAverage(
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

export function distance(colorA, colorB) {
    return rgbDistance(toRgb(colorA), toRgb(colorB));
}

export function gradient(colors, steps) {
    return rgbGradient(
        colors.map((color) => {
            return toRgb(color);
        }),
        steps
    ).map((color) => {
        return rgbToHex(color);
    });
}

export function gradientMatrix(colors, stepsX, stepsY) {
    return rgbGradientMatrix(
        map(colors, (color) => {
            return toRgb(color);
        }),
        stepsX,
        stepsY
    ).map((colors) => {
        return colors.map((color) => {
            return rgbToHex(color);
        });
    });
}

export function interpolateBilinear(a, b, c, d, u, v) {
    return rgbToHex(
        rgbInterpolateBilinear(toRgb(a), toRgb(b), toRgb(c), toRgb(d), u, v)
    );
}

export function interpolateLinear(colorFrom, colorTo, t) {
    return rgbToHex(rgbInterpolateLinear(toRgb(colorFrom), toRgb(colorTo), t));
}

export function interpolateMultilinear(colors, t) {
    return rgbToHex(
        rgbInterpolateMultilinear(
            colors.map((color) => {
                return toRgb(color);
            }),
            t
        )
    );
}

export function nearest(colorSearch, colors) {
    return rgbToHex(
        rgbNearest(
            toRgb(colorSearch),
            colors.map((color) => {
                return toRgb(color);
            })
        )
    );
}

export function toCmyk(color) {
    return rgbToCmyk(toRgb(color));
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

export function toRgb(color) {
    const fromHex = decodeInt;
    const toHex = encodeInt;

    let hex;
    if (isNumber(color)) {
        // restore leading zeros, eg. 0x00FF00 -> '00FF00'
        hex = toHex(color).padStart(6, '0');
    } else if (isString(color)) {
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
                a: roundDecimals(fromHex(comps[1]) / 255, 2),
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
    return rgbToHex(toRgb(color), prefix);
}

export function toStringCSS(color) {
    return toString(color, '#');
}

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
