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

export const utils = {
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
    version: '1.0.0',
};

export default utils;
