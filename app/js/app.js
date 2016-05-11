(function(){
'use strict';
var mouseCoordinates = []

var startTracking = function(){

	document.onmousemove = function(e) {
		var bodyOffsets = document.body.getBoundingClientRect();

		var oneCoordinate = {
			x: e.pageX - bodyOffsets.left,
			y: e.pageY
		}

		//record position
		mouseCoordinates.push(oneCoordinate);

		//move dot
		moveDot(oneCoordinate.x, oneCoordinate.y);
	}
}

var moveDot = function(x,y){
	$('.dot').css({'top':y,'left':x});
	return
}

var stopTracking = function(){
	document.onmousemove = function(){
		return null
	}
}



var interpolateCoordinates = function(){

	var updatedCoords = [];

	//if x current & x next are more than 1 apart; add new coordinates in between to fill out the gaps.
	for (var i = 0; i < mouseCoordinates.length; i++) {

		//look at current & next coordinate.
		if(mouseCoordinates[i+1]){

			//calculate difference between current & next coordinte
			var differenceX = Math.abs(mouseCoordinates[i].x - mouseCoordinates[i+1].x) - 1;
			var differenceY = Math.abs(mouseCoordinates[i].y - mouseCoordinates[i+1].y) - 1;

			//as long as there is a difference between one of both:
			while (differenceX >= 1 || differenceY >= 1) {

				//todo: change this to switch
				if ((mouseCoordinates[i].x < mouseCoordinates[i+1].x) && (mouseCoordinates[i].y < mouseCoordinates[i+1].y)) {
					var interpolatedCoord = {
						x: mouseCoordinates[i].x + differenceX,
						y: mouseCoordinates[i].y + differenceY
					};
				} else if ((mouseCoordinates[i].x < mouseCoordinates[i+1].x) && (mouseCoordinates[i].y > mouseCoordinates[i+1].y)) {
					var interpolatedCoord = {
						x: mouseCoordinates[i].x + differenceX,
						y: mouseCoordinates[i].y - differenceY
					};
				} else if ((mouseCoordinates[i].x > mouseCoordinates[i+1].x) && (mouseCoordinates[i].y > mouseCoordinates[i+1].y)) {
					var interpolatedCoord = {
						x: mouseCoordinates[i].x - differenceX,
						y: mouseCoordinates[i].y - differenceY
					};
				} else if ((mouseCoordinates[i].x > mouseCoordinates[i+1].x) && (mouseCoordinates[i].y < mouseCoordinates[i+1].y)) {
					var interpolatedCoord = {
						x: mouseCoordinates[i].x - differenceX,
						y: mouseCoordinates[i].y + differenceY
					};
				}

				updatedCoords.push(interpolatedCoord);

				// we only push one new coordinate in steps of 5. For more precision, change this (lower === higher precision).
				if (differenceX >= 0) {
					differenceX -= 20;
				}

				if (differenceY >= 0) {
					differenceY -= 20;
				}
			}

		}
	}

	return updatedCoords
}

var printTrack = function(){

	var interpolatedArrayOfCoordinates = mouseCoordinates.concat(interpolateCoordinates());

	_.forEach(interpolatedArrayOfCoordinates,function(coor){
		if(coor) {
			var newDot = document.createElement('div');
			var newDotClass = {
				'width': '100px',
				'height': '100px',
				'border-radius': '100px',
				'background-color': 'red',
				'position': 'absolute',
				'z-index': 500,
				'top': coor.y,
				'left': coor.x,
				'filter' : 'blur(10px)',
				'-webkit-filter': 'blur(10px)',
				'opacity' : '0.009'
			};

			$(newDot).css(newDotClass);
			$('body').append(newDot);
		}
	})
}

window.onload = function(){
	$('#startButton').on('click', function(){
		startTracking();
	});
	$('#stopButton').on('click', function(){
		stopTracking();
	});

	$('#printButton').on('click', function(){
		printTrack();
	});

}

})();