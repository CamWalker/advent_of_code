const utils = require('../utils');

const sample = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

const inp = `Sensor at x=2716507, y=2935757: closest beacon is at x=2710394, y=2763439
Sensor at x=3999794, y=3723425: closest beacon is at x=3369445, y=3597264
Sensor at x=3657442, y=1764502: closest beacon is at x=3049587, y=2338806
Sensor at x=3164509, y=3196584: closest beacon is at x=3369445, y=3597264
Sensor at x=2809936, y=2799950: closest beacon is at x=2710394, y=2763439
Sensor at x=2694454, y=2773569: closest beacon is at x=2710394, y=2763439
Sensor at x=10878, y=1715223: closest beacon is at x=325433, y=2000000
Sensor at x=803461, y=2606485: closest beacon is at x=325433, y=2000000
Sensor at x=675548, y=1606326: closest beacon is at x=325433, y=2000000
Sensor at x=2679411, y=2786440: closest beacon is at x=2710394, y=2763439
Sensor at x=2154234, y=2343200: closest beacon is at x=3049587, y=2338806
Sensor at x=2110512, y=354398: closest beacon is at x=1675167, y=-146032
Sensor at x=2791638, y=1261304: closest beacon is at x=3049587, y=2338806
Sensor at x=1312875, y=239990: closest beacon is at x=1675167, y=-146032
Sensor at x=3942335, y=797194: closest beacon is at x=3809420, y=402553
Sensor at x=2701618, y=2767691: closest beacon is at x=2710394, y=2763439
Sensor at x=3984844, y=228193: closest beacon is at x=3809420, y=402553
Sensor at x=2860718, y=2887510: closest beacon is at x=2710394, y=2763439
Sensor at x=3621521, y=3823030: closest beacon is at x=3369445, y=3597264
Sensor at x=3750994, y=3221696: closest beacon is at x=4361396, y=3105847
Sensor at x=182700, y=100955: closest beacon is at x=1675167, y=-146032
Sensor at x=2647016, y=2816460: closest beacon is at x=2710394, y=2763439
Sensor at x=3190979, y=2626436: closest beacon is at x=3049587, y=2338806
Sensor at x=2772574, y=2692795: closest beacon is at x=2710394, y=2763439
Sensor at x=3538486, y=282: closest beacon is at x=3809420, y=402553
Sensor at x=3688953, y=378293: closest beacon is at x=3809420, y=402553
Sensor at x=2698132, y=2757338: closest beacon is at x=2710394, y=2763439
Sensor at x=305105, y=3671091: closest beacon is at x=325433, y=2000000
Sensor at x=2715037, y=2453: closest beacon is at x=1675167, y=-146032
Sensor at x=3740685, y=2657814: closest beacon is at x=4174142, y=2733685
Sensor at x=3911207, y=340249: closest beacon is at x=3809420, y=402553
Sensor at x=1554097, y=1471192: closest beacon is at x=1675167, y=-146032
Sensor at x=1891025, y=3796582: closest beacon is at x=3369445, y=3597264`;

class Beacon {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Sensor {
	constructor(x, y, beacon) {
		this.x = x;
		this.y = y;
		this.beacon = beacon;
		this.dist = Math.abs(this.x - this.beacon.x) + Math.abs(this.y - this.beacon.y);
	}

	getDistFrom(x, y) {
		return Math.abs(this.x - x) + Math.abs(this.y - y);
	}

	senses(x, y) {
		return Math.abs(this.x - x) + Math.abs(this.y - y) <= this.dist
	}

	getRowIntersects(rowY) {
		if (Math.abs(this.y - rowY) <= this.dist) {
			const intersectDist = this.dist - Math.abs(this.y - rowY);
			const intersects = Array(intersectDist * 2 + 1).fill(null).map((v, i) => i + this.x - intersectDist);
			return intersects;
		}
		return [];
	}

	getIntersectRange(y) {
		if (Math.abs(this.y - y) <= this.dist) {
			const intersectDist = this.dist - Math.abs(this.y - y);
			return [this.x - intersectDist, this.x + intersectDist];
		}
		return false;
	}
}

function part1(input, row) {
	const beacons = [];
	const sensors = [];
	const nums = input
		.split('\n')
		// get beacons
		.map((row) => {
			return [...row.matchAll(/\=[-\d]+/g)].map(v => parseInt(v[0].slice(1), 10));
		});

	nums
		.forEach((row, i) => {
			const [sx, sy, bx, by] = row;
			let beacon = beacons.find(b => b.x === bx && b.y === by);
			if (!beacon) {
				beacon = new Beacon(bx, by);
				beacons.push(beacon);
			}
			const sensor = new Sensor(sx, sy, beacon);
			sensors.push(sensor);
		});

	let overlaps = new Set();
	sensors.forEach(s => {
		const intersects = s.getRowIntersects(row);
		overlaps = new Set([...overlaps.values(), ...intersects])
	});
		
	beacons.forEach(b => {
		if (b.y === row) {
			overlaps.delete(b.x);
		}
	})

	return overlaps.size;
}

function part2(input, max) {
	const beacons = [];
	const sensors = [];
	const nums = input
		.split('\n')
		// get beacons
		.map((row) => {
			return [...row.matchAll(/\=[-\d]+/g)].map(v => parseInt(v[0].slice(1), 10));
		});

	nums
		.forEach((row, i) => {
			const [sx, sy, bx, by] = row;
			let beacon = beacons.find(b => b.x === bx && b.y === by);
			if (!beacon) {
				beacon = new Beacon(bx, by);
				beacons.push(beacon);
			}
			const sensor = new Sensor(sx, sy, beacon);
			sensors.push(sensor);
		});
	
	sensors.sort((a, b) => a.getDistFrom(0, 0) - b.getDistFrom(0, 0));

	for (let y = 0; y < max; y++) {
		let ranges = [];
		for (let i = 0; i < sensors.length; i++) {
			const sensor = sensors[i];
			const intersectRange = sensor.getIntersectRange(y);
			if (intersectRange) {
				let merged = false;
				ranges = ranges.map(([x, y]) => {
					if (intersectRange?.[0] < x && intersectRange?.[1] >= x - 1) {
						x = intersectRange?.[0];
						merged = true;
					}
					if (intersectRange?.[1] > y && intersectRange?.[0] <= y + 1) {
						y = intersectRange?.[1];
						merged = true;
					}
					return [x, y];
				})
				if (!merged) {
					ranges.push(intersectRange);
				}
			}
		}
		ranges.sort(([x1, y1], [x2, y2]) => {
			return x1 - x2 || y1 - y2;
		});

		const range = ranges.reduce(([fx, fy], [x, y]) => {
			let nx = fx;
			let ny = fy;
			if (x < fx && y >= fx - 1) {
				nx = x;
			}
			if (y > fy && x <= fy + 1) {
				ny = y;
			}
			return [nx, ny];
		})

		if (range[0] > 0 || range[1] < max) {`
			return ((range[1] + 1) * 4000000) + y;
		}
	}
}

// const result = part1(inp, 2000000);
// const result = part2(sample, 20);
const result = part2(inp, 4000001);
console.log(result);