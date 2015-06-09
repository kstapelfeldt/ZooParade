// SVG objects for Left map
var leftMap = SVG('leftMap');
var leftPath = leftMap.nested();
var leftCheckpoints = new Array();

// SVG objects for Right map
var rightMap = SVG('rightMap');
var rightPath = rightMap.nested();
var rightCheckpoints = new Array();

var svgObjects = new Array();		// Array of all svg objects in the game

var middleSection = SVG('center');	// SVG object for the middle section of the board

var spinnerSection = SVG('spinner');

// Set the min screen width and height
document.getElementById("body").style.minWidth = screen.width * minScreenWidth;
document.getElementById("body").style.minHeight = screen.height * minScreenHeight;

Setup();

$(window).resize(function(){
	Destroy();
    Setup();
});

/* Sets up the game graphics */
function Setup(){

	//alert("setup");
	// Creates Left Map
	CreateMapCheckpoints(positions, capturePoints, greenSPoints, redSPoints, hazardPoints, leftMap, false);
	LinkCheckpoints(pathEdges, leftPath, false);

	// Creates Right Map
	CreateMapCheckpoints(positions, capturePoints, greenSPoints, redSPoints, hazardPoints, rightMap, true);
	LinkCheckpoints(pathEdges, rightPath, true);

	// Set continent names and continent animals
	var continent0Name = 'North America';
	var continent0Animals = [new Animal('Moose', continent1Name, 'Moose'), 
							new Animal('Grizzly Bear', continent1Name, 'Grizzly'), 
							new Animal('Big Horn', continent1Name, 'Bighorn')];

	var continent1Name = 'Asia';
	var continent1Animals = [new Animal('Indian Rhinoceros', continent1Name, 'Rhinoceros'), 
							new Animal('Indian Elephant', continent1Name, 'Elephant'), 
							new Animal('Bengal Tiger', continent1Name, 'Tiger')];

	// Create two Continent objects
	var continent0 = new Continent(continent0Name, continent0Animals, leftCheckpoints);
	var continent1 = new Continent(continent1Name, continent1Animals, rightCheckpoints);

	// Add names of continents to the maps
	AddContinentName(continent0Name, false);
	AddContinentName(continent1Name, true);

	// Add the svg images of animals to the map
	PositionAnimals(continent0Animals, false);
	PositionAnimals(continent1Animals, true);

	// Add the pictures on the edges of the board
	AddAnimalImages(continent0Animals, false);
	AddAnimalImages(continent1Animals, true);

	CreateSpinner();


	created = true;
}

/* Destroys the svg objects of the game */
function Destroy(){

	for(i = 0; i < svgObjects.length; i++){
		svgObjects[i].parent.removeElement(svgObjects[i]);
	}
	svgObjects = new Array();
}


/* Creates the checkpoints for a map at the given positions and sets the status of capture point,
 * green S point, red S point and hazard point for each checkpoint for the given map
 * Parameter types: (list of list, list of boolean, list of boolean, list of boolean, 
 *                   list of boolean, Map, boolean)
 */
function CreateMapCheckpoints(positions, capturePoints, greenSPoints, redSPoints, hazardPoints, map, right){

	for (i = 0; i < positions.length; i++){
		var cpSize = checkpointSize;

		if (right){
			x = (GetMapWidth() - (GetMapWidth() * positions[i][0] * mapScale)) - (GetMapWidth() * moveHorizontal);
		} else{
			x = (GetMapWidth() * positions[i][0] * mapScale) + (GetMapWidth() * moveHorizontal);
		}
		
		y = (GetMapHeight() * positions[i][1] * mapScale) + (GetMapHeight() * moveVertical);

		var pointColor = 'green';
		if (capturePoints[i]){
			pointColor = 'black';
			cpSize = specialCheckpointSize;
		} else if (greenSPoints[i]){
			pointColor = '#193C19';
			cpSize = specialCheckpointSize;
		} else if (redSPoints[i]){
			pointColor = 'red';
			cpSize = specialCheckpointSize;
		} else if (hazardPoints[i]){
			pointColor = 'blue';
			cpSize = specialCheckpointSize;
		}

		if (right){
			if (created) {
				rightCheckpoints[i].x = x;
				rightCheckpoints[i].y = y;
				rightCheckpoints[i].circle = map.circle(cpSize).attr({ fill: pointColor , cx: x, cy: y });
				svgObjects.push(rightCheckpoints[i].circle);
			} else {
				var checkpoint = new Checkpoint(x, y, capturePoints[i], greenSPoints[i], redSPoints[i], hazardPoints[i]);
				checkpoint.circle = map.circle(cpSize).attr({ fill: pointColor , cx: x, cy: y });
				rightCheckpoints.push(checkpoint);
				svgObjects.push(checkpoint.circle);
			}

		} else {
			if (created) {
				leftCheckpoints[i].x = x;
				leftCheckpoints[i].y = y;
				leftCheckpoints[i].circle = map.circle(cpSize).attr({ fill: pointColor , cx: x, cy: y });
				svgObjects.push(leftCheckpoints[i].circle);
			} else {
				var checkpoint = new Checkpoint(x, y, capturePoints[i], greenSPoints[i], redSPoints[i], hazardPoints[i]);
				checkpoint.circle = map.circle(cpSize).attr({ fill: pointColor , cx: x, cy: y });
				leftCheckpoints.push(checkpoint);
				svgObjects.push(checkpoint.circle);
			}
		}
	}
}


