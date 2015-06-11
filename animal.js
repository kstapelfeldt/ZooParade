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
 * Parameter types: (list of Animal, boolean)
 */
function PositionAnimals(animals, right){
	
	PositionAnimal(animals[0], animal0Checkpoints[0], a0C0XDeviation, a0C0YDeviation, right);
	PositionAnimal(animals[0], animal0Checkpoints[1], a0C1XDeviation, a0C1YDeviation, right);

	PositionAnimal(animals[1], animal1Checkpoints[0], a1C0XDeviation, a1C0YDeviation, right);
	PositionAnimal(animals[1], animal1Checkpoints[1], a1C1XDeviation, a1C1YDeviation, right);

	PositionAnimal(animals[2], animal2Checkpoints[0], a2C1XDeviation, a2C1YDeviation, right);
	PositionAnimal(animals[2], animal2Checkpoints[1], a2C1XDeviation, a2C1YDeviation, right);
}


/* Position a single animal at the checkpoint at checkpointIndex and apply 
 * the x and y deviations 
 * Parameter types: (Animal, int, float, float, boolean)
 */
function PositionAnimal(animal, checkpointIndex, xDeviation, yDeviation, right) {
	
	var image;
	if (right){
		image = rightPath.image(animal.svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(rightCheckpoints[checkpointIndex].x - GetMapWidth() * xDeviation);
		image.cy(rightCheckpoints[checkpointIndex].y + GetMapHeight() * yDeviation);
	} else {
		image = leftPath.image(animal.svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(leftCheckpoints[checkpointIndex].x + GetMapWidth() * xDeviation);
		image.cy(leftCheckpoints[checkpointIndex].y + GetMapHeight() * yDeviation);
	}
	svgObjects.push(image);
}

/* Adds Animal pictures at the edges of the board 
 * Parameter types: (list of Animal, boolean)
 */
function AddAnimalImages(animals, right){
	var imgWidth = GetMapWidth() * mapScale * 3;
	var imgHeight = GetMapHeight() * mapScale * 2.25;

	var imgYposition = GetMapHeight() * mapScale * 3.5;

	if (right) {
		var image = rightPath.image(animals[0].pngPath, imgWidth, imgHeight);
		image.cx(GetMapWidth() - imgWidth / 2);
		image.cy(imgYposition);
		imgYposition += imgHeight;
		svgObjects.push(image);

		var image = rightPath.image(animals[1].pngPath, imgWidth, imgHeight);
		image.cx(GetMapWidth() - imgWidth / 2);
		image.cy(imgYposition);
		imgYposition += imgHeight;
		svgObjects.push(image);

		var image = rightPath.image(animals[2].pngPath, imgWidth, imgHeight);
		image.cx(GetMapWidth() - imgWidth / 2);
		image.cy(imgYposition);
		svgObjects.push(image);
	} else {
		var image = leftPath.image(animals[0].pngPath, imgWidth, imgHeight);
		image.cy(imgYposition);
		imgYposition += imgHeight;
		svgObjects.push(image);

		var image = leftPath.image(animals[1].pngPath, imgWidth, imgHeight);
		image.cy(imgYposition);
		imgYposition += imgHeight;
		svgObjects.push(image);

		var image = leftPath.image(animals[2].pngPath, imgWidth, imgHeight);
		image.cy(imgYposition);
		svgObjects.push(image);
	}
}