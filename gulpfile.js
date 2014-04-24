var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var jshint     = require('gulp-jshint');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');

var pkg        = require('./package');

var paths = {
  src: {
    all:       './src/**/*',
    js:        './src/**/*.js',
    main:      './src/' + pkg.name + '.js',
    tests:     './src/**/*.spec.js'
  }
};

gulp.task('default', ['build']);

gulp.task('build', function() {
  gulp.src(paths.src.main)
    .pipe(browserify({  }))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function() {
  gulp.src([paths.src.js])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.src.all, ['build']);
});

gulp.task('watch:lint', ['lint'], function() {
  gulp.watch(paths.src.js, ['lint']);
});
