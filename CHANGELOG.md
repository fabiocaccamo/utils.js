# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0](https://github.com/fabiocaccamo/utils.js/releases/tag/1.2.0) - 2026-04-21
-   Fix prototype pollution in `assign` and regex injection in `render`. #193
-   Add `OpenSSF Scorecard` badge, pin actions to SHA and fix workflow permissions. #192
-   Add `openssf-scorecard.yml` workflow.
-   Update `README`.
-   Code formatting.
-   Bump requirements.

## [1.1.1](https://github.com/fabiocaccamo/utils.js/releases/tag/1.1.1) - 2025-10-01
-   Add `utils.json.decodeById` and `utils.object.decodeJSONById` functions.
-   Fix polynomial regular expression used on uncontrolled data.
-   Add `permissions` to workflows.
-   Switch to default `CodeQL` setup.
-   Group `dependabot` dependencies.
-   Bump requirements.

## [1.1.0](https://github.com/fabiocaccamo/utils.js/releases/tag/1.1.0) - 2025-02-05
-   Set UMD exports to default to avoid double namespace.
-   Improve `RegEx`es.

## [1.0.0](https://github.com/fabiocaccamo/utils.js/releases/tag/1.0.0) - 2025-01-18
-   Replace `gulp` with `rollup`.
-   Convert utils code to `ES6`.
-   Rename `function` module to `func`.
-   Add `ESM` support and update `README` accordingly.
-   Specify multiple entrypoints.
-   Set package type as `module`.
-   Export default with all public methods in each module.
-   Use rest args.
-   Add module type checks and assertions.
-   Bump requirements.

## [0.24.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.24.1) - 2024-05-07
-   Update `utils.number.isPrime()` function for faster performance. #119
-   Bump requirements.

## [0.24.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.24.0) - 2024-03-12
-   Add `utils.url.getDomain` method.
-   Extend `utils.url.isLocalhost` regex.
-   Bump requirements.

## [0.23.3](https://github.com/fabiocaccamo/utils.js/releases/tag/0.23.3) - 2023-10-11
-   Improve `utils.array.sort` for sorting array of arrays on specific index value.
-   Create `.pre-commit-config.yaml`.
-   Reformat code with `prettier`.
-   Bump requirements.

## [0.23.2](https://github.com/fabiocaccamo/utils.js/releases/tag/0.23.2) - 2023-05-09
-   Add `version` property.
-   Fix `utils.date.parse` with future dates.

## [0.23.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.23.1) - 2023-05-09
-   Fix `utils.date.parse` method.

## [0.23.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.23.0) - 2023-05-09
-   Add `utils.date.parse` method.
-   Bump requirements.

## [0.22.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.22.0) - 2023-04-24
-   Add `utils.date.constrain` method.

## [0.21.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.21.0) - 2023-04-20
-   Add `max`, `min`, `today`, `tomorrow`, `yesterday` methods to `utils.date`.
-   Use native `String.trim` methods.

## [0.20.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.20.1) - 2023-04-19
-   Fix polynomial regular expression used on uncontrolled data.
-   Fix prototype-polluting function.
-   Add `format` command based on `prettier`.
-   Add `CodeQL` workflow.
-   Improve assertions error messages.
-   Bump requirements.

## [0.20.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.20.0) - 2022-06-29
-   Add `utils.array.all` and `utils.array.any` methods.
-   Add `utils.date.isPast` and `utils.date.isFuture` methods.

## [0.19.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.19.1) - 2022-06-16
-   Add optional date argument to `utils.date.timestamp` method.

## [0.19.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.19.0) - 2022-06-16
-   Add `utils.date.format` method.

## [0.18.2](https://github.com/fabiocaccamo/utils.js/releases/tag/0.18.2) - 2022-05-19
-   Fix `utils.string.toTitleCase` with accented characters.
-   Add `SECURITY.md`.

## [0.18.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.18.1) - 2022-04-07
-   Fix query-string parsing when url contains hash.

## [0.18.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.18.0) - 2022-03-01
-   Add `utils.array.max` and `utils.array.min` methods.
-   Replace Travis CI with GitHub Actions.

## [0.17.2](https://github.com/fabiocaccamo/utils.js/releases/tag/0.17.2) - 2021-12-06
-   Fix prototype pollution. #6
-   Add `codeql-analysis.yml` workflow.

