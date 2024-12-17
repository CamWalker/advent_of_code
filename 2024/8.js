const utils = require('../utils');

const sample = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const inp = `.......................V.........e...O............
..........q.pj8...............................u...
...................8..............................
.............8.....6.................J....l....u..
........................6................J..Z..B..
......e.........E...........................O.J...
......Jq..........................5...............
...............E...........e.Q..5.f...............
..............................Q..A.....f..B.....O.
....V...................j.....Af..................
............8......n..............l...f....Z7.....
...............n..........4........A........BD....
...........j...................Q..z.......R....l..
N.........6....q.....3....n.........D...........Z.
.............a.6..3.F........D..I.................
.............03.................Q.......h...2.....
......................A.u.......................m.
.V........F......L.............5..........z.R....Z
.......N....q.................n.......L.E.........
..................M.........y.....................
......N............................m.L..y........R
.o....................L...........I...7..R........
......o..........9..............2.......D.........
..od.............y...........................I....
d........3.....M...........E.............I........
......X.W....................p.2.....7...z....s...
V......o........M.....9.................G......7..
.................M.....................h..0....m..
.......d.......F......p.........s.h........z......
..r..........Y.i................9............s....
.....W..a.Y..........y.............p..............
.....g.......r........w...........................
....r.....b...............g........x.s.....h......
....a.....d.......................................
.....................S.......w.............1......
..Y...............................H...............
...b...........Y........................e..t...0.v
..........i..........w.........9....T........v....
.................U...........2....................
.........S........t......T........................
....................U..................Gt.........
....U...S..........................P.....1.B......
.r...X............w.......P.....x.j...............
...W......x..b........g........F.....a............
S.i.................................1.......H.....
.......U......b......x.....X..........G.1.........
...i....X....................P..4........H........
.................................H................
......W...................T4...g................v.
..........................v........GP..4.....t....`;

function part1(input) {
	const grid = Array.buildGrid(input, '\n', '');
    const instances = {}
    grid.forEachGrid((cell, y, x) => {
        if (cell !== '.') {
            if (!instances[cell]) {
                instances[cell] = [];
            }
            instances[cell].push([y, x])
        }
    });

    const yLimit = grid.length;
    const xLimit = grid[0].length;

    const antinodes = new Set();
    for (const char in instances) {
        const locations = instances[char];
        locations.forEach(([y1, x1], i, _locations) => {
            _locations.slice(i + 1).forEach(([y2, x2]) => {
                // calculate the distance between the two points
                const diff = [y2 - y1, x2 - x1];

                // take that distance, add and subtract from each point
                [
                    [y1, x1],
                    [y2, x2]
                ].forEach(([y, x]) => {
                    const finalPointAdd = [y + diff[0], x + diff[1]];
                    const finalPointSubtract = [y - diff[0], x - diff[1]];
                    
                    [finalPointAdd, finalPointSubtract].forEach((finalPoint) => {
                        if (
                            // if the final point is one of the two points in question, ignore it
                            [y1, y2].includes(finalPoint[0]) && [x1, x2].includes(finalPoint[1])
                            // if the final point is off the grid, ignore it
                            || finalPoint[0] < 0
                            || finalPoint[1] < 0
                            || finalPoint[0] >= yLimit
                            || finalPoint[1] >= xLimit
                        ) {
                            // ignore
                        } else {
                            // else add it to antinodes set
                            antinodes.add(`${finalPoint[0]}, ${finalPoint[1]}`);
                        }
                    })

                })
            })
        });
    }
    return antinodes.size;
}

function part2(input) {
	const grid = Array.buildGrid(input, '\n', '');
    const instances = {}
    grid.forEachGrid((cell, y, x) => {
        if (cell !== '.') {
            if (!instances[cell]) {
                instances[cell] = [];
            }
            instances[cell].push([y, x])
        }
    });

    const yLimit = grid.length;
    const xLimit = grid[0].length;

    const antinodes = new Set();
    for (const char in instances) {
        const locations = instances[char];
        locations.forEach(([y1, x1], i, _locations) => {
            _locations.slice(i + 1).forEach(([y2, x2]) => {
                // calculate the distance between the two points
                const diff = [y2 - y1, x2 - x1];

                function verifyPoint(finalPoint) {
                    if (
                        // if the final point is off the grid, ignore it
                        finalPoint[0] < 0
                        || finalPoint[1] < 0
                        || finalPoint[0] >= yLimit
                        || finalPoint[1] >= xLimit
                    ) {
                        // ignore
                    } else {
                        // else add it to antinodes set
                        antinodes.add(`${finalPoint[0]}, ${finalPoint[1]}`);
                    }
                }
                

                // take that distance, add and subtract from each point
                [
                    [y1, x1],
                    [y2, x2]
                ].forEach(([y, x]) => {
                    const finalPointAdd = [y + diff[0], x + diff[1]];
                    const finalPointSubtract = [y - diff[0], x - diff[1]];

                    const allPossiblePointsWithinLimitsDistance = [
                        // additions
                        ...Array(Math.max(yLimit, xLimit)).fill(null).map((v, i) => [y + (diff[0] * i), x + (diff[1] * i)]),
                        // subtractions
                        ...Array(Math.max(yLimit, xLimit)).fill(null).map((v, i) => [y - (diff[0] * i), x - (diff[1] * i)]),
                    ];
                    
                    allPossiblePointsWithinLimitsDistance.forEach(verifyPoint);
                });
            })
        });
    }
    return antinodes.size;
}

// const result = part1(inp);
// const result = part1(sample);
const result = part2(inp);
// const result = part2(sample);
console.log(result);