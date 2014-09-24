'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins


var bowerFiles = require('main-bower-files');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var es = require('event-stream');
var ngAnnotate = require('gulp-ng-annotate');
var angularFilesort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlify = require('gulp-angular-htmlify');
var sourcemaps = require('gulp-sourcemaps');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var filter = require('gulp-filter');

var gulpAngularExtender = require('gulp-angular-extender');
var replace = require('gulp-replace');

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app2/**/*.css', ['build']);
    gulp.watch('app2/**/*.js', ['build']);
});

// Clean.
gulp.task('clean', function() {
    return gulp.src(['./dist'], {read: false}).pipe(clean());
});

gulp.task('build', function () {

    //get css files
    var cssFiles = gulp.src(['app2/**/*.css', '!app2/bower_components/**']);

    //get js files, be sure to sort for angular
    var jsFiles = gulp.src(['app2/**/*.js', '!app2/bower_components/**', '!app2/**/*.test.js'])
        .pipe(angularFilesort());

    //upload files into index.html page
    gulp.src('./app2/index.html')
        .pipe(inject(gulp.src(bowerFiles( {
            includeDev: true
        }), {read: true}), {
            name: 'bower',
            addRootSlash: false,
            ignorePath: 'app'
        }))
        .pipe(inject(es.merge(
            cssFiles,
            jsFiles), {
            addRootSlash: false,
            ignorePath: 'app'
        }))
        .pipe(gulp.dest('./app2'));

});

gulp.task('dist', ['clean'],  function () {
    var dist = './dist';

    //get css files, copy to dist
    var cssFiles = gulp.src(['app2/**/*.css', '!app2/bower_components/**'])
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))           // concat files together
        .pipe(minifyCSS({keepBreaks:true}))    //minify css
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist));

    var jsFiles = gulp.src(['app2/**/*.js', '!app2/bower_components/**', '!app2/**/*-test.js']) //get js files
        .pipe(angularFilesort())        //sort for angular
        .pipe(ngAnnotate({              //annotate angular for minifaction
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(gulpAngularExtender({         //add templates module for the .html files
            app: [
                'templates'
            ]
        }))
        //.pipe(replace(                      //replace backend api url
        //    /backendUrl',\s+'(.+)'/g,
        //    'backendUrl\', \'http://tracker.trackerproducts.com/\''
        //))
        .pipe(sourcemaps.init())            // setup maps for js files,
        .pipe(concat('all.js'))           // concat files together
        .pipe(uglify())                   // minify it
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist));             // copy to dist

    //get html files, copy to dist
    var htmlFiles = gulp.src(['app2/**/*.html', '!app2/bower_components/**', '!app2/index.html'])
        .pipe(htmlify({                 //turn all our custom tags into valid html, add data- before each ng- tag
            customPrefixes: ['ui-', 'tp-']
        }))
        .pipe(minifyHTML({              //minfiy html
            comments:false,
            spare:true
        }))
        .pipe(templateCache( {
            standalone: true,
            module: 'templates'
        }))       //save html into a templateCache so we don't go back to the server for it
        .pipe(gulp.dest(dist));

    // bower js files
    gulp.src(bowerFiles(), { base: 'app2/bower_components' })
        .pipe(gulp.dest('dist/bower_components'));

    //copy ico
    gulp.src('app2/favicon.ico', { base: 'app' })
        .pipe(gulp.dest(dist));

    //min images
    gulp.src('app2/components/images/*', { base: 'app' })
        //.pipe(imagemin({
        //    progressive: true,
        //    svgoPlugins: [{removeViewBox: false}],
        //    use: [pngcrush()]
        //}))
        .pipe(gulp.dest(dist));

    //inject resources into index.html
    gulp.src('./app2/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: true}), {
            name: 'bower',
            addRootSlash: false,
            ignorePath: 'app'
        }))
        .pipe(htmlify({                 //turn all our custom tags into valid html, add data- before each ng- tag
            customPrefixes: ['ui-', 'tp-']
        }))
        .pipe(inject(es.merge(
            cssFiles,
            htmlFiles,
            jsFiles

        ), {
            addRootSlash: false,
            ignorePath: 'dist'
        }))
        .pipe(gulp.dest(dist));
});




// Default Task
gulp.task('default', ['clean', 'build', 'dist']);