## [0.17.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.17.1) - 2021-09-30
-   Add callback argument support to `utils.array.sum`.

## [0.17.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.17.0) - 2021-09-22
-   Add `utils.math.euclideanDistance` method.

## [0.16.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.16.0) - 2021-09-09
-   Add `utils.string.render` method.

## [0.15.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.15.0) - 2021-08-16
-   Add `utils.array.sum` method.

## [0.14.2](https://github.com/fabiocaccamo/utils.js/releases/tag/0.14.2) - 2021-08-06
-   Simplify args forwarding in `utils.func` methods.

## [0.14.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.14.1) - 2021-08-06
-   Fix `until` interval and scope.

## [0.14.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.14.0) - 2021-08-06
-   Refactor `utils.func.debounce` and `utils.func.throttle` methods.
-   Add `utils.func.until` method.

## [0.13.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.13.0) - 2021-07-27
-   Add `utils.random.map` method.
-   Fix `utils.func.bind` arguments support at call time.

## [0.12.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.12.0) - 2021-07-13
-   Add `utils.func.debounce` and `utils.func.throttle` methods.

## [0.11.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.11.0) - 2020-07-29
-   Add `DateUtil.identifier` and `DateUtil.normalize` methods.
-   Move `API.md` to `docs/API.md`.
-   Replace documentation with `jsdoc2md`.
-   Bump requirements.

## [0.10.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.10.0) - 2020-02-25
-   Add haversine methods.

## [0.9.3](https://github.com/fabiocaccamo/utils.js/releases/tag/0.9.3) - 2019-01-28
-   Add `ArrayUtil.contains` method.

## [0.9.2](https://github.com/fabiocaccamo/utils.js/releases/tag/0.9.2) - 2019-01-24
-   Fix `JSONUtil.decode` error with html entities.

## [0.9.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.9.1) - 2019-01-17
-   Fix `URLUtil.getParameters` when an `=` was present before `?`.

## [0.9.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.9.0) - 2018-12-11
-   Add `ObjectUtil` encode/decode shortcuts.

## [0.8.2](https://github.com/fabiocaccamo/utils.js/releases/tag/0.8.2) - 2018-12-11
-   Fix `URLUtil.getParameters` match error when url argument is not defined.

## [0.8.1](https://github.com/fabiocaccamo/utils.js/releases/tag/0.8.1) - 2018-12-11
-   Fix `URLUtil.getParameters` error when param value contains one or more `=`.

## [0.8.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.8.0) - 2018-12-10
-   Add `StringUtil.replace` method.

## [0.7.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.7.0) - 2018-11-04
-   Add `ObjectUtil.search` method.
-   Fix `JSONUtil.decode` syntax error when `"` are `&quot;`.

## [0.6.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.6.0) - 2018-10-01
-   Add `clone` method to `ArrayUtil`, `DateUtil` and `ObjectUtil`.
-   Add `PointUtil.rect` method.
-   Add length/magnitude methods to `PointUtil`.
-   Update `ColorCmykUtil`, `ColorRgbUtil` and `ColorHexUtil`.
-   Fix `rgb` to `cmyk` and `cmyk` to `rgb` conversion methods.
-   Fix deprecated `babel-preset-es2015` dependency.
-   Increase tests coverage.

## [0.5.0](https://github.com/fabiocaccamo/utils.js/releases/tag/0.5.0) - 2018-09-24
-   Add `UMD` support.
-   Add `UTF8Util`.
-   Add `EaseUtil`.
-   Add `TestUtil` with many useful assertion methods.
-   Add `TypeUtil.isNaN`, `TypeUtil.isOk`, `TypeUtil.isType` methods.
-   Add `MathUtil.lerp`, `MathUtil.equals` methods.
-   Add `ArrayUtil.zip`, `ArrayUtil.unzip`, `ArrayUtil.reduce`, `ArrayUtil.rotate`, `ArrayUtil.scroll` methods.
-   Add `FunctionUtil.attempt`, `FunctionUtil.validate` methods.
-   Add `GeomUtil` and `PointUtil`.
-   Rename `DateUtil.now` to `DateUtil.timestamp`.
-   Add `Travis CI` integration and `codecov` coverage.
-   Add tests for most utility modules.
