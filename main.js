var documentWidth = $(document).width();
var documentHeight = $(document).height();
var initialWindowWidth = $(window).width();
var initialWindowHeight = $(window).height();

var mapScale = 0.097;			// Scale the maps
var moveHorizontal = 0;			// Move the maps horizontally
var moveVertical = 0;			// Move the maps vertically

// Relative position of all the checkpoints
var positions = [[2, 1.2], [3, 1.2], 
			[4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2.5],
			[4, 3], [4.7, 3.2], [9.5, 3.3],
			[4, 4], [5.4, 3.7], [6.5, 4], [7.3, 3.7], [8.2, 3.8], [9.5, 4.2],
			[5.7, 4.5],
			[4, 5.3], [5.3, 5.5], [7.3, 5.5], [8.2, 5.1], [9.5, 5.3],
			[4.2, 6.6], [5, 6.8], [6.1, 6.8], [9.5, 6.5],
			[4.3, 7.6], [5.1, 7.7], [6.2, 7.9], [7.3, 7.2], [8.3, 7.1],[9.5, 7.5],
			[4.4, 8.4], [5.3, 8.6], [9.4, 8.4],
			[4, 9.5], [5, 9.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9]];

// Booleans representing the capture point status of every checkpoint
var capturePoints = [false, false, false, false, false, true, false, false, false, false, 
					false, false, true, false, false, false, false, false, true, false, 
					true, false, false, false, false, false, true, false, false, false, 
					false, false, false, false, false, false, false, false, true, false, 
					false, false];

// Booleans representing the greenS point status of every checkpoint
var greenSPoints = [false, false, false, false, false, false, false, false, false, false, 
					true, false, false, false, true, false, false, false, false, false, 
					false, false, false, false, true, false, false, false, false, true, 
					false, false, false, true, false, false, false, false, false, false, 
					false, true];

// Booleans representing the redS point status of every checkpoint
var redSPoints = 	[false, false, true, false, false, false, false, false, false, false, 
					false, false, false, false, false, true, false, false, false, false, 
					false, false, false, false, false, false, false, false, false, false, 
					false, false, false, false, false, false, false, false, false, false, 
					false, false];

// Booleans representing the hazard point status of every checkpoint
var hazardPoints = [false, false, false, false, false, false, false, false, false, false, 
					false, false, false, false, false, false, false, false, false, true, 
					false, false, false, false, false, false, false, false, false, false, 
					true, false, false, false, false, false, false, false, false, false, 
					false, false];

