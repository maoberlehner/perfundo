// Load plugins
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssshrink    = require('gulp-cssshrink');
var livereload   = require('gulp-livereload');
var minifyCSS    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var sass         = require('gulp-ruby-sass');
var gutil        = require('gulp-util');

// Styles
gulp.task('styles', function () {
  return gulp.src('src/**/*.scss')
    .pipe(sass({ style: 'compact', precision: 7, sourcemap: true }))
    .on('error', gutil.log)
    .pipe(autoprefixer('last 2 versions'))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist'));
});

// Minify
gulp.task('minify', ['styles'], function () {
  return gulp.src(['dist/perfundo.css', 'dist/perfundo-icons.css'])
    .pipe(minifyCSS())
    .pipe(cssshrink())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

// Watch
gulp.task('watch', function () {
  gulp.watch('src/**/*.scss', ['styles', 'minify']);
});

// Default
gulp.task('default', function () {
  gulp.start('watch');
});