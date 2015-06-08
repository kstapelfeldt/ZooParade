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