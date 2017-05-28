var gulp = require('gulp'),
	gcmq = require('gulp-group-css-media-queries'),
	insertLines = require('gulp-insert-lines'),
	cleanCss = require('gulp-clean-css'),
	insert = require('gulp-insert'),
	extName = require('gulp-extname');

gulp.task('default', function () {
	gulp.src('./CSS/dsp-custom.css')
		.pipe(gcmq())
		.pipe(insertLines({
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ####################################################################################################### ║\r\n*   ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		}))
		.pipe(cleanCss())
		.pipe(insert.prepend('/* Built with the LESS CSS preprocessor [http://lesscss.org/]. Please see [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for a repository of source code. */\r\n'))
		.pipe(extName('.min.css'))
		.pipe(gulp.dest('CSS'));
});
