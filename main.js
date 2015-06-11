// SVG objects for Left map
var leftMap = SVG('leftMap');
var leftPath = leftMap.nested();
var leftCheckpoints = new Array();

// SVG objects for Right map
var rightMap = SVG('rightMap');
var rightPath = rightMap.nested();
var rightCheckpoints = new Array();

var svgObjects = new Array();			// Array of all svg objects in the game

var middleSection = SVG('center');		// SVG object for the middle section of the board

var spinnerSection = SVG('spinner');

var continent0;
var continent1;
var player0;
var player1;

var questionSection = SVG('question');
var answerSection = SVG('answer');



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
	continent0 = new Continent(continent0Name, continent0Animals, leftCheckpoints);
	continent1 = new Continent(continent1Name, continent1Animals, rightCheckpoints);

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



	/*********************** Start Here ***************************/
	player0 = new Player("Player0", continent0);
	player1 = new Player("Player1", continent1);
	AddPlayerPlaceHolders();



	var text = questionSection.text('Question').move(GetMapWidth() / 2, GetPanelHeight()/20);;
	var fontSize = GetMapWidth() * mapScale * 0.5;
	text.font({ family: 'Courier', size: fontSize, anchor: 'middle', fill: '#FFFF66', 
		'font-weight' :'bold' });

	var text = answerSection.text('Answer').move(GetMapWidth() / 2, GetPanelHeight()/20);;
	var fontSize = GetMapWidth() * mapScale * 0.5;
	text.font({ family: 'Courier', size: fontSize, anchor: 'middle', fill: '#FFFF66', 
		'font-weight' :'bold' });

	created = true;
}

/* Destroys the svg objects of the game */
function Destroy(){

	for(i = 0; i < svgObjects.length; i++){
		svgObjects[i].parent.removeElement(svgObjects[i]);
	}
	svgObjects = new Array();
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




























