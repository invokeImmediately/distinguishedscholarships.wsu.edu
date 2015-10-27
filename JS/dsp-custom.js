jQuery.getScript('/documents/2015/06/jquery-qtip-plugin.js');
jQuery.getScript('/documents/2015/06/jquery-getScript-test.js');

/**********************************************************************************************************************
 JQUERY CYCLE2 PLUGIN
 *********************************************************************************************************************/

/* jQuery Cycle2; version: 2.1.5 build: 20140415 | http://jquery.malsup.com/cycle2/ | Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL */
/*Minified code goes here*/
    
/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/

jQuery(document).ready(function () {
    "use strict";
    
    /* Tweak CSS */
    jQuery('div.column h2').each(function () {
        jQuery(this).prev('hr').addClass('narrow-bottom-margin dark-gray');
    });
    
    jQuery('.drop-down-toggle').click(function () {
        jQuery(this).next('.toggledPanel').toggle(500)
    });
    
    jQuery('.read-more-toggle-in-ctrl').click(function () {
        jQuery(this).toggle(500);
        jQuery(this).next('.read-more-panel').toggle(500);
        jQuery(this).next('.read-more-panel').next('.read-more-toggle-out-ctrl').toggle(500);
    });
    
    jQuery('.read-more-toggle-out-ctrl').click(function () {
        jQuery(this).toggle(500);
        jQuery(this).next('.read-more-panel').toggle(500);
        jQuery(this).next('.read-more-panel').next('.read-more-toggle-in-ctrl').toggle(500);
    });
    
    jQuery('.has-tool-tip').each(function () {
		jQuery(this).qtip({
            style: 'qtip-dark',
            content: { text: $(this).next('div')},
            position: {
                target: 'mouse', // Track the mouse as the positioning target
                adjust: { x: 5, y: 15 } // Offset it slightly from under the mouse
            },
            show: {
                effect: function () {
                    jQuery(this).slideDown(200);
                }
            },
            hide: {
                effect: function () {
                    jQuery(this).slideUp(200);
                }
            }
        });
    });
        
    jQuery('.content-flipper').click(function () {
        jQuery(this).next('.flipped-content-front').toggle(500);
        jQuery(this).next('.flipped-content-back').fadeToggle(500);
    });
    
    jQuery('.flipped-content-front').click(function () {
        jQuery(this).next('.flipped-content-front').toggle(500);
        jQuery(this).next('.flipped-content-back').fadeToggle(500);
    });

});