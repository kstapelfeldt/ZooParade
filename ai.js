/* The game player AI for single player game */

var ai = true;

function AIMove(){
	totalAnimationTime = 1000;

	setTimeout(function(){
		totalAnimationTime = 0;

		var player = game.player1;

		if (player.currentAnimal == null){
			// Choose an animal to capture
			AnimalImageClickFunction(player.continent.animals[Math.floor(Math.random() * player.continent.animals.length)]);
		} else if (player.move1 || player.move2 || player.move3 || (!player.currentCheckpoint.redS && !player.currentCheckpoint.greenS)){
			var rand = Math.floor(Math.random() * 7);
			rand = 1;

			if (rand <= 5){
				// Correct Answer Move
				CorrectAnswerMove();

				setTimeout(function(){
					if (player.possiblePaths != null && player.possiblePaths.length > 1){
						// Choose a path
						AIChoosePath();
					}
				}, totalAnimationTime);
					
			} else {
				// Wrong Answer Move
				WrongAnswerMove();
			}
		} else if (player.currentCheckpoint.redS || player.currentCheckpoint.greenS){

			// Spin the spinner
			totalAnimationTime = spinnerSectionAnimationTime * 1.2;
			setTimeout(function(){
				totalAnimationTime = 0;
				Spin();
				// Wait for the spinner to stop spinning
				totalAnimationTime = spinnerAnimationTime + 1000;
				setTimeout(function(){
					totalAnimationTime = 0;
					AIChoosePath();
				}, totalAnimationTime);

			}, totalAnimationTime);
		}
	}, totalAnimationTime);		
}

function AIChoosePath(){

	var player = game.player1;
	var paths = player.possiblePaths;
	var path;
	var checkpoint;

	if (paths.length == 1){
		checkpoint = paths[paths.length - 1];
	} else {
		for (var i = 0; i < paths.length; i++){
			var cp = paths[i][paths[i].length - 1];
			if (cp.capture && (cp.animal == player.currentAnimal)){
				path = paths[i];
				break;
			} 
			if (cp.hazard) Remove(paths, paths[i]);
			else {
				// Remove the path if player passes by the target animal
				for (var j = 0; j < paths[i].length - 1; j++){
					if (paths[i][j].animal == player.currentAnimal){
						Remove(paths, paths[i]);
						break;
					}
				}
			}
		}

		if (path == null) path = paths[0];
		checkpoint = path[path.length - 1];
	}
	
	MovePlayer(player, checkpoint);

	setTimeout(function(){
		totalAnimationTime = 0;
		Proceed();
	}, totalAnimationTime);
}

























