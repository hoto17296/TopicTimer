var gulp = require('gulp');
var reactify = require('reactify');

var config = {
  browserify: {
    entries: ['./src/js/index.jsx'],
    transform: [reactify]
  },
  dest: './lib'
};

gulp.task('watch', ['build'], function(){
  gulp.watch('./src/**/*.*', ['build']);
});

gulp.task('build', ['browserify', 'css', 'files']);

var browserify = require('browserify');
var source = require('vinyl-source-stream');
gulp.task('browserify', function(){
  browserify(config.browserify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.dest));
});

var sass = require('gulp-sass');
gulp.task('css', function(){
  gulp.src('src/css/style.scss')
    .pipe(sass())
    .pipe(gulp.dest(config.dest));
});

gulp.task('files', function(){
  gulp.src('src/files/*')
    .pipe(gulp.dest(config.dest));
});
