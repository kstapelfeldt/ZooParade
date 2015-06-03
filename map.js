/* Initialzer for a Map object
 * Parameter types : (string, list of Animal, list of Checkpoint)
 */
function Map(name, animals, checkpoints){
	this.name = name;
	this.animals = animals;
	this.checkpoints = checkpoints;
	this.player = null;
}


/* Get all possible moves steps 'steps' away from checkpoint and 
 * returns an array of checkpoints
 * Parameter types : (Map)
 */
function GetPossibleMoves(map){
	// To be implemented
}


/* Assigns player to map
 * Parameter types : (Map, Player)
 */
function AssignPlayer(map, player){
	map.player = player;
}