console.log("JS file is connected to HTML! Woo!");

// define card variables
// var cardOne = "queen",
// 	cardTwo = "queen",
// 	cardThree = "king",
// 	cardFour = "king";
// 	msg = '';

// if (cardOne == cardThree) {
// 	msg = "You found a match!";
// } else {
// 	msg = "Sorry, try again"
// }

// alert(msg);

var board = document.getElementById('game-board');

var i, card;

var createCards = function() {
	for(i = 0; i < 4; i++) {
		card = document.createElement('div');
		card.className = 'card';
		board.appendChild(card);
	}
};

createCards();

