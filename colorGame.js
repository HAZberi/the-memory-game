
// global Variables
var numColors = 6;
var colors = [];
var pickedColor;

// DOM Selection
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var headerDisplay = document.querySelector("h1");
var newColors = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

//Game initialization
init();

//resetting the game without refreshing the page when user clicks "New Colors" or "PlayAgian?"
newColors.addEventListener("click", function(){
	reset();
});


//functional tasks

function init(){ //setup the game environment
	reset(); //setup/populate colors and default theme
	setupSquares(); //initialize basic game  
	setupModeButtons();// initialize game modes
}

function setupSquares(){ //basic game logic
	for (var i=0; i<colors.length; i++){ // loop throught all the event listeners when user click on the squares
		squares[i].addEventListener("click", function(){ //fires when any square is clicked
			var clickedColor = this.style.backgroundColor; //storing the clicked color in a local variable
			console.log(pickedColor, clickedColor);
			if(pickedColor === clickedColor){ //checks if the correct color is picked
				messageDisplay.textContent = "Correct!"; // displays a text on the white stripe
				newColors.textContent = "Play Again?"; // change the text of New Color button
				headerDisplay.style.backgroundColor = pickedColor; // Makes the header color same as the winning color 
				gameOver(); //changes all the squares to the winning color
			}
			else{ //executes when user picks a wrong color/square
				messageDisplay.textContent = "Try Again"; //displays a text on the white stripe
				this.style.backgroundColor = "#232323"; //hides the square by changing its background color same as the <body>
			}
		});
	}
}
function setupModeButtons(){ //choosing difficulty level
	for (var i=0; i<modeBtn.length; i++){ //loop through all the event listeners when user clicks the difficulty
		modeBtn[i].addEventListener("click", function(){ //fires when any difficulty button is clicked
			modeBtn[0].classList.remove("selected"); //makes sure easy difficulty button is not selected
			modeBtn[1].classList.remove("selected"); //makes sure hard difficulty button is not selected
			this.classList.add("selected"); //makes sure the clicked button is selected and stays selected until user finishes the game
			if (this.textContent === "Easy"){//checks if user selects the Easy Mode
				numColors = 3; //changes to a 3 color guess (intialize)
			}
			else{// if users selects the Hard Mode
				numColors = 6; //changes to a 6 color guess (initialize)
			}
			reset();//setup and populate colors based on the initialized difficulty level
		});
	}
};
function reset(){ //populate the squares with random colors 
	colors = populateColors(numColors); //a color array is populated and the length of the array depends on the variable "numColors"
	pickedColor = colorPicker(); //a random color rgb value is retrieved from the "colors" array and stored as "the winning color value"
	colorDisplay.textContent = pickedColor; //displays the color value on the header which user needs to guess in order to win 
	headerDisplay.style.backgroundColor = "steelblue";//default header background color
	messageDisplay.textContent = "";//makes sure there is no text on the white stripe
	newColors.textContent = "New Colors";//makes sure "New Colors" text appear on the New Colors button 
	for (var i=0; i<squares.length; i++){//loop through all the sqaures and assign them a random color from "colors" array
		if (colors[i]){//checks if a color value is present in the "colors" array
			squares[i].style.display = "block";// makes sure all the squares are displayed
			squares[i].style.backgroundColor = colors[i];//color assignment to a sqaure
		}
		else{//executes when no color value is present in the "colors" array
			squares[i].style.display = "none"; //makes sure to hide the squares for which color value is not present 
		}
	}
};
function gameOver(){
	for (var i=0; i<colors.length; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
};
function colorPicker(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
};
function colorGenerator(){
	//Generate random colors for red palatte from 0-255
	var r = Math.floor(Math.random()*256); 
	//Generate random colors for green palatte from 0-255
	var g = Math.floor(Math.random()*256);  
	//Generate random colors for blue palatte from 0-255
	var b = Math.floor(Math.random()*256); 
	var color = "rgb(" + r + ", " + g + ", " + b + ")";
	//console.log(color);
	return color;
};
function populateColors(num){
	var arr = [];
	for(var i=0; i<num; i++){
		arr.push(colorGenerator());
	}
	//console.log(arr);
	return arr;
};
