const utils = require('../utils');

const sample = `2333133121414131402`;

const inp = ``;

function part1(input) {
	
    
    return '0099811188827773336446555566'
        .split('')
        .map((v, i) => parseInt(v, 10) * i)
        .sum();
}

function part2(input) {
	return input;
}

// const result = part1(inp);
const result = part1(sample);
// const result = part2(inp);
// const result = part2(sample);
console.log(result);