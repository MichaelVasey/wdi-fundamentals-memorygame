(function(){
	var images = [{
		src: 'reindeer.png',
		alt: 'Hello Kitty As A Reindeer',
		title: 'Reindeer Kitty',
		dataSize: ''
	}, {
		src: 'classic.png',
		alt: 'Classic Hello Kitty',
		title: 'Classic Kitty',
		dataSize: ''
	}, {
		src: 'ninja.png',
		alt: 'Hello Kitty As A Ninja',
		title: 'Ninja Kitty',
		dataSize: ''
	}, {
		src: 'shy.png',
		alt: 'Shy Hello Kitty',
		title: 'Shy Kitty',
		dataSize: ''
	}, {
		src: 'camera.png',
		alt: 'Hello Kitty With A Camera',
		title: 'Camera Kitty',
		dataSize: ''
	}, {
		src: 'puppet.png',
		alt: 'Hello Kitty With A Puppet',
		title: 'Puppet Kitty',
		dataSize: ''
	}, {
		src: 'teddybear.png',
		alt: 'Hello Kitty With A Bear',
		title: 'Teddybear Kitty',
		dataSize: ''
	}, {
		src: 'witch.png',
		alt: 'Hello Kitty As A Witch',
		title: 'Witchy Kitty',
		dataSize: ''
	}, {
		src: 'birthday.png',
		alt: 'Hello Kitty\'s Birthday',
		title: 'Birthday Kitty',
		dataSize: ''
	}, {
		src: 'milk.png',
		alt: 'Hello Kitty Milk',
		title: 'Kitty Milk',
		dataSize: ''
	}];

	// cache some elements
	var overlay = document.getElementById('overlay'),
		countdown = overlay.querySelector('.countdown'),
		scroller = document.getElementById('countdown-scroller'),
		counter = document.getElementById('counter'),
		score = document.getElementById('score'),
		match = document.getElementById('matches'),
		board = document.getElementById('board'),
		startBtn = document.getElementById('start-btn'),
		resetBtn = document.getElementById('reset-btn'),
		close = overlay.querySelector('#close-icon'),
	// animationEnd event
		support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
		 'WebkitAnimation' : 'webkitAnimationEnd',// Saf 6, Android Browser
		 'MozTAnimation'   : 'animationend',      // only for FF < 15
		 'animation'       : 'animationend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
		},
		animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],

		onAnimationEnd = function(el, callback) {
			var onEndCallbackFn = function(ev) {
				if (support.animations) {
					if(ev.target != this) return;
					this.removeEventListener(animEndEventName, onEndCallbackFn);
				}
				if (callback && typeof callback === 'function') {callback.call(this);}
			};
			if(support.animations) {
				el.addEventListener(animEndEventName, onEndCallbackFn);
			}
			else {
				onEndCallbackFn();
			}
		},

		options = {
			boardSize: 20,
			time: 60,
			theme: 'kitty'
		},

		cards = [],
		paired =[],
		currScore,
		isPlaying = false,
		boardSet = false;

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	};
	
	// setup
	function setup(newGame) {
		// reset cards;
		cards = [];
		paired = [];
		var boardSize = options.boardSize ? options.boardSize : 20;
		var id = 1;

		_setupCards();

		function _setupCards() {
			var rand;
			var image;
			var cardEl;
			var card;
			// create card pairs
			for (var i = 0; i < boardSize / 2; i++) {
				rand = Math.floor(Math.random() * (images.length - 1));
				image = images[rand];
				_createPair(image);
			}

			// randomize card order
			cards = _randomize(cards);

			// add cards to board
			cards.forEach(function(card) {
				document.getElementById('board').appendChild(card);
			});

			matches.textContent = boardSize / 2;

			if (newGame) {
				score.textContent = 0;
			}
			boardSet = true;
		};
		

		function _createPair(img) {
			for (var i = 0; i < 2; i++) {
				cardEl = document.createElement('div');
				cardEl.classList.add('card-wrapper');
				cardEl.innerHTML = '<div id="cd' + id + '" class="card"><div class="card-front"><img src="img/' + img.src + '" alt="' + img.alt + '"></div><div class="card-back"></div></div>';
				card = cardEl.querySelector('.card');
				card.setAttribute('data-type', img.title);
				// card.addEventListener('click', function(){
				// 	this.classList.toggle('flip');
				// 	check card function
				// 	checkcards.call(this);
				// });
				card.addEventListener('click', checkCards);
				cards.push(cardEl);
				id++;
			}	
		};

		// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		function _randomize(array) {
  			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {
			    // Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
		  	}
		  	return array;
		};

	};



	function startGame() {
		if (isPlaying) {
			return;
		}

		if(!boardSet) {
			clearBoard();
			setup();	
		}

		// 1: show overlay with countdown
		overlay.classList.add('show');
		// 2: start countdown!!
		countdown.classList.add('start');
		// 3: hide overlay on animation end
		onAnimationEnd(scroller, function() {
			overlay.classList.remove('show');

			isPlaying = true;
			boardSet = false;
			// counter.textContent = options.time;
			startTimer(function(){
				isPlaying = false;
				var resEl = document.createElement('div');
				var html = '<div>Congratulations, you cleared the board!</div><div>Your current score is <span>' + score.textContent + '</span></div><div>Play again? <span class="yes">YES</span><span class="no">NO</span></div>';
				resEl.classList.add('credits');

				resEl.innerHTML = html;

				overlay.querySelector('#close-icon').addEventListener('click', function(){
					overlay.classList.remove('show');
					overlay.removeChild(resEl);
					countdown.classList.remove('hide');
					this.classList.add('hide');
				});

				countdown.classList.add('hide');
				overlay.appendChild(resEl);
				close.classList.remove('hide');
				overlay.classList.add('show');
			});
		});

		function startTimer(callback) {
			var t = options.time;
			timer = setInterval(function(){
				t -= 1;
				counter.textContent = t;
				if (t <= 10) {
					counter.classList.add('ending');
				}
				if (t <= 0) {
					clearInterval(timer);
					callback();
				}
			}, 1000);
		};
	};

	startBtn.addEventListener('click', startGame);

	//stopTimer
	function stopTimer() {
		clearInterval(timer);
	};

	// card on click
	// 1: remove click event listener
	function checkCards() {
		var cards = [].slice.call(document.getElementsByClassName('card'));
		this.classList.add('flip');
		this.removeEventListener('click', checkCards);
		paired.push(this);
		if (paired.length != 2) {
			return;
		} else {
			cards.forEach(function(card) {
				card.removeEventListener('click', checkCards);
			});
			if (_checkMatch(paired)) {
				paired.forEach(function(selected){
					selected.classList.add('matched');
				});
				_resetPaired();
				update();
				bubbles('success');
				cards.forEach(function(card){
					if (!card.classList.contains('matched')) {
						card.addEventListener('click', checkCards);
					}
				});
			} else {
				// TODO indicate no match
				setTimeout (function() {
					paired.forEach(function(selected){
						selected.classList.remove('flip');
					});
					_resetPaired();
					cards.forEach(function(card) {
						card.addEventListener('click', checkCards);
					});
				}, 500);
			}
		}

		function _checkMatch(array) {
			return (array[0].getAttribute('data-type') == array[1].getAttribute('data-type')) ? true : false;
		};

		function _resetPaired() {
			paired = [];
		};
	};

	function update() {
		updateScore();
		updateToMatch();
	};

	function updateScore() {
		score.textContent = parseInt(score.textContent) + 10;
	};

	function updateToMatch() {
		match.textContent = parseInt(match.textContent) - 1;
	};

	function bubbles() {

		function _createBubble() {

		}
	};

	function endGame(cleared) {
		if (cleared) {
		// format message for win
		} else {
		// format message for lose
		}
	};

	function resetGame() {
		if (isPlaying) {
			return;
		} else {
			clearBoard();
			setup(true);
		}
	};

	function clearBoard() {
		board.innerHTML = '';
	}

	// initialize new game
	function init(opts) {
		options = extend({}, options);
		extend(options, opts);
		setup(true);
	};

	init();

})();