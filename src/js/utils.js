(function(){

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
        interpolation: InterpolationUtil,
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

    if (document.utils == undefined && window.utils == undefined) {
        document.utils = utils;
        window.utils = utils;
    }

    if (document.u == undefined && window.u == undefined) {
        document.u = utils;
        window.u = utils;
    }

}());