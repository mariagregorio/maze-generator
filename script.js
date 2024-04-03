const mazeRows = 9
const mazeCols = 15

var cellSize = 30
var wallSize = 4
var boardColor = "#D0ECE7"
var wallColor = "#117A65"

let currentX = 0
let currentY = wallSize * 2

const maze = generateMaze(mazeRows, mazeCols)

var ctx = document.getElementById("maze").getContext("2d")

const drawBoard = (rows, cols, cellSize) => {
	ctx.fillStyle = boardColor
	ctx.fillRect(currentX, currentY - wallSize, cellSize * cols, cellSize * rows)
	ctx.fillStyle = wallColor
	ctx.fillRect(currentX, currentY - wallSize * 2, cellSize * cols, wallSize)
	ctx.fillStyle = wallColor
	ctx.fillRect(
		currentX + cellSize * cols,
		currentY - wallSize * 2,
		wallSize,
		cellSize * rows + wallSize * 2
	)
}

const drawWalls = (cell, neighbors, position) => {
	if (!cell.S && (!neighbors.S || !neighbors.S.N)) {
		ctx.fillStyle = wallColor
		ctx.fillRect(position[0], position[1] + cellSize - wallSize, cellSize, wallSize)
	}
	if (!cell.W && (!neighbors.W || !neighbors.W.E)) {
		ctx.fillStyle = wallColor
		ctx.fillRect(position[0], position[1] - wallSize, wallSize, cellSize + wallSize)
	}
}

const cellNeighbors = (rowI, colI) => {
	const neighbors = {}
	if (rowI > 0) {
		neighbors.N = maze[rowI - 1][colI]
	}
	if (rowI < maze.length - 1) {
		neighbors.S = maze[rowI + 1][colI]
	}
	if (colI < maze[rowI].length - 1) {
		neighbors.E = maze[rowI][colI + 1]
	}
	if (colI > 0) {
		neighbors.W = maze[rowI][colI - 1]
	}
	return neighbors
}

const drawMazeWalls = () => {
	for (let i = 0; i < maze.length; i++) {
		for (let j = 0; j < maze[i].length; j++) {
			const neighbors = cellNeighbors(i, j)
			drawWalls(maze[i][j], neighbors, [currentX, currentY])
			if (j === maze[i].length - 1) {
				currentX = 0
			} else {
				currentX += cellSize
			}
		}
		currentY += cellSize
	}
}

drawBoard(mazeRows, mazeCols, cellSize)
drawMazeWalls()
