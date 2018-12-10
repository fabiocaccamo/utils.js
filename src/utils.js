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