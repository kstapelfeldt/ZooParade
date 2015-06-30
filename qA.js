//Question arrays for each player
var player0Questions = [];
var player1Questions = [];

//Who's turn it is
var player1 = false;

//Used Questions for each player
var player0Used = [];
var player1Used = [];



var fileContent = ReadFile("Dog.csv");
AddMessage(fileContent);
ProcessCSV(fileContent);
player1 = true;


function ProcessCSV(results){
	var rows = results.split('\n');
	var playerQuestions = player0Questions;
	if (player1) playerQuestions = player1Questions;

	for (var i = 1; i < rows.length; i++){
		var row = rows[i].split(',');
		playerQuestions.push(row);
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
	var playerQuestions = player0Questions;
	if (player1) playerQuestions = player1Questions;

	var playerUsed = player0Used;
	if(player1) playerUsed = player1Used;

	for(var count = 0; count < playerQuestions.length; count++){
		if(playerQuestions[count][1] == QuestionType){
			result.push(playerQuestions[count]);
		}
	}

	if(result.length == 0) result = FillEmpty(QuestionType);

	var rand = Math.floor(Math.random() * result.length);
	
	RemoveUsed(result[rand]);
	playerUsed.push(result[rand]);

	return result[rand];
}

/*Takes in the item to be removed from the appropriate array.
*Parameter type (object)
*/
function RemoveUsed(item){
	var playerQuestions = player0Questions;
	if (player1) playerQuestions = player1Questions;

	for(var count = 0; count < playerQuestions.length; count++){
		if(playerQuestions[count] == item){
			playerQuestions.splice(count, 1);
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

	var playerQuestions = player0Questions;
	if (player1) playerQuestions = player1Questions;

	var playerUsed = player0Used;
	if(player1) playerUsed = player1Used;

	for(var count = 0; count < playerUsed.length; count++){
		if(playerUsed[count][1] == QuestionType){
			result.push(playerUsed[count]);
			playerQuestions.push(playerUsed[count]);
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
	txtFile.open("GET", path, false);
	txtFile.send(null);
	return txtFile.responseText;
}