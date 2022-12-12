
Array.buildGrid = function(input, rowSplit, colSplit) {
	return input
		.split(rowSplit)
		.map(row => row.split(colSplit));
}

Array.prototype.forEachGrid = function(cb) {
	for (let y = 0; y < this.length; y++) {
		const row = this[y];
		for (let x = 0; x < row.length; x++) {
			const cell = row[x];
			cb(cell, y, x, this);
		}
  }
	return this;
}

Array.prototype.mapGrid = function(cb) {
	const clonedGrid = [];
	for (let y = 0; y < this.length; y++) {
		const row = this[y];
		clonedGrid.push([...row]);
		for (let x = 0; x < row.length; x++) {
			const cell = row[x];
			clonedGrid[y][x] = cb(cell, y, x, this);
		}
  }
	return clonedGrid;
}

Array.prototype.sum = function sum(a, b) {
	return this.reduce((sum, val) => sum + val, 0);
}

Array.prototype.product = function product(a, b) {
	return this.reduce((product, val) => product * val, 1);
}

// STRINGS
exports.intersection = function intersection(str1, str2) {
	return str1
		?.match(new RegExp('[' + str2 + ']', 'g'))
		?.join('')
		?? '';
}

exports.extractAll = function extractAll(input, regex) {
	return [...input.matchAll(new RegExp(regex, 'g'))].reduce((arr, match) => arr.concat(match),[]);
}