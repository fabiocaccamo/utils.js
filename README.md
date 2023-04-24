[![](https://img.shields.io/npm/v/@fabiocaccamo/utils.js?color=blue&logo=npm)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![](https://img.shields.io/npm/dt/@fabiocaccamo/utils.js?color=blue)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![](https://img.shields.io/github/stars/fabiocaccamo/utils.js?color=blue&logo=github&logoColor=white&style=flat)](https://github.com/fabiocaccamo/utils.js/stargazers)
[![](https://img.shields.io/bundlephobia/min/@fabiocaccamo/utils.js?color=blue)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![](https://img.shields.io/bundlephobia/minzip/@fabiocaccamo/utils.js?color=blue)](https://www.npmjs.com/package/@fabiocaccamo/utils.js)
[![](https://img.shields.io/github/license/fabiocaccamo/utils.js.svg?color=blue)](https://github.com/fabiocaccamo/utils.js/blob/main/README.md)

[![](https://img.shields.io/github/actions/workflow/status/fabiocaccamo/utils.js/test-package.yml?branch=main&label=build&logo=github)](https://github.com/fabiocaccamo/utils.js/actions/workflows/test-package.yml)
[![](https://codecov.io/gh/fabiocaccamo/utils.js/branch/main/graph/badge.svg)](https://codecov.io/gh/fabiocaccamo/utils.js)
[![](https://api.codacy.com/project/badge/Grade/6bc3162a50224b518ed7dc366535b3ba)](https://www.codacy.com/app/fabiocaccamo/utils.js)

# utils.js

👷 🔧 zero dependencies vanilla JavaScript utils.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [APIs](#apis)
- [Development](#development)
- [Security](#security)
- [License](#license)

## Installation

This library is available through [npm](https://www.npmjs.com/package/@fabiocaccamo/utils.js):

`npm install @fabiocaccamo/utils.js`

## Usage

### CDN

```html
<script src=" https://cdn.jsdelivr.net/npm/@fabiocaccamo/utils.js/dist/utils.min.js"></script>
```

### Local

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

-   `all`

-   `any`

-   `clean`

-   `clone`

-   `contains`

-   `equals`

-   `flatten`

-   `index`

-   `insert`

-   `max`

-   `min`

-   `paginate`

-   `reduce`

-   `remove`

-   `replace`

-   `rotate`

-   `shuffle`

-   `sort`

-   `sum`

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

-   `constrain`

-   `format`

-   `isFuture`

-   `isPast`

-   `max`

-   `min`

-   `timestamp`

-   `today`

-   `tomorrow`

-   `yesterday`

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

-   `debounce`

-   `delay`

-   `memoize`

-   `noop`

-   `repeat`

-   `throttle`

-   `until`

-   `validate`
</p>
</details>

<details><summary><code>utils.geom</code></summary>
<p>
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

-   `euclideanDistance`

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

-   `map`

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

-   `render`

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

-   `haversine`

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

-   `npm run watch`

### Testing

-   `npm run test` _(run tests against dist using [`Gulp`](https://gulpjs.com/) task runner and [`Mocha`](https://mochajs.org/) Javascript testing framework)_

### Formatting

-   `npm run format` _(format code using [`Prettier`](https://prettier.io/) code formatter, refer to [.prettierrc](./.prettierrc) for specific formatting options)_

### Build

-   `npm run build`

## Security

Refer to [SECURITY.md](./SECURITY.md)

## License

Released under [MIT License](https://github.com/fabiocaccamo/utils.js/blob/main/LICENSE.txt).
