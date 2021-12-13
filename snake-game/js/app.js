const svgns = "http://www.w3.org/2000/svg",
	svg = document.createElementNS(svgns, "svg"),
	rectSize = 31,
	matrixSize = 15,
	matrixLimit = matrixSize - 1;
	speedMs = 250;

svg.setAttributeNS(null, 'width', rectSize * matrixSize);
svg.setAttributeNS(null, 'height', rectSize * matrixSize);
svg.setAttributeNS(null, 'style', 'border: ' + rectSize + 'px solid #ccc;');

document.body.appendChild(svg);

let currentX = -1,
	currentY = 0,
	nextMoveX = 1,
	nextMoveY = 0,
	snakeL = 5,
	swipe = 0,
	gameIsOver = false;

const rectArray = [];

const drawPoint = (x, y) => {
	var rect = [document.createElementNS(svgns, 'rect'), x, y];
	var rectObj = rect[0];
	rectObj.setAttributeNS(null, 'x', x * rectSize);
	rectObj.setAttributeNS(null, 'y', y * rectSize);
	rectObj.setAttributeNS(null, 'height', rectSize);
	rectObj.setAttributeNS(null, 'width', rectSize);
	rectObj.setAttributeNS(null, 'class', 'snake');
	rectArray.push(rect);
	svg.appendChild(rectObj);
	if (rectArray.length > snakeL) {
		svg.removeChild(rectArray[0][0]);
		rectArray.shift();
	}
}

const setApple = () => {
	const appleX = Math.floor((Math.random() * matrixSize)),	
		appleY = Math.floor((Math.random() * matrixSize));

	apple = [document.createElementNS(svgns, 'rect'), appleX, appleY];
	const thisApple = apple[0];
	thisApple.setAttributeNS(null, 'x', appleX * rectSize);
	thisApple.setAttributeNS(null, 'y', appleY * rectSize);
	thisApple.setAttributeNS(null, 'height', rectSize);
	thisApple.setAttributeNS(null, 'width', rectSize);
	thisApple.setAttributeNS(null, 'class', 'apple');
	svg.appendChild(thisApple);
}

const gameOver = () => {
	svg.setAttributeNS(null, 'class', 'game-over');
	clearInterval(timing);
	alert('GAME OVER!\nYour result is ' + snakeL + '!');
	gameIsOver = true;
	return;
}

const controllingSnake = () => {
	let nextX = currentX + nextMoveX,
		nextY = currentY + nextMoveY;

	rectArray.forEach(function(element){
		if (nextX === element[1] && nextY === element[2]) {
			gameOver();
		};
	});

	if (nextY < 0 || nextY > matrixLimit || nextX < 0 || nextX > matrixLimit) {
		gameOver();
	}
	
	if (!gameIsOver) {
		if (currentX === apple[1] && currentY === apple[2]) {
			snakeL++;
			svg.removeChild(apple[0]);
			setApple();
		}
		drawPoint(nextX, nextY);
		currentX = nextX;
		currentY = nextY;
	}
}

const timing = setInterval(controllingSnake, speedMs);

const changeDirection = (dirCode) => {
	switch (dirCode) {
		case 37:
			if (nextMoveX !== 1) {
				nextMoveX = -1;
				nextMoveY = 0;
			}
			break;
		case 38:
			if (nextMoveY !== 1) {
				nextMoveX = 0;
				nextMoveY = -1;	
			}
			break;
		case 39:
			if (nextMoveX !== -1) {
				nextMoveX = 1;
				nextMoveY = 0;
			}
			break;
		case 40:
			if (nextMoveY !== -1) {
				nextMoveX = 0;
				nextMoveY = 1;	
			}
	}
}

document.onkeydown = (event) => {
	const keyEvent = event || window.event;
	changeDirection(keyEvent.keyCode);
};

setApple();