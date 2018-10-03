const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('build', () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('dist'));
});