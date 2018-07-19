(function (root, factory) {

    if (typeof(define) === 'function' && define.amd) {
        // AMD
        define('@fabiocaccamo/utils.js', factory);
        define('@fabiocaccamo/utils', factory);
        define('utils', factory);
    }
    else if (typeof(module) === 'object') {
        // CommonJS
        module.exports = factory();
    }
    else {
        // Script tag import i.e., IIFE
        root.utils = factory();
        root.u = factory();
    }

}(this, function() {

    'use strict';

    var ArrayUtil = {

    clean: function(list)
    {
        return list.filter(function(val){
            return !(Object.is(val, undefined) || Object.is(val, null) || Object.is(val, NaN));
        });
    },

    flatten: function(list)
    {
        var listNew = [];
        for (var i = 0, j = list.length; i < j; i++) {
            listNew.push.apply(null, (TypeUtil.isArray(list[i]) ? list[i] : [list[i]]));
        }
        return listNew;
    },

    index: function(list, keys, flat)
    {
        var dict = {}, item, key, val;

        if (typeof(keys) === 'string') {
            keys = [keys];
        }

        for(var i = 0, j = list.length; i < j; i++)
        {
            item = list[i];

            for(var m = 0, n = keys.length; m < n; m++ )
            {
                key = String(keys[m]);
                val = String(item[key]);

                if (flat === true) {
                    dict[val] = item;
                }
                else {
                    if (dict[val] == undefined) {
                        dict[val] = [];
                    }
                    dict[val].push(item);
                }
            }
        }

        return dict;
    },

    mask: function(list, index, itemsLeft, itemsRight)
    {
        // TODO
    },

    paginate: function(list, itemsPerPage)
    {
        var itemsTotal = list.length;
        var pagesTotal = Math.ceil(itemsTotal / itemsPerPage);
        var pages = [];
        var i, j;
        for (i = 0, j = 0; i < pagesTotal; i++) {
            j = (i * itemsPerPage);
            pages[i] = list.slice(j, j + Math.min(itemsPerPage, itemsTotal));
        }
        return pages;
    },

    shuffle: function(list)
    {
        var listNew = list.concat();
        var randomIndex;
        var randomItems;
        var length = list.length;
        while (length) {
            // randomIndex = Math.floor(Math.random() * (length--));
            randomIndex = RandomUtil.integer(0, --length);
            randomItems = listNew.splice(randomIndex, 1);
            listNew.push.apply(listNew, randomItems);
        }
        return listNew;
    },

    sortNumerically: function(list)
    {
        var compare = function(a, b)
        {
            return (a - b);
        }

        return list.sort(compare);
    },

    sortOn: function(list, key)
    {
        var compare = function(a, b)
        {
            if (a[key] < b[key]){
                return -1;
            }
            else if (a[key] > b[key]){
                return 1;
            }
            else {
                return 0;
            }
        }

        return list.sort(compare);
    },

    unique: function(list)
    {
        var listNew = [];
        var item;
        for (var i = 0, j = list.length; i < j; i++) {
            item = list[i];
            if (listNew.indexOf(item) == -1) {
                listNew.push(item);
            }
        }
        return listNew;
    },

    unzip: function(list)
    {
        // TODO
    },

    zip: function(list)
    {
        // TODO
    }
};
    var Base64Util = {

    decode: function(str)
    {
        return window.atob(str);
    },

    encode: function(str)
    {
        return window.btoa(str);
    }
};
    var ColorCmykUtil = {

    average: function(colors)
    {
        return ColorRgbUtil.average(
            colors.map(function(color){
                return ColorCmykUtil.toRgb(color);
            }));
    },

    gradient: function(colors, steps)
    {
        return ColorRgbUtil.gradient(
            colors.map(function(color){
                return ColorCmykUtil.toRgb(color);
            }), steps);
    },

    gradientMatrix: function(colors, stepsX, stepsY)
    {
        return ColorRgbUtil.gradientMatrix(
            colors.map(function(color){
                return ColorCmykUtil.toRgb(color);
            }), stepsX, stepsY);
    },

    interpolateBilinear: function(a, b, c, d, u, v)
    {
        return ColorRgbUtil.toCmyk(
            ColorRgbUtil.interpolateBilinear(
                ColorCmykUtil.toRgb(a),
                ColorCmykUtil.toRgb(b),
                ColorCmykUtil.toRgb(c),
                ColorCmykUtil.toRgb(d), u, v));
    },

    interpolateLinear: function(colorFrom, colorTo, t)
    {
        return ColorRgbUtil.toCmyk(
            ColorRgbUtil.interpolateLinear(
                ColorCmykUtil.toRgb(colorFrom),
                ColorCmykUtil.toRgb(colorTo), t));
    },

    interpolateMultilinear: function(colors, t)
    {
        return ColorRgbUtil.interpolateMultilinear(
            colors.map(function(color){
                return ColorCmykUtil.toRgb(color);
            }), t);
    },

    toCmyk: function(color)
    {
        return color;
    },

    toGrayscale: function(color)
    {
        return ColorRgbUtil.toGrayscale(
            ColorCmykUtil.toRgb(color));
    },

    toHex: function(color, prefix)
    {
        return ColorRgbUtil.toHex(
            ColorCmykUtil.toRgb(color), prefix);
    },

    toHsl: function(color)
    {
        return ColorRgbUtil.toHsl(
            ColorCmykUtil.toRgb(color));
    },

    toHsv: function(color)
    {
        return ColorRgbUtil.toHsv(
            ColorCmykUtil.toRgb(color));
    },

    toRgb: function(color)
    {
        var c = (color.c / 100);
        var m = (color.m / 100);
        var y = (color.y / 100);
        var k = (color.k / 100);
        var r = (1.0 - Math.min(1.0, (c * (1.0 - k)) + k));
        var g = (1.0 - Math.min(1.0, (m * (1.0 - k)) + k));
        var b = (1.0 - Math.min(1.0, (y * (1.0 - k)) + k));
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        return { r:r, g:g, b:b };
    },

    toString: function(color)
    {
        return '{ c:' + String(color.c) + ', m:' + String(color.m) + ', y:' + String(color.y) + ', k:' + String(color.k) + ' }';
    },

    toStringCSS: function(color)
    {
        return 'cmyk(' + String(color.c) + '%, ' + String(color.m) + '%, ' + String(color.y) + '%, ' + String(color.k) + '%)';
    }

};
    var ColorHexUtil = {

    average: function(colors)
    {
        return ColorRgbUtil.average(
            colors.map(function(color){
                return ColorHexUtil.toRgb(color);
            }));
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
        return ColorRgbUtil.toCmyk(
            ColorRgbUtil.interpolateBilinear(
                ColorHexUtil.toRgb(a),
                ColorHexUtil.toRgb(b),
                ColorHexUtil.toRgb(c),
                ColorHexUtil.toRgb(d), u, v));
    },

    interpolateLinear: function(colorFrom, colorTo, t)
    {
        return ColorRgbUtil.toCmyk(
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

    toCmyk: function(color)
    {
        return color;
    },

    toGrayscale: function(color)
    {
        return ColorRgbUtil.toGrayscale(
            ColorHexUtil.toRgb(color));
    },

    toHex: function(color, prefix)
    {
        return ColorRgbUtil.toHex(
            ColorHexUtil.toRgb(color), prefix);
    },

    toHsl: function(color)
    {
        return ColorRgbUtil.toHsl(
            ColorHexUtil.toRgb(color));
    },

    toHsv: function(color)
    {
        return ColorRgbUtil.toHsv(
            ColorHexUtil.toRgb(color));
    },

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
    var ColorRgbUtil = {

    average: function(colors)
    {
        var color = colors[0];
        var lerp = ColorRgbUtil.interpolateLinear;
        for (var i = 1, j = colors.length; i < j; i++) {
            color = lerp(color, colors[i], 0.5);
        }
        return color;
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
        return {
            r: lerp(colorFrom.r, colorTo.r, t),
            g: lerp(colorFrom.g, colorTo.g, t),
            b: lerp(colorFrom.b, colorTo.b, t),
            a: lerp(colorFrom.a, colorTo.a, t)
        }
    },

    interpolateMultilinear: function(colors, t)
    {
        var s = InterpolationUtil.scalar((colors.length - 1), t);
        var i = s.index;
        return ColorRgbUtil.interpolateLinear(colors[i], colors[(i + 1)], s.t);
    },

    toCmyk: function(color)
    {
        var r = (color.r / 255);
        var g = (color.g / 255);
        var b = (color.b / 255);

        var k = Math.min(1.0 - r, 1.0 - g, 1.0 - b);
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

    toGrayscale: function(color, algorithm)
    {
        // TODO
        // http://cadik.posvete.cz/color_to_gray_evaluation/
    },

    toHex: function(color, prefix)
    {
        // { r:255, g:255, b:255, a:1.0 }
        // prefix 0x | #
        var a = (isNaN(color.a) ? (isNaN(color.alpha) ? 1.0 : color.alpha) : color.a);
        var r = (isNaN(color.r) ? (isNaN(color.red) ? 0 : color.red) : color.r);
        var g = (isNaN(color.g) ? (isNaN(color.green) ? 0 : color.green) : color.g);
        var b = (isNaN(color.b) ? (isNaN(color.blue) ? 0 : color.blue) : color.b);
        var toHex = HexUtil.encodeInt;
        var aHex = toHex(a * 255);
        var rHex = toHex(r);
        var gHex = toHex(g);
        var bHex = toHex(b);
        return String((prefix || '#') + (a >= 1.0 ? '' : aHex) + rHex + gHex + bHex);
    },

    toHsl: function(color)
    {
        // TODO
    },

    toHsv: function(color)
    {
        // TODO
        // https://gist.github.com/felipesabino/5066336/revisions
    },

    toRgb: function(color)
    {
        return color;
    },

    toString: function()
    {
        return '{ r:' + String(color.r) + ', g:' + String(color.g) + ', b:' + String(color.b) + ', a:' + String(isNaN(color.a) ? 1.0 : color.a) + ' }';
    },

    toStringCSS: function(color)
    {
        return 'rgba(' + String(color.r) + ', ' + String(color.g) + ', ' + String(color.b) + ', ' + String(isNaN(color.a) ? 1.0 : color.a) + ')';
    }

};
    var ColorUtil = {

    cmyk: ColorCmykUtil,
    cmykToGrayscale: ColorCmykUtil.toGrayscale,
    cmykToHex: ColorCmykUtil.toHex,
    cmykToHsl: ColorCmykUtil.toHsl,
    cmykToHsv: ColorCmykUtil.toHsv,
    cmykToRgb: ColorCmykUtil.toRgb,

    grayscale: undefined,

    hex: ColorHexUtil,
    hexToCmyk: ColorHexUtil.toCmyk,
    hexToGrayscale: ColorHexUtil.toGrayscale,
    hexToHsl: ColorHexUtil.toHsl,
    hexToHsv: ColorHexUtil.toHsv,
    hexToRgb: ColorHexUtil.toRgb,

    hsl: undefined,

    hsv: undefined,

    rgb: ColorRgbUtil,
    rgbToCmyk: ColorRgbUtil.toCmyk,
    rgbToGrayscale: ColorRgbUtil.toGrayscale,
    rgbToHex: ColorRgbUtil.toRgb,
    rgbToHsl: ColorRgbUtil.toHsl,
    rgbToHsv: ColorRgbUtil.toHsv

};
    var DateUtil = {

    now: function()
    {
        return new Date().getTime();
    },

    yyyymmdd: function(date)
    {
        var d = (date || new Date());
        var yy = d.getFullYear();
        var mm = d.getMonth() + 1; // getMonth() is zero-based
        var dd = d.getDate();

        return [
            String(yy),
            (mm > 9 ? '' : '0') + String(mm),
            (dd > 9 ? '' : '0') + String(dd)
        ].join('');
    }
};
    var FunctionUtil = {

    args: function(argumentObj, sliceIndex)
    {
        return [].slice.call(argumentObj, (sliceIndex || 0));
    },

    bind: function(scope, func)
    {
        var args = FunctionUtil.args(arguments, 2);
        return FunctionUtil.wrap(scope, func, args);
    },

    call: function(scope, func)
    {
        if (typeof(func) === 'function') {
            return null;
        }

        var args = FunctionUtil.args(arguments, 2);
        var value = func.apply(scope, args);
        return value;
    },

    delay: function(scope, func, milliseconds)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.wrap(scope, func, args);
        var timeoutID = setTimeout(wrapper, milliseconds);
        return {
            cancel: function() {
                clearTimeout(timeoutID);
            },
            f: wrapper,
            id: timeoutID
        };
    },

    memoize: function(scope, func)
    {
        var cache = {};

        return function()
        {
            var args = FunctionUtil.args(arguments, 0);
            var key = String(args);
            if(!(key in cache)){
                cache[key] = func.apply(scope, args);
            }
            return cache[key];
        };
    },

    noop: function()
    {
    },

    repeat: function(scope, func, milliseconds)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.wrap(scope, func, args);
        var intervalID = setInterval(wrapper, milliseconds);
        return {
            cancel: function() {
                clearInterval(intervalID);
            },
            f: wrapper,
            id: timeoutID
        };
    },

    wrap: function(scope, func, args)
    {
        return function(){
            func.apply(scope, args);
        };
    }
};
    var PointUtil = {

    add: function(a, b)
    {
        return {
            x: (a.x + b.x),
            y: (a.y + b.y)
        };
    },

    angle: function(a, b)
    {
        var angle = TrigoUtil.angleD((b.y - a.y), (b.x - a.x));
        return TrigoUtil.cycleD(angle);
    },

    cross: function(a, b)
    {
        // z coordinate of the cross product; x and y coordinates are zero
        return ((a.y * b.x) - (a.x * b.y));
    },

    distance: function(a, b)
    {
        var dX = (b.x - a.x);
        var dY = (b.y - a.y);
        return Math.sqrt((dX * dX) + (dY * dY));
    },

    dot: function(a, b)
    {
        return ((a.x * b.x) + (a.y * b.y));
    },

    equals: function(a, b)
    {
        return ((a.x === b.x) && (a.y === b.y));
    },

    interpolate: function(a, b, t)
    {
        var f = MathUtil.interpolate.linear;
        return {
            x: f(a.x, b.x, t),
            y: f(a.y, b.y, t)
        };
    },

    project: function(p, distance, angle)
    {
        return {
            x: (p.x + (distance * TrigoUtil.cosD(angle))),
            y: (p.y + (distance * TrigoUtil.sinD(angle)))
        }
    },

    rotate: function(p, angle, pivot)
    {
        var pointPivot = (pivot || { x:0.0, y:0.0 });
        var pointRel = PointUtil.subtract(p, pointPivot);
        var angleCos = Trigo.cosD(angle);
        var angleSin = Trigo.sinD(angle);
        var pointRot = {
            x: (pointRel.x * angleCos) - (pointRel.y * angleSin),
            y: (pointRel.x * angleSin) + (pointRel.y * angleCos)
        };
        var pointAbs = PointUtil.add(pointRot, pointPivot);
        return pointAbs;
    },

    scale: function(p, amount)
    {
        return {
            x: (a.x * amount),
            y: (a.y * amount)
        };
    },

    subtract: function(a, b)
    {
        return {
            x: (a.x - b.x),
            y: (a.y - b.y)
        };
    },

    translate: function(p, x, y)
    {
        p.x += x;
        p.y += y;
        return p;
    }

};
    var GeomUtil = {

    point: PointUtil

};
    var HexUtil = {

    decodeInt: function(s)
    {
        return parseInt(s, 16);
    },

    encodeInt: function(n)
    {
        var hex = Math.round(n).toString(16).toUpperCase();
        return (hex.length == 1 ? '0' + hex : hex);
    }
};
    var JSONUtil = {

    decode: function(str)
    {
        // http://qnimate.com/json-parse-throws-unexpected-token-error-for-valid-json/
        // str = str.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\f/g, '\\f');
        return JSON.parse(str);
    },

    encode: function(obj)
    {
        return JSON.stringify(obj);
    }
};
    var InterpolationUtil = {

    bilinear: function(a, b, c, d, u, v)
    {
        return linear(linear(a, b, u), linear(c, d, u), v);
    },

    linear: function(a, b, t)
    {
        // return (a + ((b - a) * t));
        return (a * (1.0 - t)) + (b * t);
    },

    multilinear: function(list, t)
    {
        var s = scalar((list.length - 1), t);
        var i = s.index;
        return linear(list[i], list[(i + 1)], s.t);
    },

    scalar: function(parts, t)
    {
        var tScaled = (t * parts);
        var tScaledIndex = Math.floor(tScaled);

        var tMinIndex = 0;
        var tMaxIndex = (parts - 1);

        var tIndex = MathUtil.constrain(tScaledIndex, tMinIndex, tMaxIndex);
        var tReduced = (tScaled - tIndex);

        return { index:tIndex, t:tReduced };
    }

};
    var TrigoUtil = {

    DEG_0: 0.0,
    DEG_90: 90.0,
    DEG_180: 180.0,
    DEG_270: 270.0,
    DEG_360: 360.0,

    DEG_TO_RAD: (Math.PI / 180.0), // 0.017453292519943295 DEG_TO_RAD
    RAD_TO_DEG: (180.0 / Math.PI),

    acosD: function(rad)
    {
        return Math.acos(rad) * TrigoUtil.RAD_TO_DEG;
    },

    angleD: function(y, x)
    {
        return Math.atan2(y, x) * TrigoUtil.RAD_TO_DEG;
    },

    angleR: function(y, x)
    {
        return Math.atan2(y, x);
    },

    asinD: function(rad)
    {
        return Math.asin(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atanD: function(rad)
    {
        return Math.atan(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atanD2: function(y, x)
    {
        return Math.atan2(y, x) * TrigoUtil.RAD_TO_DEG;
    },

    // cycleD: function(deg)
    // {
    //     return MathUtil.cycle(deg, TrigoUtil.DEG_360);
    // },

    cosD: function(deg)
    {
        return Math.cos(deg * TrigoUtil.DEG_TO_RAD);
    },

    degToRad: function(deg)
    {
        return (deg * TrigoUtil.DEG_TO_RAD);
    },

    fastD: function(degFrom, degTo)
    {
        var degDiff = (degTo - degFrom);
        return (degDiff > TrigoUtil.DEG_180 ? (-TrigoUtil.DEG_360 + degDiff) : (degDiff < -TrigoUtil.DEG_180 ? (TrigoUtil.DEG_360 + degTo) : degTo));
    },

    hypo: function(distanceX, distanceY)
    {
        return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    },

    radToDeg: function(rad)
    {
        return (rad * TrigoUtil.RAD_TO_DEG);
    },

    sinD: function(deg)
    {
        return Math.sin(deg * TrigoUtil.DEG_TO_RAD);
    },

    tanD: function(deg)
    {
        return Math.tan(deg * TrigoUtil.DEG_TO_RAD);
    }

};
    var MathUtil = {

    average: function(values)
    {
        return (MathUtil.summation(values) / values.length);
    },

    constrain: function(n, a, b)
    {
        return Math.min(Math.max(n, Math.min(a, b)), Math.max(a, b));
    },

    cycle: function(n, cycleLength)
    {
        return (((n % cycleLength) + cycleLength) % cycleLength);
    },

    factorial: function(n)
    {
        var f = 1;
        for (var i = f; i <= n; i++) {
            f *= i;
        }
        return f;
    },

    gcd: function(a, b)
    {
        if (a == b) {
            return a;
        }
        if (a < b) {
            a ^= b;
            b ^= a;
            a ^= b;
        }
        return MathUtil.gcd((a - b), b);
    },

    interpolation: InterpolationUtil,

    lcm: function(a, b)
    {
        return (a * b / (MathUtil.gcd(a, b)));
    },

    map: function(n, a, b, c, d)
    {
        return InterpolationUtil.linear(c, d, MathUtil.normalize(n, a, b));
    },

    nearest: function(n, a, b)
    {
        return (Math.abs(n - a) <= Math.abs(n - b) ? a : b);
    },

    normalize: function(n, a, b)
    {
        return MathUtil.constrain((n - a) / (b - a), 0.0, 1.0);
    },

    proportion: function(a, b, x, y)
    {
        //a : b = x : y
        if (isNaN(a)) {
            return ((b * x) / y);
        }
        else if (isNaN(b)) {
            return ((a * y) / x);
        }
        else if (isNaN(x)) {
            return ((y * a) / b);
        }
        else if (isNaN(y)) {
            return ((x * b) / a);
        }
        return Number.NaN;
    },

    roundDecimals: function(n, decimalsPlaces)
    {
        return Number(n.toFixed((decimalsPlaces || 2)));
    },

    roundToMultiple: function(n, multiplier)
    {
        return (Math.round(n / multiplier) * multiplier);
    },

    roundToNearest: function(n, values, returnIndex)
    {
        var a = ArrayUtil.sortNumerically(values.concat());
        var f = MathUtil.nearest;
        var i, j, k = a.length;

        if (k == 0) {
            return Number.NaN;
        }
        else if (k == 1) {
            return a[0];
        }
        else if (k == 2) {
            return f(n, a[0], a[1]);
        }
        else if (k > 2) {
            i = 0;
            j = (k - 1);
            while (j < k) {
                i = int((j + k) / 2.0);

                if (n < a[i]) {
                    k = i;
                }
                else if (n > a[(i + 1)]) {
                    j = (i + 1);
                }
                else {
                    break;
                }
            }
            j = Math.min((i + 1), (a.length - 1));
            return f(n, a[i], a[j]);
        }
    },

    roundToPower: function(n, base)
    {
        return MathUtil.power(base, Math.ceil(Math.log(n) / Math.log(base)));
    },

    sign: function(n)
    {
        return (n >= 0.0 ? 1 : -1);
    },

    summation: function(values)
    {
        var s = 0.0;
        for (i = 0, j = values.length; i < j; i++) {
            s += values[i];
        }
        return s;
    },

    trigo: TrigoUtil

};
    var NumberUtil = {

    isBetween: function(n, min, max)
    {
        return (n >= min && n <= max);
    },

    isEven: function(n)
    {
        return ((n % 2.0) == 0.0);
    },

    isFloat: function(n)
    {
        return ((n % 1) !== 0);
    },

    isInt: function(n)
    {
        return ((n % 1) === 0);
    },

    isNegative: function(n)
    {
        return (n < 0.0);
    },

    isOdd: function(n)
    {
        return ((n % 2.0) != 0.0);
    },

    isPositive: function(n)
    {
        return (n >= 0.0);
    },

    isPrime: function(n)
    {
        if (!NumberUtil.isUint(n)) {
            return false;
        }

        if (n == 1 || (n % 2) == 0) {
            return false;
        }

        if (n == 2) {
            return true;
        }

        for (var i = 3; (i * i) <= n; i += 2) {
            if((n % i) == 0){
                return false;
            }
        }

        return true;
    },

    isUint: function(n)
    {
        return (((n % 1) === 0) && (n >= 0));
    }

};
    var ObjectUtil = {

    assign: function(obj)
    {
        // https://stackoverflow.com/questions/41746946/assign-to-object-passed-as-argument-in-es5
        // if (obj == null) {
        //     throw new TypeError('Cannot convert undefined or null to object');
        // }

        obj = Object(obj);

        var args = FunctionUtil.args(arguments);
        for (var i = 1, j = args.length; i < j; i++) {
            var source = args[i];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        obj[key] = source[key];
                    }
                }
            }
        }

        return obj;
    },

    clean: function(obj)
    {
        var key, val;
        for (key in obj) {
            val = obj[key];
            if (val === '' || val === null || val === undefined) {
                delete obj[key];
            }
        }
        return obj;
    },

    clone: function(obj)
    {
        // TODO
        return null;
    },

    decodeBase64: function(str)
    {
        return JSONUtil.decode(Base64Util.decode(str));
    },

    encodeBase64: function(obj)
    {
        return Base64Util.encode(JSONUtil.encode(obj));
    },

    equals: function(obj1, obj2)
    {
        if (obj1 === obj2 || Object.is(obj1, obj2)) {
            return true;
        }

        var key, val1, val2, type1, type2;

        type1 = TypeUtil.of(obj1);
        type2 = TypeUtil.of(obj2);

        if (type1 !== type2) {
            return false;
        }

        if (type1 !== 'array' && type1 !== 'object') {
            return String(obj1) == String(obj2);
        }

        for (key in obj2)
        {
            if (!(key in obj1)) {
                return false;
            }
        }

        for (key in obj1)
        {
            val1 = obj1[key];
            val2 = obj2[key];

            if (Object.is(obj1, val1) || Object.is(obj2, val2) || Object.is(val1, val2) || val1 === val2) {
                continue;
            }

            if (String(val1) != String(val2)) {
                return false;
            }

            type1 = TypeUtil.of(val1);
            type2 = TypeUtil.of(val2);

            if (type1 !== type2) {
                return false;
            }

            if (type1 === 'array' || type1 === 'object') {
                if (!ObjectUtil.equals(val1, val2)) {
                    return false;
                }
            }
        }

        return true;
    },

    keys: function(obj, sorted)
    {
        var k = Object.keys(obj);
        if (sorted === true) {
            k.sort();
        }
        return k;
    },

    keypath: {

        get: function(obj, path, defaultValue)
        {
            var keys = path.split('.');
            var key;
            var cursor = obj;
            for (var i = 0, j = keys.length; i < j; i++) {
                key = keys[i];
                cursor = cursor[key];
            }
            return ((cursor !== undefined) ? cursor : defaultValue);
        },

        set: function(obj, path, value)
        {
            var keys = path.split('.');
            var key;
            var cursor = obj;
            for (var i = 0, j = keys.length; i < j; i++) {
                key = keys[i];
                if (i < (j - 1)) {
                    cursor[key] = (cursor[key] || {});
                } else {
                    cursor[key] = value;
                }
                cursor = cursor[key];
            }
        }
    },

    length: function(obj)
    {
        return ObjectUtil.keys(obj).length;
    },

    merge: function(obj1, obj2, obj3)
    {
        var obj = {};
        var objs = FunctionUtil.args(arguments);
        var i, j, k;
        for (i = 0, j = objs.length; i < j; i++) {
            for (k in objs[i]) {
                obj[k] = objs[i][k];
            }
        }
        return obj;
    },

    values: function(obj, sorted)
    {
        var keys = ObjectUtil.keys(obj, sorted);
        var vals = [];
        for (var i = 0, j = keys.length; i < j; i++) {
            vals.push(obj[keys[i]]);
        }
        return vals;
    }

};
    var RandomUtil = {

    argument: function()
    {
        var args = FunctionUtil.args(arguments);
        return RandomUtil.element(args);
    },

    bit: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : 0);
    },

    boolean: function(chance)
    {
        return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
    },

    color: function()
    {
        return RandomUtil.integer(0, 0xFFFFFF);
    },

    element: function(array)
    {
        return array[RandomUtil.index(array)];
    },

    float: function(min, max)
    {
        return min + (Math.random() * (max - min));
    },

    index: function(array)
    {
        return RandomUtil.integer(0, array.length - 1);
    },

    integer: function(min, max)
    {
        return Math.floor(Math.round(RandomUtil.float(min - 0.5, max + 0.5)));
    },

    sign: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : -1);
    },

    string: function(length, charset)
    {
        charset = (charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*(-_=+).,;');
        var c = charset.split('');
        var r = RandomUtil.element;
        var i = 0;
        var s = '';
        while (i++ < length) {
            s += r(c);
        }
        return s;
    }
};
    var StringUtil = {

    // endsWith
    // reverse
    // startsWith
    // toRandomCase
    // toUpperCaseFirst
    // trim
    // trimLeft
    // trimRight

    contains: function(str, occurrence)
    {
        if (str.length == 0){
            return false;
        }
        return Boolean(str.indexOf(occurrence) > -1);
    },

    icontains: function(str, occurrence)
    {
        if (str.length == 0){
            return false;
        }
        return StringUtil.contains(str.toLowerCase(), occurrence.toLowerCase());
    },

    levenshteinDistance: function(a, b)
    {
        // http://www.emanueleferonato.com/2010/06/09/find-levenshtein-distance-with-as3/

        var i, j, m = [];

        var y = a.length;
        var x = b.length;

        for(i = 0; i <= y; i++)
        {
            m[i] = [];

            for(j = 0; j <= x; j++)
            {
                m[i].push((i != 0 ? 0 : j));
            }

            m[i][0] = i;
        }

        for(i = 1; i <= y; i++)
        {
            for(j = 1; j <= x; j++)
            {
                m[i][j] = Math.min((m[i - 1][j] + 1), (m[i][j - 1] + 1), (m[i - 1][j - 1] + Math.floor(a.charAt(i - 1) == b.charAt(j - 1))));
            }
        }

        return m[y][x];
    },

    levenshteinSimilarity: function(a, b)
    {
        var d = StringUtil.levenshteinDistance(a, b);
        var l = Math.max(a.length, b.length);

        return ((l == 0) ? 1.0 : (1.0 - (d / l)));
    },

    padLeft: function(str, len, char)
    {
        var i = str.length
        while (i < len) {
            str = (char + str);
            i++;
        }
        return str;
    },

    padRight: function(str, len, char)
    {
        var i = str.length
        while (i < len) {
            str = (str + char);
            i++;
        }
        return str;
    },

    strip: function(str)
    {
        if (str.length == 0){
            return str;
        }
        return str.replace(/\s+/gm, '');
    },

    toLowerCaseFirst: function(str)
    {
    },

    toRandomCase: function(str)
    {
    },

    toUpperCaseFirst: function(str, toLowerCaseRest)
    {
        var f = str.substr(0, 1).toUpperCase();
        var r = str.substr(1);
        return (f + ((toLowerCaseRest === true) ? r.toLowerCase() : r));
    }

};
    var TypeUtil = {

    isArray: function(val)
    {
        // https://stackoverflow.com/questions/4775722/check-if-object-is-array
        if (Array.isArray) {
            return Array.isArray(val);
        }
        return (Object.prototype.toString.call(val) === '[object Array]');
    },

    isBase64: function(val)
    {
        if (TypeUtil.isString(val)) {
            try {
                Base64Util.decode(val);
                return true;
            }
            catch(e){
            }
        }
        return false;
    },

    isBoolean: function(val)
    {
        return (typeof(val) === 'boolean');
    },

    isDate: function(val)
    {
        return (Object.prototype.toString.call(val) === '[object Date]');
    },

    isError: function(val)
    {
        return (val instanceof Error);
    },

    isFunction: function(val)
    {
        return (typeof(val) === 'function');
    },

    isJSON: function(val)
    {
        if (TypeUtil.isString(val)) {
            try {
                JSONUtil.decode(val);
                return true;
            }
            catch(e){
            }
        }
        return false;
    },

    isObject: function(val)
    {
        return (typeof(val) === 'object');
    },

    isNumber: function(val)
    {
        return (typeof(val) === 'number');
    },

    isNull: function(val)
    {
        return (val === null);
    },

    isRegExp: function(val)
    {
        return (val instanceof RegExp);
    },

    isString: function(val)
    {
        return (typeof(val) === 'string');
    },

    isUndefined: function(val)
    {
        return (typeof(val) === 'undefined');
    },

    isXML: function(val)
    {
        // TODO
        return false;
    },

    of: function(val)
    {
        if (TypeUtil.isArray(val)) {
            return 'array';
        }
        else if (TypeUtil.isBoolean(val)) {
            return 'boolean';
        }
        else if (TypeUtil.isDate(val)) {
            return 'date';
        }
        else if (TypeUtil.isError(val)) {
            return 'error';
        }
        else if (TypeUtil.isFunction(val)) {
            return 'function';
        }
        else if (TypeUtil.isNumber(val)) {
            return 'number';
        }
        else if (TypeUtil.isNull(val)) {
            return 'null';
        }
        else if (TypeUtil.isObject(val)) {
            return 'object';
        }
        else if (TypeUtil.isRegExp(val)) {
            return 'regexp';
        }
        else if (TypeUtil.isString(val)) {
            return 'string';
        }
        else if (TypeUtil.isUndefined(val)) {
            return 'undefined';
        }
        else if (TypeUtil.isXML(val)) {
            return 'xml';
        }
        else {
            return undefined;
        }
    }

};
    var URLUtil = {

    getParameterByName: function(name, url)
    {
        var param = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)');
        var results = regex.exec((url || URLUtil.getURL()));
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2]);
    },

    getParameters: function(url)
    {
        // TODO
        return {};
    },

    getURL: function()
    {
        return window.location.href;
    },

    isFile: function(url)
    {
        return ((url || URLUtil.getURL()).indexOf('file://') === 0);
    },

    isHttp: function(url)
    {
        return ((url || URLUtil.getURL()).indexOf('http://') === 0);
    },

    isHttps: function(url)
    {
        return ((url || URLUtil.getURL()).indexOf('https://') === 0);
    },

    isLocalhost: function(url)
    {
        // http://localhost
        // http://localhost/
        // http://localhost:8000
        // http://localhost:8000/
        // http://127.0.0.1
        // http://127.0.0.1/
        // http://127.0.0.1:8000
        // http://127.0.0.1:8000/
        // https://localhost
        // https://localhost/
        // https://localhost:8000
        // https://localhost:8000/
        // https://127.0.0.1
        // https://127.0.0.1/
        // https://127.0.0.1:8000
        // https://127.0.0.1:8000/
        // http://localhost
        // http://localhost/
        // http://localhost:8000
        // http://localhost:8000/
        // http://localhost:8000/
        // http://127.0.0.1
        // http://127.0.0.1/
        // http://127.0.0.1:8000
        // http://127.0.0.1:8000/
        // https://localhost
        // https://localhost/
        // https://localhost:8000
        // https://localhost:8000/
        // https://localhosts
        // https://localhosts/
        // https://localhosts:8000
        // https://localhosts:8000/
        // https://localhosts:8000/index.html
        // https://localhost/
        // https://localhost:8000
        // https://localhost:8000/
        // https://localhost:8000/index.html
        // https://127.0.0.1
        // https://127.0.0.1/
        // https://127.0.0.1:8000
        // https://127.0.0.1:8000/index.html

        var re = /^(https?\:\/\/)(localhost|127\.0\.0\.1)(\:[\d]+)?(\/(.)*)?$/;
        return re.test((url || URLUtil.getURL()));
    }

};
    var XMLUtil = {

    removeNamespaces: function(str)
    {
        return str.replace(/(\<(.|\n)+?\>)/g, function(tag) {
            return tag.replace(/(\s|\<\/?){1}([\w]+\:){1}/g, '$1');
        });
    }
};

    var utils = {
        array: ArrayUtil,
        base64: Base64Util,
        color: ColorUtil,
        date: DateUtil,
        func: FunctionUtil,
        geom: GeomUtil,
        hex: HexUtil,
        json: JSONUtil,
        math: MathUtil,
        number: NumberUtil,
        object: ObjectUtil,
        random: RandomUtil,
        string: StringUtil,
        type: TypeUtil,
        xml: XMLUtil,
        url: URLUtil
    };

    return utils;
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXG4gICAgaWYgKHR5cGVvZihkZWZpbmUpID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EXG4gICAgICAgIGRlZmluZSgnQGZhYmlvY2FjY2Ftby91dGlscy5qcycsIGZhY3RvcnkpO1xuICAgICAgICBkZWZpbmUoJ0BmYWJpb2NhY2NhbW8vdXRpbHMnLCBmYWN0b3J5KTtcbiAgICAgICAgZGVmaW5lKCd1dGlscycsIGZhY3RvcnkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YobW9kdWxlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBTY3JpcHQgdGFnIGltcG9ydCBpLmUuLCBJSUZFXG4gICAgICAgIHJvb3QudXRpbHMgPSBmYWN0b3J5KCk7XG4gICAgICAgIHJvb3QudSA9IGZhY3RvcnkoKTtcbiAgICB9XG5cbn0odGhpcywgZnVuY3Rpb24oKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBAaW1wb3J0ICcuL3V0aWxzL0FycmF5VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0Jhc2U2NFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9jb2xvci9Db2xvckNteWtVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvY29sb3IvQ29sb3JIZXhVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvY29sb3IvQ29sb3JSZ2JVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvQ29sb3JVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvRGF0ZVV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9GdW5jdGlvblV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9nZW9tL1BvaW50VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0dlb21VdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvSGV4VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0pTT05VdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvbWF0aC9JbnRlcnBvbGF0aW9uVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL21hdGgvVHJpZ29VdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvTWF0aFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9OdW1iZXJVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvT2JqZWN0VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1JhbmRvbVV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9TdHJpbmdVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvVHlwZVV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9VUkxVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvWE1MVXRpbC5qcydcblxuICAgIHZhciB1dGlscyA9IHtcbiAgICAgICAgYXJyYXk6IEFycmF5VXRpbCxcbiAgICAgICAgYmFzZTY0OiBCYXNlNjRVdGlsLFxuICAgICAgICBjb2xvcjogQ29sb3JVdGlsLFxuICAgICAgICBkYXRlOiBEYXRlVXRpbCxcbiAgICAgICAgZnVuYzogRnVuY3Rpb25VdGlsLFxuICAgICAgICBnZW9tOiBHZW9tVXRpbCxcbiAgICAgICAgaGV4OiBIZXhVdGlsLFxuICAgICAgICBqc29uOiBKU09OVXRpbCxcbiAgICAgICAgbWF0aDogTWF0aFV0aWwsXG4gICAgICAgIG51bWJlcjogTnVtYmVyVXRpbCxcbiAgICAgICAgb2JqZWN0OiBPYmplY3RVdGlsLFxuICAgICAgICByYW5kb206IFJhbmRvbVV0aWwsXG4gICAgICAgIHN0cmluZzogU3RyaW5nVXRpbCxcbiAgICAgICAgdHlwZTogVHlwZVV0aWwsXG4gICAgICAgIHhtbDogWE1MVXRpbCxcbiAgICAgICAgdXJsOiBVUkxVdGlsXG4gICAgfTtcblxuICAgIHJldHVybiB1dGlscztcbn0pKTsiXX0=
