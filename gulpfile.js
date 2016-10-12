var gulp = require('gulp');
var browserSync = require('browser-sync');
gulp.task('remote', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./bin/**/*.*").on('change', browserSync.reload);
});