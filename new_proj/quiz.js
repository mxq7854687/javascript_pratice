
(function(){
var score;
var flag=true;
init();


function Question(question,answer,trueAnswer){
			this.question = question;
			this.answer = answer;
			this.trueAnswer = trueAnswer;
			return {
				output:function(){
					console.log("Question : "+question);
					for(var i=0;i<answer.length;i++)console.log(answer[i]);					
				},
				getQuestion: function(){
					return question;
				},

				getTrueAnswer: function(){
					return trueAnswer;
				}
				}

			}

function setup(){
		var q1,a1,t1;
		var q2,a2,t2;
		var q3,a3,t3;

		q1 = "what is the construtor of this course?";
		a1 = ["1.a","2.b","3.c","4.d"];
		t1 = 3;


		q2 = "Is this course fun?";
		a2 = ["1.maybe","2.sure","3.a little bit","4.not actually"];
		t2 = 2;

		

		q3 = "Is Javascript is the coolest programming language in the world?"
		a3 = ["1.Yes","2.No"];
		t3 = 1;

		Question1 = new Question(q1,a1,t1);
		Question2 = new Question(q2,a2,t2);
		Question3 = new Question(q3,a3,t3);
		Questions = [Question1,Question2,Question3];
		return Questions;

		}
		
		

		



function randomQuestion(questions){
	var currentQuestion,randomInt;

	randomInt = Math.floor(Math.random()*questions.length);
	currentQuestion = questions[randomInt];

	return currentQuestion;

	}
	


function popUpQuestion(question){
	var userInput =  prompt("Please select the correct answer (just type the number). Or type exit to quit",">>");

	var answer = question.getTrueAnswer();


	function updateScore(){
		if(parseInt(userInput)===answer){score+=1}}
	if(userInput !=="exit"){
		updateScore();
		flag=true;
		return flag
	}else{
		flag=false;
		return flag
	}


};





function init(){
	score = 0
	var Questions , currentQuestion;

		Questions = setup();
		while(flag){
		currentQuestion = randomQuestion(Questions);
		//question on console
		currentQuestion.output();
		//question on pop up window and calculate score
		f = popUpQuestion(currentQuestion);
		if(f==true){
			console.log("Your score is : "+ score+".");
			console.log("===========================================")				
		}else{
			break;
		}
		

		

	}

}

})();

