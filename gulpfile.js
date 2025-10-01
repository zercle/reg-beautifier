const {src, dest, series, parallel, watch} = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();

const isProd = process.env.NODE_ENV === 'production';

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
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(isProd, cssnano()))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function buildJs() {
    return src('src/js/**/*.js')
        .pipe(gulpif(isProd, terser()))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

const manifest = series(cleanManifest, copyManifest);
const img = series(cleanImage, copyImage);
const font = series(cleanFont, copyFont);
const css = series(cleanCss, buildCss);
const js = series(cleanJs, buildJs);

function serve(done) {
    browserSync.init({
        server: {
            baseDir: './dist',
            directory: true
        },
        open: false,
        notify: false,
        ui: false
    });
    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function watchCss() {
    return watch('src/scss/**/*.scss', css);
}

function watchJs() {
    return watch('src/js/**/*.js', js);
}

function watchManifest() {
    return watch('manifest.json', series(manifest, reload));
}

const watchAll = parallel(watchManifest, watchCss, watchJs);
const build = parallel(manifest, img, font, css, js);
const dev = series(build, serve, watchAll);

exports.css = css;
exports.copyImage = copyImage;
exports.serve = serve;
exports.watch = watchAll;
exports.build = build;
exports.dev = dev;
exports.default = build;
