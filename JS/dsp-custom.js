// See [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for repository of source code
/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
	$(document).ready(function () {
        /**********************************************************************************************
         * Tweak HTML source to work around some quirks of WordPress setup                            *
         **********************************************************************************************/
        var siteURL = window.location.pathname;
        switch(siteURL) {
/*				case '/':
                $('#menu-item-35').remove();
                $('#spine-sitenav ul li').first().css('border-top', 'none');
                $('#spine-sitenav').addClass('homeless');
                break;*/
            case '/news/':
                $('div.column.one').first().parent('section').before('<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section></div></section>');
                break;
        }
        InitWsuIdInputs(".gf-wsu-id-input");
	});
    
    function InitWsuIdInputs(slctrInputs) {
        var $wsuIdInputs = $(slctrInputs).find("input[type='text']");
        $wsuIdInputs.change(function () {
            var $this = $(this);
            var regExMask = /[^0-9]+/g;
            var inputText = $this.val();
            if (regExMask.exec(inputText) != null) {
                $this.val(inputText.replace(regExMask, ""));
                $this.change();
            }
        }).blur(function () {
            var $this = $(this);
            var regExFinalPttrn = /(?:^[0-9]{8}$)|(?:^0[0-9]{8}$)/;
            var inputText = $this.val();
            if (regExFinalPttrn.exec(inputText) == null) {
                $this.val("");
            }
        });
    }
})(jQuery);