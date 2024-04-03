var CELL_SIZE = 30
var WALL_SIZE = 4
var BOARD_COLOR = "#D0ECE7"
var WALL_COLOR = "#117A65"

let currentX
let currentY

const canvas = document.getElementById("maze")
const ctx = canvas.getContext("2d")

const resetMazeCanvas = () => {
	currentX = 0
	currentY = WALL_SIZE * 2
}

const drawBoard = (rows, cols, cellSize, wallSize) => {
	ctx.fillStyle = BOARD_COLOR
	ctx.fillRect(currentX, currentY - wallSize, cellSize * cols, cellSize * rows)
	ctx.fillStyle = WALL_COLOR
	ctx.fillRect(currentX, currentY - wallSize * 2, cellSize * cols, wallSize)
	ctx.fillStyle = WALL_COLOR
	ctx.fillRect(
		currentX + cellSize * cols,
		currentY - wallSize * 2,
		wallSize,
		cellSize * rows + wallSize * 2
	)
}

const drawWalls = (cell, neighbors, position, cellSize, wallSize) => {
	if (!cell.S && (!neighbors.S || !neighbors.S.N)) {
		ctx.fillStyle = WALL_COLOR
		ctx.fillRect(position[0], position[1] + cellSize - wallSize, cellSize, wallSize)
	}
	if (!cell.W && (!neighbors.W || !neighbors.W.E)) {
		ctx.fillStyle = WALL_COLOR
		ctx.fillRect(position[0], position[1] - wallSize, wallSize, cellSize + wallSize)
	}
}

const cellNeighbors = (rowI, colI, maze) => {
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

const drawMazeWalls = (cellSize, wallSize, maze) => {
	for (let i = 0; i < maze.length; i++) {
		for (let j = 0; j < maze[i].length; j++) {
			const neighbors = cellNeighbors(i, j, maze)
			drawWalls(maze[i][j], neighbors, [currentX, currentY], cellSize, wallSize)
			if (j === maze[i].length - 1) {
				currentX = 0
			} else {
				currentX += cellSize
			}
		}
		currentY += cellSize
	}
}

const resizeCanvas = (rows, cols) => {
	canvas.width = cols * CELL_SIZE + WALL_SIZE;
	canvas.height = rows * CELL_SIZE + WALL_SIZE * 2;
}

const rowsInput = document.getElementById("mazeRows")
const colsInput = document.getElementById("mazeCols")
const createBtn = document.getElementById("createBtn")
const messageElement = document.getElementById("message")

createBtn.addEventListener("click", (_e) => {
	const rows = Number(rowsInput.value);
	const cols = Number(colsInput.value);
	messageElement.replaceChildren()
	if ((rows < 2 || rows > 50) || (cols < 2 || cols > 50)) {
		const message = document.createTextNode("Rows and columns number must be between 2 and 50.")
		messageElement.appendChild(message)
	} else {
		resizeCanvas(rows, cols)
		resetMazeCanvas()
		const mazeGenerator = new MazeGenerator(rows, cols)
		mazeGenerator.generateMaze()
		const maze = mazeGenerator.maze
		drawBoard(rows, cols, CELL_SIZE, WALL_SIZE)
		drawMazeWalls(CELL_SIZE, WALL_SIZE, maze)
	}
})


