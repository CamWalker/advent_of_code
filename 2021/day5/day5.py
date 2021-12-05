from real_input import *
# from test_input import *

def parse_input(text):
	coordinates = []
	raw_coordinates = text.split('\n');
	for raw_coordinate in raw_coordinates:
		[start, end] = raw_coordinate.split(' -> ')
		coordinate = {
			'start': list(map(lambda string: int(string), start.split(','))),
			'end': list(map(lambda string: int(string), end.split(',')))
		}
		coordinates.append(coordinate)
	return coordinates

def get_dimensions(coordinates):
	max_x = 0
	max_y = 0
	for coordinate in coordinates:
		local_max_x = max(coordinate['start'][0], coordinate['end'][0])
		local_max_y = max(coordinate['start'][1], coordinate['end'][1])
		if max_x < local_max_x:
			max_x = local_max_x
		if max_y < local_max_y:
			max_y = local_max_y
	return {
		'max_x': max_x,
		'max_y': max_y,
	}

def make_chart(dimensions):
	chart = []
	for i in range(dimensions['max_y'] + 1):
		chart.append([0] * (dimensions['max_x'] + 1))
	return chart


def mark_vents(coordinates, chart):
	for coordinate in coordinates:
		# # PART I
		# start_x = coordinate['start'][0] if coordinate['start'][0] <= coordinate['end'][0] else coordinate['end'][0]
		# end_x = coordinate['start'][0] if coordinate['start'][0] > coordinate['end'][0] else coordinate['end'][0]
		# start_y = coordinate['start'][1] if coordinate['start'][1] <= coordinate['end'][1] else coordinate['end'][1]
		# end_y = coordinate['start'][1] if coordinate['start'][1] > coordinate['end'][1] else coordinate['end'][1]

		# if start_x == end_x:
		# 	for i in range(end_y - start_y + 1):
		# 		chart[start_y + i][start_x] += 1
		# elif start_y == end_y:
		# 	for i in range(end_x - start_x + 1):
		# 		chart[start_y][start_x + i] += 1

		start_x = coordinate['start'][0]
		end_x = coordinate['end'][0]
		start_y = coordinate['start'][1]
		end_y = coordinate['end'][1]
		is_x_static = end_x == start_x
		is_y_static = end_y == start_y
		is_x_inverted = end_x < start_x
		is_y_inverted = end_y < start_y

		for i in range(max(abs(end_x - start_x), abs(end_y - start_y))  + 1):
			if is_x_static:
				chart[start_y + (i if not is_y_inverted else -i)][start_x] += 1
			elif is_y_static:
				chart[start_y][start_x + (i if not is_x_inverted else -i)] += 1
			else:
				chart[start_y + (i if not is_y_inverted else -i)][start_x + (i if not is_x_inverted else -i)] += 1


	return chart

def score_chart(chart):
	score = 0
	for row in chart:
		for col in row:
			if col >= 2:
				score += 1
	return score

def main(real_input):
	coordinates = parse_input(real_input)
	dimensions = get_dimensions(coordinates)
	chart = mark_vents(coordinates, make_chart(dimensions))
	return score_chart(chart)

print(main(real_input))