/* Links all the checkpoints in the give map based on the edges for the given map
 * Parameter types: (list of list, Map, boolean)
 */
function LinkCheckpoints(edges, map, right){

	for (i = 0; i < edges.length; i++){
		index1 = edges[i][0];
		index2 = edges[i][1];

		var line;

		if (right){
			line = map.line(rightCheckpoints[index1].x, rightCheckpoints[index1].y, rightCheckpoints[index2].x, 
			rightCheckpoints[index2].y).stroke({ width: "1.5%", color:'green' });

			if (!created){
				rightCheckpoints[index1].nextCheckpoints.push(rightCheckpoints[index2]);
				rightCheckpoints[index2].nextCheckpoints.push(rightCheckpoints[index1]);
			}
		} else {
			line = map.line(leftCheckpoints[index1].x, leftCheckpoints[index1].y, leftCheckpoints[index2].x, 
			leftCheckpoints[index2].y).stroke({ width: "1.5%", color:'green' });

			if (!created){
				leftCheckpoints[index1].nextCheckpoints.push(leftCheckpoints[index2]);
				leftCheckpoints[index2].nextCheckpoints.push(leftCheckpoints[index1]);
			}
		}
		svgObjects.push(line);
	}
}


/* Adds the names of the continents to the maps 
 * Parameter types: (string, boolean)
 */
function AddContinentName(continentName, right){
	var x = GetMapWidth() * 0.6;
	var y = GetMapHeight() * 0.01;
	var fontSize = GetMapWidth() * mapScale * 0.7;

	var text;
	if (right){
		text = rightMap.text(continentName.toUpperCase()).move(GetMapWidth() - x, y);
	} else {
		text = leftMap.text(continentName.toUpperCase()).move(x, y);
	}

	text.font({ family: 'Courier', size: fontSize, anchor: 'middle', fill: 'red', 
		'font-weight' :'bold' });

	svgObjects.push(text);
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


function CreateSpinner(){

	var spinner = spinnerSection.group();

	var image = spinnerSection.image('Resources/spinner.png', GetPanelHeight() * 0.9, GetPanelHeight() * 0.9);
	image.cx(image.cx() + GetPanelHeight() * 0.05);
	image.cy(image.cy() + GetPanelHeight() * 0.05);
	svgObjects.push(image);
	spinner.add(image);

	var image = spinnerSection.image('Resources/pin.png', GetPanelHeight() * 0.5, GetPanelHeight() * 0.5);
	image.cx(image.cx() + GetPanelHeight() * pinCXDeviation);
	image.cy(image.cy() + GetPanelHeight() * pinCYDeviation);
	svgObjects.push(image);
	spinner.add(image);
}

/* Returns the width of the middle section of the board */
function GetMiddleWidth() {
	return $(document).width() * middleSectionWidthScale;
}

/* Returns the width of a map */
function GetMapWidth() {
	return $(document).width() * mapWidthScale;
}

/* Returns the height of a map */
function GetMapHeight() {
	return $(document).height() * mapHeightScale;
}

/* Returns the height of the lower panels */
function GetPanelHeight(){
	return $(document).height() * panelHeightScale;
}

/* Reads the text of the file at the given path and returns
 * the contents of the file
 * Parameter type: (string)
 * Return type: string
 */
function ReadFile(path) 
{
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", path, false);
	txtFile.send(null);
	return txtFile.responseText;
}




























