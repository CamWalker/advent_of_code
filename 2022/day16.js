const utils = require('../utils');

const sample = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

const inp = ``;

class Valve {
	constructor(name, rate, nextTunnels) {
		this.name = name;
		this.rate = rate;
		this.nextTunnels = nextTunnels;
		this.tunnels = {};
	}

	shortestRouteTo(name, routesVisited, layer) {
		console.log(name, routesVisited, layer);
		let tunnel = this.tunnels[name];
		if (!tunnel) {
			tunnel = Object.values(this.tunnels).reduce((minTunnel, t) => {
				if (!minTunnel) {
					return t;
				}
				if (routesVisited.has(t.valve.name)) {
					return minTunnel;
				}
				routesVisited.add(t.valve.name)
				const tNew = t.valve.shortestRouteTo(name, new Set([...routesVisited]), layer + `->${t.valve.name}`);
				if (tNew.cost < minTunnel.cost) {
					return { ...tNew, through: [].concat(tNew.through, [t.valve.name]) }
				}
				return minTunnel;
			}, null)
		}
		
		return tunnel;
	}
}

function part1(input, minutes) {
	const valves = {};

	input
		.split('\n')
		.forEach(row => {
			const a = row.match(/Valve ([A-Z]+) has flow rate=([\d]+); tunnels? leads? to valves? ([A-Z,\s]+)/);
			const [, name, rate, tunnels] = [...a]
			valves[name] = new Valve(name, parseInt(rate, 10), tunnels.split(', '));
		});

	for (key in valves) {
		const valve = valves[key];
		valve.nextTunnels.forEach(tunnel => {
			valve.tunnels[tunnel] = { cost: 1, valve: valves[tunnel], through: [] };
		});
	}

	for (key in valves) {
		const valve = valves[key];
		if (key === 'AA') {
			for (key2 in valves) {
				if (key === key2) continue;
				valve.tunnels[key2] = valve.shortestRouteTo(key2, new Set(), key2);
			}
			console.log(key, valve.tunnels);
		}
	}

	
	return valves;
}

function part2(input) {
	return input;
}

// const result = part1(inp);
const result = part1(sample, 30);
// console.log(result);