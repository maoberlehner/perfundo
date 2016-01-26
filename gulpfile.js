/**
 * Configuration
 */
var config = {
  styles: {
    destination: 'dist',
    watchFiles: ['src/scss/**/*.scss']
  },
  scripts: {
    destination: 'dist',
    watchFiles: ['src/js/**/*.scss']
  }
};

/**
 * Plugins
 */
var del          = require('del');
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var livereload   = require('gulp-livereload');
var minifyCss    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

/**
 * Styles
 */
gulp.task('styles:build', ['clean:styles'], function () {
  return gulp.src(config.styles.watchFiles)
    .pipe(sourcemaps.init())
      .pipe(sass({ precision: 7, errLogToConsole: true }))
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.styles.destination))
    .pipe(livereload());
});

gulp.task('styles:minify', ['styles:build'], function () {
  return gulp.src(config.styles.destination + '/*.css')
    .pipe(minifyCss())
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest(config.styles.destination))
    .pipe(livereload());
});

/**
 * Clean
 *
 * Remove compiled files before regenerating them.
 */
gulp.task('clean:styles', function () {
  return del([
    // Remove everything inside the destination directory.
    config.styles.destination + '/**/*'
  ]);
});

/**
 * Watch
 */
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(config.styles.watchFiles, ['styles:minify']);
});

/**
 * Default task
 *
 * Run this task with `gulp`.
 */
gulp.task('default', function () {
  gulp.start('watch');
});
