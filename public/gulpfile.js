//Dependencies
var gulp = require('gulp'),
    del = require('del'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    karma = require('gulp-karma'),
//    jsdoc = require('gulp-jsdoc'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
//    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

//Gulpfile.js methods
/*******************************
** 1. Clean

** 2. Build-CSS
** 3. Build-Template-Cache
** 4. JSHINT
** 5. Build-JS
** 6. Build
** 7. Watch
** 8. WebServer
** 9. Dev
** 10. Default task
*******************************/

/*
* Cleans the build output (.e.g. dist folder)
*/
gulp.task('clean-all', function (cb) {
    return del(['dist/css', 'dist/js', 'dist/partials', 'dist/index.html'], cb);
});

/*
* Cleans the build output (dist/js folder)
*/
gulp.task('clean-js', function (cb) {
    return del(['dist/js'], cb);
});

/*
* Cleans the build output (.e.g. dist/css folder)
*/
gulp.task('clean-css', function (cb) {
   return  del(['dist/css'], cb);
});


/*
* Build CSS file and create CSS source maps from SCSS files (/assets/styles/*.sccs) , using SASS engine
*/
gulp.task('build-css', ['clean-css'], function() {
    var concat = require("gulp-concat");

    return gulp.src('assets/styles/*.less')
        // .pipe(sourcemaps.init())
        .pipe(less())
        // .pipe(cachebust.resources())
        .pipe(rename('base.min.css'))
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});


/*
* Fill in the nGular template cache, to prevent loading the html templates via
* separate HTTP requests
*/
gulp.task('build-template-cache', ['clean-js'], function() {
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");

    return gulp.src("app/**/*.html")
        .pipe(ngHtml2Js({
            moduleName: "spudzTemplates",
            prefix: "/"
        }))
        .pipe(concat("templateCachePartials.js"))
        .pipe(gulp.dest("./dist/partials"));
});


/*
* run jsHint over all javascript files in application, using .jshintrc config file
*/
gulp.task('jshint', function(done) {
    return gulp.src(['app/*.js','app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    done();
});

/*
* Build a minified Javascript bundle - the order of the js files is determined
* by Browserify
* This task triggers task Clean, using it as a dependency
*/
gulp.task('build-js', ['clean-js', 'build-template-cache'], function() {
    var b = browserify({
        entries: 'app/app.module.js',
        debug: true,
        paths: ['app/components/**', 'app/shared/**', 'app/filters/**', 'assets/js/**'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        // .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        // .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(rename('spudz.min.js'))
        .pipe(gulp.dest('./dist/js/'));
});


/*
* Full build (except sprites), applies cache busting to the main page, .css and .js bundles
* Triggers : Clean-All, Build-CSS, Build-Template-Cache, JSHINT, Build-JS
*/
gulp.task('build', [ 'clean-all','build-css','build-template-cache', 'jshint', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
//        .pipe(notify('Build finished'));
});

/*
* Gather all files in assets/img and move them in dist/img
*/
gulp.task('imgs', function(done) {
    del(['dist/img'], function(){
        return gulp.src('assets/img/*.*')
            .pipe(gulp.dest('./dist/img'));
    });
});


/*
* Watches file system changes and triggers a build when it happens
*/
gulp.task('watch', function() {
    return gulp.watch(['index.html','app/**/*.html', 'assets/styles/*.*', 'app/**/*.js'], ['build']);
});


/*
* Launches a webserver that serves the files in the current directory (/dist)
* Triggers : Watch, Build
*/
gulp.task('webserver', ['build'], function() {
    browserSync.init({
        notify : true,
        port : 8000,
        server : {
            baseDir : ["dist"],
            routes : {
                '/node_modules' : 'node_modules'
            }
        }
    });

    return gulp.watch('app/**/*.*', ['watch']);
});

/*
* Triggers Build task, afterwhich republish to the running webserver (task 10)
*/
gulp.task('dev', ['webserver']);

/*
* Installs and builds everything, including sprites
* Final result resides in /dist folder
*/
gulp.task('default', ['build']);
