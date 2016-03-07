var gulp = require('gulp');
var minify = require('gulp-minify');
var plumber = require('gulp-plumber');
var exec = require('child_process').exec;
var git = require('gulp-git');

gulp.task('default', ['minify']);

gulp.task('minify', function() {
  gulp.src('src/jsform.js')
    .pipe(plumber())
    .pipe(minify({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function () {
  gulp.watch('src/jsform.js', ['minify']);
});

gulp.task('tag', function () {
  var typeIndex = process.argv.indexOf('--type');
  var msgIndex = process.argv.indexOf('--msg');
  var type, msg, version;
  var child = exec('git describe --tags', function (error, stdout, stderr) {
    if (error) {
      console.log(error);
      return;
    }

    if (typeIndex !== -1) {
      type = process.argv[typeIndex + 1]
    } else {
      type = 'patch';
    }

    version = stdout.trim().split('.');

    if (!version) {
      version = [0,0,0];
    }

    switch (type) {
      case 'major':
        version[0] = parseInt(version[0]) + 1;
        version[1] = 0;
        version[2] = 0;
        break;
      case 'minor':
        version[1] = parseInt(version[1]) + 1;
        version[2] = 0;
        break;
      case 'patch':
        version[2] = parseInt(version[2]) + 1;
        break;
      default:
        throw new Error('You need to specify --type (major, minor, patch)');
    }

    version = version.join('.');

    if (msgIndex !== -1) {
      msg = process.argv[msgIndex + 1];
    } else {
      msg = 'Bumping version';
    }

    git.tag(version, msg, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      git.push('origin', version, function (err) {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  });
});