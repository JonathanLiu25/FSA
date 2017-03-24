var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

var ROOT = path.join(__dirname);
var PUBLIC_DIR_PATH = path.join(ROOT, './public');
var MAIN_JS_PATH = path.join(ROOT, './browser/main.js');
var MAIN_CSS_PATH = path.join(ROOT, './sass/main.scss');
var ALL_SASS_PATH = path.join(ROOT, './sass/**/*.scss');

var bundler = watchify(browserify(watchify.args));
bundler.add(MAIN_JS_PATH);
bundler.transform(babelify);
bundler.transform(reactify);

var bundleUp = function () {

    gutil.log(gutil.colors.blue('Bundling con Browserify!'));

    var bundle = bundler.bundle();

    bundle.on('error', function (err) {
        gutil.log('Browserify Error', err.message);
    });

    bundle
        .pipe(source('main.js'))
        .pipe(gulp.dest(PUBLIC_DIR_PATH))
        .pipe(livereload());
};
bundler.on('update', bundleUp);
bundler.on('log', console.log.bind(console));


gulp.task('buildJS', bundleUp);

gulp.task('buildCSS', function () {

    var includes = [require('node-reset-scss').includePath];

    return gulp.src(MAIN_CSS_PATH)
        .pipe(plumber())
        .pipe(sass({ includePaths: includes }))
        .pipe(gulp.dest(PUBLIC_DIR_PATH))
        .pipe(livereload());
});

gulp.task('default', function () {
    livereload.listen();
    gulp.start('buildJS');
    gulp.watch(ALL_SASS_PATH, ['buildCSS']);
});