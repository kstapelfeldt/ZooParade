var documentWidth = $(document).width();
var documentHeight = $(document).height();
var initialWindowWidth = $(window).width();
var initialWindowHeight = $(window).height();

var leftMap = SVG('leftMap');

var circle = leftMap.circle("6%").attr({ fill: 'green' });

circle.translate(GetMapWidth() * 0.5, GetMapHeight() * 0.5);

var circle2 = leftMap.circle("6%").attr({ fill: 'green' });

circle2.translate(GetMapWidth() * 0.4, GetMapHeight() * 0.4);


function GetMapWidth(){
	return documentWidth * 0.35;
}


function GetMapHeight(){
	return documentHeight * 0.70;
}



/* Algorithm: 
 * Make an array of the relative position of coordinates
 * Function to create circles at the coordinates and draw rectangles between two centers
 * Populate checkpoints at the same time
 * [[0, 0], [1, 0], 
 [1.5, 1], [2.5, 1], [3.5, 1], [4.5, 1]]
 */