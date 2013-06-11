$(document).ready(function(){
   $('.calculator').each(function(){
       //find all the calculators, for each one execute this function
       //'this' referes to the <div> with class calcultor
       setup_calc(this);
   });
});

function setup_calc(div){
    // var button = $('<button>Calculate</button>');
    var output = $('<div class = "output"></div>');
    var equals = $("#equals");
    var clear = $("#clear");
    var token_array = [];
    var tokenClicked = function(evt) {
        console.log(evt);
        var button = $(this);
        var button_value = button.attr("data-value");
        token_array.push(button_value);
        console.log(token_array);
    };
    clear.bind("click", function(){
        token_array = [];
    })
    equals.bind("click", function(){
        console.log(token_array);
        var result = evaluate(token_array);
        $(".output").html(result);
        return result;
        // output.text(String(calculate(input.val())));
    });
    $(".token").bind("click", tokenClicked); //the dollar sign is a function call, "get every node that matches the css selection and call this function")
    
    // var line1 = $('<div class = "newline"></div>');
    // var line2 = $('<div class = "newline"></div>');
    // var line3 = $('<div class = "newline"></div>');
    // var line4 = $('<div class = "newline"></div>');
    // var line5 = $('<div class = "newline"></div>');
    // var line6 = $('<div class = "newline"></div>');
    // $(div).append(output, line1, line2, line3, line4, line5, line6, button);
    // button.bind("click", function(){
    //    output.text('hi'); 
    // });
}

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
}

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
        console.log("value: " + value);
        console.log("operator: " + operator);
        console.log("temp: " + temp);
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
}