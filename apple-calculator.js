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
    var token_array = [];
    var tokenClicked = function(evt) {
        console.log(evt);
        var button = $(this);
        var button_value = button.attr("data-value");
        token_array.push(button_value);
        console.log(token_array);
    };
    equals.bind("click", function(){
        alert("calculating!");
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