/*
*We will need a separate array for the AI.
*Each time this array will hold only the current questions revelant to one animal.
*/
var playerQuestions = [];
var AIQUestions = [];
/*
*Once a question has been used it will be taken out and be put into this array.
*If all questions have been exhausted the original array will be filled with this one.
*/
var AIUsed = [];
var playerUsed = [];

/*
*Is given the type of question desired to be returned.
*Returns a random question of the requested type that has not already been used.
*unless the questions have been exhausted. Then techiniquely they have been used.
*Takes in a bool player, to determine which array to put
*the questions in. If player is false it goes into the
*AIQuestions array, if true goes to PlayerQuestions array.
*Parameter type: (String)
*return: List object with [boolean, int, string, string]
*/
function GetNextQuestionAnswer(QuestionType, player){
	var result = [];
	var isIn;
	//isEmpty(player);
	if(player){
		for(count = 0; count < playerQuestions.data.length-1; count++){
			alert(playerQuestions.data[count]["Question"]);
			/*if(playerQuestions.data[count]["QuestionType"] == QuestionType){
				/*for i in playerUsed.data{
					if(playerQuestions.data[count] == i){
						isIn = true;
					}
				}

				//if(!isIn){
					//result will collect all the values of the wanted question type.
					//don't add something to result if you have already used it.
					//something here is messing with the indexs and deleting the wrong thing.
					result.push(playerQuestions.data[count]);
					delete playerQuestions.data[count];
					playerQuestions.data.splice(count,1);	
				//}
			}*/
			//alert(playerQuestions.data[count]["Question"]+ "after");
		}	
		alert(playerQuestions.data.length);
		//alert(result.length);
		playerUsed.push(result[Math.floor(Math.random() * result.length)]);
		//alert(playerUsed[0]["Question"]);

		return playerUsed;
		//get a random question from this selection
	}else{
		for(count = 0; count < AIQuestions.data.length; count++){
			if(AIQuestions.data[count]["QuestionType"] == QuestionType){
				result.push(AIQuestions.data[count]["Question"]);
				delete AIQuestions.data[count]["QuestionType"];
				AIQuestions.data.splice(count,1);
			}
		}
	}
}

/*Check if all the questions have been used for either the player or AI
*if they have then reload all the questions from either AIUsed or playerUsed
*so that you can use them again.
*Takes in which player is being asked to reload.
*Parameter type: (bool)
*/
function isEmpty(Player){
	if(player){
		if(playerQuestions.data.length <= 0){
			PlayerQuestions.data = playerUsed.data;
			playerUsed.data.length = 0; 
		}
	}else{
		if(AIQuestions.data.length <= 0){
			AIQuestions.data = AIUsed.data;
			AIUsed.data.length = 0;
		}
	}
}
/*Reads the contents of the file and parses it.
*Takes in a bool player, to determine which array to put
*the questions in. If player is false it goes into the
*AIQuestions array, if true goes to PlayerQuestions array.
*Parameter type: (string), (bool)
*Callback runs ProcessQA
*/

function ReadFile(path, player) {
    Papa.parse(path+ ".csv", { 
	    download: true,
	    skipEmptyLines: true,
	    header: true,
	    complete: function (results) {
	    	if(player){
	    		playerQuestions = results;
	    		GetNextQuestionAnswer(1,player);
	    	}
	    	else{
	    		AIQuestions = results;
	    	}
	    }
 	});
}

ReadFile("Dog", true);