// All the edges in the maps
var pathEdges = [[0 ,1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
				[7, 10], [10, 16], [16, 22], [22, 26], [26, 32], [32, 35], [35, 41],
				[41, 40], [40, 39], [39, 38], [38, 37], [37, 36], [36, 33], [33, 27],
				[27, 23], [23, 18], [18, 11], [11, 8], [8, 2], [8, 9], [9, 12], [12, 17],
				[17, 13], [13, 14], [14, 15], [15, 16], [27, 24], [24, 19], [19, 17], 
				[33, 28], [28, 25], [25, 20], [20, 21], [21, 16], [37, 34], [34, 29], 
				[29, 30], [30, 31], [31, 32]];

var checkpointSize = "4.5%";		// Size of normal checkpoints
var specialCheckpointSize = "5.5%";	// Size of special checkpoints

// Animal capture points indices
var animal1Checkpoints = [5, 20];
var animal2Checkpoints = [18, 26];
var animal3Checkpoints = [12, 38];

// SVG objects for Left map
var leftMap = SVG('leftMap');
var leftPath = leftMap.nested();
var leftCheckpoints = new Array();

// SVG objects for Right map
var rightMap = SVG('rightMap');
var rightPath = rightMap.nested();
var rightCheckpoints = new Array();

// SVG object for the middle section of the board
var middleSection = SVG('center');

// Creates Left Map
CreateMapCheckpoints(positions, capturePoints, greenSPoints, redSPoints, hazardPoints, leftMap, false);
LinkCheckpoints(pathEdges, leftPath, false);

// Creates Right Map
CreateMapCheckpoints(positions, capturePoints, greenSPoints, redSPoints, hazardPoints, rightMap, true);
LinkCheckpoints(pathEdges, rightPath, true);


// Set continent names and continent animals
var continent1Name = 'North America';
var continent1Animals = [new Animal('Moose', continent1Name, 'Moose'), 
						new Animal('Grizzly Bear', continent1Name, 'Grizzly'), 
						new Animal('Big Horn', continent1Name, 'Bighorn')];

var continent2Name = 'Asia';
var continent2Animals = [new Animal('Indian Rhinoceros', continent1Name, 'Rhinoceros'), 
						new Animal('Indian Elephant', continent1Name, 'Elephant'), 
						new Animal('Bengal Tiger', continent1Name, 'Tiger')];

// Create two Continent objects
var continent1 = new Continent(continent1Name, continent1Animals, leftCheckpoints);
var continent2 = new Continent(continent2Name, continent2Animals, rightCheckpoints);

// Add names of continents to the maps
AddContinentName(continent1Name, false);
AddContinentName(continent2Name, true);

// Add the svg images of animals to the map
PositionAnimals(continent1Animals, false);
PositionAnimals(continent2Animals, true);

// Add the pictures on the edges of the board
AddAnimalImages(continent1Animals, false);
AddAnimalImages(continent2Animals, true);


var image = middleSection.image('Resources/spinner.png', GetMiddleWidth() / 1.5, GetMiddleWidth() / 1.5);
image.cx(GetMiddleWidth() / 2);
image.cy(GetMapHeight() - GetMiddleWidth() / 3);


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


		map.circle(cpSize).attr({ fill: pointColor , cx: x, cy: y });
		var checkpoint = new Checkpoint(x, y, capturePoints[i], greenSPoints[i], redSPoints[i], hazardPoints[i]);
		if (right){
			rightCheckpoints.push(checkpoint);
		} else{
			leftCheckpoints.push(checkpoint);
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

		if (right){
			var line = map.line(rightCheckpoints[index1].x, rightCheckpoints[index1].y, rightCheckpoints[index2].x, 
			rightCheckpoints[index2].y).stroke({ width: "1.5%", color:'green' });

			rightCheckpoints[index1].nextCheckpoints.push(rightCheckpoints[index2]);
			rightCheckpoints[index2].nextCheckpoints.push(rightCheckpoints[index1]);
		} else{
			var line = map.line(leftCheckpoints[index1].x, leftCheckpoints[index1].y, leftCheckpoints[index2].x, 
			leftCheckpoints[index2].y).stroke({ width: "1.5%", color:'green' });

			leftCheckpoints[index1].nextCheckpoints.push(leftCheckpoints[index2]);
			leftCheckpoints[index2].nextCheckpoints.push(leftCheckpoints[index1]);
		}
	}
}


/* Adds the names of the continents to the maps 
 * Parameter types: (string, boolean)
 */
function AddContinentName(continentName, right){
	var x = GetMapWidth() * 0.6;
	var y = GetMapHeight() * 0.01;
	var fontSize = GetMapWidth() * mapScale * 0.7;

	if (right){
		var text = rightMap.text(continentName.toUpperCase()).move(GetMapWidth() - x, y);
	} else {
		var text = leftMap.text(continentName.toUpperCase()).move(x, y);
	}

	text.font({ family: 'Courier', size: fontSize, anchor: 'middle', fill: 'red', 
		'font-weight' :'bold' });
}


/* Positions animal svgs at the right position for the animals
 * Parameter types: (list of Animal, boolean)
 */
