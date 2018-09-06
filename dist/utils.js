(function (root, factory) {

    if (typeof(define) === 'function' && define.amd) {
        // AMD
        define('@fabiocaccamo/utils.js', factory);
        define('@fabiocaccamo/utils', factory);
        define('utils.js', factory);
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

    clean: function(list, hard)
    {
        var items = list.slice();
        items = items.filter(function(item, index, arr){
            return (!TypeUtil.isNone(item));
        });
        if (hard === true) {
            items = items.map(function(item, index, arr) {
                switch (TypeUtil.of(item)) {
                    case TypeUtil.ARRAY:
                        return ArrayUtil.clean(item, hard);
                    case TypeUtil.OBJECT:
                        return ObjectUtil.clean(item, hard);
                    default:
                        return item;
                }
            }).filter(function(item, index, arr){
                return TypeUtil.isSetAndNotEmpty(item);
            });
        }
        return items;
    },

    equals: function(listA, listB)
    {
        return ObjectUtil.equals(listA, listB);
    },

    flatten: function(list)
    {
        var items = [];
        for (var i = 0, j = list.length; i < j; i++) {
            if (TypeUtil.isArray(list[i])) {
                items.push.apply(items, ArrayUtil.flatten(list[i]));
            } else {
                items.push(list[i]);
            }
        }
        return items;
    },

    index: function(list, keys, flat)
    {
        var dict = {}, item, key, val;

        if (TypeUtil.isString(keys)) {
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

    paginate: function(list, itemsPerPage)
    {
        var itemsTotal = list.length;
        var pagesTotal = (itemsPerPage > 0 ? Math.ceil(itemsTotal / itemsPerPage) : 0);
        var pages = [];
        var i, j;
        for (i = 0, j = 0; i < pagesTotal; i++) {
            j = (i * itemsPerPage);
            pages[i] = list.slice(j, j + Math.min(itemsPerPage, itemsTotal));
        }
        return pages;
    },

    reduce: function(list, reducer, initialValue)
    {
        var value = (initialValue === undefined ? 0 : initialValue);
        for (var i = 0, j = list.length; i < j; i++) {
            value = reducer(value, list[i], i, list);
        }
        return value;
    },

    scroll: function(list, count)
    {
        var cursor = MathUtil.cycle(count, list.length);
        return list.slice(cursor).concat(list.slice(0, cursor));
    },

    shuffle: function(list)
    {
        var items = list.slice();
        var randomIndex;
        var randomItems;
        var sortedItems = list.length;
        while (sortedItems) {
            randomIndex = RandomUtil.integer(0, --sortedItems);
            randomItems = items.splice(randomIndex, 1);
            items.push.apply(items, randomItems);
        }
        return items;
    },

    sort: function(list, key)
    {
        var compare = function(a, b)
        {
            var aVal;
            var bVal;

            if (TypeUtil.isString(key)) {
                aVal = (key in a ? a[key] : a);
                bVal = (key in b ? b[key] : b);
            } else {
                aVal = a;
                bVal = b;
            }

            var aValIsNum = TypeUtil.isNumber(aVal);
            var bValIsNum = TypeUtil.isNumber(bVal);

            if (aValIsNum && bValIsNum) {
                return (aVal <= bVal ? -1 : 1);
            }
            else if (aValIsNum) {
                return -1;
            }
            else if (bValIsNum) {
                return 1;
            }
            else {
                var ab = [aVal, bVal];
                ab.sort();
                return (ab.indexOf(aVal) <= ab.indexOf(bVal) ? -1 : 1);
            }
        };

        return list.sort(compare);
    },

    unique: function(list)
    {
        var items = [];
        var itemsNotEquals = function(itemUnique){
            return !ObjectUtil.equals(item, itemUnique);
        };
        var item;
        for (var i = 0, j = list.length; i < j; i++) {
            item = list[i];
            if (items.every(itemsNotEquals)) {
                items.push(item);
            }
        }
        return items;
    },

    unzip: function(list)
    {
        return ArrayUtil.zip.apply(null, list);
    },

    zip: function(list1, list2)
    {
        var lists = FunctionUtil.args(arguments);
        var listLength = 0;
        lists.forEach(function(item) {
            listLength = (listLength == 0 ? item.length : Math.min(listLength, item.length));
        });
        var list = [];
        for (var i = 0; i < listLength; i++) {
            list[i] = [];
            for (var j = 0, k = lists.length; j < k; j++) {
                list[i][j] = lists[j][i];
            }
        }
        return list;
    }

};
    var Base64Util = {

    CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    CHARS_LIST: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '='
    ],
    CHARS_TABLE: {
        'A':  0, 'B':  1, 'C':  2, 'D':  3, 'E':  4, 'F':  5, 'G':  6, 'H':  7, 'I':  8, 'J':  9, 'K': 10, 'L': 11, 'M': 12,
        'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
        'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31, 'g': 32, 'h': 33, 'i': 34, 'j': 35, 'k': 36, 'l': 37, 'm': 38,
        'n': 39, 'o': 40, 'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45, 'u': 46, 'v': 47, 'w': 48, 'x': 49, 'y': 50, 'z': 51,
        '0': 52, '1': 53, '2': 54, '3': 55, '4': 56, '5': 57, '6': 58, '7': 59, '8': 60, '9': 61, '+': 62, '/': 63, '=': 64
    },

    decode: function(str)
    {
        var input = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        var output = '';

        try {
            output = window.atob(input);
            output = UTF8Util.decode(output);
            return output;
        } catch (e){
        }

        // var chars = Base64Util.CHARS;
        var chars = Base64Util.CHARS_TABLE;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;

        var i = 0;
        var j = input.length;

        while (i < j) {
            // enc1 = chars.indexOf(input.charAt(i++));
            // enc2 = chars.indexOf(input.charAt(i++));
            // enc3 = chars.indexOf(input.charAt(i++));
            // enc4 = chars.indexOf(input.charAt(i++));

            enc1 = chars[ input.charAt(i++) ];
            enc2 = chars[ input.charAt(i++) ];
            enc3 = chars[ input.charAt(i++) ];
            enc4 = chars[ input.charAt(i++) ];

            chr1 = ((enc1 << 2) | (enc2 >> 4));
            chr2 = (((enc2 & 15) << 4) | (enc3 >> 2));
            chr3 = (((enc3 & 3) << 6) | enc4);

            output += String.fromCharCode(chr1);

            if (enc3 != 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output += String.fromCharCode(chr3);
            }
        }

        output = UTF8Util.decode(output);

        return output;
    },

    encode: function(str)
    {
        var input = UTF8Util.encode(str);
        var output = '';

        try {
            output = window.btoa(input);
            return output;
        } catch (e){
        }

        // var chars = Base64Util.CHARS;
        var chars = Base64Util.CHARS_LIST;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;

        var i = 0;
        var j = input.length;

        while (i < j) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = (chr1 >> 2);
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = (chr3 & 63);

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            // output += (chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4));
            output += (chars[enc1] + chars[enc2] + chars[enc3] + chars[enc4]);
        }

        return output;
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

    // grayscale: ColorGrayscaleUtil,
    // grayscaleToGrayscale: ColorGrayscaleUtil.toGrayscale,
    // grayscaleToHex: ColorGrayscaleUtil.toHex,
    // grayscaleToHsl: ColorGrayscaleUtil.toHsl,
    // grayscaleToHsv: ColorGrayscaleUtil.toHsv,
    // grayscaleToRgb: ColorGrayscaleUtil.toRgb,

    hex: ColorHexUtil,
    hexToCmyk: ColorHexUtil.toCmyk,
    hexToGrayscale: ColorHexUtil.toGrayscale,
    hexToHsl: ColorHexUtil.toHsl,
    hexToHsv: ColorHexUtil.toHsv,
    hexToRgb: ColorHexUtil.toRgb,

    // hsl: ColorHslUtil,
    // hslToGrayscale: ColorHslUtil.toGrayscale,
    // hslToHex: ColorHslUtil.toHex,
    // hslToHsl: ColorHslUtil.toHsl,
    // hslToHsv: ColorHslUtil.toHsv,
    // hslToRgb: ColorHslUtil.toRgb,

    // hsv: ColorHsvUtil,
    // hsvToGrayscale: ColorHsvUtil.toGrayscale,
    // hsvToHex: ColorHsvUtil.toHex,
    // hsvToHsl: ColorHsvUtil.toHsl,
    // hsvToHsv: ColorHsvUtil.toHsv,
    // hsvToRgb: ColorHsvUtil.toRgb,

    rgb: ColorRgbUtil,
    rgbToCmyk: ColorRgbUtil.toCmyk,
    rgbToGrayscale: ColorRgbUtil.toGrayscale,
    rgbToHex: ColorRgbUtil.toRgb,
    rgbToHsl: ColorRgbUtil.toHsl,
    rgbToHsv: ColorRgbUtil.toHsv

};
    var DateUtil = {

    timestamp: function()
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
    var EaseUtil = {

    backIn: function(t, s)
    {
        // s = overshoot = 1.70158
        s = (isNaN(s) ? 1.70158 : s);
        return t * t * (((s + 1.0) * t) - s);
    },

    backInOut: function(t, s)
    {
        // s = overshoot = 1.70158
        s = (isNaN(s) ? 1.70158 : s);
        if ((t /= 0.5) < 1.0) {
            return 0.5 * (t * t * (((s *= (1.525)) + 1.0) * t - s));
        } else {
            return 0.5 * ((t -= 2.0) * t * (((s *= (1.525)) + 1.0) * t + s) + 2.0);
        }
    },

    backOut: function(t, s)
    {
        // s = overshoot = 1.70158
        s = (isNaN(s) ? 1.70158 : s);
        return (t -= 1.0) * t * (((s + 1.0) * t) + s) + 1.0;
    },

    bounceIn: function(t)
    {
        t = (1.0 - t);

        if (t < (1.0 / 2.75)) {
            return 1.0 - (7.5625 * t * t);
        }
        else if (t < (2.0 / 2.75)) {
            return 1.0 - (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
        }
        else if (t < (2.5 / 2.75)) {
            return 1.0 - (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
        }
        else {
            return 1.0 - (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
        }
    },

    bounceInOut: function(t)
    {
        if (t < 0.5) {
            t = (1.0 - t);

            if (t < (1.0 / 2.75)) {
                return 1.0 - (7.5625 * t * t);
            }
            else if (t < (2.0 / 2.75)) {
                return 1.0 - (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
            }
            else if (t < (2.5 / 2.75)) {
                return 1.0 - (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
            }
            else {
                return 1.0 - (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
            }
        } else {
            if (t < (1.0 / 2.75)) {
                return (7.5625 * t * t);
            }
            else if (t < (2.0 / 2.75)) {
                return (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
            }
            else if (t < (2.5 / 2.75)) {
                return (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
            }
            else {
                return (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
            }
        }
    },

    bounceOut: function(t)
    {
        if (t < (1.0 / 2.75)) {
            return (7.5625 * t * t);
        }
        else if (t < (2.0 / 2.75)) {
            return (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
        }
        else if (t < (2.5 / 2.75)) {
            return (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
        }
        else {
            return (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
        }
    },

    circularIn: function(t)
    {
        return -(Math.sqrt(1.0 - t * t) - 1.0);
    },

    circularInOut: function(t)
    {
        if((t /= 0.5) < 1.0){
            return -0.5 * (Math.sqrt(1.0 - t * t) - 1.0);
        }

        return 0.5 * (Math.sqrt(1.0 - (t -= 2.0) * t) + 1.0);
    },

    circularOut: function(t)
    {
        return Math.sqrt(1.0 - ((t -= 1.0) * t));
    },

    cubicIn: function(t)
    {
        return (t * t * t);
    },

    cubicInOut: function(t)
    {
        if ((t /= 0.5) < 1.0){
            return 0.5 * t * t * t;
        }

        return 0.5 * ((t -= 2.0) * t * t + 2.0);
    },

    cubicOut: function(t)
    {
        return (t -= 1.0) * t * t + 1.0;
    },

    elasticIn: function(t, a, p)
    {
        // a = amplitude = 0.0, p = period = 0.3

        if (t == 0.0) {
            return 0.0;
        }
        if (t == 1.0) {
            return 1.0;
        }

        a = (isNaN(a) ? 0.0 : a);
        p = (isNaN(p) ? 0.3 : p);

        var s;

        if (a < 1.0) {
            a = 1.0;
            s = (p / 4.0);
        } else {
            s = (p / (2.0 * Math.PI) * Math.asin(1.0 / a));
        }
        return -(a * Math.pow(2.0, 10.0 * (t -= 1.0)) * Math.sin((t - s) * (2.0 * Math.PI) / p));
    },

    elasticInOut: function(t, a, p)
    {
        // a = amplitude = 0.0, p = period = 0.3

        if (t == 0.0) {
            return 0.0;
        }
        if ((t /= 0.5) == 2.0) {
            return 1.0;
        }

        a = (isNaN(a) ? 0.0 : a);
        p = (isNaN(p) ? 0.3 : p);

        var s;

        if (p == 0.3) {
            p *= 1.5;
        }
        if (a < 1.0) {
            a = 1.0;
            s = (p / 4.0);
        } else {
            s = (p / (2.0 * Math.PI) * Math.asin(1.0 / a));
        }
        if (t < 1.0) {
            return -0.5 * (a * Math.pow(2.0, 10.0 * (t -= 1.0)) * Math.sin((t - s) * (2.0 * Math.PI) / p));
        }
        return a * Math.pow(2.0, -10.0 * (t -= 1.0)) * Math.sin((t - s) * (2.0 * Math.PI) / p) * 0.5 + 1.0;
    },

    elasticOut: function(t, a, p)
    {
        // a = amplitude = 0.0, p = period = 0.3

        if (t == 0.0) {
            return 0.0;
        }
        if (t == 1.0) {
            return 1.0;
        }

        a = (isNaN(a) ? 0.0 : a);
        p = (isNaN(p) ? 0.3 : p);

        var s;

        if (a < 1.0) {
            a = 1.0;
            s = (p / 4.0);
        } else {
            s = (p / (2.0 * Math.PI) * Math.asin(1.0 / a));
        }
        return (a * Math.pow(2.0, (-10.0 * t)) * Math.sin((t - s) * (2.0 * Math.PI) / p) + 1.0);
    },

    exponentialIn: function(t)
    {
        if (t == 0.0) {
            return 0.0;
        }
        return Math.pow(2.0, (10.0 * (t - 1.0)));
    },

    exponentialInOut: function(t)
    {
        if (t == 0.0) {
            return 0.0;
        }
        if (t == 1.0) {
            return 1.0;
        }
        if ((t /= 0.5) < 1.0) {
            return 0.5 * Math.pow(2.0, 10.0 * (t - 1.0));
        }
        return 0.5 * (-Math.pow(2.0, -10.0 * (t -= 1.0)) + 2.0);
    },

    exponentialOut: function(t)
    {
        if (t == 1.0) {
            return t;
        }
        return -Math.pow(2.0, (-10.0 * t)) + 1.0;
    },

    none: function(t)
    {
        return t;
    },

    quadraticIn: function(t)
    {
        return (t * t);
    },

    quadraticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t;
        }
        return -0.5 * ((t -= 1.0) * (t - 2.0) - 1.0);
    },

    quadraticOut: function(t)
    {
        return -t * (t - 2.0);
    },

    quarticIn: function(t)
    {
        return (t * t * t * t);
    },

    quarticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t * t * t;
        }
        return -0.5 * ((t -= 2.0) * t * t * t - 2.0);
    },

    quarticOut: function(t)
    {
        return -((t -= 1.0) * t * t * t - 1.0);
    },

    quinticIn: function(t)
    {
        return (t * t * t * t * t);
    },

    quinticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t * t * t * t;
        }
        return 0.5 * ((t -= 2.0) * t * t * t * t + 2.0);
    },

    quinticOut: function(t)
    {
        return (t -= 1.0) * t * t * t * t + 1.0;
    },

    sexticIn: function(t)
    {
        return (t * t * t * t * t * t);
    },

    sexticInOut: function(t)
    {
        if ((t /= 0.5) < 1.0) {
            return 0.5 * t * t * t * t * t * t;
        }
        return -0.5 * ((t -= 2.0) * t * t * t * t * t - 2.0);
    },

    sexticOut: function(t)
    {
        return -((t -= 1.0) * t * t * t * t * t - 1.0);
    },

    sineIn: function(t)
    {
        return -Math.cos(t * (Math.PI / 2.0)) + 1.0;
    },

    sineInOut: function(t)
    {
        return -0.5 * (Math.cos(Math.PI * t) - 1.0);
    },

    sineOut: function(t)
    {
        return Math.sin(t * (Math.PI / 2.0));
    },

    waveCosine: function(t, f, a, i)
    {
        // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
        f = (isNaN(f) ? 1.0 : f);
        a = (a === true ? true : false);
        i = (i === true ? true : false);

        var w = Math.cos(Math.PI * t * f);
        w = (a ? Math.abs(w) : w);
        w = (i ? (1.0 - w) : w);
        return w;
    },

    waveSawtooth: function(t, f, a, i)
    {
        // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
        f = (isNaN(f) ? 1.0 : f);
        a = (a === true ? true : false);
        i = (i === true ? true : false);

        var w = (t * f) % 1.0;
        w = (a ? Math.abs(w) : w);
        w = (i ? (1.0 - w) : w);
        return w;
    },

    waveSine: function(t, f, a, i)
    {
        // t, f = frequency = 1.0, a = absolute = false, i = inverse = false
        f = (isNaN(f) ? 1.0 : f);
        a = (a === true ? true : false);
        i = (i === true ? true : false);

        var w = Math.sin(Math.PI * t * f);
        w = (a ? Math.abs(w) : w);
        w = (i ? (1.0 - w) : w);
        return w;
    }

};
    var FunctionUtil = {

    args: function(argumentsObj, skipCount)
    {
        return [].slice.call(argumentsObj, (skipCount || 0));
    },

    attempt: function(func, scope)
    {
        try {
            var args = FunctionUtil.args(arguments);
            var result = FunctionUtil.call.apply(null, args);
            return result;
        }
        catch(e) {
            return e;
        }
    },

    bind: function(func, scope)
    {
        var args = FunctionUtil.args(arguments);
        return function(){
            var result = FunctionUtil.call.apply(null, args);
            return result;
        };
    },

    call: function(func, scope)
    {
        if (TypeUtil.isString(func)) {
            func = scope[func];
        }
        var args = FunctionUtil.args(arguments, 2);
        var result = func.apply(scope, args);
        return result;
    },

    delay: function(milliseconds, func, scope)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.bind.apply(null, [func, scope].concat(args));
        var timeoutId = setTimeout(wrapper, milliseconds);
        return {
            cancel: function() {
                clearTimeout(timeoutId);
            },
            func: wrapper,
            id: timeoutId
        };
    },

    memoize: function(func, scope)
    {
        var cache = {};

        return function()
        {
            var args = FunctionUtil.args(arguments);
            var key = String(args);
            if (!(key in cache)) {
                cache[key] = FunctionUtil.call.apply(null, [func, scope].concat(args));
            }
            return cache[key];
        };
    },

    noop: function()
    {
        return true;
    },

    repeat: function(milliseconds, func, scope)
    {
        var args = FunctionUtil.args(arguments, 3);
        var wrapper = FunctionUtil.bind.apply(null, [func, scope].concat(args));
        var intervalId = setInterval(wrapper, milliseconds);
        return {
            cancel: function() {
                clearInterval(intervalId);
            },
            func: wrapper,
            id: intervalId
        };
    },

    validate: function(argumentsObj)
    {
        // FunctionUtil.validate(arguments, 'number', 'string', ['string', 'undefined']);

        var args = FunctionUtil.args(argumentsObj);
        var types = FunctionUtil.args(arguments, 1);

        var i, j, k, n;

        for (i = 0, j = types.length; i < j; i++) {
            if (!TypeUtil.isArray(types[i])) {
                types[i] = [types[i]];
            }
        }

        var argsExpectedCount = types.length;
        while (argsExpectedCount > 0) {
            if (types[(argsExpectedCount - 1)].indexOf('undefined') === -1) {
                break;
            }
            argsExpectedCount--;
        }
        if (args.length < argsExpectedCount) {
            throw new TypeError('invalid arguments count: received ' + args.length + ', expected ' + argsExpectedCount + ' arguments.');
        }

        for (i = 0, j = types.length; i < j; i++) {
            for (k = 0, n = types[i].length; k < n; k++) {
                if (!TypeUtil.isType(types[i][k])) {
                    throw new TypeError('invalid argument: expected type "' + String(types[i][k]) + '" is not a valid type.');
                }
            }
        }

        var arg, argType, argTypes;
        for (i = 0, j = args.length; i < j; i++) {
            arg = args[i];
            argType = TypeUtil.of(args[i]);
            argTypes = types[Math.min(i, (types.length - 1))];
            if (argTypes.indexOf(argType) == -1) {
                throw new TypeError('invalid argument: type of argument[' + i + '] is "' + argType + '", expected "' + argTypes.join('" or "') + '".');
            }
        }
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
    var InterpolationUtil = {

    bilinear: function(a, b, c, d, u, v)
    {
        var f = InterpolationUtil.linear;
        return f(f(a, b, u), f(c, d, u), v);
    },

    linear: function(a, b, t)
    {
        // return (a + ((b - a) * t));
        return (a * (1.0 - t)) + (b * t);
    },

    multilinear: function(list, t)
    {
        var s = InterpolationUtil.scalar((list.length - 1), t);
        var i = s.index;
        return InterpolationUtil.linear(list[i], list[(i + 1)], s.t);
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
    var JSONUtil = {

    decode: function(str)
    {
        // http://qnimate.com/json-parse-throws-unexpected-token-error-for-valid-json/
        // https://stackoverflow.com/questions/22200588/json-lint-says-its-valid-but-json-parse-throws-error/22200674
        // str = str.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\f/g, '\\f');
        return JSON.parse(str);
    },

    encode: function(obj)
    {
        return JSON.stringify(obj);
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

    lerp: function(a, b, t)
    {
        return InterpolationUtil.linear(a, b, t);
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
        // a : b = x : y
        if (!TypeUtil.isNumber(a)) {
            return ((b * x) / y);
        }
        else if (!TypeUtil.isNumber(b)) {
            return ((a * y) / x);
        }
        else if (!TypeUtil.isNumber(x)) {
            return ((y * a) / b);
        }
        else if (!TypeUtil.isNumber(y)) {
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
    }

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

    clean: function(obj, hard)
    {
        var key, val;
        for (key in obj) {
            val = obj[key];
            if (hard === true) {
                switch (TypeUtil.of(val)) {
                    case TypeUtil.ARRAY:
                        val = obj[key] = ArrayUtil.clean(val, hard);
                        break;
                    case TypeUtil.OBJECT:
                        val = obj[key] = ObjectUtil.clean(val, hard);
                        break;
                }
                if (!TypeUtil.isSetAndNotEmpty(val)) {
                    val = null;
                }
            }
            if (TypeUtil.isNone(val)) {
                delete obj[key];
                continue;
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

    map: function(obj, func)
    {
        var m = {};
        ObjectUtil.keys(obj).forEach(function(k) {
            m[k] = func.call(null, obj[k], k, obj);
        });
        return m;
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

    slugify: function(str)
    {
        var sep = '-';
        var chars = {
            // Latin
            'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
            'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I',
            'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O',
            'Õ': 'O', 'Ö': 'O', 'Ő': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U',
            'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH', 'ß': 'ss', 'à': 'a', 'á': 'a',
            'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e',
            'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
            'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
            'ő': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u',
            'ý': 'y', 'þ': 'th', 'ÿ': 'y', 'ẞ': 'SS', 'œ': 'oe', 'Œ': 'OE',
            // Greek
            'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h',
            'θ': '8', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3',
            'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f',
            'χ': 'x', 'ψ': 'ps', 'ω': 'w', 'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o',
            'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's', 'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y',
            'ΐ': 'i', 'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z',
            'Η': 'H', 'Θ': '8', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N',
            'Ξ': '3', 'Ο': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y',
            'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W', 'Ά': 'A', 'Έ': 'E', 'Ί': 'I',
            'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I', 'Ϋ': 'Y',
            // Turkish
            'ş': 's', 'Ş': 'S', 'ı': 'i', 'İ': 'I', 'ğ': 'g', 'Ğ': 'G',
            // Russian
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
            'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
            'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
            'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': 'u',
            'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B',
            'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z',
            'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
            'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H',
            'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': 'U', 'Ы': 'Y',
            'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
            // Ukranian
            'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
            'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',
            // Czech
            'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's',
            'ť': 't', 'ů': 'u', 'ž': 'z', 'Č': 'C', 'Ď': 'D', 'Ě': 'E',
            'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U', 'Ž': 'Z',
            // Polish
            'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ś': 's',
            'ź': 'z', 'ż': 'z', 'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L',
            'Ń': 'N', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',
            // Latvian
            'ā': 'a', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l',
            'ņ': 'n', 'ū': 'u', 'Ā': 'A', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i',
            'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N', 'Ū': 'u'
        };

        // transliterate non-english characters for their english equivalent
        for (var i = 0, len = str.length; i < len; i++) {
            if (chars[str.charAt(i)]) {
                str = str.replace(str.charAt(i), chars[str.charAt(i)]);
            }
        }

        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9]/g, sep);
        // replace multiple sep with single sep
        str = str.replace(/[-]+/g, sep);
        // strip sep from the beginning and fron the end
        str = str.replace(/^[-]|[-]$/g,sep);
        return str;
    },

    toConstantCase: function(str)
    {
    },

    toRandomCase: function(str)
    {
    },

    toTitleCase: function(str)
    {
    },

    toUpperCaseFirst: function(str, toLowerCaseRest)
    {
        var f = str.substr(0, 1).toUpperCase();
        var r = str.substr(1);
        return (f + ((toLowerCaseRest === true) ? r.toLowerCase() : r));
    },

    trim: function(str)
    {
        if (String.prototype.trim) {
            return str.trim();
        }
        return str.replace(/^\s+|\s+$/gm, '');
    }

};
    var TestUtil = {

    assertArray: function(val, len)
    {
        if (!TypeUtil.isArray(val)) {
            throw new Error('value is not array.');
        }
        if (TypeUtil.isNumber(len)) {
            TestUtil.assertEqual(val.length, len);
        }
    },

    assertBase64: function(val)
    {
        if (!TypeUtil.isBase64(val)) {
            throw new Error('value is not base64.');
        }
    },

    assertBoolean: function(val)
    {
        if (!TypeUtil.isBoolean(val)) {
            throw new Error('value is not boolean.');
        }
    },

    assertDate: function(val)
    {
        if (!TypeUtil.isDate(val)) {
            throw new Error('value is not date.');
        }
    },

    assertEqual: function(val1, val2)
    {
        if (!ObjectUtil.equals(val1, val2)) {
            // throw new Error('values are not equals.');
            throw new Error('values are not equals: ' + JSONUtil.encode(val1) + ' != ' + JSONUtil.encode(val2) + '.');
        }
    },

    assertError: function(val)
    {
        if (!TypeUtil.isError(val)) {
            throw new Error('value is not error.');
        }
    },

    assertFalse: function(val)
    {
        TestUtil.assertBoolean(val);
        if (val !== false) {
            throw new Error('value is not false.');
        }
    },

    assertFunction: function(val)
    {
        if (!TypeUtil.isFunction(val)) {
            throw new Error('value is not function.');
        }
    },

    assertJSON: function(val)
    {
        if (!TypeUtil.isJSON(val)) {
            throw new Error('value is not json.');
        }
    },

    assertNone: function(val)
    {
        if (!TypeUtil.isNone(val)) {
            throw new Error('value is not none.');
        }
    },

    assertNotArray: function(val)
    {
        if (TypeUtil.isArray(val)) {
            throw new Error('value is array.');
        }
    },

    assertNotBase64: function(val)
    {
        if (TypeUtil.isBase64(val)) {
            throw new Error('value is base64.');
        }
    },

    assertNotBoolean: function(val)
    {
        if (TypeUtil.isBoolean(val)) {
            throw new Error('value is boolean.');
        }
    },

    assertNotDate: function(val)
    {
        if (TypeUtil.isDate(val)) {
            throw new Error('value is date.');
        }
    },

    assertNotEquals: function(val1, val2)
    {
        if (ObjectUtil.equals(val1, val2)) {
            throw new Error('values are equals: ' + JSONUtil.encode(val1) + ' != ' + JSONUtil.encode(val2) + '.');
        }
    },

    assertNotError: function(val)
    {
        if (TypeUtil.isError(val)) {
            throw new Error('value is error.');
        }
    },

    assertNotFunction: function(val)
    {
        if (TypeUtil.isFunction(val)) {
            throw new Error('value is function.');
        }
    },

    assertNotJSON: function(val)
    {
        if (TypeUtil.isJSON(val)) {
            throw new Error('value is json.');
        }
    },

    assertNotNone: function(val)
    {
        if (TypeUtil.isNone(val)) {
            throw new Error('value is none.');
        }
    },

    assertNotNumber: function(val)
    {
        if (TypeUtil.isNumber(val)) {
            throw new Error('value is number.');
        }
    },

    assertNotNull: function(val)
    {
        if (TypeUtil.isNull(val)) {
            throw new Error('value is null.');
        }
    },

    assertNotObject: function(val)
    {
        if (TypeUtil.isObject(val)) {
            throw new Error('value is object.');
        }
    },

    assertNotRegExp: function(val)
    {
        if (TypeUtil.isRegExp(val)) {
            throw new Error('value is regexp.');
        }
    },

    assertNotString: function(val)
    {
        if (TypeUtil.isString(val)) {
            throw new Error('value is string.');
        }
    },

    assertNotUndefined: function(val)
    {
        if (TypeUtil.isUndefined(val)) {
            throw new Error('value is undefined.');
        }
    },

    assertNotXML: function(val)
    {
        if (TypeUtil.isXML(val)) {
            throw new Error('value is xml.');
        }
    },

    assertNumber: function(val)
    {
        if (!TypeUtil.isNumber(val)) {
            throw new Error('value is not number.');
        }
    },

    assertNumberAlmostEqual: function(val1, val2, tolerance)
    {
        TestUtil.assertNumber(val1);
        TestUtil.assertNumber(val2);
        if (!TypeUtil.isNumber(tolerance)) {
            tolerance = 0.0000000001;
        }
        TestUtil.assertTrue(Math.abs(val1 - val2) <= tolerance);
    },

    assertNull: function(val)
    {
        if (!TypeUtil.isNull(val)) {
            throw new Error('value is not null.');
        }
    },

    assertObject: function(val)
    {
        if (!TypeUtil.isObject(val)) {
            throw new Error('value is not object.');
        }
    },

    assertRegExp: function(val)
    {
        if (!TypeUtil.isRegExp(val)) {
            throw new Error('value is not regexp.');
        }
    },

    assertString: function(val)
    {
        if (!TypeUtil.isString(val)) {
            throw new Error('value is not string.');
        }
    },

    assertThrows: function(val)
    {
        TestUtil.assertFunction(val);
        try {
            var scope = null;
            var args = FunctionUtil.args(arguments, 1);
            args = [val, scope].concat(args);
            FunctionUtil.call.apply(null, args);
        } catch(e) {
            return;
        }
        throw new Error('value didn\'t throw error.');
    },

    assertTrue: function(val)
    {
        TestUtil.assertBoolean(val);
        if (val !== true) {
            throw new Error('value is not true.');
        }
    },

    assertUndefined: function(val)
    {
        if (!TypeUtil.isUndefined(val)) {
            throw new Error('value is not undefined.');
        }
    },

    assertXML: function(val)
    {
        if (!TypeUtil.isXML(val)) {
            throw new Error('value is not xml.');
        }
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
    var TypeUtil = {

    ARRAY: 'array',
    BOOLEAN: 'boolean',
    DATE: 'date',
    ERROR: 'error',
    FUNCTION: 'function',
    NAN: 'nan',
    NUMBER: 'number',
    NULL: 'null',
    OBJECT: 'object',
    REGEXP: 'regexp',
    STRING: 'string',
    UNDEFINED: 'undefined',
    UNKNOWN: 'unknown',
    XML: 'xml',

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
                if (Base64Util.decode(val) !== '') {
                    return true;
                }
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

    isNaN: function(val)
    {
        return Object.is(val, NaN);
    },

    isNone: function(val)
    {
        return (Object.is(val, undefined) || Object.is(val, null) || Object.is(val, NaN));
    },

    isNumber: function(val)
    {
        return (typeof(val) === 'number' && !isNaN(val) && isFinite(val));
    },

    isNull: function(val)
    {
        return (val === null);
    },

    isObject: function(val)
    {
        return (typeof(val) === 'object' && Object.prototype.toString.call(val) === '[object Object]');
    },

    isRegExp: function(val)
    {
        return (val instanceof RegExp);
    },

    isSetAndNotEmpty: function(val)
    {
        if (TypeUtil.isNone(val)) {
            return false;
        }
        switch (TypeUtil.of(val)) {
            case TypeUtil.ARRAY:
                return (val.length > 0);
            // case TypeUtil.NUMBER:
            //     return (val !== 0);
            case TypeUtil.OBJECT:
                return (ObjectUtil.length(val) > 0);
            case TypeUtil.STRING:
                return (StringUtil.trim(val).length > 0);
            default:
                return true;
        }
    },

    isString: function(val)
    {
        return (typeof(val) === 'string');
    },

    isType: function(val)
    {
        switch (val) {
            case TypeUtil.ARRAY:
            case TypeUtil.BOOLEAN:
            case TypeUtil.DATE:
            case TypeUtil.ERROR:
            case TypeUtil.FUNCTION:
            case TypeUtil.NAN:
            case TypeUtil.NUMBER:
            case TypeUtil.NULL:
            case TypeUtil.OBJECT:
            case TypeUtil.REGEXP:
            case TypeUtil.STRING:
            case TypeUtil.UNDEFINED:
            case TypeUtil.UNKNOWN:
            case TypeUtil.XML:
                return true;
            default:
                return false;
        }
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
            return TypeUtil.ARRAY;
        }
        else if (TypeUtil.isBoolean(val)) {
            return TypeUtil.BOOLEAN;
        }
        else if (TypeUtil.isDate(val)) {
            return TypeUtil.DATE;
        }
        else if (TypeUtil.isError(val)) {
            return TypeUtil.ERROR;
        }
        else if (TypeUtil.isFunction(val)) {
            return TypeUtil.FUNCTION;
        }
        else if (TypeUtil.isNaN(val)) {
            return TypeUtil.NAN;
        }
        else if (TypeUtil.isNumber(val)) {
            return TypeUtil.NUMBER;
        }
        else if (TypeUtil.isNull(val)) {
            return TypeUtil.NULL;
        }
        else if (TypeUtil.isRegExp(val)) {
            return TypeUtil.REGEXP;
        }
        else if (TypeUtil.isString(val)) {
            return TypeUtil.STRING;
        }
        else if (TypeUtil.isUndefined(val)) {
            return TypeUtil.UNDEFINED;
        }
        else if (TypeUtil.isXML(val)) {
            return TypeUtil.XML;
        }
        else if (TypeUtil.isObject(val)) {
            return TypeUtil.OBJECT;
        }
        else {
            return TypeUtil.UNKNOWN;
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
        var url = '';
        try {
            url = window.location.href;
        } catch(e) {
        }
        return url;
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
    var UTF8Util = {

    decode: function(input)
    {
        return decodeURIComponent(escape(input));

        // var output = '';
        // var i = 0;
        // var j = input.length;
        // var c, c1, c2;

        // while (i < j)
        // {
        //     c = input.charCodeAt(i);

        //     if (c < 128) {
        //         output += String.fromCharCode(c);
        //         i++;
        //     }
        //     else if((c > 191) && (c < 224)) {
        //         c2 = input.charCodeAt(i + 1);
        //         output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        //         i += 2;
        //     }
        //     else {
        //         c2 = input.charCodeAt(i + 1);
        //         c3 = input.charCodeAt(i + 2);
        //         output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        //         i += 3;
        //     }
        // }

        // return output;
    },

    encode: function(input)
    {
        return unescape(encodeURIComponent(input));

        // input = input.replace(/\r\n/g, '\n');

        // var output = '';
        // var i = 0;
        // var j = input.length;
        // var c;

        // for (i; i < j; i++)
        // {
        //     c = input.charCodeAt(i);
        //     if (c < 128) {
        //         output += String.fromCharCode(c);
        //     }
        //     else if ((c > 127) && (c < 2048)) {
        //         output += String.fromCharCode((c >> 6) | 192);
        //         output += String.fromCharCode((c & 63) | 128);
        //     }
        //     else {
        //         output += String.fromCharCode((c >> 12) | 224);
        //         output += String.fromCharCode(((c >> 6) & 63) | 128);
        //         output += String.fromCharCode((c & 63) | 128);
        //     }
        // }

        // return output;
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
        ease: EaseUtil,
        func: FunctionUtil,
        geom: GeomUtil,
            // point: PointUtil,
        hex: HexUtil,
        json: JSONUtil,
        math: MathUtil,
            // interpolation: InterpolationUtil,
        number: NumberUtil,
        object: ObjectUtil,
        random: RandomUtil,
        string: StringUtil,
        test: TestUtil,
        trigo: TrigoUtil,
        type: TypeUtil,
        xml: XMLUtil,
        url: URLUtil,
        utf8: UTF8Util
    };

    return utils;
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cbiAgICBpZiAodHlwZW9mKGRlZmluZSkgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKCdAZmFiaW9jYWNjYW1vL3V0aWxzLmpzJywgZmFjdG9yeSk7XG4gICAgICAgIGRlZmluZSgnQGZhYmlvY2FjY2Ftby91dGlscycsIGZhY3RvcnkpO1xuICAgICAgICBkZWZpbmUoJ3V0aWxzLmpzJywgZmFjdG9yeSk7XG4gICAgICAgIGRlZmluZSgndXRpbHMnLCBmYWN0b3J5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mKG1vZHVsZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIENvbW1vbkpTXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gU2NyaXB0IHRhZyBpbXBvcnQgaS5lLiwgSUlGRVxuICAgICAgICByb290LnV0aWxzID0gZmFjdG9yeSgpO1xuICAgICAgICByb290LnUgPSBmYWN0b3J5KCk7XG4gICAgfVxuXG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgQGltcG9ydCAnLi91dGlscy9BcnJheVV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9CYXNlNjRVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvQ29sb3JDbXlrVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0NvbG9ySGV4VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0NvbG9yUmdiVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0NvbG9yVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0RhdGVVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvRWFzZVV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9GdW5jdGlvblV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9Qb2ludFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9HZW9tVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0hleFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9JbnRlcnBvbGF0aW9uVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0pTT05VdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvTWF0aFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9OdW1iZXJVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvT2JqZWN0VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1JhbmRvbVV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9TdHJpbmdVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvVGVzdFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9Ucmlnb1V0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9UeXBlVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1VSTFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9VVEY4VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1hNTFV0aWwuanMnXG5cbiAgICB2YXIgdXRpbHMgPSB7XG4gICAgICAgIGFycmF5OiBBcnJheVV0aWwsXG4gICAgICAgIGJhc2U2NDogQmFzZTY0VXRpbCxcbiAgICAgICAgY29sb3I6IENvbG9yVXRpbCxcbiAgICAgICAgZGF0ZTogRGF0ZVV0aWwsXG4gICAgICAgIGVhc2U6IEVhc2VVdGlsLFxuICAgICAgICBmdW5jOiBGdW5jdGlvblV0aWwsXG4gICAgICAgIGdlb206IEdlb21VdGlsLFxuICAgICAgICAgICAgLy8gcG9pbnQ6IFBvaW50VXRpbCxcbiAgICAgICAgaGV4OiBIZXhVdGlsLFxuICAgICAgICBqc29uOiBKU09OVXRpbCxcbiAgICAgICAgbWF0aDogTWF0aFV0aWwsXG4gICAgICAgICAgICAvLyBpbnRlcnBvbGF0aW9uOiBJbnRlcnBvbGF0aW9uVXRpbCxcbiAgICAgICAgbnVtYmVyOiBOdW1iZXJVdGlsLFxuICAgICAgICBvYmplY3Q6IE9iamVjdFV0aWwsXG4gICAgICAgIHJhbmRvbTogUmFuZG9tVXRpbCxcbiAgICAgICAgc3RyaW5nOiBTdHJpbmdVdGlsLFxuICAgICAgICB0ZXN0OiBUZXN0VXRpbCxcbiAgICAgICAgdHJpZ286IFRyaWdvVXRpbCxcbiAgICAgICAgdHlwZTogVHlwZVV0aWwsXG4gICAgICAgIHhtbDogWE1MVXRpbCxcbiAgICAgICAgdXJsOiBVUkxVdGlsLFxuICAgICAgICB1dGY4OiBVVEY4VXRpbFxuICAgIH07XG5cbiAgICByZXR1cm4gdXRpbHM7XG59KSk7Il19
