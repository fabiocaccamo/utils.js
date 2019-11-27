[![Build Status](https://travis-ci.org/fabiocaccamo/utils.js.svg?branch=master)](https://travis-ci.org/fabiocaccamo/utils.js)
[![codecov](https://codecov.io/gh/fabiocaccamo/utils.js/branch/master/graph/badge.svg)](https://codecov.io/gh/fabiocaccamo/utils.js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6bc3162a50224b518ed7dc366535b3ba)](https://www.codacy.com/app/fabiocaccamo/utils.js)
[![npm version](https://badge.fury.io/js/%40fabiocaccamo%2Futils.js.svg)](https://badge.fury.io/js/%40fabiocaccamo%2Futils.js)
[![GitHub](https://img.shields.io/github/license/fabiocaccamo/utils.js.svg)](https://github.com/fabiocaccamo/utils.js/)

# utils.js
JavaScript utils for lazy devs.

## Installation
`npm install @fabiocaccamo/utils.js`

## Usage

### Browser
```html
<script src="node_modules/@fabiocaccamo/utils.js/dist/utils.min.js"></script>
```

### Node
```JavaScript
var utils = require("@fabiocaccamo/utils.js");
```

## APIs
-   `utils.array`

    -   `clean`

    -   `clone`

    -   `contains`

    -   `equals`

    -   `flatten`

    -   `index`

    -   `insert`

    -   `paginate`

    -   `reduce`

    -   `remove`

    -   `replace`

    -   `rotate`

    -   `shuffle`

    -   `sort`

    -   `unique`

    -   `unzip`

    -   `zip`

-   `utils.base64`
    ​​-   `decode`

    -   `encode`

-   `utils.color`

-   `utils.color.cmyk`

    -   `cmykToHex`

    -   `cmykToRgb`

-   `utils.color.hex`

    -   `hexToCmyk`

    -   `hexToRgb`

-   `utils.color.rgb`

    -   `rgbToCmyk`

    -   `rgbToHex`

-   `utils.date`

    -   `clone`

    -   `timestamp`

    -   `yyyymmdd`

-   `utils.ease`

    -   `backIn`

    -   `backInOut`

    -   `backOut`

    -   `bounceIn`

    -   `bounceInOut`

    -   `bounceOut`

    -   `circularIn`

    -   `circularInOut`

    -   `circularOut`

    -   `cubicIn`

    -   `cubicInOut`

    -   `cubicOut`

    -   `elasticIn`

    -   `elasticInOut`

    -   `elasticOut`

    -   `exponentialIn`

    -   `exponentialInOut`

    -   `exponentialOut`

    -   `none`

    -   `quadraticIn`

    -   `quadraticInOut`

    -   `quadraticOut`

    -   `quarticIn`

    -   `quarticInOut`

    -   `quarticOut`

    -   `quinticIn`

    -   `quinticInOut`

    -   `quinticOut`

    -   `sexticIn`

    -   `sexticInOut`

    -   `sexticOut`

    -   `sineIn`

    -   `sineInOut`

    -   `sineOut`

    -   `waveCosine`

    -   `waveSawtooth`

    -   `waveSine`

-   `utils.func`

    -   `args`

    -   `attempt`

    -   `bind`

    -   `call`

    -   `delay`

    -   `memoize`

    -   `noop`

    -   `repeat`

    -   `validate`

-   `utils.geom`

-   `utils.geom.point`

    -   `add`

    -   `angle`

    -   `cross`

    -   `distance`

    -   `dot`

    -   `equals`

    -   `interpolate`

    -   `length`

    -   `magnitude`

    -   `project`

    -   `rect`

    -   `rotate`

    -   `scale`

    -   `subtract`

    -   `translate`

-   `utils.hex`

    -   `decodeInt`

    -   `encodeInt`

-   `utils.json`

    -   `decode`

    -   `encode`

-   `utils.math`

    -   `average`

    -   `constrain`

    -   `cycle`

    -   `equals`

    -   `factorial`

    -   `gcd`

    -   `lcm`

    -   `lerp`

    -   `map`

    -   `nearest`

    -   `normalize`

    -   `proportion`

    -   `roundDecimals`

    -   `roundToMultiple`

    -   `roundToNearest`

    -   `roundToPower`

    -   `sign`

    -   `summation`

-   `utils.math.interpolation`

    -   `bilinear`

    -   `linear`

    -   `multilinear`

    -   `scalar`

-   `utils.number`

    -   `isBetween`

    -   `isEven`

    -   `isFloat`

    -   `isNegative`

    -   `isOdd`

    -   `isPositive`

    -   `isPrime`

-   `utils.object`

    -   `assign`

    -   `clean`

    -   `clone`

    -   `decodeBase64`

    -   `decodeJSON`

    -   `decodeParameters`

    -   `encodeBase64`

    -   `encodeJSON`

    -   `encodeParameters`

    -   `equals`

    -   `is`

    -   `keypath`

    -   `keys`

    -   `length`

    -   `map`

    -   `merge`

    -   `search`

    -   `values`

-   `utils.random`

    -   `argument`

    -   `bit`

    -   `boolean`

    -   `color`

    -   `element`

    -   `float`

    -   `index`

    -   `integer`

    -   `sign`

    -   `string`

-   `utils.string`

    -   `contains`

    -   `endsWith`

    -   `icontains`

    -   `levenshteinDistance`

    -   `levenshteinSimilarity`

    -   `padLeft`

    -   `padRight`

    -   `padZeros`

    -   `replace`

    -   `reverse`

    -   `rotate`

    -   `slugify`

    -   `startsWith`

    -   `toConstantCase`

    -   `toRandomCase`

    -   `toTitleCase`

    -   `toUpperCaseFirst`

    -   `trim`

    -   `trimLeft`

    -   `trimRight`

-   `utils.test`

    -   `assertArray`

    -   `assertBase64`

    -   `assertBoolean`

    -   `assertDate`

    -   `assertEqual`

    -   `assertError`

    -   `assertFalse`

    -   `assertFunction`

    -   `assertJSON`

    -   `assertNaN`

    -   `assertNone`

    -   `assertNotArray`

    -   `assertNotBase64`

    -   `assertNotBoolean`

    -   `assertNotDate`

    -   `assertNotEqual`

    -   `assertNotError`

    -   `assertNotFunction`

    -   `assertNotJSON`

    -   `assertNotNone`

    -   `assertNotNull`

    -   `assertNotNumber`

    -   `assertNotObject`

    -   `assertNotRegExp`

    -   `assertNotString`

    -   `assertNotUndefined`

    -   `assertNull`

    -   `assertNumber`

    -   `assertNumberAlmostEqual`

    -   `assertObject`

    -   `assertRegExp`

    -   `assertString`

    -   `assertThrows`

    -   `assertTrue`

    -   `assertUndefined`

-   `utils.trigo`

    -   `acosDeg`

    -   `angleDeg`

    -   `angleRad`

    -   `asinDeg`

    -   `atan2Deg`

    -   `atanDeg`

    -   `cosDeg`

    -   `cycleDeg`

    -   `degToRad`

    -   `fastDeg`

    -   `hypo`

    -   `radToDeg`

    -   `sinDeg`

    -   `tanDeg`

-   `utils.type`

    -   `isArray`

    -   `isBase64`

    -   `isBoolean`

    -   `isDate`

    -   `isError`

    -   `isFunction`

    -   `isJSON`

    -   `isNaN`

    -   `isNone`

    -   `isNull`

    -   `isNumber`

    -   `isObject`

    -   `isRegExp`

    -   `isString`

    -   `isType`

    -   `isUndefined`

    -   `of`

-   `utils.url`

    -   `getParameterByName`

    -   `getParameters`

    -   `getParametersDict`

    -   `getParametersList`

    -   `getParametersString`

    -   `getURL`

    -   `hasParameter`

    -   `isFile`

    -   `isHttp`

    -   `isHttps`

    -   `isLocalhost`

-   `utils.utf8`

    -   `decode`

    -   `encode`

-   `utils.xml`

    -   `removeNamespaces`

## Development

### Setup
-   `git clone https://github.com/fabiocaccamo/utils.js.git`
-   `npm install`

### Watch
`npm run watch`

### Test
`npm run test` *(tests run against dist)*

### Build
`npm run build`

## License
Released under [MIT License](https://github.com/fabiocaccamo/utils.js/blob/master/LICENSE.txt).
