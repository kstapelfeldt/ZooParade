// Dictionary of player questions
var player0Questions = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};
var player1Questions = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};

var player0Used = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};
var player1Used = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};

// Read from the CSV files and fill player questions
// var fileContent = ReadFile("Resources/CSV/Grizzly.csv");
// ProcessCSV(fileContent, false);
// var fileContent = ReadFile("Resources/CSV/Elephant.csv");
// ProcessCSV(fileContent, true);


function UpdatePlayerAnimal(player, animalCSVPath){
	var playerQuestions = player0Questions;
	if (player.right) playerQuestions = player1Questions;

	var playerUsed = player0Used;
	if (player.right) playerUsed = player1Used;

	playerQuestions.start = [];
	playerQuestions.onTrail = [];
	playerQuestions.capture = [];
	playerQuestions.transport = [];

	playerUsed.start = [];
	playerUsed.onTrail = [];
	playerUsed.capture = [];
	playerUsed.transport = [];

	var fileContent = ReadFile(animalCSVPath);
	ProcessCSV(fileContent, player.right);
}

/* Reads the csv string and stores the questions in the questions array
 * Parameter types: (String)
 */
function ProcessCSV(results, right){
	
	var rows = results.split('\n');

	var playerQuestions = player0Questions;
	if (right) playerQuestions = player1Questions;


	for (var i = 1; i < rows.length; i++){

		var row = rows[i].split(',');

		if (row[binaryIndex] != "" && row[typeIndex] != "" && row[questionIndex] != "" && 
			(row[choicesIndex] != "" || row[correctIndex] != "")){

			var question = row[questionIndex];

			var answer = "<br/>";

			if (row[binaryIndex].trim() == "TRUE"){
				if (row[correctIndex].trim() == "TRUE") answer = correctYesHTML;
				else answer = correctNoHTML;
			} else{
				var choices = row[choicesIndex].split("/");
				var correctAnswer = row[correctIndex].trim();
				
				for (var j = 0; j < choices.length; j++){
					var label = choices[j].trim();
					var action = "WrongAnswerMove()";
					if (label == correctAnswer) action = "CorrectAnswerMove()";
					answer += '<div class="mcqOption" cursor="pointer" onClick="' + action + '"><center>' + label + '</center></div><br/>';
				}
			}

			var info = "";
			if (row.length > infoIndex) info = row[infoIndex];

			var qAPair = {'question': question, 'answer': answer, 'info': info};
			
			if (row[typeIndex] == 1) playerQuestions.start.push(qAPair);
			else if (row[typeIndex] == 2) playerQuestions.onTrail.push(qAPair);
			else if (row[typeIndex] == 3) playerQuestions.capture.push(qAPair);
			else if (row[typeIndex] == 4) playerQuestions.transport.push(qAPair);
		}
	}
}

/* Takes in the type of question desired.
 * Returns an array with a random object, with a question, of the requested 
 * question type that has not already been used.
 * Parameter types: (String)
 * Return type: (array of object)
 */
function GetNextQuestion(questionType, right){

	var playerQuestions = player0Questions;
	if (right) playerQuestions = player1Questions;

	var playerUsed = player0Used;
	if (right) playerUsed = player1Used;

	var questions = playerQuestions.start;
	var usedQuestions = playerUsed.start;

	if (questionType == onTrailQuestion) {
		questions = playerQuestions.onTrail;
		usedQuestions = playerUsed.onTrail;
	}
	else if (questionType == captureQuestion) {
		questions = playerQuestions.capture;
		usedQuestions = playerUsed.capture;
	}
	else if (questionType == tranportationQuestion) {
		questions = playerQuestions.transport;
		usedQuestions = playerUsed.transport;
	}
	
	if (questions.length == 0){
		while (usedQuestions.length != 0) questions.push(usedQuestions.pop());
	}

	var index = Math.floor(Math.random() * questions.length);
	
	var question = questions.splice(index, 1)[0];
	usedQuestions.push(question);

	return question;
}

/* Takes in the animal in order to get the questions related to it.
 * Reads the contents of the file and converts it to a string.
 * Parameter type: (string)
 */
function ReadFile(path){
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", path, false);
	txtFile.send(null);
	return txtFile.responseText;
}