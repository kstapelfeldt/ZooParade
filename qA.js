
var playerQuestions = [], player2Questions = [];
var playerUsed = [], player2Used = [];
var player1 = true;

function ProcessCSV(results){
	var rows = results.split('\n');

	for (var i = 1; i < rows.length; i++){
		var row = rows[i].split(',');
		if (player1){
		 	if(row.length >= i){
				playerQuestions.push(row);
			}
		}else{
			if(row.length >= i){
				player2Questions.push(row);
			}
		}
	}
}

/*Takes in the type of question desired.
*Returns an array with a random object, with a question, of the requested 
*question type that has not already been used.
*The object is indexed by string. Ex. result[0]["Question"]
*Parameter type: (String)
*return: (array of object)
*/
function GetNextQuestion(QuestionType){
	var result = [];
	if(player1){
		for(count = 0; count < playerQuestions.length; count++){
			if(playerQuestions[count][1] == QuestionType){
				result.push(playerQuestions[count]);
			}
		}

		if(result.length == 0){
			result = FillEmpty(QuestionType);
		}

		var rand = Math.floor(Math.random() * result.length);
		
		RemoveUsed(result[rand]);
		playerUsed.push(result[rand]);
	}else{
		for(count = 0; count < player2Questions.length; count++){
			if(player2Questions[count][1] == QuestionType){
				result.push(player2Questions[count]);
			}
		}
		
		if(result.length == 0){
			result = FillEmpty(QuestionType);
		}

		var rand = Math.floor(Math.random() * result.length);
		RemoveUsed(result[rand]);
		player2Used.push(result[rand]);
	}

	return result[rand][2];
}

/*Takes in the item to be removed from the appropriate array.
*Parameter type (object)
*/
function RemoveUsed(item){
	if(player1){
		for(count = 0; count < playerQuestions.length; count++){
			if(playerQuestions[count] == item){
				playerQuestions.splice(count, 1);
			}
		}
	}else{
		for(count = 0; count < player2Questions.length; count++){
			if(player2Questions[count] == item){
				player2Questions.splice(count, 1);
			}
		}
	}
}

/*Takes in the question type that has already been exhuasted
*then refills the appropiate array with the used questions.
*Returns an array filled with questions of the requested type.
*Parameter type: (string)
*Return type: (array)
*/
function FillEmpty(QuestionType){
	var result = [];
	if(player1){
		for(count = 0; count < playerUsed.length; count++){
			if(playerUsed[count][1] == QuestionType){
				result.push(playerUsed[count]);
				playerQuestions.push(playerUsed[count]);
			}
		}
	}else{
		for(count = 0; count < playerUsed.length; count++){
			if(player2Used[count][1] == QuestionType){
				result.push(player2Used[count]);
				player2Questions.push(player2Used[count]);
			}
		}
	}
	return result;
}

/*Takes in the animal in order to get the questions related to it.
*Reads the contents of the file and converts it to a string.
*Then calls ProcessCSV to fill the appropriate question array.
*Parameter type: (string)
*/
function ReadFile(path) 
{
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", path + ".csv", false);
	txtFile.send(null);
	ProcessCSV(txtFile.responseText);
}