/* Player Class */

function Player(name, map){
	this.name = name;
	this.map = map;
	this.currentCheckpoint = null;
	this.visitedCheckpoints = null;
	this.animalsCaptured = null;
}


function AddVisitedCheckpoint(player, checkpoint){
	if (player.visitedCheckpoints == null){
		player.visitedCheckpoints = new Array();
	}
	/*
	player.visitedCheckpoints[0] = checkpoint;
	document.write(player.visitedCheckpoints.length);
	player.visitedCheckpoints.length += 1;
	document.write(player.visitedCheckpoints[0].x);
	*/
}