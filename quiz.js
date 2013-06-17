var quiz = (function(){

	function setup(){
		Parse.initialize("q5MA6U7C58dtdgEad3uTUmwebLvN4z1bDCd13HBK", "W3qgF2CufIHZzAmSQsUKkGnC6C23wM2AMfVUWWIr");
		var QuestionData = Parse.Object.extend("QuestionData");
		
		var query = new Parse.Query(QuestionData);
			query.get("q5MA6U7C58dtdgEad3uTUmwebLvN4z1bDCd13HBK", {
			success: function(questionData) {
				alert("bum success!");
			},
			error: function(object, error) {
				alert("shitstorm incoming");
				var questionData = new QuestionData();
				questionData.set("score", 0);
				questionData.set("currentQuestionIndex", 0);
			}
			});
			
		questionData.save();
		
		displayQuestion();
	};
	
	
	var questions = [{"questionText": "Sam thinks y=2x is going to ___ as x goes from 1 to 10.", 
					"options": ["increase", "decrease", "goes up then down", "goes down then up"],
					"solutionIndex": 0},
					{"questionText": "Jill thinks y = 2x-5 is going to ___ as x goes from 1 to 10.", 
					"options": ["increase", "decrease", "goes up then down", "goes down then up"],
					"solutionIndex": 0}]; // questions 
		// structure with... questionText, solutions, options

	var answers = []; // answers from the student
	
	
	//now we're messing with data storage -- Parse
	
	if ("currentQuestionIndex" in localStorage === false){
		localStorage["currentQuestionIndex"] = 0;
	};
	
	if ("score" in localStorage === false){
		localStorage["score"] = 0;
	};
	
	var score = localStorage["score"]; //score of the student
	var currentQuestionIndex = localStorage["currentQuestionIndex"]; //index of the current question we are on

	
	//takes in a question index and a student's answer and returns true if ans correct
	function checkAnswer(q, ans){
		var question = questions[currentQuestionIndex];
		return question.options[question.solutionIndex] == ans;
	};
	
	function getCurrentQuestion(){
		return question[currentQuestionIndex];
	}
	
	function getAnswers(){
		//currentQuestionIndex
		var answer = $('input[name=choice]:checked').val();
		console.log(currentQuestionIndex, answer);
		if (checkAnswer(currentQuestionIndex, answer)){
			$(".correctness").text("You got it right!");
			incrementScore();
		}else{
			$(".correctness").text("You got it wrong :(");
		}
		return checkAnswer(currentQuestionIndex, answer);
	}
	
	function displayQuestion(){
		var question = $("<div class='question'></div>");
		var questionObj = questions[currentQuestionIndex];
		var text = $("<div class='questionText'></div>").append((currentQuestionIndex + 1), ". ", questions[currentQuestionIndex].questionText);
		
		question.append(text);
		
		var options = $("<div class='options'></div>");
		for (var i = 0; i < questionObj.options.length; i++){
			var option = $("<div class='option'></div>");
			var radio = $("<input type='radio' name='choice' value='"+questionObj.options[i]+"'></input>");
			var radioText = $("<span class='optionText' name='optionChoice' + currentQuestionIndex></span>");
			radioText.text(questionObj.options[i]);
			option.append(radio, radioText);
			options.append(option);
		};
		
		//add check answer button
		var button = $("<button class = 'checkButton'>Check Answer</button>");
		
		options.append(button);
		button.one("click", getAnswers);
		
		var nextQButton = $("<span><button class = 'nextQButton'>Next Question</button></span>");
		options.append(nextQButton);
		nextQButton.on("click", displayNextQ);
		
		var correctness = $("<div class = correctness></div>");
		
		var startOver = $("<div><button class = startOver>Start Over</button></div>");
		
		startOver.on("click", function(){
			currentQuestionIndex = 0;
			score = 0;
		})
		
		$('.quiz').append(question, options, correctness, startOver);
	};
	
	function displayNextQ(){
		currentQuestionIndex ++;
		localStorage["currentQuestionIndex"] = currentQuestionIndex;
		$('.question').remove();
		$('.options').remove();
		$('.correctness').remove();
		$('.startOver').remove();
		displayQuestion();
	};
	
	//called when a student gets a question right
	function incrementScore(){
		score++;
		$(".scoreval").text(score);
	};
	
	var exports = {};
	exports.setup = setup;
	return exports;
})(); //don't forget to actually call the function!

$(document).ready(function(){
	quiz.setup();
	
	var req = $.ajax({
		url:"http://localhost:8080/", data: {id: 10}
	});
	req.done(function(msg){
		console.log(msg);
	});
	console.log("what");
});