var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('minify-js', function () {
	return gulp.src('./js/*.js')
		.pipe(minify({
			ext: { min: '.min.js' },
			exclude: ['tasks'],
			noSource: true,
			mangle: true
		}))
		.pipe(gulp.dest('./src/assets/dist/js'));
});

gulp.task('minify-css', () => {
  return gulp.src('./css/*.css')
	.pipe(cleanCSS({ compatibility: 'ie8' }))
	.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./src/assets/dist/css'));
});


gulp.task('default', gulp.parallel('minify-js', 'minify-css'));