const { extractAll } = require('../utils')

const stacks1 = `    [D]    
[N] [C]    
[Z] [M] [P]`;

const stacks = `                [B] [L]     [J]    
            [B] [Q] [R]     [D] [T]
            [G] [H] [H] [M] [N] [F]
        [J] [N] [D] [F] [J] [H] [B]
    [Q] [F] [W] [S] [V] [N] [F] [N]
[W] [N] [H] [M] [L] [B] [R] [T] [Q]
[L] [T] [C] [R] [R] [J] [W] [Z] [L]
[S] [J] [S] [T] [T] [M] [D] [B] [H]`

const instructions1 = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const instructions = `move 5 from 4 to 5
move 2 from 5 to 8
move 2 from 9 to 1
move 2 from 9 to 1
move 1 from 5 to 3
move 10 from 5 to 8
move 1 from 4 to 7
move 1 from 1 to 2
move 5 from 3 to 7
move 1 from 2 to 8
move 21 from 8 to 5
move 13 from 5 to 7
move 2 from 9 to 4
move 1 from 7 to 4
move 5 from 1 to 4
move 1 from 5 to 7
move 2 from 2 to 7
move 1 from 3 to 2
move 1 from 1 to 6
move 7 from 5 to 9
move 16 from 7 to 4
move 7 from 9 to 3
move 1 from 7 to 5
move 1 from 3 to 8
move 3 from 2 to 7
move 1 from 8 to 9
move 3 from 3 to 6
move 21 from 4 to 9
move 1 from 5 to 7
move 4 from 4 to 9
move 8 from 6 to 3
move 6 from 7 to 1
move 12 from 9 to 8
move 6 from 7 to 2
move 3 from 6 to 5
move 1 from 6 to 9
move 4 from 8 to 6
move 3 from 8 to 5
move 4 from 1 to 8
move 4 from 6 to 1
move 2 from 1 to 3
move 1 from 5 to 8
move 2 from 2 to 8
move 5 from 8 to 3
move 4 from 2 to 7
move 5 from 8 to 1
move 2 from 1 to 7
move 1 from 8 to 2
move 2 from 1 to 7
move 11 from 9 to 2
move 1 from 8 to 5
move 2 from 9 to 4
move 3 from 9 to 5
move 2 from 5 to 1
move 6 from 5 to 8
move 2 from 4 to 2
move 1 from 5 to 6
move 7 from 1 to 8
move 2 from 2 to 7
move 13 from 8 to 1
move 16 from 3 to 1
move 3 from 2 to 1
move 12 from 7 to 6
move 15 from 1 to 8
move 2 from 3 to 8
move 16 from 1 to 2
move 24 from 2 to 8
move 1 from 1 to 5
move 1 from 5 to 8
move 3 from 6 to 7
move 26 from 8 to 3
move 20 from 3 to 9
move 1 from 2 to 9
move 16 from 9 to 3
move 14 from 3 to 1
move 13 from 1 to 6
move 3 from 3 to 4
move 3 from 9 to 4
move 1 from 7 to 8
move 5 from 8 to 2
move 8 from 8 to 5
move 18 from 6 to 1
move 4 from 8 to 5
move 6 from 4 to 1
move 2 from 2 to 5
move 5 from 3 to 8
move 5 from 8 to 7
move 2 from 5 to 8
move 5 from 5 to 4
move 3 from 2 to 8
move 22 from 1 to 2
move 1 from 1 to 2
move 5 from 8 to 2
move 2 from 5 to 2
move 1 from 1 to 6
move 5 from 5 to 2
move 1 from 9 to 8
move 5 from 4 to 1
move 6 from 6 to 9
move 3 from 1 to 9
move 1 from 1 to 7
move 8 from 9 to 6
move 6 from 7 to 1
move 5 from 6 to 5
move 27 from 2 to 1
move 4 from 5 to 7
move 9 from 1 to 5
move 1 from 9 to 1
move 3 from 6 to 2
move 9 from 2 to 1
move 2 from 7 to 2
move 1 from 8 to 7
move 10 from 5 to 9
move 1 from 9 to 7
move 25 from 1 to 8
move 6 from 7 to 4
move 11 from 1 to 7
move 3 from 8 to 1
move 3 from 2 to 6
move 3 from 8 to 9
move 11 from 8 to 6
move 1 from 2 to 6
move 12 from 6 to 4
move 13 from 4 to 5
move 1 from 6 to 1
move 3 from 7 to 5
move 5 from 8 to 7
move 1 from 7 to 1
move 5 from 1 to 6
move 3 from 6 to 4
move 3 from 8 to 6
move 2 from 5 to 2
move 12 from 5 to 9
move 5 from 6 to 2
move 2 from 5 to 9
move 6 from 4 to 9
move 11 from 7 to 3
move 1 from 2 to 5
move 1 from 7 to 8
move 1 from 5 to 7
move 1 from 7 to 1
move 1 from 8 to 1
move 2 from 4 to 7
move 2 from 6 to 8
move 5 from 3 to 6
move 2 from 7 to 2
move 2 from 2 to 9
move 1 from 2 to 9
move 1 from 1 to 6
move 35 from 9 to 7
move 2 from 8 to 7
move 3 from 3 to 8
move 5 from 2 to 4
move 3 from 3 to 7
move 2 from 4 to 7
move 4 from 6 to 5
move 4 from 5 to 9
move 3 from 4 to 5
move 1 from 8 to 3
move 4 from 9 to 8
move 1 from 9 to 6
move 38 from 7 to 2
move 1 from 3 to 5
move 1 from 1 to 7
move 4 from 7 to 3
move 3 from 6 to 1
move 22 from 2 to 7
move 1 from 5 to 8
move 7 from 8 to 4
move 8 from 2 to 8
move 3 from 5 to 1
move 4 from 3 to 9
move 1 from 8 to 3
move 1 from 3 to 7
move 2 from 2 to 3
move 5 from 8 to 9
move 3 from 9 to 1
move 2 from 1 to 7
move 6 from 2 to 3
move 6 from 3 to 1
move 2 from 3 to 6
move 1 from 6 to 1
move 14 from 7 to 2
move 4 from 1 to 6
move 8 from 1 to 3
move 4 from 3 to 6
move 3 from 9 to 5
move 1 from 8 to 6
move 1 from 8 to 4
move 9 from 7 to 1
move 8 from 2 to 4
move 4 from 2 to 9
move 2 from 2 to 1
move 3 from 5 to 8
move 1 from 8 to 6
move 1 from 7 to 8
move 1 from 6 to 5
move 3 from 9 to 5
move 2 from 9 to 5
move 4 from 3 to 9
move 3 from 6 to 3
move 3 from 6 to 9
move 9 from 4 to 1
move 1 from 9 to 8
move 3 from 3 to 6
move 2 from 7 to 4
move 4 from 8 to 5
move 7 from 5 to 6
move 19 from 1 to 9
move 5 from 9 to 3
move 2 from 1 to 6
move 1 from 4 to 6
move 4 from 3 to 2
move 21 from 9 to 7
move 1 from 1 to 2
move 1 from 9 to 1
move 1 from 1 to 8
move 16 from 7 to 6
move 24 from 6 to 5
move 7 from 4 to 5
move 1 from 8 to 3
move 2 from 2 to 8
move 31 from 5 to 8
move 1 from 4 to 6
move 2 from 6 to 9
move 1 from 7 to 4
move 3 from 7 to 9
move 1 from 4 to 8
move 2 from 3 to 5
move 1 from 2 to 3
move 1 from 3 to 7
move 1 from 7 to 9
move 24 from 8 to 6
move 1 from 8 to 1
move 30 from 6 to 1
move 2 from 5 to 2
move 1 from 6 to 9
move 6 from 9 to 7
move 1 from 6 to 4
move 1 from 4 to 6
move 23 from 1 to 3
move 21 from 3 to 4
move 4 from 2 to 6
move 3 from 6 to 1
move 1 from 5 to 1
move 4 from 1 to 9
move 3 from 9 to 6
move 8 from 1 to 6
move 4 from 8 to 5
move 2 from 7 to 5
move 7 from 4 to 3
move 3 from 4 to 9
move 9 from 3 to 9
move 1 from 7 to 6
move 6 from 5 to 8
move 14 from 6 to 2
move 4 from 8 to 4
move 7 from 4 to 5
move 1 from 7 to 9
move 6 from 4 to 3
move 13 from 2 to 6
move 5 from 3 to 7
move 1 from 3 to 8
move 1 from 8 to 2
move 4 from 8 to 3
move 6 from 6 to 4
move 2 from 2 to 8
move 5 from 4 to 7
move 3 from 7 to 5
move 1 from 7 to 9
move 2 from 3 to 9
move 3 from 7 to 3
move 1 from 7 to 9
move 1 from 7 to 9
move 3 from 4 to 1
move 6 from 6 to 1
move 2 from 7 to 5
move 1 from 3 to 5
move 11 from 9 to 4
move 9 from 4 to 5
move 3 from 3 to 4
move 1 from 3 to 9
move 2 from 8 to 1
move 9 from 1 to 8
move 22 from 5 to 8
move 2 from 1 to 3
move 3 from 4 to 6
move 14 from 8 to 9
move 1 from 3 to 9
move 19 from 9 to 3
move 3 from 9 to 4
move 2 from 7 to 2
move 1 from 4 to 6
move 1 from 3 to 8
move 8 from 3 to 1
move 2 from 9 to 6
move 1 from 2 to 5
move 3 from 4 to 9
move 1 from 2 to 3
move 20 from 8 to 3
move 4 from 9 to 5
move 1 from 4 to 2
move 26 from 3 to 5
move 1 from 8 to 3
move 8 from 1 to 4
move 1 from 3 to 7
move 1 from 2 to 1
move 1 from 1 to 6
move 1 from 6 to 7
move 4 from 5 to 3
move 3 from 4 to 2
move 5 from 5 to 3
move 2 from 2 to 6
move 3 from 3 to 5
move 2 from 4 to 8
move 5 from 3 to 9
move 5 from 9 to 8
move 19 from 5 to 9
move 1 from 5 to 2
move 2 from 7 to 1
move 1 from 1 to 7
move 1 from 7 to 4
move 13 from 9 to 3
move 8 from 6 to 2
move 10 from 3 to 5
move 14 from 5 to 4
move 7 from 8 to 4
move 1 from 6 to 2
move 6 from 3 to 8
move 4 from 9 to 7
move 2 from 9 to 8
move 1 from 7 to 1
move 3 from 2 to 7
move 1 from 5 to 3
move 7 from 8 to 6
move 5 from 6 to 2
move 8 from 4 to 5
move 3 from 5 to 8
move 3 from 8 to 6
move 5 from 7 to 9
move 5 from 3 to 6
move 1 from 9 to 4
move 17 from 4 to 7
move 1 from 8 to 1
move 12 from 7 to 8
move 3 from 1 to 4
move 2 from 4 to 6
move 8 from 6 to 1
move 4 from 6 to 3
move 1 from 7 to 8
move 5 from 5 to 8
move 4 from 7 to 1
move 3 from 2 to 6
move 2 from 5 to 1
move 6 from 1 to 6
move 4 from 3 to 5
move 4 from 5 to 3
move 1 from 4 to 8
move 3 from 3 to 2
move 17 from 8 to 4
move 6 from 6 to 3
move 14 from 4 to 9
move 1 from 3 to 8
move 1 from 7 to 4
move 3 from 8 to 3
move 5 from 2 to 5
move 6 from 1 to 7
move 2 from 6 to 4
move 4 from 5 to 7
move 1 from 1 to 5
move 1 from 6 to 3
move 10 from 7 to 4
move 1 from 5 to 4
move 1 from 2 to 3
move 15 from 4 to 5
move 3 from 3 to 1
move 6 from 2 to 6
move 1 from 2 to 3
move 2 from 4 to 7
move 2 from 7 to 8
move 1 from 4 to 2
move 2 from 1 to 7
move 1 from 7 to 2
move 12 from 9 to 1
move 4 from 9 to 5
move 4 from 6 to 2
move 1 from 7 to 3
move 6 from 2 to 4
move 1 from 8 to 5
move 2 from 4 to 2
move 11 from 1 to 7
move 3 from 1 to 4
move 17 from 5 to 6
move 15 from 6 to 4
move 1 from 8 to 9
move 10 from 4 to 1
move 1 from 3 to 9
move 2 from 6 to 5
move 1 from 2 to 6
move 4 from 5 to 6
move 4 from 1 to 2
move 6 from 6 to 7
move 2 from 2 to 6
move 9 from 4 to 9
move 6 from 1 to 2
move 3 from 4 to 1
move 10 from 9 to 8
move 4 from 2 to 1
move 1 from 1 to 2
move 5 from 8 to 6
move 1 from 2 to 7
move 1 from 9 to 4
move 2 from 6 to 9
move 13 from 7 to 2
move 5 from 7 to 5
move 2 from 5 to 2
move 1 from 4 to 5
move 4 from 8 to 4
move 17 from 2 to 6
move 3 from 4 to 6
move 2 from 9 to 1
move 7 from 6 to 8
move 1 from 5 to 2
move 1 from 4 to 1
move 2 from 9 to 4
move 1 from 3 to 9
move 4 from 3 to 7
move 2 from 8 to 5
move 3 from 7 to 5
move 10 from 5 to 8
move 2 from 2 to 4
move 6 from 1 to 2
move 4 from 6 to 3
move 8 from 2 to 6
move 1 from 7 to 4
move 5 from 4 to 5
move 7 from 6 to 7
move 5 from 3 to 5
move 5 from 5 to 2
move 4 from 8 to 1
move 6 from 1 to 6
move 3 from 3 to 2
move 22 from 6 to 2
move 1 from 9 to 7
move 8 from 8 to 6
move 1 from 7 to 6
move 2 from 5 to 7
move 4 from 8 to 5
move 7 from 6 to 7
move 2 from 6 to 4
move 14 from 2 to 1
move 7 from 1 to 3
move 12 from 7 to 3
move 1 from 4 to 3
move 2 from 5 to 8
move 2 from 8 to 1
move 1 from 4 to 3
move 6 from 2 to 9
move 6 from 9 to 2
move 2 from 2 to 7
move 6 from 7 to 5
move 13 from 3 to 5
move 5 from 2 to 6
move 5 from 6 to 1
move 2 from 3 to 6
move 1 from 6 to 5
move 1 from 6 to 1
move 3 from 1 to 9
move 6 from 2 to 7
move 1 from 2 to 3
move 24 from 5 to 2
move 7 from 3 to 7
move 13 from 7 to 9
move 4 from 1 to 9
move 4 from 1 to 6
move 1 from 5 to 6
move 16 from 9 to 5
move 1 from 6 to 4
move 1 from 5 to 2
move 5 from 1 to 3
move 11 from 2 to 1
move 4 from 9 to 6
move 1 from 4 to 7
move 2 from 3 to 4
move 6 from 6 to 9
move 1 from 1 to 3
move 2 from 9 to 4
move 1 from 7 to 9
move 4 from 2 to 9
move 8 from 9 to 2
move 3 from 3 to 2
move 1 from 9 to 4
move 5 from 1 to 7
move 1 from 4 to 8
move 2 from 1 to 9
move 1 from 8 to 7
move 6 from 5 to 3
move 1 from 5 to 1
move 5 from 2 to 3
move 4 from 1 to 5
move 4 from 7 to 1
move 8 from 5 to 8`

