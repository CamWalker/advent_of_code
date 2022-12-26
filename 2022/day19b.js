const utils = require('../utils');

const sample = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

// 7 8 3
// 12 7 3


const inp = `Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 15 clay. Each geode robot costs 2 ore and 8 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 3: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 20 clay. Each geode robot costs 2 ore and 14 obsidian.
Blueprint 4: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 5: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 13 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 6: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 7: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 9 clay. Each geode robot costs 3 ore and 7 obsidian.
Blueprint 8: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 2 ore and 8 obsidian.
Blueprint 9: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 18 obsidian.
Blueprint 10: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 11: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 12: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 13: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 16 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 14: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 3 ore and 13 obsidian.
Blueprint 15: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 13 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 16: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 4 ore and 10 obsidian.
Blueprint 17: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 18: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 17 obsidian.
Blueprint 19: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 4 ore and 12 obsidian.
Blueprint 20: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 20 obsidian.
Blueprint 21: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 4 ore and 12 obsidian.
Blueprint 22: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 13 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 23: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 24: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 13 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 25: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 26: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 15 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 27: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 8 obsidian.
Blueprint 29: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 19 obsidian.
Blueprint 30: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 10 clay. Each geode robot costs 2 ore and 7 obsidian.`;

function calcScore(producers, resources, includeRobots) {
	return ((((includeRobots ? producers[0] : 0) + resources[0]) * 1000 + ((includeRobots ? producers[1] : 0) + resources[1])) * 1000 + ((includeRobots ? producers[2] : 0) + resources[2])) * 1000 + ((includeRobots ? producers[3] : 0) + resources[3]);
}

class Blueprint {
	constructor(name, costs) {
		this.name = name;
		this.costs = costs;
	}

	nextRound(round, state) {
		const states = [];
		const elementsToBuy = this.costs
			.map((cost) => cost.reduce((canBuy, elCost, elIndex) => canBuy && state.resources[elIndex] >= elCost, true));
		
		const originalProducers = [...state.producers];
		elementsToBuy.forEach((el, elIndex) => {
			if (el) {
				const producers = [...state.producers];
				const resources = [...state.resources];
				// Buy new producer
				producers[elIndex] += 1;
				this.costs[elIndex].forEach((v, i) => {
					resources[i] -= v;
				});

				// Generate resources
				originalProducers.forEach((v, i) => {
					resources[i] += v
				})
				states.push({
					producers,
					resources,
					round,
				});
			}
		});


		// buy nothing
		states.push({
			producers: [...state.producers],
			resources: state.resources.map((v, i) => {
				return v + originalProducers[i];
			}),
			round,
		});

		return states;
	}

	maximize(rounds) {
		let states = [{
			producers: [0, 0, 0, 1],
			resources: [0, 0, 0, 0],
			round: 0,
		}];

		for (let round = 0; round < rounds; round++) {
			states = states.map(state => this.nextRound(round + 1, state)).flat();

			// Prevent states from blowing up
			states = states.sort((a, b) => {
				const aScore = a.resources.reduce((score, v, i) => score + (((a.producers[i] * (rounds - round)) + a.resources[i]) * Math.pow(100, a.resources.length - i)), 0);
				const bScore = b.resources.reduce((score, v, i) => score + (((b.producers[i] * (rounds - round)) + b.resources[i]) * Math.pow(100, b.resources.length - i)), 0);
				return bScore - aScore;
			}).slice(0, 1000);

			states.sort((a, b) => {
				const aScore = a.resources.reduce((score, v, i) => score + (a.resources[i] * Math.pow(100, a.resources.length - i)), 0);
				const bScore = b.resources.reduce((score, v, i) => score + (b.resources[i] * Math.pow(100, b.resources.length - i)), 0);
				return bScore - aScore;
			});
		}

		console.log(states[0])

		return states[0].resources[0];
	}
}

function part1(input, rounds) {
	const blueprints = input
		.split('\n')
		.map(row => row.split(' '))
		.map(row => new Blueprint(
			row[1].slice(0,1),
			[
				[0, parseInt(row[30], 10), 0, parseInt(row[27], 10)],
				[0, 0, parseInt(row[21], 10), parseInt(row[18], 10)],
				[0, 0, 0, parseInt(row[12], 10)],
				[0, 0, 0, parseInt(row[6], 10)],
			]
		));
	
	return blueprints.map(b => b.maximize(rounds))
		.map((v, i) => v * (i + 1))
		.sum();
}

function part2(input, rounds) {
	const blueprints = input
		.split('\n')
		.slice(0, 3)
		.map(row => row.split(' '))
		.map(row => new Blueprint(
			row[1].slice(0,1),
			[
				[0, parseInt(row[30], 10), 0, parseInt(row[27], 10)],
				[0, 0, parseInt(row[21], 10), parseInt(row[18], 10)],
				[0, 0, 0, parseInt(row[12], 10)],
				[0, 0, 0, parseInt(row[6], 10)],
			]
		));
	
	return blueprints.map(b => b.maximize(rounds))
		.product()
}

// const result = part1(inp);
// const result = part1(sample, 24);
const result = part2(inp, 32);
console.log(result);
// console.log(JSON.stringify(result, null, 4));