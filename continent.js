/* Initialzer for a Continent object
 * Parameter types : (string, list of Animal, list of Checkpoint)
 */
function Continent(name, animals, checkpoints){
	this.name = name;
	this.animals = animals;
	this.checkpoints = checkpoints;
	this.player = null;
}


/* Get all possible moves steps 'steps' away from checkpoint and 
 * returns an array of checkpoints
 * Parameter types : (Map)
 */
function GetPossibleMoves(continent){
	// To be implemented
}


/* Assigns player to map
 * Parameter types : (Map, Player)
 */
function AssignPlayer(continent, player){
	map.player = player;
}


/* Adds the names of the continents to the maps 
 * Parameter types: (string, boolean)
 */
function AddContinentName(continentName, right){
	var x = GetMapWidth() * continentNameX;
	var y = GetMapHeight() * continentNameY;
	var fontSize = GetMapWidth() * mapScale * continentNameSize

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