"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('css', function() {
    gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
    gulp.src(['./node_modules/vue/dist/vue.min.js', './src/js/jquery.min.js', './src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('default', ['css', 'js', 'browser-sync'], function() {
    gulp.watch(['./src/js/*.js'], ['js']).on('change', browserSync.reload);
    gulp.watch(['./src/scss/*.scss'], ['css']).on('change', browserSync.reload);
});