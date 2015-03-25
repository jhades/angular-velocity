
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// run bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('install', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// generates a sprite png and the corresponding sass sprite map.
// This is not included in the recurring build and needs to be run separately
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('sprite', function () {
    
    var spriteData = gulp.src('./ngv/images/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'angular-velocity-sprite.png',
            cssName: 'angular-velocity-sprite.scss',
            algorithm: 'top-down',
            padding: 5
        }));
    
        spriteData.css.pipe(gulp.dest('./ngv/styles'));
    
        spriteData.img.pipe(gulp.dest('./dist'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps and stores file names for cache busting purposes 
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('build-css', ['install'], function() {
    return gulp.src('./ngv/styles/*.*css')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading html template via multiple
// http requests
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('build-template-cache',  function() {
    
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    return gulp.src("./ngv/partials/*.html")
        .pipe(ngHtml2Js({
            moduleName: "ngvPartials",
            prefix: "/ngv/partials/"
        }))
        .pipe(concat("templateCachePartials.js"))
        .pipe(gulp.dest("./dist"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites), applies cache busting to the main page css references
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('build', ['install','build-css','build-template-cache'], function() {
    return gulp.src('showcase.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// watches the main file types, and triggers a build when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function() {
    gulp.watch(['./ngv/partials/*.html', './ngv/styles/*.*css'], ['build']);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launch a build upon modification and publish it to a running server
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('server', ['watch', 'webserver']);

/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything, including sprites
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['sprite','build']);