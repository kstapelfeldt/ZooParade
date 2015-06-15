/* Player Class */

/* Initializer for Player object
 * Parameter types : (string, Map)
 */
function Player(name, continent){
	this.name = name;
	this.continent = continent;
	this.currentCheckpoint = null;
	this.visitedCheckpoints = new Array();
	this.animalsCaptured = new Array();
	this.placeHolder = null;
}


/* Returns the next checkpoint for AI 
 * Parameter types : (Player)
 * Return type : Checkpoint
 */
function GetNextCheckpoint(player, steps){
	var moves = GetPossibleMoves(player.continent);
	return moves[Math.floor(Math.random() * moves.length)];
}

/* Get all possible moves steps 'steps' away from checkpoint and 
 * returns an array of arrays in which the first element is the
 * array of possible moves and the second element is an array of
 * previous moves for the elements in the first array
 * Parameter types : (Player, int)
 * Return type : list of list of Checkpoint
 */
function GetPossibleMoves(player, steps){
	var possibleMoves = new Array();
	var prevMoves = new Array();

	var pCp = Remove(player.currentCheckpoint.nextCheckpoints, player.visitedCheckpoints[player.visitedCheckpoints.length - 1]);

	for (var i = 0; i < player.currentCheckpoint.nextCheckpoints.length; i++){
		var previousCheckpoint = Remove(player.currentCheckpoint.nextCheckpoints[i].nextCheckpoints, player.currentCheckpoint);
		PopulatePossibleMoves(player.currentCheckpoint.nextCheckpoints[i], previousCheckpoint,
								steps - 1, possibleMoves, prevMoves);
		player.currentCheckpoint.nextCheckpoints[i].nextCheckpoints.push(previousCheckpoint);
	}

	player.currentCheckpoint.nextCheckpoints.push(pCp);
	return [possibleMoves, prevMoves];
}

/* Populates the given list possibleMoves with the checkpoints
 * in steps number of steps recursively and poplulates the list
 * previousMoves with correspoinding previous moves
 * Parameter types : (Checkpoint, Checkpoint, int, list of Checkpoint, list of Checkpoint)
 */
function PopulatePossibleMoves(checkpoint, prevCheckpoint, steps, possibleMoves, previousMoves){
	if (steps == 0){
		possibleMoves.push(checkpoint);
		previousMoves.push(prevCheckpoint);
	} else{
		for(var j = 0; j < checkpoint.nextCheckpoints.length; j++){
			var prev = Remove(checkpoint.nextCheckpoints[j].nextCheckpoints, checkpoint);
			PopulatePossibleMoves(checkpoint.nextCheckpoints[j], checkpoint, steps - 1, possibleMoves, previousMoves);
			checkpoint.nextCheckpoints[j].nextCheckpoints.push(checkpoint);
		}
	}
}

/* Add the checkpoint to the visited checkpoints of the player 
 * Parameter types : (Player, Checkpoint)
 */
function AddVisitedCheckpoint(player, checkpoint){
	player.visitedCheckpoints.push(checkpoint);
}

/* Add the animal to the list of animals captured of the player
 * Parameter types : (Player, Animal)
 */
function AddAnimalsCaptured(player, animal){
	player.animalsCaptured.push(animal);
}

/* Adds placeholders for both the players */
function AddPlayerPlaceHolders(){
	player0.placeHolder = leftMap.image('Resources/Player0.png', GetMapWidth() * mapScale * playerPlaceHolderScale, 
							GetMapHeight() * mapScale * playerPlaceHolderScale);
	player0.placeHolder.cx(leftCheckpoints[0].x + GetMapWidth() * playerPlaceHolderXScale);
	player0.placeHolder.cy(leftCheckpoints[0].y + GetMapHeight() * playerPlaceHolderYScale);
	svgObjects.push(player0.placeHolder);

	player1.placeHolder = rightMap.image('Resources/Player1.png', GetMapWidth() * mapScale * playerPlaceHolderScale, 
							GetMapHeight() * mapScale * playerPlaceHolderScale);
	player1.placeHolder.cx(rightCheckpoints[0].x - GetMapWidth() * playerPlaceHolderXScale);
	player1.placeHolder.cy(rightCheckpoints[0].y + GetMapHeight() * playerPlaceHolderYScale);
	svgObjects.push(player1.placeHolder);
}



function MovePlayer(player, checkpoint){
	player.currentCheckpoint = checkpoint;
	checkpoint.circle.attr({fill: "grey"});
	player.placeHolder.animate(500).move(checkpoint.x - GetMapWidth() * 0.035, checkpoint.y - GetMapHeight() * 0.045);
}

















