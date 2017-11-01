/*!
 * dsp-custom.js: Site-specific JS for the WSU Distinguished Scholarships website.
 * Author:  Daniel Rieck ( danielcrieck@gmail.com ) [https://github.com/invokeImmediately]
 */
( function ( $ ) {
"use strict";
    
$( function () {
	
	// Tweak HTML source to work around some quirks of WordPress setup
	var siteURL = window.location.pathname;
	switch( siteURL ) {
		case '/news/':
			$( 'div.column.one' ).first().parent( 'section' ).before( '<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section></div></section>' );
			break;
	}
} );

} )( jQuery );
