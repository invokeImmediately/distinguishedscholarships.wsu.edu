/* NODE.JS - Build Production JavaScript File */
var concat = require('../../../../AppData/Roaming/npm/node_modules/concat-files');
concat([
 './dsp-custom.js',
 '../WSU-UE---JS/jQuery.oue-custom.js',
 '../WSU-UE---JS/jQuery.animatedCalendar.js',
 '../WSU-UE---JS/jQuery.autoScrollingImages.js',
 '../WSU-UE---JS/jQuery.cookieObjs.js',
 '../WSU-UE---JS/jQuery.cycle2.js',
 '../WSU-UE---JS/jQuery.forms.js',
 '../../jquery.AreYouSure/jquery.are-you-sure.js',
 '../WSU-UE---JS/jQuery.are-you-sure.js',
 '../WSU-UE---JS/jquery.media.js',
 '../../qTip2/jquery.qtip.min.js',
 '../WSU-UE---JS/jQuery.qTip.js',
 '../WSU-UE---JS/jQuery.textResize.js',
 '../../imagesloaded/imagesloaded.pkgd.min.js',
 '../../masonry/dist/masonry.pkgd.min.js',
 '../WSU-UE---JS/jQuery.masonry-custom.js',
 ], './wp-custom-javascript-source.dsp.js', function() {
    console.log('Concatenation complete.');     
 });
 