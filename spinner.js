var pin;
var spinnerBoard;


function CreateSpinner(){

	spinnerBoard = spinnerSection.image('Resources/spinner.png', GetPanelHeight() * 0.9, GetPanelHeight() * 0.9);
	FixSpinnerBoardPosition();
	svgObjects.push(spinnerBoard);


	pin = spinnerSection.image('Resources/pin.png', GetPanelHeight() * 0.5, GetPanelHeight() * 0.5);
	pin.cx(pin.cx() + GetPanelHeight() * pinCXDeviation);
	pin.cy(pin.cy() + GetPanelHeight() * pinCYDeviation);
	svgObjects.push(pin);
	var pinCenter = GetPinCenter();

	CreateSpinButton();

	var center = GetSpinnerBoardCenter();
	pin.transform({rotation: prevAngle, cx: center.x, cy: center.y});
}

function CreateSpinButton(){
	var buttonPosition = GetButtonPosition();

	var spinButton = document.getElementById("spinButton");
	spinButton.setAttributeNS(null, 'x', buttonPosition.x);
	spinButton.setAttributeNS(null, 'y', buttonPosition.y);
	spinButton.setAttributeNS(null, 'rx', GetPanelHeight() * 0.1);
	spinButton.setAttributeNS(null, 'ry', GetPanelHeight() * 0.1);
	spinButton.setAttributeNS(null, 'width', GetPanelHeight() * 0.35);
	spinButton.setAttributeNS(null, 'height', GetPanelHeight() * 0.2);
	spinButton.setAttributeNS(null, 'fill', '#4A2500');

	var buttonTextPosition = GetButtonTextPosition();
	var spinButtonText = document.getElementById("spinButtonText");
	spinButtonText.setAttribute('x', buttonTextPosition.x);
	spinButtonText.setAttribute('y', buttonTextPosition.y);
	spinButtonText.setAttribute('font-family', "Courier");
}

/* Spins the Spinner pin */
function Spin(){
	var center = GetSpinnerBoardCenter();

	pin.transform({rotation: prevAngle, cx: center.x, cy: center.y});

	var angle = angles[Math.floor(Math.random() * angles.length)];

	var magnitude = 360 * (Math.floor(Math.random() * 7) + 3);
	var direction = [1, -1][Math.floor(Math.random() * 2)];
	
	pin.animate(2000).rotate(magnitude * direction + angle + pinAngleDeviation, center.x , center.y);
	prevAngle = angle + pinAngleDeviation;
}


function GetSpinnerBoardCenter(){
	return ({'x': spinnerBoard.cx(), 'y': spinnerBoard.cy()});
}

function GetPinCenter(){
	var center = GetSpinnerBoardCenter();
	return ({'x': center.x + GetPanelHeight() * 0.008, 'y': center.y + GetPanelHeight() * 0.005});
}

function GetButtonPosition(){
	return ({'x': GetPanelHeight() * 1.3, 'y': GetPanelHeight() * 0.25});
}

function GetButtonTextPosition(){
	var buttonTextXDeviation = GetPanelHeight() * 0.09;
	var buttonTextYDeviation = GetPanelHeight() * 0.12;
	var position = GetButtonPosition();
	return ({'x': position.x + buttonTextXDeviation, 'y': position.y + buttonTextYDeviation});
}

function FixSpinnerBoardPosition(){
	var x = spinnerBoard.cx() + GetPanelHeight() * 0.05;
	var y = spinnerBoard.cy() + GetPanelHeight() * 0.05;
	spinnerBoard.cx(x);
	spinnerBoard.cy(y);
}






