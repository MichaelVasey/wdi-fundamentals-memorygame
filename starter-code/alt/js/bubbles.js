// (function() {
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			}
	})();

	var cntr = document.getElementById('bubble-container');
	var canvas = document.getElementById('bubble-canvas');
	var ctx = canvas.getContext('2d');
	var bubbles = [];

	function drawBubble(bubble, context) {
		context.beginPath();
		context.fillStyle = bubble.grd;
		context.arc(bubble.x, bubble.y, bubble.r, 0, 2*Math.PI);
		context.fill();
	}

	function animate(bubbles, canvas, context) {
		var bubble;
		var time; 

		context.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < bubbles.length; i++) {
			bubble = bubbles[i];
			time = (new Date()).getTime() - bubble.start;
			bubble.y = canvas.height - (0.5 * bubble.gravity * Math.pow(time / 1000, 2));
			if(bubble.y < 0 - (10000)) {
				bubbles.splice(i, 1);
			}
			drawBubble(bubble, context);
		}
		
		if (bubbles.length >= 1) {
			requestAnimFrame(function(){
				animate(bubbles, canvas, context);
			});
		}
	}

	function createBubbles(callback) {
		var bubble;
		var gradient;
		var radius;
		for (var i = 0; i < 200; i++) {
			setTimeout(function(){
			bubble = {};
				radius = Math.floor(Math.random() * 50) + 10;
				bubble.r = radius;
				bubble.x = Math.floor(Math.random() * canvas.width);
				bubble.y = canvas.height + 100;
				gradient = ctx.createRadialGradient(400,400,10,400,400,1200);
				gradient.addColorStop(0, "rgba(" +
				    Math.floor(Math.random() * 255) + ", " +
				    Math.floor(Math.random() * 255) + ", " +
				    Math.floor(Math.random() * 255) + ", " +
				    Math.random() + ")"
				);
				gradient.addColorStop(1, "rgba(" +
				    Math.floor(Math.random() * 255) + ", " +
				    Math.floor(Math.random() * 255) + ", " +
				    Math.floor(Math.random() * 255) + ", " +
				    Math.random() + ")"
				);
				bubble.grd = gradient;
				bubble.gravity = Math.floor(Math.random() * 300) + 100;
				bubble.start = (new Date()).getTime();
				bubbles.push(bubble);
			}, (Math.floor(Math.random() * 500)));
		}
		if (callback && typeof callback == 'function') {
			callback();
		}		
	}
// })();