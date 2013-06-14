var graphcalc = (function () {
    var exports = {};  // functions,vars accessible from outside
    function graph(canvas,expression,x1,x2) {
        var JQcanvas = canvas;
        var DOMcanvas = JQcanvas[0];
        var ctx = DOMcanvas.getContext('2d');
        
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.font="15px Georgia";
        ctx.textAlign="left"; //also could do left, right
        ctx.textBaseline="middle"; //vertical centering, can also do top, bottom, alphabetic
        console.log("graphing!", x1, x2);
        
        try {
            
            ctx.beginPath();
            
            console.log("trying");
            console.log("expression is: " +expression);
            var tree = calculator.parse(expression);
            for(var x_val= x1; x_val<=x2; x_val+=((x2-x1)/800)){
                var y_val = calculator.evaluate(tree,{e: Math.E, pi: Math.PI, x: x_val})*20;
                console.log("for loop", x_val, 150-y_val, (x2-x1)/100);
                console.log("ctx is: " + ctx);
                ctx.lineTo(255*(x_val-x1)/(x2-x1), 150 - (y_val));
                ctx.lineWidth=1;
                ctx.strokeStyle="red";
                ctx.lineCap="round";
                ctx.lineJoin="round";
                ctx.stroke(); //we're putting pixels along this line
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000000"
            ctx.stroke;
        }
        catch(e) {
             ctx.fillText(e,0,100);
        }
    }
   
    function setup(div) {
        var plot = $("#plot");
        var canvas = $("#graphwindow");
        plot.bind("click", function(){
            var x_funct = String($("#x_funct").val());
            var x_min = parseFloat($("#x_min").val());
            console.log("x_min: "  + x_min);
            var x_max = parseFloat($("#x_max").val());
            graph(canvas,x_funct,x_min, x_max);
            console.log("x_funct is: " + x_funct);
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