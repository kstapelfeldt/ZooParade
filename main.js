var documentWidth = $(document).width();
var documentHeight = $(document).height();
var initialWindowWidth = $(window).width();
var initialWindowHeight = $(window).height();

var mapScale = 0.097;

var leftMap = SVG('leftMap');

//var circle = leftMap.circle("6%").attr({ fill: 'green', cx: GetMapWidth() * 0.5, cy: GetMapHeight() * 0.5 });

//var circle2 = leftMap.circle("6%").attr({ fill: 'green', cx:  GetMapWidth() * 0.4, cy: GetMapHeight() * 0.4 });

//var line = leftMap.line(circle.cx(), circle.cy(), circle2.cx() + 1, circle2.cy() + 1).stroke({ width: 10, color:'green' });




function CreateMapCheckpoints(positions, map){
	for (i = 0; i < positions.length; i++){
		//document.write(positions[i][0] + ", " + positions[i][1]);
		map.circle("4%").attr({ fill: 'green' , cx: GetMapWidth() * positions[i][0] * mapScale, cy: GetMapHeight() * positions[i][1] * mapScale });
	}
}


function SetAllNextCheckpoints(){

}

CreateMapCheckpoints([[2, 1.2], [3, 1.2], 
			[4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2.5],
			[4, 3], [4.7, 3.5], [9.5, 3.3],
			[4, 4], [5.4, 3.7], [6.5, 4], [7.3, 3.7], [8.2, 3.8], [9.5, 4.2],
			[5.7, 4.5],
			[4, 5.3], [5.3, 5.5], [7.3, 5.5], [8.2, 5.1], [9.5, 5.3],
			[4.2, 6.6], [5, 6.8], [6.1, 6.8], [9.5, 6.5],
			[4.3, 7.6], [5.1, 7.7], [6.2, 7.9], [7.3, 7.2], [8.3, 7.1],[9.5, 7.5],
			[4.4, 8.4], [5.3, 8.6], [9.4, 8.4],
			[4, 9.5], [5, 9.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9]], leftMap);


function GetMapWidth(){
	return documentWidth * 0.35;
}


function GetMapHeight(){
	return documentHeight * 0.70;
}