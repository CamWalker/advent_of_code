const utils = require('../utils');

const sample = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

const inp = `##################################################
#.#O.O..O...........O#.......O.O...O..O....OOOOO.#
#.#.OO....O#OO......#O...#...O....#......#.OOOO.##
#OO..#..O........O..O.O..O....O...#..O..#.#.#...O#
#.O..#O....O.....O.O..O..OO...O...O..O#...#O...#O#
#O..#.O...#.#O.O.#.....O.OOO.#OO..#....O.OOO....O#
#.#..O.O....O..O...O...O.O.......#.O.O..O..O..#..#
#.O.......O.....O...O.O....O..OOOOO.#.....O..#...#
#OO.....O#...O......O...O..##O.#..O........O.##..#
##.OO..O...OO...O#..OOOO......O..OO..OO.O.#O.O#..#
#........O......O...O....O.........OO.OO...O.....#
#..O..OO..O.....OO......O.#O..#O......O.O#..O..OO#
#.O......O..#O.OOO...OO.O....#...O......O..OO.O..#
#..#O.##..OOO..O.O....O..O..O.OO#...O....O..#OO.O#
#O..O........O...##O..O....OO.O.O..O...#..O......#
#....O.OOO...#O.O......O.#OO....O.....#O.O..O..O.#
#O......#.#O.##.........O.#OO...O.O.OO.......O.O.#
#..OO..#...O.#..#.....O.....O.....O#O.##...O...OO#
#..OO......O..........O...O.O..O......O..O.....OO#
#...O..O..O......#..OOOO#O....O....OO....O.......#
#.OOO....OO.#.O.OO......O.....O..#..O...#....O.OO#
#.O#...O..OOO.O.#..#O..#O.O...O.O#O.#.O......O..O#
#O.OOO.O..O......O......##O.OO...O..O#.....O...O.#
#........OO...#..O...O..O#O.O.O...OO....O....O..##
#...#.O...O.OO....OOO..#@O....OO.OO.OO.......O...#
#.....OO........OOO..OOOO.OO..OO.O....O...#OO....#
##....OO#..OO.#......O......O#.O....O.O..........#
#......O..#O.O.O.OOO....OO.....#...O..#O.O..#..O.#
#O.OO...O.#.O.O....O#.OO..O....O.O....O...O......#
##..O..O.....O............#O........O......OOO.O.#
##..........#..O...O..O..O...OO....OO....O.O.....#
#.O..O.O.#O....#OO...#O.O.OOOOO.#...O.....O..O..##
#.......OO..O...O.O..O.....O#OO.OOO.........O....#
#.........#..OO..O....O..#.O.O.O...O.OO......O...#
#...........OO...O##..O#....OO.O...OO.O.....O.O..#
#.....OO...O#.#.#OO.....#..OO........O....#...O#.#
#O.O.O......#....O...OO........O.#O...........O.O#
#.OO.........O..O..#.#O#....O.OO#O...OO.OO...OO.##
#..OOO.O...#.....O..O.......O.........O#...OOO...#
#.O..O#.....#...OOO.#...O.##O...O...O..OO..OO.O..#
#.O..O...O.....O...O#O.....O......O.#.O.O....OOO.#
#OO.O..O.O..O.#.O.....O.##...O........#..O..O.#O.#
#...O.....O#......#OO..#........OOO.#..OO.OO.....#
#O.....#.#O.O.OO..#......OOO.......O..........#.##
##.......O..O...O..#O#......O#..O....O........O.O#
#..#.....#...O...O.....OO...OO.#O....OO#O........#
#..O..O.O..OOO...O....O..OO..O.....O..OOOO.#OOO..#
##O.O..O#.OO.O.OO.O..O.#..O...O.O.OO...#......O..#
#....O.O..##.#O..#.O...O.O.#O.O.#.......OO..O....#
##################################################

><v<^>>>^vv^^>><<v^><>^<v<<vv^v>^v^>><v>^>^<<v<<^v<^v>^<v>>^<v>vv^v<<^^<><<<>^^^v<><>v<>vv><>v<v^><^>v>vv<<<v^^v<^^v<<v^vvv<>><^>v>v^>^<<<<v<<>>^<>v>><>>^<^>>v<v>^><v<^><vv><<>v>v>v^>vv^vv^v>><>>v><<>>v<vv^^v<>v^><v^v<v<><v^><^v<<>>^<^>v<><^<^^^v<>^<>^<>v^v^>>^^v<<<>^><v><<<^>>v^<>vv<^^<v^>>><v^^v>><><^>>^<<>^<^<<^v^^<>><v>>>^vv<^<<>v>^>v^<v><>>>^<^>><<>^^^><^vvv<>^<<v><^v<<^v<<v>vvvv^<>vv<<>>v><v^>^<v<<^^<>v<><<vv<^<<<^>><^>^^>v<^>>>>v^v>>v^<v>v^v^<<v<<>vv>^<<<^<<^<<^<^^^<v<v^><<vv>>><>^<^>^>^^<>v>^>>>v^<^><<<<v<v<>v>^<^v<^v<<^^>>^>^>vv><^<v>vv^^><<<<>v<v>^v>^<<>v<>^^<<^><^v^v<v>^^^<vvv<>><^>vvv>>^<>^v^>^v>vvv^^^v<^<v<v<<^^^><<v<^<>^^<>>><<><^v><><<v<v<^<<^^v^^v<^^><v<vv>^<<>^^<<<v^vv>^^v<>^v^<<^^v<><>^<v^^^<<v>^><>><^>>^<^vv>v>>v<<^^^v<v><^<>><^<^<v<vvv^v<<<^^^^>v>v<<><<v>v^<>v<^vv^>v<>vvv<vv<<^>>><v<>^<^^^><^v<>>^^vv^>^vv<^><><^vv^v>>v>>><v>v<>vv<^>^>^<<v<<><>^v^<><v><^v^>><<v<<vv<v<>^v<<^v<^>v^><>vv<vv^vvvv^>>>>^>>^^>v^^^^<<vvv>^>v^<v>^v<^<v^>^<<<><v<v<>v>>^^^<v>>>>v^^><>>vv<^>vv<>
^<vv^>^><^<>^>><<vvv>vv<^v^>>^^^vvvv<<<<>>>v>>^>^><^>^v<v>>v<><v^^^>^v<v^^^^^<>><^vvvv^^>^^^<>vv>v>^<>>>v^^<v^>v<v<^v<<>>vvv>v^v><>>^v><^^><^<v>>>v^v^>>^>v>>^vv<^^<^<v>^>v><^^v<<v^<^><<^v^>^><v>v<vvv><><v^<^vvvv^^^v>v^>>^^>v>v>^v^^><^v^><v>><>v>><<v<^<>^>v^vv>>>>v<^^>v>^v<v<><<^^<v<>><vvv>^^^v^>v^^<>v^>>^vv><^v<^^<<vv<><>>vvv<>>v^v<^>>^>v<>^^>><>v^^>v>v>><v<<>^v>^<^<v>^^>>vv>^v<>^v^v^<^v^^><><<<^^>^^>v>^>>^^^v><v^>v<vv<>^^<<^><v<^^<^v<v<<>vv><<v<>><><<<><><>v^v>^vv<^<><^<>>^^><>>v>^^v<^<>><vv<v<v><><>^^^<^>>^><vv<^<>><<<^><v^><>^v<^<v><<v>^vv^>^<>^v><^<<<><>^^^^v><^<^v>^^<>^><>v<<^>^vv<^^<<>^v>vvv<v>>^>^>>>vv^^^<<<^^>v><>v>^<>>>>v<<<^>>^^>^<>^>v>v><<^<<><v^vvv>^^^^^^>vv^vv<v<v^^<>v^^^<>>^^<v><<<<^<^<v^>^>^><><<<<v^v>>><^<><^<>v<>v^<^<v<vv<^<><^^^v^v^><v>v>>vvvv^<v<<^>>^>^^vv<>vv>^^^<^><v>^<>><>^v>v>vv^^v>>>><v^<><v^^><<>>vv>><vv^<^v^<vv<>>>><<v<<v>><v>v^<<v^>^<^^^^<vv^<v^^^<^><^^><v^v>^^<^>v>>^><vvv>v>v<<v^^>v^v>>>vvv<>v<v<vvv>>><v<^><^^v>^<v<^vv>>><v<>v^>v>v<vv<><v>^v>^>^><v<<^>v^<^v>
>>>^<><<>v>vvv^<><>^>^v^v>><v^><<<><v>>^>>vv^><<>vvvv^v><vv<v<<<>^<<v<<<^>v^>vv><^>^><^^v^<^>>^^v<<v>v<v^>>>><>vvv>^>^^>>v<^>^<v>^>>^^<^<<v><^<<^v>v<v<<vv^<<v>>^>><vv^><<^^<v^^><^<^><<><v>vv<><<^<^vv>><<>>>>v>><<>>^v^<<v>>>^<v^v<>^<>>v^<v<^^^^<^>>^v<v^vv^^<vv^>^^v<>^<<vv^^v>>vvvv^>v^^v^^>v<v>>vv^v<vvvvv<v><<>^^^v^<<>>vv^>>><>^><^>>v<>>v<^><>^<^>>v^>vv^v>v<<<v^v^v^^^<^^v<v^<v^>v<vv^v^<v<^^v^vvv<vv<^<v<^^v>^v^v<<><>^^v>><<v^v>^v<vv<<><^>^^<v<vvv<^v>^^>v^v><v<v<v^^>>^<<<<^v^^v<<<^>v<v<v<v>^^^>>vv<^v<>>>^^v^<v<v><^^<>>^v<>^^vv<vv<>v^vvvv^<^v^^v<^><^>><vv^>vv<<<^><v<>>vv^<^v<v^v<<^>>v<<>><<<>><^<<<v>>v^v><><v^<<^^<v<^>^<>v<>v>^^>v>^<vv^>>^^><<v<>^v<vv^^v><^>^>v<^<>^>>^<^vv^v^v^v^^<<<v>>v^v>vv>>>>v<v><v<>v<>v^<^vv^vvv^<<>v<vv>v>>vv>^>>^^v>vv><>>^>>v<v<>><>><<v<<>>^^v<>^>vv<vv<^><>vvv<^vv>^><>^^v^<^>^^<^>>>vv^^v^>^v^vv>v<>^^^^v>>v^v^<<^vv>v^^><><v^<^v<v>^v^>^^<>^<^^^>^vv<^>>><><<><>^<v^<>v>v<^vvv<v><<^v^^>v>^^><^v^<<v>>>vv<v^>>v^^^v<^^<>^>^>>^^<^^<^<^<><v>v^<<>>v><^<^>v<^^>^>^<v^<^>vv<>^>^^^v
^^>>><>^>vv>>^>^^<^>^<vvv^v^^v<><><>>^^^<<vv^>>>^^<v>v>><^<^><<^<>^^vv<v>>vv^<<>^><v^v>>^><>>v<<>><<><v<><><v>><<>^^^^^<<>>v>^v<>^>v^<^>><^^<v<><^<vv<v>^<^^^>vv^^>^^>v>><v^<><<v><<>^<v>^^>><v<>>^^^v^>^vvv<vv<^vv^^><<v<>>>^^^vvv<<<<vv^^v<<^vv>v^v><><<>^^<<<^v^^^<v>vv<^^>^v<v<<^v<<<>vv>^v^v^^<^v^v<^vv^<^>^<^<<<>v<^^<<><><^><vv>^^>v>><^v>vv><^>^>^>^vv<v^<<>^<^>^v><<^v^^^vv^><vv><^<^^<^^^v<v^vvv^<<^<v>^v^<v>^><^>^><>v><v>v>^^>>>^^>v>^^>^<v<v>v<v>^<><><v>v><^>><^><^>^vv<^<>v^<^>><v<vv^v^<vv^<<^<^v>^>><<^>>^^>v^^>>>^<v><<^<^v^>^vv><v<vv>^vvv<^<^<<vv<>v>v>^v^v>^v<v>v^^<v><^^<^>v^^>>^<>><<vv><^>>^^v^<v>v<>>^^^vvv^>>>v^>^>^>v>>^>^><<><vv>vv<v^>^<v>v^<v>^^<v^<<^><^<<<>>^v>^><^<v>v<^^v<vv^^<vvvv<><<>>^^<<^>^^>>>v^^<^v^v<<^><<^^<vv<<<vv<>v>v>v>^<^<^<<>^^^^^vv<>>>^vv^^^<^^^v>>^<vvv>><>^<>^^^v^vv^<<<v^^v<>v^>^^><^<>^>>^v>v^v>v<>vv<^>^^<vv>>v<>v<v^><v><>v<^vv^>vv<^<>v<><v>vv>>>>^<<<<v<<vv>^^^^>v>>^<<>^>^v<^>vv>>^<<v>^v<>>^>v<v>><^<>^^><<<^<^><^>^<>><vv^^<^>v^>v^<^^>^>><<v>vv<v^<>>^v>vvv>>vv^^>v>><><>
vv<v^<<<v><vv>>^>^>>><<^^>vv^v<><^>>v^^<<>><><><<vv<v<>>^v<^^><^><^^vvv^>><>>>v^^<^>><>><<>vv<<<v^>v>v^<<v^v^vvv<>vv^>><><>vv^>^^>vv>^><<>>v<>^^v><><v<^<<v<<vv<>v>>><vv^^>^>v<<>>>^^>v^<v<v<^<^v>v^v<>><<^^<^>^v^vv<<><<^vv>>vvv>^v<^v^>>vvvvv^^^<^<v><^v><>v^v<v>><>>>>vvvvv^<^><><^>>><><vvvv>v><<>^^>v^v^>vv><>>^<^vvv^vv^vv^^><>><^<<>^vv>^v^v>>><^v^<<v^^>><^<v<vvvv<v<v^vv>v>>>><>vv<<^vv^>>>v^>^<<v^v<<vv<v><<><<v^^<>>vv>v<v<<<>>^^v<v^<^v^v<<<v<v^^^>v<v>>>>>>v<<<>v><><>>^>^>vvv<><^>>>v<<vv^<^<v<v><^<>v>v>><<v^<^vv>v>v<vv^^><v^<><v^v<<<^v<v^^>><^vv^<<>^><<<^v^^><vvv<>^<>^^^<>v^^>>><^>^<^<v^<vv><>^v>^>>>>v<v>^>v<<><>^<^<v<^<><<>v^v<<^v<^><><<<^<><<^^<><^>><<^v<><v><>v<v>v^vv<<^v<v><<<vv>>>^>v>v^>>^vv<<v^v^<<^>^^<v>^v^v^^<><vv^><v^>vv^<v<>v^v^<^>>vv^v^^><<^<>v<^^^v<<^>>>^<v<<<^>>>>>v^<^v^>v<>^v^<><<^<^^<v^^v>v<v^<vv^<>^<^><<^v^v^vv><^^^>>vv><<vv>>v<v>v<^<v><v<v<>^<<^vv^v<<><<^<vv<v<<v<>>^^v>>^>v<><>^<<><><<v^<<v>^^v<<>>^>^<<^<^v>^v>>^>^^>>v<v><v<<^<>^v^^>v<vv><>^v^<>^<>>vv<<<<><>v><^v<<>v<v><>v<
<v<vvv^<^<v<^^^v>>><^^^^<vv>>^^<^>^v<v<vv>vvv^>^>^<><<^^>v>^<^vv>^><>v<>v^><>^v^><>^v><>>v>^v<<v>v^v^><v<>>^^>v^v^^vv^>>><<<^><^><^vv><<^>vvv>^^v><<<>><<v><>^><v^v<>><^>>v>>^<<>>v<<>^>>>^v<<v<<^><><<vvv<v^>><>v<<^>^>v<v^<^v><>v>^<>>^^v^>>^v><vv<v<^><<^>>><^^>^v<<vvv^^>>v<>^<v>^<<>>vvvvvv>v<<<^<v^v<><v>>>v^>v<>^<<v<v>v<>v^^v><<>^^vv>vv<v^>^<<^^^v<v>v<^^>><^<>^<v^^>>v^v><<>v>><><vv>><^v^v^^>>>v<^^vv<^<<>><<>>v<^<^<^<^^v<v>vvv<>>v^^><^>>^v^^^v>v<^vvv^^^<v^^<v>^<<>^>^>vv>vv<<v>^><vv^<>v^<>^v^<^v<^><>vv<^<vv<v<>v<<^>^v><>^>>^<><<><vv<>v^^<><><<>^>^^v<>^<>>>v^>v<>vv^vv<^v<v<v>^^v^v<<>^^^<v>v<<>v^vv^v<vv^^<<vv>v<v>^<v<<^>vv<<>vvvvv<v<<^vv^<v<>>^v<<>vv^v<vv>^^v^^v^v<^vv>v>><v><^^>><^<v>v^vv<>^v<>><>v^v><>>^>v<<v^>^vvvvv<<^^^<vv<>vv<>^<<<<vv^>v^^^^^^vv^v^^v>v<^<^^^>^v^<<^<v^^<<<>>>v>v^^v>^^^<<<vv<<<v>><><^><>^<><><v^><^><^^^^vv^>^^^vv><>v^<v^<><v><>^<>>^^vvvv>>^v^v>^>><v>v>^><^<>v<><^<>v<<v^vv><>v^^v<v<><<>^<v<<<>>>^><<v<v<^v^>^^^v<^^^<>v<<^^v<^vv<<>>^v<v^v<<<>v<>><>^>v^^<<v^<>v^vvvvv^^><><<^>v
<><^>^^<^vv<^>^>v>^<^><<^><^>^vv>>>>^>><<>^<^>^^<v>>^^v^>^v<vv^>^v<v^<>>^<><>>>>^v^vv<vv<<^v^<v>^><v^v^vv^<<>>>>^<>vv><^^^v^^<<v<v>^>v>v>><<v><>v<>^><>>v>^vv^^^>>^v<>^^>>>^v<<vvv<>><<><<^^<^><^^v^>v<^>><v^>>v^vv^>v^><v^><^>>>><v<<vvv><v^>vvv<<v<vv<<^^^v>^<v>^<>>><><v^>>>>><>v>vvv^v<vvvv><>^v<><vv^<<^v<<<^>><<>>>^^><><v<^^^^<v<v>vvvv<v<^<>^<v<>>>v<^v^^v>v>v^<><^><v>^vvv^^>vv^>>^<^v><^><><<>>^^^^^v<^^v^v<v<><<>>>^<v><v<>^>vv>^>><^<vv>^>><<><>vv<vvv>>vv^>>>vvv^^v<>^<^v<^v^^v<<^vv<^<^<^v>^^><v><vv^<^>^^>>^vv^<><^^v>>v<<^v>^^v^^<vv>>^<<^v^v^^><^<>>^>v^<v>v>>^v>v>>^<vv<><>v^^><^^>><^^<<v<vvv>v^v>v^<>>v^>vv^>>vv^>vv^^>>>>^v<>v>v>^^^>vv>v^<>^^>vv><<>v^^^^v^>^^^v<<>>^<<<>v^^<^>v^^v>>^vvv<v<<v>^v>>^>^<vv<v^><^^>^vv>v^^^>v<>^^<>>><>><><>v<>v>><>v>^^>^<^>^<<^>><<>^^^^v<<<>>v^^>^<<v<vv<>>^<>>>^v^^^<^vv^<>^>>^vv^^vv>^<^>^>^>>>v>>v^>^<vv><^>>v<><><><<^><>>v<v<><>v^>^>^>^<<vv>v<<vvvvv^<^<^<v^^v<^v^<v^<vv<v>^>>^<^v>^>vv>^v>v><v^><<><><><><>v<><>^v^>>vv^v>>v^^^v^>v>>^v<>^vv<<^^^>v<><v^>^^>v><<^^v^v>^^>^
v><v<^v<><>^^>>>>v^><>v<^>v>^^>v^<<<>>>v<<>>>^vvv<>>^>>^^v<^^>^^v<>^^<^v<<v<^><^<>^<>^>^v>><<<^^<>^v><^v^<^<>^^<vv>vv>>>^^vvv<v<v>>vv^v<<>^<^<v^<<vv<v>>v^^v<^^^^^v><><v><><>v^>v<><<<^><<^^vv>>^<^<<>v<>><v>^<<v>^v><v<>><^>vvv^>v^<><^>>>>^^>>vv^v><^>^>v>^>v<<<^>v<<^^<>v^^^><><v<^^>^>v>^v<<><^vv^><>v>^vvv^vv>^^>vvv<v^>^<vv>v<^<^v<^<>^vv^^v^v^^>^^^vv^^>v<v>v^^<><v>^<^vvv<<<^^^^<v><>>>>>>^<^<>^><^^v^^^^<<^>^><^<v<^>vvv>>v^>^vv<vv>^v>><<^<^^>^^>^^<>>v<^v>v>>^><vv>^v^^v<>^v>vv<^^<>>v^^<<^>^^><v><><vv^<^vvv><^^>>>><<vvv>^><<>^^^^>v^^<<>^vv><>v^^>v>^v<<v^^^^v^^v^<<vv<<v>vvv^>v^<^>>v^>^>^^^v<^v^<v<<>><<>>>^v^>><^>^>>v^<<^<>^vv>>^^v<<<^vvv^<>^vv<>v^v^>^<<v^^v<>^v<vvv<<v<^<<v><<v>>v<^v^><<vv>v>^>v^>^><>>v^^<^^<v>^^>^v><<^>^><v><<v<>vv^<^^<^v^vv<v<<<v^><^>>>>^><<^^^^><^v<><<<<v<^^^>>v<^>^v^<^<^^<>v^>^v^<v<^>><><<>^v<^vv<^^v>vv^^^v^><>>^^vv<^<>^>><^v<><>>^^^v>v<<^>v>>^><^v^<<<<^^>v^>v>v^v<v<><^v^>><v><<^<>vv<<<v^^v<^>>v<^^^>>>v>>vv^<>>^<vv^<<v>^<<vv><<v^^^<v^>^>^<v<>>^v<v>v<^^^vvv>>v>v><<vvv<<^^>>>>
v><><v>v^^^>^v^^v>>>><><^v><v<>>^<<><^>^v^v^<v<^<<>^^<^v^>^>>v<<<>>v<v>><vv>^<^^<<<v^<<>vvvvvv>>^><v<^<v><vv^><>>>vv<^^><>v>^<>v^^v<v>^<<^<<^^<v<<^v>^<<>v><v><<<<>vv><v<>v^^v^vv>^><^<^<<^vv><vv^<<v><v^<><<>^v<>^vv>>>^<v<><><v<>^^^v<v<v><v^vv>v^>v<vvvv>>vv>v>>^>vv^>vv<v<v<<^v>>v<^^>vvv>^^>>><v>v>v>vv^>v^<<^>><>^^><v<v<<v><v^<^<^v><>^>v<<v^^^v<^^<><>>vv>v^<vv><><v^<v^vv>vv^v^<>><>><vv>>>^^>>>^<>>^>>>v>><>>^^^v^>^><v^>^^>^<<^<^v^^>^^>^^<>v<>><<v<^>^>^v<<>v^v^v^<^^<>v<<^><<v>^<<v^>>vvvv^<^v>v<^>><<<^^^>^v^<v<<v>><><^^<>v>v>^<v<<v><<<<vv^^<>>>>^<<<v^<vv^><<^v<^vv^v><^^<v>v<<^^>^>><<>vv^v><>^<<>^^<>>^v^v<v<<^v>>>vv><^>^>^v^^v^<vv<^v<>>^vv^^^^>^<>vv<v<<v>^^v>^v>v<<vvvv<>^^><<vv>^v^^><<^^><>^>v<>^v^>^v^v<>^<v<v<^^<^^>vv><v<>><>v<^><^v^>>>vv<^>v<<<<^<^v>><>^><^^><^v<<^v^<v<v^v<<>><<<v><^><>>>^^>v>vvv<>^v>vv>>vvv<^v<v>^v^v<v<^v^><v^>^><>^^<v^><>v<<<v<>^^v<<v>v>v<<v>^v<><>v<vv<>><^^^<>^v>v>v^<>>^>v<^><vv^>v>>><><>^^>v>>^^<^>v^v<><^<v<v><<><<v<>^>v<<>^>^>>v>>^vvvv>^<><^<v<>v<>^<^<v^>>v<v<^><><^<<<
v<^^vv<<<>^v<v^><^^^v<<<<v>^<^<<^v^v<<>vv>^vv>^<^v^><><<>^>>^>v<^>v<<<vv<>vv<<v^^v^v<<^>>><^>^><^>^>v^^>v>><v>^v>^v^<^^^^<^v<vv^^<<<v^vv>>v<>v>^v^^vvv<>>v><>>><^^^vv^v^^><vv<>>v<>^vv^<^>><^v^vv^>>vv<v<>^>v><^v^>^>>^>^>>^<><>^^^^vvv^><v<v<^vv<<v<<v>^^>^^><<^^>>v>v^^>^<<><^v>vvv>>v<<><vv><vv^>v<^v<v<>^>v^^><v^>^^v<>^<v><>v^<^>v^>^<<v>v^^>^<>v<v<>v>v^^vv<<><v>^v^v<>v<v><<^v<<<^<><<>vv^>^><^^<v<^vvv>><<vv^vv^><^>vvv^<<v<v^<<>v>>v><vv<<<><>v<^<<v<<^^^^v^vv><v>^<vv<^vv^<v^<^v<v>^v^^>^>><<^^^>v<>^>^>v<>v<<><v>vv<^>vv<v>^<><^<^^><<^>v<<<>><>v>>v><>><>>v>>v^^vv<^>>>^>>>>vv>v<^vv>v>>^>>^>>v<>v<<v^v<v<>v>vvv<>vvvvv^^<v>><^^>v>v<v>^<><<<>>v><>v>v<^<v>>^>^vvv>v<><v>v^<<^>>vv^<^v<<<^<^^<>>vv^v><<<v^v<^^><v<^vv><<^<v>^^vvv<><^<>v>>v>v<^>vvv<v^v^<<>><v<>^<v>^vv>vv<^><>vv^^^<v<<><^>>^v^^v>^^^vv<^><^>^v><vv<v^>>v<^v><<^<<^^v<>v>vvv<^v<^v><><v<><>>^v>>^<^>>vvvv>>^>><^v<<^<^>^<^^^v><^^<vv^^<<vv>vv<>^<v<^<v>v^><^<<<<^>v><^v<v^^<v^<<><^>>v^>^>v>>v^>><vv^^<^<<^<>v><<^<>>v<>><><^^v<<^<^^><v>><<v>v>^<><^<<<^^>
^v<>>>^v<^^^^v<>vvv^>v<^^vvv><v>>>>>v^^^^><^>^>v<v>^^<><^<^<>><^<v>^^>v>^>^v<vv^>^<^>^^<<<>^<<v<<^^^>^^v<v<^>v^>vv^vv^^<^^>><<v><<>^>vvv>^><^v^^>v^^v><^<v>^^^<<>><^v>>vv<^^^v<><^>^<>>>>>^^<<<<vvv>^^v<v<>v<<^^v<>>>v<vv<<^<<v^^^v>^>v^><^<v>v^^^>>><>v^^v^vvv<v>v>^v^>^<<^vvv^vv<>>>>>^<v>^v>>v^v<>^^><><^><v>>>^>v>>>vv^v>^>>v<vvv>^vv^<v<<v<>>v>>>v<>>>^><><v>>><>v>>v^<>vvv<v>>>>v>^>>vvv^^<v>^>>>>v^^v>>vvv<>>><v^v<^>v^v<^<^^<v<<vv>v^>^v>>vv>vvv^>>>>><><^><<<^vv^><v<<^>>v<>^>^^v>^<v><<<>^vv^<<^v<v<vvv>vv<vvvv^><<^v>vv^v^^vv^^v<<>^vv^^<v^v><<<>vv^vv^v>^<>>v<v^>><^>^<^<<<^><<<^v^v<<<<v<v<><>>>v^><v^v>^^v<^<<<^v><^v^vv^v>v<^^vv>>^>>>v^^^v^v>vv><><<>><^^^^v^<v><vvv^>>v^vv^>>^v<<<>>>^^^^>^v>><>>>v>^<>>^v><v<<<^v^v>^<<^^v<<<>^<<<<<^v^^^v>>^<><v^<^^vv^v^^v<^<>><^>v<v<<^>>>^>vvv<<^<vv>>^><^v<>^><^>v<<<<^<><<>^<^v^>><<<^><>><>^v>v<>^^vv^v<v<v<<^v<v>>>v<^^<^v>^>v^^>><vv<<>>^^>vv^<vv^<^<><<vvvv<><<^^>>>>v^<^^>><<<v<>^<><vv>><v^><>>^><<v<>vv<><>>^vvv<v^><^^^>vv>><>>v>><vvv<>^><v>><v<><<v>>^vv^v^vvv^v<v<v^v
v^>^<v<<v>v^^vv>vv<^><<<v>v>^><<^>>^>^v<v<>>^vvvv^<v^v^^<^<vv<vvvv^v^^^^<v>><^v>^<^<>vv<v<>^>>>><^v>^vv^><^v^>^v>^v<>^v<>>>^<^vv<v><>vv<^^<>^v^><vv>>v^^<^>v<>v>>><>v^vv>^>v>vv^><<<^>v^<^^^<<<>v>><<v^^<<>v>><^^v<vv<>>>><>>^<<v>^><^v>^^>^>>v^>>>^>>>^>^^<^^<><^<<^^<>vv^><^v>v<>v<vv^>>^<<<<<^^v><^>v>v^^<^<vv><>^v<^^vvv>>^>>>><v>>v>><^<^v<^>^<v>>^<>vvvv>vv>>>>>^<^v>>v>v<<<v^vv<v>^<v<>v<>^>v^vvv>^><v^v<>v<^^v^>>>>^v<>v<<<<^vv>^<>vvv>^<^^<<>vv^>v^^vv<^>vvv^vv>vv^<<v>^^v<<^>v>^vvv^<>><<^<>>>v^<vvv^>^vv^<^<v<v<v^<v^<<^vvv^>^>>^<vv^^<^<<^v<<<v>vv>vv<<<>^v<<vv>v^v<v^^^^<^vv^<vv<^<^^^v<>vv^<>^^^<^>vv<<v<<>v>v^^^v<^<^^<>><v<^>^>vv^>vvv>>><^>>>>>v>>^v<>>>^^>>>v^<^v>v<^>^>v<^^<v^^<^v<<^^<v^>>>>>>^>>v>vv<>^>^v>^>^><v^v<>^>^^<vv><v>^v><v>^>^v<>^^v^v^<v<<^<v^v^v<^>>v><vv<<vv<v^>v>^<^v<<><^^^>^v<v>^<^^<v<^<<>v<><^^vvv<v<v>v>^v<<v^>><>>v>^^v<<><<v^>^>><^^^>^>vvv^v^<^>^v^v>><^>^^<v<v><<><vv<<<^>v><><^>>>vvv><>v>><><>v^^<><<<<^v<><<^<^v^>v<vv^vv>>>^v^><v^^v>>v<v^<>v^>><^<^v^^<>^<^><>>><vv^>>^<<>v<<<>v^vvv^^
v<^>vv>^>v><v^<>>>>^<v^>><v<<v>^^>^<^v>>>^>v>vv^vv^>>^><vv><>><vv<^^>v^^>><v<<<<<v^^><<^<v<v>vv<><>vvvvvv>^^^>v^>v><v^<>><vv<><^><^v>v^^v<v<v<>>>^^>^v^^vvvv>^>>^<>v>^v>>><^v<><>>>^^>v^v^<<<^v>v>>>^>v^^v>^v>v<^<v<vv<><>^^>^>><v>>v^v<^<^v^<v<<^vv^<<>v^><^^v^v<<><^>^^>v^>v<^><^v<>><>>>>>^^<v<>v>v<>^><>><^vvv<>^^>><><>^<v^v<><>v^^>^v^<v^vv<^<<^<<^<>v<^<vv<>>^<>^^^^<<^<^><>><<<<v>>>>vv<^<<>>^^v>>^^v<v<<v^>>>v<><<<v<^v<^>>>>>>>^<v<<vv<v>vv^<>vvv^<v>v><v^^^^^^v<^>v>^^vv^^><v^<^v<^^^^<>v<<v><<v<v<v^>>vv<^<^v><^>vv<^<v>v<v^<<><>^<^v>>>>^<>>v^vvvvv^v<<^>^<<^>vv^>><<^<v^^<v^<>^>v>^><vvv><v^v<>>v^v>^^v^^vvv>v>>^vvv^<>>><v>>v>^>^<v<^v^v^>^<v<^v<<<v><>>^<>>v^^>^<<<>^v><<>>^<>v^^v>^>^v<>v^<^>vvv>><><<^<<vv^^<vv<<<<v^^<^>>v>^><^<v^<^<<>v<<^<<^>^^vv<v^^^^<^<<<<<<<^^<>v<v^>^>v>^vv<^^<^<vvvv<<v^^<><v^>><<v><^^^>^>v<<^^^>>><>>v>v<v>^>^<<vv^><v^^v^<v^v^^^<v^>>^<vv<<vv<>>^<^^v^vv>^>^><>>vv<^^<v>^>>>^<<v^<<^^^v<<<vvv^>>v<^v>^<vv<><><^v^^^vv^>^v<<^^^<>>^<vv<>^><v<<^^<<>><<>^v><>^<><<>v<<><><<>>^><^<^^<><v^>v>
^^^>v<^<><vvvv<vv<v^^^><^v>^>vv^v>><>^>v>v>v^^>>^<>v^v<>v><<v<v>^<>v^>v^<vvv<^<><<<^>^v><<^<vvvv>vv>>><vv<<v^<<vv>^>v<<v<<<<<v><><^><v^v>v<v<><^v^>v^><><^<^v^v^vv<^<>v><>^>><^><<^<v>vv<<v^<^>v^>><<<><>vv>>vv<v<^>^>>>>v<vv<^>v<<><^>v><>v>>v<v><^v>v><^>v<<v<>v<<>^v>>vv><^^v^v^>>^^^^^><><<v^^<>><v><vv^v>>>^>^^^^v><v><>>^>>>^^^>vv>v>v<^<v><^<v^v>^>v^^v^v<v>^v>v^v>v>><v^>^^v><^>>>^v>>v<v>^>^>v>v^^^v^^^<>^v><^v><>>v>v^>vv<>v<>>^v<>vv>><>v>v>vv^<^^<<<v^^v^^vvv^v>vv<<^>^v>>>v<vv^<>>^vv<<<>>>><v<>v^^^vvv<^^^v<>v^^><<>^<^vv<^^^v^<^vv><>>^<vv<><^v^><^^v><><>vv<vv<vv^>vv<><^^v^v^vv<<^v<>vv^>^>^<vv>^<<^>vv^>><^vv^v<vv<<<>>^v^><v^>><^>^v<vv^<<v<v^v^><<>>>^>>>>v^^v>^<^<>>^<v^^v^^<<>>^v>>^v<v<>>v^>v^>><^>vv<<<v^>><><<<>>v^v><^>v><<>^^v<<<<>^<v^>^<v^><>^vv^><v^<v^<>>><>v><><^>^v>>v<>^^>>^>><v^^^<<>><vv^v>v^><>v^^^<>>v^v>v<v^^^><vv>^^>><>^><<v^>^v<^^>^^<^^^^v<>>^^^<>>v^^vv>><>^<v<>v^<^^^^^^><vv^<^>>vvvv^v<v<^>^^<>v<><^><v>>>>v^>><v<v>^><>>v^>v^><>^<<<^^>>^<<<<^^vv>>^^>^<<v>^<v<^>><^<v>^><v^<v<><>v>v<vv<
^<^>>>v^v<<<^>>>v<<>>^<>^>^v>^v<v^>>^^vv>^^^^v><^^^<>vv>v>>^^<v<^<<><<v>><^^v><^^>^<>>^vvv>>>v^><^<v>v<<<v^v<vv<<<<<>vv<><<<>v^>vv^^v>>vv^v^^<vv^^>v^^v<>^<<^^>>><v<^^<<>^>^^v<^^vvv<>v<>><<v^<<<>v<^><vvv<<>^^v>>>v<^^>v>^>><<v<<<v<^>>>^^^<^^v<^^v<v>>><^>^^>><v<v^<<v<>>v><^v>^<vv>>v^vvv^>^<v<^^<<v<v><<<><^<<v>v^^<>^>>><^v^<><^^>^><vv^v<>>>^><^v<^^<<>vv><<vv<<v<v><><>v^<v>^>>>v<<v^<>v>vv<v>>vv^<>v<>v<><<v>>^v^v>v<>>^<>^vv^^>vv>v>^^^v>>>v<<^<v<<<<>^>vvv>><v>v<<>v><^^^>>vv>><^v<v><vv><<><><^^>^<<^^v^^<vv<vvv<v<>>^<^v>v<<<^^>>^^^>>>v<>^v>>v^>><<>>^^vv<>v<<v^^><v<>v<v>v<>>>>><<><v<vv<><^v^vv^v>><<<^<<>><>vv>v>>^^<>><v<<><^><^^^v<^v><>^vv^v><>^vv<>v^>^<>v>>v^>^><^><v^^^^v>^^>vv><v<>v<>v><><v><>>v<^<>>>v^<<>>>^<v>v<>v<^^<>^>^v>>v>^^>>v<<v<<v>^>v>>^v<^<^v>>>v<v><vv<vv>>v>v>>^>vv^<>v>v^<<><vv^vv><<^v^<>>>^v<vv>^<v^^>>^^<v>>v><>v^^>v>vvv^<v>>><<<v><<^><<<vv<^v^v>^>^><>^vv>vv<><<vvv^vv^<<<<<^<<>>^>v<v^^<>v>v^vv>><<>vv><<><>>v^^>^^^v>vv^v^^v^<^v><>v<><^>^<<<^v<<<^^v^><>>^^<>v><>>vv>^<^>^>>v>><<v^>v<>
<^<v^<>v<^<^>>v<>><<^vv^<<>v^v^v^><>v<v<<v><vv>v^^>^^^^<v<<^<<>><<^v>^<<<>vv<>^>><<<v>v<^>>^^^v^v>^vv^v>v^<vv^^<v<<<^^^>>v><>^>^>^>>>vv>><><><<<^<<^vv<>>><v<>>^^<<vv<><v<vv>><>v^<vv<<v>^<^^>>>>><><<^<<>^^^v>^<>v^<^<^^>^<v^><^v>^>^>><v><v<v<>^^v>^<v<v>^>^v<>vvv<<>>>v^v><^^vv<>^^>^<^vvv^^<<>><v^>>>vvv<>v<><>v^><<^v>^v^<<>v^^^^v<>^><^><<^vvv<^<^^>^^>v><>>^><>>>v>^<^^<>v^<v^>^v^v>v^vv>vv><>^vv<<><<^>v>>>>>^v><v^<>^v<^><^v<v<>^vv^^^v>^><^v<^^^<><>vvv^^>>>>>>>^v<<v^^>><v>>>^v<<v^>>>^^<^<v>>^>>><<^v>>^v>^<>^<><<><v<^<vv>^>>>v>v^<vv^>><v^^v^>^^<^^v<<v><vv>>v<<>v<v<v>>vv>v<<v<<<<v>^^<v<^>>><^^>vv<vv^<^><^>v<><^^v<>^>>v>^v^v<>v>v>v>^vv<^^^><^<>^>vv^<<v^<<<<<<v<v<>^<>>>v>^v>><vv^^v<>^>vv^><v<v^v<<v<^>v>>^^>>vv<vv><>^<vv<v<v>>v<^v<<<>>><><><^^><v^v>^^v>vvv>v><^v^<<>vvvv><^^^vv>>v^<v^^^^<<^^><<^v>>^^>>>><^<^>>>vv>>>vv>^^>^^<^v^^<<^v^>><^^^>><v<>^v<vv>>v>^v^>><>^v^>^><<vvv^^v^^^v>vv<v>>>v>v^v<>>^vv^>v<^v^><>>^v<v^<><<>vvvv>^>^v^v<vv^><v^v>>>v>v^v<>vvv><<vvv>>v>^vv^vvvv^<^>^<<^v<<<<>><^^<>v<^^<>v^v>>
<vv^<^^^^<<>^^<<v<^^>>>^^^^<<^^>>^^v>^vv>>v><>^<^v^^>v<<vvv>^><v<>^<vv^^<^^>v>^><^^<<><>^v^><>>v<>v<>v<^v^>>vvv^^<>^><<v^^^^vvv>>^>^^<<>^>v><v^>>>v^<vv^v>v^<^><<<<v^^><vvv<>^>>v<<>^^v><^^<<<<^>^>v^v><<>^><^^>>v<<<^<>v>>vv>v^>v^>^<>>^vv^v^v>vv^<<^>v^v<<<v>v<v<^v^>>^^><vvvvvvv<^v^>^v<^^^vv^^<^>>^^>v<v>>>><>v<>^><v<>v>^>v<<><^v^^^^><>>>v<>><>^v<^<vv^>>>v^^v><v^^<v^>^^<<<<>>><<^<<vvv^^^<<><<<<<<v^<><vvvvvv>v^<<v<^<>>v^v<vvv>^^^v><<<>>^^v>><<^<<v<v^<v^><><v^v^^<<>><v^^<vv^>^v<><<>v<v^^<^<vv^><^v<><^v><v^^<<>>^>>v>^><>v^<<^<v<>^<>^<^^^>v<^<v<v<<<<v<^<><^v>v<v<v>^<<<v>>>vv<<><<>v><<v<vvvv>><>^>^vv^v<<>^^<>>^^><<<vv<^>>vvv^<^><>^^>^>>^v<>v<v<>^>>^^>>v^vv^^<<v^^<v^v><<v<<v<v>>>>>><><<v^>>v>>>^>^v><^^<<<^^<<<^<vv^>^^<v<v<vvv^vv^^v<>v<^^^^<^v><>>vv<<>v<v^>><><v<v>^><^><>^<><vv<^><>vv^v^<v>^><<<>>^v^>v^^>^^<>^v^>>v<>>>^^v<^^v^>>>>><>^v>^^>v>^^><^<<^>vv^>><vvvv><>vv><<<vv<>vv^v<>>><^^^^vv^><^v>>^>^>>v<^^v^v^>v^>>^<v<>^^><^<v^v>v>^vvv>^^><^v<><^v<^>v^<>^v<^vv<><<<><^><><<v^vv<^>vv<v><v^>>v>^^^<^><<<
>^<v^>>v^v>v><>^><^^>^v<^vv><>^v>>v<v>>>v^<^^><><vv<^>>vv^^^vv>>>v><>v><vvv><v^v^<>^<v><>^<><^>v<<><^<>^>^^^<v><>>v^<><v^vvv<^v^<<^>^<^v>v>vv<>v>^v><vv^<><v>^v<>vv^v^v<>vv<<^vvvvv^^>>>>^v>>^>^v<><v^<^v>>>>^<^>>v^vv^^>><>^><>><><v<^^v><<v<><>^<<v<v><v<<^>^>><<^^vvv<vv^>vv>>v>^><v<^<>^>vv>>>>>>v<^>>v><v>v>v^v><>^>>vv<vv<^>>v<><>>^v><^<<>>vv<<v^^>>>^^<<<>>^><^^vv^v^<vvv>v^><>^v^>>^^^<v^v^>v<>^^^vvv^>^>^v<<v>v^>^>v>^<><^^>>><vv<vvvv>><<vv>^<^>^vv><>^<<^<vvvv^^^>^^vv<vv<<v^v^<>^>v<<><<<>><^^>><><>^^^>^>>v<>>^>^>^v^<>><>^^^^vv<^<>>>>>>^v^<^>>>v<<>v<<>v>^vvv>>v<^^>v<^<vv<>v^v>^v^<^^v<v><v^vv^>v<<<<^vv>>>><<v>><^>><>><>>v<>v^<<^^v<v^><>vv><^>v><vvv>><>vv><vv<<>^v^<^<^<<^v>^vv><><v<<vv^v^v<v^^>>v^^<v<><^v>^^<<^v<<^vv<v>v^>^<<<vv<v><v^^>v>>vv^^v^<><>^vv<v>>>>^v>>>^v<<<><<<v>^>v><<><v^^^v^<^^<^v<v<v^^v^^>v>>^^vvv>>>v>^^v>^v>>^<<^><><^^<<^>><^<>vv<vv^v<v^v^^^><<<v<<v<v^v<<<v<>><>^<>><<<><^v<vv^v^><>v^vvvvv^^><^^^v<^<<^>vv<^<^v<^>^<<v>^v>>>v<>>^>>><^^>vv^v<v<^^<v><v^<<<><<^<><^v>v^>>^^<v>>><>v^<v<<
v<v>v<>>^<^vv^>>^^<<^>>vv<>^^>^v>vv>^>vv^><<v<^v<>^<v>v^>^>vv^<><><v^<<>vv^<>^>^<^<>v<v<vv>v><<>v<v^v^<v<^^^><>vv>v><>^^>^>>><vv<v>><vv<<<^<<>^>v<v><<v>v<<v^>vvv>^^vv^<v^^<^>vv^^v^><^<<^^v>v<<<^><<>>v<v<>vv^vv<v>^<<v^v>^^vv>v<<<<vv^vv>>v<<<^><>v^^v><>>v>>^^^^<v>>>^>>>^vv>>^v<>>v>v^<v<^vvv<v<v<>v<v<<<>>^>>v^>><<v<^>vv^v>><^^^<<>^^>vv<<^^<v>><<<^^<^><>^>>>>v>><>^><<<<v<<<^<>>vv>^>v<^<^v^^v^>^^>v<><><><<v^^v<v><v<<<v^^v^^<>^><v<vv>v^>^^v^v^v<v<>>^<<v<vv>>^^<^^<<v^v<<>><^>v<><>v^^v^>>^vv><^v>v>vv^><v<>vv>v><^^^<<v>^^<v>v<^v<v><<<>vv>v><<<<^^<<><<>v><vv><<^v>vv^>v<<^<vv^^>^vv<^v<>^>><^^<^<vvv<^^^v^vvvv>^v>vvv<<><>><vv><v><<v^^v>^v^v<<<<v><vv><^v<><<<>>^v>^^v><>v<>><v<^<v^<>v>vv<>v<v^<v^^^vv><^>v<<><<v<v<><><^>>v>^^<<v<<^vvvv>v>>v<^>>^v^><vvv><>^><^^v<<>v<>v^^v<<>>><<<<v<vv><vv^^^><><>^>>v><^^^^v>^^><<^<^>v<^<<>^^vv^v><^<v<vv<>v^>^<>v>>v>v><<<<<>v<^<>v<>^^>^^>>>vv<<<^^^v>v<^<v>^>v^<>>v<v>v<<>v^<^>^v<v<><>^^<>>><^><v^^^>^^vv>><<><v<^<>v>>vv<^v<^^>>^<>v^^^<^>^^^^<<v^vvv><<>^>^^v^v<v^<>><^<<<><
v^^>>v^>^>v><>>^<<v^^vv^>>>>>>>>^^<^^>^v>^^^v<><<^vv<>^>><<<<>v<^<v^^>><>vv<><>^vv^>>>vvv>^>v>>^v<v^v^vv^>v<^^^^>vv<v<<^<<>v<<v<v^<<<^vv^v<^>>vv>>><>v^^v>>^><><^v><><vv>^v>>v<<>>>>vv^v^<v>v>vvv><^^^v<<<^v<^v>v^<^>^v>v>^><v>v<<><v<v<>v^v^vv^^<>v^v>^>v^>^^v><vvv^<v<^^^<>><>^v>^^<v<>v>vv^^>>^^v<<v<>><v<v<v>>^^<^<<^><<<^vv<>>><^^>^<>^v^^<>^<^<<^><>>^v^><>^v<^^v>>>v^<><v^>^<><<v>>^<vv><<<>^^vv^<>^^<^^v>^>^>vvv<v>vv<v<^>><><^^v>>^><>v><^><<vv^v^^^vvv^>>v<<<<><<<^<><<>v<>^<^>v>^v^>><<>^v>v^^>^^<>^^^<>v<>vv<>v^><<<<><v><v<<>^^^<<>v^v^v<^<><v^v>^^>v>>^>>^>^><v>v^<^^>v<^><v>>vv^v^^>^<^>v^v<>v^><^<^v^<<<><><>>>^vv^><v<^><>><^^>>vv><><^<v^<^v<^<vvv<>^^>v^v^>>>>>v^^<>v^^>vv<<<^v><vv^><>^<^<^v^vvvv<><>^><v^^<^><v>><<v<v^><>^<^<<^^vvv><<vv^^^<<<<<>v>v<><^v<v<v^<v^>><^>^^<><>^^vv^><vv>vv<^v<<><<^v^^>><^^<^><vv><^<<v>>^<vv>>^<^^<>^^<^>^<>v^<^v><>>>v^>^><<>^^>^<>>vv<^^><<><><v>v^^<<v^v>>vv<^^<<^<v^^^^<v^>^^^v><^v<vvv><<^^<<>v^v>v<<^>><><<^v^<vv^^^>><<^^>><>>v<^><vv>^^^^<v<vv<v><vv>^v<>>v>^^<>v>><>^v<v<<`;

