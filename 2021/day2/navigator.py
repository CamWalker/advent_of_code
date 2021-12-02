from typing import Match


from movements import *

def calculate_movement(movements):
	h_pos = 0
	depth = 0
	for movement in movements.split('\n'):
		[direction, magnitude] = movement.split(' ')
		if direction == 'forward':
			h_pos += int(magnitude)
		elif direction == 'down':
			depth += int(magnitude)
		elif direction == 'up':
			depth -= int(magnitude)
	
	return [h_pos, depth, h_pos * depth]
	



print(calculate_movement(movements))