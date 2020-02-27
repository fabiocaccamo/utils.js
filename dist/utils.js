(function (root, factory) {

    if (typeof(define) === 'function' && define.amd) {
        // AMD
        define(factory);
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

    /**
     * Clean a list by removing values evaluated as 'none'.
     *
     * @memberof array
     * @param {Array} list - The list to clean.
     * @param {Boolean} [hard=false] - If true, also objects, arrays and strings evaluated as 'empty' will be removed.
     * @return {Array} - A new cleaned list.
     */
    clean: function(list, hard)
    {
        var items = list.slice();
        items = items.filter(function(item, index, arr) {
            return (!TypeUtil.isNone(item));
        });
        if (hard === true) {
            items = items.map(function(item, index, arr) {
                var itemClean;
                switch (TypeUtil.of(item)) {
                    case TypeUtil.ARRAY:
                        itemClean = ArrayUtil.clean(item, hard);
                        return (itemClean.length > 0 ? itemClean : null);
                    case TypeUtil.OBJECT:
                        itemClean = ObjectUtil.clean(item, hard);
                        return (ObjectUtil.length(itemClean) > 0 ? itemClean : null);
                    case TypeUtil.STRING:
                        itemClean = StringUtil.trim(item);
                        return (itemClean !== '' ? item : null);
                    default:
                        return item;
                }
            }).filter(function(item, index, arr) {
                return (!TypeUtil.isNone(item));
            });
        }
        return items;
    },

    /**
     * Creates a new list with same properties than original (deep clone).
     *
     * @memberof array
     * @param {Array} list - The list
     * @return {Array} - A new cloned list.
     */
    clone: function(list)
    {
        var cln = list.slice();
        var val;
        for (var i = 0, j = cln.length; i < j; i++) {
            val = cln[i];
            switch (TypeUtil.of(val)) {
                case TypeUtil.ARRAY:
                    cln[i] = ArrayUtil.clone(val);
                    break;
                case TypeUtil.DATE:
                    cln[i] = DateUtil.clone(val);
                    break;
                case TypeUtil.OBJECT:
                    cln[i] = ObjectUtil.clone(val);
                    break;
                default:
                    break;
            }
        }
        return cln;
    },

    /**
     * Compares two lists and check if they are (deeply) equal.
     *
     * @memberof array
     * @param {Array} listA - The list a
     * @param {Array} listB - The list b
     * @return {Boolean} - true if the two lists are equal, false otherwise.
     */
    equals: function(listA, listB)
    {
        return ObjectUtil.equals(listA, listB);
    },

    /**
     * Flat a N-d list to be a 1-d list.
     *
     * @memberof array
     * @param {Array} list - The list
     * @return {Array} - A new flatten list.
     */
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

    /**
     * Creates a dictionary by indexing list value for the given keys.
     * List values must be key-value objects.
     * If flat is true, each dictionary key will be associated with one object and not a list of objects.
     *
     * @memberof array
     * @param {Object[]} list - The list
     * @param {String|String[]} keys - A key or an array of keys
     * @param {Boolean} [flat=false] - If true, each dictionary key will be associated with one object and not a list of objects.
     * @return {Object} - An indexed dictionary.
     */
    index: function(list, keys, flat)
    {
        var dict = {}, item, key, val;

        if (TypeUtil.isString(keys)) {
            keys = [keys];
        }

        for (var i = 0, j = list.length; i < j; i++)
        {
            item = list[i];

            for (var m = 0, n = keys.length; m < n; m++ )
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

    /**
     * Creates a 2d list grouping list items every n-items.
     *
     * @memberof array
     * @param {Array} list - The list
     * @param {Number} itemsPerPage - The items per page
     * @return {Array} - A 2d list
     */
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

    rotate: function(list, count)
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

    /**
     * Decode a string encoded in base64.
     *
     * @memberof base64
     * @param {String} str - Any string previously encoded in base64.
     * @return {String} - The string obtained from base64 decoding.
     */
    decode: function(str)
    {
        var input = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        var output = '';

        try {
            output = window.atob(input);
        }
        catch (e) {
            var chars = Base64Util.CHARS_TABLE;
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;

            var i = 0;
            var j = input.length;

            while (i < j) {
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
        }

        output = UTF8Util.decode(output);
        return output;
    },

    /**
     * Encode a string in base64.
     *
     * @memberof base64
     * @param {String} str - Any string.
     * @return {String} - The string obtained from base64 encoding.
     */
    encode: function(str)
    {
        var input = UTF8Util.encode(str);
        var output = '';

        try {
            output = window.btoa(input);
        }
        catch (e) {
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
        }

        return output;
    }
};
    var ColorCmykUtil = {

    // average: function(colors)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.average(
    //             colors.map(function(color){
    //                 return ColorCmykUtil.toRgb(color);
    //             })
    //         ));
    // },

    // distance: function(colorA, colorB)
    // {
    //     return ColorRgbUtil.distance(
    //         ColorCmykUtil.toRgb(colorA),
    //         ColorCmykUtil.toRgb(colorB));
    // },

    // gradient: function(colors, steps)
    // {
    //     return ColorRgbUtil.gradient(colors.map(function(color){
    //             return ColorCmykUtil.toRgb(color);
    //         }), steps).map(function(color){
    //             return ColorRgbUtil.toCmyk(color);
    //         });
    // },

    // gradientMatrix: function(colors, stepsX, stepsY)
    // {
    //     return ColorRgbUtil.gradientMatrix(
    //         ObjectUtil.map(colors, function(color){
    //             return ColorCmykUtil.toRgb(color);
    //         }), stepsX, stepsY).map(function(colors){
    //             return colors.map(function(color){
    //                 return ColorRgbUtil.toCmyk(color);
    //             });
    //         });
    // },

    // interpolateBilinear: function(a, b, c, d, u, v)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.interpolateBilinear(
    //             ColorCmykUtil.toRgb(a),
    //             ColorCmykUtil.toRgb(b),
    //             ColorCmykUtil.toRgb(c),
    //             ColorCmykUtil.toRgb(d), u, v));
    // },

    // interpolateLinear: function(colorFrom, colorTo, t)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.interpolateLinear(
    //             ColorCmykUtil.toRgb(colorFrom),
    //             ColorCmykUtil.toRgb(colorTo), t));
    // },

    // interpolateMultilinear: function(colors, t)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.interpolateMultilinear(
    //             colors.map(function(color){
    //                 return ColorCmykUtil.toRgb(color);
    //             }), t));
    // },

    // nearest: function(colorSearch, colors)
    // {
    //     return ColorRgbUtil.toCmyk(
    //         ColorRgbUtil.nearest(
    //             ColorCmykUtil.toRgb(colorSearch),
    //             colors.map(function(color){
    //                 return ColorCmykUtil.toRgb(color);
    //             })
    //         ));
    // },

    // toGrayscale: function(color)
    // {
    //     return ColorRgbUtil.toGrayscale(
    //         ColorCmykUtil.toRgb(color));
    // },

    toHex: function(color, prefix)
    {
        return ColorRgbUtil.toHex(
            ColorCmykUtil.toRgb(color), prefix);
    },

    // toHsl: function(color)
    // {
    //     return ColorRgbUtil.toHsl(
    //         ColorCmykUtil.toRgb(color));
    // },

    // toHsv: function(color)
    // {
    //     return ColorRgbUtil.toHsv(
    //         ColorCmykUtil.toRgb(color));
    // },

    toRgb: function(color)
    {
        var c = (color.c / 100);
        var m = (color.m / 100);
        var y = (color.y / 100);
        var k = (color.k / 100);
        var ik = (1.0 - k);

        var r = (1.0 - Math.min(1.0, ((c * ik) + k)));
        var g = (1.0 - Math.min(1.0, ((m * ik) + k)));
        var b = (1.0 - Math.min(1.0, ((y * ik) + k)));

        var round = Math.round;
        r = round(r * 255);
        g = round(g * 255);
        b = round(b * 255);

        return { r:r, g:g, b:b, a:1.0 };
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
                    a: MathUtil.roundDecimals(fromHex(comps[1]) / 255, 2),
                    r: fromHex(comps[2]),
                    g: fromHex(comps[3]),
                    b: fromHex(comps[4])
                }
                break;
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
    var ColorRgbUtil = {

    average: function(colors)
    {
        var c;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var i = 0, j = colors.length; i < j; i++) {
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
    var ColorUtil = {

    cmyk: ColorCmykUtil,
    // cmykToGrayscale: ColorCmykUtil.toGrayscale,
    cmykToHex: ColorCmykUtil.toHex,
    // cmykToHsl: ColorCmykUtil.toHsl,
    // cmykToHsv: ColorCmykUtil.toHsv,
    cmykToRgb: ColorCmykUtil.toRgb,

    // grayscale: ColorGrayscaleUtil,
    // grayscaleToGrayscale: ColorGrayscaleUtil.toGrayscale,
    // grayscaleToHex: ColorGrayscaleUtil.toHex,
    // grayscaleToHsl: ColorGrayscaleUtil.toHsl,
    // grayscaleToHsv: ColorGrayscaleUtil.toHsv,
    // grayscaleToRgb: ColorGrayscaleUtil.toRgb,

    hex: ColorHexUtil,
    hexToCmyk: ColorHexUtil.toCmyk,
    // hexToGrayscale: ColorHexUtil.toGrayscale,
    // hexToHsl: ColorHexUtil.toHsl,
    // hexToHsv: ColorHexUtil.toHsv,
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
    // rgbToGrayscale: ColorRgbUtil.toGrayscale,
    rgbToHex: ColorRgbUtil.toRgb
    // rgbToHsl: ColorRgbUtil.toHsl,
    // rgbToHsv: ColorRgbUtil.toHsv

};
    var DateUtil = {

    clone: function(date)
    {
        return new Date(date.getTime());
    },

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
        var angle = TrigoUtil.angleDeg((b.y - a.y), (b.x - a.x));
        return TrigoUtil.cycleDeg(angle);
    },

    cross: function(a, b)
    {
        // z coordinate of the cross product; x and y coordinates are zero
        return ((a.x * b.y) - (a.y * b.x));
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

    equals: function(a, b, tolerance)
    {
        var f = MathUtil.equals;
        return (f(a.x, b.x, tolerance) && f(a.y, b.y, tolerance));
    },

    interpolate: function(a, b, t)
    {
        var f = InterpolationUtil.linear;
        return {
            x: f(a.x, b.x, t),
            y: f(a.y, b.y, t)
        };
    },

    length: function(p)
    {
        return PointUtil.distance(p, { x:0, y:0 });
    },

    magnitude: function(p)
    {
        return PointUtil.length(p);
    },

    project: function(p, distance, angle)
    {
        return {
            x: (p.x + (distance * TrigoUtil.cosDeg(angle))),
            y: (p.y + (distance * TrigoUtil.sinDeg(angle)))
        }
    },

    rect: function(points)
    {
        var point, pointsX = [], pointsY = [];

        for (var i = 0, j = points.length; i < j; i++) {
            point = points[i];
            pointsX.push(point.x);
            pointsY.push(point.y);
        }

        var minF = Math.min;
        var minX = minF.apply(null, pointsX);
        var minY = minF.apply(null, pointsY);
        var maxF = Math.max;
        var maxX  = maxF.apply(null, pointsX);
        var maxY = maxF.apply(null, pointsY);

        return {
            topLeft: { x:minX, y:minY },
            topRight: { x:maxX, y:minY },
            bottomRight: { x:maxX, y:maxY },
            bottomLeft: { x:minX, y:maxY }
        };
    },

    rotate: function(p, angle, pivot)
    {
        var pointPivot = (pivot || { x:0.0, y:0.0 });
        var pointRel = PointUtil.subtract(p, pointPivot);
        var angleCos = TrigoUtil.cosDeg(angle);
        var angleSin = TrigoUtil.sinDeg(angle);
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
            x: (p.x * amount),
            y: (p.y * amount)
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
        return {
            x: (p.x + x),
            y: (p.y + y)
        };
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

    /**
     * Calculate bilinear interpolation for the given values.
     *
     * @memberof math.interpolation
     * @inner
     * @param {Number} a xxx
     * @param {Number} b xxx
     * @param {Number} c xxx
     * @param {Number} d xxx
     * @param {Number} u xxx
     * @param {Number} v xxx
     * @return {Number} result
     */
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
        var output = '';
        try {
            output = JSON.parse(str);
        }
        catch(error) {
            // unquote str to avoid syntax error
            str = str.replace(/&quot;/g, '\"');
            output = JSON.parse(str);
        }
        return output;
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

    equals: function(a, b, tolerance)
    {
        if (isNaN(tolerance)) {
            tolerance = 0.0000000001;
        } else if (tolerance > 0.0) {
            tolerance += 0.0000000001;
        }
        return (Math.abs(a - b) <= tolerance);
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

    /**
     * Interpolation utility object
     * @memberof math
     */
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
        return ((n - a) / (b - a));
    },

    proportion: function(a, b, x, y)
    {
        var args = FunctionUtil.args(arguments);
        var argsOk = ArrayUtil.clean(args);
        if (argsOk.length != 3) {
            return NaN;
        }

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
    },

    roundDecimals: function(n, decimalsPlaces)
    {
        return Number(n.toFixed((decimalsPlaces || 2)));
    },

    roundToMultiple: function(n, multiplier)
    {
        return (Math.round(n / multiplier) * multiplier);
    },

    roundToNearest: function(n, values)
    {
        var a = ArrayUtil.sort(values.concat());
        var i = 0, j = 0, k = a.length;
        if (k == 0) {
            return NaN;
        }
        else if (k > 2) {
            while(j < k) {
                i = Math.floor((j + k) / 2.0);
                if (n < a[i]) {
                    k = i;
                } else if (n > a[(i + 1)]) {
                    j = (i + 1);
                } else {
                    break;
                }
            }
        }
        j = ((i + 1) in a ? (i + 1) : i);
        return MathUtil.nearest(n, a[i], a[j]);
    },

    roundToPower: function(n, base)
    {
        return Math.pow(base, Math.round(Math.log(n) / Math.log(base)));
    },

    sign: function(n)
    {
        return (n >= 0.0 ? 1 : -1);
    },

    summation: function(values)
    {
        var s = 0.0;
        for (var i = 0, j = values.length; i < j; i++) {
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
        return ((n % 2.0) == 0.0 && !NumberUtil.isFloat(n));
    },

    isFloat: function(n)
    {
        return ((n % 1) !== 0);
    },

    isNegative: function(n)
    {
        return (n < 0.0);
    },

    isOdd: function(n)
    {
        return ((n % 2.0) != 0.0 && !NumberUtil.isFloat(n));
    },

    isPositive: function(n)
    {
        return (n >= 0.0);
    },

    isPrime: function(n)
    {
        if (n <= 0 || NumberUtil.isFloat(n)) {
            return false;
        }
        if (n == 1) {
            return false;
        }
        else if (n == 2) {
            return true;
        }
        else if ((n % 2) == 0) {
            return false;
        }
        for (var i = 3; (i * i) <= n; i += 2) {
            if((n % i) == 0){
                return false;
            }
        }
        return true;
    }

};
    var ObjectUtil = {

    assign: function(obj, obj1, obj2, obj3)
    {
        var objs = FunctionUtil.args(arguments, 1);
        var i, j, k;
        for (i = 0, j = objs.length; i < j; i++) {
            for (k in objs[i]) {
                obj[k] = objs[i][k];
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
                        if (val.length === 0) {
                            val = null;
                        }
                        break;
                    case TypeUtil.OBJECT:
                        val = obj[key] = ObjectUtil.clean(val, hard);
                        if (ObjectUtil.length(val) === 0) {
                            val = null;
                        }
                        break;
                    case TypeUtil.STRING:
                        val = obj[key] = StringUtil.trim(val);
                        if (val === '') {
                            val = null;
                        }
                        break;
                }
            }
            if (TypeUtil.isNone(val)) {
                delete obj[key];
                continue;
            }
        }
        return obj;
    },

    /**
     * Creates a new instance of the object with same properties than original (deep clone).
     *
     * @memberof object
     * @param {Object} obj - The object
     * @return {Object} - Copy of this object
     */
    clone: function(obj)
    {
        var cln = {};
        var key, val;
        for (key in obj) {
            val = obj[key];
            switch (TypeUtil.of(val)) {
                case TypeUtil.ARRAY:
                    cln[key] = ArrayUtil.clone(val);
                    break;
                case TypeUtil.DATE:
                    cln[key] = DateUtil.clone(val);
                    break;
                case TypeUtil.OBJECT:
                    cln[key] = ObjectUtil.clone(val);
                    break;
                default:
                    cln[key] = obj[key];
                    break;
            }
        }
        return cln;
    },

    decodeBase64: function(str)
    {
        return JSONUtil.decode(Base64Util.decode(str));
    },

    decodeJSON: function(str)
    {
        return JSONUtil.decode(str);
    },

    encodeBase64: function(obj)
    {
        return Base64Util.encode(JSONUtil.encode(obj));
    },

    encodeJSON: function(obj)
    {
        return JSONUtil.encode(obj);
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

        switch (type1) {
            case TypeUtil.ARRAY:
            case TypeUtil.OBJECT:
                break;
            case TypeUtil.NUMBER:
                return MathUtil.equals(obj1, obj2);
            default:
                return String(obj1) == String(obj2);
        }

        for (key in obj2) {
            if (!(key in obj1)) {
                return false;
            }
        }

        for (key in obj1) {
            val1 = obj1[key];
            val2 = obj2[key];

            if (Object.is(obj1, val1) || Object.is(obj2, val2) || Object.is(val1, val2) || val1 === val2) {
                continue;
            }

            if (!ObjectUtil.equals(val1, val2)) {
                return false;
            }
        }

        return true;
    },

    keypath: {

        /**
         * Get an object value at the given keypath
         * A keypath is a String containing the keys separated by "."
         * If keypath is undefined default value will be returned
         *
         * @memberof object
         * @namespace keypath.get
         * @param {Object} obj The object
         * @param {String} path The dot-based keypath, eg. 'a.b.c'
         * @param {*} defaultValue The default value
         * @return {*} The value stored at the given keypath, if keypath is undefined default value will be returned
         */
        get: function(obj, path, defaultValue)
        {
            var keys = path.split('.');
            var key;
            var cursor = obj;
            for (var i = 0, j = keys.length; i < j; i++) {
                key = keys[i];
                try {
                    cursor = cursor[key];
                } catch(e) {
                    return defaultValue;
                }
            }
            return ((cursor !== undefined) ? cursor : defaultValue);
        },

        /**
         * Set an object value at the given keypath
         *
         * @memberof object
         * @namespace keypath.set
         * @param {Object} obj The object
         * @param {String} path The dot-based keypath, eg. 'a.b.c'
         * @param {*} value The value to store at the given keypath
         */
        set: function(obj, path, value)
        {
            var keys = path.split('.');
            var key;
            var cursor = obj;
            for (var i = 0, j = keys.length; i < j; i++) {
                key = keys[i];
                if (!TypeUtil.isObject(cursor[key])) {
                    cursor[key] = {};
                }
                if (i < (j - 1)) {
                    cursor = cursor[key];
                } else {
                    cursor[key] = value;
                }
            }
        }
    },

    keys: function(obj, sorted)
    {
        var k = Object.keys(obj);
        if (sorted === true) {
            k.sort();
        }
        return k;
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
        var args = [{}].concat(FunctionUtil.args(arguments));
        var obj = ObjectUtil.assign.apply(null, args);
        return obj;
    },

    search: function(objs, filter)
    {
        var results = [], obj, res, key, val;
        for (var i = 0, j = objs.length; i < j; i++) {
            obj = objs[i];
            res = obj;
            for (key in filter) {
                val = filter[key];
                if (!ObjectUtil.equals(obj[key], val)) {
                    res = null;
                }
            }
            if (res) {
                results.push(res);
            }
        }
        return results;
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

    /**
     * Return a random argument
     *
     * @memberof random
     * @return {*} - Random argument
     */
    argument: function()
    {
        var args = FunctionUtil.args(arguments);
        return RandomUtil.element(args);
    },

    /**
     * Return a random bit (0 or 1)
     *
     * @memberof random
     * @param {Number} [chance=0.5] - The chance
     * @return {Number} - The chance to generate a 1, 1.0 means 100%, 0.0 means 0%.
     */
    bit: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : 0);
    },

    /**
     * Return a random boolean (true or false)
     *
     * @memberof random
     * @param {Number} [chance=0.5] - The chance
     * @return {Boolean} - The chance to generate a true value, 1.0 means 100%, 0.0 means 0%.
     */
    boolean: function(chance)
    {
        return Boolean(Math.random() < (isNaN(chance) ? 0.5 : chance));
    },

    /**
     * Return a random color (uint)
     *
     * @memberof random
     * @return {Number} - Random color
     */
    color: function()
    {
        return RandomUtil.integer(0, 0xFFFFFF);
    },

    /**
     * Return a random element from the given array
     *
     * @memberof random
     * @param {Array} array - The array
     * @return {*} - Random array element
     */
    element: function(array)
    {
        return array[RandomUtil.index(array)];
    },

    /**
     * Return a random float where n >= min && n <= max
     *
     * @memberof random
     * @param {Number} min - The minimum
     * @param {Number} max - The maximum
     * @return {Number} - Random float
     */
    float: function(min, max)
    {
        return min + (Math.random() * (max - min));
    },

    /**
     * Return a random valid index for the given array
     *
     * @memberof random
     * @param {Array} array - The array
     * @return {Number} - Random array index
     */
    index: function(array)
    {
        return RandomUtil.integer(0, array.length - 1);
    },

    /**
     * Return a random integer where n >= min && n <= max
     *
     * @memberof random
     * @param {Number} min - The minimum
     * @param {Number} max - The maximum
     * @return {Number} - Random integer
     */
    integer: function(min, max)
    {
        return Math.floor(Math.round(RandomUtil.float(min - 0.5, max + 0.5)));
    },

    /**
     * Return a random sign (1 or -1), useful to randomize positive/negative multiplications.
     *
     * @memberof random
     * @param {Number} [chance=0.5] - The chance to generate a positive sign, 1.0 means 100%, 0.0 means 0%.
     * @return {Number} - Random sign (1 or -1)
     */
    sign: function(chance)
    {
        return (RandomUtil.boolean(chance) ? 1 : -1);
    },

    /**
     * Return a random string of the desired length with the possibility to use a restricted charset.
     *
     * @memberof random
     * @param {Number} length - The length of the returned string
     * @param {String} charset - The charset used to generate the random string, optional.
     * @return {String} - Random string
     */
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

    contains: function(str, occurrence)
    {
        return Boolean(str.indexOf(occurrence) > -1);
    },

    endsWith: function(str, search)
    {
        // if (String.prototype.endsWith) {
        //     return str.endsWith(search);
        // }
        return (str.substring((str.length - search.length), str.length) === search);
    },

    icontains: function(str, occurrence)
    {
        return StringUtil.contains(str.toLowerCase(), occurrence.toLowerCase());
    },

    levenshteinDistance: function(a, b)
    {
        // taken from GitHub here:
        // https://gist.github.com/andrei-m/982927#gistcomment-586471
        var m = [];
        for (var i = 0; i <= b.length; i++) {
            m[i] = [i];
            if (i === 0) {
                continue;
            }
            for (var j = 0; j <= a.length; j++) {
                m[0][j] = j;
                if (j === 0) {
                    continue;
                }
                m[i][j] = b.charAt(i - 1) == a.charAt(j - 1) ? m[i - 1][j - 1] : Math.min(
                    m[i-1][j-1] + 1,
                    m[i][j-1] + 1,
                    m[i-1][j] + 1
                );
            }
        }
        return m[b.length][a.length];
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

    replace: function(str, occurrence, replacement, caseSensitive)
    {
        var pattern = occurrence.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var flags = (caseSensitive === false ? 'gi' : 'g');
        var regex = new RegExp(pattern, flags);
        return str.replace(regex, replacement);
    },

    reverse: function(str)
    {
        var chars = str.split('');
        chars.reverse();
        return chars.join('');
    },

    rotate: function(str, count)
    {
        var chars = str.split('');
        chars = ArrayUtil.rotate(chars, count);
        return chars.join('');
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
        str = str.replace(/[^a-z0-9]/gm, sep);
        // replace multiple sep with single sep
        str = str.replace(/[\-]+/gm, sep);
        // strip sep from the beginning and from the end
        str = str.replace(/^[\-]|[\-]$/gm, '');
        return str;
    },

    startsWith: function(str, search)
    {
        // if (String.prototype.startsWith) {
        //     return str.startsWith(search);
        // }
        return (str.substr(0, search.length) === search);
    },

    toConstantCase: function(str)
    {
        return str.replace(/[\s]/gm, '_').toUpperCase();
    },

    toRandomCase: function(str)
    {
        return str.replace(/./gm, function(match) {
            return (RandomUtil.boolean() ? match.toUpperCase() : match.toLowerCase());
        });
    },

    toTitleCase: function(str, toLowerCaseRest)
    {
        return str.replace(/[\w]+/gm, function(match) {
            return StringUtil.toUpperCaseFirst(match, toLowerCaseRest);
        });
    },

    toUpperCaseFirst: function(str, toLowerCaseRest)
    {
        if (str.length === 0) {
            return str;
        }
        var f = str.substr(0, 1).toUpperCase();
        var r = (str.length > 1 ? str.substr(1) : '');
        return (f + ((toLowerCaseRest === true) ? r.toLowerCase() : r));
    },

    trim: function(str)
    {
        // if (String.prototype.trim) {
        //     return str.trim();
        // }
        return str.replace(/^[\s]+|[\s]+$/gm, '');
    },

    trimLeft: function(str)
    {
        // if (String.prototype.trimStart) {
        //     return str.trimStart();
        // }
        return str.replace(/^[\s]+/gm, '');
    },

    trimRight: function(str)
    {
        // if (String.prototype.trimEnd) {
        //     return str.trimEnd();
        // }
        return str.replace(/[\s]+$/gm, '');
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
            var out1 = ((TypeUtil.isArray(val1) || TypeUtil.isObject(val1)) ? '\n' + JSONUtil.encode(val1) + '\n' : String(val1));
            var out2 = ((TypeUtil.isArray(val2) || TypeUtil.isObject(val2)) ? '\n' + JSONUtil.encode(val2) : String(val2));
            throw new Error('values are not equal: ' + out1 + ' != ' + out2);
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

    assertNaN: function(val)
    {
        if (!TypeUtil.isNaN(val)) {
            throw new Error('value is not NaN. ' + val);
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

    assertNotEqual: function(val1, val2)
    {
        if (ObjectUtil.equals(val1, val2)) {
            var out1 = ((TypeUtil.isArray(val1) || TypeUtil.isObject(val1)) ? '\n' + JSONUtil.encode(val1) + '\n' : String(val1));
            var out2 = ((TypeUtil.isArray(val2) || TypeUtil.isObject(val2)) ? '\n' + JSONUtil.encode(val2) : String(val2));
            throw new Error('values are equal: ' + out1 + ' == ' + out2);
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

    // assertNotXML: function(val)
    // {
    //     if (TypeUtil.isXML(val)) {
    //         throw new Error('value is xml.');
    //     }
    // },

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
        if (!MathUtil.equals(val1, val2, tolerance)) {
            throw new Error('values are not almost equals (tolerance = ' + String(tolerance) + '): ' + String(val1) + ' != ' + String(val2) + '.');
        }
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
    }

    // assertXML: function(val)
    // {
    //     if (!TypeUtil.isXML(val)) {
    //         throw new Error('value is not xml.');
    //     }
    // }

};
    var TrigoUtil = {

    DEG_0: 0.0,
    DEG_90: 90.0,
    DEG_180: 180.0,
    DEG_270: 270.0,
    DEG_360: 360.0,

    DEG_TO_RAD: (Math.PI / 180.0), // 0.017453292519943295
    RAD_TO_DEG: (180.0 / Math.PI), // 57.29577951308232

    acosDeg: function(rad)
    {
        return Math.acos(rad) * TrigoUtil.RAD_TO_DEG;
    },

    angleDeg: function(y, x)
    {
        return TrigoUtil.atan2Deg(y, x);
    },

    angleRad: function(y, x)
    {
        return Math.atan2(y, x);
    },

    asinDeg: function(rad)
    {
        return Math.asin(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atanDeg: function(rad)
    {
        return Math.atan(rad) * TrigoUtil.RAD_TO_DEG;
    },

    atan2Deg: function(y, x)
    {
        return Math.atan2(y, x) * TrigoUtil.RAD_TO_DEG;
    },

    cosDeg: function(deg)
    {
        return Math.cos(deg * TrigoUtil.DEG_TO_RAD);
    },

    cycleDeg: function(deg)
    {
        return MathUtil.cycle(deg, TrigoUtil.DEG_360);
    },

    degToRad: function(deg)
    {
        return (deg * TrigoUtil.DEG_TO_RAD);
    },

    fastDeg: function(degFrom, degTo)
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

    sinDeg: function(deg)
    {
        return Math.sin(deg * TrigoUtil.DEG_TO_RAD);
    },

    tanDeg: function(deg)
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
    // XML: 'xml',

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
            // case TypeUtil.XML:
                return true;
            default:
                return false;
        }
    },

    isUndefined: function(val)
    {
        return (typeof(val) === 'undefined');
    },

    // isXML: function(val)
    // {
    //     // TODO
    //     return false;
    // },

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
        // else if (TypeUtil.isXML(val)) {
        //     return TypeUtil.XML;
        // }
        else if (TypeUtil.isObject(val)) {
            return TypeUtil.OBJECT;
        }
        else {
            return TypeUtil.UNKNOWN;
        }
    }

};
    var URLUtil = {

    getParameterByName: function(url, name, defaultValue)
    {
        var paramsDict = URLUtil.getParameters(url);
        return ((name in paramsDict) ? paramsDict[name] : defaultValue);
    },

    getParameters: function(url)
    {
        var paramsURL = (url || URLUtil.getURL());
        var paramsMarkIndex = paramsURL.indexOf('?');
        var paramsQueryString = (paramsMarkIndex > -1 ? paramsURL.substr(paramsMarkIndex + 1) : '');
        var paramsRE = /(([\w]+){1}\=([^\&\n\r\t]*){1})/g;
        var paramsList = (paramsQueryString.match(paramsRE) || []);
        var paramsDict = {};
        var paramKV;
        for (var i = 0, j = paramsList.length; i < j; i++) {
            paramKV = paramsList[i].split(/\=(.+)/);
            paramsDict[paramKV[0]] = decodeURIComponent(paramKV[1]);
        }
        return paramsDict;
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

    // decode: function(str)
    // {
    //     // https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
    //     var doc = null;
    //         try {
    //             if (window.DOMParser) {
    //             parser = new DOMParser();
    //             doc = parser.parseFromString(str, 'text/xml');
    //         } else {
    //             // Internet Explorer
    //             doc = new ActiveXObject('Microsoft.XMLDOM');
    //             doc.async = false;
    //             doc.loadXML(str);
    //         }
    //     } catch(e) {
    //     }
    //     return doc;
    // },

    // encode: function(doc)
    // {
    //     var ser = new XMLSerializer();
    //     var str = ser.serializeToString(doc);
    //     return str;
    // },

    removeNamespaces: function(str)
    {
        return str.replace(/(\<(.|\n)+?\>)/g, function(tag) {
            return tag.replace(/(\s|\<\/?){1}([\w]+\:){1}/g, '$1');
        });
    }
};

    /**
     * @global
     * @type {Object}
     */
    var utils = {

        /**
         * @namespace array
         * @type {Object}
         */
        array: ArrayUtil,

        /**
         * @namespace base64
         * @type {Object}
         */
        base64: Base64Util,

        /**
         * @namespace color
         * @type {Object}
         */
        color: ColorUtil,

        /**
         * @namespace date
         * @type {Object}
         */
        date: DateUtil,

        /**
         * @namespace ease
         * @type {Object}
         */
        ease: EaseUtil,

        /**
         * @namespace func
         * @type {Object}
         */
        func: FunctionUtil,

        /**
         * @namespace geom
         * @type {Object}
         */
        geom: GeomUtil,

        /**
         * @namespace hex
         * @type {Object}
         */
        hex: HexUtil,

        /**
         * @namespace json
         * @type {Object}
         */
        json: JSONUtil,

        /**
         * @namespace math
         * @type {Object}
         */
        math: MathUtil,

        /**
         * @namespace number
         * @type {Object}
         */
        number: NumberUtil,

        /**
         * @namespace object
         * @type {Object}
         */
        object: ObjectUtil,

        /**
         * @namespace random
         * @type {Object}
         */
        random: RandomUtil,

        /**
         * @namespace string
         * @type {Object}
         */
        string: StringUtil,

        /**
         * @namespace test
         * @type {Object}
         */
        test: TestUtil,

        /**
         * @namespace trigo
         * @type {Object}
         */
        trigo: TrigoUtil,

        /**
         * @namespace type
         * @type {Object}
         */
        type: TypeUtil,

        /**
         * @namespace xml
         * @type {Object}
         */
        xml: XMLUtil,

        /**
         * @namespace url
         * @type {Object}
         */
        url: URLUtil,

        /**
         * @namespace utf8
         * @type {Object}
         */
        utf8: UTF8Util
    };

    return utils;
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cbiAgICBpZiAodHlwZW9mKGRlZmluZSkgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKGZhY3RvcnkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YobW9kdWxlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBTY3JpcHQgdGFnIGltcG9ydCBpLmUuLCBJSUZFXG4gICAgICAgIHJvb3QudXRpbHMgPSBmYWN0b3J5KCk7XG4gICAgICAgIHJvb3QudSA9IGZhY3RvcnkoKTtcbiAgICB9XG5cbn0odGhpcywgZnVuY3Rpb24oKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBAaW1wb3J0ICcuL3V0aWxzL0FycmF5VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0Jhc2U2NFV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9Db2xvckNteWtVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvQ29sb3JIZXhVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvQ29sb3JSZ2JVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvQ29sb3JVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvRGF0ZVV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9FYXNlVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0Z1bmN0aW9uVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1BvaW50VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0dlb21VdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvSGV4VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL0ludGVycG9sYXRpb25VdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvSlNPTlV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9NYXRoVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL051bWJlclV0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9PYmplY3RVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvUmFuZG9tVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1N0cmluZ1V0aWwuanMnXG4gICAgQGltcG9ydCAnLi91dGlscy9UZXN0VXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1RyaWdvVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1R5cGVVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvVVJMVXRpbC5qcydcbiAgICBAaW1wb3J0ICcuL3V0aWxzL1VURjhVdGlsLmpzJ1xuICAgIEBpbXBvcnQgJy4vdXRpbHMvWE1MVXRpbC5qcydcblxuICAgIC8qKlxuICAgICAqIEBnbG9iYWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciB1dGlscyA9IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWVzcGFjZSBhcnJheVxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgYXJyYXk6IEFycmF5VXRpbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWVzcGFjZSBiYXNlNjRcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIGJhc2U2NDogQmFzZTY0VXRpbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWVzcGFjZSBjb2xvclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgY29sb3I6IENvbG9yVXRpbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWVzcGFjZSBkYXRlXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBkYXRlOiBEYXRlVXRpbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWVzcGFjZSBlYXNlXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBlYXNlOiBFYXNlVXRpbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWVzcGFjZSBmdW5jXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jOiBGdW5jdGlvblV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgZ2VvbVxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VvbTogR2VvbVV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgaGV4XG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBoZXg6IEhleFV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UganNvblxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAganNvbjogSlNPTlV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgbWF0aFxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgbWF0aDogTWF0aFV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgbnVtYmVyXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBudW1iZXI6IE51bWJlclV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2Ugb2JqZWN0XG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBvYmplY3Q6IE9iamVjdFV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgcmFuZG9tXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICByYW5kb206IFJhbmRvbVV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2Ugc3RyaW5nXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzdHJpbmc6IFN0cmluZ1V0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgdGVzdFxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGVzdDogVGVzdFV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgdHJpZ29cbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHRyaWdvOiBUcmlnb1V0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgdHlwZVxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZTogVHlwZVV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgeG1sXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB4bWw6IFhNTFV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgdXJsXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB1cmw6IFVSTFV0aWwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBuYW1lc3BhY2UgdXRmOFxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdXRmODogVVRGOFV0aWxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHV0aWxzO1xufSkpOyJdfQ==
