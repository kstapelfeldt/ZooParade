
var game = new Game();
var totalAnimationTime = 0;

FixBodySize();
Setup(game);
UpdateQuestion();

// Adjust all the objects on window resize
$(window).resize(function(){

	FixBodySize();
	Destroy(game);
	Setup(game);
});


function GamePlay(index){
	
	var player = game.player0;
	if (game.right) player = game.player1;

	var nextPlayer = game.player1;
	if (game.right) nextPlayer = game.player0;

	var message = nextPlayer.name + "'s turn";
	if (nextPlayer.spin) message += "<br/>Spin the spinner by clicking 'SPIN'";

	var checkpoints = player.checkpoints;
	var checkpoint = checkpoints[index];
	
	if (checkpoint.selected){
		MovePlayer(player, checkpoint);
		game.right = !game.right;
		setTimeout(function(){
			AddMessage(message);
			UpdateQuestion();
		}, totalAnimationTime);
	}
}

/* Updates the game's current question */
function UpdateQuestion(){
	
	var player = game.player0;
	if (game.right) player = game.player1;

	if (!player.spin){
		var playerQuestions = player0Questions;
		if (game.right) playerQuestions = player1Questions;

		var questionType = startQuestion;
		if (player.visitedCheckpoints.length > 2) questionType = onTrailQuestion;
		if (player.currentCheckpoint != null && player.currentCheckpoint.capture) questionType = captureQuestion;
		if (player.captured) questionType = captureQuestion;

		var qAPair = GetNextQuestion(questionType, game.right);
		AddQuestionText(qAPair.question);
		AddAnswerText(qAPair.answer);
	} else {
		AddQuestionText("");
		AddAnswerText("");
	}
}

/* This function is called when player gives the right answer */
function CorrectAnswerMove(){
	var player = game.player0;
	if (game.right) player = game.player1;

	var nextPlayer = game.player1;
	if (game.right) nextPlayer = game.player0;

	var message = "Correct Answer!<br/>" + nextPlayer.name + "'s turn";
	if (nextPlayer.spin) message += "<br/>Spin the spinner by clicking 'SPIN'"; 

	if (!player.spin){
		if (player.move1){
			MovePlayer(player, player.checkpoints[0]);
			player.move1 = false;
			game.right = !game.right;

			setTimeout(function(){
				AddMessage(message);
				UpdateQuestion();
			}, totalAnimationTime);

		} else if (player.move2){
			MovePlayer(player, player.checkpoints[1]);
			player.move2 = false;
			game.right = !game.right;

			setTimeout(function(){
				AddMessage(message);
				UpdateQuestion();
			}, totalAnimationTime);

		} else {
			
			var paths = GetPossiblePaths(player, player.steps);
			player.possiblePaths = paths;

			if (paths.length == 1){
				var path = paths[0];
				MovePlayer(player, path[path.length - 1]);
				game.right = !game.right;
				
				setTimeout(function(){
					AddMessage(message);
					UpdateQuestion();
				}, totalAnimationTime);

			} else {
				for (var i = 0; i < player.possiblePaths.length; i++){
					SelectCheckpoint (player.possiblePaths[i][player.possiblePaths[i].length - 1]);
				}
				AddMessage("Click on one of the highlighted checkpoints to move player");
			}
		}
	} else AddMessage("Please spin the spinner by clicking the 'SPIN' button");
}

