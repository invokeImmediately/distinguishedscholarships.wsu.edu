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
/***************************************************************************************************************************
 * jQuery.oue-custom.js: custom JavaScript code common to all WSU Undergraduate Education websites                         *
 ***************************************************************************************************************************/
"use strict";

(function ($) {
	var thisFileName = "jQuery.oue-custom.js";

	/*******************************************************************************************************************
	 * ADDITION OF FUNCTIONS to jQuery                                                                                 *
	 *******************************************************************************************************************/
	 
	/**
	 * jQuery.isJQueryObj
	 * DESCRIPTION: Checking function to verify that the passed parameter is a valid jQuery object.
	 */
	$.isJQueryObj = function ($obj) {
		return ($obj && ($obj instanceof $ || $obj.constructor.prototype.jquery));
	}
	
	/**
	 * jQuery.logError
	 * DESCRIPTION: Log an error using the browser console in JSON notation.
	 * PARAMETERS:
	 *   - fileName: the name of the JS source file wherein the error was encountered
	 *   - fnctnName: the name of the function that called $.logError
	 *   - fnctnDesc: a description of what the calling function is supposed to do
	 *   - errorMsg: the message that describes what went wrong within the calling function
	 */
	$.logError = function (fileName, fnctnName, fnctnDesc, errorMsg) {
		var thisFuncName = "jQuery.logError";
		var thisFuncDesc = "Log an error using the browser console in JSON notation.";
		var bitMask;
		
		bitMask = typeof fileName === "string";
		bitMask = (typeof fnctnName === "string") | (bitMask << 1);
		bitMask = (typeof fnctnDesc === "string") | (bitMask << 1);
		bitMask = (typeof errorMsg === "string") | (bitMask << 1);
		if (bitMask === 15) {
			console.log("error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName 
				+ "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg 
				+ "'\n\t};");
		} else {
			var incorrectTypings;
			var bitMaskCopy;
			var newErrorMsg;
			
			// Determine how many incorrectly typed arguments were encountered
			for (var i=0, incorrectTypings = 0, bitMaskCopy = bitMask; i < 4; i++) {
				incorrectTypings += bitMaskCopy & 1;
				bitMaskCopy = bitMaskCopy >> 1;
			}
			
			// Construct a new error message
			if (incorrectTypings == 1) {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly typed argument."
			} else {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed arguments."
			}
			newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n";
			newErrorMsg += "\t\tfileName = " + fileName + "\n";
			if (!(bitMask & 1)) {
				newErrorMsg = "\t\ttypeof filename = " + (typeof fileName) + "\n";
			}
			newErrorMsg += "\t\tfnctnName = " + fnctnName + "\n";
			if(!((bitMask & 2) >> 1)) {
				newErrorMsg = "\t\ttypeof fnctnName = " + (typeof fnctnName) + "\n";
			}
			newErrorMsg += "\t\tfnctnDesc = " + fnctnDesc + "\n";
			if(!((bitMask & 4) >> 2)) {
				newErrorMsg = "\t\ttypeof fnctnDesc = " + (typeof fnctnDesc) + "\n";
			}
			newErrorMsg += "\t\terrorMsg = " + errorMsg + "\n";
			if(!((bitMask & 8) >> 3)) {
				newErrorMsg = "\t\ttypeof errorMsg = " + (typeof errorMsg) + "\n";
			}

			// Recursively call jQuery.logError with the new error message.
			$.logError(
				thisFileName,
				thisFuncName,
				thisFuncDesc,
				newErrorMsg
			);
		}
	}

	/*******************************************************************************************************************
	 * Function calls made once the DOM IS READY                                                                       *
	 *******************************************************************************************************************/
	$(function () {
		var argsList = new Object(); // List of arguments that will be passed to functions
		var args;
		
		// Set up organized list of arguments to be passed to functions called during document initialization
		argsList.fixDogears = {
			slctrSiteNav: "#spine-sitenav",
			slctrDogeared: "li.current.active.dogeared",
			removedClasses: "current active dogeared"
		};
		argsList.addBlankTargetAttributes = {
			slctrSpine: "#spine",
			slctrExternalLinks: "a.external"
		};
		argsList.checkForLrgFrmtSingle = {
			slctrSingle: ".single.large-format-friendly",
			slctrMainHdr: "header.main-header",
			slctrHdrGroup: ".header-group",
			centeringClass: "centered"
		};
		argsList.initHrH2Motif = {
			slctrStandardH2: ".column > h2:not(.fancy), .column > section > h2:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			h2ClassesAdded: "no-top-margin",
			hrClassesAdded: "narrow-bottom-margin dark-gray thicker",
			animAddDrtn: 250
		};
		argsList.initFancyHrH2Motif = {
			slctrFancyH2: ".column > h2.fancy, .column > section > h2.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin dark-gray thicker encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initHrH3Motif = {
			slctrStandardH3: ".column > h3:not(.fancy), .column > section > h3:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "narrow-bottom-margin crimson",
			animAddDrtn: 250
		};
		argsList.initFancyHrH3Motif = {
			slctrFancyH3: ".column > h3.fancy, .column > section > h3.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin crimson encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initDropDownToggles = {
			slctrToggle: ".drop-down-toggle",
			slctrWhatsToggled: ".toggled-panel",
			activatingClass: "activated",
			animDuration: 500
		};
		argsList.initReadMoreToggles = {
			slctrToggleIn: ".read-more-toggle-in-ctrl",
			slctrToggleOut: ".read-more-toggle-out-ctrl",
			slctrPanel: ".read-more-panel",
			animDuration: 500
		};
		argsList.initContentFlippers = {
			slctrCntntFlppr: ".content-flipper",
			slctrFlppdFront: ".flipped-content-front",
			slctrFlppdBack: ".flipped-content-back",
			animDuration: 500
		};
		argsList.initDefinitionLists = {
			slctrDefList: "dl.toggled",
			slctrLrgFrmtSection: ".large-format-friendly",
			slctrColOne: ".column.one",
			slctrColTwo: ".column.two",
			dtActivatingClass: "activated",
			ddRevealingClass: "revealed",
			animSldDrtn: 400,
			animHghtDrtn: 100
		};
		argsList.addDefinitionListButtons = {
			slctrDefList: argsList.initDefinitionLists.slctrDefList,
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			btnDisablingClass: "disabled",
			dtActivatingClass: argsList.initDefinitionLists.dtActivatingClass,
			ddRevealingClass: argsList.initDefinitionLists.ddRevealingClass,
			animSldDrtn: argsList.initDefinitionLists.animSldDrtn
		};
		argsList.initQuickTabs = {
			slctrQtSctn: "section.row.single.quick-tabs"
		};
		argsList.initTocFloating = {
			slctrToc: "p.vpue-jump-bar",
			slctrBackToToc: "p.vpue-jump-back"
		};
		argsList.initTriggeredByHover = {
			slctrTrggrdOnHvr: ".triggered-on-hover",
			slctrCntntRvld: ".content-revealed",
			slctrCntntHddn: ".content-hidden",
			animDuration: 200
		};
		
		// Call document initialization functions
		args = argsList.fixDogears;
		fixDogears(
			args.slctrSiteNav,
			args.slctrDogeared,
			args.removedClasses
		);
		
		args = argsList.addBlankTargetAttributes;
		addBlankTargetAttributes(
			args.slctrSpine,
			args.slctrExternalLinks
		);
		
		args = argsList.checkForLrgFrmtSingle;
		checkForLrgFrmtSingle(
			args.slctrSingle,
			args.slctrMainHdr,
			args.slctrHdrGroup,
			args.centeringClass
		);
		
		args = argsList.initHrH2Motif;
		initHrH2Motif(
			args.slctrStandardH2,
			args.slctrPrevHr,
			args.h2ClassesAdded,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH2Motif;
		initFancyHrH2Motif(
			args.slctrFancyH2,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initHrH3Motif;
		initHrH3Motif(
			args.slctrStandardH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH3Motif;
		initFancyHrH3Motif(
			args.slctrFancyH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initDropDownToggles;
		initDropDownToggles(
			args.slctrToggle,
			args.slctrWhatsToggled,
			args.activatingClass,
			args.animDuration
		);
		
		args = argsList.initReadMoreToggles;
		initReadMoreToggles(
			args.slctrToggleIn,
			args.slctrToggleOut,
			args.slctrPanel,
			args.animDuration
		);
		
		args = argsList.initContentFlippers;
		initContentFlippers(
			args.slctrCntntFlppr,
			args.slctrFlppdFront,
			args.slctrFlppdBack,
			args.animDuration
		);
		
		args = argsList.initDefinitionLists;
		initDefinitionLists(
			args.slctrDefList,
			args.slctrLrgFrmtSection,
			args.slctrColOne,
			args.slctrColTwo,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn,
			args.animHghtDrtn
		);
		
		args = argsList.addDefinitionListButtons;
		addDefinitionListButtons(
			args.slctrDefList,
			args.expandAllClass,
			args.collapseAllClass,
			args.btnDeactivatingClass,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn
		);
		
		args = argsList.initQuickTabs;
		initQuickTabs(
			args.slctrQtSctn
		);
		
		args = argsList.initTocFloating;
		initTocFloating(
			args.slctrToc,
			args.slctrBackToToc
		);

		args = argsList.initTriggeredByHover;
		initTriggeredByHover(
			args.slctrTrggrdOnHvr,
			args.slctrCntntRvld,
			args.slctrCntntHddn,
			args.animDuration
		);
		
		// TODO: initScrollingSidebars("...");
		
	});
	
	/*******************************************************************************************************************
	 * WINDOW LOAD event bindings                                                                                      *
	 *******************************************************************************************************************/
	$(window).on("load", function () {
		var params = new Object();
		var theseParams;
		
		// Set up parameters for functions called during the window load event
		params.finalizeLrgFrmtSideRight = {
			slctrSideRight: ".side-right.large-format-friendly",
			slctrColOne: ".column.one",
			slctrColTwo: ".column.two",
			trggrWidth: 1051,
			animDuration: 100
		};
		params.showDefinitionListButtons = {
			slctrDefList: "dl.toggled",
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			animFadeInDrtn: 400
		};
		params.initWelcomeMessage = {
			slctrWlcmMsg: "#welcome-message",
			slctrPostWlcmMsg: "#post-welcome-message",
			msgDelay: 1000,
			fadeOutDuration: 500,
			fadeInDuration: 500
		};
		params.addTabPressListener = {
			listenerCallback: handleTabPressForA11y
		}
		
		// Make calls to functions
		theseParams = params.finalizeLrgFrmtSideRight;
		finalizeLrgFrmtSideRight(
			theseParams.slctrSideRight,
			theseParams.slctrColOne,
			theseParams.slctrColTwo,
			theseParams.trggrWidth,
			theseParams.animDuration
		);
		theseParams = params.showDefinitionListButtons;
		showDefinitionListButtons(
			theseParams.slctrDefList,
			theseParams.expandAllClass,
			theseParams.collapseAllClass,
			theseParams.animFadeInDrtn
		);
		theseParams = params.initWelcomeMessage;
		initWelcomeMessage(
			theseParams.slctrWlcmMsg,
			theseParams.slctrPostWlcmMsg,
			theseParams.msgDelay,
			theseParams.fadeOutDuration,
			theseParams.fadeInDuration
		);
		theseParams = params.addTabPressListener;
		addTabPressListener(
			theseParams.listenerCallback
		);
	});
	
	/*******************************************************************************************************************
	 * WINDOW RESIZE event bindings                                                                                    *
	 *******************************************************************************************************************/
	$(window).resize(function () {
		resizeLrgFrmtSideRight(".side-right.large-format-friendly", "div.column.one", "div.column.two",
		 1051, 100);
	});
	
	/*******************************************************************************************************************
	 * DOCUMENT INITIALIZATION function definitions (designed to be called after DOM is ready)                         *
	 *******************************************************************************************************************/
	
	/**
	 * addBlankTargetAttributes
	 * DESCRIPTION: Adds missing blank target attributes to links within the WSU Spine as needed.
	 * PARAMETERS:
	 *   - slctrSpine: selector string for locating the spine object within the DOM
	 *   - slctrExternalLinks: selector string for locating links within the spine that lead to destination external to the domain
	 */
	function addBlankTargetAttributes(slctrSpine, slctrExternalLinks) {
		var thisFnctnName = "addBlankTargetAttributes";
		var thisFnctnDesc = "Adds missing blank target attributes to links within the WSU Spine as needed.";
		if (typeof slctrSpine === "string" && typeof slctrExternalLinks === "string") {
			var $spine = $(slctrSpine);
			if ($spine.length === 1) {
				var $links = $spine.find(slctrExternalLinks);
				$links.each(function () {
					var $thisLink = $(this);
					if ($thisLink.attr("target") != "_blank") {
						$thisLink.attr("target", "_blank");
						var relStr = $thisLink.attr("rel");
						if (relStr == undefined) {
							$thisLink.attr("rel", "noopener noreferrer");
						} else {
							if (relStr.search(/noopener/i) < 0) {
								relStr += " noopener";
							}
							if (relStr.search(/noreferrer/i) < 0) {
								relStr += " noreferrer";
							}
							$thisLink.attr("rel", relStr);
						}
					}
				});
			} else {
				$.logError(
					thisFileName, thisFnctnName, thisFnctnDesc,
					"I could not locate the WSU Spine element within the DOM."
				);
			}
		} else {
			$.logError(
				thisFileName, thisFnctnName, thisFnctnDesc,
				"I was passed one or more incorrectly typed parameters. Here's what I was passed:\n\ttypeof slctrSpine = " + (typeof slctrSpine) + "\n\ttypeof slctrExternalLinks = " + (typeof slctrExternalLinks)
			);
		}
	}
	
	/**
	 * addDefinitionListButtons
	 * DESCRIPTION: Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists.
	 * PARAMETERS:
	 *   - slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
	 *   - expandAllClass: CSS class for controlling the layout of expand all buttons
	 *   - collapseAllClass: CSS class for controlling the layout of collapse all buttons
	 *   - btnDisablingClass: CSS class applied to disable expand/collapse all buttons
	 *   - dtActivatingClass: CSS class used to indicate an active/expanded state for definition terms
	 *   - ddRevealingClass: CSS class used to realize a revealed, visible state on definitions
	 */
	function addDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, btnDisablingClass,
	 dtActivatingClass, ddRevealingClass, animSldDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists";
		
		// Find and remove any pre-existing expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $existingExpandAlls = $lists.children("." + expandAllClass);
		var $existingCollapseAlls = $lists.children("." + collapseAllClass);
		if ($existingExpandAlls.length > 0) {
			$existingExpandAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Expand all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		if ($existingCollapseAlls.length > 0) {
			$existingCollapseAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Collapse all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		
		// Add initially hidden (via CSS) expand/collapse all buttons to definition lists
		$lists.prepend('<div class="collapse-all-button">[-] Collapse All</div>');
		$lists.prepend('<div class="expand-all-button">[+] Expand All</div>');
		var slctrExpandAll = slctrDefList + " > ." + expandAllClass;
		var $expandAlls = $(slctrExpandAll);
		var slctrCollapseAll = slctrDefList + " > ." + collapseAllClass;
		var $collapseAlls = $(slctrCollapseAll);
		
		// Bind handling functions to button click events
		$expandAlls.click(function() {
			var $thisExpand = $(this);
			if (!$thisExpand.hasClass(btnDisablingClass)) {
				var $nextCollapse = $thisExpand.next("." + collapseAllClass);
				var $parentList = $thisExpand.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if (!$thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.addClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.addClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: $thisDefTermNext[0].scrollHeight
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on an expand all button to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
		$collapseAlls.click(function() {
			var $thisCollapse = $(this);
			if (!$thisCollapse.hasClass(btnDisablingClass)) {
				var $prevExpand = $thisCollapse.prev("." + expandAllClass);
				var $parentList = $thisCollapse.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if ($thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.removeClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.removeClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: 0
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on collapse all button #" + $thisCollapse.index() + "to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
	}

	function addTabPressListener(listenerCallback) {
		console.log( "addTabPressListener was called." );
		window.addEventListener("keydown", listenerCallback);
	}

	function checkForLrgFrmtSingle(slctrSingle, slctrMainHdr, slctrHdrGroup, centeringClass) {
		var $lrgFrmtSnglSctns = $(slctrSingle);
		if ($lrgFrmtSnglSctns.length > 0) {
			var $mainHeader = $(slctrMainHdr);
			$mainHeader.addClass(centeringClass);
			var $mnHdrChldDiv = $mainHeader.find(slctrHdrGroup);
			$mnHdrChldDiv.addClass(centeringClass);
		}
	}
	
	function fixDogears(slctrSiteNav, slctrDogeared, removedClasses) {
		// Fix bug wherein the wrong items in the spine become dogeared
		var $dogearedItems = $(slctrSiteNav).find(slctrDogeared);
		if ($dogearedItems.length > 1) {
			var currentURL = window.location.href;
			var currentPage = currentURL.substring(currentURL.substring(0, currentURL.length - 1).lastIndexOf("/") + 1, currentURL.length - 1);
			$dogearedItems.each(function () {
				var $this = $(this);
				var $navLink = $this.children("a");
				if ($navLink.length == 1) {
					var navLinkURL = $navLink.attr("href");
					var navLinkPage = navLinkURL.substring(navLinkURL.substring(0, navLinkURL.length - 1).lastIndexOf("/") + 1, navLinkURL.length - 1);
					if (navLinkPage != currentPage) {
						$this.removeClass(removedClasses);
					}
				}
			});
		}
	}

	function initContentFlippers(slctrCntntFlppr, slctrFlppdFront, slctrFlppdBack, animDuration) {
		$(slctrCntntFlppr).click(function () {
			var $this = $(this);
			$this.next(slctrFlppdFront).toggle(animDuration);
			$this.next(slctrFlppdFront).next(slctrFlppdBack).fadeToggle(animDuration);
		});
		$(slctrFlppdFront).click(function () {
			var $this = $(this);
			$this.toggle(animDuration);
			$this.next(slctrFlppdBack).fadeToggle(animDuration);
		});
	}
	
	function initDefinitionLists(slctrDefList, slctrLrgFrmtSection, slctrColOne, slctrColTwo,
	 dtActivatingClass, ddRevealingClass, animHghtDrtn) {
		var $listDts = $(slctrDefList + " dt");
		$listDts.attr("tabindex", 0);
		$listDts.click(function() {
			var $this = $(this);
			$this.toggleClass(dtActivatingClass);
			var $thisNext = $this.next("dd");
			$thisNext.toggleClass(ddRevealingClass);
			if ($thisNext.hasClass(ddRevealingClass)) {
				$thisNext.stop().animate({
					maxHeight: $thisNext[0].scrollHeight
				});
			} else {
				$thisNext.stop().animate({
					maxHeight: 0
				});
			}
			var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
			var $prntNxt = $parent.next(slctrColTwo);
			$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
		});
		$listDts.on("keydown", function(e) {
			var regExMask = /Enter| /g; // TODO: Divide and conquer
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(dtActivatingClass);
				var $thisNext = $this.next("dd");
				$thisNext.toggleClass(ddRevealingClass);
				if ($thisNext.hasClass(ddRevealingClass)) {
					$thisNext.stop().animate({
						maxHeight: $thisNext[0].scrollHeight
					});
				} else {
					$thisNext.stop().animate({
						maxHeight: 0
					});
				}
				var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
				var $prntNxt = $parent.next(slctrColTwo);
				$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
			}
		});
		$(slctrDefList + " dd").removeClass(ddRevealingClass);
	}
	
	function initDropDownToggles(slctrToggle, slctrWhatsToggled, activatingClass, animDuration) {
		var $toggles =  $(slctrToggle);
		$toggles.attr("tabindex", 0);
		$toggles.addClass("no-anchor-highlighting");
		effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration);
		$toggles.click(function () {
			var $this = $(this);
			$this.blur();
			$this.toggleClass(activatingClass);
			setupDropDownTogglePermanence($this, activatingClass);
		});
		$toggles.on("keydown", function(e) {
			var regExMask = /Enter| /g;
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(activatingClass);
				setupDropDownTogglePermanence($this, activatingClass);
			}
		});
	}
	
	function effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration) {
		var thisFuncName = "effectDropDownTogglePermanence";
		var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element based on previous user interactions during the session.";
		if ($.isJQueryObj($toggles)) {
			$toggles.each(function() {
				var $this = $(this);
				if ($this[0].id) {
					try {
						var state = sessionStorage.getItem($this[0].id);
						if (state == "expanded") {
							$this.toggleClass(activatingClass);
						}
					} catch(e) {
						$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
					}
				} else {
					$.logError(thisFileName, thisFuncName, thisFuncDesc,
						"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
				}
			});
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}
	
	function setupDropDownTogglePermanence($toggle, activatingClass) {
		var thisFuncName = "setupDropDownTogglePermanence";
		var thisFuncDesc = "Records the expansion state of a drop down toggle element in local storage to later effect permanence.";
		if ($.isJQueryObj($toggle)) {
			if ($toggle[0].id) {
				try {
					var state = $toggle.hasClass(activatingClass) ? "expanded" : "collapsed";
					sessionStorage.setItem($toggle[0].id, state);
				} catch(e) {
					$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
				}
			} else {
				$.logError(thisFileName, thisFuncName, thisFuncDesc,
					"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
			}
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}

	function handleMouseClickForA11y( e ) {
		$( "body" ).removeClass( "user-is-tabbing" )
		window.removeEventListener( "mousedown", handleMouseClickForA11y )
		window.addEventListener( "keydown", handleTabPressForA11y )
	}
	
	function handleTabPressForA11y( e ) {
		console.log( "handleTabPressForA11y was called." );
		if (e.keyCode === 9) {
			$( "body" ).addClass( "user-is-tabbing" )
			window.removeEventListener( "keydown", handleTabPressForA11y )
			window.addEventListener( "mousedown", handleMouseClickForA11y )
		}
	}
	
	function initFancyHrH2Motif(slctrFancyH2, slctrPrevHr, hrClassesAdded, animAddDrtn) {
		$(slctrFancyH2).each(function () {
				$(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
		});
	}
	
	function initFancyHrH3Motif(slctrFancyH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
		$(slctrFancyH3).each(function () {
			$(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
		});
	}
	
	function initHrH2Motif(slctrStandardH2, slctrPrevHr, h2ClassesAdded, hrClassesAdded, animAddDrtn) {
		$(slctrStandardH2).each(function () {
				var $this = $(this);
				var $prevElem = $this.prev(slctrPrevHr);
				if ($prevElem.length > 0) {
					$this.addClass(h2ClassesAdded);
					$prevElem.addClass(hrClassesAdded, animAddDrtn);
				}
		});
	}
	
	function initHrH3Motif(slctrStandardH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
		$(slctrStandardH3).each(function () {
			$(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
		});
	}
	
	function initQuickTabs(slctrQtSctn) {
		var $qtSctn = $(slctrQtSctn);
		$qtSctn.each(function () {
			var $thisSctn = $(this);
			var $tabCntnr = $thisSctn.find("div.column > ul");
			var $tabs = $tabCntnr.find("li");
			var $panelCntnr = $thisSctn.find("table");
			var $panels = $panelCntnr.find("tbody:first-child > tr");
			if($tabs.length == $panels.length) {
				var idx;
				var jdx;
				for (idx = 0; idx < $tabs.length; idx++) {
					$tabs.eq(idx).click(function() {
						var $thisTab = $(this);
						var kdx = $tabs.index($thisTab);
						if (kdx == 0) {
							if ($thisTab.hasClass("deactivated")) {
								$thisTab.removeClass("deactivated");
								$panels.eq(kdx).removeClass("deactivated");
								for (jdx = 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						} else {
							if (!$thisTab.hasClass("activated")) {
								if (!$tabs.eq(0).hasClass("deactivated")) {
									$tabs.eq(0).addClass("deactivated");
									$panels.eq(0).addClass("deactivated");
								}
								for (jdx = 1; jdx < kdx; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$thisTab.addClass("activated");
								$panels.eq(kdx).addClass("activated");
								for (jdx = kdx + 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						}
					});
				}
			}
		});
	}

	function initReadMoreToggles(slctrToggleIn, slctrToggleOut, slctrPanel, animDuration) {
		$(slctrToggleIn).click(function () {
			var $this = $(this);
			var $next = $this.next(slctrPanel);
			$this.toggle(animDuration);
			$this.$next.toggle(animDuration);
			$this.$next.next(slctrToggleOut).toggle(animDuration);
		});
		$(slctrToggleOut).click(function () {
			var $this = $(this);
			var $next = $this.next(slctrPanel);
			$this.toggle(animDuration);
			$this.$next.toggle(animDuration);
			$this.$next.next(slctrToggleIn).toggle(animDuration);
		});
	}
	
	function initTocFloating(slctrToc, slctrBackToToc) {
		var $toc = $(slctrToc);
		var $backToToc = $(slctrBackToToc);
		var $linkToTop = $backToToc.first().children("a");
		var $mainHeader = $("header.main-header");
		if($toc.length === 1 && $mainHeader.length === 1) {
			var $window = $(window);
			var tocTrigger = $toc.offset().top + $toc.height() + 100;
			var $tocClone = $toc.clone().addClass("floating").removeAttr("id").insertAfter($toc);
			$tocClone.find("span.title + br").remove();
			$tocClone.find("span.title").remove();
			var counter = 1;
			$tocClone.find("br").each(function () {
				if (counter % 2 != 0) {
					$(this).before(" //");
				}
				$(this).remove();
				counter++;
			});
			if($linkToTop.length === 1) {
				var linkText = $linkToTop.text();
				var idxMatched = linkText.search(/\u2014Back to ([^\u2014]+)\u2014/);
				if(idxMatched != -1) {
					var $linkToTopClone = $linkToTop.clone();
					$linkToTopClone.text(linkText.replace(/\u2014Back to ([^\u2014]+)\u2014/, "$1"));
					$tocClone.prepend(" //&nbsp;");
					$linkToTopClone.prependTo($tocClone);
					$backToToc.remove();
				} else {
					$.logError("initTocFloating", "Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find the correct textual pattern within the link back to the top of the page.' }");
				}
			} else {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find a single hyperlink within the first link back to the top of the page.' }");
			}
			$window.scroll(function(e) {
				var windowScrollPos = $window.scrollTop();
				if(windowScrollPos > tocTrigger && !$tocClone.is(":visible")) {
					$tocClone.width($mainHeader.width() * .8);
					$tocClone.css({
						left: $mainHeader.offset().left + $mainHeader.width() / 2,
					});
					$tocClone.fadeIn(300);
				}
				else if(windowScrollPos <= tocTrigger && $tocClone.is(":visible")) {
					$tocClone.hide();
				}
			});
			$window.resize(function () {
				$tocClone.width($mainHeader.width() * .8);
				$tocClone.css({
					left: $mainHeader.offset().left + $mainHeader.width() / 2,
				});
			});
		}
		else {
			if($toc.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
			if($mainHeader.length === 0) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Could not find the main header  element within the DOM.' }");
			}
			else if($mainHeader.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
		}
	}
	
	function initTriggeredByHover(slctrTrggrdOnHvr, slctrCntntRvld, slctrCntntHddn, animDuration) {
		$(slctrTrggrdOnHvr).mouseenter(function () {
			var $this = $(this);
			var $rvldCntnt = $this.find(slctrCntntRvld);
			var $hddnCntnt = $this.find(slctrCntntHddn);
			$rvldCntnt.stop().show(animDuration);
			$hddnCntnt.stop().hide(animDuration);
		}).mouseleave(function () {
			var $this = $(this);
			var $rvldCntnt = $this.find(slctrCntntRvld);
			var $hddnCntnt = $this.find(slctrCntntHddn);
			$rvldCntnt.stop().hide(animDuration);
			$hddnCntnt.stop().show(animDuration);
		});
	}
	
	function initWelcomeMessage(slctrWlcmMsg, slctrPostWlcmMsg, msgDelay, fadeOutDuration,
	 fadeInDuration) {
		$(slctrWlcmMsg).delay(msgDelay).fadeOut(fadeOutDuration, function () {
			$(slctrPostWlcmMsg).fadeIn(fadeInDuration);
		});
	}

	/*******************************************************************************************************************
	 * LOADED WINDOW FUNCTIONS                                                                                         * 
	 *******************************************************************************************************************/
	function finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
		if($(window).width() >= trggrWidth) {
			$(slctrSideRight + ">" + slctrColTwo).each(function () {
				var $this = $(this);
				var $thisPrev = $this.prev(slctrColOne);
				if($this.height() != $thisPrev.height() ) {
					$this.height($thisPrev.height());
				}
				var crrntOpacity = $this.css("opacity");
				if (crrntOpacity == 0) {
					$this.animate({opacity: 1.0}, animDuration);
				}
			});
		}
	}
	
	/**
	 * showDefinitionListButtons
	 * DESCRIPTION: Display expand/collapse all buttons, which were initially hidden
	 * PARAMETERS:
	 *   += slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
	 *   += expandAllClass: CSS class for controlling the layout of expand all buttons
	 *   += collapseAllClass: CSS class for controlling the layout of collapse all buttons
	 *   += animFadeInDrtn: the animation speed by which definitions fade into view
	 */
	function showDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, animFadeInDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Display expand/collapse all buttons, which were initially hidden";
		
		// Display expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $expandAlls = $lists.children("." + expandAllClass);
		var $collapseAlls = $lists.children("." + collapseAllClass);
		$lists.animate({
			marginTop: "+=39px"
		}, animFadeInDrtn, function() {
			$expandAlls.fadeIn(animFadeInDrtn);
			$collapseAlls.fadeIn(animFadeInDrtn);
		});
	}
		
	/*******************************************************************************************************************
	 * WINDOW-RESIZE TRIGGERED FUNCTIONS                                                                               *
	 *******************************************************************************************************************/
	function resizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
		finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration);
	}
	
})(jQuery);
/*!
 * DESCRIPTION: Script for setting up and running OUE event calendars
 * AUTHOR: Daniel C. Rieck <danielcrieck@gmail.com> (https://www.linkedin.com/in/danielcrieck/)
 */
(function ($) {  

// Function calls made once the DOM IS READY
$(function () {
	var $calendars = $("table.calendar");
	if ($calendars.length > 0) {
		setupCalendarShortcuts($calendars);
		setupColorCoding($calendars);
		setupCalendarLegendScrolling($calendars);
	}
});

function oueSetDateShorcut($targetElement) {
	if ($targetElement && ($targetElement instanceof $ ||
			$targetElement.constructor.prototype.jquery)) {
		var d = new Date();
		var n = d.toDateString();
		$targetElement.attr("href", "#" + (n.substring(n.indexOf(" ")+1,
			n.indexOf(" ",n.indexOf(" ")+1)) ) + (n.substring(n.indexOf(" ",n.indexOf(" ") + 1) + 1,
			n.indexOf(" ", n.indexOf(" ", n.indexOf(" ")+1)+1))));
	}        
}

function setupCalendarShortcuts($calendars) {
	var $toTodayShortcut = $("#jumpToToday");
	if ($.isJQueryObj($calendars) && $toTodayShortcut.length > 0) {
		var d = new Date();
		var fallYear = 2016;
		var fallStartDay = 15;
		var fallStartLink = "#Aug15";
		var fallEndDay = 16;
		var fallEndLink = "#Dec16";
		var springYear = 2017;
		var springStartDay = 9;
		var springStartLink = "#Jan09";
		var springEndDay = 5;
		var springEndLink = "#May05";
		if (fallYear == springYear || fallYear == springYear - 1) {
			if (fallYear < springYear) {
				if (d.getFullYear() < fallYear) {
					$toTodayShortcut.attr("href", fallStartLink);
				} else if (d.getFullYear() == fallYear) {
					if (d.getMonth() < 7){
							$toTodayShortcut.attr("href", fallStartLink);
					} else if (d.getMonth() == 7){
						if (d.getDate() < fallStartDay) {
							$toTodayShortcut.attr("href", fallStartLink);
						} else {
							oueSetDateShorcut($toTodayShortcut);
						}
					} else if (d.getMonth() > 7 && d.getMonth() < 11) {
						oueSetDateShorcut($toTodayShortcut);
					} else {
						if (d.getDate() <= fallEndDay) {
							oueSetDateShorcut($toTodayShortcut);
						} else {
							$toTodayShortcut.attr("href", fallEndLink);
						}
					}
				} else if (d.getFullYear() == springYear) {
					if (d.getMonth() == 0){
						if (d.getDate() < springStartDay) {
							$toTodayShortcut.attr("href", springStartLink);
						} else {
							oueSetDateShorcut($toTodayShortcut);
						}
					} else if (d.getMonth() > 0 && d.getMonth() < 4) {
						oueSetDateShorcut($toTodayShortcut);
					} else {
						if (d.getDate() <= springEndDay) {
							oueSetDateShorcut($toTodayShortcut);
						} else {
							$toTodayShortcut.attr("href", springEndLink);
						}
					}
				} else {
					$toTodayShortcut.attr("href", springEndLink);
				}
			} else {
				if (d.getFullYear() < fallYear) {
					$toTodayShortcut.attr("href", fallStartLink);
				} else if (d.getFullYear() == fallYear) {
					if (d.getMonth() == 0) {
						if (d.getDate() < springStartDay) {
							$toTodayShortcut.attr("href", springStartLink);
						} else {
							oueSetDateShorcut($toTodayShortcut);
						}
					} else if (d.getMonth() > 0 && d.getMonth() < 4) {
						oueSetDateShorcut($toTodayShortcut);
					} else if (d.getMonth() == 4) {
						if (d.getDate() <= springEndDay) {
							oueSetDateShorcut($toTodayShortcut);
						} else {
							$toTodayShortcut.attr("href", springEndLink);
						}
					} else if (d.getMonth() > 4 && d.getMonth() < 7) {
							$toTodayShortcut.attr("href", fallStartLink);
					} else if (d.getMonth() == 7) {
						if (d.getDate() < fallStartDay) {
							$toTodayShortcut.attr("href", fallStartLink);
						} else {
							oueSetDateShorcut($toTodayShortcut);
						}
					} else if (d.getMonth() > 7 && d.getMonth() < 11) {
						oueSetDateShorcut($toTodayShortcut);
					} else {
						if (d.getDate() <= fallEndDay) {
							oueSetDateShorcut($toTodayShortcut);
						} else {
							$toTodayShortcut.attr("href", fallEndLink);
						}
					}
				} else {
					$toTodayShortcut.attr("href", springEndLink);
				}
			}
		}
	}
}

function setupColorCoding($calendars) {
	if($.isJQueryObj($calendars)) {
		var $calendarCell;
		var $calendarCellLinks;
		var $calendarCellLinkHref;
		var $thisLink;
		$calendars.find("td.has-an-event").each(function(){
			$calendarCell = $(this);
			$calendarCellLinks = $(this).children("p").children("a");
			$calendarCellLinks.each(function() {
				$thisLink = $(this);
				calendarCellLinkHref = $thisLink.attr("href");
				switch(calendarCellLinkHref) {
					case "/calendar/workshops/#intro-to-DS":
						$calendarCell.addClass("crimson");
						break;
					case "/calendar/workshops/#deadlines":
						$calendarCell.addClass("black");
						break;
					case "/calendar/workshops/#fulbright":
						$calendarCell.addClass("gray");
						break;
					case "/calendar/workshops/#gilman":
						$calendarCell.addClass("orange");
						break;
					case "/calendar/workshops/#truman":
						$calendarCell.addClass("olive");
						break;
					case "/calendar/workshops/#goldwater":
						$calendarCell.addClass("blue");
						break;
					case "/calendar/workshops/#udall":
						$calendarCell.addClass("dark-gray");
						break;
					case "/calendar/workshops/#general-abroad":
						$calendarCell.addClass("dark-brown");
						break;
					case "/calendar/workshops/#boren":
						$calendarCell.addClass("brown");
						break;
					case "/calendar/workshops/#schwarzman":
						$calendarCell.addClass("dark-olive");
						break;
					case "/calendar/workshops/#uk-scholarships":
						$calendarCell.addClass("dark-blue");
						break;
					case undefined:
					default:
						break;
				}				
			});
		});
	}
}

function setupCalendarLegendScrolling($calendars) {
	var $window = $(window);
	var $legends = $("div.calendar-legend");
	var $legendPanelsBlack = $("div.legend-panel.black");
	var $legendPanelsCrimson = $("div.legend-panel.crimson");
	var $legendPanelsGray = $("div.legend-panel.gray");
	var $legendPanelsOrange = $("div.legend-panel.orange");
	var $legendPanelsOlive = $("div.legend-panel.olive");
	var $legendPanelsBlue = $("div.legend-panel.blue");
	var $legendPanelsDarkGray = $("div.legend-panel.dark-gray");
	var $legendPanelsBrown = $("div.legend-panel.brown");
	var $legendPanelsDarkBrown = $("div.legend-panel.dark-brown");
	var $legendPanelsDarkOlive = $("div.legend-panel.dark-olive");
	var $legendPanelsDarkBlue = $("div.legend-panel.dark-blue");
	var $legendPanelsGold = $("div.legend-panel.gold");
	var windowScrollPos;
	var legendTop;
	var legendHeight;
	var calendarTop;
	var calendarHeight;
	var calendarBottom;
	var scrollOffset;
	var scrollStop;
	var idx;
	if ($.isJQueryObj($calendars) && $legends.length) {
		if ($legends.length === $calendars.length) {
			$window.scroll(function() {
				windowScrollPos = $window.scrollTop();
				for (idx = 0; idx < $legends.length; idx++) {
					calendarTop = $($calendars.get(idx)).offset().top;
					calendarHeight = $($calendars.get(idx)).height();
					calendarBottom = calendarTop + calendarHeight;
					legendHeight = $($legends.get(idx)).height();
					scrollStop = calendarBottom - legendHeight;
					if (windowScrollPos > calendarTop) {
						if (windowScrollPos < scrollStop) {
							$($legends.get(idx)).animate({top: windowScrollPos - calendarTop}, 1,
								"linear");
						} else {
							legendTop = $($legends.get(idx)).offset().top;
							if (legendTop !== scrollStop) {
								$($legends.get(idx)).animate({top: scrollStop - calendarTop}, 1,
									"linear");
							}
						}
					} else {
						legendTop = $($legends.get(idx)).offset().top;
						if (legendTop !== calendarTop) {
							$($legends.get(idx)).animate({top: 0}, 1, "linear");
						}
					}
				}
			});

			// TODO: Find a way to base this off of styled colors using jQuery color.
			$legendPanelsBlack.hover(function() {
				$("td.has-an-event.black").animate({ backgroundColor: "#30303f" },200);
			}, function() {
				$("td.has-an-event.black").animate({ backgroundColor: "#000000" },200);
			});
			$legendPanelsCrimson.hover(function() {
				$("td.has-an-event.crimson").animate({ backgroundColor: "#bf526f" },200);
			}, function() {
				$("td.has-an-event.crimson").animate({ backgroundColor: "#be1a40" },200);
			});
			$legendPanelsGray.hover(function() {
				$("td.has-an-event.gray").animate({ backgroundColor: "#7d979b" },200);
			}, function() {
				$("td.has-an-event.gray").animate({ backgroundColor: "#67767b" },200);
			});
			$legendPanelsOrange.hover(function() {
				$("td.has-an-event.orange").animate({ backgroundColor: "#df8366" },200);
			}, function() {
				$("td.has-an-event.orange").animate({ backgroundColor: "#e95b34" },200);
			});
			$legendPanelsOlive.hover(function() {
				$("td.has-an-event.olive").animate({ backgroundColor: "#a5a75d" },200);
			}, function() {
				$("td.has-an-event.olive").animate({ backgroundColor: "#9b8b28" },200);
			});
			$legendPanelsBlue.hover(function() {
				$("td.has-an-event.blue").animate({ backgroundColor: "#3d94a3" },200);
			}, function() {
				$("td.has-an-event.blue").animate({ backgroundColor: "#127286" },200);
			});
			$legendPanelsDarkGray.hover(function() {
				$("td.has-an-event.dark-gray").animate({ backgroundColor: "#59696f" },200);
				$("td.has-an-event.dark-gray.brown").css({ backgroundImage: "none" });
			}, function() {
				$("td.has-an-event.dark-gray").animate({ backgroundColor: "#373940" },200);
				$("td.has-an-event.dark-gray.brown").css({
					backgroundImage: "linear-gradient(to bottom, #373940, #723f1f)" });
			});
			$legendPanelsDarkBrown.hover(function() {
				$("td.has-an-event.dark-brown").animate({ backgroundColor: "#664a4d" },200);
			}, function() {
				$("td.has-an-event.dark-brown").animate({ backgroundColor: "#480f13" },200);
			});
			$legendPanelsBrown.hover(function() {
				$("td.has-an-event.brown").animate({ backgroundColor: "#866e56" },200);
				$("td.has-an-event.dark-gray.brown").css({ backgroundImage: "none" });
			}, function() {
				$("td.has-an-event.brown").animate({ backgroundColor: "#723f1f" },200);
				$("td.has-an-event.dark-gray.brown").css({
					backgroundImage: "linear-gradient(to bottom, #373940, #723f1f)" });
			});
			$legendPanelsDarkOlive.hover(function() {
				$("td.has-an-event.dark-olive").animate({ backgroundColor: "#646a4f" },200);
			}, function() {
				$("td.has-an-event.dark-olive").animate({ backgroundColor: "#453a16" },200);
			});
			$legendPanelsDarkBlue.hover(function() {
				$("td.has-an-event.dark-blue").animate({ backgroundColor: "#3d636c" },200);
			}, function() {
				$("td.has-an-event.dark-blue").animate({ backgroundColor: "#12313c" },200);
			});
			$legendPanelsGold.hover(function() {
				$("td.has-an-event.gold").animate({ backgroundColor: "#ffdb8d" },200);
			}, function() {
				$("td.has-an-event.gold").animate({ backgroundColor: "#ffb81c" },200);
			});
		}
	}
}
})(jQuery); (function($){
    $(document).ready(function () {
        $('div.auto-scroller div.inner-scroll-area').each(function(){
            var $autoScroller = $(this);
            var scrollingFactor = 1;
            if($autoScroller.hasClass('scroll-in-reverse'))
                scrollingFactor = -1;
            var $asContent = $autoScroller.children('ul');
            $asContent.children().clone().appendTo($asContent);
            var curX = 0;
            $asContent.children().each(function(){
                var $this = $(this);
                $this.css('left', curX);
                curX += $this.width();
            });
            var fullScrollerWidth = curX / 2;
            var scrollerViewWidth = $autoScroller.width();
            // Set up tweening of scrolling speed between, start, paused, and restarting states
            var scrollingController = {curSpeed:0, fullSpeed:2};
            var $scrollingController = $(scrollingController);
            var tweenToNewSpeed = function(newSpeed, duration){
                if (duration === undefined)
                    duration = 333;
                $scrollingController.stop(true).animate({curSpeed:newSpeed}, duration);
            };
            // Pause scrolling upon hover
            $autoScroller.hover(function(){
                tweenToNewSpeed(0);
            }, function(){
                tweenToNewSpeed(scrollingController.fullSpeed);
            });
            // Start the automatic scrolling
            var doScroll = function (){
                var curX = $autoScroller.scrollLeft();
                var newX = curX + scrollingController.curSpeed * scrollingFactor;
                if (newX > fullScrollerWidth * 2 - scrollerViewWidth)
                    newX -= fullScrollerWidth;
                else if (newX < 0)
                    newX += fullScrollerWidth;
                $autoScroller.scrollLeft(newX);
            };
            if($autoScroller.hasClass('scroll-in-reverse'))
                $autoScroller.scrollLeft(fullScrollerWidth - scrollerViewWidth);
            setInterval(doScroll, 20);
            tweenToNewSpeed(scrollingController.fullSpeed);
        });
    });
})(jQuery);/* jQuery Cookie Plugin v1.4.1
 * --> https://github.com/carhartl/jquery-cookie
 * Copyright 2013 Klaus Hartl, released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            // Replace server-side written pluses with spaces.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {
            // If we can't decode or parse the cookie, ignore it; it's unusable.
        }
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        // Write the cookie
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // Read the cookie
        var result = key ? undefined : {};
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));

/* Utilization of the jQuery Cookie Plugin v1.4.1 to implement a page-covering notice that
 * is dismissed upon user click or tap.
 */
(function ($) {
	var thisFileName = "jQuery.cookieObjs.js";
	var noticeRunning = false;
	var $pageNotice;
	
    $(document).ready(function () {
		$pageNotice = $('.page-covering-notice-js')
		showPageCoveringNotice($pageNotice);
    });
	
	function closeNoticeOnKeydown(e) {
		if (noticeRunning) {
			e.preventDefault();
			$pageNotice.fadeOut(333);
			noticeRunning = false;
			$(document).off("keydown", closeNoticeOnKeydown);	
		}
	}
	
	function showPageCoveringNotice($pageNotice) {
		var thisFuncName = "showPageCoveringNotice";
		var thisFuncDesc = "Display a single page covering notice if it has not yet been viewed today.";
        if ($.isJQueryObj($pageNotice) && $pageNotice.length === 1) {
			// Check for a cookie name specified by the page designer
			var defaultCookieName = "wsuVpuePageNoticeViewed";
			var cookieName = $pageNotice.data("noticeName");
			if (!cookieName) {
				cookieName = defaultCookieName;
			} else {
				// Restrict our cookie name to only contain letters and digits
				var regExMask = /[^0-9a-zA-Z]+/g;
				if (regExMask.exec(cookieName) != null) {
					cookieName = cookieName.replace(regExMask, "");
				}
			}
			var rightNow = new Date();
			var noticeHidden = false;
			var noticeHiddenBefore = $pageNotice.data("noticeHiddenBefore");
			if (noticeHiddenBefore) {
				var hiddenBeforeDate = new Date(noticeHiddenBefore);
				if (rightNow.getTime() < hiddenBeforeDate.getTime()) {
					noticeHidden = true;
				}
			}
			var noticeNowExpired = false;
			var noticeExpiration = $pageNotice.data("noticeExpiresAfter");
			if (noticeExpiration) {
				var expirationDate = new Date(noticeExpiration);
				if (rightNow.getTime() > expirationDate.getTime()) {
					noticeNowExpired = true;
				}
			}
			if (!noticeHidden && !noticeNowExpired) {
				// If cookie is not present, this is the first time today the page was loaded; so show the notice
				if ($.cookie(cookieName) === undefined) {
					// Determine the expiration time of the cookie (i.e. time until midnight)
					var tomorrowMidnight = new Date(rightNow.getTime());
					tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
					tomorrowMidnight.setHours(0);
					tomorrowMidnight.setMinutes(0);
					tomorrowMidnight.setSeconds(0);
					tomorrowMidnight.setMilliseconds(0);
					// Set the cookie to prevent further displays of notice for the day
					$.cookie(cookieName, 1, {
						expires: (tomorrowMidnight.getTime() - rightNow.getTime()) / 86400000
					});
					noticeRunning = true;
					$pageNotice.fadeIn(1000);
					$(document).on("keydown", closeNoticeOnKeydown);
					$pageNotice.click(function () {
						$(this).fadeOut(333);
						noticeRunning = false;
						$(document).off("keydown", closeNoticeOnKeydown);
					});
					$pageNotice.keydown(function () {
						$(this).fadeOut(333);
					});
				}
			}
        } else {
			if ($pageNotice.length > 1) {
				$.logError(thisfileName, thisFuncName, thisFuncDesc,
					"More than one page covering notice was encountered in the DOM."
				);
			}
		}
	}
})(jQuery);/*!
* jQuery cycle2; version: 2.1.5 build: 20140415
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
*/
/* cycle2 core engine */
;(function($) {
    if($('.cycle2-slideshow').length !== 0) {
        var version = '2.1.5';
        $.fn.cycle2 = function( options ) {
                // fix mistakes with the ready state
                var o;
                if ( this.length === 0 && !$.isReady ) {
                        o = { s: this.selector, c: this.context };
                        $.fn.cycle2.log('requeuing slideshow (dom not ready)');
                        $(function() {
                                $( o.s, o.c ).cycle2(options);
                        });
                        return this;
                }
                return this.each(function() {
                        var data, opts, shortName, val;
                        var container = $(this);
                        var log = $.fn.cycle2.log;
                        if ( container.data('cycle2.opts') )
                                return; // already initialized
                        if ( container.data('cycle2-log') === false || 
                                ( options && options.log === false ) ||
                                ( opts && opts.log === false) ) {
                                log = $.noop;
                        }
                        log('--c2 init--');
                        data = container.data();
                        for (var p in data) {
                                // allow props to be accessed sans 'cycle2' prefix and log the overrides
                                if (data.hasOwnProperty(p) && /^cycle2[A-Z]+/.test(p) ) {
                                        val = data[p];
                                        shortName = p.match(/^cycle2(.*)/)[1].replace(/^[A-Z]/, lowerCase);
                                        log(shortName+':', val, '('+typeof val +')');
                                        data[shortName] = val;
                                }
                        }
                        opts = $.extend( {}, $.fn.cycle2.defaults, data, options || {});
                        opts.timeoutId = 0;
                        opts.paused = opts.paused || false; // #57
                        opts.container = container;
                        opts._maxZ = opts.maxZ;
                        opts.API = $.extend ( { _container: container }, $.fn.cycle2.API );
                        opts.API.log = log;
                        opts.API.trigger = function( eventName, args ) {
                                opts.container.trigger( eventName, args );
                                return opts.API;
                        };
                        container.data( 'cycle2.opts', opts );
                        container.data( 'cycle2.API', opts.API );
                        // opportunity for plugins to modify opts and API
                        opts.API.trigger('cycle2-bootstrap', [ opts, opts.API ]);
                        opts.API.addInitialSlides();
                        opts.API.preInitSlideshow();
                        if ( opts.slides.length )
                                opts.API.initSlideshow();
                });
        };
        $.fn.cycle2.API = {
                opts: function() {
                        return this._container.data( 'cycle2.opts' );
                },
                addInitialSlides: function() {
                        var opts = this.opts();
                        var slides = opts.slides;
                        opts.slideCount = 0;
                        opts.slides = $(); // empty set			
                        // add slides that already exist
                        slides = slides.jquery ? slides : opts.container.find( slides );
                        if ( opts.random ) {
                                slides.sort(function() {return Math.random() - 0.5;});
                        }
                        opts.API.add( slides );
                },
                preInitSlideshow: function() {
                        var opts = this.opts();
                        opts.API.trigger('cycle2-pre-initialize', [ opts ]);
                        var tx = $.fn.cycle2.transitions[opts.fx];
                        if (tx && $.isFunction(tx.preInit))
                                tx.preInit( opts );
                        opts._preInitialized = true;
                },
                postInitSlideshow: function() {
                        var opts = this.opts();
                        opts.API.trigger('cycle2-post-initialize', [ opts ]);
                        var tx = $.fn.cycle2.transitions[opts.fx];
                        if (tx && $.isFunction(tx.postInit))
                                tx.postInit( opts );
                },
                initSlideshow: function() {
                        var opts = this.opts();
                        var pauseObj = opts.container;
                        var slideOpts;
                        opts.API.calcFirstSlide();
                        if ( opts.container.css('position') == 'static' )
                                opts.container.css('position', 'relative');
                        $(opts.slides[opts.currSlide]).css({
                                opacity: 1,
                                display: 'block',
                                visibility: 'visible'
                        });
                        opts.API.stackSlides( opts.slides[opts.currSlide], opts.slides[opts.nextSlide], !opts.reverse );
                        if ( opts.pauseOnHover ) {
                                // allow pauseOnHover to specify an element
                                if ( opts.pauseOnHover !== true )
                                        pauseObj = $( opts.pauseOnHover );
                                pauseObj.hover(
                                        function(){ opts.API.pause( true ); }, 
                                        function(){ opts.API.resume( true ); }
                                );
                        }
                        // stage initial transition
                        if ( opts.timeout ) {
                                slideOpts = opts.API.getSlideOpts( opts.currSlide );
                                opts.API.queueTransition( slideOpts, slideOpts.timeout + opts.delay );
                        }
                        opts._initialized = true;
                        opts.API.updateView( true );
                        opts.API.trigger('cycle2-initialized', [ opts ]);
                        opts.API.postInitSlideshow();
                },
                pause: function( hover ) {
                        var opts = this.opts(),
                                slideOpts = opts.API.getSlideOpts(),
                                alreadyPaused = opts.hoverPaused || opts.paused;
                        if ( hover )
                                opts.hoverPaused = true; 
                        else
                                opts.paused = true;
                        if ( ! alreadyPaused ) {
                                opts.container.addClass('cycle2-paused');
                                opts.API.trigger('cycle2-paused', [ opts ]).log('cycle2-paused');
                                if ( slideOpts.timeout ) {
                                        clearTimeout( opts.timeoutId );
                                        opts.timeoutId = 0;
                                        // determine how much time is left for the current slide
                                        opts._remainingTimeout -= ( $.now() - opts._lastQueue );
                                        if ( opts._remainingTimeout < 0 || isNaN(opts._remainingTimeout) )
                                                opts._remainingTimeout = undefined;
                                }
                        }
                },
                resume: function( hover ) {
                        var opts = this.opts(),
                                alreadyResumed = !opts.hoverPaused && !opts.paused,
                                remaining;
                        if ( hover )
                                opts.hoverPaused = false; 
                        else
                                opts.paused = false;
                        if ( ! alreadyResumed ) {
                                opts.container.removeClass('cycle2-paused');
                                // #gh-230; if an animation is in progress then don't queue a new transition; it will
                                // happen naturally
                                if ( opts.slides.filter(':animated').length === 0 )
                                        opts.API.queueTransition( opts.API.getSlideOpts(), opts._remainingTimeout );
                                opts.API.trigger('cycle2-resumed', [ opts, opts._remainingTimeout ] ).log('cycle2-resumed');
                        }
                },
                add: function( slides, prepend ) {
                        var opts = this.opts();
                        var oldSlideCount = opts.slideCount;
                        var startSlideshow = false;
                        var len;
                        if ( $.type(slides) == 'string')
                                slides = $.trim( slides );
                        $( slides ).each(function(i) {
                                var slideOpts;
                                var slide = $(this);
                                if ( prepend )
                                        opts.container.prepend( slide );
                                else
                                        opts.container.append( slide );
                                opts.slideCount++;
                                slideOpts = opts.API.buildSlideOpts( slide );
                                if ( prepend )
                                        opts.slides = $( slide ).add( opts.slides );
                                else
                                        opts.slides = opts.slides.add( slide );
                                opts.API.initSlide( slideOpts, slide, --opts._maxZ );
                                slide.data('cycle2.opts', slideOpts);
                                opts.API.trigger('cycle2-slide-added', [ opts, slideOpts, slide ]);
                        });
                        opts.API.updateView( true );
                        startSlideshow = opts._preInitialized && (oldSlideCount < 2 && opts.slideCount >= 1);
                        if ( startSlideshow ) {
                                if ( !opts._initialized )
                                        opts.API.initSlideshow();
                                else if ( opts.timeout ) {
                                        len = opts.slides.length;
                                        opts.nextSlide = opts.reverse ? len - 1 : 1;
                                        if ( !opts.timeoutId ) {
                                                opts.API.queueTransition( opts );
                                        }
                                }
                        }
                },
                calcFirstSlide: function() {
                        var opts = this.opts();
                        var firstSlideIndex;
                        firstSlideIndex = parseInt( opts.startingSlide || 0, 10 );
                        if (firstSlideIndex >= opts.slides.length || firstSlideIndex < 0)
                                firstSlideIndex = 0;
                        opts.currSlide = firstSlideIndex;
                        if ( opts.reverse ) {
                                opts.nextSlide = firstSlideIndex - 1;
                                if (opts.nextSlide < 0)
                                        opts.nextSlide = opts.slides.length - 1;
                        }
                        else {
                                opts.nextSlide = firstSlideIndex + 1;
                                if (opts.nextSlide == opts.slides.length)
                                        opts.nextSlide = 0;
                        }
                },
                calcNextSlide: function() {
                        var opts = this.opts();
                        var roll;
                        if ( opts.reverse ) {
                                roll = (opts.nextSlide - 1) < 0;
                                opts.nextSlide = roll ? opts.slideCount - 1 : opts.nextSlide-1;
                                opts.currSlide = roll ? 0 : opts.nextSlide+1;
                        }
                        else {
                                roll = (opts.nextSlide + 1) == opts.slides.length;
                                opts.nextSlide = roll ? 0 : opts.nextSlide+1;
                                opts.currSlide = roll ? opts.slides.length-1 : opts.nextSlide-1;
                        }
                },
                calcTx: function( slideOpts, manual ) {
                        var opts = slideOpts;
                        var tx;
                        if ( opts._tempFx )
                                tx = $.fn.cycle2.transitions[opts._tempFx];
                        else if ( manual && opts.manualFx )
                                tx = $.fn.cycle2.transitions[opts.manualFx];
                        if ( !tx )
                                tx = $.fn.cycle2.transitions[opts.fx];
                        opts._tempFx = null;
                        this.opts()._tempFx = null;
                        if (!tx) {
                                tx = $.fn.cycle2.transitions.fade;
                                opts.API.log('Transition "' + opts.fx + '" not found.  Using fade.');
                        }
                        return tx;
                },
                prepareTx: function( manual, fwd ) {
                        var opts = this.opts();
                        var after, curr, next, slideOpts, tx;
                        if ( opts.slideCount < 2 ) {
                                opts.timeoutId = 0;
                                return;
                        }
                        if ( manual && ( !opts.busy || opts.manualTrump ) ) {
                                opts.API.stopTransition();
                                opts.busy = false;
                                clearTimeout(opts.timeoutId);
                                opts.timeoutId = 0;
                        }
                        if ( opts.busy )
                                return;
                        if ( opts.timeoutId === 0 && !manual )
                                return;
                        curr = opts.slides[opts.currSlide];
                        next = opts.slides[opts.nextSlide];
                        slideOpts = opts.API.getSlideOpts( opts.nextSlide );
                        tx = opts.API.calcTx( slideOpts, manual );
                        opts._tx = tx;
                        if ( manual && slideOpts.manualSpeed !== undefined )
                                slideOpts.speed = slideOpts.manualSpeed;
                        // if ( opts.nextSlide === opts.currSlide )
                        //     opts.API.calcNextSlide();
                        // ensure that:
                        //      1. advancing to a different slide
                        //      2. this is either a manual event (prev/next, pager, cmd) or 
                        //              a timer event and slideshow is not paused
                        if ( opts.nextSlide != opts.currSlide && 
                                (manual || (!opts.paused && !opts.hoverPaused && opts.timeout) )) { // #62
                                opts.API.trigger('cycle2-before', [ slideOpts, curr, next, fwd ]);
                                if ( tx.before )
                                        tx.before( slideOpts, curr, next, fwd );
                                after = function() {
                                        opts.busy = false;
                                        // #76; bail if slideshow has been destroyed
                                        if (! opts.container.data( 'cycle2.opts' ) )
                                                return;
                                        if (tx.after)
                                                tx.after( slideOpts, curr, next, fwd );
                                        opts.API.trigger('cycle2-after', [ slideOpts, curr, next, fwd ]);
                                        opts.API.queueTransition( slideOpts);
                                        opts.API.updateView( true );
                                };
                                opts.busy = true;
                                if (tx.transition)
                                        tx.transition(slideOpts, curr, next, fwd, after);
                                else
                                        opts.API.doTransition( slideOpts, curr, next, fwd, after);
                                opts.API.calcNextSlide();
                                opts.API.updateView();
                        } else {
                                opts.API.queueTransition( slideOpts );
                        }
                },
                // perform the actual animation
                doTransition: function( slideOpts, currEl, nextEl, fwd, callback) {
                        var opts = slideOpts;
                        var curr = $(currEl), next = $(nextEl);
                        var fn = function() {
                                // make sure animIn has something so that callback doesn't trigger immediately
                                next.animate(opts.animIn || { opacity: 1}, opts.speed, opts.easeIn || opts.easing, callback);
                        };
                        next.css(opts.cssBefore || {});
                        curr.animate(opts.animOut || {}, opts.speed, opts.easeOut || opts.easing, function() {
                                curr.css(opts.cssAfter || {});
                                if (!opts.sync) {
                                        fn();
                                }
                        });
                        if (opts.sync) {
                                fn();
                        }
                },
                queueTransition: function( slideOpts, specificTimeout ) {
                        var opts = this.opts();
                        var timeout = specificTimeout !== undefined ? specificTimeout : slideOpts.timeout;
                        if (opts.nextSlide === 0 && --opts.loop === 0) {
                                opts.API.log('terminating; loop=0');
                                opts.timeout = 0;
                                if ( timeout ) {
                                        setTimeout(function() {
                                                opts.API.trigger('cycle2-finished', [ opts ]);
                                        }, timeout);
                                }
                                else {
                                        opts.API.trigger('cycle2-finished', [ opts ]);
                                }
                                // reset nextSlide
                                opts.nextSlide = opts.currSlide;
                                return;
                        }
                        if ( opts.continueAuto !== undefined ) {
                                if ( opts.continueAuto === false || 
                                        ($.isFunction(opts.continueAuto) && opts.continueAuto() === false )) {
                                        opts.API.log('terminating automatic transitions');
                                        opts.timeout = 0;
                                        if ( opts.timeoutId )
                                                clearTimeout(opts.timeoutId);
                                        return;
                                }
                        }
                        if ( timeout ) {
                                opts._lastQueue = $.now();
                                if ( specificTimeout === undefined )
                                        opts._remainingTimeout = slideOpts.timeout;
                                if ( !opts.paused && ! opts.hoverPaused ) {
                                        opts.timeoutId = setTimeout(function() { 
                                                opts.API.prepareTx( false, !opts.reverse ); 
                                        }, timeout );
                                }
                        }
                },
                stopTransition: function() {
                        var opts = this.opts();
                        if ( opts.slides.filter(':animated').length ) {
                                opts.slides.stop(false, true);
                                opts.API.trigger('cycle2-transition-stopped', [ opts ]);
                        }
                        if ( opts._tx && opts._tx.stopTransition )
                                opts._tx.stopTransition( opts );
                },
                // advance slide forward or back
                advanceSlide: function( val ) {
                        var opts = this.opts();
                        clearTimeout(opts.timeoutId);
                        opts.timeoutId = 0;
                        opts.nextSlide = opts.currSlide + val;
                        if (opts.nextSlide < 0)
                                opts.nextSlide = opts.slides.length - 1;
                        else if (opts.nextSlide >= opts.slides.length)
                                opts.nextSlide = 0;
                        opts.API.prepareTx( true,  val >= 0 );
                        return false;
                },
                buildSlideOpts: function( slide ) {
                        var opts = this.opts();
                        var val, shortName;
                        var slideOpts = slide.data() || {};
                        for (var p in slideOpts) {
                                // allow props to be accessed sans 'cycle2' prefix and log the overrides
                                if (slideOpts.hasOwnProperty(p) && /^cycle2[A-Z]+/.test(p) ) {
                                        val = slideOpts[p];
                                        shortName = p.match(/^cycle2(.*)/)[1].replace(/^[A-Z]/, lowerCase);
                                        opts.API.log('['+(opts.slideCount-1)+']', shortName+':', val, '('+typeof val +')');
                                        slideOpts[shortName] = val;
                                }
                        }
                        slideOpts = $.extend( {}, $.fn.cycle2.defaults, opts, slideOpts );
                        slideOpts.slideNum = opts.slideCount;
                        try {
                                // these props should always be read from the master state object
                                delete slideOpts.API;
                                delete slideOpts.slideCount;
                                delete slideOpts.currSlide;
                                delete slideOpts.nextSlide;
                                delete slideOpts.slides;
                        } catch(e) {
                                // no op
                        }
                        return slideOpts;
                },
                getSlideOpts: function( index ) {
                        var opts = this.opts();
                        if ( index === undefined )
                                index = opts.currSlide;
                        var slide = opts.slides[index];
                        var slideOpts = $(slide).data('cycle2.opts');
                        return $.extend( {}, opts, slideOpts );
                },
                initSlide: function( slideOpts, slide, suggestedZindex ) {
                        var opts = this.opts();
                        slide.css( slideOpts.slideCss || {} );
                        if ( suggestedZindex > 0 )
                                slide.css( 'zIndex', suggestedZindex );
                        // ensure that speed settings are sane
                        if ( isNaN( slideOpts.speed ) )
                                slideOpts.speed = $.fx.speeds[slideOpts.speed] || $.fx.speeds._default;
                        if ( !slideOpts.sync )
                                slideOpts.speed = slideOpts.speed / 2;
                        slide.addClass( opts.slideClass );
                },
                updateView: function( isAfter, isDuring, forceEvent ) {
                        var opts = this.opts();
                        if ( !opts._initialized )
                                return;
                        var slideOpts = opts.API.getSlideOpts();
                        var currSlide = opts.slides[ opts.currSlide ];
                        if ( ! isAfter && isDuring !== true ) {
                                opts.API.trigger('cycle2-update-view-before', [ opts, slideOpts, currSlide ]);
                                if ( opts.updateView < 0 )
                                        return;
                        }
                        if ( opts.slideActiveClass ) {
                                opts.slides.removeClass( opts.slideActiveClass )
                                        .eq( opts.currSlide ).addClass( opts.slideActiveClass );
                        }
                        if ( isAfter && opts.hideNonActive )
                                opts.slides.filter( ':not(.' + opts.slideActiveClass + ')' ).css('visibility', 'hidden');
                        if ( opts.updateView === 0 ) {
                                setTimeout(function() {
                                        opts.API.trigger('cycle2-update-view', [ opts, slideOpts, currSlide, isAfter ]);
                                }, slideOpts.speed / (opts.sync ? 2 : 1) );
                        }
                        if ( opts.updateView !== 0 )
                                opts.API.trigger('cycle2-update-view', [ opts, slideOpts, currSlide, isAfter ]);
                        if ( isAfter )
                                opts.API.trigger('cycle2-update-view-after', [ opts, slideOpts, currSlide ]);
                },
                getComponent: function( name ) {
                        var opts = this.opts();
                        var selector = opts[name];
                        if (typeof selector === 'string') {
                                // if selector is a child, sibling combinator, adjancent selector then use find, otherwise query full dom
                                return (/^\s*[\>|\+|~]/).test( selector ) ? opts.container.find( selector ) : $( selector );
                        }
                        if (selector.jquery)
                                return selector;
                        return $(selector);
                },
                stackSlides: function( curr, next, fwd ) {
                        var opts = this.opts();
                        if ( !curr ) {
                                curr = opts.slides[opts.currSlide];
                                next = opts.slides[opts.nextSlide];
                                fwd = !opts.reverse;
                        }
                        // reset the zIndex for the common case:
                        // curr slide on top,  next slide beneath, and the rest in order to be shown
                        $(curr).css('zIndex', opts.maxZ);
                        var i;
                        var z = opts.maxZ - 2;
                        var len = opts.slideCount;
                        if (fwd) {
                                for ( i = opts.currSlide + 1; i < len; i++ )
                                        $( opts.slides[i] ).css( 'zIndex', z-- );
                                for ( i = 0; i < opts.currSlide; i++ )
                                        $( opts.slides[i] ).css( 'zIndex', z-- );
                        }
                        else {
                                for ( i = opts.currSlide - 1; i >= 0; i-- )
                                        $( opts.slides[i] ).css( 'zIndex', z-- );
                                for ( i = len - 1; i > opts.currSlide; i-- )
                                        $( opts.slides[i] ).css( 'zIndex', z-- );
                        }
                        $(next).css('zIndex', opts.maxZ - 1);
                },
                getSlideIndex: function( el ) {
                        return this.opts().slides.index( el );
                }
        }; // API
        // default logger
        $.fn.cycle2.log = function log() {
                /*global console:true */
                if (window.console && console.log)
                        console.log('[cycle22] ' + Array.prototype.join.call(arguments, ' ') );
        };
        $.fn.cycle2.version = function() { return 'cycle22: ' + version; };
        // helper functions
        function lowerCase(s) {
                return (s || '').toLowerCase();
        }
        // expose transition object
        $.fn.cycle2.transitions = {
                custom: {
                },
                none: {
                        before: function( opts, curr, next, fwd ) {
                                opts.API.stackSlides( next, curr, fwd );
                                opts.cssBefore = { opacity: 1, visibility: 'visible', display: 'block' };
                        }
                },
                fade: {
                        before: function( opts, curr, next, fwd ) {
                                var css = opts.API.getSlideOpts( opts.nextSlide ).slideCss || {};
                                opts.API.stackSlides( curr, next, fwd );
                                opts.cssBefore = $.extend(css, { opacity: 0, visibility: 'visible', display: 'block' });
                                opts.animIn = { opacity: 1 };
                                opts.animOut = { opacity: 0 };
                        }
                },
                fadeout: {
                        before: function( opts , curr, next, fwd ) {
                                var css = opts.API.getSlideOpts( opts.nextSlide ).slideCss || {};
                                opts.API.stackSlides( curr, next, fwd );
                                opts.cssBefore = $.extend(css, { opacity: 1, visibility: 'visible', display: 'block' });
                                opts.animOut = { opacity: 0 };
                        }
                },
                scrollHorz: {
                        before: function( opts, curr, next, fwd ) {
                                opts.API.stackSlides( curr, next, fwd );
                                var w = opts.container.css('overflow','hidden').width();
                                opts.cssBefore = { left: fwd ? w : - w, top: 0, opacity: 1, visibility: 'visible', display: 'block' };
                                opts.cssAfter = { zIndex: opts._maxZ - 2, left: 0 };
                                opts.animIn = { left: 0 };
                                opts.animOut = { left: fwd ? -w : w };
                        }
                }
        };
        // @see: http://jquery.malsup.com/cycle22/api
        $.fn.cycle2.defaults = {
                allowWrap:        true,
                autoSelector:     '.cycle2-slideshow[data-cycle2-auto-init!=false]',
                delay:            0,
                easing:           null,
                fx:              'fade',
                hideNonActive:    true,
                loop:             0,
                manualFx:         undefined,
                manualSpeed:      undefined,
                manualTrump:      true,
                maxZ:             100,
                pauseOnHover:     true,
                reverse:          false,
                slideActiveClass: 'cycle2-slide-active',
                slideClass:       'cycle2-slide',
                slideCss:         { position: 'absolute', top: 0, left: 0 },
                slides:          '> img',
                speed:            500,
                startingSlide:    0,
                sync:             true,
                timeout:          4000,
                updateView:       0
        };
        /*----------------------------------------------------------------------------*/
        /* ! cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
        $.extend($.fn.cycle2.defaults, {
                autoHeight: 0, // setting this option to false disables autoHeight logic
                autoHeightSpeed: 250,
                autoHeightEasing: null
        });    
        $(document).on( 'cycle2-initialized', function( e, opts ) {
                var autoHeight = opts.autoHeight;
                var t = $.type( autoHeight );
                var resizeThrottle = null;
                var ratio;
                if ( t !== 'string' && t !== 'number' )
                        return;
                // bind events
                opts.container.on( 'cycle2-slide-added cycle2-slide-removed', initAutoHeight );
                opts.container.on( 'cycle2-destroyed', onDestroy );
                if ( autoHeight == 'container' ) {
                        opts.container.on( 'cycle2-before', onBefore );
                }
                else if ( t === 'string' && /\d+\:\d+/.test( autoHeight ) ) { 
                        // use ratio
                        ratio = autoHeight.match(/(\d+)\:(\d+)/);
                        ratio = ratio[1] / ratio[2];
                        opts._autoHeightRatio = ratio;
                }
                // if autoHeight is a number then we don't need to recalculate the sentinel
                // index on resize
                if ( t !== 'number' ) {
                        // bind unique resize handler per slideshow (so it can be 'off-ed' in onDestroy)
                        opts._autoHeightOnResize = function () {
                                clearTimeout( resizeThrottle );
                                resizeThrottle = setTimeout( onResize, 50 );
                        };
                        $(window).on( 'resize orientationchange', opts._autoHeightOnResize );
                }
                setTimeout( onResize, 30 );
                function onResize() {
                        initAutoHeight( e, opts );
                }
        });
        function initAutoHeight( e, opts ) {
                var clone, height, sentinelIndex;
                var autoHeight = opts.autoHeight;
                if ( autoHeight == 'container' ) {
                        height = $( opts.slides[ opts.currSlide ] ).outerHeight();
                        opts.container.height( height );
                }
                else if ( opts._autoHeightRatio ) { 
                        opts.container.height( opts.container.width() / opts._autoHeightRatio );
                }
                else if ( autoHeight === 'calc' || ( $.type( autoHeight ) == 'number' && autoHeight >= 0 ) ) {
                        if ( autoHeight === 'calc' )
                                sentinelIndex = calcSentinelIndex( e, opts );
                        else if ( autoHeight >= opts.slides.length )
                                sentinelIndex = 0;
                        else 
                                sentinelIndex = autoHeight;
                        // only recreate sentinel if index is different
                        if ( sentinelIndex == opts._sentinelIndex )
                                return;
                        opts._sentinelIndex = sentinelIndex;
                        if ( opts._sentinel )
                                opts._sentinel.remove();
                        // clone existing slide as sentinel
                        clone = $( opts.slides[ sentinelIndex ].cloneNode(true) );
                        // #50; remove special attributes from cloned content
                        clone.removeAttr( 'id name rel' ).find( '[id],[name],[rel]' ).removeAttr( 'id name rel' );
                        clone.css({
                                position: 'static',
                                visibility: 'hidden',
                                display: 'block'
                        }).prependTo( opts.container ).addClass('cycle2-sentinel cycle2-slide').removeClass('cycle2-slide-active');
                        clone.find( '*' ).css( 'visibility', 'hidden' );
                        opts._sentinel = clone;
                }
        }    
        function calcSentinelIndex( e, opts ) {
                var index = 0, max = -1;
                // calculate tallest slide index
                opts.slides.each(function(i) {
                        var h = $(this).height();
                        if ( h > max ) {
                                max = h;
                                index = i;
                        }
                });
                return index;
        }
        function onBefore( e, opts, outgoing, incoming, forward ) {
                var h = $(incoming).outerHeight();
                opts.container.animate( { height: h }, opts.autoHeightSpeed, opts.autoHeightEasing );
        }
        function onDestroy( e, opts ) {
                if ( opts._autoHeightOnResize ) {
                        $(window).off( 'resize orientationchange', opts._autoHeightOnResize );
                        opts._autoHeightOnResize = null;
                }
                opts.container.off( 'cycle2-slide-added cycle2-slide-removed', initAutoHeight );
                opts.container.off( 'cycle2-destroyed', onDestroy );
                opts.container.off( 'cycle2-before', onBefore );
                if ( opts._sentinel ) {
                        opts._sentinel.remove();
                        opts._sentinel = null;
                }
        }
            /*! caption plugin for cycle22;  version: 20130306 */
        $.extend($.fn.cycle2.defaults, {
                caption:          '> .cycle2-caption',
                captionTemplate:  '{{slideNum}} / {{slideCount}}',
                overlay:          '> .cycle2-overlay',
                overlayTemplate:  '<div>{{title}}</div><div>{{desc}}</div>',
                captionModule:    'caption'
        });    
        $(document).on( 'cycle2-update-view', function( e, opts, slideOpts, currSlide ) {
                if ( opts.captionModule !== 'caption' )
                        return;
                var el;
                $.each(['caption','overlay'], function() {
                        var name = this; 
                        var template = slideOpts[name+'Template'];
                        var el = opts.API.getComponent( name );
                        if( el.length && template ) {
                                el.html( opts.API.tmpl( template, slideOpts, opts, currSlide ) );
                                el.show();
                        }
                        else {
                                el.hide();
                        }
                });
        });
        $(document).on( 'cycle2-destroyed', function( e, opts ) {
                var el;
                $.each(['caption','overlay'], function() {
                        var name = this, template = opts[name+'Template'];
                        if ( opts[name] && template ) {
                                el = opts.API.getComponent( 'caption' );
                                el.empty();
                        }
                });
        });
        /*! command plugin for cycle22;  version: 20140415 */
        var c2 = $.fn.cycle2;
        $.fn.cycle2 = function( options ) {
                var cmd, cmdFn, opts;
                var args = $.makeArray( arguments );
                if ( $.type( options ) == 'number' ) {
                        return this.cycle2( 'goto', options );
                }
                if ( $.type( options ) == 'string' ) {
                        return this.each(function() {
                                var cmdArgs;
                                cmd = options;
                                opts = $(this).data('cycle2.opts');
                                if ( opts === undefined ) {
                                        c2.log('slideshow must be initialized before sending commands; "' + cmd + '" ignored');
                                        return;
                                }
                                else {
                                        cmd = cmd == 'goto' ? 'jump' : cmd; // issue #3; change 'goto' to 'jump' internally
                                        cmdFn = opts.API[ cmd ];
                                        if ( $.isFunction( cmdFn )) {
                                                cmdArgs = $.makeArray( args );
                                                cmdArgs.shift();
                                                return cmdFn.apply( opts.API, cmdArgs );
                                        }
                                        else {
                                                c2.log( 'unknown command: ', cmd );
                                        }
                                }
                        });
                }
                else {
                        return c2.apply( this, arguments );
                }
        };
        // copy props
        $.extend( $.fn.cycle2, c2 );
        $.extend( c2.API, {
                next: function() {
                        var opts = this.opts();
                        if ( opts.busy && ! opts.manualTrump )
                                return;
                        var count = opts.reverse ? -1 : 1;
                        if ( opts.allowWrap === false && ( opts.currSlide + count ) >= opts.slideCount )
                                return;
                        opts.API.advanceSlide( count );
                        opts.API.trigger('cycle2-next', [ opts ]).log('cycle2-next');
                },
                prev: function() {
                        var opts = this.opts();
                        if ( opts.busy && ! opts.manualTrump )
                                return;
                        var count = opts.reverse ? 1 : -1;
                        if ( opts.allowWrap === false && ( opts.currSlide + count ) < 0 )
                                return;
                        opts.API.advanceSlide( count );
                        opts.API.trigger('cycle2-prev', [ opts ]).log('cycle2-prev');
                },
                destroy: function() {
                        this.stop(); //#204
                        var opts = this.opts();
                        var clean = $.isFunction( $._data ) ? $._data : $.noop;  // hack for #184 and #201
                        clearTimeout(opts.timeoutId);
                        opts.timeoutId = 0;
                        opts.API.stop();
                        opts.API.trigger( 'cycle2-destroyed', [ opts ] ).log('cycle2-destroyed');
                        opts.container.removeData();
                        clean( opts.container[0], 'parsedAttrs', false );
                        // #75; remove inline styles
                        if ( ! opts.retainStylesOnDestroy ) {
                                opts.container.removeAttr( 'style' );
                                opts.slides.removeAttr( 'style' );
                                opts.slides.removeClass( opts.slideActiveClass );
                        }
                        opts.slides.each(function() {
                                $(this).removeData();
                                clean( this, 'parsedAttrs', false );
                        });
                },
                jump: function( index, fx ) {
                        // go to the requested slide
                        var fwd;
                        var opts = this.opts();
                        if ( opts.busy && ! opts.manualTrump )
                                return;
                        var num = parseInt( index, 10 );
                        if (isNaN(num) || num < 0 || num >= opts.slides.length) {
                                opts.API.log('goto: invalid slide index: ' + num);
                                return;
                        }
                        if (num == opts.currSlide) {
                                opts.API.log('goto: skipping, already on slide', num);
                                return;
                        }
                        opts.nextSlide = num;
                        clearTimeout(opts.timeoutId);
                        opts.timeoutId = 0;
                        opts.API.log('goto: ', num, ' (zero-index)');
                        fwd = opts.currSlide < opts.nextSlide;
                        opts._tempFx = fx;
                        opts.API.prepareTx( true, fwd );
                },
                stop: function() {
                        var opts = this.opts();
                        var pauseObj = opts.container;
                        clearTimeout(opts.timeoutId);
                        opts.timeoutId = 0;
                        opts.API.stopTransition();
                        if ( opts.pauseOnHover ) {
                                if ( opts.pauseOnHover !== true )
                                        pauseObj = $( opts.pauseOnHover );
                                pauseObj.off('mouseenter mouseleave');
                        }
                        opts.API.trigger('cycle2-stopped', [ opts ]).log('cycle2-stopped');
                },
                reinit: function() {
                        var opts = this.opts();
                        opts.API.destroy();
                        opts.container.cycle2();
                },
                remove: function( index ) {
                        var opts = this.opts();
                        var slide, slideToRemove, slides = [], slideNum = 1;
                        for ( var i=0; i < opts.slides.length; i++ ) {
                                slide = opts.slides[i];
                                if ( i == index ) {
                                        slideToRemove = slide;
                                }
                                else {
                                        slides.push( slide );
                                        $( slide ).data('cycle2.opts').slideNum = slideNum;
                                        slideNum++;
                                }
                        }
                        if ( slideToRemove ) {
                                opts.slides = $( slides );
                                opts.slideCount--;
                                $( slideToRemove ).remove();
                                if (index == opts.currSlide)
                                        opts.API.advanceSlide( 1 );
                                else if ( index < opts.currSlide )
                                        opts.currSlide--;
                                else
                                        opts.currSlide++;
                                opts.API.trigger('cycle2-slide-removed', [ opts, index, slideToRemove ]).log('cycle2-slide-removed');
                                opts.API.updateView();
                        }
                }
        });
        // listen for clicks on elements with data-cycle2-cmd attribute
        $(document).on('click.cycle2', '[data-cycle2-cmd]', function(e) {
                // issue cycle2 command
                e.preventDefault();
                var el = $(this);
                var command = el.data('cycle2-cmd');
                var context = el.data('cycle2-context') || '.cycle2-slideshow';
                $(context).cycle2(command, el.data('cycle2-arg'));
        });
        /*! hash plugin for cycle22;  version: 20130905 */
        $(document).on( 'cycle2-pre-initialize', function( e, opts ) {
                onHashChange( opts, true );
                opts._onHashChange = function() {
                        onHashChange( opts, false );
                };
                $( window ).on( 'hashchange', opts._onHashChange);
        });
        $(document).on( 'cycle2-update-view', function( e, opts, slideOpts ) {
                if ( slideOpts.hash && ( '#' + slideOpts.hash ) != window.location.hash ) {
                        opts._hashFence = true;
                        window.location.hash = slideOpts.hash;
                }
        });
        $(document).on( 'cycle2-destroyed', function( e, opts) {
                if ( opts._onHashChange ) {
                        $( window ).off( 'hashchange', opts._onHashChange );
                }
        });
        function onHashChange( opts, setStartingSlide ) {
                var hash;
                if ( opts._hashFence ) {
                        opts._hashFence = false;
                        return;
                }
                hash = window.location.hash.substring(1);
                opts.slides.each(function(i) {
                        if ( $(this).data( 'cycle2-hash' ) == hash ) {
                                if ( setStartingSlide === true ) {
                                        opts.startingSlide = i;
                                }
                                else {
                                        var fwd = opts.currSlide < i;
                                        opts.nextSlide = i;
                                        opts.API.prepareTx( true, fwd );
                                }
                                return false;
                        }
                });
        }
        /*! loader plugin for cycle22;  version: 20131121 */
        $.extend($.fn.cycle2.defaults, {
                loader: false
        });
        $(document).on( 'cycle2-bootstrap', function( e, opts ) {
                var addFn;
                if ( !opts.loader )
                        return;
                // override API.add for this slideshow
                addFn = opts.API.add;
                opts.API.add = add;
                function add( slides, prepend ) {
                        var slideArr = [];
                        if ( $.type( slides ) == 'string' )
                                slides = $.trim( slides );
                        else if ( $.type( slides) === 'array' ) {
                                for (var i=0; i < slides.length; i++ )
                                        slides[i] = $(slides[i])[0];
                        }
                        slides = $( slides );
                        var slideCount = slides.length;
                        if ( ! slideCount )
                                return;
                        slides.css('visibility','hidden').appendTo('body').each(function(i) { // appendTo fixes #56
                                var count = 0;
                                var slide = $(this);
                                var images = slide.is('img') ? slide : slide.find('img');
                                slide.data('index', i);
                                // allow some images to be marked as unimportant (and filter out images w/o src value)
                                images = images.filter(':not(.cycle2-loader-ignore)').filter(':not([src=""])');
                                if ( ! images.length ) {
                                        --slideCount;
                                        slideArr.push( slide );
                                        return;
                                }
                                count = images.length;
                                images.each(function() {
                                        // add images that are already loaded
                                        if ( this.complete ) {
                                                imageLoaded();
                                        }
                                        else {
                                                $(this).load(function() {
                                                        imageLoaded();
                                                }).on("error", function() {
                                                        if ( --count === 0 ) {
                                                                // ignore this slide
                                                                opts.API.log('slide skipped; img not loaded:', this.src);
                                                                if ( --slideCount === 0 && opts.loader == 'wait') {
                                                                        addFn.apply( opts.API, [ slideArr, prepend ] );
                                                                }
                                                        }
                                                });
                                        }
                                });
                                function imageLoaded() {
                                        if ( --count === 0 ) {
                                                --slideCount;
                                                addSlide( slide );
                                        }
                                }
                        });
                        if ( slideCount )
                                opts.container.addClass('cycle2-loading');
                        function addSlide( slide ) {
                                var curr;
                                if ( opts.loader == 'wait' ) {
                                        slideArr.push( slide );
                                        if ( slideCount === 0 ) {
                                                // #59; sort slides into original markup order
                                                slideArr.sort( sorter );
                                                addFn.apply( opts.API, [ slideArr, prepend ] );
                                                opts.container.removeClass('cycle2-loading');
                                        }
                                }
                                else {
                                        curr = $(opts.slides[opts.currSlide]);
                                        addFn.apply( opts.API, [ slide, prepend ] );
                                        curr.show();
                                        opts.container.removeClass('cycle2-loading');
                                }
                        }
                        function sorter(a, b) {
                                return a.data('index') - b.data('index');
                        }
                }
        });
        /*! pager plugin for cycle22;  version: 20140415 */
        $.extend($.fn.cycle2.defaults, {
                pager:            '> .cycle2-pager',
                pagerActiveClass: 'cycle2-pager-active',
                pagerEvent:       'click.cycle2',
                pagerEventBubble: undefined,
                pagerTemplate:    '<span>&bull;</span>'
        });
        $(document).on( 'cycle2-bootstrap', function( e, opts, API ) {
                // add method to API
                API.buildPagerLink = buildPagerLink;
        });
        $(document).on( 'cycle2-slide-added', function( e, opts, slideOpts, slideAdded ) {
                if ( opts.pager ) {
                        opts.API.buildPagerLink ( opts, slideOpts, slideAdded );
                        opts.API.page = page;
                }
        });
        $(document).on( 'cycle2-slide-removed', function( e, opts, index, slideRemoved ) {
                if ( opts.pager ) {
                        var pagers = opts.API.getComponent( 'pager' );
                        pagers.each(function() {
                                var pager = $(this);
                                $( pager.children()[index] ).remove();
                        });
                }
        });
        $(document).on( 'cycle2-update-view', function( e, opts, slideOpts ) {
                var pagers;
                if ( opts.pager ) {
                        pagers = opts.API.getComponent( 'pager' );
                        pagers.each(function() {
                             $(this).children().removeClass( opts.pagerActiveClass )
                                .eq( opts.currSlide ).addClass( opts.pagerActiveClass );
                        });
                }
        });
        $(document).on( 'cycle2-destroyed', function( e, opts ) {
                var pager = opts.API.getComponent( 'pager' );
                if ( pager ) {
                        pager.children().off( opts.pagerEvent ); // #202
                        if ( opts.pagerTemplate )
                                pager.empty();
                }
        });
        function buildPagerLink( opts, slideOpts, slide ) {
                var pagerLink;
                var pagers = opts.API.getComponent( 'pager' );
                pagers.each(function() {
                        var pager = $(this);
                        if ( slideOpts.pagerTemplate ) {
                                var markup = opts.API.tmpl( slideOpts.pagerTemplate, slideOpts, opts, slide[0] );
                                pagerLink = $( markup ).appendTo( pager );
                        }
                        else {
                                pagerLink = pager.children().eq( opts.slideCount - 1 );
                        }
                        pagerLink.on( opts.pagerEvent, function(e) {
                                if ( ! opts.pagerEventBubble )
                                        e.preventDefault();
                                opts.API.page( pager, e.currentTarget);
                        });
                });
        }
        function page( pager, target ) {
                /*jshint validthis:true */
                var opts = this.opts();
                if ( opts.busy && ! opts.manualTrump )
                        return;
                var index = pager.children().index( target );
                var nextSlide = index;
                var fwd = opts.currSlide < nextSlide;
                if (opts.currSlide == nextSlide) {
                        return; // no op, clicked pager for the currently displayed slide
                }
                opts.nextSlide = nextSlide;
                opts._tempFx = opts.pagerFx;
                opts.API.prepareTx( true, fwd );
                opts.API.trigger('cycle2-pager-activated', [opts, pager, target ]);
        }
        /*! prevnext plugin for cycle22;  version: 20140408 */
        $.extend($.fn.cycle2.defaults, {
                next:           '> .cycle2-next',
                nextEvent:      'click.cycle2',
                disabledClass:  'disabled',
                prev:           '> .cycle2-prev',
                prevEvent:      'click.cycle2',
                swipe:          false
        });
        $(document).on( 'cycle2-initialized', function( e, opts ) {
                opts.API.getComponent( 'next' ).on( opts.nextEvent, function(e) {
                        e.preventDefault();
                        opts.API.next();
                });
                opts.API.getComponent( 'prev' ).on( opts.prevEvent, function(e) {
                        e.preventDefault();
                        opts.API.prev();
                });
                if ( opts.swipe ) {
                        var nextEvent = opts.swipeVert ? 'swipeUp.cycle2' : 'swipeLeft.cycle2 swipeleft.cycle2';
                        var prevEvent = opts.swipeVert ? 'swipeDown.cycle2' : 'swipeRight.cycle2 swiperight.cycle2';
                        opts.container.on( nextEvent, function(e) {
                                opts._tempFx = opts.swipeFx;
                                opts.API.next();
                        });
                        opts.container.on( prevEvent, function() {
                                opts._tempFx = opts.swipeFx;
                                opts.API.prev();
                        });
                }
        });
        $(document).on( 'cycle2-update-view', function( e, opts, slideOpts, currSlide ) {
                if ( opts.allowWrap )
                        return;
                var cls = opts.disabledClass;
                var next = opts.API.getComponent( 'next' );
                var prev = opts.API.getComponent( 'prev' );
                var prevBoundry = opts._prevBoundry || 0;
                var nextBoundry = (opts._nextBoundry !== undefined)?opts._nextBoundry:opts.slideCount - 1;
                if ( opts.currSlide == nextBoundry )
                        next.addClass( cls ).prop( 'disabled', true );
                else
                        next.removeClass( cls ).prop( 'disabled', false );
                if ( opts.currSlide === prevBoundry )
                        prev.addClass( cls ).prop( 'disabled', true );
                else
                        prev.removeClass( cls ).prop( 'disabled', false );
        });
        $(document).on( 'cycle2-destroyed', function( e, opts ) {
                opts.API.getComponent( 'prev' ).off( opts.nextEvent );
                opts.API.getComponent( 'next' ).off( opts.prevEvent );
                opts.container.off( 'swipeleft.cycle2 swiperight.cycle2 swipeLeft.cycle2 swipeRight.cycle2 swipeUp.cycle2 swipeDown.cycle2' );
        });
        /*! progressive loader plugin for cycle22;  version: 20130315 */
        $.extend($.fn.cycle2.defaults, {
                progressive: false
        });
        $(document).on( 'cycle2-pre-initialize', function( e, opts ) {
                if ( !opts.progressive )
                        return;
                var API = opts.API;
                var nextFn = API.next;
                var prevFn = API.prev;
                var prepareTxFn = API.prepareTx;
                var type = $.type( opts.progressive );
                var slides, scriptEl;
                if ( type == 'array' ) {
                        slides = opts.progressive;
                }
                else if ($.isFunction( opts.progressive ) ) {
                        slides = opts.progressive( opts );
                }
                else if ( type == 'string' ) {
                        scriptEl = $( opts.progressive );
                        slides = $.trim( scriptEl.html() );
                        if ( !slides )
                                return;
                        // is it json array?
                        if ( /^(\[)/.test( slides ) ) {
                                try {
                                        slides = $.parseJSON( slides );
                                }
                                catch(err) {
                                        API.log( 'error parsing progressive slides', err );
                                        return;
                                }
                        }
                        else {
                                // plain text, split on delimeter
                                slides = slides.split( new RegExp( scriptEl.data('cycle2-split') || '\n') );
                                // #95; look for empty slide
                                if ( ! slides[ slides.length - 1 ] )
                                        slides.pop();
                        }
                }
                if ( prepareTxFn ) {
                        API.prepareTx = function( manual, fwd ) {
                                var index, slide;
                                if ( manual || slides.length === 0 ) {
                                        prepareTxFn.apply( opts.API, [ manual, fwd ] );
                                        return;
                                }
                                if ( fwd && opts.currSlide == ( opts.slideCount-1) ) {
                                        slide = slides[ 0 ];
                                        slides = slides.slice( 1 );
                                        opts.container.one('cycle2-slide-added', function(e, opts ) {
                                                setTimeout(function() {
                                                        opts.API.advanceSlide( 1 );
                                                },50);
                                        });
                                        opts.API.add( slide );
                                }
                                else if ( !fwd && opts.currSlide === 0 ) {
                                        index = slides.length-1;
                                        slide = slides[ index ];
                                        slides = slides.slice( 0, index );
                                        opts.container.one('cycle2-slide-added', function(e, opts ) {
                                                setTimeout(function() {
                                                        opts.currSlide = 1;
                                                        opts.API.advanceSlide( -1 );
                                                },50);
                                        });
                                        opts.API.add( slide, true );
                                }
                                else {
                                        prepareTxFn.apply( opts.API, [ manual, fwd ] );
                                }
                        };
                }
                if ( nextFn ) {
                        API.next = function() {
                                var opts = this.opts();
                                if ( slides.length && opts.currSlide == ( opts.slideCount - 1 ) ) {
                                        var slide = slides[ 0 ];
                                        slides = slides.slice( 1 );
                                        opts.container.one('cycle2-slide-added', function(e, opts ) {
                                                nextFn.apply( opts.API );
                                                opts.container.removeClass('cycle2-loading');
                                        });
                                        opts.container.addClass('cycle2-loading');
                                        opts.API.add( slide );
                                }
                                else {
                                        nextFn.apply( opts.API );    
                                }
                        };
                }
                if ( prevFn ) {
                        API.prev = function() {
                                var opts = this.opts();
                                if ( slides.length && opts.currSlide === 0 ) {
                                        var index = slides.length-1;
                                        var slide = slides[ index ];
                                        slides = slides.slice( 0, index );
                                        opts.container.one('cycle2-slide-added', function(e, opts ) {
                                                opts.currSlide = 1;
                                                opts.API.advanceSlide( -1 );
                                                opts.container.removeClass('cycle2-loading');
                                        });
                                        opts.container.addClass('cycle2-loading');
                                        opts.API.add( slide, true );
                                }
                                else {
                                        prevFn.apply( opts.API );
                                }
                        };
                }
        });
        /*-----------------------------------------------*/
        /* ! tmpl plugin for cycle22;  version: 20121227 */
        $.extend($.fn.cycle2.defaults, {
                tmplRegex: '{{((.)?.*?)}}'
        });
        $.extend($.fn.cycle2.API, {
                tmpl: function( str, opts /*, ... */) {
                        var regex = new RegExp( opts.tmplRegex || $.fn.cycle2.defaults.tmplRegex, 'g' );
                        var args = $.makeArray( arguments );
                        args.shift();
                        return str.replace(regex, function(_, str) {
                                var i, j, obj, prop, names = str.split('.');
                                for (i=0; i < args.length; i++) {
                                        obj = args[i];
                                        if ( ! obj )
                                                continue;
                                        if (names.length > 1) {
                                                prop = obj;
                                                for (j=0; j < names.length; j++) {
                                                        obj = prop;
                                                        prop = prop[ names[j] ] || str;
                                                }
                                        } else {
                                                prop = obj[str];
                                        }
                                        if ($.isFunction(prop))
                                                return prop.apply(obj, args);
                                        if (prop !== undefined && prop !== null && prop != str)
                                                return prop;
                                }
                                return str;
                        });
                }
        });    
        // automatically find and run slideshows
        $(document).ready(function() {
                $('div.cycle2-slideshow').each( function () {
                    $(this).children('p').each( function () {
                        var $this = $(this);
                        var $contentsOfBypassedP = $this.children('img');
                        var imgDesc = $contentsOfBypassedP.attr('data-cycle2-desc');
                        imgDesc = imgDesc.replace(/\[/g, "<");
                        imgDesc = imgDesc.replace(/\]/g, ">");
                        $contentsOfBypassedP.attr('data-cycle2-desc',imgDesc);
                        $this.before($contentsOfBypassedP);
                        $this.remove();
                    });
                    $(this).animate({opacity:1.00},200);
                });	
                $('div.cycle2-pager').each( function () {
                    $(this).children('p').each( function () {
                        var $this = $(this);
                        var $contentsOfBypassedP = $this.children('img');
                        $this.before($contentsOfBypassedP);
                        $this.remove();
                    });
                    $(this).animate({opacity:1.00},200);
                });	
                $( $.fn.cycle2.defaults.autoSelector ).cycle2();
        });
    }
})(jQuery);
/************************************************************************************************************\
| JQUERY-MEDIATED ENHANCED INTERACTIVITY OF GRAVITY FORM FIELDS                                              |
\************************************************************************************************************/
(function ($) {
    "use strict";
    
	$(document).bind("gform_post_render", function () {
		var $rqrdFlds =  $("li.gfield_contains_required");
		checkRqrdInpts($rqrdFlds.find("input"));
		checkRqrdChckbxs($rqrdFlds.find("ul.gfield_checkbox, ul.gfield_radio"));
		checkRqrdTxtAreas($rqrdFlds.find("textarea"));
	});
	$(function () {
        if($("div.gform_body").length > 0) {
			initWsuIdInputs(".gf-is-wsu-id");
            setupActvtrChckbxs(".oue-gf-actvtr-checkbox");
            setupActvtrChain(".oue-gf-actvtr-chain");
            setupUploadChain(".oue-gf-upload-chain");
			
            // TODO: streamline functions by querying all ul.gform_fields li.gfield, then determine 
            //   how to handle object by finding div children with gfield_container_class. Best to
            //   implement as a class.
			var $rqrdFlds =  $("li.gfield_contains_required");
			hghlghtRqrdInpts($rqrdFlds.find("input"));
			hghlghtRqrdChckbxs($rqrdFlds.find("ul.gfield_checkbox, ul.gfield_radio"));
			hghlghtRqrdTxtAreas($rqrdFlds.find("textarea"));
			hghlghtRqrdSelects($rqrdFlds.find("select"));
        }
    });
	$(window).load(function () {
		hghlghtRqrdRchTxtEdtrs( $( '.gfield_contains_required.uses-rich-editor' ) );
	});
    
    /******************************************************************************************\
    | Highlight required INPUTS until a value has been properly entered                        |
    \******************************************************************************************/
    function checkRqrdInpts ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				if ($thisInput.val() == "") {
					$thisInput.removeClass("gf-value-entered");
				}
				else {
					$thisInput.addClass("gf-value-entered");
				}
            });
        }
    }
	
    function hghlghtRqrdInpts ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				$thisInput.blur(function () {
					if ($thisInput.val() == "") {
						$thisInput.removeClass("gf-value-entered");
					}
					else {
						$thisInput.addClass("gf-value-entered");
					}
				});
            });
        }
    }

    /******************************************************************************************\
    | Highlight required CHECKBOXES until at least one has been checked                        |
    \******************************************************************************************/
    function checkRqrdChckbxs ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $this = $(this);
                var $inputs = $this.find("input");
				var inputReady = false;
                $inputs.each(function () {
					if ($(this).prop("checked") == true && !inputReady) {
						inputReady = true;
					}
				});
				if (inputReady) {
					$this.addClass("gf-value-entered");
				}
				else {
					$this.removeClass("gf-value-entered");
				}
			});
		}
	}

    function hghlghtRqrdChckbxs ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $this = $(this);
                var $inputs = $this.find("input");
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.change(function () {
                        var $thisParent, $parentsInputs;
                        var inputReady = false;
                        
                        $thisParent = $thisChild.parents("ul.gfield_checkbox, ul.gfield_radio");
                        $parentsInputs = $thisParent.find("input");
                        $parentsInputs.each(function () {
                            if ($(this).prop("checked") == true && !inputReady) {
                                inputReady = true;
                            }
                        });
                        if (inputReady) {
                            $thisParent.addClass("gf-value-entered");
                        }
                        else {
                            $thisParent.removeClass("gf-value-entered");
                        }
                    });
                });
            });
        }
    }

    /******************************************************************************************\
    | Highlight required TEXT AREA inputs until a value has been properly entered              |
    \******************************************************************************************/
    function checkRqrdTxtAreas ($fields) {
		checkRqrdInpts($fields);
    }

    function hghlghtRqrdTxtAreas ($fields) {
		hghlghtRqrdInpts($fields);
    }

    /******************************************************************************************\
    | Highlight required RICH TEXT EDITOR containters until a value has been properly entered  |
    \******************************************************************************************/
	function hghlghtRqrdRchTxtEdtrs($fields) {
        if ($.isJQueryObj($fields) && $fields.length > 0) {
            $fields.each(function () {
				var $edtrFrm = $(this).find("iframe");
				$edtrFrm.each(function () {
					var $edtrBdy = $(this).contents().find("#tinymce");
					$edtrBdy.css( {
						 backgroundColor: 'rgba(255,0,0,0.1)',
						 fontFamily: '"Open sans", sans-serif'
					} );
					$edtrBdy.focus(function () {
						$(this).css("background-color", "rgba(255,255,255,1)");
					});
					$edtrBdy.blur(function () {
						var $this = $(this);
						if($this.text().replace(/\n|\uFEFF/g, "") == "") {
							$this.css("background-color","rgba(255,0,0,0.1)");
						}
					});
				});
			});
		}
	}

    /******************************************************************************************\
    | Highlight required SELECTS until at least one has been checked                           |
    \******************************************************************************************/
    function hghlghtRqrdSelects ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				var $childSlctdOptn = $thisInput.find("option:selected");
				var optionVal = $childSlctdOptn.text();                        
				if (optionVal != "") {
					$thisInput.addClass("gf-value-entered");
				}
				else {
					$thisInput.removeClass("gf-value-entered");
				}
				$thisInput.change(function () {
					$childSlctdOptn = $thisInput.find("option:selected");
					optionVal = $childSlctdOptn.text();                        
					if (optionVal != "") {
						$thisInput.addClass("gf-value-entered");
					}
					else {
						$thisInput.removeClass("gf-value-entered");
					}
				});
            });
        }
    }

    /******************************************************************************************\
    | Initialize RegEx filtration of inputs that accept WSU ID numbers                         |
    \******************************************************************************************/
    function initWsuIdInputs(slctrInputs) {
        var $wsuIdInputs = $(slctrInputs).find("input[type='text']");
		$wsuIdInputs.keydown(function(e) {
            var $this = $(this);
            var inputText = $this.val();
			if((e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) &&
			 !~[8, 9, 20, 35, 36, 37, 39, 46, 110, 144].indexOf(e.keyCode) &&
			 !(e.keyCode == 86 && e.ctrlKey)) {
				e.preventDefault();
			}
			else if (!~[8, 9, 20, 35, 36, 37, 39, 46, 110, 144].indexOf(e.keyCode) &&
					inputText.length >= 9) {
				e.preventDefault();
				alert("Note: WSU ID numbers are no greater than nine (9) digits in length.");
			}
		});
        $wsuIdInputs.on("paste", function (e) {
            var $this = $(this);
			var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
			var inputText = clipboardData.getData('Text');
            var regExMask = /[^0-9]+/g;
            if (regExMask.exec(inputText) != null) {
				var errorMsg = "Note: WSU ID numbers can only contain digits.";
				e.stopPropagation();
				e.preventDefault();
                $this.val(inputText.replace(regExMask, ""));
                inputText = $this.val();
				if (inputText.length > 9) {
					$this.val(inputText.slice(0,9));
					errorMsg += " Also, they must be no greater than nine (9) digits in length.";
				}
				errorMsg += " What you pasted will automatically be corrected; please check the "
					+ "result to see if further corrections are needed."
				alert(errorMsg);
            }
            else if (inputText.length > 9) {
				e.stopPropagation();
				e.preventDefault();
                $this.val(inputText.slice(0,9));
				alert("WSU ID numbers are no greater than nine (9) digits in length. What you "
					+ "pasted will automatically be corrected; please check the result to see if "
					+ "further corrections are needed.");
            }
        });
        $wsuIdInputs.blur(function () {
            var $this = $(this);
            var regExFinalPttrn = /(?:^[0-9]{8}$)|(?:^0[0-9]{8}$)/;
            var inputText = $this.val();
			if (inputText != "") {
				if (regExFinalPttrn.exec(inputText) == null) {					
					$this.val("");
					alert("Please try again: when the leading zero is included, WSU ID numbers are "
						+ "nine (9) digits long. (You can also drop the leading zero and enter in "
						+ "eight (8) digits.)");
				}
			}
        });
    }
	
    /******************************************************************************************\
    | Setup activator checkboxes that disappear once one is selected                           |
    \******************************************************************************************/
    function setupActvtrChckbxs (selector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " input", function () {
                var $thisChild = $(this);
                var $thisParent = $thisChild.parents(selector);
                $thisParent.addClass("gf-activated");
            });
        }
    }
    
    /******************************************************************************************\
    | Setup a chain of activator checkboxes, wherein once a checkbox is activated/deactivated, |
    | only its closest previous sibling is hidden/shown.                                       |
    \******************************************************************************************/
    function setupActvtrChain (selector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " input", function () {
                var $thisChild = $(this);
                var $thisParent = $thisChild.parents(selector);
                var $parentPrevSblngs = $thisParent.prevAll(selector);
                if($thisChild.prop("checked")) {
                    $parentPrevSblngs.first().addClass("gf-hidden");
                }
                else {
                    $parentPrevSblngs.first().removeClass("gf-hidden");
                }
            });
        }
    }

    /******************************************************************************************\
    | Setup a chain of file uploading inputs, wherein only the left-most input in the tree is  |
    | visible. As the user uploads files in sequence, the next nearest neighbor is unveiled.   |
    \******************************************************************************************/
    function setupUploadChain (selector) {
        if ($.type(selector) === "string") {

            // CHECK IF UPLOADS ALREADY EXIST:
            //  It is possible to arrive at this point in execution after the user has submitted a
            //  form containing errors that also already contains transcripts uploaded to input
            //  fields that will be hidden by default. The following blocks of code resolve this
            //  situation by showing such fields, as well as their nearest neighbors.
            var $inputs = $(selector + " input[type='file']");
            $inputs.each(function () {
                var $thisInput = $(this);
                var $nextDiv = $thisInput.nextAll("div[id]").first();
                if($nextDiv.length > 0) {
                    $thisInput.addClass("gf-value-entered");
                    var $parentOfInput = $thisInput.parents(selector).first();
                    $parentOfInput.removeClass("gf-hidden");
                    var $parentNextSblngs = $parentOfInput.nextAll(selector).first();
                    $parentNextSblngs.removeClass("gf-hidden");
                }
            });
            $(".gform_body").on("change", selector + " input[type='file']", function () {
                var $thisInput = $(this);
                if($thisInput.prop("files") != null && $thisInput.prop("files").length > 0) {
                    var valuePassed = true;
                    var $parentOfInput = $thisInput.parents(selector).first();
                    var $parentNextSblngs = $parentOfInput.nextAll(selector);
                    var $parentPrevSblngs = $parentOfInput.prevAll(selector);
                    if($parentNextSblngs.length != 0 || $parentPrevSblngs.length != 0) {
                        var originalFileName = $thisInput.prop("files").item(0).name;
                        $parentPrevSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null && 
                                		$thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                        $parentNextSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null &&
                                		$thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                    }
                    if(valuePassed) {                      
                        $thisInput.addClass("gf-value-entered");
                        $parentNextSblngs.first().removeClass("gf-hidden");
                    }
                    else
                    {
                        alert("A file with the same name has already been uploaded; please choose "
                        	+ "a different file.");
                        $thisInput.get(0).value = "";
                    }
                }
                else {
                    $thisChild.removeClass("gf-value-entered");
                }
            });
        }
    }
    
 })(jQuery);
