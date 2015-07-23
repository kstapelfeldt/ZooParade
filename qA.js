var player0QuestionSet = new QuestionSet();
var player1QuestionSet = new QuestionSet();

function UpdatePlayerAnimal(player, animalCSVPath){
	
	

	var playerQuestionSet = player0QuestionSet;
	if (player.right) playerQuestionSet = player1QuestionSet;

	playerQuestionSet = new QuestionSet();
	
	var fileContent = ReadFile(animalCSVPath);

	ProcessCSV(fileContent, player.right);

}

/* Reads the csv string and stores the questions in the questions array
 * Parameter types: (String)
 */
function ProcessCSV(results, right){
	
	var rows = results.split('\n');

	var playerQuestionSet = player0QuestionSet;
	if (right) playerQuestionSet = player1QuestionSet;

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
			var questionObject = new Question(question, answer, info);

			if (row[typeIndex] == startQuestion) playerQuestionSet.start.push(questionObject);
			else if (row[typeIndex] == onTrailQuestion) playerQuestionSet.onTrail.push(questionObject);
			else if (row[typeIndex] == captureQuestion) playerQuestionSet.capture.push(questionObject);
			else if (row[typeIndex] == transportQuestion) playerQuestionSet.transport.push(questionObject);
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

	var playerQuestionSet = player0QuestionSet;
	if (right) playerQuestionSet = player1QuestionSet;

	var question = GetQuestion(playerQuestionSet, questionType);

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