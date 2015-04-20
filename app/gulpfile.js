var gulp = require('gulp')

var less = require('gulp-less');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('less', function () {
  return gulp.src('./client/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('build', function () {
  return browserify('./client/index.js')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('static/build'));
});

gulp.task('default', ['less', 'build']);
