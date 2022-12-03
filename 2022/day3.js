

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const { sum, intersection } = require('./utils');

function getLetterScore(char) {
	const isUpper = char.toUpperCase() === char;
	return char.charCodeAt(0) - (isUpper ? 38 : 96);
}

function main(inp) {
	return inp
		.split('\n')
		/* PART 1 */
		// .map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)])
		/* PART 2 */
		.reduce((chunks, item) => {
			chunks[chunks.length - 1].length > 2 ? chunks.push([item]) : chunks[chunks.length - 1].push(item);
			return chunks;
		}, [[]])
		.map(chunk => chunk.reduce(intersection))
		.map(letters => letters[0])
		.map(getLetterScore)
		.reduce(sum);
}

console.log(main(input));