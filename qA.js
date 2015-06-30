var binaryIndex = 0;
var typeIndex = 1;
var questionIndex = 2;
var choicesIndex = 3;
var correctIndex = 4;

var startQuestionType = 1;
var onTrailQuestionType = 2;
var captureQuestionType = 3;
var tranportationQuestionType = 4;

//Who's turn it is
var player1 = false;

var player0Questions = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};
var player1Questions = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};

var player0Used = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};
var player1Used = {'start':[], 'onTrail':[], 'capture':[], 'transport':[]};


var fileContent = ReadFile("Dog.csv");
ProcessCSV(fileContent);
player1 = true;
var fileContent = ReadFile("Cat.csv");
ProcessCSV(fileContent);


/* Reads the csv string and stores the questions in the questions array
 * Parameter types: (String)
 */
function ProcessCSV(results){
	var rows = results.split('\n');
	var playerQuestions = player0Questions;
	if (player1) playerQuestions = player1Questions;

	for (var i = 1; i < rows.length; i++){
		var row = rows[i].split(',');
		if (row.length < 5) while (row.length < 5) row.push("");

		if (row[typeIndex] == 1) playerQuestions.start.push(row);
		else if (row[typeIndex] == 2) playerQuestions.onTrail.push(row);
		else if (row[typeIndex] == 3) playerQuestions.capture.push(row);
		else if (row[typeIndex] == 4) playerQuestions.transport.push(row);
	}
}

/* Takes in the type of question desired.
 * Returns an array with a random object, with a question, of the requested 
 * question type that has not already been used.
 * The object is indexed by string. Ex. result[0]["Question"]
 * Parameter types: (String)
 * Return type: (array of object)
 */
function GetNextQuestion(questionType){

	var playerQuestions = player0Questions;
	if (player1) playerQuestions = player1Questions;

	var playerUsed = player0Used;
	if (player1) playerUsed = player1Used;

	var questions = playerQuestions.start;
	var usedQuestions = playerUsed.start;

	if (questionType == onTrailQuestionType) {
		questions = playerQuestions.onTrail;
		usedQuestions = playerUsed.onTrail;
	}
	else if (questionType == captureQuestionType) {
		questions = playerQuestions.capture;
		usedQuestions = playerUsed.capture;
	}
	else if (questionType == tranportationQuestionType) {
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