const EMPTY_CHAR = '.'
const BOX_CHAR = 'O'
const WALL_CHAR = '#'
const ROBOT_CHAR = '@'

movementMap = {
    '<': [0, -1], 
    '^': [-1, 0], 
    '>': [0, 1], 
    'v': [1, 0], 
}

function runMovement(grid, position, movement, dryRun = false) {
    const nextPosition = [position[0] + movement[0], position[1] + movement[1]];
    let nextSpaceVal = grid[nextPosition[0]][nextPosition[1]];
    
    let canMove = true;
    switch (nextSpaceVal) {
        case WALL_CHAR:
            return false;
        case BOX_CHAR: {
            const moved = runMovement(grid, nextPosition, movement, dryRun);
            canMove = moved && canMove;
            nextSpaceVal = grid[nextPosition[0]][nextPosition[1]];
            break;
        }
        case '[':
        case ']': {
            if (movement[1] !== 0) { // movement left/right
                const moved = runMovement(grid, nextPosition, movement, dryRun);
                canMove = moved && canMove;
                nextSpaceVal = grid[nextPosition[0]][nextPosition[1]];
            } else {
                const moved1 = runMovement(grid, nextPosition, movement, dryRun);
                const adjacentPosition = [...nextPosition];
                if (nextSpaceVal === '[') {
                    adjacentPosition[1] += 1;
                } else if (nextSpaceVal === ']') {
                    adjacentPosition[1] -= 1;
                }
                const moved2 = runMovement(grid, adjacentPosition, movement, dryRun);
                canMove = moved1 && moved2 && canMove;
                nextSpaceVal = grid[nextPosition[0]][nextPosition[1]];
            }
            break;
        }
        default:
            break;
    }

    if (nextSpaceVal === EMPTY_CHAR) {
        if (!dryRun) {
            // move into it
            grid[nextPosition[0]][nextPosition[1]] = grid[position[0]][position[1]];
            grid[position[0]][position[1]] = EMPTY_CHAR;
        }
        canMove = canMove && true;
    }

    return canMove;
}