function PositionAnimals(animals, right){
	var a1C1XDeviation = 0.019;
	var a1C1YDeviation = 0.05;

	var a1C2XDeviation = - 0.04;
	var a1C2YDeviation = - 0.05;

	var a2C1XDeviation = 0.05;
	var a2C1YDeviation = -0.07;

	var a2C2XDeviation = -0.06;
	var a2C2YDeviation = -0.06;

	var a3C1XDeviation = 0.01;
	var a3C1YDeviation = -0.065;

	var a3C2XDeviation = 0.01;
	var a3C2YDeviation = -0.065;

	if (right){
		var image = rightPath.image(animals[0].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(rightCheckpoints[animal1Checkpoints[0]].x - GetMapWidth() * a1C1XDeviation);
		image.cy(rightCheckpoints[animal1Checkpoints[0]].y + GetMapHeight() * a1C1YDeviation);

		var image = rightPath.image(animals[0].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(rightCheckpoints[animal1Checkpoints[1]].x - GetMapWidth() * a1C2XDeviation);
		image.cy(rightCheckpoints[animal1Checkpoints[1]].y + GetMapHeight() * a1C2YDeviation);

		var image = rightPath.image(animals[1].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(rightCheckpoints[animal2Checkpoints[0]].x - GetMapWidth() * a2C1XDeviation);
		image.cy(rightCheckpoints[animal2Checkpoints[0]].y + GetMapHeight() * a2C1YDeviation);

		var image = rightPath.image(animals[1].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(rightCheckpoints[animal2Checkpoints[1]].x - GetMapWidth() * a2C2XDeviation);
		image.cy(rightCheckpoints[animal2Checkpoints[1]].y + GetMapHeight() * a2C2YDeviation);

		var image = rightPath.image(animals[2].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(rightCheckpoints[animal3Checkpoints[0]].x - GetMapWidth() * a3C1XDeviation);
		image.cy(rightCheckpoints[animal3Checkpoints[0]].y + GetMapHeight() * a3C1YDeviation);

		var image = rightPath.image(animals[2].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(rightCheckpoints[animal3Checkpoints[1]].x - GetMapWidth() * a3C2XDeviation);
		image.cy(rightCheckpoints[animal3Checkpoints[1]].y + GetMapHeight() * a3C2YDeviation);
	} else {
		var image = leftPath.image(animals[0].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(leftCheckpoints[animal1Checkpoints[0]].x + GetMapWidth() * a1C1XDeviation);
		image.cy(leftCheckpoints[animal1Checkpoints[0]].y + GetMapHeight() * a1C1YDeviation);

		var image = leftPath.image(animals[0].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(leftCheckpoints[animal1Checkpoints[1]].x + GetMapWidth() * a1C2XDeviation);
		image.cy(leftCheckpoints[animal1Checkpoints[1]].y + GetMapHeight() * a1C2YDeviation);

		var image = leftPath.image(animals[1].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(leftCheckpoints[animal2Checkpoints[0]].x + GetMapWidth() * a2C1XDeviation);
		image.cy(leftCheckpoints[animal2Checkpoints[0]].y + GetMapHeight() * a2C1YDeviation);

		var image = leftPath.image(animals[1].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(leftCheckpoints[animal2Checkpoints[1]].x + GetMapWidth() * a2C2XDeviation);
		image.cy(leftCheckpoints[animal2Checkpoints[1]].y + GetMapHeight() * a2C2YDeviation);

		var image = leftPath.image(animals[2].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(leftCheckpoints[animal3Checkpoints[0]].x + GetMapWidth() * a3C1XDeviation);
		image.cy(leftCheckpoints[animal3Checkpoints[0]].y + GetMapHeight() * a3C1YDeviation);

		var image = leftPath.image(animals[2].svgPath, GetMapWidth() * mapScale, GetMapHeight() * mapScale);
		image.cx(leftCheckpoints[animal3Checkpoints[1]].x + GetMapWidth() * a3C2XDeviation);
		image.cy(leftCheckpoints[animal3Checkpoints[1]].y + GetMapHeight() * a3C2YDeviation);
	}
}

/* Adds Animal pictures at the edges of the board 
 * Parameter types: (list of Animal, boolean)
 */
function AddAnimalImages(animals, right){
	var imgWidth = GetMapWidth() * mapScale * 3;
	var imgHeight = GetMapHeight() * mapScale * 2.25;

	var imgYposition = GetMapHeight() * mapScale * 3.5;

	if (right){
		var image = rightPath.image(animals[0].pngPath, imgWidth, imgHeight);
		image.cx(GetMapWidth() - imgWidth / 2);
		image.cy(imgYposition);
		imgYposition += imgHeight;

		var image = rightPath.image(animals[1].pngPath, imgWidth, imgHeight);
		image.cx(GetMapWidth() - imgWidth / 2);
		image.cy(imgYposition);
		imgYposition += imgHeight;

		var image = rightPath.image(animals[2].pngPath, imgWidth, imgHeight);
		image.cx(GetMapWidth() - imgWidth / 2);
		image.cy(imgYposition);
	} else {
		var image = leftPath.image(animals[0].pngPath, imgWidth, imgHeight);
		image.cy(imgYposition);
		imgYposition += imgHeight;

		var image = leftPath.image(animals[1].pngPath, imgWidth, imgHeight);
		image.cy(imgYposition);
		imgYposition += imgHeight;

		var image = leftPath.image(animals[2].pngPath, imgWidth, imgHeight);
		image.cy(imgYposition);
	}	
}

/* Returns the width of the middle section of the board */
function GetMiddleWidth(){
	return documentWidth * 0.25;
}

/* Returns the width of a map */
function GetMapWidth(){
	return documentWidth * 0.35;
}

/* Returns the height of a map */
function GetMapHeight(){
	return documentHeight * 0.70;
}

/* Reads the text of the file at the given path 
 * Parameter type: (string)
 */
function ReadFile(path) 
{
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", path, false);
	txtFile.send(null);
	return txtFile.responseText;
}




























