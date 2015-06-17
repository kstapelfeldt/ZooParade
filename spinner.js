var pin;
var spinnerBoard;

/* Creates the Spinner object */
function CreateSpinner(){

	spinnerBoard = spinnerSection.image('Resources/spinner.png', GetPanelHeight() * spinnerBoardWidthScale, 
					GetPanelHeight() * spinnerBoardHeightScale);
	FixSpinnerBoardPosition();
	svgObjects.push(spinnerBoard);


	pin = spinnerSection.image('Resources/pin.png', GetPanelHeight() * pinWidthScale, GetPanelHeight() * pinHeightScale);
	pin.cx(pin.cx() + GetPanelHeight() * pinCXDeviation);
	pin.cy(pin.cy() + GetPanelHeight() * pinCYDeviation);
	svgObjects.push(pin);
	var pinCenter = GetPinCenter();

	CreateSpinButton();

	var center = GetSpinnerBoardCenter();
	pin.transform({rotation: prevAngle, cx: center.x, cy: center.y});
}

/* Creates the spin button for the spinner */
function CreateSpinButton(){
	var buttonWidth = GetPanelHeight() * spinButtonWidthScale;
	var buttonHeight = GetPanelHeight() * spinButtonHeightScale;

	var buttonPosition = GetButtonPosition();
	var spinButton = document.getElementById("spinButton");
	spinButton.setAttributeNS(null, 'x', buttonPosition.x);
	spinButton.setAttributeNS(null, 'y', buttonPosition.y);
	spinButton.setAttributeNS(null, 'rx', GetPanelHeight() * spinButtonRXScale);
	spinButton.setAttributeNS(null, 'ry', GetPanelHeight() * spinButtonRYScale);
	spinButton.setAttributeNS(null, 'width', buttonWidth);
	spinButton.setAttributeNS(null, 'height', buttonHeight);
	spinButton.setAttributeNS(null, 'fill', darkBackgroundColor);
	
	var buttonTextPosition = GetButtonTextPosition();
	var spinButtonText = document.getElementById("spinButtonText");
	spinButtonText.setAttribute('text-anchor', "middle");
	spinButtonText.setAttribute('x', buttonPosition.x + buttonWidth * spinButtonTextXScale);
	spinButtonText.setAttribute('y', buttonPosition.y + buttonHeight * spinButtonTextYScale);
	spinButtonText.setAttribute('font-family', fontFamily);
}


/* Spins the Spinner pin */
function Spin(){
	var center = GetSpinnerBoardCenter();
	pin.transform({rotation: prevAngle, cx: center.x, cy: center.y});

	index = Math.floor(Math.random() * angles.length);
	var angle = angles[index];
	var magnitude = 360 * (Math.floor(Math.random() * 7) + 3);
	var direction = [1, -1][Math.floor(Math.random() * 2)];
	pin.animate(2000).rotate(magnitude * direction + angle + pinAngleDeviation, center.x , center.y);
	prevAngle = angle + pinAngleDeviation;
}

/* Returns the coordinates of the center of the spinner image
 * Return type: dictionary
 */
function GetSpinnerBoardCenter(){
	return ({'x': spinnerBoard.cx(), 'y': spinnerBoard.cy()});
}

/* Returns the coordinates of the center of the pin image
 * Return type: dictionary
 */
function GetPinCenter(){
	var center = GetSpinnerBoardCenter();
	return ({'x': center.x + GetPanelHeight() * pinCenterXScale, 'y': center.y + GetPanelHeight() * pinCenterYScale});
}

/* Returns the position coordinates of the position of the spin button
 * Return type: dictionary
 */
function GetButtonPosition(){
	return ({'x': GetPanelHeight() * spinButtonXScale, 'y': GetPanelHeight() * spinButtonYScale});
}

/* Returns the coordinates of the text in the spin button
 * Return type: dictionary
 */
function GetButtonTextPosition(){
	var buttonTextXDeviation = GetPanelHeight() * spinButtonTextXScale;
	var buttonTextYDeviation = GetPanelHeight() * spinButtonTextYScale;
	var position = GetButtonPosition();
	return ({'x': position.x + buttonTextXDeviation, 'y': position.y + buttonTextYDeviation});
}

/* Fixes the position of the spinner board */
function FixSpinnerBoardPosition(){
	var x = spinnerBoard.cx() + GetPanelHeight() * spinnerBoardXScale;
	var y = spinnerBoard.cy() + GetPanelHeight() * spinnerBoardYScale;
	spinnerBoard.cx(x);
	spinnerBoard.cy(y);
}






