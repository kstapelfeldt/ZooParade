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

var spinnerSection = SVG('spinner');	// SVG object for the Spinner section


// Minimum Screen width and height to see the full game
var minScreenWidth = screen.width * minScreenWidthScale;
var minScreenHeight = screen.height * minScreenHeightScale;

// Set the min screen width and height
document.getElementById("body").style.minWidth = minScreenWidth;
document.getElementById("body").style.minHeight = minScreenHeight;

Setup();

// Adjust all the objects on window resize
$(window).resize(function(){
	Destroy();
	Setup();
});


// Game variables
var continent0;
var continent1;
var player0;
var player1;
var right = false;

player0.currentCheckpoint = leftCheckpoints[0];
player1.currentCheckpoint = rightCheckpoints[0];

MovePlayer(player0, leftCheckpoints[1]);
player0.visitedCheckpoints.push(leftCheckpoints[0]);

MovePlayer(player1, rightCheckpoints[1]);
player1.visitedCheckpoints.push(rightCheckpoints[0]);


function GamePlay(index){
	var player = player0;
	if (right) player = player1;

	var checkpoints = leftCheckpoints;
	if (right) checkpoints = rightCheckpoints;

	if (!player.spin){
		if (checkpoints[index] == player.currentCheckpoint){
			player.possiblePaths = GetPossiblePaths(player, player.steps);
			for (var i = 0; i < player.possiblePaths.length; i++){
				SelectCheckpoint (player.possiblePaths[i][player.possiblePaths[i].length - 1]);
			}
		} else if (checkpoints[index].selected){
			MakeMove(player, index, checkpoints);
		}
	} else {
		alert("Please spin the spinner by clicking the 'Spin' button");
	}
}

function MakeMove(player, index, checkpoints){
	
	var nextCheckpoint = checkpoints[index];
	var pathIndex;

	for (var i = 0; i < player.possiblePaths.length; i++){
		var lastCp = player.possiblePaths[i][player.possiblePaths[i].length - 1];
		if (lastCp == nextCheckpoint) pathIndex = i;
		DeselectCheckpoint(lastCp);
	}

	player.visitedCheckpoints.push(player.currentCheckpoint);
	for (var i = 0; i < player.possiblePaths[pathIndex].length - 1; i++){
		player.visitedCheckpoints.push(player.possiblePaths[pathIndex][i]);
	}

	MovePlayer(player, checkpoints[index]);
	right = !right;
}

/* Sets up the game graphics */
function Setup(){

	if (window.innerHeight < minScreenHeight){
		document.getElementById("body").style.overflowY = "auto";
	} else{
		document.getElementById("body").style.overflowY = "hidden";
	}

	if (window.innerWidth < minScreenWidth){
		document.getElementById("body").style.overflowX = "auto";
	} else {
		document.getElementById("body").style.overflowX = "hidden";
	}
	
	// Creates Left Map
	CreateMapCheckpoints(leftMap, leftCheckpoints, false);
	LinkCheckpoints(leftPath, leftCheckpoints);

	// Creates Right Map
	CreateMapCheckpoints(rightMap, rightCheckpoints, true);
	LinkCheckpoints(rightPath, rightCheckpoints);

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
	PositionAnimals(continent0Animals, leftPath, leftCheckpoints, false);
	PositionAnimals(continent1Animals, rightPath, rightCheckpoints, true);

	// Add the pictures on the edges of the board
	AddAnimalImages(continent0Animals, leftPath, false);
	AddAnimalImages(continent1Animals, rightPath, true);

	CreateSpinner();



	/*********************** Start Here ***************************/
	player0 = new Player("Player0", continent0);
	player1 = new Player("Player1", continent1);
	AddPlayerPlaceHolders();

	AddQuestionText('<a href="http://www.github.com/roleen">Hello!</a> How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today? Hello! How are you? What\'s up with you today?');
	AddAnswerText('I am good! Life is awesome! I am doing what I am not doing. I am good! Life is awesome! I am doing what I am not doing. I am good! Life is awesome! I am doing what I am not doing. <a href="http://www.google.com">Click here</a> to go to the mysterious website.');
	created = true;
}

/* Destroys the svg objects of the game */
function Destroy(){

	for(var i = 0; i < svgObjects.length; i++){
		svgObjects[i].parent.removeElement(svgObjects[i]);
	}
	svgObjects = new Array();
}

/* Adds the question in the question section of the game 
 * Parameter types: (string)
 */
function AddQuestionText(question){
	var div = document.getElementById('questionContent');
	div.innerHTML = question;
}

/* Adds the answer in the answer section of the game 
 * Parameter types: (string)
 */
function AddAnswerText(answer){
	var div = document.getElementById('answerContent');
	div.innerHTML = answer;
}

/* Returns the width of the middle section of the board */
function GetMiddleWidth() {
	return Math.max(minScreenWidth, window.innerWidth) * middleSectionWidthScale;
}

/* Returns the width of a map */
function GetMapWidth() {
	return Math.max(minScreenWidth, window.innerWidth) * mapWidthScale;
}

/* Returns the height of a map */
function GetMapHeight() {
	return Math.max(minScreenHeight, window.innerHeight) * mapHeightScale;
}

/* Returns the height of the lower panels */
function GetPanelHeight(){
	return Math.max(minScreenHeight, window.innerHeight) * panelHeightScale;
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

/* Removes the element from the list
 * Parameter types: (list of object, object)
 * Return type: object
 */
function Remove(list, element){
	var index = list.indexOf(element);
	if (index > -1){
		list.splice(index, 1);
	}
	return element;
}






















