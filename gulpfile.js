var gulp = require('gulp');

/**
 * 
 * pre-populate the template cache with all the HTML templates 
 *  
 */

gulp.task('default', function() {

    var ngHtml2Js = require("gulp-ng-html2js");
    var concat = require("gulp-concat");
    var uglify = require("gulp-uglify");

    gulp.src("./ngv/partials/*.html")
        .pipe(ngHtml2Js({
            moduleName: "ngvPartials",
            prefix: "/ngv/partials/"
        }))
        .pipe(concat("partials.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));

    gulp.src("./ngv/styles/*.css")
        .pipe(concat("angular-velocity.css"))
        .pipe(gulp.dest("./dist"));


});

/**
 * 
 * update the template cache with the latest changes - meant for development mode
 *  
 */

gulp.task('watch', function() {
    gulp.watch(['./ngv/partials/*.html', './ngv/styles/*.css'], ['default']);
});

/**
 * 
 * production mode 
 *  
 */
gulp.task('production', function() {

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