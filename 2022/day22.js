const utils = require('../utils');

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const sample = fs.readFileSync(path.resolve(__dirname, 'day22.sample.txt'), 'utf8');

const inp = fs.readFileSync(path.resolve(__dirname, 'day22.input.txt'), 'utf8');

const pivotMap = {
	R: 1,
	L: -1,
}

class Row {
	constructor(row) {
		this.row = row;
		this.validCells = this.row.filter((v, i) => {
			if (v !== ' ' && this.validStart === undefined) {
				this.validStart = i;
			}
			return v !== ' ';
		});
	}

	move(start, steps, direction) {
		let newStartIndex = start - this.validStart;
		for (let i = 0; i < steps; i++) {
			const nextEl = this.validCells?.[newStartIndex + direction];
			if (nextEl === undefined && (newStartIndex + direction) < 0) {
				if (this.validCells[this.validCells.length - 1] === '#') break;
				newStartIndex = this.validCells.length - 1;
			} else if (nextEl === undefined && (newStartIndex + direction) >= this.validCells.length) {
				if (this.validCells[0] === '#') break;
				newStartIndex = 0;
			} else if (nextEl === '#') {
				break;
			} else {
				newStartIndex = newStartIndex + direction;
			}
		}
		return this.validStart + newStartIndex;
	}
}

class Grid {
	constructor(gridRaw) {
		this.grid = Array.buildGrid(gridRaw, '\n', '');
		const startingX = this.grid[0].findIndex(v => v !== ' ');
		this.direction = 0;
		this.position = { x: startingX, y: 0 };
	}

	move(steps) {
		if (this.direction % 2 === 0) { // left or right
			const row = new Row(this.grid[this.position.y]);
			this.position.x = row.move(this.position.x, steps, this.direction === 0 ? 1 : -1);
		} else {
			const row = new Row(this.grid.filterMap(row => [row?.[this.position.x] !== undefined, row?.[this.position.x]]));
			this.position.y = row.move(this.position.y, steps, this.direction === 1 ? 1 : -1);
		}
	}

	pivot(pivotDirection) {
		this.direction = (this.direction + pivotMap[pivotDirection] + 4) % 4;
	}
}

function part1(input) {
	const [gridRaw, code] = input
		.split('\n\n');

	const grid = new Grid(gridRaw);
	
	let movements = code.matchAll(/\d+[RL]/g);
	movements = [...movements].map(v => [parseInt(v[0].slice(0, v[0].length - 1), 10), v[0].slice(v[0].length - 1)]);
	movements.forEach(([steps, pivot], i) => {
		grid.move(steps);
		grid.pivot(pivot);
	});

	if (/\d+$/.test(code)) {
		const movement = code.match(/\d+$/);
		grid.move(parseInt(movement[0], 10));
	}

	grid.grid.logGrid();

	return (1000 * (grid.position.y + 1)) + (4 * (grid.position.x + 1)) + grid.direction;
}

const dirs = [
	{ arrow: '>', axis: 'x', x: 1, y: 1 },
	{ arrow: 'v', axis: 'y', x: -1, y: 1 },
	{ arrow: '<', axis: 'x', x: -1, y: -1 },
	{ arrow: '^', axis: 'y', x: 1, y: -1 },
];

const connectors = [
	[1, 0, 0],
	[-3, 0, 0],
	[1, 1, 1],
	[1, -1, 3],
	[1, 2, 2],
	[1, -2, 2],
	[1, 3, 1],
	[1, -3, 3],
	[-1, 3, 3],
	[-1, -3, 3],
	[-1, 2, 2],
	[-1, -2, 2],
	[-3, 2, 0],
	[-3, -2, 0],
	[-3, 1, 3],
	[-3, -1, 1],
];

const gridParts = [];

class GridPart {
	constructor(index, grid, x, y) {
		this.index = index;
		this.grid = grid;
		this.x = x;
		this.y = y;
		this.outlets = [null, null, null, null];
	}

	setOutlet(direction, outlet) {
		this.outlets[direction] = outlet;
	}

