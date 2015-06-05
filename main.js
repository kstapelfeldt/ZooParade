var documentWidth = $(document).width();
var documentHeight = $(document).height();
var initialWindowWidth = $(window).width();
var initialWindowHeight = $(window).height();

var mapScale = 0.097;

var leftMap = SVG('leftMap');
var path = leftMap.nested();

var checkpoints = new Array();

//var circle = leftMap.circle("6%").attr({ fill: 'green', cx: GetMapWidth() * 0.5, cy: GetMapHeight() * 0.5 });

//var circle2 = leftMap.circle("6%").attr({ fill: 'green', cx:  GetMapWidth() * 0.4, cy: GetMapHeight() * 0.4 });

//var line = leftMap.line(circle.cx(), circle.cy(), circle2.cx() + 1, circle2.cy() + 1).stroke({ width: 10, color:'green' });




function CreateMapCheckpoints(positions, capturePoints, greenSPoints, redSPoints, hazardPoints, map){
	for (i = 0; i < positions.length; i++){
		x = GetMapWidth() * positions[i][0] * mapScale;
		y = GetMapHeight() * positions[i][1] * mapScale;

		var pointColor = 'green';
		if (capturePoints[i]){
			pointColor = 'black'
		} else if (greenSPoints[i]){
			pointColor = '#193C19';
		} else if (redSPoints[i]){
			pointColor = 'red';
		} else if (hazardPoints[i]){
			pointColor = 'blue';
		}

		map.circle("4.5%").attr({ fill: pointColor , cx: x, cy: y });
		var checkpoint = new Checkpoint(x, y, capturePoints[i], greenSPoints[i], redSPoints[i], hazardPoints[i]);
		checkpoints.push(checkpoint);
	}
}


function LinkCheckpoints(edges, map){
	for (i = 0; i < edges.length; i++){
		index1 = edges[i][0];
		index2 = edges[i][1];
		var line = map.line(checkpoints[index1].x, checkpoints[index1].y, checkpoints[index2].x, 
			checkpoints[index2].y).stroke({ width: "1.5%", color:'green' });
	}
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
			[4, 9.5], [5, 9.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9]], 

			[false, false, false, false, false, true, false, false, false, false, 
			false, false, true, false, false, false, false, false, true, false, 
			true, false, false, false, false, false, true, false, false, false, 
			false, false, false, false, false, false, false, false, true, false, 
			false, false],

			[false, false, false, false, false, false, false, false, false, false, 
			true, false, false, false, true, false, false, false, false, false, 
			false, false, false, false, true, false, false, false, false, true, 
			false, false, false, true, false, false, false, false, false, false, 
			false, true],

			[false, false, true, false, false, false, false, false, false, false, 
			false, false, false, false, false, true, false, false, false, false, 
			false, false, false, false, false, false, false, false, false, false, 
			false, false, false, false, false, false, false, false, false, false, 
			false, false],

			[false, false, false, false, false, false, false, false, false, false, 
			false, false, false, false, false, false, false, false, false, true, 
			false, false, false, false, false, false, false, false, false, false, 
			true, false, false, false, false, false, false, false, false, false, 
			false, false],

			leftMap);

LinkCheckpoints([[0 ,1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
				[7, 10], [10, 16], [16, 22], [22, 26], [26, 32], [32, 35], [35, 41],
				[41, 40], [40, 39], [39, 38], [38, 37], [37, 36], [36, 33], [33, 27],
				[27, 23], [23, 18], [18, 11], [11, 8], [8, 2], [8, 9], [9, 12], [12, 17],
				[17, 13], [13, 14], [14, 15], [15, 16], [27, 24], [24, 19], [19, 17], 
				[33, 28], [28, 25], [25, 20], [20, 21], [21, 16], [37, 34], [34, 29], 
				[29, 30], [30, 31], [31, 32]], path);

function GetMapWidth(){
	return documentWidth * 0.35;
}


function GetMapHeight(){
	return documentHeight * 0.70;
}