// Minimum Screen width and height to see the full game
var minScreenWidth = screen.width * minScreenWidthScale;
var minScreenHeight = screen.height * minScreenHeightScale;

// Set the min screen width and height
document.getElementById("body").style.minWidth = minScreenWidth;
document.getElementById("body").style.minHeight = minScreenHeight;


var game = new Game();
Setup(game);


// Adjust all the objects on window resize
$(window).resize(function(){
	Destroy(game);
	Setup(game);
});

ReadFile("Dog");
currentQuestion = GetNextQuestion(1);
AddQuestionText();
AddAnswerText();

function GamePlay(index){
	
	var player = game.player0;
	if (game.right) player = game.player1;

	var checkpoints = player.checkpoints;
	var checkpoint = checkpoints[index];
	
	if (player.move1 && index == 0 && player.clicked) {
		DeselectCheckpoint(player.checkpoints[0]);
		MovePlayer(player, player.checkpoints[0]);
		player.move1 = false;
		game.right = !game.right;
		player.clicked = false;
	} else if (player.move2 && index == 1 && player.clicked) {
		DeselectCheckpoint(player.checkpoints[1]);
		MovePlayer(player, player.checkpoints[1]);
		player.move2 = false;
		game.right = !game.right;
		player.clicked = false;
	} else if (!player.spin){
		if (checkpoint == player.currentCheckpoint){
			player.possiblePaths = GetPossiblePaths(player, player.steps);
			for (var i = 0; i < player.possiblePaths.length; i++){
				SelectCheckpoint (player.possiblePaths[i][player.possiblePaths[i].length - 1]);
			}
		} else if (checkpoint.selected && player.clicked){
			MakeMove(player, index);
			game.right = !game.right;
			player.clicked = false;
		}
	} else {
		alert("Please spin the spinner by clicking the 'Spin' button");
	}	
}

function MakeMove(player, index){
	
	var prevCp = null;
	if ((player.currentCheckpoint == null) && (index == 0)){
		index = index++;
		DeselectCheckpoint(player.checkpoints[index]);
	} else {
		prevCp = player.currentCheckpoint;
		var nextCheckpoint = player.checkpoints[index];
		var pathIndex;

		for (var i = 0; i < player.possiblePaths.length; i++){
			var lastCp = player.possiblePaths[i][player.possiblePaths[i].length - 1];
			if (lastCp == nextCheckpoint) pathIndex = i;
			DeselectCheckpoint(lastCp);
		}
	}
	MovePlayer(player, player.checkpoints[index]);
}


/* Adds the question in the question section of the game 
 * Parameter types: (string)
 */
function AddQuestionText(){
	var div = document.getElementById('questionContent');
	div.innerHTML = currentQuestion[2];
}

function YesClick(){
	alert(currentQuestion);
	if(currentQuestion[4] == "TRUE"){
		alert("Congratulations, you are correct!");
	}else{
		alert("Sorry, that's incorrect. Please try again!");
	}
	alert("hi");
}

function NoClick(){
	if(currentQuestion[4] == "FALSE"){
		alert("Congratulations, you are correct!");
	}else{
		alert("Sorry, that's incorrect. Please try again!");
	}
}

/* Adds the answer in the answer section of the game 
 * 
 */
function AddAnswerText(){
	var div = document.getElementById('answerContent');
	div.innerHTML = yesNoButtonHTML;

	if(currentQuestion[0] == "TRUE"){
		ActivateYesNoButtons();
	}
}


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

/* Returns the position coordinates of the position of the spin button
 * Return type: dictionary
 */
function GetYesButtonPosition(){
	return ({'x': GetMapWidth() * 0.25, 'y': GetPanelHeight() * 0.2});
}

function GetNoButtonPosition(){
	return ({'x': GetMapWidth() * 0.5, 'y': GetPanelHeight() * 0.2});
}

/* Returns the width of the middle section of the board */
function GetMiddleWidth() {
	return Math.max(minScreenWidth, window.innerWidth) * middleSectionWidthScale;
}

/* Returns the width of a map */
function GetMapWidth() {
	return Math.max(minScreenWidth, window.innerWidth) * mapWidthScale;
}

/* Returns the height of a map */
function GetMapHeight() {
	return Math.max(minScreenHeight, window.innerHeight) * mapHeightScale;
}

/* Returns the height of the lower panels */
function GetPanelHeight(){
	return Math.max(minScreenHeight, window.innerHeight) * panelHeightScale;
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























