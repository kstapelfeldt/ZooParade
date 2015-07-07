/* Animal Class */

/* Initializer for Animal Object 
 * Parameter types : (string, string, string)
 */
function Animal(name, continent, shortName){
	this.name = name;
	this.continent = continent;
	this.svg = {};
	this.image = null;
	this.csvPath = 'Resources/CSV/' + shortName + '.csv';
	this.svgPath = 'Resources/SVG/' + shortName + '.svg';
	this.leftImgPath = 'Resources/Images/' + shortName + 'Left.svg';
	this.rightImgPath = 'Resources/Images/' + shortName + 'Right.svg';
	this.zoopngPath = 'Resources/ZooPNG/' + shortName + '.png';
}


function Flee(animal, animalCheckpoint){
	
	var animalIndex = game.svgObjects.indexOf(animal.svg[animalCheckpoint.index]);
	game.svgObjects[animalIndex].parent.removeElement(game.svgObjects[animalIndex]);
	game.svgObjects.splice(animalIndex, 1);

	delete animal.svg[animalCheckpoint.index];
}


/* Positions animal svgs at the right position for the animals
 * Parameter types: (Game, list of Animal, boolean)
 */
function PositionAnimals(game, animals, right){

	var path = game.leftPath;
	if (right) path = game.rightPath;

	var checkpointsList = game.leftCheckpoints;
	if (right) checkpointsList = game.rightCheckpoints;

	var capturePoints = game.leftCapturePoints;
	if (right) capturePoints = game.rightCapturePoints;
	
	if (capturePoints[animal0Checkpoints[0]])
	PositionAnimal(game, animals[0], path, checkpointsList, animal0Checkpoints[0], a0C0XDeviation, a0C0YDeviation, right);
	if (capturePoints[animal0Checkpoints[1]])
	PositionAnimal(game, animals[0], path, checkpointsList, animal0Checkpoints[1], a0C1XDeviation, a0C1YDeviation, right);
	
	if (capturePoints[animal1Checkpoints[0]])
	PositionAnimal(game, animals[1], path, checkpointsList, animal1Checkpoints[0], a1C0XDeviation, a1C0YDeviation, right);
	if (capturePoints[animal1Checkpoints[1]])
	PositionAnimal(game, animals[1], path, checkpointsList, animal1Checkpoints[1], a1C1XDeviation, a1C1YDeviation, right);
	
	if (capturePoints[animal2Checkpoints[0]])
	PositionAnimal(game, animals[2], path, checkpointsList, animal2Checkpoints[0], a2C1XDeviation, a2C1YDeviation, right);
	if (capturePoints[animal2Checkpoints[1]])
	PositionAnimal(game, animals[2], path, checkpointsList, animal2Checkpoints[1], a2C1XDeviation, a2C1YDeviation, right);
}


/* Position a single animal at the checkpoint at checkpointIndex and apply 
 * the x and y deviations 
 * Parameter types: (Game, Animal, SVG, list of Checkpoint, int, float, float, boolean)
 */
function PositionAnimal(game, animal, path, checkpointsList, checkpointIndex, xDeviation, yDeviation, right) {
	
	var sign = 1;
	if (right) sign = -1;

	var image = path.image(animal.svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
	image.cx(checkpointsList[checkpointIndex].x + GetMapWidth() * xDeviation * sign);
	image.cy(checkpointsList[checkpointIndex].y + GetMapHeight() * yDeviation);
	game.svgObjects.push(image);

	animal.svg[checkpointIndex] = image;
	checkpointsList[checkpointIndex].animal = animal;
}

/* Adds Animal pictures at the edges of the board 
 * Parameter types: (Game, list of Animal, boolean)
 */
function AddAnimalImages(game, animals, right){

	var path = game.leftPath;
	if(right) path = game.rightPath;

	var imgWidth = GetMapWidth() * mapScale * 3;
	var imgHeight = GetMapHeight() * mapScale * 2;

	var imgYposition = GetMapHeight() * mapScale * 3;

	var x = imgWidth / 2;
	if (right) x = GetMapWidth() - x;

	var id = "L";
	if (right) id = "R";


	var imgPath = animals[0].leftImgPath;
	if(right) imgPath = animals[0].rightImgPath;
	var image = path.image(imgPath, imgWidth, imgHeight);
	image.cx(x);
	image.cy(imgYposition);
	imgYposition += imgHeight;
	game.svgObjects.push(image);
	animals[0].image = image;

	SetAnimalImagesOnClick(animals[0]);

	var imgPath = animals[1].leftImgPath;
	if(right) imgPath = animals[1].rightImgPath;
	var image = path.image(imgPath, imgWidth, imgHeight);
	image.cx(x);
	image.cy(imgYposition);
	imgYposition += imgHeight;
	game.svgObjects.push(image);
	animals[1].image = image;

	SetAnimalImagesOnClick(animals[1]);

	var imgPath = animals[2].leftImgPath;
	if(right) imgPath = animals[2].rightImgPath;
	var image = path.image(imgPath, imgWidth, imgHeight);
	image.cx(x);
	image.cy(imgYposition);
	game.svgObjects.push(image);
	animals[2].image = image;

	SetAnimalImagesOnClick(animals[2]);
	
}

/* Sets the onClick method for animal images */
function SetAnimalImagesOnClick(animal){
	animal.image.click(function(){
		var player = game.player0;
		if (game.right) player = game.player1;

		if (animal.continent.checkpoints[0].right == game.right) {
			if (player.currentAnimal == null || player.capturedAnimals.indexOf(animal) == -1) {
				player.currentAnimal = animal;
				AnimalSelected(player, animal);
			}
		}
	});
}































