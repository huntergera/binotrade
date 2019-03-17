'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    wiredep = require('wiredep').stream,
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    clean = require("gulp-clean"),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync').create(),
    spritesmith = require('gulp.spritesmith'),
    distFolder = 'dist';

// dist
gulp.task('build', function () {
    gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulp.dest(distFolder));
});

// clean
gulp.task('clean', function() {
    return gulp.src(distFolder)
        .pipe(clean());
});

// fonts
gulp.task('fonts', function() {
    gulp.src('app/fonts/*')
        .pipe(gulp.dest(distFolder+'/fonts/'));
});

//images
gulp.task('images', function() {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest(distFolder+'/img'));
});

// For other files from app to distFolder
// gulp.task('extras', function() {
//     return gulp.src([
//         'app/*.*',
//         '!app/*.html'
//     ]).pipe(gulp.dest(distFolder));
// });

// bower
gulp.task('bower', function () {
  gulp.src('./app/*.*')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('./app'));
});

// browser-sync
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: './app'
    });

    gulp.watch('./app/less/**/*.less', ['less']);
    gulp.watch('./app/js/**/*.*').on('change', browserSync.reload);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});

// less
gulp.task('less', function() {
    return gulp.src('./app/less/**/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer(['last 3 version','> 5%']))
        .pipe(cssnano({zindex: false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
});

// watch
gulp.task('watch', function (){
    gulp.watch('./src/less/*.less', [less]);
});

//sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('./app/img/icons/*.png').pipe(spritesmith({
        imgName: 'app/img/sprites/sprite.png',
        cssName: 'app/less/sprite.less',
        padding: 10
    })).pipe(gulp.dest('./'));
});

// default
gulp.task('default', ['serve']);

//dist
gulp.task('dist', ['build', 'fonts', 'images']);