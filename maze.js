class Stack {
	constructor () {
		this.stack = []
	}

	pop() {
		return this.stack.pop()
	}

	push(item) {
		this.stack.push(item)
	}

	peekStack() {
		return this.stack[this.stack.length - 1]
	}
}

class MazeGenerator {
	constructor (rows, cols) {
		this.rows = rows
		this.cols = cols
		this.maze = new Array(this.rows).fill(0)
		for (let i = 0; i < this.maze.length; i++) {
			this.maze[i] = new Array(this.cols).fill(0)
		}
		this.stack = new Stack()
		this.stack.push([0,0])
		this.visited = 0
		this.total = rows * cols
	}

	generateMaze() {
		while (this.visited < this.total - 1) {
			const current = this.stack.peekStack()
			this.maze[current[0]][current[1]] = { N: 0, S: 0, E: 0, W: 0 }
			this.visited++
			this.processCurrentCell(current)
		}
	}

	processCurrentCell(current) {
		const allowedDirections = this.getAllowedMoves(current)
		console.log(allowedDirections)
	
		if (allowedDirections.length === 0) {
			this.stack.pop()
			current = this.stack.peekStack()
			return this.processCurrentCell(current)
		} else {
			this.calculateNextMove(current, allowedDirections)
		}
	}

	calculateNextMove (current, allowedDirections) {
		const nextMoveIndex = Math.floor(Math.random() * allowedDirections.length)
		const nextMove = allowedDirections[nextMoveIndex]
		this.maze[current[0]][current[1]][nextMove] = 1
		const nextCell = []
	
		switch (nextMove) {
			case "N":
				nextCell[0] = current[0] - 1
				nextCell[1] = current[1]
				break
			case "S":
				nextCell[0] = current[0] + 1
				nextCell[1] = current[1]
				break
			case "W":
				nextCell[0] = current[0]
				nextCell[1] = current[1] - 1
				break
			case "E":
				nextCell[0] = current[0]
				nextCell[1] = current[1] + 1
				break
			default:
				break
		}
		this.stack.push(nextCell)
	}
	
	getAllowedMoves = (cell) => {
		const allowed = []
		if (cell[0] > 0 && this.maze[cell[0] - 1][cell[1]] === 0) {
			allowed.push("N")
		}
		if (cell[0] < this.rows - 1 && this.maze[cell[0] + 1][cell[1]] === 0) {
			allowed.push("S")
		}
		if (cell[1] > 0 && this.maze[cell[0]][cell[1] - 1] === 0) {
			allowed.push("W")
		}
		if (cell[1] < this.cols - 1 && this.maze[cell[0]][cell[1] + 1] === 0) {
			allowed.push("E")
		}
		return allowed
	}
}
