
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
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
// This is not included in the recurring development build and needs to be run separately
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('sprite', function () {
    
    var spriteData = gulp.src('./ngv/images/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'angular-velocity-sprite.png',
            cssName: '_angular-velocity-sprite.scss',
            algorithm: 'top-down',
            padding: 5
        }));
    
        spriteData.css.pipe(gulp.dest('./ngv/styles/project'));

        spriteData.img.pipe(gulp.dest('./dist'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('build-css', ['install'], function() {
    return gulp.src('./ngv/styles/**/*.*css')
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
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
    gulp.src('/ngv/directives/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// TODO
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', function() {
    var b = browserify({
        entries: './demo/run-demo-app.js',
        debug: true,
        paths: ['/demo/scripts','./ngv','/ngv/directives']
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        /*.pipe(uglify())*/
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites), applies cache busting to the main page css references
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('build', ['install','build-css','build-template-cache', 'jshint', 'build-js'], function() {
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
    gulp.watch([
        './ngv/partials/*.html',
        './ngv/styles/**/*.*css',
        './demo/forms/*.html', ', ',
        './ngv/directives/*.js'], ['build']);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            port:9000,
            directoryListing: true,
            open: "http://localhost:9000/dist/showcase.html"
        }));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launch a build upon modification and publish it to a running server
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('dev-old', ['watch', 'webserver']);

/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything, including sprites
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['sprite','build']);

/////////////////////////////////////////////////////////////////////////////////////
//
// ANGULAR 2 SECTION
//
/////////////////////////////////////////////////////////////////////////////////////

var del = require('del');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');

var PATHS = {
    src: {
        js: ['ngv2/**/*.js', 'showcase/**/*.js'],
        html: ['ngv2/**/*.html', 'showcase/**/*.html']
    },
    lib: [
        'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
        'node_modules/systemjs/lib/extension-register.js',
        'node_modules/angular2/node_modules/zone.js/zone.js',
        'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js'
    ]
};

gulp.task('clean', function(done) {
    del(['dist'], done);
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
        .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(traceur({
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', ['angular2'], function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
        .pipe(size({showFiles: true, gzip: true}))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('angular2', function () {

    var buildConfig = {
        paths: {
            "angular2/*": "node_modules/angular2/es6/prod/*.es6",
            "rx/*": "node_modules/angular2/node_modules/rx/*.js"
        }
    };

    var Builder = require('systemjs-builder');
    var builder = new Builder(buildConfig);

    return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});

gulp.task('dev', ['build'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port + '/showcase/index.html');
    });
});

gulp.task('build', ['js', 'html', 'libs']);







