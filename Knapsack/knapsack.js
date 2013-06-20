var knapsack=(function(){
    function EventHandler(){
        var handlers={};
        //map event string to list of callbacks
        function on(eventString, callback){
            var cblist=handlers[eventString]
            if(cblist===undefined){
                cblist=[]
                handlers[eventString]=cblist;
            }
            cblist.push(callback);
            
        }
        function trigger(eventString,data){
            var cblist=handlers[eventString];
            if(cblist!== undefined){
                for (var i=0;i<cblist.length;i+=1)
                {
                    cblist[i](data);
                }
            }
        }
            return{on:on, trigger: trigger}
        }
    //addOne()
    function Model(div){
        var house=[];
        var knapsack=[]
        var cost=0;
        var weight=0;
        var eventHandler=EventHandler();
        function move(item){
          
            
            var i = house.indexOf(item);
            if(i != -1) {
                  if(weight+item.attr("data-weight")>$(this).attr("data-maxweight")){
            eventHandler.trigger('alert',"too Heavy");}
            else{
               house.splice(i, 1);
               knapsack.push(item);
                weight+=item.attr("data-weight");
                cost+=item.attr("data-value");
            } 
            }  
            
            else{
            i = knapsack.indexOf(item);
            knapsack.splice(i, 1);
            house.push(item);
                }
            
            eventHandler.trigger('update',{"house":house, "knapsack":knapsack});
        }
        
        function getCost(){
            return cost;
        }
         function getWeight(){
            return weight;
        }
        return {move: move, getCost:getCost,  getWeight: getWeight, on:eventHandler.on};
    }
   
    function Controller(model){
        function move(item)
        {
            model.move(item);
        }
         return {move: move};
    }
     function View (divh,divs, model, controller){
         var display=$("<div class='view'>The current value of the counter is <span>0</span> </div>");
         var counterVal=display.find('span');
		 
         $(divh).append();
          function update(cval)
         {  //divh.html("");
           // divs.html("");
            
         }
         function alert()
         {	warning = $('.warning');
            warning.css({ 'display' : 'inline','opacity':80});
			warning.fadeOut(3000, function(){
				warning.css({'display':'none'});
				});
         }
		 
		function toggle() {
			knapsack = $(".knapsack");
			console.log(knapsack.css("top"));
			if (knapsack.css("top") == "50px"){
				knapsack.animate({"top": "-300px", "left":"-780px"}, 800);
			} else{
				knapsack.animate({"top": "50px", "left":"0px"},800);
			};
			
		};
         //model.on('update',update);
         //model.on('alert',alert);
         return {toggle:toggle};
    }
    
    
    function setup(div){
      
        var model=Model();
        var controller=Controller(model);
        var view=View(div, model,controller);
        var items=[$('<img src="clock.png" data-value="175" data-weight="10" data-name="clock"height=60px>'),
        $('<img src="painting.png" data-value="90" data-weight="9" data-name="painting" height=60px>'),
        $('<img src="radio.png" data-value="20" data-weight="4" data-name="radio" height=60px>'),
        $('<img src="vase.png" data-value="50" data-weight="2" data-name="vase"height=60px>'),
        $('<img src="book.png" data-value="10" data-weight="1" data-name="book" height=60px>'),
        $('<img src="computer.png" data-value="200" data-weight="20" data-name="computer"height=60px>"')];
      var obj=[];
      for (var i=0;i<items.length;i+=1){
          var thing=items[i];
          var imdiv=$("<div class = imageDiv  >"+thing.attr("data-weight")+ "lbs  $"
          +thing.attr("data-value") +"</div>");
          thing.on("click", controller.move);
          var object=$("<div class = objectDiv  ></div>");
          object.append(thing,imdiv);
          obj.push(object);
      }
      
        var house=$("<div class='house' width=300px></div>");
        var imgh=$("<img src='house.png' class='imgh' height=60px>");
        imgh.on("click", function(){console.log("click");});
        var boxh=$("<div class='box'></div>");
        for (var j=0;j<obj.length;j+=1){
          boxh.append(obj[j]);
      }
        var labelh=$("<div>Click to put items in knapsack</div>");
        house.append(imgh,boxh,labelh);
        
        var sack=$("<div class='sack'></div>");
        var imgs=$("<img src='burglar.png' class='imgs' height=60px>");
        var wlab=$("<div class='wvlab'>Weight: <span class='w'>0   </span></div>");
        var vlab=$("<span class='vlab'>Value: <span class='v'>0</span></span>");
		wlab.append(vlab);
        var boxs=$("<div class='box'></div>");
        var labels=$("<div>Click to remove items from knapsack</div>");
        sack.append(imgs, wlab,boxs,labels);
        
		var warning=$("<div class='warning'></div>"); //added all this stuff
		var warnText=$("<div class='warnText'><font color='white' size=5pt>Your knapsack is too heavy!</font></div>")
		var warnEllipse=$('<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\
		<ellipse class="warnEllipse" cx="300px" cy="80px" rx="200px" ry="30px"></ellipse>\
		</svg>');
		warning.append(warnEllipse, warnText);
		
		var toggleBut =$("<div class = 'toggleButt'></div>");
		toggleBut.on("click", view.toggle);
		
        $(div).append(house,sack, warning, toggleBut); //added alert
    }
    
    return {setup: setup};
}());
$(document).ready(function(){
    $('.knapsack').each(function(){
        knapsack.setup($(this));});
});