const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
//const groupMedia = require('gulp-group-css-media-queries'); //brock sourcemaps
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

const webpack = require('webpack-stream');

function plumberConfig (string) {
     return {
        errorHandler: notify.onError({
            title: string,
            message: 'Error <%= error.message %>',
            sound: false
        }),
    };
}

gulp.task('remove:docs', (done) => {
    return fs.existsSync('./docs') 
    ? 
    gulp.src('./docs').pipe(clean({force: true})) 
    : 
    done();
})

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
}

gulp.task('html:docs', function() {
    return gulp
        .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./docs/', {hasChanged: changed.compareContents}))
        .pipe(plumber(plumberConfig('Html')))
        .pipe(fileInclude(fileIncludeSettings))
        //.pipe(webpHtml())
        //.pipe(htmlClean())
        .pipe(gulp.dest('./docs/'))
})

gulp.task('sass:docs', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(changed('./docs/css/'))
        .pipe(plumber(plumberConfig('Sass')))
        //.pipe(prefixer())
        .pipe(sassGlob())
        //.pipe(groupMedia())
        .pipe(sass())
        //.pipe(webpSass())
        //.pipe(csso())
        .pipe(gulp.dest('./docs/css/'))
})

gulp.task('images:docs', () => {
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./docs/img/'))
        //.pipe(webp())
        .pipe(gulp.dest('./docs/img/'))

        //.pipe(gulp.src('./src/img/**/*'))
        //.pipe(changed('./docs/img/'))
        //.pipe(imagemin({verbose: true}))
        //.pipe(gulp.dest('./docs/img/'))
})

gulp.task('fonts:docs', () => {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(changed('./docs/fonts/'))
        .pipe(gulp.dest('./docs/fonts/'))
})

gulp.task('files:docs', () => {
    return gulp
        .src('./src/files/**/*')
        .pipe(changed('./docs/files/'))
        .pipe(gulp.dest('./docs/files/'))
})

gulp.task('js:docs', () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(changed('./docs/js/'))
        .pipe(plumber(plumberConfig('JS')))
        //.pipe(babel())
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./docs/js/'));
})

gulp.task('server:docs', () => {
    return gulp
        .src('./docs').pipe(server({
            livereload: true,
            open: true
    }));
})

