var game = new Game();
var totalAnimationTime = 0;
var qAPair;

// Adjust all the objects on window resize
$(window).resize(function(){
	FixBodySize();
	Destroy(game);
	Setup(game);
});


FixBodySize();
Setup(game);
AddMessage(game.player0.name + ", please choose 1 out of the three animals that you want to capture");


/* This function is called when an animal is selected by the 
 * player to capture
 */
function AnimalSelected(player, animal){

	UpdatePlayerAnimal(player, animal.csvPath);

	if (game.player1.currentAnimal == null){
		AddMessage(game.player1.name + ", please choose 1 out of the three animals that you want to capture");
		game.right = !game.right;
	} else {
		game.right = !game.right;

		qAPair = GetNextQuestion();
		AddQuestionText();
		AddAnswerText();
		AddMessage(game.player0.name + "'s turn");
	}
}

/* Switches players and updates question and answers */
function Proceed(){

	game.right = !game.right;

	var player = game.player0;
	if (game.right) player = game.player1;
	
	UpdateQuestion();
	AddQuestionText();
	AddAnswerText();

	var message = player.name +  "'s turn";
	if (player.spin) message += "<br/>Please spin the Spinner by clicking 'Spin'";
	AddMessage(message);
}

/* Called when animal is captured by the player */
function AnimalCaptured(player, animal){
	player.animalsCaptured.push(animal);
	AddMessage("Please choose an animal to capture next");
	// Move Player placeholder to the captured animal's image
	// Make the player choose another animal in the next turn
}

/* Called when the player's answer is correct 
 * Moves the player to ahead and displays the appropriate info
 */
function CorrectAnswerMove(){
	var player = game.player0;
	if (game.right) player = game.player1;

	var message = "Correct Answer!<br/>Check out more info in the answer section<br/>Click on 'Proceed' to continue";
	if (player.move1 || player.move2 || player.move3){
		if (player.move1){
			MovePlayer(player, player.checkpoints[0]);
			player.move1 = false;
		} else if (player.move2){
			MovePlayer(player, player.checkpoints[1]);
			player.move2 = false;
		} else if (player.move3){
			MovePlayer(player, player.checkpoints[2]);
			player.move3 = false;
		}
		setTimeout(function(){
			AddInfoText();
			AddMessage(message);
		}, totalAnimationTime);
	
	} else if (player.captured){
		// Move the animal to the zoo
		// Make the player choose another animal

	} else {
		if (player.currentCheckpoint.capture && player.currentCheckpoint.animal == player.currentAnimal){
			AnimalCaptured(player, player.currentAnimal);
		} else {
			var paths = GetPossiblePaths(player, player.steps);
			player.possiblePaths = paths;
			if (paths.length == 1){
				var path = paths[0];
				MovePlayer(player, path[path.length - 1]);
				setTimeout(function(){
					AddInfoText();
					AddMessage(message);
				}, totalAnimationTime);
			} else {
				for (var i = 0; i < player.possiblePaths.length; i++){
					SelectCheckpoint (player.possiblePaths[i][player.possiblePaths[i].length - 1]);
				}
				AddMessage("Click on one of the highlighted checkpoints to move player");
			}
		}
			
	}
}

/* Called when the player's answer is wrong 
 * Moves the player to backwards and displays the appropriate info
 */
function WrongAnswerMove(){
	var player = game.player0;
	if (game.right) player = game.player1;

	var message = "Wrong Answer!<br/>Check out more info in the answer section<br/>Click on 'Proceed' to continue";
	if (!player.move1 && !player.move2 && !player.move3){
		player.steps = -1;
		MovePlayer(player, player.visitedCheckpoints[player.visitedCheckpoints.length - 1]);
	}

	setTimeout(function(){
		AddMessage(message);
		AddInfoText();
	}, totalAnimationTime);
}

/* Updates the global variable qAPair */
function UpdateQuestion(){

	var player = game.player0;
	if (game.right) player = game.player1;

	if (player.spin){
		qAPair.question = "";
		qAPair.answer = "";
		qAPair.info = "";
	} else {

		var questionType = startQuestion;
		if (player.visitedCheckpoints.length > 2) questionType = onTrailQuestion;
		if (player.currentCheckpoint != null && player.currentCheckpoint.capture && 
			player.currentCheckpoint.animal == player.currentAnimal) questionType = captureQuestion;
		if (player.captured) questionType = captureQuestion;

		qAPair = GetNextQuestion(questionType, game.right);
	}
	
	AddQuestionText();
	AddAnswerText();
}



/* Adds the message in the message section of the board
 * Parameter types: (String)
 */
function AddMessage(message){
	var div = document.getElementById('messageBoxContent');
	div.style.fontSize = GetMapWidth() * messageFontScale;
	div.innerHTML = '<center>' + message + '</center>';
	game.currentMessage = message;
}

/* Adds the question in the question section of the game */
function AddQuestionText(){
	var question = qAPair.question;

	document.getElementById('questionHeader').style.fontSize = GetMapWidth() * headerFontScale;

	var div = document.getElementById('questionContent');
	div.style.fontSize = GetMapWidth() * textFontScale;
	div.innerHTML = question;
	game.currentQuestion = question;
}

/* Adds the answer in the answer section of the game */
function AddAnswerText(){
	var answer = qAPair.answer;

	document.getElementById('answerHeader').style.fontSize = GetMapWidth() * headerFontScale;
	var div = document.getElementById('answerContent');
	div.style.fontSize = GetMapWidth() * textFontScale;
	div.innerHTML = answer;
	if ((answer == correctYesHTML || answer == correctNoHTML)) SetYesNoButtonStyle();
	game.currentAnswer = answer;
}

/* Adds the info text in the answer section of the game */
function AddInfoText(){
	
	var info = qAPair.info;

	info = "This is awesome!";

	var div = document.getElementById('answerContent');
	div.innerHTML = '<div style="width:100%; height:80%;">'+ info + '</div>' + proceedButtonHTML;

	SetProceedButtonStyle();

}

/* Fixes the size of every element in the body when window is resized */
function FixBodySize(){
	SetBodyStyle();
	SetBorderRadius();
	SetMinHeights();
}

/* Removes the element from the list
 * Parameter types: (list of object, object)
 * Return type: object
 */
function Remove(list, element){
	var index = list.indexOf(element);
	if (index > -1){
		list.splice(index, 1);
	}
	return element;
}























