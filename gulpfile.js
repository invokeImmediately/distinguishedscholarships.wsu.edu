var compiledCssSrcFileName = 'dsp-custom.css',
	minCssFileHeaderStr = '/* Built with the LESS CSS preprocessor [http://lesscss.org/]. Please see [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for a repository of source code. */\r\n',
	gulp = require( 'gulp' ),
	lessc = require( 'gulp-less' ),
	gcmq = require( 'gulp-group-css-media-queries' ),
	insertLines = require( 'gulp-insert-lines' ),
	cleanCss = require( 'gulp-clean-css' ),
	insert = require( 'gulp-insert' ),
	extName = require( 'gulp-extname' );

gulp.task( 'buildMinCss', function () {
	gulp.src( './CSS/*.less' )
		.pipe( lessc( {
			paths: ['./WSU-UE---CSS/']
		} ) )
		.pipe( gulp.dest( './CSS/' ) )
		.pipe( gcmq() )
		.pipe( insertLines( {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ####################################################################################################### ║\r\n*   ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		} ) )
		.pipe( cleanCss() )
		.pipe( insert.prepend( minCssFileHeaderStr ) )
		.pipe( extName( '.min.css' ) )
		.pipe( gulp.dest( './CSS/' ) );
} );