	move(steps, direction, { x: startX, y: startY }) {
		const { axis, x: xOffset, y: yOffset } = dirs[direction];
		for (let i = 0; i < steps; i++) {
			// this.grid[axis === 'y' ? startY + (i) * yOffset : startY][axis === 'x' ? startX + (i) * xOffset : startX] = dirs[direction].arrow;
			const cell = this.grid?.[axis === 'y' ? startY + (i + 1) * yOffset : startY]?.[axis === 'x' ? startX + (i + 1) * xOffset : startX];
			if (cell === '#') {
				return {
					remainingSteps: 0, 
					position: { gridIndex: this.index, x: axis === 'x' ? startX + i * xOffset : startX, y: axis === 'y' ? startY + i * yOffset : startY },
					direction,
				};
			} else if (cell === undefined) {
				const { connectingGridIndex, pivot } = this.outlets[direction];
				const newGrid = gridParts[connectingGridIndex];
				const newDirection = (direction + pivot) % 4;
				let inverted = true;
				if (
					direction === newDirection
					|| newDirection + direction === 3
				) {
					inverted = false;
				}

				let newX, newY;
				const gridSize = this.grid.length - 1;
				let index = axis === 'x' ? startY : startX;
				if (inverted) {
					index = gridSize - index;
				}
				switch (newDirection) {
					case 0:
						newX = 0;
						newY = index;
						break;
					case 2:
						newX = gridSize;
						newY = index;
						break;
					case 1:
						newX = index;
						newY = 0;
						break;
					case 3:
						newX = index;
						newY = gridSize;
						break;
				}

				// check the new grid for a #
				if (newGrid.grid[newY][newX] === '#') {
					return {
						remainingSteps: 0, 
						position: { gridIndex: this.index, x: axis === 'x' ? startX + i * xOffset : startX, y: axis === 'y' ? startY + i * yOffset : startY },
						direction,
					}; 
				}

				// if no # is found, return the remaining steps in the new grid
				return {
					remainingSteps: steps - (i + 1), 
					position: { gridIndex: connectingGridIndex, x: newX, y: newY },
					direction: newDirection,
				};
			}
			// this.grid[axis === 'y' ? startY + (i + 1) * yOffset : startY][axis === 'x' ? startX + (i + 1) * xOffset : startX] = dirs[direction].arrow;
		}

		return {
			remainingSteps: 0, 
			position: { gridIndex: this.index, x: axis === 'x' ? startX + steps * xOffset : startX, y: axis === 'y' ? startY + steps * yOffset : startY },
			direction,
		};
	}
}

function part2(input, gridSize) {
	const [gridRaw, code] = input
		.split('\n\n');

	let position = { x: 0, y: 0, gridIndex: 0 };
	let direction = 0;

	const grid = new Grid(gridRaw);

	let index = 0;
	for (let y = 0; y < grid.grid.length; y += gridSize) {
		const rowChunk = grid.grid.slice(y, y + gridSize);
		for (let x = 0; x < rowChunk[0].length; x += gridSize) {
			if (rowChunk[0][x] !== ' ') {
				const chunk = rowChunk.map(row => row.slice(x, x + gridSize));
				gridParts.push(new GridPart(index, chunk, x / gridSize, y / gridSize));
				index += 1;
			}
		}
	}

	gridParts.forEach((gridPart) => {
		dirs.forEach((dir, i) => {
			for (let j = 0; j < connectors.length; j++) {
				const connector = connectors[j];
				let xOffset, yOffset, pivot;
				if (dir.axis === 'y') {
					[yOffset, xOffset, pivot] = connector;
				} else {
					[xOffset, yOffset, pivot] = connector;
				}
				const connectingCoordinates = { x: gridPart.x + (xOffset * dir.x), y: gridPart.y + (yOffset * dir.y)};
				const connectingGridIndex = gridParts.findIndex(gp => gp.x === connectingCoordinates.x && gp.y === connectingCoordinates.y);
				if (connectingGridIndex !== -1) {
					gridPart.setOutlet(i, { connectingGridIndex, pivot });
					break;
				}
			}
		});
	});

	let movements = code.matchAll(/\d+[RL]/g);
	movements = [...movements].map(v => [parseInt(v[0].slice(0, v[0].length - 1), 10), v[0].slice(v[0].length - 1)]);
	movements.forEach(([steps, pivot], i) => {
		// if (i > 40) return;
		let remainingSteps = steps;
		while (remainingSteps > 0) {
			const currentGrid = gridParts[position.gridIndex];
			const results = currentGrid.move(remainingSteps, direction, position);
			remainingSteps = results.remainingSteps;
			direction = results.direction;
			position = results.position;
		}

		// gridParts[position.gridIndex].grid[position.y][position.x] = i;
		direction = (direction + pivotMap[pivot] + 4) % 4;
	});

	if (/\d+$/.test(code)) {
		const movement = code.match(/\d+$/);
		let remainingSteps = parseInt(movement[0], 10);
		while (remainingSteps > 0) {
			const currentGrid = gridParts[position.gridIndex];
			const results = currentGrid.move(remainingSteps, direction, position);
			remainingSteps = results.remainingSteps;
			direction = results.direction;
			position = results.position;
		}
	}

	const currentGrid = gridParts[position.gridIndex];
	gridParts.forEach(gp => {
		console.log('\n', gp.outlets);
		// gp.grid.logGrid();
	});
	return (1000 * (position.y + currentGrid.y * gridSize + 1)) + (4 * (position.x + currentGrid.x * gridSize + 1)) + direction;
}

