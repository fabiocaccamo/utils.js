/** global: ColorRgbUtil */
/** global: HexUtil */
/** global: InterpolationUtil */
/** global: MathUtil */

ColorRgbUtil = {
    average(colors) {
        let c;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        let i = 0;
        const j = colors.length;
        for (i, j; i < j; i++) {
            c = colors[i];
            r += c.r;
            g += c.g;
            b += c.b;
            a += isNaN(c.a) ? 1.0 : c.a;
        }
        const round = Math.round;
        r = round(r / j);
        g = round(g / j);
        b = round(b / j);
        a = round(a / j);
        return { r: r, g: g, b: b, a: a };
    },

    distance(colorA, colorB) {
        const rDiff = colorA.r - colorB.r;
        const gDiff = colorA.g - colorB.g;
        const bDiff = colorA.b - colorB.b;
        const aDiff = Math.round(
            ((isNaN(colorA.a) ? 1.0 : colorA.a) - (isNaN(colorB.a) ? 1.0 : colorB.a)) *
                255
        );
        return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff + aDiff * aDiff);
    },

    gradient(colors, steps) {
        const colorsOutput = [];
        let color;
        const mlerp = ColorRgbUtil.interpolateMultilinear;
        let t = 0.0;
        const tInc = 1.0 / Math.max(1, steps - 1);
        const tConstrain = MathUtil.constrain;
        for (let i = 0; i < steps; i++) {
            t = i * tInc;
            t = tConstrain(t, 0.0, 1.0);
            color = mlerp(colors, t);
            colorsOutput.push(color);
        }
        return colorsOutput;
    },

    gradientMatrix(colors, stepsX, stepsY) {
        // colors: { top, topRight, right, bottomLeft, bottom, bottomRight, left, center };
        // only 4 corners are required
        let colorTopLeft = colors.topLeft;
        let colorTop = colors.top;
        let colorTopRight = colors.topRight;
        let colorRight = colors.right;
        let colorBottomLeft = colors.bottomLeft;
        let colorBottom = colors.bottom;
        let colorBottomRight = colors.bottomRight;
        let colorLeft = colors.left;
        let colorCenter = colors.center;
        // var colorAvg = ColorRgbUtil.average;
        const colorLerp = ColorRgbUtil.interpolateLinear;
        const colorBerp = ColorRgbUtil.interpolateBilinear;

        if (!colorTopLeft || !colorTopRight || !colorBottomLeft || !colorBottomRight) {
            return null;
        }
        if (!colorTop) {
            // colorTop = colorAvg([colorTopLeft, colorTopRight]);
            colorTop = colorLerp(colorTopLeft, colorTopRight, 0.5);
        }
        if (!colorRight) {
            // colorRight = colorAvg([colorBottomRight, colorTopRight]);
            colorRight = colorLerp(colorBottomRight, colorTopRight, 0.5);
        }
        if (!colorBottom) {
            // colorBottom = colorAvg([colorBottomLeft, colorBottomRight]);
            colorBottom = colorLerp(colorBottomLeft, colorBottomRight, 0.5);
        }
        if (!colorLeft) {
            // colorLeft = colorAvg([colorTopLeft, colorBottomLeft]);
            colorLeft = colorLerp(colorTopLeft, colorBottomLeft, 0.5);
        }
        if (!colorCenter) {
            // colorCenter = colorAvg([colorTop, colorLeft, colorBottom, colorRight]);
            colorCenter = colorBerp(
                colorTop,
                colorBottom,
                colorLeft,
                colorRight,
                0.5,
                0.5
            );
        }

        const colorsTopLeft = [colorTopLeft, colorLeft, colorCenter, colorTop];
        const colorsBottomLeft = [colorLeft, colorBottomLeft, colorBottom, colorCenter];
        const colorsBottomRight = [
            colorCenter,
            colorBottom,
            colorBottomRight,
            colorRight,
        ];
        const colorsTopRight = [colorTop, colorCenter, colorRight, colorTopRight];
        const colorsRegions = [
            [colorsTopLeft, colorsTopRight],
            [colorsBottomLeft, colorsBottomRight],
        ];
        let colorsRegion;
        let color;
        const colorsMatrix = [];

        // test
        // var gradientTop     = ColorRgbUtil.gradient([colorTopLeft, colorTop, colorTopRight], stepsX);
        // var gradientLeft    = ColorRgbUtil.gradient([colorTopLeft, colorLeft, colorBottomLeft], stepsY);
        // var gradientBottom  = ColorRgbUtil.gradient([colorBottomLeft, colorBottom, colorBottomRight], stepsX);
        // var gradientRight   = ColorRgbUtil.gradient([colorTopRight, colorRight, colorBottomRight], stepsY);

        let tX, tXScaled;
        let tY, tYScaled;
        const tScalar = InterpolationUtil.scalar;

        let x, y;

        for (y = 0; y < stepsY; y++) {
            colorsMatrix[y] = [];

            tY = y / (stepsY - 1) || 0.0;
            tYScaled = tScalar(2, tY); // 2 = colorsQuadrants.length

            for (x = 0; x < stepsX; x++) {
                tX = x / (stepsX - 1) || 0.0;
                tXScaled = tScalar(2, tX); // 2 = colorsQuadrants[tYScaled.index].length

                colorsRegion = colorsRegions[tYScaled.index][tXScaled.index];
                colorTopLeft = colorsRegion[0];
                colorBottomLeft = colorsRegion[1];
                colorBottomRight = colorsRegion[2];
                colorTopRight = colorsRegion[3];
                color = colorBerp(
                    colorTopLeft,
                    colorBottomLeft,
                    colorTopRight,
                    colorBottomRight,
                    tYScaled.t,
                    tXScaled.t
                );
                colorsMatrix[y][x] = color;

                // test
                // colorsMatrix[y][stepsX - 1] = gradientRight[y];
                // colorsMatrix[y][0] = gradientLeft[y];
            }

            // test
            // colorsMatrix[y][stepsX - 1] = gradientRight[y];
            // colorsMatrix[y][0] = gradientLeft[y];
        }

        return colorsMatrix;
    },

    interpolateBilinear(
        colorTopLeft,
        colorBottomLeft,
        colorTopRight,
        colorBottomRight,
        ty,
        tx
    ) {
        const lerp = ColorRgbUtil.interpolateLinear;
        return lerp(
            lerp(colorTopLeft, colorBottomLeft, ty),
            lerp(colorTopRight, colorBottomRight, ty),
            tx
        );
    },

    interpolateLinear(colorFrom, colorTo, t) {
        const lerp = InterpolationUtil.linear;
        const round = Math.round;
        return {
            r: round(lerp(colorFrom.r, colorTo.r, t)),
            g: round(lerp(colorFrom.g, colorTo.g, t)),
            b: round(lerp(colorFrom.b, colorTo.b, t)),
            a: round(
                lerp(
                    isNaN(colorFrom.a) ? 1.0 : colorFrom.a,
                    isNaN(colorTo.a) ? 1.0 : colorTo.a,
                    t
                )
            ),
        };
    },

    interpolateMultilinear(colors, t) {
        const s = InterpolationUtil.scalar(colors.length - 1, t);
        const i = s.index;
        return ColorRgbUtil.interpolateLinear(colors[i], colors[i + 1], s.t);
    },

    nearest(colorSearch, colors) {
        const calcDistance = ColorRgbUtil.distance;
        let tempDistance;
        let nearestDistance =
            calcDistance({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }) + 1.0;
        let nearestColor = null;
        for (let i = 0, j = colors.length; i < j; i++) {
            tempDistance = calcDistance(colorSearch, colors[i]);
            if (tempDistance < nearestDistance) {
                nearestDistance = tempDistance;
                nearestColor = colors[i];
            }
        }
        return nearestColor;
    },

    toCmyk(color) {
        const r = color.r / 255;
        const g = color.g / 255;
        const b = color.b / 255;

        const ir = 1.0 - r;
        const ig = 1.0 - g;
        const ib = 1.0 - b;
        let k = Math.min(ir, ig, ib);
        const ik = 1.0 - k;

        let c = k < 1.0 ? (ir - k) / ik : 0;
        let m = k < 1.0 ? (ig - k) / ik : 0;
        let y = k < 1.0 ? (ib - k) / ik : 0;

        c *= 100;
        m *= 100;
        y *= 100;
        k *= 100;

        const round = Math.round;
        c = round(c);
        m = round(m);
        y = round(y);
        k = round(k);

        return { c: c, m: m, y: y, k: k };
    },

    // toGrayscale: function(color, algorithm)
    // {
    //     // TODO
    //     // http://cadik.posvete.cz/color_to_gray_evaluation/
    // },

    toHex(color, prefix) {
        const a = isNaN(color.a) ? null : color.a;
        const r = isNaN(color.r) ? 0 : color.r;
        const g = isNaN(color.g) ? 0 : color.g;
        const b = isNaN(color.b) ? 0 : color.b;
        const hex = HexUtil.encodeInt;
        return String(
            (prefix || '#') +
                (a === null || a >= 1.0 ? '' : hex(a * 255)) +
                hex(r) +
                hex(g) +
                hex(b)
        );
    },

    // toHsl: function(color)
    // {
    //     // TODO
    // },

    // toHsv: function(color)
    // {
    //     // TODO
    //     // https://gist.github.com/felipesabino/5066336/revisions
    // },

    toString(color) {
        // prettier-ignore
        return `{ r:${String(color.r)}, g:${String(color.g)}, b:${String(color.b)}, a:${String(isNaN(color.a) ? 1.0 : color.a)} }`;
    },

    toStringCSS(color) {
        // prettier-ignore
        return `rgba(${String(color.r)}, ${String(color.g)}, ${String(color.b)}, ${String(isNaN(color.a) ? 1.0 : color.a)})`;
    },
};
