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
var msgBox = document.getElementById('msg');

var i, 
	card, 
	cards = ['queen', 'queen', 'king', 'king'],
	cardsInPlay = [];

function createBoard() {
	for (var i = 0; i < cards.length; i++) {
		cardElement = document.createElement('div');
		cardElement.className = 'card';
		cardElement.setAttribute('data-card', cards[i]);
		cardElement.addEventListener('click', isTwoCards);
		board.appendChild(cardElement);
	}
};

//checks to see if there are cards in play
function isTwoCards() {
  // reveal card image
  var cardType = this.getAttribute('data-card');
  this.innerHTML = '<img src="img/'+cardType+'.png" alt="' + cardType + (cardType === 'king' ? " of clubs" : " of diamonds") + '"/>';

  // add card to array of cards in play
  // 'this' hasn't been covered in this prework, but
  // for now, just know it gives you access to the card the user clicked on
  cardsInPlay.push(this.getAttribute('data-card'));

  // if you have two cards in play check for a match
  if (cardsInPlay.length === 2) {

    // pass the cardsInPlay as an argument to isMatch function
    isMatch(cardsInPlay);

    // clear cards in play array for next try
    cardsInPlay = [];



  }

};

function isMatch(cardsInPlay) {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		msgBox.textContent = "It's a match!!";
	} else {
		msgBox.textContent = "Nope, they are completely different!";
	}

	setTimeout(function(){
		msgBox.textContent = "";
		resetCards();
	}, 5000);
};

function resetCards() {
	var cards = [].slice.call(document.getElementsByClassName('card'));
	cards.forEach(function(card){
		card.innerHTML = "";
	});
};


createBoard();























