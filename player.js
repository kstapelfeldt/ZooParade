/* Player Class */

/* Initializer for Player object
 * Parameter types : (string, Continent)
 */
function Player(name, continent, checkpoints){
	this.name = name;
	this.continent = continent;
	this.currentCheckpoint = null;
	this.visitedCheckpoints = new Array();
	this.animalsCaptured = new Array();
	this.placeHolder = null;
	this.spin = false;
	this.steps = 1;
	this.checkpoints = continent.checkpoints;
	this.possiblePaths = null;
}


/* Returns the next checkpoint for AI 
 * Parameter types : (Player)
 * Return type : Checkpoint
 */
function GetNextCheckpoint(player, steps){
	var moves = GetPossibleMoves(player.continent);
	return moves[Math.floor(Math.random() * moves.length)];
}


/* Gets all possible paths that the player can take in steps number of steps
 * Parameter type: (Player, int)
 * Return type: list of list of Checkpoint
 */
function GetPossiblePaths(player, steps){
	
	var prev = Remove(player.currentCheckpoint.nextCheckpoints, player.visitedCheckpoints[player.visitedCheckpoints.length - 1]);
	var allPaths = GetPaths([[player.currentCheckpoint]], steps);
	player.currentCheckpoint.nextCheckpoints.push(prev);
	return allPaths;
}


/* Recursively finds all possible paths from the given path list 
 * steps steps away
 * Parameter type: (list of list of Checkpoint, int)
 * Return type: list of list
 */
function GetPaths(pathList, steps){

	if (steps == 0){
		return pathList;
	}
	var newPathList = new Array();

	for (var i = 0; i < pathList.length; i++){
		var lastCp = pathList[i][pathList[i].length - 1];
		var previousCp = null;

		if (pathList[i].length > 1){
			previousCp = Remove(lastCp.nextCheckpoints, pathList[i][pathList[i].length - 2]);
		}

		for (var j = 0; j < lastCp.nextCheckpoints.length; j++){
			var path = pathList[i].slice();
			path.push(lastCp.nextCheckpoints[j]);
			newPathList.push(path);
		}

		if (previousCp != null){
			lastCp.nextCheckpoints.push(previousCp);
		}
	}
	return GetPaths(newPathList, steps - 1);
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

	player0.placeHolder.click(function(){
		if (!right){
			GamePlay(player0.currentCheckpoint.index);
		}
	});

	svgObjects.push(player0.placeHolder);


	player1.placeHolder = rightMap.image('Resources/Player1.png', GetMapWidth() * mapScale * playerPlaceHolderScale, 
							GetMapHeight() * mapScale * playerPlaceHolderScale);
	player1.placeHolder.cx(rightCheckpoints[0].x - GetMapWidth() * playerPlaceHolderXScale);
	player1.placeHolder.cy(rightCheckpoints[0].y + GetMapHeight() * playerPlaceHolderYScale);

	player1.placeHolder.click(function(){
		if (right){
			GamePlay(player1.currentCheckpoint.index);
		}
	});
	svgObjects.push(player1.placeHolder);
}

/* Moves the player to the given checkpoint
 * Parameter types: (Player, Checkpoint)
 */
function MovePlayer(player, checkpoint){

	player.currentCheckpoint = checkpoint;
	player.steps = 1;
	player.spin = (checkpoint.redS || checkpoint.greenS);

	
	var xDeviation = GetMapWidth() * playerPlaceholderXDeviation;
	var yDeviation = GetMapHeight() * playerPlaceholderYDeviation;

	if (player.visitedCheckpoints.length > 0){
		var path;
		for (var i = 0; i < player.possiblePaths.length; i++){
			if (player.possiblePaths[i][player.possiblePaths[i].length - 1] == checkpoint) path = player.possiblePaths[i];
		}
		
		var totalDistance = 0;
		var distances = new Array();
		for (var i = 0; i < path.length - 1; i++){
			var distance = Math.pow(Math.pow(path[i].x - path[i+1].x, 2) + Math.pow(path[i].y - path[i+1].y, 2), 0.5);
			totalDistance += distance;
			distances.push(distance);
		}
		
		var totalAnimationTime = totalDistance / GetMapWidth() * playerMoveSpeed;
		var i = 0;
		var animationTime = (distances[i] / totalDistance) * totalAnimationTime;

		player.placeHolder.animate(animationTime).move(path[i+1].x + xDeviation, path[i+1].y + yDeviation);
		i = 1;

		function animationLoop () {
			animationTime = (distances[i - 1] / totalDistance) * totalAnimationTime;
			setTimeout(function () {
				if (i < path.length - 1) {
					player.placeHolder.animate(animationTime).move(path[i+1].x + xDeviation, path[i+1].y + yDeviation);
					i++;
					animationLoop();
				}
			}, animationTime);
		}
		animationLoop();
	} else {
		player.placeHolder.animate(500).move(checkpoint.x + xDeviation, checkpoint.y + yDeviation);
	}
}

















