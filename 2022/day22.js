const utils = require('../utils');

const fs = require('fs');
const path = require('path');

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

const dirs = ['>', 'v', '<', '^'];

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

function part2(input) {
	return input;
}

// const result = part1(sample);
const result = part1(inp);
console.log(result);