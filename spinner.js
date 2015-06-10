


function CreateSpinner(){

	var spinnerBoard = spinnerSection.image('Resources/spinner.png', GetPanelHeight() * 0.9, GetPanelHeight() * 0.9);
	var x = spinnerBoard.cx() + GetPanelHeight() * 0.05;
	var y = spinnerBoard.cy() + GetPanelHeight() * 0.05;
	spinnerBoard.cx(x);
	spinnerBoard.cy(y);
	svgObjects.push(spinnerBoard);

	var pin = spinnerSection.image('Resources/pin.png', GetPanelHeight() * 0.5, GetPanelHeight() * 0.5);
	pin.cx(pin.cx() + GetPanelHeight() * pinCXDeviation);
	pin.cy(pin.cy() + GetPanelHeight() * pinCYDeviation);
	svgObjects.push(pin);

	var cX = x + GetPanelHeight() * 0.008;
	var cY = y + GetPanelHeight() * 0.005;

	var buttonX = GetPanelHeight() * 1.3;
	var buttonY = GetPanelHeight() / 4;

	var spinButton = document.getElementById("spinButton");
	spinButton.setAttributeNS(null, 'x', buttonX);
	spinButton.setAttributeNS(null, 'y', buttonY);
	spinButton.setAttributeNS(null, 'fill', '#f0f');

	var buttonTextXDeviation = GetPanelHeight() * 0.06;
	var buttonTextYDeviation = GetPanelHeight() * 0.07;

	var spinButtonText = document.getElementById("spinButtonText");
	spinButtonText.setAttribute('x', buttonX + buttonTextXDeviation);
	spinButtonText.setAttribute('y', buttonY + buttonTextYDeviation);
	spinButtonText.textContent = 'Spin';


	pin.transform({rotation: -147, cx: cX, cy:cY});

	pin.animate(2000).rotate(1800-147, cX,cY);
	pin.animate(2000).rotate(360, cX, cY);
}

/* Spins the Spinner pin */
function Spin(pin, x, y){
	// To be implemented
	pin.transform({ rotation: 200, cx: x, cy: y });
}