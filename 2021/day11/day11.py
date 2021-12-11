test = '''5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526'''

grid = '''3265255276
1537412665
7335746422
6426325658
3854434364
8717377486
4522286326
6337772845
8824387665
6351586484'''

def glow_around(grid, y, x, glow_count):
	# recursive fn
	if (grid[y][x] == None):
		return glow_count
	grid[y][x] = None
	glow_count += 1
	height = len(grid)
	width = len(grid[0])

	adj_points = [{
		'y': y - 1,
		'x': x - 1,
	}, {
		'y': y - 1,
		'x': x,
	}, {
		'y': y - 1,
		'x': x + 1,
	}, {
		'y': y,
		'x': x - 1,
	}, {
		'y': y,
		'x': x + 1,
	}, {
		'y': y + 1,
		'x': x - 1,
	}, {
		'y': y + 1,
		'x': x,
	}, {
		'y': y + 1,
		'x': x + 1,
	}]

	for point in adj_points:
		if point['x'] >= 0 and point['x'] < width and point['y'] >= 0 and point['y'] < height and grid[point['y']][point['x']] != None:
			grid[point['y']][point['x']] += 1
			if grid[point['y']][point['x']] > 9:
				glow_count = glow_around(grid, point['y'], point['x'], glow_count)

	return glow_count

def increase_step(grid):
	count = 0
	for y, row in enumerate(grid):
		for x, num in enumerate(row):
			if (grid[y][x] != None):
				grid[y][x] += 1
				if (grid[y][x] > 9):
					count = glow_around(grid, y, x, count)
	return count

def reset_grid(grid):
	new_grid = []
	for row in grid:
		new_row = []
		for val in row:
			if val == None:
				new_row.append(0)
			else:
				new_row.append(val)
		new_grid.append(new_row)
	return new_grid

def main(grid):
	grid = grid.split('\n')
	new_grid = []
	for row in grid:
		new_row = []
		for num in row:
			new_row.append(int(num))
		new_grid.append(new_row)
	
	# count = 0
	# for i in range(100):
	# 	count += increase_step(new_grid)
	# 	new_grid = reset_grid(new_grid)
	# return count

	step = 1
	while increase_step(new_grid) != 100:
		new_grid = reset_grid(new_grid)
		step += 1

	return step

print(main(grid))