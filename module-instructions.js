var calculator = (function(){
    var exports = {};
    
    function bar(a){
        return a+1;
    }
    
    function foo(a,b) {
        return bar(a)+b;
        
    }
    
    exports.foo = foo; //now we can access foo outside the body of the calculator function
    
    return exports;
});

/*

could call it like so

<script src = "calculator.js"></script>

...calculator.foo(3,4)....

BUT WE CAN'T CALL BAR OUTSIDE THE BODY OF THE CALCULATOR FUNCTION even though we can call foo

*/