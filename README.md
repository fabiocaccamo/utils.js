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

JavaScript utils for lazy devs. This repository contains several commonly used utils in Vanilla JavaScript with zero dependencies. Available through [npm](https://www.npmjs.com/package/@fabiocaccamo/utils.js).

## Table of contents

1. Installation
2. Usage
3. APIs
4. Development
5. Contribution
6. License

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

### Simple Array Example

```JavaScript
var utils = require("@fabiocaccamo/utils.js");

const exampleArray = [0, 1, 1];
const result = utils.array.all(exampleArray);
console.log(result);
```

Expected output: `false`

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

-   `format`

-   `isFuture`

-   `isPast`

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

`npm run watch`

### Test

`npm run test` _(tests run against dist)_

### Build

`npm run build`

## Contribution

### Formatting

Use [`prettier`](https://prettier.io/) code formatter to maintain consistency.
Refer to [.prettierrc](./.prettierrc) for specific formatting.

### Testing Guidelines

`npm run test` uses [gulp](https://gulpjs.com/) task runner and [Mocha](https://mochajs.org/) Javascript testing framework

####[Test Array Example](./test/test_array.js)

```JavaScript
describe('array', function() {
    describe('all', function() {
        var f = arr.all;
        it('test true', function() {
            test.assertEqual(f([true, 1, "ok", [0], { 'a':0 }]), true);
        });
        it('test false', function() {
            test.assertEqual(f([false, 1, "ok", [0], { 'a':0 }]), false);
        });
    });
});
```

Include code coverage report with pull request.

### Security

Refer to [SECURITY.md](./SECURITY.md)

## License

Released under [MIT License](https://github.com/fabiocaccamo/utils.js/blob/main/LICENSE.txt).
