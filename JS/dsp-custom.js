/*!
 * Site-specific JS for the WSU Distinguished Scholarships website.
 *
 * @author - Daniel Rieck ( danielcrieck@gmail.com ) [https://github.com/invokeImmediately]
 */

/* -------------------------------------------------------------------------------------------------
** §1: Main execution
*/

/**
 * IIFE for main execution.
 */
( function ( $ ) {

"use strict";

/**
 * jQuery call for executing statements after the DOM has loaded.
 */
$( function () {
	var htmlNewsHeader = '<section class="row single gutter pad-top"><div class="column one"><secti\
on class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We an\
d Our Students Have Accomplished</h3></div></section></div></section>';
	
	// Tweak HTML source to work around some quirks of WordPress setup
	addPageHeaderOnNewsPages( htmlNewsHeader );
} );

/**
 * jQuery call for executing statements after the window has finished loading.
 */
$( window ).on( 'load', function () {
	var selectors = {};
	selectors.galleryWall = '.page-header__gallery-wall-panorama';
	selectors.galleryWallContainer = '.page-header__gallery-wall-wrapper';
	animateGalleryWallHeader( selectors.galleryWall, selectors.galleryWallContainer, 132, 2 );
} );

/* -------------------------------------------------------------------------------------------------
** §2: Class declarations
*/

/**
 * Create a new instance of an animated gallery wall object, which causes gallery wall headers to
 * pan back and forth.
 * 
 * @class
 *
 * @param {string} headerSlctr - jQuery selector for the header objects that will be animated.
 */
function AnimatedGalleryWall( headerSlctr, containerSlctr, speed, numPans ) {

	initializeHeaders();

	function initializeHeaders() {
		var $headers;
		var $thisHeader;

		$headers = $( headerSlctr );
		if ( $headers.length > 0 ) {
			$headers.each( function() {
				$thisHeader = $( this );
				panHeader($thisHeader);
			} );
		}		
	}

	function panHeader( $header ) {
		var $container
		var containerWidth;
		var headerWidth;
		var idx;
		var newLeftPos
		var panDuration;

		$container = $header.parent( containerSlctr );
		headerWidth = $header.width();
		containerWidth = $container.width();
		newLeftPos = -1 * headerWidth + containerWidth;
		panDuration = (headerWidth - containerWidth) / speed * 1000;
		for (idx = 0; idx < numPans; idx++) {
			$header.animate( { left: newLeftPos }, panDuration ).animate( { left: 0 },
				panDuration );
		}
	}
}

/* -------------------------------------------------------------------------------------------------
** §3: Function Declarations
*/

/**
 * Add page headers to news pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function addPageHeaderOnNewsPages( htmlNewsHeader ) {
	aPHONP_addHeaderViaLocation( htmlNewsHeader );
	aPHONP_addHeaderViaClassUtilization( htmlNewsHeader );
}

/**
 * Use the browser's location to add a header to news pages.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function aPHONP_addHeaderViaLocation( htmlNewsHeader ) {
	var siteURL = window.location.pathname;
	switch( siteURL ) {
		case '/news/':
			$( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );
			break;
	}	
}

/**
 * Inspect the body tag to add a header to news pages when certain classes are in use.
 *
 * @param {String} htmlNewsHeader - The HTML comprising the page header to be added to the DOM.
 */
function aPHONP_addHeaderViaClassUtilization( htmlNewsHeader ) {
	var $body = $( 'body' ).first();
	if ( $body.hasClass( 'single-post' ) ) {
		$body.find( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );
	}
}

/**
 * Set up a horizontal panning animation on the header of gallery wall pages.
 *
 * @param {String} headerSlctr - Selector for the header graphic that will be panned.
 * @param {String} containerSlctr - Selector for the container of the header graphic. This function
 *     assumes it has its overflow CSS property set to hidden.
 */
function animateGalleryWallHeader( headerSlctr, containerSlctr, duration, numPans ) {
	var animObj = new AnimatedGalleryWall( headerSlctr, containerSlctr, duration, numPans );
}

} )( jQuery );
