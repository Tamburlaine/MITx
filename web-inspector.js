/**
 * A simple web inspector.
 *
 * Intended to be a singleton: this only exists once per page, so it
 * attaches itself to the BODY element.
 */
var Inspector = function($) {
  exports = {};

  // The root element of the inspector.
  var root = null;
  var selectorBox = null;	//searches subtree for anything with class selector
  var selection = null; 

  var template = ""
    + "<div class='tray'>"
    + "  <textarea class='text-editor'></textarea>"
    + "  <div class='property-editor'>"
    + "    <div class='node-lookup'>"
    + "      <input class='selector' /><input class='nth' />"
	+ "		 <button class = 'search'>Search</button>"
	+ "		 <button class = 'whee'>Wheee!</button>"
    + "    </div>"
    + "    <div class='property-list'>"
    + "    </div>" 
    + "  </div>" 
    + "</div>" 
    + "<div class='handle'></div>";

	var toggle = function() {
		if (root.css("top") == "0px"){
			root.animate({"top": "-300px"}, 800);
		} else{
			root.animate({"top": "0px"},800);
		};
	};
	
	
	var searchBySelector = function(){
		selectorBox = root.find(".selector"); //searches subtree for anything with class selector
		var selectorStr = selectorBox.val();
		var nBox = root.find(".nth"); //input of the second, wee box
		var n = parseInt(nBox.val()) || 0;
		selection = $(selectorStr).eq(n); 
		setTextEditor();		
	};
	
	var setTextEditor = function(){
		var html = selection.html(); //getting the inner html of the selection
		var textEditor = root.find(".text-editor");
		textEditor.val(html);
		var elHeight = selection.height();
		var elWidth = selection.width();//declare variables for the size, position, spacing, background+ foreground color, tag name, and number of children
		var elPosTop = selection.offset().top;
		var elPosLeft = selection.offset().left;
		var elBgColor = selection.css("background-color");
		var elFgColor = selection.css("color");
		var	elTag = selection[0].tagName;
		var elChildren = selection.children().length;

		allProps = [elHeight, elWidth, elPosTop, elPosLeft, elBgColor, elFgColor, elTag, elChildren];
		
		var propList = root.find(".property-list");
		propList.html(JSON.stringify(allProps));
	};
	
	var updateSelected = function(){
		// we want this function to update the HTML with whatever is typed in our box
		console.log(selection);
		var textEditor = root.find(".text-editor");
		selection.html(textEditor.val());
		
	};
	
	var weeButts = function(e){
		$("body").on("mouseover", wheeEnter);
		$("body").on("mouseout", wheeExit);
		e.stopPropagation();
		$("body").one("click", wheeClicked); //the .one means that it'll only happen once!
	};
	
	var wheeEnter = function(e){
		$(e.target).css("border","5px solid red"); //e is the event
		e.stopPropagation();
	};
	
	var wheeExit = function(e){
		$(e.target).css("border","none");
		e.stopPropagation();
	};
	
	var wheeClicked = function(e){
		selection = $(e.target);
		setTextEditor();
		wheeExit(e);
		$("body").off("mouseover", wheeEnter);
		$("body").off("mouseout", wheeExit);
		e.preventDefault();
	};
  /*
   * Construct the UI
   */
  exports.initialize = function() {
    root = $("<div class='inspector'></div>").appendTo($('body'));
	
	root.append(template);
	root.find(".handle").on("click", toggle);
	root.find(".node-lookup .search").on("click", searchBySelector);	//calls the function "searchBySelector when the button is clicked"
	root.find(".node-lookup .whee").on("click", weeButts); //calls function redHighLight
	root.find(".text-editor").on("keyup", updateSelected);
	
	selectorBox = root.find(".selector");	//searches subtree for anything with class selector
  };
  

  
  exports.toggle = toggle;
  
  return exports;
};

/*****************************************************************************
 * Boot up the web inspector!
 *
 * This will enable you to COPY AND PASTE this entire file into any web page
 * to inspect it.
 *
 * XXX TODO!
 *  Change the CSS link below to point to the full URL of your CSS file!
 *
 *  You shouldn't need to touch anything else below.
 *
 *****************************************************************************/
(function() {
    var createInspector = function() {
      window.inspector = Inspector(jQuery);
      window.inspector.initialize();
    }

    // Add the CSS file to the HEAD
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'web-inspector.css'); // XXX TODO CHANGEME!!
    document.head.appendChild(css);

    if ('jQuery' in window) {
      createInspector(window.jQuery);
    } else {
      // Add jQuery to the HEAD and then start polling to see when it is there
      var scr = document.createElement('script');
      scr.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
      document.head.appendChild(scr);
      var t = setInterval(function() {
        if ('jQuery' in window) {
          clearInterval(t); // Stop polling 
          createInspector();
        }
      }, 50);
    }
})();
