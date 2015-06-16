/*
*We will need a separate array for the AI.
*Each time this array will hold only the current questions revelant to one animal.
*/
var values = [];
/*
*Once a question has been used it will be taken out and be put into this array.
*If all questions have been exhausted the original array will be filled with this one.
*/
var usedValues = [];

/*Takes in the parsed values of the file
*then seperates the 
*/
function ProcessQA(results) {
	for (count = 0; count < results.data.length; count++){
		values.push(results.data[count]);	
	}
	GetNextQuestionAnswer(1);
}
/*
*Is given the type of question desired to be returned.
*Returns a random question of the requested type that has not already been used.
*unless the questions have been exhausted. Then techiniquely they have been used.
*Parameter type: (String)
*return: List object with [boolean, int, string, string]
*/
function GetNextQuestionAnswer(QuestionType){
	var tempHold = [];
	alert(tempHold);
	for(count<0; count< values.length; count++){
		if(values[count][QuestionType.parseInt()] == 1){
			tempHold.push(values[count].pop());
		}
	}
	alert(tempHold);
}
/*Reads the contents of the file parses them,
*then sends the results to be processed
*by ProcessQA
*Parameter type: (string), (config)
*Callback runs ProcessQA
*/

function ReadFile(path) {
    Papa.parse(path, { download: true, skipEmptyLines: true, dynamicTyping: true, complete: function (results) { ProcessQA(results); } });
}

ReadFile("Dog.csv");