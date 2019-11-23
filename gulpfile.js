const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean:manifest', function () {
    return del(['dist/manifest.json']);
});
gulp.task('clean:img', function () {
    return del(['dist/images']);
});
gulp.task('clean:font', function () {
    return del(['dist/webfonts']);
});
gulp.task('clean:css', function () {
    return del(['dist/css']);
});
gulp.task('clean:js', function () {
    return del(['dist/js']);
});

gulp.task('manifest', gulp.series('clean:manifest', () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('dist'));
}));

gulp.task('img', gulp.series('clean:img', () => {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));
}));

gulp.task('font', gulp.series('clean:font', () => {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(gulp.dest('dist/webfonts'));
}));

gulp.task('css', gulp.series('clean:css', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
}));

gulp.task('js', gulp.series('clean:js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
}));

gulp.task('watch:css', () => {
    const watcher = gulp.watch('src/scss/**/*.scss', gulp.parallel('css'));
    watcher.on('change', function(path, stats) {
        console.log('File ' + path + ' was changed');
    });
});

gulp.task('watch:js', () => {
    const watcher = gulp.watch('src/js/**/*.js', gulp.parallel('js'));
    watcher.on('change', function(path, stats) {
        console.log('File ' + path + ' was changed');
    });
});

gulp.task('watch:manifest', () => {
    const watcher = gulp.watch('manifest.json', gulp.parallel('manifest'));
    watcher.on('change', function(path, stats) {
        console.log('File ' + path + ' was changed');
    });
});

gulp.task('watch', gulp.parallel('watch:manifest', 'watch:css', 'watch:js'));


gulp.task('default', gulp.parallel('manifest', 'img', 'font', 'css', 'js'));
