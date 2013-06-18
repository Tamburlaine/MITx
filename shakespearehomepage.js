var shakeswindow = (function() {
	var exports = {};

	function setup(div){
		var shakelink = $(".shakelink");
		
		shakelink.bind("click", function(){
			var linkylink = $(this);
			var link_val = String(linkylink.attr("id"));
			var container = $(".container");
			console.log(link_val);
			var shakesframe = $("<iframe class='shakesframe' width='935px' src="+link_val+" height='500px'></iframe>");
			
			container.append(shakesframe);
		});
	};
	
	exports.setup = setup;
	
	return exports;
})();


$(document).ready(function() {
    $('.shakeswindow').each(function() {
        shakeswindow.setup(this);  
    });
});

//http://shakespeare.mit.edu/allswell/allswell.1.1.html

//<iframe src="" width=935 height=500 class="shakespage" border=0px></iframe>