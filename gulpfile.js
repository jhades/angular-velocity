'use strict';

var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var openResource = require('open');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');


gulp.task('clean', function (done) {
    del(['dist'], done);
});

gulp.task('clean:lib', function (done) {
    del(['lib'], done);
});

gulp.task('sprite', function () {

    var spriteData = gulp.src('./modules/nv/images/sprite/*.png')
        .pipe(spritesmith({
            imgName: 'angular-velocity-sprite.png',
            cssName: '_angular-velocity-sprite.scss',
            algorithm: 'top-down',
            padding: 5
        }));

    spriteData.css.pipe(gulp.dest('./modules/nv/styles/project'));

    spriteData.img.pipe(gulp.dest('./dist'))
});


gulp.task('build-nv-css', function() {
    return gulp.src('./modules/nv/**/*.*css')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-showcase-css', function() {
    return gulp.src('./modules/showcase/**/*.*css')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
});


gulp.task('build-css', function(done) {
    runSequence(
        'build-nv-css',
        'build-showcase-css',
        done
    );});


gulp.task('build:angular2', function () {
    var builder = new Builder({
        paths: {
            'angular2/*': 'node_modules/angular2/es6/dev/*.es6',
            rx: 'node_modules/angular2/node_modules/rx/dist/rx.js'
        },
        meta: {
            rx: {
                format: 'cjs'
            }
        }
    });
    return builder.build('angular2/angular2', './lib/angular2.js', {});
});

gulp.task('build:lib', ['build:angular2'], function () {
    gulp.src([
        './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        './node_modules/angular2/node_modules/zone.js/dist/zone.js',
        './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
        './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
        './node_modules/reflect-metadata/Reflect.js',
        './node_modules/reflect-metadata/Reflect.js.map',
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/lodash/index.js'
    ])
        .pipe(gulp.dest('./lib'));
});

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});


gulp.task('build-ts', function (done) {
    return  gulp.src('./modules/**/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .js.pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-html', function (done) {
    return gulp.src(['./modules/showcase/index.html','./modules/showcase/test.html'])
        .pipe(gulp.dest('dist'));
});



gulp.task('build', function (done) {
    runSequence(
        'build-css',
        'build-ts',
        'build-html',
        done
    );
});

gulp.task('serve', ['build'], function () {
    var port = 5555;
    var app;

    gulp.watch(['./modules/**/*.html', './modules/**/*.ts', './modules/**/*.scss'], ['build']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        openResource('http://localhost:' + port + '/dist');
    });
});
