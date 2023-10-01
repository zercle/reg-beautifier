const {src, dest, series, parallel, watch} = require('gulp');
const {clean} = require('gulp-clean')
const {sass} = require('gulp-sass');
const {sourcemaps} = require('gulp-sourcemaps');

async function cleanManifest(cb) {
    src(['dist/manifest.json'], {read: false})
        .pipe(clean());
    cb();
}

async function cleanImage(cb) {
    src(['dist/images'], {read: false})
        .pipe(clean());
    cb();
}

async function cleanFont(cb) {
    src(['dist/webfonts'], {read: false})
        .pipe(clean());
    cb();
}

async function cleanCss(cb) {
    return src(['dist/css'], {read: false})
        .pipe(clean());
}

async function cleanJs(cb) {
    src(['dist/js'], {read: false})
        .pipe(clean());
    cb();
}

async function copyManifest(cb) {
    src('manifest.json')
        .pipe(dest('dist'));
    cb();
}

async function copyImage(cb) {
    src('src/images/**/*')
        .pipe(dest('dist/images'));
    cb();
}

async function copyFont(cb) {
    src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(dest('dist/webfonts'));
    cb();
}

async function buildCss(cb) {
    src('src/scss/**/*.scss')
        .pipe(
            sourcemaps.init(),
            sass().on('error', sass.logError),
            sourcemaps.write(),
            dest('dist/css')
        );
    cb();
}

async function buildJs(cb) {
    src('src/js/**/*.js')
        .pipe(dest('dist/js'));
    cb();
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

async function watchCss(cb) {
    const watcher = watch('src/scss/**/*.scss', parallel(css));
    watcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

async function watchJs(cb) {
    const watcher = watch('src/js/**/*.js', parallel(js));
    watcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

async function watchManifest(cb) {
    const watcher = watch('manifest.json', parallel(manifest));
    watcher.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    cb();
}

async function watchAll(cb) {
    parallel(watchManifest, watchCss, watchJs);
    cb();
}

async function build(cb) {
    parallel(manifest, img, font, css, js);
    cb();
}

exports.css = css;
exports.copyImage = copyImage;
exports.watch = watchAll;
exports.default = build;
