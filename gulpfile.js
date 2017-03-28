var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

// Compile sass
gulp.task('sass', function () {
    gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});

// Uglify Javascripts
gulp.task('compress', function() {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

// Watching files
gulp.task('watch', function() {
    gulp.watch("app/js/*.js", ['compress']);
    gulp.watch("app/scss/**/*.scss", ['sass']);
});

// Uglify Plugins
gulp.task('uglifyPlugins', function() {
    return gulp.src(['app/libs/bootstrap/dist/js/bootstrap.js',
        'app/libs/jquery/dist/jquery.js'])
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

// Minify Plugins CSS files
gulp.task('minifyPlugins', function() {
    return gulp.src(['app/libs/bootstrap/dist/css/bootstrap.css'])
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('build', ['uglifyPlugins', 'minifyPlugins']);
gulp.task('default', ['watch']);