const utils = require('../utils');

const sample = `0`;

const inp = `4329 385 0 1444386 600463 19 1 56615`;

function transform(rock) {
    if (rock === '0') {
        return ['1'];
    } else if (rock.length % 2 === 0) {
        const rock1 = rock.substring(0, rock.length / 2);
        const rock2 = (parseInt(rock.substring(rock.length / 2), 10).toString());
        return [rock1, rock2];
    }
    return [(parseInt(rock, 10) * 2024).toString()];
}

function blink(rocks) {
    return rocks.reduce((newRocks, rock) => {
        return newRocks.concat(transform(rock));
    }, []);
}

function shinyAndNewBlink(rockMap) {
    for (const [rock, count] of Object.entries(rockMap)) {
        // remove existing rock
        rockMap[rock] = (rockMap[rock] ?? 0) - count;

        const newRocks = transform(rock);

        // add new rocks
        newRocks.forEach(newRock => {
            rockMap[newRock] = (rockMap[newRock] ?? 0) + count;
        });
    }
}

function part1(input) {
	let rocks = input.split(' ');
    const blinksCount = 25;
    for (let i = 0; i < blinksCount; i++) {
        rocks = blink(rocks);
    }
    return rocks.length;
}

function part2(input) {
	let rocks = input.split(' ');
    const rockMap = {};
    rocks.forEach(rock => {
        rockMap[rock] = (rockMap[rock] ?? 0) + 1;
    });

    const blinksCount = 75;
    for (let i = 0; i < blinksCount; i++) {
        shinyAndNewBlink(rockMap);
    }
    return Object.values(rockMap).sum();
}

// const result = part1(inp);
// const result = part1(sample);
const result = part2(inp);
// const result = part2(sample);
console.log(result);