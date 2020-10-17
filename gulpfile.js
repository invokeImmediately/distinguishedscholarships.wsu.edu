/*!*************************************************************************************************
 * gulpfile.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Gulp automation task definition file for setting up tasks that build CSS and JS
 *   files for use on the WSUWP website of the WSU Distinguished Scholarships program.
 *
 * DESCRIPTION: This gulp automation task definition file is designed for use on the following
 *   project that is maintained on GitHub:
 *   https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * LICENSE: MIT - Copyright (c) 2020 Washington State University
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 *   and associated documentation files (the “Software”), to deal in the Software without 
 *   restriction, including without limitation the rights to use, copy, modify, merge, publish, 
 *   distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the 
 *   Software is furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all copies or 
 *   substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 *   BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 *   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 *   DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gulp task dependencies..................................................................46
// §2: Specificiation of build settings .......................................................51
//   §2.1: getCssBuildSettings()...............................................................54
//   §2.2: getJsBuildSettings()...............................................................106
// §3: Entry point: Set up of build taks......................................................141
////////////////////////////////////////////////////////////////////////////////////////////////////

( function() {

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gulp task dependencies

const gulpBuilder = require( './WSU-DAESA-JS/gulpCssJsBuilder.js' );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Specificiation of build settings 

////////
// §2.1: getCssBuildSettings()

/**
 * Get the settings for a gulp-mediated custom CSS build from Less source files.
 *
 * @return {object} - Instance of gulpBuilder.CssBuildSettings.
 */
function getCssBuildSettings() {
	return new gulpBuilder.CssBuildSettings( {
		commentRemovalNeedle: /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm,
		dependenciesPath: './WSU-UE---CSS/',
		destFolder: './CSS/',
		fontImportStr: '@import url(\'https://fonts.googleapis.com/css2?family=Open+Sans:ital,' +
			'wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=PT+Serif:ital,wght@0,400;0,7' +
			'00;1,400;1,700&family=Roboto+Condensed:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+M' +
			'ono:ital,wght@0,400;0,700;1,400;1,700&display=swap\');\r\n',
		insertingMediaQuerySectionHeader: {
			'before': /^@media/,
			'lineBefore': '/*! ==================================================================' +
				'==============================\r\n*** Media queries section\r\n*** =============' +
				'================================================================================' +
				'===\r\n***   SUMMARY: Media queries built from precompiled CSS written in the Le' +
				'ss language extension of\r\n***    CSS. Queries in this section are a combinatio' +
				'n of those designed for use on DAESA websites***\r\n    and those intended speci' +
				'fically for use on the Distinguished Scholarships program website.\r\n***\r\n***' +
				'   DESCRIPTION: Fully documented, precompiled source code from which this sectio' +
				'n of the custom\r\n***    stylesheet was built is developed and maintained on th' +
				'e following two GitHub projects:\r\n***    https://github.com/invokeImmediately/' +
				'WSU-UE---CSS/\r\n***    https://github.com/invokeImmediately/distinguishedschola' +
				'rships.wsu.edu/\r\n***   AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://gi' +
				'thub.com/invokeImmediately)\r\n***\r\n***   LICENSE: ISC - Copyright (c) 2020 Da' +
				'niel C. Rieck.\r\n***\r\n***     Permission to use, copy, modify, and/or distrib' +
				'ute this software for any purpose with or\r\n***     without fee is hereby grant' +
				'ed, provided that the above copyright notice and this permission\r\n***     noti' +
				'ce appear in all copies.\r\n***\r\n***     THE SOFTWARE IS PROVIDED "AS IS" AND ' +
				'DANIEL C. RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO\r\n***     THIS SOFTWARE' +
				' INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT\r' +
				'\n***     SHALL DANIEL C. RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR ' +
				'CONSEQUENTIAL DAMAGES OR\r\n***     ANY DAMAGES WHATSOEVER RESULTING FROM LOSS O' +
				'F USE, DATA OR PROFITS, WHETHER IN AN ACTION OF\r\n***     CONTRACT, NEGLIGENCE ' +
				'OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE\r\n***   ' +
				'  OR PERFORMANCE OF THIS SOFTWARE.\r\n*** ======================================' +
				'==========================================================\r\n**/',
			'stopAfterFirstMatch': true
		},
		minCssFileExtension: '.min.css',
		minCssFileHeaderStr: '',
		sourceFile: './CSS/dsp-custom.less'
	} );
}

////////
// §2.2: getJsBuildSettings()

/**
 * Get the settings for a gulp-mediated custom JS build.
 *
 * @return {object} - Simple collection of settings for JS builds.
 */
function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-DAESA-JS/jQuery.oue-custom.js',
			'./WSU-DAESA-JS/jQuery.animatedCalendar.js',
			'./WSU-DAESA-JS/jQuery.autoScrollingImages.js',
			'./WSU-DAESA-JS/jQuery.cookieObjs.js',
			'./WSU-DAESA-JS/jQuery.css-data.js',
			'./WSU-DAESA-JS/jQuery.cycle2.js',
			'./WSU-DAESA-JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-DAESA-JS/jQuery.are-you-sure.js',
			'./WSU-DAESA-JS/jquery.media.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-DAESA-JS/jQuery.qTip.js',
			'./WSU-DAESA-JS/jQuery.textResize.js',
			'./WSU-DAESA-JS/jQuery.masonry-custom.js',
			'./JS/dsp-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'dsp-custom-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: gulpBuilder.fixFileHeaderComments
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Entry point: Set up of build taks

gulpBuilder.setUpCssBuildTask( getCssBuildSettings() );
gulpBuilder.setUpJsBuildTask( getJsBuildSettings() );
gulpBuilder.setUpHelpTask();
gulpBuilder.setUpDefaultTask();

} )();
