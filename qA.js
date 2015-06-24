
var playerQuestions, AIQuestions;
var playerUsed = [], AIUsed = [];
var player = true;

/*Takes in the type of question desired.
*Returns an array with a random object, with a question, of the requested 
*question type that has not already been used.
*The object is indexed by string. Ex. result[0]["Question"]
*Parameter type: (String)
*return: (array of object)
*/
function GetNextQuestion(QuestionType){
	var result = [];

	if(player){
		for(count = 0; count < playerQuestions.data.length; count++){
			if(playerQuestions.data[count]["QuestionType"] == QuestionType){
				result.push(playerQuestions.data[count]);
			}
		}
		if(result.length == 0){
			result=FillEmpty(QuestionType);
			for(i= 0; i< playerUsed.length;i++){
			}
		}

		var rand = Math.floor(Math.random() * result.length);
		RemoveUsed(result[rand]);
		playerUsed.push(result[rand]);
		return result[rand];
	}else{
		for(count = 0; count < AIQuestions.data.length; count++){
			if(AIQuestions.data[count]["QuestionType"] == QuestionType){
				result.push(AIQuestions.data[count]);
			}
		}
		if(result.length == 0){
			result=FillEmpty(QuestionType);
		}
		var rand = Math.floor(Math.random() * result.length);
		RemoveUsed(result[rand]);
		AIUsed.push(result[rand]);
		return result[rand];
	}
}

/*Takes in the item to be removed from the appropriate array.
*Parameter type (object)
*/
function RemoveUsed(item) {
    if (player) {
        for (count = 0; count < playerQuestions.data.length; count++) {
            if (playerQuestions.data[count] == item) {
                delete playerQuestions.data[count];
                playerQuestions.data.splice(count, 1);
            }
        }
    } else {
        for (count = 0; count < AIQuestions.data.length; count++) {
            if (AIQuestions.data[count] == item) {
                delete AIQuestions.data[count];
                AIQuestions.data.splice(count, 1);
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
	if(player){
		for(count = 0; count < playerUsed.length;count++){
			if(playerUsed[count]["QuestionType"] == QuestionType){
				result.push(playerUsed[count]);
				playerQuestions.data.push(playerUsed[count]);
			}
		}
		return result;
	}else{
	    for (count = 0; count < AIUsed.length; count++) {
	        if (AIUsed[count]["QuestionType"] == QuestionType) {
	            result.push(AIUsed[count]);
	            AIQuestions.data.push(AIUsed[count]);
	        }
	    }
	    return result;
	}
}

/*Takes in the animal in order to get the questions related to it.
*Reads the contents of the file and parses it.
*Parameter type: (string)
*Callback fills the appropriate player array.
*/
function ReadFile(animal) {
    Papa.parse(animal+ ".csv", { 
	    download: true,
	    skipEmptyLines: true,
	    header: true,
	    complete: function (results) {
	    	if(player){
	    	    playerQuestions = results;
	    	}
	    	else{
	    	    AIQuestions = results;
	    	}
	    }
 	});
}