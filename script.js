const maze = generateMaze(9, 9);

var ctx = document.getElementById("maze").getContext("2d");

var cellSize = 30;
var wallSize = 3;
var cellColor = "#D0ECE7";
var wallColor = "#117A65";

let currentX = 0;
let currentY = 0;

const drawCell = (cell, neighbors, position) => {
	ctx.fillStyle = cellColor;
	ctx.fillRect(position[0], position[1], cellSize, cellSize);

	if (!cell.N && (!neighbors.N || !neighbors.N.S)) {
		ctx.fillStyle = wallColor;
		ctx.fillRect(position[0], position[1], cellSize, wallSize);
	}
	if (!cell.S && (!neighbors.S || !neighbors.S.N)) {
		ctx.fillStyle = wallColor;
		ctx.fillRect(position[0], position[1] + cellSize - wallSize, cellSize, wallSize);
	}
	if (!cell.E && (!neighbors.E || !neighbors.E.W)) {
		ctx.fillStyle = wallColor;
		ctx.fillRect(position[0] + cellSize - wallSize, position[1], wallSize, cellSize);
	}
	if (!cell.W && (!neighbors.W || !neighbors.W.E)) {
		ctx.fillStyle = wallColor;
		ctx.fillRect(position[0], position[1], wallSize, cellSize);
	}
};

const cellNeighbors = (rowI, colI) => {
	const neighbors = {};
	if (rowI > 0) {
		neighbors.N = maze[rowI - 1][colI];
	}
	if (rowI < maze.length - 1) {
		neighbors.S = maze[rowI + 1][colI];
	}
	if (colI < maze[rowI].length - 1) {
		neighbors.E = maze[rowI][colI + 1];
	}
	if (colI > 0) {
		neighbors.W = maze[rowI][colI - 1];
	}
	return neighbors;
};

for (let i = 0; i < maze.length; i++) {
	for (let j = 0; j < maze[i].length; j++) {
		const neighbors = cellNeighbors(i, j);
		drawCell(maze[i][j], neighbors, [currentX, currentY]);
		if (j === maze[i].length - 1) {
			currentX = 0;
		} else {
			currentX += cellSize;
		}
	}
	currentY += cellSize;
}
