const {src, dest, series, parallel, watch} = require('gulp');
const {clean} = require('gulp-clean')
const {sass} = require('gulp-sass');
const {sourcemaps} = require('gulp-sourcemaps');

function cleanManifest(cb) {
    src(['dist/manifest.json'], {read: false})
        .pipe(clean());
    cb();
}

function cleanImage(cb) {
    src(['dist/images'], {read: false})
        .pipe(clean());
    cb();
}

function cleanFont(cb) {
    src(['dist/webfonts'], {read: false})
        .pipe(clean());
    cb();
}

function cleanCss(cb) {
    return src(['dist/css'], {read: false})
        .pipe(clean());
}

function cleanJs(cb) {
    src(['dist/js'], {read: false})
        .pipe(clean());
    cb();
}

function copyManifest(cb) {
    src('manifest.json')
        .pipe(dest('dist'));
    cb();
}

function copyImage(cb) {
    src('src/images/**/*')
        .pipe(dest('dist/images'));
    cb();
}

function copyFont(cb) {
    src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(dest('dist/webfonts'));
    cb();
}

function buildCss(cb) {
    return src('src/scss/**/*.scss')
        .pipe(
            sourcemaps.init(),
            sass().on('error', sass.logError),
            sourcemaps.write(),
            dest('dist/css')
        )
}

function buildJs(cb) {
    return src('src/js/**/*.js')
        .pipe(dest('dist/js'));
}

async function manifest(cb) {
    series(cleanManifest, copyManifest);
    cb();
}

async function img(cb) {
    series(cleanImage, copyImage);
    cb();
}

async function font(cb) {
    series(cleanFont, copyFont);
    cb();
}

async function css(cb) {
    series(cleanCss, buildCss);
    cb();
}

async function js(cb) {
    series(cleanJs, buildJs);
    cb();
}

function watchCss(cb) {
    const watcher = watch('src/scss/**/*.scss', parallel(css));
    watcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

function watchJs(cb) {
    const watcher = watch('src/js/**/*.js', parallel(js));
    watcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

function watchManifest(cb) {
    const watcher = watch('manifest.json', parallel(manifest));
    watcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

function watchAll() {
    parallel(watchManifest, watchCss, watchJs);
}

async function build(cb) {
    parallel(manifest, img, font, css, js);
    cb();
}

exports.css = css;
exports.watch = watchAll;
exports.default = build;
