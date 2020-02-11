[![npm version](https://img.shields.io/npm/v/@fabiocaccamo/utils.js?color=blue&logo=npm)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![Downloads](https://img.shields.io/npm/dt/@fabiocaccamo/utils.js?color=blue)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![Stars](https://img.shields.io/github/stars/fabiocaccamo/utils.js?color=blue&logo=github&logoColor=white&style=flat)](https://github.com/fabiocaccamo/utils.js)
[![BundlePhobia](https://img.shields.io/bundlephobia/min/@fabiocaccamo/utils.js?color=blue)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![BundlePhobia](https://img.shields.io/bundlephobia/minzip/@fabiocaccamo/utils.js?color=blue)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![License](https://img.shields.io/github/license/fabiocaccamo/utils.js.svg?color=blue)](https://github.com/fabiocaccamo/utils.js/blob/master/README.md)

[![Travis Build Status](https://img.shields.io/travis/fabiocaccamo/utils.js?logo=travis)](https://travis-ci.org/fabiocaccamo/utils.js)
[![codecov](https://codecov.io/gh/fabiocaccamo/utils.js/branch/master/graph/badge.svg)](https://codecov.io/gh/fabiocaccamo/utils.js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6bc3162a50224b518ed7dc366535b3ba)](https://www.codacy.com/app/fabiocaccamo/utils.js)

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
<details><summary><code>utils.array</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.base64</code></summary>
<p>

-   `decode`

-   `encode`
</p>
</details>

<details><summary><code>utils.color</code></summary>
<p>

-   `cmykToHex`

-   `cmykToRgb`

-   `hexToCmyk`

-   `hexToRgb`

-   `rgbToCmyk`

-   `rgbToHex`
</p>
</details>

<details><summary><code>utils.color.cmyk</code></summary>
<p>

-   `toString`

-   `toStringCSS`
</p>
</details>

<details><summary><code>utils.color.hex</code></summary>
<p>

-   `average`

-   `distance`

-   `gradient`

-   `gradientMatrix`

-   `interpolateBilinear`

-   `interpolateLinear`

-   `interpolateMultilinear`

-   `nearest`

-   `toCmyk`

-   `toRgb`

-   `toString`

-   `toStringCSS`
</p>
</details>

<details><summary><code>utils.color.rgb</code></summary>
<p>

-   `average`

-   `distance`

-   `gradient`

-   `gradientMatrix`

-   `interpolateBilinear`

-   `interpolateLinear`

-   `interpolateMultilinear`

-   `nearest`

-   `toCmyk`

-   `toRgb`

-   `toString`

-   `toStringCSS`
</p>
</details>

<details><summary><code>utils.date</code></summary>
<p>

-   `clone`

-   `timestamp`

-   `yyyymmdd`
</p>
</details>

<details><summary><code>utils.ease</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.func</code></summary>
<p>

-   `args`

-   `attempt`

-   `bind`

-   `call`

-   `delay`

-   `memoize`

-   `noop`

-   `repeat`

-   `validate`
</p>
</details>

<details><summary><code>utils.geom</code></summary>
<p></p>
</details>

</p>
</details>

<details><summary><code>utils.geom.point</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.hex</code></summary>
<p>

-   `decodeInt`

-   `encodeInt`
</p>
</details>

<details><summary><code>utils.json</code></summary>
<p>

-   `decode`

-   `encode`
</p>
</details>

<details><summary><code>utils.math</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.math.interpolation</code></summary>
<p>

-   `bilinear`

-   `linear`

-   `multilinear`

-   `scalar`
</p>
</details>

<details><summary><code>utils.number</code></summary>
<p>

-   `isBetween`

-   `isEven`

-   `isFloat`

-   `isNegative`

-   `isOdd`

-   `isPositive`

-   `isPrime`
</p>
</details>

<details><summary><code>utils.object</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.random</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.string</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.test</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.trigo</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.type</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.url</code></summary>
<p>

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
</p>
</details>

<details><summary><code>utils.utf8</code></summary>
<p>

-   `decode`

-   `encode`
</p>
</details>

<details><summary><code>utils.xml</code></summary>
<p>

-   `removeNamespaces`
</p>
</details>

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
