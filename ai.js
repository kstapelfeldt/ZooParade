/* The game player AI for single player game */

var ai = false;

function AIMove(){
	var player = game.player1;

	if (player.move1 || player.move2 || player.move3 || !player.currentCheckpoint.redS || !player.currentCheckpoint.greenS){
		var rand = Math.floor(Math.random() * 7);
		if (rand <= 5){
			// Correct Answer Move
			CorrectAnswerMove();
			if (player.possiblePaths != null && player.possiblePaths.length > 1){
				// Choose a path
			}
		} else {
			// Wrong Answer Move
			WrongAnswerMove();
		}
	} else if (player.currentCheckpoint.redS || player.currentCheckpoint.greenS){
		// Spin the spinner
		Spin();

		// Wait for the spinner to stop spinning

		// Choose a path

		// Move the player along the chosen path
	}
}