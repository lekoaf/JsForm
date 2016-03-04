var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('default', ['compress']);

gulp.task('compress', function() {
  gulp.src('src/jsform.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        ignoreFiles: ['jsform.min.js']
    }))
    .pipe(gulp.dest('src'))
});