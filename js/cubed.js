$(function() {
	var $stage = $('#stage'),
		coords = shuffle(generateCoords());

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

		var xyz = coords.pop();

		var cube = createCube().velocity({
			translateZ: xyz[0] * 100 + 'px',
			translateX: xyz[1] * 100 + 'px',
			translateY: xyz[2] * 100 + 'px'
		});

		$stage.append(cube);
	}

	function scheduleCube (count) {
		count -= 1;

		if (count > 0) {
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

	scheduleCube(126);

});