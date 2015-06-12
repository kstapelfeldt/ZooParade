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
function GetNextCheckpoint(player){
	var moves = GetPossibleMoves(player.continent);
	return moves[Math.floor(Math.random() * moves.length)];
}


/* Add the checkpoint to the visited checkpoints of the player 
 * Parameter types : (Player, Checkpoint)
 */
function AddVisitedCheckpoint(player, checkpoint){
	player.visitedCheckpoints.push(checkpoint);
}


/* Change the current checkpoint of the player
 * Parameter types : (Player, Checkpoint)
 */
function ChangeCurrentCheckpoint(player, checkpoint){
	player.currentCheckpoint = checkpoint;
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
	// To be implemented
}

















