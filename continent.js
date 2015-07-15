/* Initialzer for a Continent object
 * Parameter types : (string, list of Animal, list of Checkpoint)
 */
function Continent(name, animals, checkpoints){
	this.name = name;
	this.animals = animals;
	this.checkpoints = checkpoints;
	this.player = null;
}


/* Assigns player to map
 * Parameter types : (Continent, Player)
 */
function AssignPlayer(continent, player){
	map.player = player;
}


/* Adds the names of the continents to the maps 
 * Parameter types: (Game, string, boolean)
 */
function AddContinentName(game, continentName, right){
	var x = GetMapWidth() * continentNameX;
	var y = GetMapHeight() * continentNameY;
	var fontSize = GetMapWidth() * mapScale * continentNameSize;
	
	var text;
	if (right){
		text = game.rightMap.text(continentName.toUpperCase()).move(GetMapWidth() - x, y);
	} else {
		text = game.leftMap.text(continentName.toUpperCase()).move(x, y);
	}
	
	text.font({ family: fontFamily, size: fontSize, anchor: 'middle', fill: continentNameColor, 
		'font-weight' :'bold' });

	game.svgObjects.push(text);
}