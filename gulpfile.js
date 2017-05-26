var gulp = require('gulp'),
	gcmq = require('gulp-group-css-media-queries'),
	insertLines = require('gulp-insert-lines');

gulp.task('default', function () {
	gulp.src('./CSS/dsp-custom.css')
		.pipe(gcmq())
		.pipe(insertLines({
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ####################################################################################################### ║\r\n*   ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝\r\n*/',
      'stopAfterFirstMatch': true
		}))
		.pipe(gulp.dest('CSS'));
});
