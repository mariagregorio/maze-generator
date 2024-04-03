const generateMaze = (sizeX, sizeY) => {
	const maze = new Array(sizeX).fill(0)
	for (let i = 0; i < maze.length; i++) {
		maze[i] = new Array(sizeY).fill(0)
	}
	const stack = [[0, 0]]
	let visited = 0
	const total = sizeX * sizeY

	while (visited < total - 1) {
		const current = peekStack(stack)
		maze[current[0]][current[1]] = { N: 0, S: 0, E: 0, W: 0 }
		visited++
		processCurrentCell(current, stack, sizeX, sizeY, maze)
	}

	return maze
}

const peekStack = (stack) => {
	return stack[stack.length - 1]
}

const processCurrentCell = (current, stack, sizeX, sizeY, maze) => {
	const allowedDirections = getAllowedMoves(current, sizeX, sizeY, maze)

	if (allowedDirections.length === 0) {
		stack.pop()
		current = peekStack(stack)
		return processCurrentCell(current, stack, sizeX, sizeY, maze)
	} else {
		calculateNextMove(current, stack, maze, allowedDirections)
	}
}

const calculateNextMove = (current, stack, maze, allowedDirections) => {
	const nextMoveIndex = Math.floor(Math.random() * allowedDirections.length)
	const nextMove = allowedDirections[nextMoveIndex]
	maze[current[0]][current[1]][nextMove] = 1
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
	stack.push(nextCell)
}

const getAllowedMoves = (cell, sizeX, sizeY, maze) => {
	const allowed = []
	if (cell[0] > 0 && maze[cell[0] - 1][cell[1]] === 0) {
		allowed.push("N")
	}
	if (cell[0] < sizeX - 1 && maze[cell[0] + 1][cell[1]] === 0) {
		allowed.push("S")
	}
	if (cell[1] > 0 && maze[cell[0]][cell[1] - 1] === 0) {
		allowed.push("W")
	}
	if (cell[1] < sizeY - 1 && maze[cell[0]][cell[1] + 1] === 0) {
		allowed.push("E")
	}
	return allowed
}
