from movements import *

# movements = '''forward 5
# down 5
# forward 8
# up 3
# down 8
# forward 2'''



def calculate_movement(movements):
	h_pos = 0
	depth = 0
	aim = 0
	for movement in movements.split('\n'):
		[direction, magnitude] = movement.split(' ')
		if direction == 'forward':
			h_pos += int(magnitude)
			depth += (aim * int(magnitude))
		elif direction == 'down':
			aim += int(magnitude)
		elif direction == 'up':
			aim -= int(magnitude)
	
	return [h_pos, depth, h_pos * depth]
	



print(calculate_movement(movements))