function part1(input) {
    // split into parts
    const [rawGrid, rawMovements] = input.split('\n\n');

    // build grid
    const grid = Array.buildGrid(rawGrid, '\n', '');

    // clean movements
    const movements = rawMovements
        .replaceAll('\n', '')
        .split('')
        .map(v => movementMap[v]);

    // find Robot position
    let [position] = grid.findPositions(ROBOT_CHAR);

    // run movements
    movements.forEach(movement => {
        runMovement(grid, position, movement);
        [position] = grid.findPositions(ROBOT_CHAR);
    });

    // calculate coordinates
	return grid
        .findPositions(BOX_CHAR)
        .map(([y, x]) => 100 * y + x)
        .sum();
}

const part2Substitutions = {
    'O': ['[', ']'],
    '#': ['#', '#'],
    '.': ['.', '.'],
    '@': ['@', '.'],
}

function part2(input) {
	// split into parts
    const [rawGrid, rawMovements] = input.split('\n\n');

    // build grid
    const semiRawGrid = Array.buildGrid(rawGrid, '\n', '');
    const grid = [];
    semiRawGrid.forEach(row => {
        const finalRow = [];
        row.forEach(cell => {
            finalRow.push(...part2Substitutions[cell]);
        });
        grid.push(finalRow);
    });

    // clean movements
    const movements = rawMovements
        .replaceAll('\n', '')
        .split('')
        .map(v => movementMap[v]);

    // find Robot position
    let [position] = grid.findPositions(ROBOT_CHAR);

    // run movements
    movements.forEach(movement => {
        const shouleMove = runMovement(grid, position, movement, true);
        if (shouleMove) {
            runMovement(grid, position, movement);
        }
        [position] = grid.findPositions(ROBOT_CHAR);
    });

    // calculate coordinates
	return grid
        .findPositions('[')
        .map(([y, x]) => 100 * y + x)
        .sum();
}

// const result = part1(inp);
// const result = part1(sample);
const result = part2(inp);
// const result = part2(sample);
console.log(result);