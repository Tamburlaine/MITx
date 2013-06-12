var graphcalc = (function () {
    var exports = {};  // functions,vars accessible from outside
   
    function graph(canvas,expression,x1,x2) {
        
    }
   
    function setup(div) {
        var plot = $("#plot");
        var canvas = $("#test");
        plot.bind("click", function(){
            var x_funct = String($("#f(x)").val());
            var x_min = String($("#x_min").val());
            var x_max = String($("#x_max").val());
            //var result = graph(canvas,x_funct,x_min, x_max);
            //return result;
        });
    }
    exports.setup = setup;
   
    return exports;
}());
// setup all the graphcalc divs in the document
$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});