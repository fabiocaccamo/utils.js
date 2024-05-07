(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof module === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Script tag import i.e., IIFE
        root.utils = factory();
        root.u = factory();
    }
})(this, function () {
    'use strict';

    var ArrayUtil,
        Base64Util,
        ColorCmykUtil,
        ColorHexUtil,
        ColorRgbUtil,
        ColorUtil,
        DateUtil,
        EaseUtil,
        FunctionUtil,
        PointUtil,
        GeomUtil,
        HexUtil,
        InterpolationUtil,
        JSONUtil,
        MathUtil,
        NumberUtil,
        ObjectUtil,
        RandomUtil,
        StringUtil,
        TestUtil,
        TrigoUtil,
        TypeUtil,
        URLUtil,
        UTF8Util,
        XMLUtil;

    @import './utils/ArrayUtil.js'
    @import './utils/Base64Util.js'
    @import './utils/ColorCmykUtil.js'
    @import './utils/ColorHexUtil.js'
    @import './utils/ColorRgbUtil.js'
    @import './utils/ColorUtil.js'
    @import './utils/DateUtil.js'
    @import './utils/EaseUtil.js'
    @import './utils/FunctionUtil.js'
    @import './utils/PointUtil.js'
    @import './utils/GeomUtil.js'
    @import './utils/HexUtil.js'
    @import './utils/InterpolationUtil.js'
    @import './utils/JSONUtil.js'
    @import './utils/MathUtil.js'
    @import './utils/NumberUtil.js'
    @import './utils/ObjectUtil.js'
    @import './utils/RandomUtil.js'
    @import './utils/StringUtil.js'
    @import './utils/TestUtil.js'
    @import './utils/TrigoUtil.js'
    @import './utils/TypeUtil.js'
    @import './utils/URLUtil.js'
    @import './utils/UTF8Util.js'
    @import './utils/XMLUtil.js'

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
        utf8: UTF8Util,
        version: '0.24.1',
    };

    return utils;
});
