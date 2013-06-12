function test_clear(){
    var JQcanvas = $('#test:first');
    //called this bc it's the JQuery canvas, not the dom object
    //looks through the dom tree and finds the first thing called "test"
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    ctx.clearRect(0,0,JQcanvas.width(),JQcanvas.height()); //top, left, width, height
}

function test_line(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50,50); //changing beginning coordinate of next path element
    ctx.lineTo(50,150);
    ctx.lineTo(150,150);
    ctx.lineTo(150,50);
    ctx.lineTo(50,50);
    ctx.lineWidth=10;
    ctx.strokeStyle="red";
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.stroke(); //we're putting pixels along this line
    
    ctx.fillStyle="black";
    ctx.fill(); //this fills the 5 px on the other side of the path too
}

function test_star(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50,50);
}

function test_rect(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.fillRect(25,25,100,100); //x,y,width,height
    ctx.fillStyle="blue";
    ctx.fillRect(75,75,100,100);
}

function test_smiley(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(100,100,75,0,2*Math.PI); //centerx, centery, radius, startangle, endangle
    ctx.fillStyle="yellow";
    ctx.fill();
    ctx.lineWidth=4;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(100,100,40,1*Math.PI/4,3*Math.PI/4);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(80,80,5,0,2*Math.PI);
    ctx.fillStyle="black";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(120,80,5,0,2*Math.PI);
    ctx.fill();
}

function test_text(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.font="20px Georgia";
    ctx.textAlign="center"; //also could do left, right
    ctx.textBaseline="middle"; //vertical centering, can also do top, bottom, alphabetic
    ctx.fillText("hi",100,100);     //string, x, y
}

function test_mouse(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    var bg_image =$('<canvas></canvas>')[0];
    bg_image.width=200;
    bg_image.height=200;
    var bctx = bg_image.getContext('2d');
    bctx.fillStyle='#F0FFF0';
    bctx.fillRect(0,0,200,200);
    bctx.fillStyle='#FF00FF';
    bctx.fillRect(10,10,100,100);
    
    ctx.drawImage(bg_image,0,0); //image, x, y
    
    //we're gonna redirect the mouse coordinates to the top of the canvas
    JQcanvas.on("mousemove",function(event){
        var mx = event.pageX;
        var my = event.pageY;
        ctx.drawImage(bg_image,0,0);
        
        var offset = JQcanvas.offset(); //{left: ... , top: ...}
        mx = Math.round(mx - offset.left);
        my = Math.round(my - offset.top);
        
        ctx.beginPath();
        ctx.moveTo(mx-10, my);
        ctx.lineTo(mx+10, my);
        ctx.moveTo(mx, my-10);
        ctx.lineTo(mx, my+10);
        ctx.lineWidth=1;
        ctx.strokeStyle="black";
        ctx.stroke();
    });
}