// Include gulp [3],[4]

//READ THIS LINK FIRST, To understand how gulp works as well as browser sync:
// https://www.future-processing.pl/blog/gulp-sass-and-browsersync-in-practice/
// https://markgoodyear.com/2014/01/getting-started-with-gulp/

var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();



// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './**/*.html',
      htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './app/images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});
// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Static Server + watching scss/html files
gulp.task('serve', ['lint'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("app/**/*.js").on('change', browserSync.reload);
    gulp.watch("app/**/*.css").on('change', browserSync.reload);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
});

//https://www.browsersync.io/docs/gulp/
//http://blog.dwaynecrooks.com/post/110903139442/why-do-we-need-to-install-gulp-globally-and

// Compile Our Sass
gulp.task('sass', function() {
   return gulp.src('scss/*.scss')
       .pipe(sass())
        .pipe(gulp.dest('./build/styles/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/**/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./app/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});
// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['lint', 'scripts']);
  gulp.watch('scss/*.scss', ['sass']);
    // watch for CSS changes
  gulp.watch('./app/styles/*.css', function() {
    gulp.run('styles'); // this will recompile everting and update the build/styles/.. files
  });
   // watch for HTML changes
  gulp.watch('./**/**/*.html', function() {
    gulp.run('htmlpage');// this will recompile everting and update the build folder for html.. files
  });
});

// Default Task
//gulp.task('serve', ['lint',  'scripts', 'watch']);
gulp.task('default', ['serve']);
