const utils = require('../utils');

const sample = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

const inp = `#.########################################################################################################################
#><..<.<<^v><<^>>>^^^<v<>..^<<^<<^^<.<vv><vv<v^>.<>^<v>.<>^v>>>v^><.>.<<>>>^v<>vv<vv>^v^vvv>vv<<v><^<>>^^<><^^><.^v>.^>.<#
#>>v<vv<<<<<v<^><<>v.^>^<<<.<^.<<^<.^v^<^^>v<v>v^<v^^v<><>^>>><<^v^^<<v>v^><...^<<<><>>^v>^>><^<<.^v^>v>>>^><vv>^v^.^v><<#
#>^^<>^<<<v>^>vv.>^.^<vv^vvv>vv<.^>><v<^>.v..^^^^.>.<<>.<vv.^v^>^^>^.>^.^^^..>>><^<^>><^<<<><v><.^v<^v.>^<v^^.<^>>>>v.^v<#
#.>v<<<.vv^v><vv^.<.<<<vvv^.<^^v^<v>^v<.<^^>^.v>>v.<>v<>.<v<^<^v.>^.v^v>^<>>>>vv>v<><<<<><>>><vv<v>><<.v^>.v^vv^>^v<><<^>#
#<v>^<<v>v^>v<<><^vvv<<^.>v<v^>vv^>.vv^<^><<<<><v^><^..v>vv<^>>^>.v^<vv^^^.^^v>>..v>>.<^v^>.>>>>>v..^<<^<<vv^^>.v<v<>v<<>#
#<>>v>^<.^^^^<<v<<>><<^^>^^.^^^^v<^^<><v>>.>vv^^v>v>v<v^^^>v^vv<<vv>.<vv>^.>v<v<<<v^^.v<<<<v^<^^.^v<vvv^><<>^>^><v<^vv.^<#
#<>^vv^>>v>v<^>^<^.^.^<.v>v.^<<<<v><>v.<<<..>.<>>^.^vv^v<^^v.vv<>>vvvv>.^<v^<<<v>^^vv<^v^v<.><v>^.<v^<^>^v<^vv><><<^^.<>.#
#.<><>^^<^v^^>v<><><>^.<^<<.<^vvv^^.<.^.^<.^^><<.>><>>>>^^<>v>..v<v>>^>vv.>v^>>v.>^..<>..vv>^<vv>>><^.vv^><>^^^^vvv^v^^<<#
#<^>.<^^<^v<><v.<>^<^.>>>>^<.>vv^.v^<>v>^<<v<<<v.^v>vvvv<>^<<<<.v.v><<.^v^<v>.<^<<^<v<<<^><v<v>>>^<^^<^^^^vv<v<^>^<vv>v^<#
#><v>.>.v><<^>v^><.^<<>^v>>.<^^^<<<><<<^<^^v<.>^vv.>^vvv^v<<v>vv<<.^v^vv>.v^v><v<v.^.<.vv>^>>^>>^v^^^.><^v<v^<v>><>.>v^<<#
#>>>>vv><^<vv>>^<v.><>><^^<v^>^^<vv>><v>>><>>vvv<^.<^v>^.<<v.<..^v^^<v<v^>vv^<^.^^^<.^vv..<<>><^<v<^>^^^<^^v^>^>>v><><<.<#
#>v>><>.v>^><<^.>>>vvv^<.v<>vv^<^^<<vv<>v^<.^v>.v>^<v<<vv<^vv<.<>>^.v^.>><..<v^^>^^^^<>^^.^.>vv^<v^^.vv..<^^v<vv.^<^^v.>>#
#<>^^vvvv^><>^vv<><.<<<>^.<.v^<<vv^v^vvvv<>>v<^^v>^^v>^>^v<<.>.<>.^v.<^<<.^v^^><v<<^v<^><><^>>>.<<<v..v><>^vvv<^.<v<.>><.#
#<<^<>v>v^v<v^v^^^>.v>..^^<>vv<<^v>^<.^^.vv<.<.<<<<vv><><..>v><>>>v.v<^^>v>>^<v.<<.>v<^<^^>v>>>v^>^v><><<^<^.vvvv>>^>^..>#
#<><>^^.<<v<^v>^^.^v.v<>^^vvv<<<<^>^<><.vv<v^<v.^.v^vv^<.^^^<>v.^<.>^>.>.^<<<<<^^<^.^.^>.^>.>>vvv<.<v<.vv><>^><>><^<>.<^<#
#<<vv^^^<>^^^<vv<vv^<^v.>v<>>>vvv><^<<<>^^^.<<.vv><><^<<v>>>^><..<v.v>>^<<>>>>^>v^.>.><v>>^^vv<>v.^^vv<>>^<^>v>vv><<>><^>#
#>v.<<><^<>.>><>><.^^v>^^v^>>vv>vv>>><^...^vv^v^.>vv..<vv<<<^^^><^<v.><>v.v^^^^v>^^<^<<^v>^>.v^>.<^<<>^^.<<<>^<v.^v^.><^>#
#><^^>>^<>^<>>vv>^.^vvv^<vv><>^^^<<v^^>v<^>v<<^v^><^v<>v^.^><>v<^vv>v<>v<><>^>>.<^>^>.<vv<>>^.<^<^vvv.v<v<v>^v^^>.>v>.^<>#
#<<<<v....>^><>v^>v>.<.>v<^<v<<^^>>>^^vv<^vv^^^<<<<>><<^<<^v>v.>..v>v<>vv.>v<v>^^^v<^^^vvvvv^<.>vv^^.vv>v<.^^<<<<v^<>^v^>#
#<<<vvv^^.<v^^<.vv^>v^<<v<<v.<^<<^>^<v<<>.^>.><v^>>^^^v<v.<^v>^<>>.^^><^<<.>v^v>.<>.^vv.^>^v.^^^^.<.vv^vv<vv^<<<^><vvv><<#
#.vv>^.vv<<<<.<vv^.^^>v.><v^^v<<>v><.<v^><v<vv^v<><<<>.>v^^.^^<v>>^<^v^^<^^v<>^^v>><>.><^<^^>>v<<vv<v>^^^^><><vv<>><<<>^<#
#>vv^>.^<><<..<v^vv>>^<><.v^<^>^><v>v.v^^<<>>v<vv><^v>.<<vv>v^.<<v^^^^v^<.>.>v.>>v..<>><v.^^<v<^v>v^^v^<<^>>>v>>^v<^<>.<.#
#>v^<^.v^>><<><^<v<^^<v>^^..><<>vv^^><vv><<<.><.<^.<<<>v<.>vv<<v^.^v^.<v.vv>>>^v>.^>.^><^^vv<>v<v>>><^>^^^vvv^v.v>v<<<>v<#
#>^v<>.>.><^>>vv.>v^><>><<>v^^v>^^vv>v>^.<<v<.v<^<<^^v<vvv<^^>^^<>^>^v^vv.><<^>.<>^>v<^<.>>vvv>>>v^<>vv.<>v>^^>vv^>>vv<v<#
#<v>vv.vv^>>v^v<<>^<v^<<<<^<.^vvv<v^^>><<<<>v>^<v<<<v>><^<..>.v^>>vv^>>>>v.v.>^^^<v<^>^^<^<^<><v>^>>>>..^vv>.^<>v^>>v>.><#
########################################################################################################################.#`;

