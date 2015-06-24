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

function GamePlay(index){
	
	var player = game.player0;
	if (game.right) player = game.player1;

	var checkpoints = player.checkpoints;
	var checkpoint = checkpoints[index];
	
	if (player.move1) {
		DeselectCheckpoint(player.checkpoints[0]);
		MovePlayer(player, player.checkpoints[0]);
		player.move1 = false;
		game.right = !game.right;
	} else if (player.move2) {
		DeselectCheckpoint(player.checkpoints[1]);
		MovePlayer(player, player.checkpoints[1]);
		player.move2 = false;
		game.right = !game.right;
	} else if (!player.spin){
		if (checkpoint == player.currentCheckpoint){
			player.possiblePaths = GetPossiblePaths(player, player.steps);
			for (var i = 0; i < player.possiblePaths.length; i++){
				SelectCheckpoint (player.possiblePaths[i][player.possiblePaths[i].length - 1]);
			}
		} else if (checkpoint.selected){
			MakeMove(player, index);
			game.right = !game.right;
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

/* Adds the answer in the answer section of the game 
 * Parameter types: (string)
 */
function AddAnswerText(answer){
	// var div = document.getElementById(GetAnswerText());
	var div = document.getElementById('answerContent');
	div.innerHTML = answer;
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























