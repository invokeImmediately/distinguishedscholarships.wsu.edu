// See [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for repository of source code
/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
	$(document).ready(function () {
			/**********************************************************************************************
			 * Tweak CSS                                                                                 *
			 **********************************************************************************************/
			$('div.column h2').each(function () {
					$(this).prev('hr').addClass('narrow-bottom-margin dark-gray');
			});

			/**********************************************************************************************
			 * Tweak HTML source to work around some quirks of WordPress setup                            *
			 **********************************************************************************************/
			var dspSiteURL = window.location.pathname;
			switch(dspSiteURL) {
/*				case '/':
					$('#menu-item-35').remove();
					$('#spine-sitenav ul li').first().css('border-top', 'none');
					$('#spine-sitenav').addClass('homeless');
					break;*/
				case '/news/':
					$('div.column.one').first().parent('section').before('<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section></div></section>');
					break;
			}
			
			/**********************************************************************************************
			 * Implement Dynamic Behaviors of Responsive Elements                                         *
			 **********************************************************************************************/
			$('.drop-down-toggle').click(function () {
					$(this).next('.toggled-panel').toggle(500)
			});
			
			$('.read-more-toggle-in-ctrl').click(function () {
					$(this).toggle(500);
					$(this).next('.read-more-panel').toggle(500);
					$(this).next('.read-more-panel').next('.read-more-toggle-out-ctrl').toggle(500);
			});
			
			$('.read-more-toggle-out-ctrl').click(function () {
					$(this).toggle(500);
					$(this).next('.read-more-panel').toggle(500);
					$(this).next('.read-more-panel').next('.read-more-toggle-in-ctrl').toggle(500);
			});
			
			$('.content-flipper').click(function () {
					$(this).next('.flipped-content-front').toggle(500);
					$(this).next('.flipped-content-front').next('.flipped-content-back').fadeToggle(500);
			});
			
			$('.flipped-content-front').click(function () {
					$(this).toggle(500);
					$(this).next('.flipped-content-back').fadeToggle(500);
			});
			
			/**********************************************************************************************
			 * Tweak University Communication's use of the Cycle2 plugin                                  *
			 **********************************************************************************************/
			$('div.cycle-slideshow').attr('data-cycle-pause-on-hover','true');

	});
})(jQuery);