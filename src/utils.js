(function (root, factory) {

    if (typeof(define) === 'function' && define.amd) {
        // AMD
        define('@fabiocaccamo/utils.js', factory);
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

    @import './utils/ArrayUtil.js'
    @import './utils/Base64Util.js'
    @import './utils/ColorCmykUtil.js'
    @import './utils/ColorHexUtil.js'
    @import './utils/ColorRgbUtil.js'
    @import './utils/ColorUtil.js'
    @import './utils/DateUtil.js'
    @import './utils/FunctionUtil.js'
    @import './utils/HexUtil.js'
    @import './utils/InterpolationUtil.js'
    @import './utils/JSONUtil.js'
    @import './utils/MathUtil.js'
    @import './utils/NumberUtil.js'
    @import './utils/ObjectUtil.js'
    @import './utils/RandomUtil.js'
    @import './utils/StringUtil.js'
    @import './utils/TrigoUtil.js'
    @import './utils/TypeUtil.js'
    @import './utils/URLUtil.js'
    @import './utils/XMLUtil.js'

    var utils = {
        array: ArrayUtil,
        base64: Base64Util,
        color: ColorUtil,
        date: DateUtil,
        func: FunctionUtil,
        hex: HexUtil,
        json: JSONUtil,
        math: MathUtil,
        number: NumberUtil,
        object: ObjectUtil,
        random: RandomUtil,
        string: StringUtil,
        trigo: TrigoUtil,
        type: TypeUtil,
        xml: XMLUtil,
        url: URLUtil
    };

    return utils;
}));