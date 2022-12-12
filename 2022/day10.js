const inp = `addx 1
noop
addx 29
addx -24
addx 4
addx 3
addx -2
addx 3
addx 1
addx 5
addx 3
addx -2
addx 2
noop
noop
addx 7
noop
noop
noop
addx 5
addx 1
noop
addx -38
addx 21
addx 8
noop
addx -19
addx -2
addx 2
addx 5
addx 2
addx -12
addx 13
addx 2
addx 5
addx 2
addx -18
addx 23
noop
addx -15
addx 16
addx 7
noop
noop
addx -38
noop
noop
noop
noop
noop
noop
addx 8
addx 2
addx 3
addx -2
addx 4
noop
noop
addx 5
addx 3
noop
addx 2
addx 5
noop
noop
addx -2
noop
addx 3
addx 6
noop
addx -38
addx -1
addx 35
addx -6
addx -19
addx -2
addx 2
addx 5
addx 2
addx 3
noop
addx 2
addx 3
addx -2
addx 2
noop
addx -9
addx 16
noop
addx 9
addx -3
addx -36
addx -2
addx 11
addx 22
addx -28
noop
addx 3
addx 2
addx 5
addx 2
addx 3
addx -2
addx 2
noop
addx 3
addx 2
noop
addx -11
addx 16
addx 2
addx 5
addx -31
noop
addx -6
noop
noop
noop
noop
noop
addx 7
addx 30
addx -24
addx -1
addx 5
noop
noop
noop
noop
noop
addx 5
noop
addx 5
noop
addx 1
noop
addx 2
addx 5
addx 2
addx 1
noop
noop
noop
noop`;

const cycles = [1];
const CRT = [];

let register = 1;

const parsedInput = inp
	.split('\n')
	.map((row, i) => {
		cycles.push(register);
		if (row === 'noop') {
			return null;
		} else {
			const [_, value] = row.split(' ')
			const numVal =  parseInt(value, 10);
			register += numVal;
			cycles.push(register)
		}
	});

cycles.forEach((register, i) => {
	const index = (i + 1) % 40;
	if (i > 39 && i <= 79) {
		console.log(register, index)

	}
	CRT.push((register + 2 >= index && register <= index) ? '#' : '.');
})

function findSignalStrength(cycle) {
	return cycle * cycles[cycle - 1];
}

function main() {
	return [20, 60, 100, 140, 180, 220]
		.map(findSignalStrength)
		.reduce((sum, val) => sum + val, 0);
}

console.log(main());

console.log(CRT.join(''));