/* This function is called when player gives the right answer */
function WrongAnswerMove(){
	var player = game.player0;
	if (game.right) player = game.player1;

	var nextPlayer = game.player1;
	if (game.right) nextPlayer = game.player0;

	var message = "Wrong Answer!<br/>" + nextPlayer.name + "'s turn";
	if (nextPlayer.spin) message += "<br/>Spin the spinner by clicking 'SPIN'";

	if (!player.move1 && !player.move2){
		player.steps = -1;
		MovePlayer(player, player.visitedCheckpoints[player.visitedCheckpoints.length - 1]);
		game.right = !game.right;
		UpdateQuestion();
		AddMessage(message);
	}
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

/* Adds the question in the question section of the game 
 * Parameter types: (string)
 */
function AddQuestionText(question){
	document.getElementById('questionHeader').style.fontSize = GetMapWidth() * headerFontScale;

	var div = document.getElementById('questionContent');
	div.style.fontSize = GetMapWidth() * textFontScale;
	div.innerHTML = question;
	game.currentQuestion = question;
}

/* Adds the answer in the answer section of the game 
 * Parameter types: (list of string)
 */
function AddAnswerText(answer){
	document.getElementById('answerHeader').style.fontSize = GetMapWidth() * headerFontScale;
	var div = document.getElementById('answerContent');
	div.style.fontSize = GetMapWidth() * textFontScale;

	div.innerHTML = answer;

	if (answer == correctYesHTML || answer == correctNoHTML) ActivateYesNoButtons();

	game.currentAnswer = answer;
}

/* Activates the Yes and No buttons in the answer section for a Yes/No question */
function ActivateYesNoButtons(){

	var buttonWidth = GetPanelHeight() * 0.35
	var buttonHeight = GetPanelHeight() * 0.2;

	var buttonPosition = GetYesButtonPosition();
	var yesButton = document.getElementById("yesButton");
	yesButton.setAttributeNS(null, 'x', buttonPosition.x);
	yesButton.setAttributeNS(null, 'y', buttonPosition.y);
	yesButton.setAttributeNS(null, 'rx', GetPanelHeight() * spinButtonRXScale);
	yesButton.setAttributeNS(null, 'ry', GetPanelHeight() * spinButtonRYScale);
	yesButton.setAttributeNS(null, 'width', buttonWidth);
	yesButton.setAttributeNS(null, 'height', buttonHeight);
	yesButton.setAttributeNS(null, 'fill', mapBackgroundColor);
	
	
	var yesButtonText = document.getElementById("yesButtonText");
	yesButtonText.setAttribute('text-anchor', "middle");
	yesButtonText.setAttribute('x', buttonPosition.x + buttonWidth * spinButtonTextXScale);
	yesButtonText.setAttribute('y', buttonPosition.y + buttonHeight * spinButtonTextYScale);
	yesButtonText.setAttribute('font-family', fontFamily);
	yesButtonText.setAttribute('font-size', buttonHeight * 0.5);
	yesButtonText.setAttribute('font-color', darkBackgroundColor);

	var buttonPosition = GetNoButtonPosition();
	var noButton = document.getElementById("noButton");
	noButton.setAttributeNS(null, 'x', buttonPosition.x);
	noButton.setAttributeNS(null, 'y', buttonPosition.y);
	noButton.setAttributeNS(null, 'rx', GetPanelHeight() * spinButtonRXScale);
	noButton.setAttributeNS(null, 'ry', GetPanelHeight() * spinButtonRYScale);
	noButton.setAttributeNS(null, 'width', buttonWidth);
	noButton.setAttributeNS(null, 'height', buttonHeight);
	noButton.setAttributeNS(null, 'fill', mapBackgroundColor);
	
	
	var noButtonText = document.getElementById("noButtonText");
	noButtonText.setAttribute('text-anchor', "middle");
	noButtonText.setAttribute('x', buttonPosition.x + buttonWidth * spinButtonTextXScale);
	noButtonText.setAttribute('y', buttonPosition.y + buttonHeight * spinButtonTextYScale);
	noButtonText.setAttribute('font-family', fontFamily);
	noButtonText.setAttribute('font-size', buttonHeight * 0.5);
	noButtonText.setAttribute('font-color', darkBackgroundColor);
}

/* Returns the position coordinates of the position of the Yes button
 * Return type: dictionary
 */
function GetYesButtonPosition(){
	return ({'x': GetMapWidth() * 0.15, 'y': GetPanelHeight() * 0.2});
}

/* Returns the position coordinates of the position of the No button
 * Return type: dictionary
 */
function GetNoButtonPosition(){
	return ({'x': GetMapWidth() * 0.4, 'y': GetPanelHeight() * 0.2});
}

/* Fixes the size of every element in the body when window is resized */
function FixBodySize(){

	document.getElementById("body").width = screen.width;
	document.getElementById("body").height = screen.height;

	var borderRadius = (GetMapWidth() * 0.06).toString() + "px";
	document.getElementById("leftMap").style.borderRadius =  borderRadius;
	document.getElementById("rightMap").style.borderRadius =  borderRadius;
	document.getElementById("center").style.borderRadius =  borderRadius;
	document.getElementById("zoo").style.borderRadius = borderRadius;
	document.getElementById("messageBox").style.borderRadius = borderRadius;
	document.getElementById("question").style.borderRadius =  borderRadius;
	document.getElementById("answer").style.borderRadius =  borderRadius;
	document.getElementById("spinner").style.borderRadius =  borderRadius;

	// Minimum Screen width and height to see the full game
	var minScreenWidth = screen.width * minScreenWidthScale;
	var minScreenHeight = screen.height * minScreenHeightScale;
	document.getElementById("body").style.minWidth = minScreenWidth;
	document.getElementById("body").style.minHeight = minScreenHeight;

	document.getElementById("leftMap").style.minHeight = minScreenHeight * mapHeightScale;
	document.getElementById("rightMap").style.minHeight = minScreenHeight * mapHeightScale;
	document.getElementById("center").style.minHeight = minScreenHeight * mapHeightScale;
	document.getElementById("question").style.minHeight = minScreenHeight * panelHeightScale;
	document.getElementById("answer").style.minHeight = minScreenHeight * panelHeightScale;
	document.getElementById("spinner").style.minHeight = minScreenHeight * panelHeightScale * spinnerSectionHeightDeviation;
}

/* Returns the width of the middle section of the board */
function GetMiddleWidth() {
	return document.getElementById("body").width * middleSectionWidthScale;
}

/* Returns the width of a map */
function GetMapWidth() {
	return document.getElementById("body").width * mapWidthScale;
}

/* Returns the height of a map */
function GetMapHeight() {
	return document.getElementById("body").height * mapHeightScale;
}

/* Returns the height of the lower panels */
function GetPanelHeight(){
	return document.getElementById("body").height * panelHeightScale;
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























