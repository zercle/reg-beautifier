const {src, dest, series, parallel, watch} = require('gulp');
const {clean} = require('gulp-clean')
const {sass} = require('gulp-sass');
const {sourcemaps} = require('gulp-sourcemaps');

function cleanManifest(cb) {
    src(['dist/manifest.json'])
        .pipe(clean());
    cb();
}

function cleanImage(cb) {
    src(['dist/images'])
        .pipe(clean());
    cb();
}

function cleanFont(cb) {
    src(['dist/webfonts'])
        .pipe(clean());
    cb();
}

function cleanCss(cb) {
    src(['dist/css'])
        .pipe(clean());
    cb();
}

function cleanJs(cb) {
    src(['dist/js'])
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
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css'));
    cb();
}

function buildJs(cb) {
    src('src/js/**/*.js')
        .pipe(dest('dist/js'));
    cb();
}

function manifest(cb) {
    series(cleanManifest, copyManifest);
    cb();
}

function img(cb) {
    series(cleanImage, copyImage);
    cb();
}

function font(cb) {
    series(cleanFont, copyFont);
}

function css(cb) {
    series(cleanCss, buildCss);
    cb();
}

function js(cb) {
    series(cleanJs, buildJs);
    cb();
}

function watchCss(cb) {
    const watcher = watch('src/scss/**/*.scss', parallel(css));
    watcher.on('change', function(path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

function watchJs(cb) {
    const watcher = watch('src/js/**/*.js', parallel(js));
    watcher.on('change', function(path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

function watchManifest(cb) {
    const watcher = watch('manifest.json', parallel(manifest));
    watcher.on('change', function(path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

function watchAll() {
    parallel(watchManifest, watchCss, watchJs);
}

function build() {
    parallel(manifest, img, font, css, js);
}

exports.watch = watchAll;
exports.default = build;
