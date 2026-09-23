// Tree-shaking test: packs the package with `npm pack`, installs the tarball
// in a temporary directory and bundles small fixtures against it with Rollup
// (node-resolve + terser), then asserts on the bundled output.
//
// Usage: npm run test:treeshake

import assert from 'assert';
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, '../..');
const fixturesDir = path.join(currentDir, 'fixtures');
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const isWindows = process.platform === 'win32';

// markers of code that must never end up in a tree-shaken bundle
// (checked against the non-minified output, where function names are preserved)
const UNRELATED_CODE_MARKERS = {
    'slugify transliteration table': /Ş/,
    'string.levenshtein*': /levenshtein/,
    'ease functions':
        /\b(backIn|bounceOut|elasticIn|exponentialOut|sineInOut|waveSine)\b/,
    'color converters': /\bfunction (toCmyk|toHex|toRgb|toStringCSS)\b/,
    'materialized namespace object': /Object\.freeze\(/,
};

// the minified output of every tree-shakeable fixture must stay under this size
const MAX_MINIFIED_BYTES = 1024;

const fixtures = [
    {
        file: 'a-subpath-func.js',
        functions: ['debounce'],
        check: (mod) =>
            assert.strictEqual(typeof mod.debounce(10, () => {}), 'function'),
    },
    {
        file: 'b-root-namespace-func.js',
        functions: ['debounce'],
        check: (mod) =>
            assert.strictEqual(typeof mod.debounce(10, () => {}), 'function'),
    },
    {
        file: 'c-subpath-string.js',
        functions: ['toUpperCaseFirst'],
        check: (mod) => assert.strictEqual(mod.toUpperCaseFirst('hello'), 'Hello'),
    },
    {
        // string.render depends on type.isNone (-> type.isUndefined, type.isNull, type.isNaN -> object.is):
        // only these functions of type/object must be included
        file: 'd-subpath-string-with-dependency.js',
        functions: [
            'escapeRegex',
            'is',
            'isNaN',
            'isNone',
            'isNull',
            'isUndefined',
            'render',
            'replace',
        ],
        check: (mod) =>
            assert.strictEqual(
                mod.render('Hi {{name}}{{none}}', { name: 'Bob' }),
                'Hi Bob'
            ),
    },
    {
        file: 'e-root-namespace-math.js',
        functions: ['constrain'],
        check: (mod) => assert.strictEqual(mod.constrain(5, 0, 3), 3),
    },
    {
        // the functions used by a real consumer project, imported from the root entry
        file: 'f-consumer-project.js',
        functions: ['constrain', 'debounce', 'toUpperCaseFirst'],
        check: (mod) => assert.strictEqual(mod.toUpperCaseFirst('hello'), 'Hello'),
    },
    {
        // control: the whole default object is used, so the whole library is bundled;
        // it makes sure that the unrelated code markers actually detect unrelated code
        file: 'z-root-default.js',
        treeshakeable: false,
        check: (mod) => assert.strictEqual(mod.default.version, pkg.version),
    },
];

function exportsTargets(exportsField) {
    if (typeof exportsField === 'string') {
        return [exportsField];
    }
    return Object.values(exportsField).flatMap(exportsTargets);
}

function packPackage(tmpDir) {
    const output = execFileSync(
        'npm',
        ['pack', '--json', '--pack-destination', tmpDir],
        {
            cwd: rootDir,
            encoding: 'utf8',
            // npm is a .cmd script on Windows
            shell: isWindows,
        }
    );
    const [info] = JSON.parse(output);
    const packageDir = path.join(tmpDir, 'node_modules', ...pkg.name.split('/'));
    fs.mkdirSync(packageDir, { recursive: true });
    execFileSync('tar', [
        '-xzf',
        path.join(tmpDir, info.filename),
        '-C',
        packageDir,
        '--strip-components=1',
    ]);
    return info;
}

function checkPackedFiles(info) {
    const packedFiles = new Set(info.files.map((file) => file.path));
    const targets = [pkg.main, pkg.module, ...exportsTargets(pkg.exports)];
    for (const target of targets) {
        const file = path.posix.normalize(target);
        assert.ok(
            packedFiles.has(file),
            `${target} is referenced by package.json but missing in the tarball`
        );
    }
    console.log(
        `✔ npm pack: ${info.filename}, ${info.files.length} files, all ${targets.length} package.json targets included`
    );
}

function listModules(dir, prefix = '') {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const name = prefix + entry.name;
        if (entry.isDirectory()) {
            return listModules(path.join(dir, entry.name), `${name}/`);
        }
        return entry.name.endsWith('.js') ? [name.replace(/\.js$/, '')] : [];
    });
}

function checkSubpathExports() {
    // every module in src/utils must have its own subpath export, and vice versa
    const modules = listModules(path.join(rootDir, 'src', 'utils')).sort();
    const subpaths = Object.keys(pkg.exports)
        .filter((key) => !['.', './package.json'].includes(key))
        .map((key) => key.slice(2))
        .sort();
    assert.deepStrictEqual(
        subpaths,
        modules,
        'package.json subpath exports and src/utils modules differ'
    );
    for (const subpath of subpaths) {
        assert.strictEqual(pkg.exports[`./${subpath}`], `./src/utils/${subpath}.js`);
    }
    console.log(
        `✔ exports: one subpath export for each of the ${modules.length} modules`
    );
    return subpaths;
}

