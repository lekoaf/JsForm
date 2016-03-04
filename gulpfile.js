var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('default', ['minify']);

gulp.task('minify', function() {
  gulp.src('src/jsform.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        ignoreFiles: ['jsform.min.js']
    }))
    .pipe(gulp.dest('src'))
});

gulp.task('watch', function () {
  gulp.watch('src/jsform.js', ['minify']);
});