var graphcalc = (function () {
    var exports = {};  // functions,vars accessible from outside

//called when plot is pressed
    function graph(canvas,expression,x_min,x_max) {
        var JQcanvas = canvas;
        var DOMcanvas = JQcanvas[0];
		DOMcanvas.width = canvas.width();
		DOMcanvas.height = canvas.height();
        var ctx = DOMcanvas.getContext('2d');
        
        try {
            var tree = calculator.parse(expression);
			var y_min = 0; // set y_min and y_max both equal to zero, will adjust
			var y_max = 0;
			var y_array = new Array();
            for(var x_val= x_min; x_val<=x_max; x_val+=((x_max-x_min)/800)){ //finding height of the whole canvas
                var y_val = calculator.evaluate(tree,{e: Math.E, pi: Math.PI, x: x_val});
				y_array.push(y_val);
				//this if/else statement updates the bounds of the Y window
				if (y_val < y_min && y_val >= -100*(x_max - x_min)){
					y_min = y_val;
				} else if (y_val > y_max && y_val <= 100*(x_max-x_min)){
					y_max = y_val;
				};
			};
			plotHeight = y_min-y_max;
			plotWidth = x_max-x_min;
			x_val = x_min;
			for (var i = 0; i<= y_array.length; i++){ //now we want to plot things
				console.log(x_val, y_array[i], (x_val-x_min)*DOMcanvas.width/plotWidth, DOMcanvas.height + (y_array[i]-y_array[0])*DOMcanvas.height/plotHeight);
                ctx.lineTo((x_val-x_min)*DOMcanvas.width/plotWidth, DOMcanvas.height + (y_array[i]-y_array[0])*DOMcanvas.height/plotHeight);
                ctx.lineWidth=1;
                ctx.strokeStyle="blue";
                ctx.lineCap="round";
                ctx.lineJoin="round";
                ctx.stroke(); //we're putting pixels along this line
				x_val += ((x_max - x_min)/800);
            };
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000000"
            ctx.stroke;
        }
        catch(e) {
             ctx.fillText(e,0,100);
        }
    };
   //setup is called once when the document is ready
   //binds the buttons to their proper values
    function setup(div) {
        var plot = $("#plot");
		var canvas = $("#graphwindow");
		var clear = $(".clear"); //initialize button variables
		var equals = $(".equals");
		var token = $(".token");
		var token_array = [];
        plot.bind("click", function(){
		var x_funct = String($(".x_funct").val());
            var x_min = parseFloat($(".x_min").val());
            var x_max = parseFloat($(".x_max").val());
            graph(canvas,x_funct,x_min, x_max);
        });
		equals.bind("click", function(){
			var x_funct = String($(".x_funct").val());
			tokenarray_display(canvas, x_funct);
		});
		clear.bind("click",function(){
			var DOMcanvas = canvas[0];
			var ctx = DOMcanvas.getContext('2d');
			ctx.clearRect(0,0,canvas.width(),canvas.height());
			token_array = [];
			equation_display(canvas, token_array);
		});
		$("token").bind("click", function(evt){
			console.log(evt);
			var button = $(this);
			var button_value = button.attr("data-value");
			token_array.push(button_value);
			console.log(token_array);
			equation_display(canvas, token_array);
		});
		
    };

	//called when equals button is pushed, displays x_funct onscreen
	function answer_display(canvas, x_funct){
		var to_display = calculate(x_funct);
		var JQcanvas = canvas;
        var DOMcanvas = JQcanvas[0];
		DOMcanvas.width = canvas.width();
		DOMcanvas.height = canvas.height();
        var ctx = DOMcanvas.getContext('2d');
		
		ctx.beginPath();
        ctx.fillStyle="black";
        ctx.font="15px Georgia";
        ctx.textAlign="right"; //also could do left, center, right
        ctx.textBaseline="middle";
		ctx.fillText(to_display,canvas.width()-10,10);     //string, x, y
	};
	
	function tokenarray_display(canvas, x_funct){
		var to_display = calculate(x_funct);
		var JQcanvas = canvas;
        var DOMcanvas = JQcanvas[0];
		DOMcanvas.width = canvas.width();
		DOMcanvas.height = canvas.height();
        var ctx = DOMcanvas.getContext('2d');
		
		ctx.beginPath();
        ctx.fillStyle="black";
        ctx.font="15px Georgia";
        ctx.textAlign="right"; //also could do left, center, right
        ctx.textBaseline="middle";
		ctx.fillText(to_display,canvas.width()-10,10);     //string, x, y
	};
	
	//calls evaluate on an expression string, returns the result
	function calculate(text) {
		//get ready for some regular expressions
		var pattern = /\d+|\+|\-+|\*+|\/|\(|\)/g;
		var tokens = text.match(pattern);
		try{
			var val = evaluate(tokens);
			if(tokens.length !== 0) throw "ill-formed expression";
		} catch(err){
			return err; //error message will be printed as answer
		}
		return val;
	};
	
	//calls read_operand on each token in the array, returns the result
	function evaluate(token_array){
		try{
			if (token_array === '')    throw "missing operand";
		}
		catch(err){
			var txt = "evaluate is getting an error";
			alert(txt);
		}
		var value = read_operand(token_array);
		while(token_array.length > 0){
			var operator = token_array[0];
			token_array.shift();
			var temp = read_operand(token_array);
			switch(operator){
				case '+':
					value = parseInt(value) + parseInt(temp);
					break;
				case '-':
					value = parseInt(value) - parseInt(temp);
					break;
				case '*':
					value = parseInt(value) * parseInt(temp);
					break;
				case '/':
					value = parseInt(value) / parseInt(temp);
					break;
				default:
					value = "I do not recognize this";
			}
		}
		return value;
	};
	
	function read_operand(token_array) {
		var num = token_array.shift();
		console.log("ro num is "+ num);
		if (num === '(') {
			var subexpr = [];
			console.log("token_array is " + token_array);
			while (token_array.length >= 0){
				   if (token_array[0] === ')'){
					   console.log("the subexpression is: "+ subexpr);
					   console.log("the token_array is: " + token_array);
					   num = evaluate(subexpr);
					   console.log("the result is: "+ num);
					   token_array.shift();
					   return num;
				   }
				   else if (token_array.length === 0){
					   throw "you never closed your parens";
				   }
				   else{
					   console.log("about to shift: ta is " + token_array);
					   subexpr.push(token_array[0]);
					   token_array.shift();
				   }
			   }
			}else if(num === '-'){
				num = token_array[0] * -1;
				token_array.shift();
			}
		try{
			if(isNaN(parseInt(num, 10)))  throw "not a number";
		}
		catch(err){
			var txt = "there is an error";
			alert(txt);
		}
		return num;
	};

	exports.setup = setup;
   
    return exports;
}());
// setup all the graphcalc divs in the document
$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});
