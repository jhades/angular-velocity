var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');


var PATHS = {
    src: {
        js: 'modules/**/*.ts',
        html: 'modules/**/*.html'
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/systemjs/dist/system-csp-production.js'
    ],
    typings: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('js', function () {
    var typescript = require('gulp-typescript');
    var tsResult = gulp.src([PATHS.src.js])
        .pipe(typescript({
            noImplicitAny: false,
            module: 'system',
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html).pipe(gulp.dest('dist'));
});

gulp.task('libs', function () {
    return gulp.src(PATHS.lib).pipe(gulp.dest('dist/lib'));
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

gulp.task('build-fonts', function (done) {
    return gulp.src(['./modules/nv/styles/fonts/*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build-copy', function (done) {
    return gulp.src(['./modules/nv/images/*.gif'])
        .pipe(gulp.dest('dist/images'));
});


gulp.task('default', ['libs', 'html', 'js', 'build-css','build-fonts', 'build-copy'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);

    app = connect().use(serveStatic(__dirname ));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port + "/dist/showcase");
    });
});


