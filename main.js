// Minimum Screen width and height to see the full game
var minScreenWidth = screen.width * minScreenWidthScale;
var minScreenHeight = screen.width * 0.5;

// Set the min screen width and height
// document.getElementById("body").style.minWidth = minScreenWidth;
// document.getElementById("body").style.minHeight = minScreenHeight;

document.getElementById("body").width = screen.width;
document.getElementById("body").height = screen.height;



var game = new Game();

FixBodySize(game);
Setup(game);


// Adjust all the objects on window resize
$(window).resize(function(){

	FixBodySize();
	Destroy(game);
	Setup(game);
});

AddQuestionText('<a href="http://www.github.com/roleen">Hello!</a> How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today?');
AddAnswerText('<button type="button">Yes</button> <button type="button">No</button>');

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
function AddQuestionText(question){
	// var div = document.getElementById(GetNextQuestion());
	var div = document.getElementById('questionContent');
	div.innerHTML = question;
}


function YesClick(){
	alert("Yes Clicked");
}

function NoClick(){
	alert("No Clicked");
}

/* Adds the answer in the answer section of the game 
 * Parameter types: (string)
 */
function AddAnswerText(answer){
	var div = document.getElementById('answerContent');
	div.innerHTML = yesNoButtonHTML;
	ActivateYesNoButtons();
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




var prevWidth = screen.width;
function FixBodySize(game){
	//alert("prev: " + prevWidth + ", current: " + screen.width);
	prevWidth = screen.width;
	//alert('called');

	document.getElementById("body").width = screen.width;
	document.getElementById("body").height = screen.height;


	//game.leftMap.attr({width: 10000});
	//document.getElementById("leftMap").width = GetMapWidth();

	//document.getElementById("middleSection").width = GetMiddleWidth();
	/*
	if (window.innerHeight < minScreenHeight){
		alert('H < MH');
		document.getElementById("body").style.overflowY = "auto";
	} else{
		document.getElementById("body").style.overflowY = "hidden";
	}

	if (window.innerWidth < minScreenWidth){
		alert('W < MW');
		document.getElementById("body").style.overflowX = "auto";
	} else{
		document.getElementById("body").style.overflowX = "hidden";
	}
	*/
}

/* Returns the width of the middle section of the board */
function GetMiddleWidth() {
	return document.getElementById("body").width * middleSectionWidthScale;
	//return Math.max(minScreenWidth, screen.width) * middleSectionWidthScale;
}

/* Returns the width of a map */
function GetMapWidth() {
	return document.getElementById("body").width * mapWidthScale;
	//return Math.max(minScreenWidth, screen.width) * mapWidthScale;
}

/* Returns the height of a map */
function GetMapHeight() {
	return document.getElementById("body").height * mapHeightScale;
	//return Math.max(minScreenHeight, screen.height) * mapHeightScale;
}

/* Returns the height of the lower panels */
function GetPanelHeight(){
	return document.getElementById("body").height * panelHeightScale;
	//return Math.max(minScreenHeight, screen.height) * panelHeightScale;
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























