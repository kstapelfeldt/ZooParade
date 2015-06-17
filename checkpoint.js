/* Checkpoint class */

/* Initializer for Checkpoint object
 * Parameter types : (float, float, bool, bool, bool, bool)
 */
function Checkpoint(x, y, capture, greenS, redS, hazard, index){
	this.x = x;
	this.y = y;
	this.capture = capture;
	this.greenS = greenS;
	this.redS = redS;
	this.hazard = hazard;
	this.visited = false;
	this.index = index;

	this.circle = null;
	this.nextCheckpoints = new Array();
}

/* Creates the checkpoints for a map at the required positions and sets the status of capture point,
 * green S point, red S point and hazard point for each checkpoint for the given map
 * Parameter types: (SVG, list of Checkpoint, list of SVG, boolean)
 */
function CreateMapCheckpoints(map, checkpointsList, rectsList, right){

	//var redPoints = redSPoints;

	for (var i = 0; i < positions.length; i++){
		var cpSize = GetMapWidth() * checkpointSize;

		var x = (GetMapWidth() * positions[i][0] * mapScale) + (GetMapWidth() * moveHorizontal);

		if (right){
			x = (GetMapWidth() - (GetMapWidth() * positions[i][0] * mapScale)) - (GetMapWidth() * moveHorizontal);
		}
		
		var y = (GetMapHeight() * positions[i][1] * mapScale) + (GetMapHeight() * moveVertical);

		var pointColor = checkpointColor;
		var letter = null;
		var letterColor = "white";
		if (capturePoints[i]){
			pointColor = capturePointColor;
			cpSize = GetMapWidth() * specialCheckpointSize;
			letter = "C";
		} else if (greenSPoints[i]){
			pointColor = greenSPointColor;
			cpSize = GetMapWidth() * specialCheckpointSize;
			letter = "S";
		} else if (redSPoints[i]){
			pointColor = redSPointColor;
			cpSize = GetMapWidth() * specialCheckpointSize;
			letter = "S";
			letterColor = "yellow";
		} else if (hazardPoints[i]){
			pointColor = hazardPointColor;
			cpSize = GetMapWidth() * specialCheckpointSize;
			letter = "H";
		}

		if (i < 2){
			letter = (i + 2).toString();
		}

		if (created) {
			checkpointsList[i].x = x;
			checkpointsList[i].y = y;
			checkpointsList[i].circle = map.circle(cpSize).attr({ fill: pointColor , cx: x, cy: y });
			svgObjects.push(checkpointsList[i].circle);
		} else {
			var checkpoint = new Checkpoint(x, y, capturePoints[i], greenSPoints[i], redSPoints[i], hazardPoints[i], i);
			checkpoint.circle = map.circle(cpSize).attr({ fill: pointColor , cx: x, cy: y });
			checkpointsList.push(checkpoint);
			svgObjects.push(checkpoint.circle);
		}

		if (letter != null){
			var text = map.text(letter).move(x, y + cpSize * checkpointTextYScale);
			text.font({ family: "Tahoma", size: cpSize * specialCheckpointTextSize, anchor: 'middle', fill: letterColor });
			svgObjects.push(text);
		}

		var id = 'N';
		if (redSPoints[i] || capturePoints[i]) id = 'R';
		if (hazardPoints[i]) id = 'H';


		id = id + i.toString();

		var rect = map.rect(cpSize, cpSize).attr({x: x - cpSize * 0.5, y: y - cpSize * 0.5, opacity: 0, id: id });
		if (created){rectsList[i] = rect} else {rectsList.push(rect)}
		var checkpoint = checkpointsList[i];

		rect.click(function(){
			var id = this.attr('id');
			var type = id.slice(0, 1);
			var index = id.slice(1);
			var checkpoint = leftCheckpoints[parseInt(index)];
			if (right) checkpoint = rightCheckpoints[parseInt(index)];
			GamePlay(parseInt(index));
		});

		rect.mouseover(function(){
			var id = this.attr('id');
			var type = id.slice(0, 1);
			var index = id.slice(1);
			var circle = leftCheckpoints[parseInt(index)].circle;
			if (right) circle = rightCheckpoints[parseInt(index)].circle;
			if (type == 'N'){
				circle.attr('fill', checkpointMouseoverColor);
			} else if (type == 'R'){
				circle.attr('fill', redSPointMouseoverColor);
			} else if (type == 'H'){
				circle.attr('fill', hazardPointMouseoverColor);
			}
		});

		rect.mouseout(function(){
			var id = this.attr('id');
			var type = id.slice(0, 1);
			var index = id.slice(1);
			var circle = leftCheckpoints[parseInt(index)].circle;
			if (right) circle = rightCheckpoints[parseInt(index)].circle;
			if (type == 'N'){
				circle.attr('fill', greenSPointColor);
			} else if (type == 'R'){
				circle.attr('fill', redSPointColor);
			} else if (type == 'H'){
				circle.attr('fill', hazardPointColor);
			}
		});
		svgObjects.push(rect);
	}
}

/* Links all the checkpoints in the given path based on the edges for the given map
 * Parameter types: (SVG, list of Checkpoint)
 */
function LinkCheckpoints(path, checkpointsList){

	for (var i = 0; i < pathEdges.length; i++){
		index1 = pathEdges[i][0];
		index2 = pathEdges[i][1];

		var eWidth = GetMapWidth() * edgeWidth;

		var line = path.line(checkpointsList[index1].x, checkpointsList[index1].y, checkpointsList[index2].x, 
		checkpointsList[index2].y).stroke({ width: eWidth, color: checkpointColor });

		if (!created){
			checkpointsList[index1].nextCheckpoints.push(checkpointsList[index2]);
			checkpointsList[index2].nextCheckpoints.push(checkpointsList[index1]);
		}
		svgObjects.push(line);
	}
}