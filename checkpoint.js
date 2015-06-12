/* Checkpoint class */

/* Initializer for Checkpoint object
 * Parameter types : (float, float, bool, bool, bool, bool)
 */
function Checkpoint(x, y, capture, greenS, redS, hazard){
	this.x = x;
	this.y = y;
	this.capture = capture;
	this.greenS = greenS;
	this.redS = redS;
	this.hazard = hazard;
	this.visited = false;

	this.circle = null;
	this.nextCheckpoints = new Array();
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

		var pointColor = checkpointColor;
		if (capturePoints[i]){
			pointColor = capturePointColor;
			cpSize = specialCheckpointSize;
		} else if (greenSPoints[i]){
			pointColor = greenSPointColor;
			cpSize = specialCheckpointSize;
		} else if (redSPoints[i]){
			pointColor = redSPointColor;
			cpSize = specialCheckpointSize;
		} else if (hazardPoints[i]){
			pointColor = hazardPointColor;
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
			rightCheckpoints[index2].y).stroke({ width: edgeWidth, color: checkpointColor });

			if (!created){
				rightCheckpoints[index1].nextCheckpoints.push(rightCheckpoints[index2]);
				rightCheckpoints[index2].nextCheckpoints.push(rightCheckpoints[index1]);
			}
		} else {
			line = map.line(leftCheckpoints[index1].x, leftCheckpoints[index1].y, leftCheckpoints[index2].x, 
			leftCheckpoints[index2].y).stroke({ width: edgeWidth, color: checkpointColor });

			if (!created){
				leftCheckpoints[index1].nextCheckpoints.push(leftCheckpoints[index2]);
				leftCheckpoints[index2].nextCheckpoints.push(leftCheckpoints[index1]);
			}
		}
		svgObjects.push(line);
	}
}