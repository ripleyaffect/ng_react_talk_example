var gulp = require('gulp')

var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  return browserify('./client/index.js')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('static/build'));
});

gulp.task('default', ['build']);