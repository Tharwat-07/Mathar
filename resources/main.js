
/*

// Diable F5 Button
function disableButtonsDown(e) { 
    if ((e.which || e.keyCode) == 116) e.preventDefault(); 
};
$(document).on("keydown", disableButtonsDown);


// Disable Right click
document.addEventListener('contextmenu', event => event.preventDefault());

*/


$(window).load(function() {

    $(".se-pre-con").delay(10).fadeOut("slow");

});


var dataSet = [

        ["", "title", "<img class='img' src='./images/title.png' alt='img'>",
         "عنوان رئيسى", 
         "", "", "", "", "عام",
         `<div class='settings'>
            <label for='in1'>العنوان</label> 
            <input id='in1' value='عنوان رئيسى' type='text' />
          </div>
        <button class='btn_1 icon-plus'><span>أختر</span></button>
        `],
    	["", "m00_1", "<img class='img' src='./images/m00_1.png' alt='img'>", "random2 text", 1, 1, "page 11", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_2_1", "<img class='img' src='./images/m00_2_1.png' alt='img'>", "random2 text", 1, 1, "page 11", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],
    
        ["", "m00_2_2", "<img class='img' src='./images/m00_2_2.png' alt='img'>", "random3 text", 1, 1, "page 12", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],
    
        ["", "m00_2_3", "<img class='img' src='./images/m00_2_3.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_2_4", "<img class='img' src='./images/m00_2_4.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_2_5", "<img class='img' src='./images/m00_2_5.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

        ["", "m00_3", "<img class='img' src='./images/m00_3.png' alt='img'>", "random4 text", 1, 1, "page 13", "choices", "solve equation", "<button class='btn_1 icon-plus'><span>أختر</span></button>"],

    ]; 


$(document).ready(function(){
    
    // INIT vars 
    var ict2 = 1
    // This var for ( Remove Button ) sound click only * H A D A D Y *
    var audio = new Audio("resources/btnclk.wav"); 

    /* radio-active */ 
    var t = $('#full_table').DataTable( {
        data: dataSet,
        columns: [
            { title: "index" },
            { title: "id" },
            { title: "image" },
            { title: "text" },
            { title: "year" },
            { title: "lesson" },
            { title: "reference" },
            { title: "type" },
            { title: "tags" },
            { title: "options" }
        ],

        
        "columnDefs": [{
            "searchable": true,
            "orderable": true,
            "targets": 0,
            "className": "dt-center", 
            "targets": "_all"
        },
                        //{ "visible": false, "targets": 3 }
        ],
        
        "order": [[ 0, 'asc' ]],
        "pageLength": 50,
        "bAutoWidth": false,
        "language": {
            "sLengthMenu": "أظهر _MENU_ مدخلات",
            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
            "sInfoPostFix": "",
            "sSearch": "ابحث:",
            "search": "_INPUT_ : أبحث",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "الأول",
                "sPrevious": "السابق",
                "sNext": "التالي",
                "sLast": "الأخير"
            }
        }    
        
    });
    
    

    t.on('order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        });
    }).draw();
    
    /* radio-active */ 
    var empty_table = $('#empty_table').DataTable({
        rowReorder: true,
        data: [],
        columns: [
            { title: "index" },
            { title: "id" },
            { title: "image" },
            { title: "text" },
            { title: "year" },
            { title: "lesson" },
            { title: "reference" },
            { title: "type" },
            { title: "tags" },
            { title: "options" }
        ],
        "pageLength": 100,
        "bFilter": false,
        "bLengthChange": false,
        "bAutoWidth": false,
        "bPaginate": false,
        
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0,
            "className": "dt-center", 
            "targets": "_all"
        }],
    });
    
    /* clear table 2 by button click */
    $( "#clear_table_2" ).click(function() {
      empty_table.clear().draw();
    });
    
    
    /* move row between tables */ 
    $(".btn_1").on('click', function() {
        var row = $(this).closest('tr').clone();
        //collect options cell - table 1.
        var options_t1 = row.find('td:last-child');
        options_t1.find('button').remove();
        // convert inputs to <p> -> table 2.
        $('input', options_t1).each(function() {
            $(this).replaceWith('<p id="'+this.id+'">'+this.value+'</p>');
        });
        options_t1 = options_t1.html();
        //remove options cell before adding the row to table 2.
        row.find('td:last-child').remove();
        row.find('td:first-child').html(ict2);
        ict2 = ict2 + 1
        //processing the row then adding it to table 2 .
        row = row.append('<th>'+options_t1+'<button class="r_b_s btn_1 icon-remove"><span>أزالة</span></button></th>');
        row  = row.html();
        empty_table.row.add($('<tr>'+row+'</tr>')).draw();
        
        /* remove row from table 2 - EVENT */ 
        $('#empty_table tbody').on( 'click', '.btn_1', function () {
            empty_table
                .row( $(this).parents('tr') )
                .remove()
                .draw();
        });
        
 
        // class .r_b_s for ( Remove Button ) sound click *don't get confused*
        // this code for ( Remove Button ) sound click only * look at  * 
        $(".r_b_s").on('click', function() { 
            audio.play();
        });
        
    });
    
    /* collect data from table 2 by button click */
    $( "#collect_data_t2" ).click(function() {
        var id_per_row = empty_table.columns(1).data().toArray()[0];
        var ops_per_row = empty_table.columns(9).data().toArray()[0];
        var id_cols_length = empty_table.rows()[0].length;
        var dict = {}
        console.log(id_cols_length)
        for (var i = 0; i < id_cols_length; i++) {
            //collect options as a dict from table 2 - perparing data to be sent to lord python.
            var sdict = {};
            $('p', ops_per_row[i]).each(function() {
                sdict[$('label[for="'+this.id+'"]').html()]= $(this).text();
            });
            dict[i] = sdict;
        };
        console.log(id_per_row); //[FUTURE]
        console.log(JSON.stringify(dict)); //[FUTURE]
    });
    
    // and this code for all button sound click * H A D A D Y *
    $("button").on('click', function() {
                
        var audio = new Audio("resources/btnclk.wav");
        audio.play();

    });



    // teansfir active class fot tabs
    $(".nav-link").click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');

    });
    
    

}); 
// End docmennt ready

