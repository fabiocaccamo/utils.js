import * as ArrayUtil from './utils/array.js';
import * as Base64Util from './utils/base64.js';
import * as ColorUtil from './utils/color.js';
import * as DateUtil from './utils/date.js';
import * as EaseUtil from './utils/ease.js';
import * as FunctionUtil from './utils/function.js';
import * as GeomUtil from './utils/geom.js';
import * as HexUtil from './utils/hex.js';
import * as InterpolationUtil from './utils/interpolation.js';
import * as JSONUtil from './utils/json.js';
import * as MathUtil from './utils/math.js';
import * as NumberUtil from './utils/number.js';
import * as ObjectUtil from './utils/object.js';
import * as RandomUtil from './utils/random.js';
import * as StringUtil from './utils/string.js';
import * as TestUtil from './utils/test.js';
import * as TrigoUtil from './utils/trigo.js';
import * as TypeUtil from './utils/type.js';
import * as URLUtil from './utils/url.js';
import * as UTF8Util from './utils/utf8.js';
import * as XMLUtil from './utils/xml.js';


export const utils = {
    array: ArrayUtil,
    base64: Base64Util,
    color: ColorUtil,
    date: DateUtil,
    ease: EaseUtil,
    func: FunctionUtil,
    geom: GeomUtil,
    hex: HexUtil,
    json: JSONUtil,
    math: MathUtil,
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

export default utils;

// backward compatibility - add to global scope for legacy usage
if (typeof window !== 'undefined') {
    // for browsers
    window.utils = utils;
    window.u = utils; // alias for legacy code
} else if (typeof global !== 'undefined') {
    // for Node.js
    global.utils = utils;
    global.u = utils; // alias for legacy code
}
