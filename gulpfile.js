'use strict';

/* -------------------------------------------------------------------------------------------------
** Variable Declarations
*/

// Gulp task dependencies
var gulpBuilder = require( './WSU-UE---JS/gulpBuilder.js' );

/* -------------------------------------------------------------------------------------------------
** Function declarations
*/

/**
 * Get the settings for a gulp-mediated custom CSS build from Less source files.
 *
 * @return {object} - Instance of gulpBuilder.CssBuildSettings.
 */
function getCssBuildSettings() {
	var commentRemovalNeedle = /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm;
	var dependenciesPath = './WSU-UE---CSS/';
	var destFolder = './CSS/';
	var fontImportStr = '@import url(\'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|\
Roboto+Condensed:400,700|Roboto+Slab|PT+Serif\');\r\n';
	var insertingMediaQuerySectionHeader = {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════\
════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ######################\
################################################################################# ║\r\n*   ╚═══════\
═══════════════════════════════════════════════════════════════════════════════════════════════════\
═════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		};
	var minCssFileExtension = '.min.css';
	var minCssFileHeaderStr = '/*! Built with the Less CSS preprocessor [http://lesscss.org/]. Plea\
se see [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for a repository of\
 source code. */\r\n';
 	var sourceFile = './CSS/dsp-custom.less';

	return new gulpBuilder.CssBuildSettings(commentRemovalNeedle, dependenciesPath,
 		destFolder, fontImportStr, insertingMediaQuerySectionHeader, minCssFileExtension,
 		minCssFileHeaderStr, sourceFile);
}

/**
 * Get the settings for a gulp-mediated custom JS build.
 *
 * @return {object} - Simple collection of settings for JS builds.
 */
function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.animatedCalendar.js',
			'./WSU-UE---JS/jQuery.autoScrollingImages.js',
			'./WSU-UE---JS/jQuery.cookieObjs.js',
			'./WSU-UE---JS/jQuery.css-data.js',
			'./WSU-UE---JS/jQuery.cycle2.js',
			'./WSU-UE---JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'./WSU-UE---JS/jquery.media.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./WSU-UE---JS/jQuery.masonry-custom.js',
			'./JS/dsp-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'dsp-custom-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: gulpBuilder.fixFileHeaderComments
	};
}

/* -------------------------------------------------------------------------------------------------
** Main execution sequence
*/

gulpBuilder.setUpCssBuildTask( getCssBuildSettings() );
gulpBuilder.setUpJsBuildTask( getJsBuildSettings() );
