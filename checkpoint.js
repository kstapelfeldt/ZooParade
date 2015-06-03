/* Checkpoint class */

/* Initializer for Checkpoint object
 * Parameter types : (float, float, bool, bool, bool, bool)
 */
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


/* Sets the next Checkpoints of the checkpoint to the array nextCheckpoints 
 * Parameter types : (Checkpoint, list of Checkpoint)
 */
function SetNextCheckpoints(checkpoint, nextCheckpoints){
	checkpoint.nextCheckpoints = nextCheckpoints;
}