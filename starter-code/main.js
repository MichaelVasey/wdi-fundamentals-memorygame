console.log("JS file is connected to HTML! Woo!");

// define card variables
var cardOne = "queen",
	cardTwo = "queen",
	cardThree = "king",
	cardFour = "king",
	msg = '';

if (cardOne == cardThree) {
	msg = "You found a match!";
} else {
	msg = "Sorry, try again"
}

alert(msg);