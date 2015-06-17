/* Animal Class */

/* Initializer for Animal Object 
 * Parameter types : (string, string, string)
 */
function Animal(name, continent, shortName){
	this.name = name;
	this.continent = continent;
	this.svgPath = 'Resources/SVG/' + shortName + '.svg';
	this.pngPath = 'Resources/PNG/' + shortName + '.png';
	this.zoopngPath = 'Resources/ZooPNG/' + shortName + '.png';
}

/* Positions animal svgs at the right position for the animals
 * Parameter types: (list of Animal, SVG, list of Checkpoint, boolean)
 */
function PositionAnimals(animals, path, checkpointsList, right){
	
	PositionAnimal(animals[0], path, checkpointsList, animal0Checkpoints[0], a0C0XDeviation, a0C0YDeviation, right);
	PositionAnimal(animals[0], path, checkpointsList, animal0Checkpoints[1], a0C1XDeviation, a0C1YDeviation, right);

	PositionAnimal(animals[1], path, checkpointsList, animal1Checkpoints[0], a1C0XDeviation, a1C0YDeviation, right);
	PositionAnimal(animals[1], path, checkpointsList, animal1Checkpoints[1], a1C1XDeviation, a1C1YDeviation, right);

	PositionAnimal(animals[2], path, checkpointsList, animal2Checkpoints[0], a2C1XDeviation, a2C1YDeviation, right);
	PositionAnimal(animals[2], path, checkpointsList, animal2Checkpoints[1], a2C1XDeviation, a2C1YDeviation, right);
}


/* Position a single animal at the checkpoint at checkpointIndex and apply 
 * the x and y deviations 
 * Parameter types: (Animal, SVG, list of Checkpoint, int, float, float, boolean)
 */
function PositionAnimal(animal, path, checkpointsList, checkpointIndex, xDeviation, yDeviation, right) {
	
	var sign = 1;
	if (right) sign = -1;

	var image = path.image(animal.svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
	image.cx(checkpointsList[checkpointIndex].x + GetMapWidth() * xDeviation * sign);
	image.cy(checkpointsList[checkpointIndex].y + GetMapHeight() * yDeviation);
	svgObjects.push(image);
}

/* Adds Animal pictures at the edges of the board 
 * Parameter types: (list of Animal, SVG, boolean)
 */
function AddAnimalImages(animals, path, right){
	var imgWidth = GetMapWidth() * mapScale * 3;
	var imgHeight = GetMapHeight() * mapScale * 2.25;

	var imgYposition = GetMapHeight() * mapScale * 3.5;

	var x = imgWidth / 2;
	if (right) x = GetMapWidth() - x;

	var image = path.image(animals[0].pngPath, imgWidth, imgHeight);
	image.cx(x);
	image.cy(imgYposition);
	imgYposition += imgHeight;
	svgObjects.push(image);

	var image = path.image(animals[1].pngPath, imgWidth, imgHeight);
	image.cx(x);
	image.cy(imgYposition);
	imgYposition += imgHeight;
	svgObjects.push(image);

	var image = path.image(animals[2].pngPath, imgWidth, imgHeight);
	image.cx(x);
	image.cy(imgYposition);
	svgObjects.push(image);
}