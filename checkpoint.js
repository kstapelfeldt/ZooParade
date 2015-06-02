/* Checkpoint class */

function Checkpoint(x, y, capture, greenS, redS, hazard){
	this.x = x;
	this.y = y;
	this.capture = capture;
	this.greenS = greenS;
	this.redS = redS;
	this.hazard = hazard;
	this.visited = false;
	this.nextCheckpoints = null;
}


/* Returns the next checkpoint for AI */
function GetNextCheckpoint(checkpoint){
	// To be implemented
}


/* Get all possible moves steps steps away from checkpoint and returns
 * an array of checkpoints
 */
function GetPossibleMoves(checkpoint, steps){
	// To be implemented
}


/* Sets the next Checkpoints of the checkpoint to the array nextCheckpoints */
function SetNextCheckpoints(checkpoint, nextCheckpoints){
	checkpoint.nextCheckpoints = nextCheckpoints;
}