$(document).on('keyup', 'table input', function() {
    $(this).attr('value',$(this).val());
}); 


/* -----------------------------------------------------------------------
    START TABS PLUGIN
-----------------------------------------------------------------------*/

/*!
 * tabbyjs v12.0.3
 * Lightweight, accessible vanilla JS toggle tabs.
 * (c) 2019 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/tabby
 */

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], (function () {
			return factory(root);
		}));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.Tabby = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {

	'use strict';

	//
	// Variables
	//

	var defaults = {
		idPrefix: 'tabby-toggle_',
		default: '[data-tabby-default]'
	};


	//
	// Methods
	//

	/**
	 * Merge two or more objects together.
	 * @param   {Object}   objects  The objects to merge together
	 * @returns {Object}            Merged values of defaults and options
	 */
	var extend = function () {
		var merged = {};
		Array.prototype.forEach.call(arguments, (function (obj) {
			for (var key in obj) {
				if (!obj.hasOwnProperty(key)) return;
				merged[key] = obj[key];
			}
		}));
		return merged;
	};

	/**
	 * Emit a custom event
	 * @param  {String} type    The event type
	 * @param  {Node}   tab     The tab to attach the event to
	 * @param  {Node}   details Details about the event
	 */
	var emitEvent = function (tab, details) {

		// Create a new event
		var event;
		if (typeof window.CustomEvent === 'function') {
			event = new CustomEvent('tabby', {
				bubbles: true,
				cancelable: true,
				detail: details
			});
		} else {
			event = document.createEvent('CustomEvent');
			event.initCustomEvent('tabby', true, true, details);
		}

		// Dispatch the event
		tab.dispatchEvent(event);

	};

	/**
	 * Remove roles and attributes from a tab and its content
	 * @param  {Node}   tab      The tab
	 * @param  {Node}   content  The tab content
	 * @param  {Object} settings User settings and options
	 */
	var destroyTab = function (tab, content, settings) {

		// Remove the generated ID
		if (tab.id.slice(0, settings.idPrefix.length) === settings.idPrefix) {
			tab.id = '';
		}

		// Remove roles
		tab.removeAttribute('role');
		tab.removeAttribute('aria-controls');
		tab.removeAttribute('aria-selected');
		tab.removeAttribute('tabindex');
		tab.closest('li').removeAttribute('role');
		content.removeAttribute('role');
		content.removeAttribute('aria-labelledby');
		content.removeAttribute('hidden');

	};

	/**
	 * Add the required roles and attributes to a tab and its content
	 * @param  {Node}   tab      The tab
	 * @param  {Node}   content  The tab content
	 * @param  {Object} settings User settings and options
	 */
	var setupTab = function (tab, content, settings) {

		// Give tab an ID if it doesn't already have one
		if (!tab.id) {
			tab.id = settings.idPrefix + content.id;
		}

		// Add roles
		tab.setAttribute('role', 'tab');
		tab.setAttribute('aria-controls', content.id);
		tab.closest('li').setAttribute('role', 'presentation');
		content.setAttribute('role', 'tabpanel');
		content.setAttribute('aria-labelledby', tab.id);

		// Add selected state
		if (tab.matches(settings.default)) {
			tab.setAttribute('aria-selected', 'true');
		} else {
			tab.setAttribute('aria-selected', 'false');
			tab.setAttribute('tabindex', '-1');
			content.setAttribute('hidden', 'hidden');
		}

	};

	/**
	 * Hide a tab and its content
	 * @param  {Node} newTab The new tab that's replacing it
	 */
	var hide = function (newTab) {

		// Variables
		var tabGroup = newTab.closest('[role="tablist"]');
		if (!tabGroup) return {};
		var tab = tabGroup.querySelector('[role="tab"][aria-selected="true"]');
		if (!tab) return {};
		var content = document.querySelector(tab.hash);

		// Hide the tab
		tab.setAttribute('aria-selected', 'false');
		tab.setAttribute('tabindex', '-1');

		// Hide the content
		if (!content) return {previousTab: tab};
		content.setAttribute('hidden', 'hidden');

		// Return the hidden tab and content
		return {
			previousTab: tab,
			previousContent: content
		};

	};

	/**
	 * Show a tab and its content
	 * @param  {Node} tab      The tab
	 * @param  {Node} content  The tab content
	 */
	var show = function (tab, content) {
		tab.setAttribute('aria-selected', 'true');
		tab.setAttribute('tabindex', '0');
		content.removeAttribute('hidden');
		tab.focus();
	};

	/**
	 * Toggle a new tab
	 * @param  {Node} tab The tab to show
	 */
	var toggle = function (tab) {

		// Make sure there's a tab to toggle and it's not already active
		if (!tab || tab.getAttribute('aria-selected') == 'true') return;

		// Variables
		var content = document.querySelector(tab.hash);
		if (!content) return;

		// Hide active tab and content
		var details = hide(tab);

		// Show new tab and content
		show(tab, content);

		// Add event details
		details.tab = tab;
		details.content = content;

		// Emit a custom event
		emitEvent(tab, details);

	};

	/**
	 * Get all of the tabs in a tablist
	 * @param  {Node}   tab  A tab from the list
	 * @return {Object}      The tabs and the index of the currently active one
	 */
	var getTabsMap = function (tab) {
		var tabGroup = tab.closest('[role="tablist"]');
		var tabs = tabGroup ? tabGroup.querySelectorAll('[role="tab"]') : null;
		if (!tabs) return;
		return {
			tabs: tabs,
			index: Array.prototype.indexOf.call(tabs, tab)
		};
	};

	/**
	 * Switch the active tab based on keyboard activity
	 * @param  {Node} tab The currently active tab
	 * @param  {Key}  key The key that was pressed
	 */
	var switchTabs = function (tab, key) {

		// Get a map of tabs
		var map = getTabsMap(tab);
		if (!map) return;
		var length = map.tabs.length - 1;
		var index;

		// Go to previous tab
		if (['ArrowUp', 'ArrowLeft', 'Up', 'Left'].indexOf(key) > -1) {
			index = map.index < 1 ? length : map.index - 1;
		}

		// Go to next tab
		else if (['ArrowDown', 'ArrowRight', 'Down', 'Right'].indexOf(key) > -1) {
			index = map.index === length ? 0 : map.index + 1;
		}

		// Go to home
		else if (key === 'Home') {
			index = 0;

		}

		// Go to end
		else if (key === 'End') {
			index = length;
		}

		// Toggle the tab
		toggle(map.tabs[index]);

	};

	/**
	 * Activate a tab based on the URL
	 * @param  {String} selector The selector for this instantiation
	 */
	var loadFromURL = function (selector) {
		if (window.location.hash.length < 1) return;
		var tab = document.querySelector(selector + ' [role="tab"][href*="' + window.location.hash + '"]');
		toggle(tab);
	};

	/**
	 * Create the Constructor object
	 */
	var Constructor = function (selector, options) {

		//
		// Variables
		//

		var publicAPIs = {};
		var settings, tabWrapper;


		//
		// Methods
		//

		publicAPIs.destroy = function () {

			// Get all tabs
			var tabs = tabWrapper.querySelectorAll('a');

			// Add roles to tabs
			Array.prototype.forEach.call(tabs, (function (tab) {

				// Get the tab content
				var content = document.querySelector(tab.hash);
				if (!content) return;

				// Setup the tab
				destroyTab(tab, content, settings);

			}));

			// Remove role from wrapper
			tabWrapper.removeAttribute('role');

			// Remove event listeners
			document.documentElement.removeEventListener('click', clickHandler, true);
			tabWrapper.removeEventListener('keydown', keyHandler, true);

			// Reset variables
			settings = null;
			tabWrapper = null;

		};

		/**
		 * Setup the DOM with the proper attributes
		 */
		publicAPIs.setup = function () {

			// Variables
			tabWrapper = document.querySelector(selector);
			if (!tabWrapper) return;
			var tabs = tabWrapper.querySelectorAll('a');

			// Add role to wrapper
			tabWrapper.setAttribute('role', 'tablist');

			// Add roles to tabs
			Array.prototype.forEach.call(tabs, (function (tab) {

				// Get the tab content
				var content = document.querySelector(tab.hash);
				if (!content) return;

				// Setup the tab
				setupTab(tab, content, settings);

			}));

		};

		/**
		 * Toggle a tab based on an ID
		 * @param  {String|Node} id The tab to toggle
		 */
		publicAPIs.toggle = function (id) {

			// Get the tab
			var tab = id;
			if (typeof id === 'string') {
				tab = document.querySelector(selector + ' [role="tab"][href*="' + id + '"]');
			}

			// Toggle the tab
			toggle(tab);

		};

		/**
		 * Handle click events
		 */
		var clickHandler = function (event) {

			// Only run on toggles
			var tab = event.target.closest(selector + ' [role="tab"]');
			if (!tab) return;

			// Prevent link behavior
			event.preventDefault();

			// Toggle the tab
			toggle(tab);

		};

		/**
		 * Handle keydown events
		 */
		var keyHandler = function (event) {

			// Only run if a tab is in focus
			var tab = document.activeElement;
			if (!tab.matches(selector + ' [role="tab"]')) return;

			// Only run for specific keys
			if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Up', 'Down', 'Left', 'Right', 'Home', 'End'].indexOf(event.key) < 0) return;

			// Switch tabs
			switchTabs(tab, event.key);

		};

		/**
		 * Initialize the instance
		 */
		var init = function () {

			// Merge user options with defaults
			settings = extend(defaults, options || {});

			// Setup the DOM
			publicAPIs.setup();

			// Load a tab from the URL
			loadFromURL(selector);

			// Add event listeners
			document.documentElement.addEventListener('click', clickHandler, true);
			tabWrapper.addEventListener('keydown', keyHandler, true);

		};

		//
		// Initialize and return the Public APIs
		//

		init();
		return publicAPIs;

	};

	//
	// Return the Constructor
	//

	return Constructor;

}));

new Tabby('[data-tabs]');
/* -----------------------------------------------------------------------
    END TABS PLUGIN
-----------------------------------------------------------------------*/