/*!
 * jQuery.are-you-sure.js: Application of Are-You-Sure jQuery Plugin to WSU OUE websites. Please see
 *     https://github.com/codedance/jquery.AreYouSure/ for more details.
 * Author:  Daniel Rieck (danielcrieck@gmail.com) [https://github.com/invokeImmediately]
 * Version: 2.0.0
 *
 * Published under the MIT license.
 * https://opensource.org/licenses/MIT
 */
( function( $ ) {

var thisFileName = 'jquery.are-you-sure.js';

// Code executed after the browser loads the DOM.
$( function() {
	var thisFuncName = 'DOM loaded';
	var thisFuncDesc = 'Code executed after the DOM has loaded';
	var $gForms;
	
	try {
		assertAreYouSureLoaded();
		$gForms = $( '.gform_wrapper > form' );
		$gForms.areYouSure();		
	} catch (errorMsg) {
		$.logError( thisFileName, thisFuncName, thisFuncDesc, errorMsg );
	}
} );

function assertAreYouSureLoaded() {
	if ( !$.fn.areYouSure ) {
		throw 'The Are-You-Sure jQuery plugin is missing; please verify that you included it as a build dependency.';
	}
}

} )( jQuery );
/*
 * jQuery Media Plugin. http://malsup.com/jquery/media/
 * Copyright (c) 2007-2010 M. Alsup. Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * @version: 0.99 (05-JUN-2013), @requires jQuery v1.1.2 or later
 * $Id: jquery.media.js 2460 2007-07-23 02:53:15Z malsup $*/
