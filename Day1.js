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
//    read_operand(tokens);
//    return JSON.stringify(tokens);
}

function setup_calc(div){
    var input = $('<input></input>',{type: "text", size: 50});
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click", function(){
       output.text(String(calculate(input.val()))); 
    });
    
    $(div).append(input, button, output)
}

function read_operand(token_array) {
    var num = token_array.shift();
    try{
        if(isNaN(parseInt(num)))  throw "not a number";
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
        console.log('the value is ' + value);
        console.log('the operator is ' + operator);
        var temp = read_operand(token_array);
        console.log(temp);
        switch(operator){
            case '+':
                value = parseInt(value) + parseInt(temp);
                console.log("please b 6 " + value);
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

//this will be called once when the entire document is loaded from the server
//"when the document is ready, run this function"
//we have a class of calculators
$(document).ready(function(){
   $('.calculator').each(function(){
       //find all the calculators, for each one execute this function
       //'this' referes to the <div> with class calcultor
       setup_calc(this);
   });
});