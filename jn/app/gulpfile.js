/*
 * @Author: ZXY 
 * @Date: 2019-01-21 09:49:13 
 * @Last Modified by:   ZXY 
 * @Last Modified time: 2019-01-21 09:49:13 
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');

gulp.task('devScss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('devScss'))
});

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            proxies: [
                { source: '/api/getlist', target: 'http://localhost:3000/api/getlist' }
            ]
        }))
});

gulp.task('dev', gulp.series('devScss', 'server', 'watch'));