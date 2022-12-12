const { product } = require('./utils');

const sampleInp = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
	If true: throw to monkey 2
	If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
	If true: throw to monkey 2
	If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
	If true: throw to monkey 1
	If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
	If true: throw to monkey 0
	If false: throw to monkey 1`;

const inp = `Monkey 0:
Starting items: 89, 84, 88, 78, 70
Operation: new = old * 5
Test: divisible by 7
	If true: throw to monkey 6
	If false: throw to monkey 7

Monkey 1:
Starting items: 76, 62, 61, 54, 69, 60, 85
Operation: new = old + 1
Test: divisible by 17
	If true: throw to monkey 0
	If false: throw to monkey 6

Monkey 2:
Starting items: 83, 89, 53
Operation: new = old + 8
Test: divisible by 11
	If true: throw to monkey 5
	If false: throw to monkey 3

Monkey 3:
Starting items: 95, 94, 85, 57
Operation: new = old + 4
Test: divisible by 13
	If true: throw to monkey 0
	If false: throw to monkey 1

Monkey 4:
Starting items: 82, 98
Operation: new = old + 7
Test: divisible by 19
	If true: throw to monkey 5
	If false: throw to monkey 2

Monkey 5:
Starting items: 69
Operation: new = old + 2
Test: divisible by 2
	If true: throw to monkey 1
	If false: throw to monkey 3

Monkey 6:
Starting items: 82, 70, 58, 87, 59, 99, 92, 65
Operation: new = old * 11
Test: divisible by 5
	If true: throw to monkey 7
	If false: throw to monkey 4

Monkey 7:
Starting items: 91, 53, 96, 98, 68, 82
Operation: new = old * old
Test: divisible by 3
	If true: throw to monkey 4
	If false: throw to monkey 2`;

const monkeys = new Map();


class Monkey {
	constructor(text) {
		const [nameRaw, itemsRaw, operationRaw, testRaw, trueRaw, falseRaw] = text.split('\n');
		this.name = parseInt(nameRaw.split(' ')[1].slice(0, -1), 10);
		this.items = itemsRaw.split(/\,?\s+/g).slice(2).map(v => parseInt(v, 10));
		this.operation = operationRaw.split('new = ')[1];
		this.test = parseInt(testRaw.split('divisible by ')[1], 10);
		this.trueMonkey = parseInt(trueRaw.split('throw to monkey ')[1], 10);
		this.falseMonkey = parseInt(falseRaw.split('throw to monkey ')[1], 10);
		this.count = 0;
	}

	startEval(divider) {
		while (this.items.length > 0) {
			this.count++;
			const item = this.items.shift();
			const newVal = eval(this.operation.replaceAll('old', item)) % divider;
			const nextMonkey = monkeys.get(newVal % this.test === 0 ? this.trueMonkey : this.falseMonkey);
			nextMonkey.items.push(newVal);
		}
	}
}


function main(input, rounds) {
	const monkeyList = input
		.split('\n\n')
		.map(m => {
			const monkey = new Monkey(m);
			monkeys.set(monkey.name, monkey);
			return monkey;
		});

	const divider = monkeyList.reduce((a, b) => a * b.test, 1);

	for (let i = 0; i < rounds; i++) {
		monkeyList.forEach(m => m.startEval(divider));
	}


	return [...monkeys]
		.map(m => m[1].count)
		.sort((a, b) => b - a)
		.slice(0, 2)
		.reduce(product);
}

console.log(main(inp, 10000));