/* Checkpoint class */

/* Initializer for Checkpoint object
 * Parameter types : (float, float, bool, bool, bool, bool)
 */
function Checkpoint(x, y, capture, greenS, redS, hazard, index, right){
	this.x = x;
	this.y = y;
	this.capture = capture;
	this.greenS = greenS;
	this.redS = redS;
	this.hazard = hazard;
	this.index = index;
	this.right = right;

	this.visited = false;
	this.selected = false;
	this.circle = null;
	this.clickCircle = null;
	this.nextCheckpoints = new Array();
}

/* Creates the checkpoints for a map at the required positions and sets the status of capture point,
 * green S point, red S point and hazard point for each checkpoint for the given map
 * Parameter types: (SVG, list of Checkpoint, list of SVG, boolean)
 */
function CreateMapCheckpoints(map, checkpointsList, right){

	for (var i = 0; i < positions.length; i++){

		var cpSize = GetMapWidth() * checkpointSize;
		if (hazardPoints[i] || greenSPoints[i] || redSPoints[i] || capturePoints[i]) cpSize = GetMapWidth() * specialCheckpointSize;
		
		var x = (GetMapWidth() * positions[i][0] * mapScale) + (GetMapWidth() * moveHorizontal);
		if (right) x = (GetMapWidth() - (GetMapWidth() * positions[i][0] * mapScale)) - (GetMapWidth() * moveHorizontal);
		var y = (GetMapHeight() * positions[i][1] * mapScale) + (GetMapHeight() * moveVertical);

		if (created) {
			checkpointsList[i].x = x;
			checkpointsList[i].y = y;
		} else {
			var checkpoint = new Checkpoint(x, y, capturePoints[i], greenSPoints[i], redSPoints[i], hazardPoints[i], i, right);
			checkpointsList.push(checkpoint);
		}

		checkpointsList[i].circle = map.circle(cpSize).attr({ cx: x, cy: y });
		svgObjects.push(checkpointsList[i].circle);
		
		SetCheckpointColor(checkpointsList[i]);
		SetCheckpointLetter(checkpointsList[i], map, cpSize);

		checkpointsList[i].clickCircle = map.circle(cpSize).attr({ cx: x, cy: y, opacity: 0 });
		svgObjects.push(checkpointsList[i].clickCircle);

		SetCheckpointClickCircleId(checkpointsList[i]);

		SetCheckpointClick(checkpointsList[i]);
		SetCheckpointMouseover(checkpointsList[i]);
		SetCheckpointMouseout(checkpointsList[i]);
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

/* Selects the given checkpoint 
 * Parameter types: (Checkpoint) 
 */
function SelectCheckpoint(checkpoint){
	checkpoint.clickCircle.attr({ id: 'P' + checkpoint.index.toString()});
	checkpoint.clickCircle.attr({ fill: 'white', opacity: 0.4 });
	checkpoint.selected = true;
}

/* Deselects the given checkpoint
 * Parameter types: (Checkpoint)
 */
function DeselectCheckpoint(checkpoint){
	checkpoint.clickCircle.attr({ fill: 'black', opacity: 0 });
	SetCheckpointColor(checkpoint);
	SetCheckpointClickCircleId(checkpoint);
	checkpoint.selected = false;
}

/* Sets the onclick function for the given checkpoint 
 * Parameter types: (Checkpoint)
 */
function SetCheckpointClick(checkpoint){
	checkpoint.clickCircle.click(function(){
		var id = this.attr('id');
		var type = id.slice(0, 1);
		var index = parseInt(id.slice(1));
		var checkpoint = leftCheckpoints[index];
		if (right) checkpoint = rightCheckpoints[index];
		GamePlay(index);
	});
}

/* Sets the on mouseover function for the given checkpoint 
 * Parameter types: (Checkpoint)
 */
function SetCheckpointMouseover(checkpoint){
	checkpoint.clickCircle.mouseover(function(){
		var id = this.attr('id');
		var type = id.slice(0, 1);
		var index = parseInt(id.slice(1));
		if (type == 'N' || type == 'R' || type == 'H'){
			checkpoint.clickCircle.attr('opacity', 0.4);
		} 
	});
}

/* Sets the on mouseout function for the given checkpoint 
 * Parameter types: (Checkpoint)
 */
function SetCheckpointMouseout(checkpoint){
	checkpoint.clickCircle.mouseout(function(){
		var id = this.attr('id');
		var type = id.slice(0, 1);
		var index = parseInt(id.slice(1));
		if (type == 'N' || type == 'R' || type == 'H'){
			checkpoint.clickCircle.attr('opacity', 0);
		} 
	});
}

/* Sets the color of the given checkpoint
 * Parameter types: (Checkpoint)
 */
function SetCheckpointColor(checkpoint){
	var pointColor = checkpointColor;
	if (checkpoint.redS || checkpoint.capture) pointColor = redSPointColor;
	else if (checkpoint.hazard) pointColor = hazardPointColor;
	checkpoint.circle.attr('fill', pointColor);
}

/* Sets the letter of the given checkpoint
 * Parameter types: (Checkpoint, SVG, float)
 */
function SetCheckpointLetter(checkpoint, map, cpSize){
	var letter = null;
	var letterColor = checkpointLetterColor;

	if (checkpoint.greenS || checkpoint.redS) letter = 'S';
	else if (checkpoint.hazard) letter = 'H';
	else if (checkpoint.capture) letter = 'C';
	else if (checkpoint.index < 2) letter = (checkpoint.index + 2).toString();

	if (checkpoint.redS) letterColor = "yellow";

	var textYDeviation = cpSize * checkpointTextYScale;
	if (checkpoint.greenS || checkpoint.redS || checkpoint.hazard || checkpoint.capture) 
		textYDeviation = cpSize * specialCheckpointTextYScale;

	if (letter != null){
		var text = map.text(letter).move(checkpoint.x, checkpoint.y + textYDeviation);
		text.font({ family: "Tahoma", size: cpSize * checkpointTextSize, anchor: 'middle', fill: letterColor });
		svgObjects.push(text);
	}
}

/* Sets the id attribute of the given checkpoint's click circle
 * Parameter types: (Checkpoint)
 */
function SetCheckpointClickCircleId(checkpoint){
	var id = 'N';
	if (checkpoint.redS || checkpoint.capture) id = 'R';
	if (checkpoint.hazard) id = 'H';
	id = id + checkpoint.index.toString();
	checkpoint.clickCircle.attr('id', id);
}





