function runTests() {
	// side 0
	assert.deepStrictEqual(gridParts[0].move(1, 0, { x: 49, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 1, x: 0, y: 0 },
		direction: 0,
	});
	assert.deepStrictEqual(gridParts[0].move(1, 1, { x: 49, y: 49 }), {
		remainingSteps: 0, 
		position: { gridIndex: 2, x: 49, y: 0 },
		direction: 1,
	});
	assert.deepStrictEqual(gridParts[0].move(1, 2, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 3, x: 0, y: 49 },
		direction: 0,
	});
	assert.deepStrictEqual(gridParts[0].move(1, 3, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 5, x: 0, y: 0 },
		direction: 0,
	});

	// side 1
	assert.deepStrictEqual(gridParts[1].move(1, 0, { x: 49, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 4, x: 49, y: 49 },
		direction: 2,
	});
	assert.deepStrictEqual(gridParts[1].move(1, 1, { x: 49, y: 49 }), {
		remainingSteps: 0, 
		position: { gridIndex: 2, x: 49, y: 49 },
		direction: 2,
	});
	assert.deepStrictEqual(gridParts[1].move(1, 2, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 0, x: 49, y: 0 },
		direction: 2,
	});
	assert.deepStrictEqual(gridParts[1].move(1, 3, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 5, x: 0, y: 49 },
		direction: 3,
	});

	// side 2
	assert.deepStrictEqual(gridParts[2].move(1, 0, { x: 49, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 1, x: 0, y: 49 },
		direction: 3,
	});
	assert.deepStrictEqual(gridParts[2].move(1, 1, { x: 49, y: 49 }), {
		remainingSteps: 0, 
		position: { gridIndex: 4, x: 49, y: 0 },
		direction: 1,
	});
	assert.deepStrictEqual(gridParts[2].move(1, 2, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 3, x: 0, y: 0 },
		direction: 1,
	});
	assert.deepStrictEqual(gridParts[2].move(1, 3, { x: 1, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 0, x: 1, y: 49 },
		direction: 3,
	});

	// side 3
	assert.deepStrictEqual(gridParts[3].move(1, 0, { x: 49, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 4, x: 0, y: 0 },
		direction: 0,
	});
	assert.deepStrictEqual(gridParts[3].move(1, 1, { x: 49, y: 49 }), {
		remainingSteps: 0, 
		position: { gridIndex: 5, x: 49, y: 0 },
		direction: 1,
	});
	assert.deepStrictEqual(gridParts[3].move(1, 2, { x: 0, y: 2 }), {
		remainingSteps: 0, 
		position: { gridIndex: 0, x: 0, y: 47 },
		direction: 0,
	});
	assert.deepStrictEqual(gridParts[3].move(1, 3, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 2, x: 0, y: 0 },
		direction: 0,
	});

	// side 4
	assert.deepStrictEqual(gridParts[4].move(1, 0, { x: 49, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 1, x: 49, y: 49 },
		direction: 2,
	});
	assert.deepStrictEqual(gridParts[4].move(1, 1, { x: 48, y: 49 }), {
		remainingSteps: 0, 
		position: { gridIndex: 5, x: 49, y: 48 },
		direction: 2,
	});
	assert.deepStrictEqual(gridParts[4].move(1, 2, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 3, x: 49, y: 0 },
		direction: 2,
	});
	assert.deepStrictEqual(gridParts[4].move(1, 3, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 2, x: 0, y: 49 },
		direction: 3,
	});

	// side 5
	assert.deepStrictEqual(gridParts[5].move(1, 0, { x: 49, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 4, x: 0, y: 49 },
		direction: 3,
	});
	assert.deepStrictEqual(gridParts[5].move(1, 1, { x: 47, y: 49 }), {
		remainingSteps: 0, 
		position: { gridIndex: 1, x: 47, y: 0 },
		direction: 1,
	});
	assert.deepStrictEqual(gridParts[5].move(1, 2, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 0, x: 0, y: 0 },
		direction: 1,
	});
	assert.deepStrictEqual(gridParts[5].move(1, 3, { x: 0, y: 0 }), {
		remainingSteps: 0, 
		position: { gridIndex: 3, x: 0, y: 49 },
		direction: 3,
	});
}

// const result = part1(sample);
// const result = part1(inp);
const result = part2(sample, 4);

// const result = part2(inp, 50);
// runTests();
console.log(result);