var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('default', function() {
  console.log('Nothing here!');
});

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