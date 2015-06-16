var minScreenWidthScale = 0.9;		// Restrict horizontal scaling
var minScreenHeightScale = 0.8;		// Restrict vertical scaling


// Map Scales
var mapScale = 0.097;
var mapWidthScale = 0.34;
var mapHeightScale = 0.65;
var middleSectionWidthScale = 0.25;
var panelHeightScale = 0.27;

// Spinner Board Scales
var spinnerBoardWidthScale = 0.9;
var spinnerBoardHeightScale = 0.9;
var spinnerBoardXScale = 0.05;
var spinnerBoardYScale = 0.05;

// Spinner Pin Scales
var pinWidthScale = 0.5;
var pinHeightScale = 0.5;
var pinCenterXScale = 0.008;
var pinCenterYScale = 0.005;

// Spinner Button Scales
var spinButtonXScale = 0.97;
var spinButtonYScale = 0.25;
var spinButtonRXScale = 0.1;
var spinButtonRYScale = 0.1;
var spinButtonWidthScale = 0.35;
var spinButtonHeightScale = 0.2;
var spinButtonTextXScale = 0.5;
var spinButtonTextYScale = 0.6;

// Player Placeholder Scales
var playerPlaceHolderScale = 0.7;
var playerPlaceHolderXScale = -0.002;
var playerPlaceHolderYScale = -0.01;

var moveHorizontal = 0;			// Move the maps horizontally
var moveVertical = 0;			// Move the maps vertically

// Relative position of all the checkpoints
var positions = [[2, 1.2], [3, 1.2], 
			[4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2.5],
			[4, 3], [4.7, 3.2], [9.5, 3.3],
			[4, 4], [5.4, 3.7], [6.5, 4], [7.3, 3.7], [8.2, 3.8], [9.5, 4.2],
			[5.7, 4.5],
			[4, 5.3], [5.3, 5.5], [7.3, 5.5], [8.2, 5.1], [9.5, 5.3],
			[4.2, 6.6], [5, 6.8], [6.1, 6.8], [9.5, 6.5],
			[4.3, 7.6], [5.1, 7.7], [6.2, 7.9], [7.3, 7.2], [8.3, 7.1],[9.5, 7.5],
			[4.4, 8.4], [5.3, 8.6], [9.4, 8.4],
			[4, 9.5], [5, 9.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9]];

// Booleans representing the capture point status of every checkpoint
var capturePoints = [false, false, false, false, false, true, false, false, false, false, 
					false, false, true, false, false, false, false, false, true, false, 
					true, false, false, false, false, false, true, false, false, false, 
					false, false, false, false, false, false, false, false, true, false, 
					false, false];

// Booleans representing the greenS point status of every checkpoint
var greenSPoints = [false, false, false, false, false, false, false, false, false, false, 
					true, false, false, false, true, false, false, false, false, false, 
					false, false, false, false, true, false, false, false, false, true, 
					false, false, false, true, false, false, false, false, false, false, 
					false, true];

// Booleans representing the redS point status of every checkpoint
var redSPoints = 	[false, false, true, false, false, false, false, false, false, false, 
					false, false, false, false, false, true, false, false, false, false, 
					false, false, false, false, false, false, false, false, false, false, 
					false, false, false, false, false, false, false, false, false, false, 
					false, false];

// Booleans representing the hazard point status of every checkpoint
var hazardPoints = [false, false, false, false, false, false, false, false, false, false, 
					false, false, false, false, false, false, false, false, false, true, 
					false, false, false, false, false, false, false, false, false, false, 
					true, false, false, false, false, false, false, false, false, false, 
					false, false];

// All the edges in the maps
var pathEdges = [[0 ,1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
				[7, 10], [10, 16], [16, 22], [22, 26], [26, 32], [32, 35], [35, 41],
				[41, 40], [40, 39], [39, 38], [38, 37], [37, 36], [36, 33], [33, 27],
				[27, 23], [23, 18], [18, 11], [11, 8], [8, 2], [8, 9], [9, 12], [12, 17],
				[17, 13], [13, 14], [14, 15], [15, 16], [27, 24], [24, 19], [19, 17], 
				[33, 28], [28, 25], [25, 20], [20, 21], [21, 16], [37, 34], [34, 29], 
				[29, 30], [30, 31], [31, 32]];

var checkpointSize = 0.045;				// Size of normal checkpoints
var specialCheckpointSize = 0.06;		// Size of special checkpoints
var checkpointTextYScale = -0.45;		// Y scale of special checkpoints text
var specialCheckpointTextSize = 0.7;	// Size of special checkpoints text 
var edgeWidth = 0.013;					// Width of the lines joining checkpoints

// Animal capture points indices
var animal0Checkpoints = [5, 20];
var animal1Checkpoints = [18, 26];
var animal2Checkpoints = [12, 38];

// Deviation of Animals from Capture Checkpoints
var a0C0XDeviation = 0.019;
var a0C0YDeviation = 0.05;

var a0C1XDeviation = - 0.04;
var a0C1YDeviation = - 0.05;

var a1C0XDeviation = 0.05;
var a1C0YDeviation = -0.07;

var a1C1XDeviation = -0.06;
var a1C1YDeviation = -0.06;

var a2C0XDeviation = 0.01;
var a2C0YDeviation = -0.065;

var a2C1XDeviation = 0.01;
var a2C1YDeviation = -0.065;

var created = false;	// Boolean representing the map created

// Spinner's pin deviation
var pinCXDeviation = 0.27;
var pinCYDeviation = 0.29;

// Continent name variables
var continentNameSize = 0.7;
var continentNameX = 0.6;
var continentNameY = 0.01;

// Spinner variables
var prevAngle = -147;
var pinAngleDeviation = -147;
var angles = [0, 0, 54, 54, 90, 126, 126, 180, 180, 234, 234,306, 306, 270];
var redNumbers = [5, 5, 6, 6, 3, 4, 4, 5, 5, 4, 4, 3, 6, 6];
var greenNumbers = [2, 2, 1, 1, 4, 3, 3, 2, 2, 3, 3, 4, 1, 1];

// Text variables
var fontFamily = 'Courier';

// Color variables
var mapBackgroundColor = '#FFFF66';
var continentNameColor = 'red';
var checkpointColor = 'green';
var redSPointColor = 'red';
var greenSPointColor = 'green';
var capturePointColor = 'red';
var hazardPointColor = 'blue';
var darkBackgroundColor = '#4A2500';