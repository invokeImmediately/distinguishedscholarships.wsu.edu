'use strict';

/* -------------------------------------------------------------------------------------------------
** Variable Declarations
*/

// Gulp task dependencies
var cleanCss = require( 'gulp-clean-css' );
var concat = require( 'gulp-concat' );
var extName = require( 'gulp-extname' );
var gcmq = require( 'gulp-group-css-media-queries' );
var gulp = require( 'gulp' );
var insert = require( 'gulp-insert' );
var insertLines = require( 'gulp-insert-lines' );
var lessc = require( 'gulp-less' );
var replace = require( 'gulp-replace' );
var uglifyJs = require( 'gulp-uglify' );

/* -------------------------------------------------------------------------------------------------
** Function declarations
*/

function getCssBuildSettings() {
	return {
		commentRemovalNeedle: /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm,
		dependenciesPath: './WSU-UE---CSS/',
		destFolder: './CSS/',
		insertLinesSettings: {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════\
════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ######################\
################################################################################# ║\r\n*   ╚═══════\
═══════════════════════════════════════════════════════════════════════════════════════════════════\
═════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		},
		minCssFileExtension: '.min.css',
		minCssFileHeaderStr: '/* Built with the LESS CSS preprocessor [http://lesscss.org/]. Please\
 see [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for a repository of s\
ource code. */\r\n',
		sourceFile: './CSS/dsp-custom.less'
	};
}

function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./JS/dsp-custom.js',
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.animatedCalendar.js',
			'./WSU-UE---JS/jQuery.autoScrollingImages.js',
			'./WSU-UE---JS/jQuery.cookieObjs.js',
			'./WSU-UE---JS/jQuery.cycle2.js',
			'./WSU-UE---JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'./WSU-UE---JS/jquery.media.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'../imagesloaded/imagesloaded.pkgd.min.js',
			'../masonry/dist/masonry.pkgd.min.js',
			'./WSU-UE---JS/jQuery.masonry-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'dsp-custom-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: fixFileHeaderComments
	};
}

function fixFileHeaderComments ( match, p1, offset, string ) {
	var replacementStr = match;
	if ( offset == 0 ) {
		replacementStr = '/*!';
	}
	return replacementStr;
}

function setUpCssBuildTask( settings ) {
	gulp.task( 'buildMinCss', function () {
		return gulp.src( settings.sourceFile )
			.pipe( lessc( {
				paths: [settings.dependenciesPath]
			} ) )
			.pipe( replace( settings.commentRemovalNeedle, '' ) )
			.pipe( gulp.dest( settings.destFolder ) )
			.pipe( gcmq() )
			.pipe( insertLines( settings.insertLinesSettings ) )
			.pipe( cleanCss() )
			.pipe( insert.prepend( settings.minCssFileHeaderStr ) )
			.pipe( extName( settings.minCssFileExtension ) )
			.pipe( gulp.dest( settings.destFolder ) );
	} );		
}

function setUpJsBuildTask( settings ) {
	gulp.task( 'buildMinJs', function () {
		return gulp.src( settings.buildDependenciesList )
			.pipe( replace( settings.commentNeedle, settings.replaceCallback ) )
			.pipe( concat( settings.compiledJsFileName ) )
			.pipe( gulp.dest( settings.destFolder ) )
			.pipe( uglifyJs() )
			.pipe( extName( settings.minJsFileExtension ) )
			.pipe( gulp.dest( settings.destFolder ) );
	} );	
}

/* -------------------------------------------------------------------------------------------------
** Main execution sequence
*/

setUpCssBuildTask( getCssBuildSettings() );
setUpJsBuildTask( getJsBuildSettings() );
