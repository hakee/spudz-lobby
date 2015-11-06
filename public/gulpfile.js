//Dependencies
var gulp = require('gulp'),
    del = require('del'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    karma = require('gulp-karma'),
    jsdoc = require('gulp-jsdoc'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    ngAnnotate = require('browserify-ngannotate'),
    notify = require('gulp-notify');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

//Gulpfile.js methods
/*******************************
** 1. Clean

** 3. Build-CSS
** 4. Build-Template-Cache
** 5. JSHINT
** 6. Unit Test
** 7. Build-JS
** 8. Build
** 9. Watch
** 10. WebServer
** 11. Dev
** 12. Sprite
** 13. Documentation
** 14. Midway Test
** 15. E2E Test
** 16. IMGS
** 16. Default task
*******************************/

/*
* Cleans the build output (.e.g. public folder)
*/
gulp.task('clean-all', function (cb) {
    del(['public/css', 'public/js', 'public/partials', 'public/index.html'], cb);
});

/*
* Cleans the build output (public/js folder)
*/
gulp.task('clean-js', function (cb) {
    del(['public/js'], cb);
});

/*
* Cleans the build output (.e.g. public/css folder)
*/
gulp.task('clean-css', function (cb) {
    del(['public/css'], cb);
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
        .pipe(gulp.dest('./public/css'));
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
        .pipe(gulp.dest("./public/partials"));
});


/*
* run jsHint over all javascript files in application, using .jshintrc config file
*/
gulp.task('jshint', function(done) {
    gulp.src(['app/*.js','app/**/*.js'])
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
        .pipe(gulp.dest('./public/js/'));
});


/*
* Full build (except sprites), applies cache busting to the main page, .css and .js bundles
* Triggers : Clean-All, Build-CSS, Build-Template-Cache, JSHINT, Build-JS
*/
gulp.task('build', [ 'clean-all','build-css','build-template-cache', 'jshint', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('public'))
        .pipe(notify('Build finished'));
});


/*
* Generate a sprite .png and the corresponding SASS sprite map.
* This is not included in the recurring development build and needs to be run separately
*/
gulp.task('sprite', function () {
    // var spriteData = gulp.src('assets/img/*.jpg')
    //     .pipe(spritesmith({
    //         imgName: 'tour-sprite.png',
    //         cssName: '_tour-sprite.scss',
    //         algorithm: 'top-down',
    //         padding: 5
    //     }));

    // // spriteData.css.pipe(sourcemaps.init())
    // // spriteData.css.pipe(sass())
    // // spriteData.css.pipe(sourcemaps.write('./maps'))
    // spriteData.css.pipe(gulp.dest('./assets/styles'));

    // spriteData.img.pipe(gulp.dest('./public/img'))
});


/*
* Generate documentation files using JSDoc engine. The output is in /doc folder
* JSDoc Documentation : http://usejsdoc.org/
* Gulp JSDoc plugin : https://www.npmjs.com/package/gulp-jsdoc
*/
gulp.task('documentation', function(){
    return gulp.src(['app/*.js', 'app/**/*.js', 'README.md'])
        .pipe(jsdoc('./doc'));
});

/*
* Gather all files in assets/img and move them in public/img
*/
gulp.task('imgs', function(done) {
    del(['public/img'], function(){
        return gulp.src('assets/img/*.*')
            .pipe(gulp.dest('./public/img'));
    });
});


/*
* Watches file system changes and triggers a build when it happens
*/
gulp.task('watch', function() {
    return gulp.watch(['index.html','app/**/*.html', 'assets/styles/*.*', 'app/**/*.js'], ['build']);
});

/*
* Watches file system changes and triggers a build when it happens
*/
gulp.task('coverage-watch', ['coverage'], browserSync.reload);


/*
* Launches a webserver that serves the files in the current directory (/public)
* Triggers : Watch, Build
*/
gulp.task('webserver', ['build'], function() {
//    browserSync.init({
//        notify : true,
//        port : 8000,
//        server : {
//            baseDir : ["public"],
//            routes : {
//                '/node_modules' : 'node_modules'
//            }
//        }
//    });
//
//    gulp.watch('app/**/*.*', ['watch']);
});

/*
* Run karma tests over application .js files, using karma.conf.js config.
* This task triggers Build-JS task, using it as dependency
* Karma URL : http://karma-runner.github.io/0.12/index.html
*/
gulp.task('testing', function(done) {
    var karma = require('karma').server;

    karma.start({
        configFile : __dirname + '/test/karma-unit.conf.js',
        singleRun : true,
        reporters: ['progress', 'html'],
        // the default configuration
        htmlReporter: {
          outputDir: 'test/reports', // where to put the reports 
          templatePath: null, // set if you moved jasmine_template.html
          focusOnFailures: true, // reports show failures on start
          namedFiles: false, // name files instead of creating sub-directories
          pageTitle: null, // page title for reports; browser info by default
          urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
          reportName: 'unit', // report summary filename; browser info by default
        }
    }, function(){
        done();
    })
});

/*
* Run karma tests over application .js files, using karma.conf.js config.
* This task triggers Build-JS task, using it as dependency
* Karma URL : http://karma-runner.github.io/0.12/index.html
*/
gulp.task('coverage', ['testing'], function(done) {
    var karma = require('karma').server;

    karma.start({
        singleRun : true,
        reporters: ['progress', 'coverage'],
        coverageReporter:{
          includeAllSources : true,
          reporters : [{
            type : 'html',
            dir : 'test/reports/coverage',
            subdir : '.'
          },{
            type : 'text'
          }]
        },
        configFile : __dirname + '/test/karma-unit.conf.js',
    }, function(){
        done();
    })
});

/*
* Run karma tests over application .js files, using karma.conf.js config.
* This task triggers Build-JS task, using it as dependency
* Karma URL : http://karma-runner.github.io/0.12/index.html
*/
gulp.task('e2e-test', function(done) {
    var karma = require('karma').server;

    karma.start({
        configFile : __dirname + '/test/karma-e2e.conf.js'
    }, function(){
        done();
    });
});

/*
* Launches a webserver that serves the code coverage results (test/coverage)
* Triggers : Unit-test
*/
//gulp.task('code-coverage', ['coverage'], function(done) {
//    browserSync.init({
//        notify:false,
//        port:7777,
//        server:{
//            baseDir:["test/reports/coverage"],
//        }
//    })
//
//    gulp.watch('app/**/*.*', ['coverage-watch']);
});

/*
* Launches a webserver that serves the files in the current directory (/public)
* Triggers : Watch, Build
*/
gulp.task('unit-test', ['testing'], function(done) {
//    browserSync.init({
//        notify : false,
//        port : 7778,
//        server : {
//            baseDir:["test/reports/unit"],
//        }
//    });
//
//    gulp.watch(['app/**/*.*', 'test/**/*.js'], ['watch']);
});


/*
* Triggers Build task, afterwhich republish to the running webserver (task 10)
*/
gulp.task('dev', ['webserver', 'unit-test', 'code-coverage']);

/*
* Installs and builds everything, including sprites
* Final result resides in /public folder
*/
gulp.task('default', ['build']);