// const directions = [
// 	[0, -1],
// 	[-1, 0],
// 	[0, 0],
// 	[0, 1],
// 	[1, 0],
// ];

// FAILURE // I would like to understand why this didn't work
// function part1(input) {
// 	const start = { x: 0, y: -1};
// 	let grid = Array.buildGrid(input, /#*\s+#*/, '');
// 	grid = grid.slice(1, grid[grid.length - 2].length - 1);
// 	gridWidth = grid[0].length;
// 	gridHeight = grid.length;
// 	const end = { x: gridWidth - 1, y: grid.length };


// 	function spaceIsOpen(round, x, y) {
// 		if (x === 0 && y === -1) return true;
// 		if (!grid?.[y]?.[x]) return false;
// 		// left
// 		const leftX = ((round * -1) + x + (gridWidth * round)) % gridWidth;
// 		if (grid?.[y]?.[leftX] === '>') return false;
// 		// right
// 		const rightX = (round + x) % gridWidth;
// 		if (grid?.[y]?.[rightX] === '<') return false;
// 		// top
// 		const topY = ((round * -1) + y + (gridHeight * round)) % gridHeight;
// 		if (grid?.[topY]?.[x] === 'v') return false;
// 		// bottom
// 		const bottomY = (round + y) % gridHeight;
// 		if (grid?.[bottomY]?.[x] === '^') return false;
// 		return true;
// 	}

