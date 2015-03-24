var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test', function () {
	return gulp.src('test/**/*.js')
		.pipe(jasmine());
});

gulp.task('watch', function() {
  gulp.watch([
  	'test/*.js',
  	'src/*.js',
  ], ['test']);
});
