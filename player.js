/* Player Class */

/* Initializer for Player object
 * Parameter types : (string, Map)
 */
function Player(name, map){
	this.name = name;
	this.map = map;
	this.currentCheckpoint = null;
	this.visitedCheckpoints = new Array();
	this.animalsCaptured = new Array();
}


/* Returns the next checkpoint for AI 
 * Parameter types : (Player)
 * Return type : Checkpoint
 */
function GetNextCheckpoint(player){
	var moves = GetPossibleMoves(player.map);
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