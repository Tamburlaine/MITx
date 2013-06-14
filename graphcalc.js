var graphcalc = (function () {
    var exports = {};  // functions,vars accessible from outside
    function graph(canvas,expression,x1,x2) {
        var JQcanvas = canvas;
        var DOMcanvas = JQcanvas[0];
		DOMcanvas.width = canvas.width();
		DOMcanvas.height = canvas.height();
        var ctx = DOMcanvas.getContext('2d');
        
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.font="15px Georgia";
        ctx.textAlign="left"; //also could do left, right
        ctx.textBaseline="middle"; //vertical centering, can also do top, bottom, alphabetic
        console.log("graphing!", x1, x2);
        
        try {
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
   
   //setup is called once when the document is ready
   //binds the buttons to their proper values
    function setup(div) {
        var plot = $("#plot");
		var canvas = $("#graphwindow");
		var clear = $("#clear");
        plot.bind("click", function(){
			var f_x = $(".x_funct");
			var x_funct = String(f_x.val());
            var x_min = parseFloat($("#x_min").val());
            var x_max = parseFloat($("#x_max").val());
            graph(canvas,x_funct,x_min, x_max);
        });
		var equals = $(".equals");
		equals.bind("click", function(){
			var f_x = $(".x_funct");
			var x_funct = String(f_x.val());
			equation_display(canvas, x_funct);
		});
		clear.bind("click",function(){
			var DOMcanvas = canvas[0];
			var ctx = DOMcanvas.getContext('2d');
			ctx.clearRect(0,0,canvas.width(),canvas.height());
		});
    };

	//called when equals button is pushed, displays answer onscreen
	function equation_display(canvas, x_funct){
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