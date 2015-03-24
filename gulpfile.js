
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith');


gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});


gulp.task('install', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
    
});

gulp.task('sprite', function () {
    
    var spriteData = gulp.src('./ngv/images/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'angular-velocity-sprite.png',
            cssName: 'angular-velocity-sprite.scss'
        }));

    spriteData.img
        .pipe(gulp.dest('./dist'));

    return spriteData.css
        .pipe(gulp.dest('./ngv/styles'));
});


gulp.task('build', ['install','sprite'], function() {

    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    gulp.src("./ngv/partials/*.html")
        .pipe(ngHtml2Js({
            moduleName: "ngvPartials",
            prefix: "/ngv/partials/"
        }))
        .pipe(concat("templateCachePartials.js"))
        .pipe(gulp.dest("./dist"));

    gulp.src('./ngv/styles/*.*css')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
    
});


gulp.task('watch', function() {
    gulp.watch(['./ngv/partials/*.html', './ngv/styles/*.*css'], ['build']);
});


gulp.task('default', ['watch', 'webserver']);


gulp.task('prod', function() {

    var ngHtml2Js = require("gulp-ng-html2js");
    var minifyHtml = require("gulp-minify-html");
    var concat = require("gulp-concat");
    var uglify = require("gulp-uglify");

    gulp.src("./ngv/partials/*.html")
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "NgvPartials",
            prefix: "/partials"
        }))
        .pipe(concat("partials.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/partials"));

});

