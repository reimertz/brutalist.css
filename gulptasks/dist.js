/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    noop = g.util.noop,
    swig = require('gulp-swig'),
    version = require('../package.json').version,
    template = {
      version: version
    };

gulp.task('styles-dist', ['render-css'], noop);

gulp.task('render-scss', function () {
  return gulp.src(['templates/brutalist.scss'])
    .on('error', g.notify.onError('<%= error.message%>'))
    .pipe(g.data(template))
    .pipe(swig())
    .pipe(g.sass())
    .pipe(g.rename('brutalist.latest.css'))
    .pipe(gulp.dest('dist/latest/'))
    .pipe(g.rename('brutalist.' + version + '.css'))
    .pipe(gulp.dest('dist/'+ version + '/'))
    .pipe(g.minifyCss())
    .pipe(g.rename('brutalist.' + version + '.min.css'))
    .pipe(gulp.dest('dist/'+ version + '/'))
    .pipe(g.rename('brutalist.latest.min.css'))
    .pipe(gulp.dest('dist/latest/'));
});

