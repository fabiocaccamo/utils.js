'use strict';

import plugins          from 'gulp-load-plugins';
import yargs            from 'yargs';
import browser          from 'browser-sync';
import gulp             from 'gulp';
import rimraf           from 'rimraf';
import sherpa           from 'style-sherpa';
import yaml             from 'js-yaml';
import fs               from 'fs';
import jsImport         from 'gulp-js-import';
import minify           from 'gulp-minify';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { PORT, PATHS } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

gulp.task('build',
    gulp.series(clean, gulp.parallel(javascript, copy)));

gulp.task('default',
    gulp.series('build', server, watch));

function clean(done) {
    rimraf(PATHS.dist, done);
}

function copy() {
    return gulp.src(PATHS.assets)
        .pipe(gulp.dest(PATHS.dist));
}

function javascript() {
    return gulp.src(PATHS.javascript)
        .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
        .pipe($.concat('utils.js'))
        .pipe(jsImport({
            hideConsole: true
        }))
        // .pipe($.if(PRODUCTION, $.uglify()
        //   .on('error', e => { console.log(e.message, e.fileName, e.lineNumber); })
        // ))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest(PATHS.dist));
}

function server(done) {
    browser.init({
        server: PATHS.dist,
        port: PORT
    });
    done();
}

function reload(done) {
    browser.reload();
    done();
}

function watch() {
    gulp.watch(PATHS.assets, copy);
    gulp.watch('src/**/*.js').on('all',
        gulp.series(javascript, browser.reload));
}
