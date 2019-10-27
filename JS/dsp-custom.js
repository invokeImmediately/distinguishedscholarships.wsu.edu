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
	// Tweak HTML source to work around some quirks of WordPress setup
	var htmlNewsHeader = '<section class="row single gutter pad-top"><div class="column one"><secti\
on class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We an\
d Our Students Have Accomplished</h3></div></section></div></section>';
	addPageHeaderOnNewsPages( htmlNewsHeader );

	// Set up the site's sub header element to automatically resize
	// var subHeaderResizer = new TextAutoResizers( '.sub-header', 198, '.main-header .header-group' );
	// subHeaderResizer.initTextAutoResizing();
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
 * @param {String} headerSlctr - jQuery selector for the header objects that will be animated.
 * @param {String} headerSlctr - jQuery selector for a header's container.
 * @param {Number} speed - The speed of the pan in pixels per second.
 * @param {Number} numPans - The number (> 0) of times the animation will pan forward and back.
 */
function AnimatedGalleryWall( headerSlctr, containerSlctr, speed, numPans ) {

	setUpAnimations();

	/**
	 * Set up the panning animations for gallery wall headers.
	 *
	 * @private
	 */
	function setUpAnimations() {
		var $headers;
		var $thisHeader;

		$headers = $( headerSlctr );
		if ( $headers.length > 0 ) {
			$headers.each( function() {
				$thisHeader = $( this );
				panHeader( $thisHeader );
			} );
		}		
	}

	/**
	 * Cause a gallery wall header to pan back and forth according to prescribed settings.
	 *
	 * @private
	 *
	 * @param {jquery} $header - The jQuery object corresponding to the header in the DOM to be
	 *     panned.
	 */
	function panHeader( $header ) {
		var $container
		var cssData = new CssData( $header );
		var containerWidth;
		var headerWidth;
		var idx;
		var newLeftPos
		var panDuration;
		var stoppingPoint;
		var stoppingDuration;

		$container = $header.parent( containerSlctr );
		headerWidth = $header.width();
		containerWidth = $container.width();
		newLeftPos = -1 * headerWidth + containerWidth;
		panDuration = (headerWidth - containerWidth) / speed * 1000;
		try {
			stoppingPoint = cssData.getData('stop-at');
			if (stoppingPoint !== '') {
				stoppingPoint = parseInt(stoppingPoint, 10) * -1;
				stoppingDuration = -1 * stoppingPoint / speed * 1000;
			} else {
				stoppingPoint = 0;
			}
		} catch ( errorMsg ) {
			console.log( errorMsg );
			stoppingPoint = 0;
		}
		for (idx = 0; idx < numPans; idx++) {
			$header.animate( { left: newLeftPos }, panDuration ).animate( { left: 0 },
				panDuration );
		}
		$header.animate( { left: stoppingPoint }, stoppingDuration );
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
