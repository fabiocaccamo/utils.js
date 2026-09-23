import ArrayUtil from './utils/array.js';
import Base64Util from './utils/base64.js';
import ColorUtil from './utils/color.js';
import DateUtil from './utils/date.js';
import EaseUtil from './utils/ease.js';
import FuncUtil from './utils/func.js';
import GeomUtil from './utils/geom.js';
import HexUtil from './utils/hex.js';
import InterpolationUtil from './utils/interpolation.js';
import JSONUtil from './utils/json.js';
import MathUtil from './utils/math.js';
import NumberUtil from './utils/number.js';
import ObjectUtil from './utils/object.js';
import RandomUtil from './utils/random.js';
import StringUtil from './utils/string.js';
import TestUtil from './utils/test.js';
import TrigoUtil from './utils/trigo.js';
import TypeUtil from './utils/type.js';
import URLUtil from './utils/url.js';
import UTF8Util from './utils/utf8.js';
import XMLUtil from './utils/xml.js';

export * as array from './utils/array.js';
export * as base64 from './utils/base64.js';
export * as color from './utils/color.js';
export * as date from './utils/date.js';
export * as ease from './utils/ease.js';
export * as func from './utils/func.js';
export * as geom from './utils/geom.js';
export * as hex from './utils/hex.js';
export * as interpolation from './utils/interpolation.js';
export * as json from './utils/json.js';
export * as math from './utils/math.js';
export * as number from './utils/number.js';
export * as object from './utils/object.js';
export * as random from './utils/random.js';
export * as string from './utils/string.js';
export * as test from './utils/test.js';
export * as trigo from './utils/trigo.js';
export * as type from './utils/type.js';
export * as url from './utils/url.js';
export * as utf8 from './utils/utf8.js';
export * as xml from './utils/xml.js';

const version = '1.2.0';

const utils = {
    array: ArrayUtil,
    base64: Base64Util,
    color: ColorUtil,
    date: DateUtil,
    ease: EaseUtil,
    func: FuncUtil,
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
    version,
};

export { version };

export default utils;
