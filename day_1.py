from depths import *

def generate_3m_windows (depths):
	three_m_depths = []
	depth_count = len(depths)
	for i in range(depth_count):
		if i + 2 < depth_count:
			three_m_depth = depths[i] + depths[i + 1] + depths[i + 2]
			three_m_depths.append(three_m_depth)
	return three_m_depths


def count_depth_increases(depths):
	increaseCount = 0
	for i in range(len(depths)):
		if i - 1 >= 0 and depths[i] > depths[i - 1]:
			increaseCount += 1
	return increaseCount

print(count_depth_increases(generate_3m_windows(myDepths)))