function checkIsolatedImports(tmpDir, subpaths) {
    // import each entry point first, in a fresh process: with circular imports between modules,
    // the evaluation order depends on the entry point, so this catches any top-level access
    // to a binding that is not initialized yet (TDZ)
    for (const specifier of [
        pkg.name,
        ...subpaths.map((subpath) => `${pkg.name}/${subpath}`),
    ]) {
        const code = `import * as m from '${specifier}'; if (Object.keys(m).length === 0) throw new Error('no exports');`;
        execFileSync('node', ['--input-type=module', '-e', code], {
            cwd: tmpDir,
            stdio: 'inherit',
        });
    }
    console.log(
        `✔ isolated imports: each of the ${subpaths.length + 1} entry points loads on its own`
    );
}

function checkConsumers(tmpDir) {
    const esm = `
        import assert from 'assert';
        import utils from '${pkg.name}';
        import { func, string, version } from '${pkg.name}';
        import { debounce } from '${pkg.name}/func';
        import { point } from '${pkg.name}/geom';
        import { toRgb } from '${pkg.name}/color/hex';
        assert.strictEqual(utils.version, '${pkg.version}');
        assert.strictEqual(version, '${pkg.version}');
        assert.strictEqual(utils.string.slugify('Hello World'), 'hello-world');
        assert.strictEqual(string.slugify('Hello World'), 'hello-world');
        assert.strictEqual(func.debounce, debounce);
        assert.strictEqual(typeof point.distance, 'function');
        assert.deepStrictEqual(toRgb('#FF0000'), { r: 255, g: 0, b: 0, a: 1 });
    `;
    const cjs = `
        const assert = require('assert');
        const utils = require('${pkg.name}');
        assert.strictEqual(utils.version, '${pkg.version}');
        assert.strictEqual(utils.string.slugify('Hello World'), 'hello-world');
    `;
    fs.writeFileSync(path.join(tmpDir, 'consumer.mjs'), esm);
    fs.writeFileSync(path.join(tmpDir, 'consumer.cjs'), cjs);
    execFileSync('node', ['consumer.mjs'], { cwd: tmpDir, stdio: 'inherit' });
    execFileSync('node', ['consumer.cjs'], { cwd: tmpDir, stdio: 'inherit' });
    console.log(
        '✔ consumers: ESM (default, namespace, subpath imports) and CommonJS (require)'
    );
}

async function bundle(input) {
    const build = await rollup({
        input,
        plugins: [nodeResolve()],
        onwarn: (warning) => {
            // circular imports between modules are expected and harmless,
            // any other warning (eg. an unresolved import) must fail the test
            if (warning.code !== 'CIRCULAR_DEPENDENCY') {
                throw new Error(`${path.basename(input)}: ${warning.message}`);
            }
        },
    });
    try {
        const [code, minified] = await Promise.all(
            [[], [terser()]].map(async (plugins) => {
                const { output } = await build.generate({ format: 'esm', plugins });
                return output[0].code;
            })
        );
        return { code, minified };
    } finally {
        await build.close();
    }
}

async function checkFixture(fixture, tmpDir) {
    const input = path.join(tmpDir, 'fixtures', fixture.file);
    const { code, minified } = await bundle(input);
    const bytes = Buffer.byteLength(minified);
    const functions = [...code.matchAll(/^function ([\w$]+)\(/gm)]
        .map((match) => match[1].replace(/\$\d+$/, ''))
        .sort();

    const module = await import(
        `data:text/javascript;base64,${Buffer.from(minified).toString('base64')}`
    );
    fixture.check(module);

    if (fixture.treeshakeable !== false) {
        assert.deepStrictEqual(
            functions,
            fixture.functions,
            `${fixture.file}: unexpected functions in bundle`
        );
        for (const [name, marker] of Object.entries(UNRELATED_CODE_MARKERS)) {
            assert.ok(!marker.test(code), `${fixture.file}: bundle contains ${name}`);
        }
        assert.ok(
            bytes < MAX_MINIFIED_BYTES,
            `${fixture.file}: minified bundle is ${bytes} bytes (max ${MAX_MINIFIED_BYTES})`
        );
    } else {
        for (const [name, marker] of Object.entries(UNRELATED_CODE_MARKERS)) {
            if (name !== 'materialized namespace object') {
                assert.ok(
                    marker.test(code),
                    `${fixture.file}: control bundle should contain ${name}`
                );
            }
        }
    }
    const label =
        fixture.treeshakeable === false
            ? '(control, whole library)'
            : `[${functions.join(', ')}]`;
    console.log(
        `✔ ${fixture.file.padEnd(40)} ${String(bytes).padStart(6)} B minified  ${label}`
    );
}

async function main() {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'utils-js-treeshake-'));
    try {
        fs.cpSync(fixturesDir, path.join(tmpDir, 'fixtures'), { recursive: true });
        const info = packPackage(tmpDir);
        checkPackedFiles(info);
        const subpaths = checkSubpathExports();
        checkIsolatedImports(tmpDir, subpaths);
        checkConsumers(tmpDir);
        for (const fixture of fixtures) {
            await checkFixture(fixture, tmpDir);
        }
    } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    }
}

main().catch((error) => {
    console.error(
        `✘ ${error instanceof assert.AssertionError ? error.message : error.stack}`
    );
    process.exitCode = 1;
});
