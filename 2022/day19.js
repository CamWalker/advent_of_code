const utils = require('../utils');

const sample = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

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

	maximize(rounds) {
		let _producers = [0, 0, 0, 1];
		let _resources = [0, 0, 0, 0];

		const traverseTree = (round, producers, resources) => {
			if (round <= 0) {
				return resources[0];
			}

			const oldProducers = [...producers];
			
			const canBuy = this.costs.map((cost, index) => cost.reduce((bool, resourceCost, i) => bool && resources[i] >= resourceCost, true));

			const treePurchases = this.costs.filterMap((cost, index) => {
				if (canBuy[index]) {
					const newProducers = [...producers];
					newProducers[index] += 1;
					let newResources = [...resources];
					cost.map((v, i) => {
						newResources[i] -= v;
					});
					newResources = newResources.map((v, i) => v + oldProducers[i]);
					return [
						true,
						[round - 1, newProducers, newResources]
					]
				}
				return [false];
			});

			const newResources = resources.map((v, i) => v + oldProducers[i]);

			const options = [
				...treePurchases,
				[round - 1, [...producers], newResources],
			];

			options.sort((a, b) => {
				const scoreA = calcScore(a[1], a[2], true);
				const scoreB = calcScore(b[1], b[2], true);
				return scoreB - scoreA;
			});

			
			// options.sort((a, b) => {
			// 	const scoreA = calcScore(a[1], a[2], false);
			// 	const scoreB = calcScore(b[1], b[2], false);
			// 	return scoreB - scoreA;
			// });
			
			console.log(rounds - round + 1, options);
			return traverseTree(...options[0]);
		}

		return traverseTree(rounds, _producers, _resources);
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
		// .map((v, i) => v * (i + 1))
		// .sum();
}

function part2(input) {
	return input;
}

// const result = part1(inp);
const result = part1(sample, 24);
console.log(result);