(function(a){"use strict";function e(){for(var a=navigator.plugins||[],e=0;e<a.length;e++){var t=a[e];if("np-mswmp.dll"==t.filename)return!0}return!1}function t(){var e="";for(var t in a.fn.media.defaults.players)e.length&&(e+=","),e+=a.fn.media.defaults.players[t].types;return new RegExp("\\.("+e.replace(/,/gi,"|")+")\\b")}function i(a){return function(e,t){return n(e,t,a)}}function r(a){return"0123456789".indexOf(a)>-1}function s(e,t){t=t||{};var i,r,s=a(e),n=e.className||"",l=a.metadata?s.metadata():a.meta?s.data():{};l=l||{};var o=l.width||parseInt((n.match(/\bw:(\d+)/)||[])[1]||0,10)||parseInt((n.match(/\bwidth:(\d+)/)||[])[1]||0,10),p=l.height||parseInt((n.match(/\bh:(\d+)/)||[])[1]||0,10)||parseInt((n.match(/\bheight:(\d+)/)||[])[1]||0,10);o&&(l.width=o),p&&(l.height=p),n&&(l.cls=n);for(var d="data-",m=0;m<e.attributes.length;m++){i=e.attributes[m],r=a.trim(i.name);var f=r.indexOf(d);0===f&&(r=r.substring(d.length),l[r]=i.value)}i=a.fn.media.defaults;var h=t,c=l,u={params:{bgColor:t.bgColor||a.fn.media.defaults.bgColor}},v=a.extend({},i,h,c);return a.each(["attrs","params","flashvars","silverlight"],function(e,t){v[t]=a.extend({},u[t]||{},i[t]||{},h[t]||{},c[t]||{})}),"undefined"==typeof v.caption&&(v.caption=s.text()),v.src=v.src||s.attr("href")||s.attr("src")||"unknown",v}function n(e,t,i){var r,s,n,l=a(e),d=a.fn.media.defaults.players[i];if("iframe"==i)d=a('<iframe width="'+t.width+'" height="'+t.height+'" >'),d.attr("src",t.src),d.css("backgroundColor",d.bgColor);else if("img"==i)d=a("<img>"),d.attr("src",t.src),t.width&&d.attr("width",t.width),t.height&&d.attr("height",t.height),d.css("backgroundColor",d.bgColor);else if(p){r=['<object width="'+t.width+'" height="'+t.height+'" '];for(s in t.attrs)r.push(s+'="'+t.attrs[s]+'" ');for(s in d.ieAttrs||{})n=d.ieAttrs[s],"codebase"==s&&"https:"==window.location.protocol&&(n=n.replace("http","https")),r.push(s+'="'+n+'" ');r.push("></object>");var m=['<param name="'+(d.oUrl||"src")+'" value="'+t.src+'">'];for(s in t.params)m.push('<param name="'+s+'" value="'+t.params[s]+'">');d=document.createElement(r.join(""));for(var f=0;f<m.length;f++)d.appendChild(document.createElement(m[f]))}else if(t.standards){if(r=['<object type="'+d.mimetype+'" width="'+t.width+'" height="'+t.height+'"'],t.src&&r.push(' data="'+t.src+'" '),o)for(s in d.ieAttrs||{})n=d.ieAttrs[s],"codebase"==s&&"https:"==window.location.protocol&&(n=n.replace("http","https")),r.push(s+'="'+n+'" ');r.push(">"),r.push('<param name="'+(d.oUrl||"src")+'" value="'+t.src+'">');for(s in t.params)("wmode"!=s||"flash"==i)&&r.push('<param name="'+s+'" value="'+t.params[s]+'">');r.push("<div><p><strong>"+d.title+" Required</strong></p><p>"+d.title+' is required to view this media. <a href="'+d.pluginspage+'">Download Here</a>.</p></div>'),r.push("</object>")}else{r=['<embed width="'+t.width+'" height="'+t.height+'" style="display:block"'],t.src&&r.push(' src="'+t.src+'" ');for(s in t.attrs)r.push(s+'="'+t.attrs[s]+'" ');for(s in d.eAttrs||{})r.push(s+'="'+d.eAttrs[s]+'" ');for(s in t.params)("wmode"!=s||"flash"==i)&&r.push(s+'="'+t.params[s]+'" ');r.push("></embed>")}var h=e.id?' id="'+e.id+'"':"",c=t.cls?' class="'+t.cls+'"':"",u=a("<div"+h+c+">");return l.after(u).remove(),p||"iframe"==i||"img"==i?u.append(d):u.html(r.join("")),t.caption&&a("<div>").appendTo(u).html(t.caption),u}var l=document.documentMode||0,o=/MSIE/.test(navigator.userAgent),p=o&&(/MSIE (6|7|8)\.0/.test(navigator.userAgent)||9>l);a.fn.media=function(e,i,n){return this.each("undo"==e?function(){var e=a(this),t=e.data("media.origHTML");t&&e.replaceWith(t)}:function(){"function"==typeof e&&(n=i,i=e,e={});var l=s(this,e);"function"==typeof i&&i(this,l);var o,p=t(),d=p.exec(l.src.toLowerCase())||[""];l.type?d[0]=l.type:d.shift();for(var m=0;m<d.length;m++)if(o=d[m].toLowerCase(),r(o[0])&&(o="fn"+o),a.fn.media[o]){var f=a.fn.media[o+"_player"];if(l.params||(l.params={}),f){var h="autostart"==f.autoplayAttr;l.params[f.autoplayAttr||"autoplay"]=h?l.autoplay?1:0:l.autoplay?!0:!1}var c=a.fn.media[o](this,l);if(c.css("backgroundColor",l.bgColor).width(l.width),l.canUndo){var u=a("<div></div>").append(this);c.data("media.origHTML",u.html())}"function"==typeof n&&n(this,c[0],l,f.name);break}})},a.fn.media.mapFormat=function(e,t){e&&t&&a.fn.media.defaults.players[t]&&(e=e.toLowerCase(),r(e[0])&&(e="fn"+e),a.fn.media[e]=a.fn.media[t],a.fn.media[e+"_player"]=a.fn.media.defaults.players[t])},a.fn.media.defaults={standards:!0,canUndo:!0,width:400,height:520,autoplay:0,bgColor:"#ffffff",params:{wmode:"transparent"},attrs:{},flvKeyName:"file",flashvars:{},flashVersion:"7",expressInstaller:null,flvPlayer:"mediaplayer.swf",mp3Player:"mediaplayer.swf",silverlight:{inplaceInstallPrompt:"true",isWindowless:"true",framerate:"24",version:"0.9",onError:null,onLoad:null,initParams:null,userContext:null}},a.fn.media.defaults.players={flash:{name:"flash",title:"Flash",types:"flv,mp3,swf",mimetype:"application/x-shockwave-flash",pluginspage:"http://www.adobe.com/go/getflashplayer",ieAttrs:{classid:"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",type:"application/x-oleobject",codebase:"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+a.fn.media.defaults.flashVersion}},quicktime:{name:"quicktime",title:"QuickTime",mimetype:"video/quicktime",pluginspage:"http://www.apple.com/quicktime/download/",types:"aif,aiff,aac,au,bmp,gsm,mov,mid,midi,mpg,mpeg,mp4,m4a,psd,qt,qtif,qif,qti,snd,tif,tiff,wav,3g2,3gp",ieAttrs:{classid:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",codebase:"http://www.apple.com/qtactivex/qtplugin.cab"}},realplayer:{name:"real",title:"RealPlayer",types:"ra,ram,rm,rpm,rv,smi,smil",mimetype:"audio/x-pn-realaudio-plugin",pluginspage:"http://www.real.com/player/",autoplayAttr:"autostart",ieAttrs:{classid:"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA"}},winmedia:{name:"winmedia",title:"Windows Media",types:"asx,asf,avi,wma,wmv",mimetype:e()?"application/x-ms-wmp":"application/x-mplayer2",pluginspage:"http://www.microsoft.com/Windows/MediaPlayer/",autoplayAttr:"autostart",oUrl:"url",ieAttrs:{classid:"clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6",type:"application/x-oleobject"}},img:{name:"img",title:"Image",types:"gif,png,jpg"},iframe:{name:"iframe",types:"html,pdf"},silverlight:{name:"silverlight",types:"xaml"}};var d=1;for(var m in a.fn.media.defaults.players){var f=a.fn.media.defaults.players[m].types;a.each(f.split(","),function(e,t){r(t[0])&&(t="fn"+t),a.fn.media[t]=a.fn.media[m]=i(m),a.fn.media[t+"_player"]=a.fn.media.defaults.players[m]})}a.fn.media.swf=function(e,t){var i,r;if(!window.SWFObject&&!window.swfobject){if(t.flashvars){var s=[];for(i in t.flashvars)s.push(i+"="+t.flashvars[i]);t.params||(t.params={}),t.params.flashvars=s.join("&")}return n(e,t,"flash")}var l=e.id?' id="'+e.id+'"':"",o=t.cls?' class="'+t.cls+'"':"",p=a("<div"+l+o+">");if(window.swfobject)a(e).after(p).appendTo(p),e.id||(e.id="movie_player_"+d++),window.swfobject.embedSWF(t.src,e.id,t.width,t.height,t.flashVersion,t.expressInstaller,t.flashvars,t.params,t.attrs);else{a(e).after(p).remove();var m=new SWFObject(t.src,"movie_player_"+d++,t.width,t.height,t.flashVersion,t.bgColor);t.expressInstaller&&m.useExpressInstall(t.expressInstaller);for(r in t.params)"bgColor"!=r&&m.addParam(r,t.params[r]);for(i in t.flashvars)m.addVariable(i,t.flashvars[i]);m.write(p[0])}return t.caption&&a("<div>").appendTo(p).html(t.caption),p},a.fn.media.flv=a.fn.media.mp3=function(e,t){var i=t.src,r=/\.mp3\b/i.test(i)?t.mp3Player:t.flvPlayer,s=t.flvKeyName;i=encodeURIComponent(i),t.src=r,t.src=t.src+"?"+s+"="+i;var n={};return n[s]=i,t.flashvars=a.extend({},n,t.flashvars),a.fn.media.swf(e,t)},a.fn.media.xaml=function(e,t){if(!window.Sys||!window.Sys.Silverlight){if(a.fn.media.xaml.warning)return;return a.fn.media.xaml.warning=1,void alert("You must include the Silverlight.js script.")}var i={width:t.width,height:t.height,background:t.bgColor,inplaceInstallPrompt:t.silverlight.inplaceInstallPrompt,isWindowless:t.silverlight.isWindowless,framerate:t.silverlight.framerate,version:t.silverlight.version},r={onError:t.silverlight.onError,onLoad:t.silverlight.onLoad},s=e.id?' id="'+e.id+'"':"",n=t.id||"AG"+d++,l=t.cls?' class="'+t.cls+'"':"",o=a("<div"+s+l+">");return a(e).after(o).remove(),Sys.Silverlight.createObjectEx({source:t.src,initParams:t.silverlight.initParams,userContext:t.silverlight.userContext,id:n,parentElement:o[0],properties:i,events:r}),t.caption&&a("<div>").appendTo(o).html(t.caption),o}})(jQuery);

(function($) {
    $(document).ready(function () {
        $('a.media').each(function(){
            $(this).media({ width: '100%', height: 760 });
        });
    });
})(jQuery);/*!
 * jQuery.qTip.js: Application of qTip2 jQuery plugin to WSU OUE websites. Please see
 *     https://github.com/qTip2/qTip2/ for more details.
 * Author:  Daniel Rieck (danielcrieck@gmail.com) [https://github.com/invokeImmediately]
 * Version: 2.0.0
 *
 * Published under the MIT license [https://opensource.org/licenses/MIT]
 */
 
( function ( $ ) {

var thisFileName = 'jquery.qTip.js';

// Code executed once DOM is ready
$( function () {
	var thisFuncName = 'DOM loaded';
	var thisFuncDesc = 'Code executed after the DOM has loaded';
	var qTipSlctr = '.has-tool-tip';
	
	try {
		assertQTipPluginLoaded();
		processQTips(qTipSlctr);
	} catch (errorMsg) {
		$.logError(thisFileName, thisFuncName, thisFuncDesc, errorMsg);
	}
} );

function assertQTipPluginLoaded() {
	if ( !$.fn.qtip ) {
		throw 'The QTip2 plugin is missing; please verify that you included it as a build dependency.';
	}
}

function processQTips(qTipSlctr) {
	// TODO: Refactor for improved maintainability
	var $this;
	var qTipContentSource; // Either a span or a div tag will be accepted.
	var qTipStyle; // Blue and dark qTips are implemented.
	var qTipCntnt; // Object enabling the optional use of titles within qTips.
	$( qTipSlctr ).each( function () {
		$this = $( this );
		$this.hasClass( 'blue' ) ? qTipStyle = 'qtip-blue' : qTipStyle = 'qtip-dark';
		if ( $this.hasClass( 'parental-neighbor-is-source' ) ) {
			qTipCntnt = new QTipContent( $this.parent().next( 'div' ) );
			if ( qTipCntnt.qTipTitle == null ) {
				$this.qtip( {
					style: qTipStyle,
					content: {
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse', // Track the mouse as the positioning target
						adjust: { x: 5, y: 15 } // Offset it slightly from under the mouse
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
			else {
				$this.qtip( {
					style: qTipStyle,
					content: {
						title: qTipCntnt.qTipTitle,
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse', // Track the mouse as the positioning target
						adjust: { x: 5, y: 15 } // Offset it slightly from under the mouse
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
		} else {
			$this.hasClass( 'span-is-source' ) ?
				qTipContentSource = 'span' :
				qTipContentSource = 'div';
			qTipCntnt = new QTipContent( $this.next( qTipContentSource ) );
			if ( qTipCntnt.qTipTitle == null ) {
				$this.qtip( {
					style: qTipStyle,
					content: {
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse',
						adjust: { x: 5, y: 15 }
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			} else {
				$this.qtip( {
					style: qTipStyle,
					content: {
						title: qTipCntnt.qTipTitle,
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse',
						adjust: { x: 5, y: 15 }
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
		}
	} );       
}

/*!
 *  QTip content class
 */
function QTipContent( $qTipSlctr ) {
	var regExPttrn1 = /^\(tooltip: ?(.+)\|(.+)(?=\))\)$/;
	var regExPttrn2 = /^(.+)\|(.+)$/;
	var regExResult;
	this.qTipTitle = null;
	this.qTipText = null;
	this.qTipInnerHTML = null;
	regExResult = regExPttrn1.exec( $qTipSlctr.text() );
	if ( regExResult != null && regExResult.length == 3 ) {
		this.qTipTitle = regExResult[1];
		this.qTipText = regExResult[2];
		regExPttrn = /^(.+)\|/;
		this.qTipInnerHTML = ( regExResult[1] + '|' + regExResult[2] ).replace( regExPttrn, '' );
	} else {
		regExResult = regExPttrn2.exec( $qTipSlctr.text() );
		if ( regExResult != null && regExResult.length == 3 ) {
			this.qTipTitle = regExResult[1];
			this.qTipText = regExResult[2];
			regExPttrn = /^(.+)\|/;
			this.qTipInnerHTML = $qTipSlctr.html().replace( regExPttrn, '' );
		} else {
			this.qTipText = $qTipSlctr.text();
			this.qTipInnerHTML = $qTipSlctr.html();
		}
	}
}

} )( jQuery );/**
 * jQuery.textResize.js
 * Released under GNU GPLv2
 *
 * Based on FitText.js 1.2 (https://github.com/davatron5000/FitText.js) by Dave Rupert
 *  (http://daverupert.com).
 */
(function($){
    $.fn.textResize = function( scalingFactor, options ) {
        // Set up default options in case the caller passed no attributes
        var scalingAmount = scalingFactor || 1,
            settings = $.extend({
                "minFontSize" : Number.NEGATIVE_INFINITY,
                "maxFontSize" : Number.POSITIVE_INFINITY,
				"againstSelf" : true
            }, options);
        return this.each(function () {
            var $this = $(this);
			var $parent = undefined;
			if (!settings.againstSelf) {
				$parent = $this.parents(".column").first();
			}
          
            // Resizer() keeps font-size proportional to object width as constrainted by the user
            var resizer = function () {
				if(!settings.againstSelf) {
					$this.css("font-size", Math.max(Math.min($parent.innerWidth() / (scalingAmount*10),
						parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				}
				else {
					$this.css("font-size", Math.max(Math.min($this.width() / (scalingAmount*10),
						parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				}
            };
          
            // Call once to set the object's font size based on current window size, then call as resize or orientation-change events are triggered.
            resizer();
            $(window).on("resize.textresize orientationchange.textresize", resizer);
        });
    };
})(jQuery);

// Now use the plugin on the WSU Undergraduate education website (i.e. delete or modify the following statement if you are going to utilize this plugin on your own site).
(function($){
	var clmnWidth = 926; // px - default column width
	var dfltSpineWidth = 198; // px - default width of spine
	
    $(document).ready(function () {
		initArticleHeaderText();
		initTextAutoResizers(".auto-fits-text");
    });

	function initArticleHeaderText() {
		//TODO: Refactor to rely on auto
		var $columns = $(".column");
        $columns.find(".article-header .header-content h1").each(function () {
            $(this).textResize(1.277142857142857, {"minFontSize" : "34.8"});
        });
        $columns.find(".article-header .header-content h2").each(function () {
            $(this).textResize(1.847840465639262, {"minFontSize" : "24.0"});
        });
        $columns.find(".article-header .header-content h3").each(function () {
            $(this).textResize(4.110097222222222, {"minFontSize" : "10.7"});
        });
	}
	
	function initTextAutoResizers(cssClass) {
		var $textAutoResizers = new TextAutoResizers(cssClass, dfltSpineWidth);
		$textAutoResizers.initTextAutoResizing();
	}
	
	function TextAutoResizers(cssClass, spineWidth) {	
		var $resizers = $(cssClass);
		
		this.initTextAutoResizing = function () {
			$resizers.each(function() {
				var textAutoResizer = new TextAutoResizingElem($(this), spineWidth);
			});
		}		
		
		function TextAutoResizingElem($jqObj, spineWidth) {
			var $this = $jqObj;
			initTextAutoResizing();
			
			function initTextAutoResizing() {
				if ($.isJQueryObj($this)) {
					var fontSz = parseFloat($this.css("font-size"));
					var scalingAmt = calculateScalingAmount(fontSz);
					if ($this.hasClass("has-max-size")) {
						$this.textResize(scalingAmt, {"minFontSize" : "10.7px", "maxFontSize" : fontSz, "againstSelf" : 0});
					} else {
						$this.textResize(scalingAmt, {"minFontSize" : "10.7px", "againstSelf" : 0});
					}					
				}
			}
			
			function calculateScalingAmount(fontSz) {
				var maxColumnWidth = findMaxColumnWidth();
				return maxColumnWidth / (fontSz * 10);
			}
			
			function findMaxColumnWidth() {
				var $parentCol = $this.parents(".column").first();
				var maxColWidth = findMaxColWidth($parentCol);
				return maxColWidth;
			}
			
			function findMaxColWidth($parentCol) {
				var maxRowWidth = 990; // Sets the default max row width.
				var maxWidthCss = $parentCol.css("max-width"); // In case the max width was explicitly set for the parental column...
				if (maxWidthCss != "none") {
					maxRowWidth = parseFloat(maxWidthCss);
				} else {
					maxRowWidth = findMaxRowWidthFromBinder(maxRowWidth); // In case the max width was implicitly set...
				}
				return divideUpMaxRowWidth(maxRowWidth, $parentCol); // Return the max column width by dividing up the max row width as needed.
			}
			
			function findMaxRowWidthFromBinder(dfltMaxRowWidth) {
				var maxRowWidth = dfltMaxRowWidth;
				var maxCssWidth = findBindersMaxWidthCss();
				if (maxCssWidth != "none") {
					maxRowWidth = parseFloat(maxCssWidth) - spineWidth; // The binder's max width includes the spine's fixed width, so subtract it off to achieve actual max width of row.
				}
				return maxRowWidth; // i.e., returns the max width in numerical form.
			}
			
			function findBindersMaxWidthCss() {
				var maxWidthCss = "none";
				var $binder = $("#binder");
				if ($binder.length == 1) {
					if ($binder.hasClass("max-1188")) {
						maxWidthCss = "1188";
					} else if ($binder.hasClass("max-1386")) {
						maxWidthCss = "1386";						
					} else if ($binder.hasClass("max-1584")) {
						maxWidthCss = "1584";						
					} else if ($binder.hasClass("max-1782")) {
						maxWidthCss = "1782";						
					} else if ($binder.hasClass("max-1980")) {
						maxWidthCss = "1980";						
					}
				}
				return maxWidthCss; // i.e., returns a string containing the parental binder's max width as specified in CSS
			}
			
			function divideUpMaxRowWidth(maxRowWidth, $parentCol) {
				var maxColWidth = maxRowWidth;
				var $parentRow = ($.isJQueryObj($parentCol)) ? $parentCol.parent(".row") : undefined;
				if ($parentCol.css("max-width") == "none" && $.isJQueryObj($parentRow)) {
					if ($parentRow.hasClass("halves")) {
						maxColWidth /= 2;
					} else if ($parentRow.hasClass("thirds")) {
						maxColWidth /= 3;
					} else if ($parentRow.hasClass("quarters")) {
						maxColWidth /= 4;
					}
				}
				return maxColWidth;
			}
		}
	}
})(jQuery);
/*!
 * imagesLoaded PACKAGED v4.1.2
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});/*!
 * jQuery.masonry-custom.js
 * ------------------------
 * DESCRIPTION:
 *     Application of imagesLoaded and Masonry libraries, both written by David DeSandro, to WSU OUE
 *     websites. (Please see [https://github.com/desandro/imagesloaded] and [https://github.com/desa
 *     ndro/masonry] for David's repositories.) 
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 */
( function ($) {

// ---- DOM IS READY: Code executed after the DOM is ready for use. --------------------------------
$( function () {
	var $masonryTrgts = $( 'ul.cascaded-layout' );
	$masonryTrgts.each( function () {
		var $thisCascade = $( this );
		var proceedWithLayout = true;
		var sizerFound = false;
		var gutterSizerFound = false;
		var $cascadeChilren = $thisCascade.children();
		$cascadeChilren.each( function () { // Look for the correct layout
			var $thisChild = $( this );
			if ( !$thisChild.hasClass( 'cascaded-item' ) ) {
				if ( !$thisChild.hasClass( 'cascade-sizer' ) ) {
					if ( !$thisChild.hasClass( 'gutter-sizer' ) ) {
						if ( !$thisChild.hasClass( 'cascade-other' ) ) {
							return proceedWithLayout = false;
						}
					} else {
						gutterSizerFound = true;
					}
				} else {
					sizerFound = true;
				}
			}
		} );
		if ( proceedWithLayout && ( !sizerFound || !gutterSizerFound ) ) proceedWithLayout = false;
		if ( proceedWithLayout ) {
			$thisCascade.masonry( {
				columnWidth: '.cascade-sizer',
				gutter: '.gutter-sizer',
				itemSelector: '.cascaded-item',
				percentPosition: true
			} );
			$thisCascade.attr( 'data-masonry-active', '1' );
			$thisCascade.imagesLoaded().progress( function() {
				$thisCascade.masonry( 'layout' );
			} );
		}
	} );
});

// ---- WINDOW LOADED: Code executed after the browser window has fully loaded ---------------------
$( window ).on( 'load', function () {
	var $masonryTrgts = $( 'ul.cascaded-layout' );
	$masonryTrgts.each( function () {
		var $thisCascade = $( this );
		var proceedWithLayout = true;
		var sizerFound = false;
		var gutterSizerFound = false;
		var $cascadeChilren = $thisCascade.children();
		$cascadeChilren.each( function () {

			// Verify that the layout is correct
			var $thisChild = $( this );
			if ( !$thisChild.hasClass( 'cascaded-item' ) ) {
				if ( !$thisChild.hasClass( 'cascade-sizer' ) ) {
					if ( !$thisChild.hasClass( 'gutter-sizer' ) ) {
						if ( !$thisChild.hasClass( 'cascade-other' ) ) {
							return proceedWithLayout = false;
						}
					} else {
						gutterSizerFound = true;
					}
				} else {
					sizerFound = true;
				}
			}
		});
		if ( proceedWithLayout && ( !sizerFound || !gutterSizerFound ) ) proceedWithLayout = false;
		if ( proceedWithLayout ) {
			$thisCascade.masonry( 'layout' );
		}
	} );
} );
} )( jQuery );
