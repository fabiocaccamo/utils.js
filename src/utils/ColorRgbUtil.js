/** global: ColorRgbUtil */
/** global: HexUtil */
/** global: InterpolationUtil */
/** global: MathUtil */

ColorRgbUtil = {

    average: function(colors)
    {
        var c;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        var i = 0, j = colors.length;
        for (i, j; i < j; i++) {
            c = colors[i];
            r += c.r;
            g += c.g;
            b += c.b;
            a += (isNaN(c.a) ? 1.0 : c.a);
        }
        var round = Math.round;
        r = round(r / j);
        g = round(g / j);
        b = round(b / j);
        a = round(a / j);
        return { r:r, g:g, b:b, a:a };
    },

    distance: function(colorA, colorB)
    {
        var rDiff = (colorA.r - colorB.r);
        var gDiff = (colorA.g - colorB.g);
        var bDiff = (colorA.b - colorB.b);
        var aDiff = Math.round(((isNaN(colorA.a) ? 1.0 : colorA.a) - (isNaN(colorB.a) ? 1.0 : colorB.a)) * 255);
        return Math.sqrt((rDiff * rDiff) + (gDiff * gDiff) + (bDiff * bDiff) + (aDiff * aDiff));
    },

    gradient: function(colors, steps)
    {
        var colorsOutput = [];
        var color;
        var mlerp = ColorRgbUtil.interpolateMultilinear;
        var t = 0.0;
        var tInc = (1.0 / Math.max(1, (steps - 1)));
        var tConstrain = MathUtil.constrain;
        for (var i = 0; i < steps; i++) {
            t = (i * tInc);
            t = tConstrain(t, 0.0, 1.0);
            color = mlerp(colors, t);
            colorsOutput.push(color);
        }
        return colorsOutput;
    },

    gradientMatrix: function(colors, stepsX, stepsY)
    {
        // colors: { top, topRight, right, bottomLeft, bottom, bottomRight, left, center };
        // only 4 corners are required
        var colorTopLeft = colors.topLeft;
        var colorTop = colors.top;
        var colorTopRight = colors.topRight;
        var colorRight = colors.right;
        var colorBottomLeft = colors.bottomLeft;
        var colorBottom = colors.bottom;
        var colorBottomRight = colors.bottomRight;
        var colorLeft = colors.left;
        var colorCenter = colors.center;
        // var colorAvg = ColorRgbUtil.average;
        var colorLerp = ColorRgbUtil.interpolateLinear;
        var colorBerp = ColorRgbUtil.interpolateBilinear;

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
            colorCenter = colorBerp(colorTop, colorBottom, colorLeft, colorRight, 0.5, 0.5);
        }

        var colorsTopLeft = [colorTopLeft, colorLeft, colorCenter, colorTop];
        var colorsBottomLeft = [colorLeft, colorBottomLeft, colorBottom, colorCenter];
        var colorsBottomRight = [colorCenter, colorBottom, colorBottomRight, colorRight];
        var colorsTopRight = [colorTop, colorCenter, colorRight, colorTopRight];
        var colorsRegions = [
            [colorsTopLeft, colorsTopRight],
            [colorsBottomLeft, colorsBottomRight]
        ];
        var colorsRegion;
        var color;
        var colorsMatrix = [];

        // test
        // var gradientTop     = ColorRgbUtil.gradient([colorTopLeft, colorTop, colorTopRight], stepsX);
        // var gradientLeft    = ColorRgbUtil.gradient([colorTopLeft, colorLeft, colorBottomLeft], stepsY);
        // var gradientBottom  = ColorRgbUtil.gradient([colorBottomLeft, colorBottom, colorBottomRight], stepsX);
        // var gradientRight   = ColorRgbUtil.gradient([colorTopRight, colorRight, colorBottomRight], stepsY);

        var tX, tXScaled;
        var tY, tYScaled;
        var tScalar = InterpolationUtil.scalar;

        var x, y;

        for (y = 0; y < stepsY; y++) {

            colorsMatrix[y] = [];

            tY = ((y / (stepsY - 1)) || 0.0);
            tYScaled = tScalar(2, tY); // 2 = colorsQuadrants.length

            for (x = 0; x < stepsX; x++) {

                tX = ((x / (stepsX - 1)) || 0.0);
                tXScaled = tScalar(2, tX); // 2 = colorsQuadrants[tYScaled.index].length

                colorsRegion = colorsRegions[tYScaled.index][tXScaled.index];
                colorTopLeft = colorsRegion[0];
                colorBottomLeft = colorsRegion[1];
                colorBottomRight = colorsRegion[2];
                colorTopRight = colorsRegion[3];
                color = colorBerp(colorTopLeft, colorBottomLeft, colorTopRight, colorBottomRight, tYScaled.t, tXScaled.t);
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

    interpolateBilinear: function(colorTopLeft, colorBottomLeft, colorTopRight, colorBottomRight, ty, tx)
    {
        var lerp = ColorRgbUtil.interpolateLinear;
        return lerp(
            lerp(colorTopLeft, colorBottomLeft, ty),
            lerp(colorTopRight, colorBottomRight, ty), tx);
    },

    interpolateLinear: function(colorFrom, colorTo, t)
    {
        var lerp = InterpolationUtil.linear;
        var round = Math.round;
        return {
            r: round(lerp(colorFrom.r, colorTo.r, t)),
            g: round(lerp(colorFrom.g, colorTo.g, t)),
            b: round(lerp(colorFrom.b, colorTo.b, t)),
            a: round(lerp((isNaN(colorFrom.a) ? 1.0 : colorFrom.a), (isNaN(colorTo.a) ? 1.0 : colorTo.a), t))
        };
    },

    interpolateMultilinear: function(colors, t)
    {
        var s = InterpolationUtil.scalar((colors.length - 1), t);
        var i = s.index;
        return ColorRgbUtil.interpolateLinear(colors[i], colors[(i + 1)], s.t);
    },

    nearest: function(colorSearch, colors)
    {
        var calcDistance = ColorRgbUtil.distance;
        var tempDistance;
        var nearestDistance = (calcDistance({ r:0, g:0, b:0 }, { r:255, g:255, b:255 }) + 1.0);
        var nearestColor = null;
        for (var i = 0, j = colors.length; i < j; i++) {
            tempDistance = calcDistance(colorSearch, colors[i]);
            if (tempDistance < nearestDistance) {
                nearestDistance = tempDistance;
                nearestColor = colors[i];
            }
        }
        return nearestColor;
    },

    toCmyk: function(color)
    {
        var r = (color.r / 255);
        var g = (color.g / 255);
        var b = (color.b / 255);

        var ir = (1.0 - r);
        var ig = (1.0 - g);
        var ib = (1.0 - b);
        var k = Math.min(ir, ig, ib);
        var ik = (1.0 - k);

        var c = ((k < 1.0) ? ((ir - k) / ik) : 0);
        var m = ((k < 1.0) ? ((ig - k) / ik) : 0);
        var y = ((k < 1.0) ? ((ib - k) / ik) : 0);

        c *= 100;
        m *= 100;
        y *= 100;
        k *= 100;

        var round = Math.round;
        c = round(c);
        m = round(m);
        y = round(y);
        k = round(k);

        return { c:c, m:m, y:y, k:k };
    },

    // toGrayscale: function(color, algorithm)
    // {
    //     // TODO
    //     // http://cadik.posvete.cz/color_to_gray_evaluation/
    // },

    toHex: function(color, prefix)
    {
        var a = (isNaN(color.a) ? null : color.a);
        var r = (isNaN(color.r) ? 0 : color.r);
        var g = (isNaN(color.g) ? 0 : color.g);
        var b = (isNaN(color.b) ? 0 : color.b);
        var hex = HexUtil.encodeInt;
        return String((prefix || '#') + ((a == null || a >= 1.0) ? '' : hex(a * 255)) + hex(r) + hex(g) + hex(b));
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

    toString: function(color)
    {
        return '{ r:' + String(color.r) + ', g:' + String(color.g) + ', b:' + String(color.b) + ', a:' + String(isNaN(color.a) ? 1.0 : color.a) + ' }';
    },

    toStringCSS: function(color)
    {
        return 'rgba(' + String(color.r) + ', ' + String(color.g) + ', ' + String(color.b) + ', ' + String(isNaN(color.a) ? 1.0 : color.a) + ')';
    }

};