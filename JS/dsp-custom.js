/*!
 * Site-specific JS for the WSU Distinguished Scholarships website.
 *
 * @author - Daniel Rieck ( danielcrieck@gmail.com ) [https://github.com/invokeImmediately]
 */

/**
 * IIFE for main execution.
 */
( function ( $ ) {

"use strict";

/**
 * IIFE for executing statements after the DOM has loaded.
 */
$( function () {
	var htmlNewsHeader = '<section class="row single gutter pad-top"><div class="column one"><secti\
on class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We an\
d Our Students Have Accomplished</h3></div></section></div></section>';
	
	// Tweak HTML source to work around some quirks of WordPress setup
	addPageHeaderOnNewsPages( htmlNewsHeader );
} );

/* -------------------------------------------------------------------------------------------------
** Function Declarations
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
	var $div;
	if ( $body.hasClass( 'single-post' ) ) {
		$body.find( '.column.one' ).first().parent( '.row' ).before( htmlNewsHeader );		
	}
}

} )( jQuery );
