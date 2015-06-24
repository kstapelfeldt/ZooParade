

var content = ReadFile('Dog.csv');
var rows = content.split('\n');


//alert(content + '\n\n' + rows.length);

var questionTypes = [];
var questions = [];
var answers = [];


ProcessCSV(rows);
// alert(questionTypes);
// alert(questions);
// alert(answers);

alert(GetNextQuestion());
alert(GetNextQuestion());
alert(GetNextQuestion());

function ProcessCSV(rows){
	for (var i = 1; i < rows.length; i++){
		//alert(rows[i]);
		var row = rows[i].split(',');
		if (row.length >= 1) questionTypes.push(row[0]);
		if (row.length >= 2) questions.push(row[1]);
		if (row.length >= 3) answers.push(row[2]); 
	}
}


function GetNextQuestion(){
	var index = Math.floor(Math.random() * questions.length);
	var question = questions[index];
	questions.splice(index, 1);
	questionTypes.splice(index, 1);
	answers.splice(index, 1);
	return question;
}

/* Reads the text of the file at the given path and returns
 * the contents of the file
 * Parameter type: (string)
 * Return type: string
 */
function ReadFile(path) 
{
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", path, false);
	txtFile.send(null);
	return txtFile.responseText;
}