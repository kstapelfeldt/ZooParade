/* Initialzer for a Continent object
 * Parameter types : (string, list of Animal, list of Checkpoint)
 */
function Continent(name, animals, checkpoints){
	this.name = name;
	this.animals = animals;
	this.checkpoints = checkpoints;
	this.player = null;
}


/* Get all possible moves steps 'steps' away from checkpoint and 
 * returns an array of checkpoints
 * Parameter types : (Map)
 */
function GetPossibleMoves(continent){
	// To be implemented
}


/* Assigns player to map
 * Parameter types : (Map, Player)
 */
function AssignPlayer(continent, player){
	map.player = player;
}