// 	const stack = [{ ...start, round: 0 }];
// 	let shortestRounds = Infinity;
// 	while (stack.length) {
// 		const node = stack.pop();
// 		const manhatDistFromEnd = (gridWidth - node.x - 1) + (gridHeight - node.y - 1);
// 		if ((node.round + manhatDistFromEnd) > shortestRounds) {
// 			continue;
// 		}

// 		// end condition
// 		if (node.x === end.x && node.y + 1 === end.y && node.round + 1 < shortestRounds) {
// 			shortestRounds = node.round + 1;
// 		}

// 		// adjacent nodes
// 		directions.forEach(([x, y]) => {
// 			const isSpaceOpen = spaceIsOpen(node.round + 1, node.x + x, node.y + y);
// 			if (isSpaceOpen && node.round + 1 < 30) {
// 				stack.push({ x: node.x + x, y: node.y + y, round: node.round + 1 });
// 			}
// 		});

// 	}
	
// 	return shortestRounds;
// }

function createBoardAfter(board, round) {
	const height = board.length;
	const width = board[0].length;

	const newboard = Array(height).fill().map(() => Array(width).fill())
	
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
				newboard[y][x] = board[y][x] === '#' ? '#' : '.'
		}
	}

	for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
					if (board[y][x] === '>') {
							newboard[y][(x - 1 + round) % (width - 2) + 1] = '>'
					}

					if (board[y][x] === '<') {
							newboard[y][((x - 1 - round) % (width - 2) + (width - 2)) % (width - 2) + 1] = '<'
					}

					if (board[y][x] === 'v') {
							newboard[(y - 1 + round) % (height - 2) + 1][x] = 'v'
					}

					if (board[y][x] === '^') {
							newboard[((y - 1 - round) % (height - 2) + (height - 2)) % (height - 2) + 1][x] = '^'
					}
			}
	}

	return newboard
}

function calculatePathDuration(board, start, destination, round = 0) {
	const height = board.length;
	const width = board[0].length;

	const optimalPath = Array(height).fill().map(() => Array(width).fill(-1));

	optimalPath[start[0]][start[1]] = 0;
	
	for (let minute = 0; optimalPath[destination[0]][destination[1]] === -1; minute++) {
			const mboard = createBoardAfter(board, round + minute + 1);
			const update = [];

			for (let y = 0; y < height; y++) {
					for (let x = 0; x < width; x++) {
							if (optimalPath[y][x] === minute) {
									for (const [dy, dx] of [[0, 0],[-1, 0],[1, 0],[0, -1],[0, 1]]) {
											if (mboard[y + dy]?.[x + dx] === '.') {
													update.push([y + dy, x + dx]);
											}    
									}
							}
					}   
			}

			for (const [y, x] of update) {
					optimalPath[y][x] = minute + 1;
			}
	}

	return optimalPath[destination[0]][destination[1]]
}

function part1(input) {
	const board = Array.buildGrid(input, '\n', '');

	const height = board.length;
	const width = board[0].length;
	const start = [0, 1];
	const destination = [height - 1, width - 2];
	let round = 0;


	return calculatePathDuration(board, start, destination, round);
}

function part2(input) {
	const board = Array.buildGrid(input, '\n', '');

	const height = board.length;
	const width = board[0].length;
	const start = [0, 1];
	const destination = [height - 1, width - 2];
	let round = 0;


	round = calculatePathDuration(board, start, destination, round);
	round += calculatePathDuration(board, destination, start, round);
	round += calculatePathDuration(board, start, destination, round);
	return round;
}

const result = part2(inp);
// const result = part1(sample)
console.log(result);