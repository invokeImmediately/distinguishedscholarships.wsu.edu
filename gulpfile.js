var gulp = require('gulp'),
	gcmq = require('gulp-group-css-media-queries'),
	insertLines = require('gulp-insert-lines'),
  cleanCss = require('gulp-clean-css'),
  dest = require('gulp-dest');

gulp.task('default', function () {
	gulp.src('./CSS/dsp-custom.css')
		.pipe(gcmq())
		.pipe(insertLines({
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ####################################################################################################### ║\r\n*   ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝\r\n*/',
      'stopAfterFirstMatch': true
		}))
    .pipe(cleanCss())
    .pipe(dest('CSS/:name.min.css'))
		.pipe(gulp.dest('.'));
});
