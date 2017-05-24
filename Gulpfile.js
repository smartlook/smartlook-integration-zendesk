var gulp = require('gulp');
var minify = require('gulp-minify');


gulp.task('default', function () {
	gulp.src('./js/*.js')
	    .pipe(minify({
	        ext:{
	            min:'-min.js'
	        },
	        exclude: ['tasks'],
	        noSource: true,
	        mangle: true
	    }))
    	.pipe(gulp.dest('./src/assets/dist/js'));
});