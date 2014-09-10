$(function() {
	var $stage = $('#stage'),
		// coords = shuffle(generateCoords()),
		letters = [
				[4, 4, 3, 200], [4, 4, 2, 200], [4, 4, 1, 200], [3, 4, 1, 200], [2, 4, 1, 200], [2, 4, 2, 200], [1, 4, 1, 200], [0, 4, 1, 200], // F
				[4, 3, 3, 400],[4, 3, 2, 400], [4, 3, 1, 400], [3, 3, 3, 400], [3, 3, 1, 400], [2, 3, 3, 400], [2, 3, 2, 400], [2, 3, 1, 400], [1, 3, 3, 400], [1, 3, 1, 400], [0, 3, 3, 400], [0, 3, 1, 400], // A
				[4, 2, 2, 600], [4, 2, 1, 600], [4, 2, 3, 600], [3, 2, 2, 600], [2, 2, 2, 600], [1, 2, 2, 600], [0, 2, 1, 600], [0, 2, 2, 600], [0, 2, 3, 600], // I
				[4, 1, 1, 800], [3, 1, 1, 800], [2, 1, 1, 800], [1, 1, 1, 800], [0, 1, 1, 800], [0, 1, 2, 800], [0, 1, 3, 800] //L
			].reverse();

	function createCube() {
		return $('<div class="cube">' +
					'<div class="front"></div>' +
					'<div class="back"></div>' +
					'<div class="top"></div>' +
					'<div class="bottom"></div>' +
					'<div class="left"></div>' +
					'<div class="right"></div>' +
				'</div>');
	}

	function appendAndAnimate(count) {
		count = count || 0;

		var xyz = letters.pop();

		var cube = createCube().velocity({
			translateZ: xyz[0] * 100 + 'px',
			translateX: xyz[1] * 100 + 'px',
			translateY: xyz[2] * 100 + 'px',
		}).velocity({
			opacity: function () {
				return (Math.random());
			}
		}, {
			delay: 500
		});

		$stage.append(cube);
	}

	function scheduleCube (count) {
		count -= 1;

		if (count >= 0) {
			setTimeout(function() {
				appendAndAnimate(count);
				scheduleCube(count);
			}, 200);
		}
	}

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

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
	}

	function generateCoords() {
		var arr = [];
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 5; j++) {
					for (var k = 0; k < 5; k++) {
						arr.push([i, j, k]);
					}
				}
			}
		return arr;
	}

	scheduleCube(letters.length);

});