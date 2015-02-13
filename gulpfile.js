var gulp = require('gulp');

gulp.task('html2js', function() {

    var ngHtml2Js = require("gulp-ng-html2js");
    var concat = require("gulp-concat");

    gulp.src("./ngv/partials/*.html")
        .pipe(ngHtml2Js({
            moduleName: "ngvPartials",
            prefix: "/ngv/partials/"
        }))
        .pipe(concat("partials.js"))
        .pipe(gulp.dest("./dist"));
    
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch('./ngv/partials/*.html', ['html2js']);
});

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