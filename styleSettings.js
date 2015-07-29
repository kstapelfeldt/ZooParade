/* Sets the size of the Yes and No buttons in the answer
 * section for the yes/no question answers
 */
function SetYesNoButtonStyle(){
	var borderRadius = (GetMapWidth() * 0.06).toString() + "px";

	var yesButton = document.getElementById("yesButton");
	yesButton.style.width = (GetMapWidth() * 0.2);
	yesButton.style.height = GetPanelHeight() * 0.15;
	yesButton.style.marginTop = GetPanelHeight() * 0.2;
	yesButton.style.marginRight = GetMapWidth() * 0.2;
	yesButton.style.marginLeft = GetMapWidth() * 0.05;
	yesButton.style.borderRadius = borderRadius;
	yesButton.style.fontSize = GetMapWidth() * 0.06;

	var noButton = document.getElementById("noButton");
	noButton.style.width = (GetMapWidth() * 0.2);
	noButton.style.height = GetPanelHeight() * 0.15;
	noButton.style.borderRadius = borderRadius;
	noButton.style.fontSize = GetMapWidth() * 0.06;
	noButton.style.marginTop = GetPanelHeight() * 0.2;
}

/* Sets the size of the text in Question and Answer sections
 * of the board
 */
function SetTextSizes(){

	document.getElementById('zooHeader').style.fontSize = GetMapWidth() * zooHeaderFontScale;

	document.getElementById('questionHeader').style.fontSize = GetMapWidth() * headerFontScale;
	var div = document.getElementById('questionContent');
	div.style.fontSize = GetMapWidth() * textFontScale;

	document.getElementById('answerHeader').style.fontSize = GetMapWidth() * headerFontScale;
	var div = document.getElementById('answerContent');
	div.style.fontSize = GetMapWidth() * textFontScale;
	if (div.innerHTML.indexOf("yesButton") > -1) SetYesNoButtonStyle();
}

/* Sets the position and style of the Proceed button in the 
 * answer section
 */
function SetProceedButtonStyle(){
	var borderRadius = (GetMapWidth() * 0.06).toString() + "px";
	var button = document.getElementById("proceedButton");
	button.style.borderRadius = borderRadius;
}

/* Sets the height and width of the body */
function SetBodyStyle(){
	document.getElementById("body").width = screen.width;
	document.getElementById("body").height = screen.height;
}

/* Sets the borders, width, height of the zoo section 
 * of the board
 */
function SetZooSectionBorders(){
	var zoo = document.getElementById("zoo");
	zoo.style.width = GetMiddleWidth() * 0.95;
	zoo.style.height = GetMapHeight() * 0.50;
	zoo.style.borderWidth = GetMiddleWidth() * 0.015;
}

/* Sets the border radius of all the sections of the board */
function SetBorderRadius(){
	var borderRadius = (GetMapWidth() * 0.06).toString() + "px";
	document.getElementById("leftMap").style.borderRadius =  borderRadius;
	document.getElementById("rightMap").style.borderRadius =  borderRadius;
	document.getElementById("center").style.borderRadius =  borderRadius;
	document.getElementById("zoo").style.borderRadius = borderRadius;
	document.getElementById("messageBox").style.borderRadius = borderRadius;
	document.getElementById("question").style.borderRadius =  borderRadius;
	document.getElementById("answer").style.borderRadius =  borderRadius;
	document.getElementById("spinnerSection").style.borderRadius =  borderRadius;
	document.getElementById("zoo0").style.borderRadius = borderRadius;
	document.getElementById("zoo1").style.borderRadius = borderRadius;
}

/* Sets the minimum heights of all the sections of the board */
function SetMinHeights(){
	// Minimum Screen width and height to see the full game
	var minScreenWidth = screen.width * minScreenWidthScale;
	var minScreenHeight = screen.height * minScreenHeightScale;
	document.getElementById("body").style.minWidth = minScreenWidth;
	document.getElementById("body").style.minHeight = minScreenHeight;

	document.getElementById("leftMap").style.minHeight = minScreenHeight * mapHeightScale;
	document.getElementById("rightMap").style.minHeight = minScreenHeight * mapHeightScale;
	document.getElementById("center").style.minHeight = minScreenHeight * mapHeightScale;
	document.getElementById("question").style.minHeight = minScreenHeight * panelHeightScale;
	document.getElementById("answer").style.minHeight = minScreenHeight * panelHeightScale;
	document.getElementById("spinnerSection").style.minHeight = minScreenHeight * panelHeightScale * spinnerSectionHeightDeviation;
}


/* Returns the width of the middle section of the board */
function GetMiddleWidth() {
	return document.getElementById("body").width * middleSectionWidthScale;
}

/* Returns the width of a map */
function GetMapWidth() {
	return document.getElementById("body").width * mapWidthScale;
}

/* Returns the height of a map */
function GetMapHeight() {
	return document.getElementById("body").height * mapHeightScale;
}

/* Returns the height of the lower panels */
function GetPanelHeight(){
	return document.getElementById("body").height * panelHeightScale;
}