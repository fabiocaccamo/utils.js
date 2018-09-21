var ColorRgbUtil = {

    average: function(colors)
    {
        // var color = colors[0];
        // var lerp = ColorRgbUtil.interpolateLinear;
        // for (var i = 1, j = colors.length; i < j; i++) {
        //     color = lerp(color, colors[i], 0.5);
        // }
        // return color;
        var c;
        var r = 0;
        var g = 0;
        var b = 0;
        for (var i = 0, j = colors.length; i < j; i++) {
            c = colors[i];
            r += c.r;
            g += c.g;
            b += c.b;
        }
        var round = Math.round;
        r = round(r / j);
        g = round(g / j);
        b = round(b / j);
        return { r:r, g:g, b:b };
    },

    distance: function(colorA, colorB)
    {
        var rDiff = (colorA.r - colorB.r);
        var gDiff = (colorA.g - colorB.g);
        var bDiff = (colorA.b - colorB.b);
        return Math.sqrt((rDiff * rDiff) + (gDiff * gDiff) + (bDiff * bDiff));
    },

    gradient: function(colors, steps)
    {
        var colorsOutput = [];
        var color;
        var berp = ColorRgbUtil.interpolateMultilinear;
        var t = 0.0;
        var tInc = (1.0 / Math.max(1, (steps - 1)));
        var tConstrain = MathUtil.constrain;
        for (var i = 0; i < steps; i++) {
            t = (i * tInc);
            t = tConstrain(t, 0.0, 1.0);
            color = berp(colors, t);
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
        var colorAvg = ColorRgbUtil.average;
        var colorBerp = ColorRgbUtil.interpolateBilinear

        // if (!colorTopLeft) {
        //     colorTopLeft = (colorTop || colorRight || colorBottomLeft || colorBottomRight);
        // }

        if (!colorTop) {
            colorTop = colorAvg([colorTopLeft, colorTopRight]);
        }
        if (!colorRight) {
            colorRight = colorAvg([colorBottomRight, colorTopRight]);
        }
        if (!colorBottom) {
            colorBottom = colorAvg([colorBottomLeft, colorBottomRight]);
        }
        if (!colorLeft) {
            colorLeft = colorAvg([colorTopLeft, colorBottomLeft]);
        }
        if (!colorCenter) {
            colorCenter = colorAvg([colorTop, colorLeft, colorBottom, colorRight]);
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

    interpolateBilinear: function(a, b, c, d, u, v)
    {
        var lerp = ColorRgbUtil.interpolateLinear;
        return lerp(lerp(a, b, u), lerp(c, d, u), v);
    },

    interpolateLinear: function(colorFrom, colorTo, t)
    {
        var lerp = InterpolationUtil.linear;
        var round = Math.round;
        return {
            r: round(lerp(colorFrom.r, colorTo.r, t)),
            g: round(lerp(colorFrom.g, colorTo.g, t)),
            b: round(lerp(colorFrom.b, colorTo.b, t)),
            a: round(lerp(colorFrom.a, colorTo.a, t))
        }
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

        var k = Math.min((1.0 - r), (1.0 - g), (1.0 - b));
        var c = (1.0 - r - k);
        var m = (1.0 - g - k);
        var y = (1.0 - b - k);

        var ik = (1.0 - k);
        if (ik > 0.0) {
            c = (c / ik);
            m = (m / ik);
            y = (y / ik);
            k = (k / ik);
        }

        c = Math.round(c * 100);
        m = Math.round(m * 100);
        y = Math.round(y * 100);
        k = Math.round(k * 100);

        return { c:c, m:m, y:y, k:k };
    },

    // toGrayscale: function(color, algorithm)
    // {
    //     // TODO
    //     // http://cadik.posvete.cz/color_to_gray_evaluation/
    // },

    toHex: function(color, prefix)
    {
        // { r:255, g:255, b:255, a:1.0 }
        // prefix 0x | #
        var a = (isNaN(color.a) ? (isNaN(color.alpha) ? null : color.alpha) : color.a);
        var r = (isNaN(color.r) ? (isNaN(color.red) ? 0 : color.red) : color.r);
        var g = (isNaN(color.g) ? (isNaN(color.green) ? 0 : color.green) : color.g);
        var b = (isNaN(color.b) ? (isNaN(color.blue) ? 0 : color.blue) : color.b);
        var hex = HexUtil.encodeInt;
        return String((prefix || '#') + (a == null ? '' : hex(a * 255)) + hex(r) + hex(g) + hex(b));
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

    toRgb: function(color)
    {
        return {
            r: color.r,
            g: color.g,
            b: color.b
        };
    },

    toString: function(color)
    {
        return '{ r:' + String(color.r) + ', g:' + String(color.g) + ', b:' + String(color.b) + ', a:' + String(isNaN(color.a) ? 1.0 : color.a) + ' }';
    },

    toStringCSS: function(color)
    {
        return 'rgba(' + String(color.r) + ', ' + String(color.g) + ', ' + String(color.b) + ', ' + String(isNaN(color.a) ? 1.0 : color.a) + ')';
    }

};