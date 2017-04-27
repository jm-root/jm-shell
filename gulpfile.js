'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    gulpSequence = require('gulp-sequence'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    eslint = require('gulp-eslint'),
    version = 'v' + require('./package.json').version;

gulp.task('clean', function () {
    return gulp.src(['dist/*', 'lib/*'])
        .pipe(clean({force: true}));
});

gulp.task('jshint', function () {
    return gulp.src([
        'lib/**/*.js',
        'examples/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('eslint', function () {
    return gulp.src([
        'src/**/*.js',
        'test/**/*.js'
    ])
        .pipe(eslint({configFle:"./.eslintrc"}))
        .pipe(eslint.format())
        ;
});

gulp.task('es6to5', ['eslint'], function() {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./lib/'));
});

gulp.task('default', gulpSequence('clean', ['es6to5']));

