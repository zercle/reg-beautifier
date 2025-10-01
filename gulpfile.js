const {src, dest, series, parallel, watch} = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

function cleanManifest() {
    return src(['dist/manifest.json'], {read: false, allowEmpty: true})
        .pipe(clean());
}

function cleanImage() {
    return src(['dist/images'], {read: false, allowEmpty: true})
        .pipe(clean());
}

function cleanFont() {
    return src(['dist/webfonts'], {read: false, allowEmpty: true})
        .pipe(clean());
}

function cleanCss() {
    return src(['dist/css'], {read: false, allowEmpty: true})
        .pipe(clean());
}

function cleanJs() {
    return src(['dist/js'], {read: false, allowEmpty: true})
        .pipe(clean());
}

function copyManifest() {
    return src('manifest.json')
        .pipe(dest('dist'));
}

function copyImage() {
    return src('src/images/**/*')
        .pipe(dest('dist/images'));
}

function copyFont() {
    return src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(dest('dist/webfonts'));
}

function buildCss() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css'));
}

function buildJs() {
    return src('src/js/**/*.js')
        .pipe(dest('dist/js'));
}

const manifest = series(cleanManifest, copyManifest);
const img = series(cleanImage, copyImage);
const font = series(cleanFont, copyFont);
const css = series(cleanCss, buildCss);
const js = series(cleanJs, buildJs);

function watchCss() {
    return watch('src/scss/**/*.scss', css);
}

function watchJs() {
    return watch('src/js/**/*.js', js);
}

function watchManifest() {
    return watch('manifest.json', manifest);
}

const watchAll = parallel(watchManifest, watchCss, watchJs);
const build = parallel(manifest, img, font, css, js);

exports.css = css;
exports.copyImage = copyImage;
exports.watch = watchAll;
exports.default = build;
