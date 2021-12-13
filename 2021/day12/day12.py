import re

paths = '''mx-IQ
mx-HO
xq-start
start-HO
IE-qc
HO-end
oz-xq
HO-ni
ni-oz
ni-MU
sa-IE
IE-ni
end-sa
oz-sa
MU-start
MU-sa
oz-IE
HO-xq
MU-xq
IE-end
MU-mx'''

def find_total_paths(connections):
	def append_path(path_key, paths_taken, count, path_string, has_twice_small):
		new_count = 0
		# add current path
		if path_key == 'end':
			return 1
		elif path_key in paths_taken and re.search('[a-z]', path_key) and paths_taken[path_key] > 1 and has_twice_small and path_key != 'start':
			return 0
		else:
			if not has_twice_small and re.search('[a-z]', path_key) and path_key not in ['start', 'end'] and paths_taken[path_key] > 1:
				has_twice_small = True
			# find next paths
			for connection in connections[path_key]:
				new_paths_taken = paths_taken.copy()
				if connection in new_paths_taken:
					new_paths_taken[connection] += 1
				else:
					new_paths_taken[connection] = 1

				if connection != 'start':
					new_count += append_path(connection, new_paths_taken, count, path_string + '->' + connection, has_twice_small)

		return count + new_count
			
		# return is_complete or True
	return append_path('start', { 'start': 1 }, 0, 'start', False)

def main(paths):
	connections = {}
	paths = paths.split('\n')
	for path in paths:
		[caveStart, caveEnd] = path.split('-')
		if caveStart in connections:
			connections[caveStart].append(caveEnd)
		else:
			connections[caveStart] = [caveEnd]
		if caveEnd in connections:
			connections[caveEnd].append(caveStart)
		else:
			connections[caveEnd] = [caveStart]
	return find_total_paths(connections)

print(main(paths))