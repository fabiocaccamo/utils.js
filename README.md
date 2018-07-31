[![Build Status](https://travis-ci.org/fabiocaccamo/utils.js.svg?branch=master)](https://travis-ci.org/fabiocaccamo/utils.js)
[![codecov](https://codecov.io/gh/fabiocaccamo/utils.js/branch/master/graph/badge.svg)](https://codecov.io/gh/fabiocaccamo/utils.js)
[![npm version](https://badge.fury.io/js/%40fabiocaccamo%2Futils.js.svg)](https://badge.fury.io/js/%40fabiocaccamo%2Futils.js)

# utils.js
JavaScript utils for lazy devs.

## Installation
`npm install @fabiocaccamo/utils.js`

## Usage

#### RequireJS
```javascript
require(['utils'], function(utils) {
    console.log(utils);
});
```
or
```javascript
require(['@fabiocaccamo/utils.js'], function(utils) {
    console.log(utils);
});
```
## APIs

#### Packages
- `utils.array`
- `utils.base64`
- `utils.color`
- `utils.color.cmyk`
- `utils.color.hex`
- `utils.color.rgb`
- `utils.date`
- `utils.easing`
- `utils.func`
- `utils.geom`
- `utils.geom.point`
- `utils.hex`
- `utils.json`
- `utils.math`
- `utils.math.interpolation`
- `utils.number`
- `utils.object`
- `utils.random`
- `utils.string`
- `utils.test`
- `utils.trigo`
- `utils.type`
- `utils.url`
- `utils.utf8`
- `utils.xml`

## Development

#### Setup
- `git clone https://github.com/fabiocaccamo/utils.js.git`
- `npm install`

#### Test
`npm run test`

#### Watch
`npm run watch`

#### Build
`npm run build`

## License
Released under [MIT License](https://github.com/fabiocaccamo/utils.js/blob/master/LICENSE.txt).

