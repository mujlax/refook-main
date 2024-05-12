const gulp = require('gulp');

//Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');

gulp.task('default', 
    gulp.series('remove:dev', 
    gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'), 
    gulp.parallel('watch:dev', 'server:dev')));


gulp.task('docs', 
    gulp.series('remove:docs', 
    gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'), 
    gulp.parallel('server:docs')));

