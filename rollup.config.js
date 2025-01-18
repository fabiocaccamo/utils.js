import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

// Using import.meta.url to resolve the current directory
const currentDir = path.dirname(new URL(import.meta.url).pathname);

const isProduction = process.env.NODE_ENV === 'production';

export default {
    input: 'src/utils.js',
    output: [
        {
            file: 'dist/utils.esm.js',
            format: 'esm',
            exports: 'named',
        },
        {
            file: 'dist/utils.esm.min.js',
            format: 'esm',
            plugins: [terser()],
            exports: 'named',
        },
        {
            file: 'dist/utils.umd.js',
            format: 'umd',
            name: 'utils',
            exports: 'named',
        },
        {
            file: 'dist/utils.umd.min.js',
            format: 'umd',
            name: 'utils',
            plugins: [terser()],
            exports: 'named',
        },
        {
            file: 'dist/utils.js',
            format: 'umd',
            name: 'utils',
            exports: 'named',
        },
        {
            file: 'dist/utils.min.js',
            format: 'umd',
            name: 'utils',
            plugins: [terser()],
            exports: 'named',
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        ...(isProduction
            ? []
            : [
                  serve({
                      open: false,
                      contentBase: path.resolve(currentDir, 'dist'),
                      port: 3000,
                  }),
                  livereload({
                      watch: 'dist',
                  }),
              ]),
    ],
    watch: {
        clearScreen: false,
    },
};