function main(stax, inst) {
	stax = stax.split('\n');
	const stackCnt = Math.floor(stax[stax.length - 1].length / 3);
	const stackModel = Array(stackCnt).fill(null).map(() => []);
	
	// populate stacks
	stax.forEach((row, i, arr) => {
		let stackIndex = 0;
		arr[arr.length - i - 1]
			.split()
			.map(v => {
				const arr = []
				for (let index = 0; index < stackCnt; index++) {
					const letter = v[(index * 4) + 1]
					if (letter) {
						arr.push(letter);
					}
					
				}
				return arr;
			})
			.forEach(letters => {
				letters.forEach(let => {
					if (let !== ' ' && let) {
						stackModel[stackIndex].push(let);
					}
					stackIndex++;

				})
			});
	});


	inst
		.split('\n')
		.map(v => extractAll(v, '\\d+'))
		.forEach(([count, fromInd, toInd]) => {
			// for (let index = 0; index < count; index++) {
			// 	const val = stackModel[fromInd - 1].pop();
			// 	if (val) {
			// 		stackModel[toInd - 1].push(val);
			// 	}
			// }
			const vals = stackModel[fromInd - 1].splice(stackModel[fromInd - 1].length - count)
			stackModel[toInd - 1].push(...vals);
		})

	return stackModel
		.reduce((str, row) => str + (row.pop() || ''), '');
}

console.log(main(stacks, instructions));

